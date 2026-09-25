"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { ReactNode } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  Lightformer,
} from "@react-three/drei";
import * as THREE from "three";

/* ============================================================
   TIMELINE
   One loop = erection sequence:
   plates -> columns -> level 1 -> level 2 -> bracing -> decks,
   then a short hold, a quick dismantle, and it starts again.
============================================================ */

const CYCLE = 16; // seconds per loop
const OUT = 13.6; // dismantle starts
const OUT_DUR = 1.2; // dismantle length

const FLOOR_Y = -2.4;

type Vec3 = [number, number, number];
type Mode = "grow" | "drop" | "spread" | "pop";

const clamp01 = (x: number) => Math.min(Math.max(x, 0), 1);

const easeOutCubic = (x: number) => 1 - Math.pow(1 - x, 3);

const easeOutBack = (x: number) => {
  const c1 = 1.35;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
};

function buildProgress(
  t: number,
  start: number,
  dur: number,
  overshoot: boolean
) {
  const x = clamp01((t - start) / dur);
  const inP = overshoot ? easeOutBack(x) : easeOutCubic(x);
  const out = clamp01((t - OUT) / OUT_DUR);

  return inP * (1 - out);
}

/* Reduced motion is provided INSIDE the canvas (React context does
   not cross the R3F boundary on its own). */
const ReducedMotion = createContext(false);

/* ============================================================
   MATERIALS (shared instances)
============================================================ */

const columnMat = new THREE.MeshStandardMaterial({
  color: "#3f4e61",
  metalness: 0.85,
  roughness: 0.32,
});

const beamMat = new THREE.MeshStandardMaterial({
  color: "#61738a",
  metalness: 0.85,
  roughness: 0.34,
});

const copperMat = new THREE.MeshStandardMaterial({
  color: "#c17a3e",
  metalness: 0.8,
  roughness: 0.3,
});

const plateMat = new THREE.MeshStandardMaterial({
  color: "#8794a3",
  metalness: 0.9,
  roughness: 0.35,
});

const deckMat = new THREE.MeshStandardMaterial({
  color: "#8fb0cf",
  metalness: 0.1,
  roughness: 0.5,
  transparent: true,
  opacity: 0.3,
  depthWrite: false,
  side: THREE.DoubleSide,
});

/* ============================================================
   BUILDING BLOCKS
============================================================ */

/* Wide-flange (I / H) section. Built along local X, then rotated. */
function IBeam({
  length,
  depth,
  flange,
  dir = "x",
  position = [0, 0, 0],
  material,
}: {
  length: number;
  depth: number;
  flange: number;
  dir?: "x" | "y" | "z";
  position?: Vec3;
  material: THREE.Material;
}) {
  const tf = Math.max(depth * 0.12, 0.03); // flange thickness
  const tw = Math.max(depth * 0.08, 0.02); // web thickness
  const yOff = depth / 2 - tf / 2;

  const rotation: Vec3 =
    dir === "y"
      ? [0, 0, Math.PI / 2]
      : dir === "z"
        ? [0, Math.PI / 2, 0]
        : [0, 0, 0];

  return (
    <group position={position} rotation={rotation}>
      <mesh material={material} position={[0, yOff, 0]}>
        <boxGeometry args={[length, tf, flange]} />
      </mesh>

      <mesh material={material} position={[0, -yOff, 0]}>
        <boxGeometry args={[length, tf, flange]} />
      </mesh>

      <mesh material={material}>
        <boxGeometry args={[length, depth - 2 * tf, tw]} />
      </mesh>
    </group>
  );
}

/* Wraps a member and plays its part of the erection sequence. */
function Animated({
  position = [0, 0, 0],
  start,
  dur = 0.9,
  mode,
  children,
}: {
  position?: Vec3;
  start: number;
  dur?: number;
  mode: Mode;
  children: ReactNode;
}) {
  const ref = useRef<THREE.Group>(null);
  const reduced = useContext(ReducedMotion);

  useFrame((state) => {
    const g = ref.current;
    if (!g) return;

    const b = reduced
      ? 1
      : buildProgress(
          state.clock.elapsedTime % CYCLE,
          start,
          dur,
          mode === "drop"
        );

    const s = Math.max(Math.min(b, 1), 0.0001);

    g.visible = b > 0.001;

    switch (mode) {
      case "grow": // rises from its base
        g.scale.set(1, s, 1);
        break;

      case "drop": // lowered into place by the crane
        g.position.y = position[1] + (1 - b) * 3.2;
        g.scale.setScalar(s);
        break;

      case "spread": // floor deck rolls out
        g.scale.set(s, 1, s);
        break;

      default: // pop
        g.scale.setScalar(s);
    }
  });

  return (
    <group ref={ref} position={position} visible={false}>
      {children}
    </group>
  );
}

/* Diagonal brace rod that extends from its centre. */
function Rod({
  from,
  to,
  start,
}: {
  from: Vec3;
  to: Vec3;
  start: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const reduced = useContext(ReducedMotion);

  const { mid, quat, len } = useMemo(() => {
    const s = new THREE.Vector3(...from);
    const e = new THREE.Vector3(...to);
    const dir = new THREE.Vector3().subVectors(e, s);
    const length = dir.length();

    return {
      len: length,
      mid: s.clone().add(e).multiplyScalar(0.5),
      quat: new THREE.Quaternion().setFromUnitVectors(
        new THREE.Vector3(0, 1, 0),
        dir.normalize()
      ),
    };
  }, [from, to]);

  useFrame((state) => {
    const m = ref.current;
    if (!m) return;

    const b = reduced
      ? 1
      : buildProgress(
          state.clock.elapsedTime % CYCLE,
          start,
          0.8,
          false
        );

    m.visible = b > 0.001;
    m.scale.set(0.035, (len / 2) * Math.max(b, 0.0001), 0.035);
  });

  return (
    <mesh
      ref={ref}
      position={mid}
      quaternion={quat}
      material={copperMat}
      scale={[0.035, 0.0001, 0.035]}
      visible={false}
    >
      <cylinderGeometry args={[1, 1, 2, 10]} />
    </mesh>
  );
}

function BasePlate({
  x,
  z,
  start,
}: {
  x: number;
  z: number;
  start: number;
}) {
  const bolts: [number, number][] = [
    [-0.24, -0.24],
    [0.24, -0.24],
    [-0.24, 0.24],
    [0.24, 0.24],
  ];

  return (
    <Animated
      position={[x, 0.03, z]}
      start={start}
      dur={0.6}
      mode="pop"
    >
      <mesh material={plateMat}>
        <boxGeometry args={[0.74, 0.06, 0.74]} />
      </mesh>

      {bolts.map(([bx, bz], i) => (
        <mesh
          key={i}
          material={copperMat}
          position={[bx, 0.055, bz]}
        >
          <cylinderGeometry args={[0.045, 0.045, 0.06, 6]} />
        </mesh>
      ))}
    </Animated>
  );
}

/* ============================================================
   THE FRAME — two storeys, 2 x 1 bays
============================================================ */

const XS = [-3, 0, 3];
const ZS = [-2, 2];
const LEVELS = [2.5, 5];
const COL_H = 5.16;

function SteelFrame() {
  return (
    <group>
      {/* Base plates + anchor bolts */}
      {XS.flatMap((x, xi) =>
        ZS.map((z, zi) => (
          <BasePlate
            key={`plate-${x}-${z}`}
            x={x}
            z={z}
            start={0.15 + (xi * 2 + zi) * 0.12}
          />
        ))
      )}

      {/* Columns */}
      {XS.flatMap((x, xi) =>
        ZS.map((z, zi) => (
          <Animated
            key={`col-${x}-${z}`}
            position={[x, 0, z]}
            start={0.7 + (xi * 2 + zi) * 0.18}
            dur={1.1}
            mode="grow"
          >
            <IBeam
              dir="y"
              length={COL_H}
              depth={0.36}
              flange={0.3}
              position={[0, COL_H / 2, 0]}
              material={columnMat}
            />
          </Animated>
        ))
      )}

      {/* Floor levels */}
      {LEVELS.map((y, li) => {
        const base = 2.6 + li * 2.2;

        return (
          <group key={`level-${y}`}>
            {/* Beams along X */}
            {ZS.flatMap((z, zi) =>
              [-1.5, 1.5].map((x, bi) => (
                <Animated
                  key={`bx-${y}-${x}-${z}`}
                  position={[x, y, z]}
                  start={base + (zi * 2 + bi) * 0.16}
                  mode="drop"
                >
                  <IBeam
                    dir="x"
                    length={2.64}
                    depth={0.32}
                    flange={0.2}
                    material={beamMat}
                  />
                </Animated>
              ))
            )}

            {/* Girders along Z */}
            {XS.map((x, xi) => (
              <Animated
                key={`gz-${y}-${x}`}
                position={[x, y, 0]}
                start={base + 0.7 + xi * 0.16}
                mode="drop"
              >
                <IBeam
                  dir="z"
                  length={3.72}
                  depth={0.32}
                  flange={0.2}
                  material={beamMat}
                />
              </Animated>
            ))}

            {/* Floor deck */}
            <Animated
              position={[0, y + 0.19, 0]}
              start={base + 1.9}
              dur={1}
              mode="spread"
            >
              <mesh material={deckMat}>
                <boxGeometry args={[5.9, 0.06, 3.9]} />
              </mesh>
            </Animated>
          </group>
        );
      })}

      {/* Diagonal bracing — end bay, both faces, both storeys */}
      {ZS.flatMap((z, zi) =>
        [
          [0.3, 2.34],
          [2.66, 4.84],
        ].flatMap(([y0, y1], si) => {
          const s = 7.2 + (zi * 2 + si) * 0.3;

          return [
            <Rod
              key={`brace-a-${z}-${si}`}
              from={[0.2, y0, z]}
              to={[2.8, y1, z]}
              start={s}
            />,
            <Rod
              key={`brace-b-${z}-${si}`}
              from={[2.8, y0, z]}
              to={[0.2, y1, z]}
              start={s + 0.12}
            />,
          ];
        })
      )}
    </group>
  );
}

/* ============================================================
   SCENE
============================================================ */

function Scene({ reduced }: { reduced: boolean }) {
  const group = useRef<THREE.Group>(null);
  const invalidate = useThree((state) => state.invalidate);

  // when frames are on-demand (reduced motion), render the final state once
  useEffect(() => {
    invalidate();
  }, [reduced, invalidate]);

  useFrame((state, delta) => {
    state.camera.lookAt(0, 0, 0);

    const g = group.current;
    if (!g) return;

    const target = reduced
      ? 0.7
      : 0.7 +
        state.clock.elapsedTime * 0.16 +
        state.pointer.x * 0.35;

    g.rotation.y = THREE.MathUtils.damp(
      g.rotation.y,
      target,
      4,
      delta
    );
  });

  return (
    <ReducedMotion.Provider value={reduced}>
      {/* Lighting: bright studio softboxes, no network requests */}
      <ambientLight intensity={0.35} />

      <directionalLight position={[6, 9, 7]} intensity={1.4} />

      <directionalLight
        position={[-6, 4, -5]}
        intensity={0.5}
        color="#cfe0f2"
      />

      <Environment resolution={256} frames={1}>
        <mesh scale={30}>
          <sphereGeometry args={[1, 32, 16]} />
          <meshBasicMaterial color="#cfd8e3" side={THREE.BackSide} />
        </mesh>

        <Lightformer
          form="rect"
          intensity={3}
          position={[0, 8, 3]}
          scale={[14, 8, 1]}
          onUpdate={(self) => self.lookAt(0, 0, 0)}
        />

        <Lightformer
          form="rect"
          intensity={1.6}
          position={[-8, 3, 0]}
          scale={[10, 5, 1]}
          onUpdate={(self) => self.lookAt(0, 0, 0)}
        />

        <Lightformer
          form="rect"
          intensity={1.2}
          position={[8, 2, -3]}
          scale={[10, 4, 1]}
          onUpdate={(self) => self.lookAt(0, 0, 0)}
        />

        <Lightformer
          form="ring"
          color="#e0a878"
          intensity={2}
          position={[0, 3, -9]}
          scale={7}
          onUpdate={(self) => self.lookAt(0, 0, 0)}
        />
      </Environment>

      {/* Floor rings (static) */}
      {[5.6, 7.6].map((r) => (
        <mesh
          key={r}
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, FLOOR_Y + 0.002, 0]}
        >
          <ringGeometry args={[r, r + 0.03, 128]} />
          <meshBasicMaterial
            color="#b9c6d4"
            transparent
            opacity={0.85}
            toneMapped={false}
          />
        </mesh>
      ))}

      {/* Soft ground shadow */}
      <ContactShadows
        position={[0, FLOOR_Y, 0]}
        opacity={0.4}
        scale={18}
        blur={2.4}
        far={7}
        resolution={512}
        color="#0f2539"
      />

      {/* The rotating model */}
      <group position={[0, FLOOR_Y, 0]}>
        <group ref={group} rotation={[0, 0.7, 0]}>
          <SteelFrame />
        </group>
      </group>
    </ReducedMotion.Provider>
  );
}

/* ============================================================
   EXPORT
   Fills its parent. Pauses when scrolled out of view and
   respects prefers-reduced-motion (shows the finished frame).
============================================================ */

export default function SteelStructure() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0 }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const query = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    const update = () => setReduced(query.matches);

    update();
    query.addEventListener("change", update);

    return () => query.removeEventListener("change", update);
  }, []);

  return (
    <div ref={wrapRef} className="absolute inset-0">
      <Canvas
        dpr={[1, 1.75]}
        frameloop={
          !visible ? "never" : reduced ? "demand" : "always"
        }
        camera={{ position: [9, 6.5, 11], fov: 36 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
      >
        <Scene reduced={reduced} />
      </Canvas>
    </div>
  );
}