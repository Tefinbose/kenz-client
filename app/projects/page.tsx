"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Box,
  Cable,
  Calculator,
  CheckCircle2,
  Layers,
  Layers3,
  Ruler,
  ScanLine,
  ShieldCheck,
  Workflow,
  Crosshair,
  BarChart3,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import {
  MagneticButton,
  TiltCard,
  SpotlightCard,
  ShimmerText,
  RevealText,
  ScrollProgressBar,
} from "@/components/ui/ReactBits";

/* ═══════════════════════════════ 3D STEEL BUILDING ═══ */

const CYCLE = 14;
const HOLD_END = 10.5;
const STEEL = "#9FB1C5";
const COPPER = "#C17A3E";

const ease = (x: number) => {
  const c = Math.min(1, Math.max(0, x));
  return c * c * (3 - 2 * c);
};

// Build in order, hold, then dismantle in reverse
const stageProgress = (time: number, start: number, out: number) => {
  const t = time % CYCLE;
  if (t < HOLD_END) return ease((t - start) / 1.3);
  return 1 - ease((t - HOLD_END - out * 0.45) / 0.8);
};

function Stage({
  start,
  out,
  mode,
  children,
}: {
  start: number;
  out: number;
  mode: "grow" | "drop";
  children: React.ReactNode;
}) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const p = stageProgress(state.clock.elapsedTime, start, out);
    ref.current.visible = p > 0.001;
    if (mode === "grow") ref.current.scale.y = Math.max(p, 0.001);
    else ref.current.position.y = (1 - p) * 3;
  });
  return <group ref={ref}>{children}</group>;
}

// I-beam built from flanges + web, along local X
function IBeam({
  length,
  position,
  rotation = [0, 0, 0],
}: {
  length: number;
  position: [number, number, number];
  rotation?: [number, number, number];
}) {
  return (
    <group position={position} rotation={rotation}>
      <mesh position={[0, 0.07, 0]}>
        <boxGeometry args={[length, 0.025, 0.12]} />
        <meshStandardMaterial color={STEEL} metalness={0.8} roughness={0.35} />
      </mesh>
      <mesh position={[0, -0.07, 0]}>
        <boxGeometry args={[length, 0.025, 0.12]} />
        <meshStandardMaterial color={STEEL} metalness={0.8} roughness={0.35} />
      </mesh>
      <mesh>
        <boxGeometry args={[length, 0.14, 0.025]} />
        <meshStandardMaterial color={STEEL} metalness={0.8} roughness={0.35} />
      </mesh>
    </group>
  );
}

const XS = [-1.6, 0, 1.6];
const ZS = [-1.1, 1.1];
const LEVELS_Y = [1.1, 2.15];

function SteelBuilding() {
  const rig = useRef<THREE.Group>(null);

  useFrame((state, dt) => {
    if (!rig.current) return;
    rig.current.rotation.y += dt * 0.16;
    rig.current.rotation.x = THREE.MathUtils.lerp(
      rig.current.rotation.x,
      -state.pointer.y * 0.1,
      0.05
    );
  });

  const braceLen = Math.hypot(1.6, 1.05);
  const braceAng = Math.atan2(1.05, 1.6);
  const stairLen = Math.hypot(1.44, 1.0);
  const stairAng = Math.atan2(1.0, 1.44);

  return (
    <group ref={rig} position={[0, -1.5, 0]}>
      <group position={[-0.8, 0, 0]}>
        {/* Ground grid */}
        <gridHelper args={[10, 20, "#C17A3E", "#1E2D40"]} position={[0.8, 0, 0]} />
        <mesh position={[0.8, -0.03, 0]}>
          <boxGeometry args={[6, 0.06, 3.4]} />
          <meshStandardMaterial color="#16263A" metalness={0.5} roughness={0.6} />
        </mesh>

        {/* 1. Structural — columns + beams */}
        <Stage start={0.3} out={5} mode="grow">
          {XS.flatMap((x) =>
            ZS.map((z) => (
              <IBeam
                key={`col-${x}-${z}`}
                length={2.2}
                position={[x, 1.1, z]}
                rotation={[0, 0, Math.PI / 2]}
              />
            ))
          )}
        </Stage>

        <Stage start={1.6} out={4} mode="drop">
          {LEVELS_Y.flatMap((y) => [
            ...ZS.flatMap((z) =>
              [-0.8, 0.8].map((x) => (
                <IBeam key={`bx-${y}-${z}-${x}`} length={1.6} position={[x, y, z]} />
              ))
            ),
            ...XS.map((x) => (
              <IBeam
                key={`bz-${y}-${x}`}
                length={2.2}
                position={[x, y, 0]}
                rotation={[0, Math.PI / 2, 0]}
              />
            )),
          ])}
        </Stage>

        {/* Bracing */}
        <Stage start={3.0} out={3} mode="drop">
          {ZS.flatMap((z) =>
            [1, -1].map((s) => (
              <mesh
                key={`br-${z}-${s}`}
                position={[0.8, 1.625, z]}
                rotation={[0, 0, s * braceAng]}
              >
                <boxGeometry args={[braceLen, 0.05, 0.05]} />
                <meshStandardMaterial color={STEEL} metalness={0.8} roughness={0.4} />
              </mesh>
            ))
          )}
        </Stage>

        {/* 2. Joist & deck */}
        <Stage start={4.2} out={2} mode="drop">
          {Array.from({ length: 7 }).map((_, i) => {
            const z = -0.9 + i * 0.3;
            return (
              <group key={`j-${i}`} position={[0, 2.26, z]}>
                <mesh position={[0, 0.05, 0]}>
                  <boxGeometry args={[3.2, 0.02, 0.04]} />
                  <meshStandardMaterial color="#C9D5E2" metalness={0.7} roughness={0.4} />
                </mesh>
                <mesh position={[0, -0.03, 0]}>
                  <boxGeometry args={[3.2, 0.02, 0.04]} />
                  <meshStandardMaterial color="#C9D5E2" metalness={0.7} roughness={0.4} />
                </mesh>
              </group>
            );
          })}
          <mesh position={[0, 2.36, 0]}>
            <boxGeometry args={[3.3, 0.02, 2.3]} />
            <meshStandardMaterial color={COPPER} transparent opacity={0.4} />
          </mesh>
        </Stage>

        {/* 3. Connections */}
        <Stage start={6.0} out={1} mode="drop">
          {XS.flatMap((x) =>
            ZS.flatMap((z) =>
              LEVELS_Y.map((y) => (
                <mesh key={`p-${x}-${z}-${y}`} position={[x, y, z]}>
                  <boxGeometry args={[0.24, 0.24, 0.05]} />
                  <meshStandardMaterial
                    color={COPPER}
                    metalness={0.6}
                    roughness={0.3}
                    emissive={COPPER}
                    emissiveIntensity={0.3}
                  />
                </mesh>
              ))
            )
          )}
        </Stage>

        {/* 4. Miscellaneous steel — stair */}
        <Stage start={7.4} out={0} mode="drop">
          {[-0.35, 0.35].map((z) => (
            <mesh
              key={`str-${z}`}
              position={[2.6, 0.62, z]}
              rotation={[0, 0, stairAng]}
            >
              <boxGeometry args={[stairLen, 0.1, 0.04]} />
              <meshStandardMaterial color={STEEL} metalness={0.8} roughness={0.4} />
            </mesh>
          ))}
          {Array.from({ length: 6 }).map((_, i) => (
            <mesh key={`step-${i}`} position={[2.0 + i * 0.25, 0.18 + i * 0.18, 0]}>
              <boxGeometry args={[0.24, 0.03, 0.72]} />
              <meshStandardMaterial color={COPPER} metalness={0.5} roughness={0.4} />
            </mesh>
          ))}
        </Stage>
      </group>
    </group>
  );
}

function ProjectScene() {
  return (
    <Canvas camera={{ position: [6.8, 4.2, 7.2], fov: 38 }} dpr={[1, 2]}>
      <fog attach="fog" args={["#0A1420", 10, 20]} />
      <ambientLight intensity={0.55} />
      <directionalLight position={[5, 8, 4]} intensity={1.4} />
      <pointLight position={[-4, 3, -3]} intensity={30} color="#C17A3E" />
      <SteelBuilding />
    </Canvas>
  );
}

const sceneTags = [
  { label: "Structural", pos: "left-4 top-[20%]" },
  { label: "Joist & Deck", pos: "right-4 top-[14%]" },
  { label: "Connections", pos: "left-4 bottom-[30%]" },
  { label: "Misc Steel", pos: "right-4 bottom-[26%]" },
];

/* ═══════════════════════════════════════════════ DATA ═══ */

const projectTypes = [
  {
    number: "01",
    icon: Ruler,
    title: "Structural Steel Detailing",
    desc: "3D modelling, shop and erection drawings for structural steel frameworks.",
    tag: "Structural",
    href: "/services/steel-detailing",
  },
  {
    number: "02",
    icon: Box,
    title: "Miscellaneous Steel",
    desc: "Stairs, rails, embeds, grating, and secondary steel detailing.",
    tag: "Misc Steel",
    href: "/services/miscellaneous-detailing",
  },
  {
    number: "03",
    icon: Layers3,
    title: "Joist & Deck Detailing",
    desc: "Coordinated joist and deck detailing integrated with primary structure.",
    tag: "Joist & Deck",
    href: "/services/joist-deck",
  },
  {
    number: "04",
    icon: ScanLine,
    title: "BIM Support",
    desc: "Model-based coordination and BIM workflows at LOD 350–400.",
    tag: "BIM / LOD",
    href: "/services/bim-support",
  },
  {
    number: "05",
    icon: Cable,
    title: "Connection Detailing",
    desc: "PE/SE-stamped connection coordination and delegated design support.",
    tag: "Connections",
    href: "/services/connection-design",
  },
  {
    number: "06",
    icon: Calculator,
    title: "Estimation & Take-Off",
    desc: "Model-based quantity extraction, BOM, and steel estimation.",
    tag: "Estimation",
    href: "/services/estimation",
  },
];

const process = [
  {
    number: "01",
    title: "Understand",
    description: "Project requirements, standards, schedules, and scope.",
    detail: "We review drawings, specifications, and project requirements before starting any modelling or detailing work.",
    icon: Crosshair,
  },
  {
    number: "02",
    title: "Coordinate",
    description: "Coordinate project information and technical requirements.",
    detail: "We identify interfaces and coordinate technical requirements before developing the model and drawings.",
    icon: Workflow,
  },
  {
    number: "03",
    title: "Model",
    description: "Develop coordinated 3D project information.",
    detail: "We build coordinated 3D models around the project's structural and fabrication requirements.",
    icon: Layers,
  },
  {
    number: "04",
    title: "Detail",
    description: "Prepare detailed project documentation.",
    detail: "We produce shop and erection drawings with a practical fabrication-oriented approach.",
    icon: Ruler,
  },
  {
    number: "05",
    title: "Deliver",
    description: "Provide organized deliverables aligned with project needs.",
    detail: "We provide coordinated deliverables while maintaining communication throughout the project lifecycle.",
    icon: ShieldCheck,
  },
];

const pillars = [
  { icon: Crosshair, label: "Accuracy", desc: "Precision modelling and documentation at every phase." },
  { icon: Workflow, label: "Coordination", desc: "Structured workflows that keep teams aligned." },
  { icon: BarChart3, label: "Delivery", desc: "Consistent on-time deliverables through clear milestones." },
];

/* ═══════════════════════════════════════════════ PAGE ═══ */

export default function ProjectsPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <main className="min-h-screen bg-[#fafbfc] overflow-hidden">
      <ScrollProgressBar />

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-navy-950 text-white pt-40 pb-32 md:pb-44">
        {/* Blueprint grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        {/* Ambient glow */}
        <div className="pointer-events-none absolute -left-60 top-1/4 h-[600px] w-[600px] rounded-full bg-copper-500/10 blur-[160px]" />
        <div className="pointer-events-none absolute -right-60 bottom-0 h-[500px] w-[500px] rounded-full bg-copper-600/8 blur-[140px]" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">

            {/* Left */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              {/* Badge */}
              <div className="mb-7 flex flex-wrap items-center gap-3">
                <div className="inline-flex items-center gap-2 rounded-md border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-copper-400 backdrop-blur-md">
                  <span>03 / Project Experience</span>
                </div>
                <div className="inline-flex items-center gap-1.5 rounded-md border border-copper-500/30 bg-copper-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-copper-300">
                  <CheckCircle2 size={12} className="text-copper-400" />
                  <span>6 Core Disciplines</span>
                </div>
              </div>

              {/* Headline */}
              <h1 className="font-display text-5xl uppercase leading-[0.92] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
                <RevealText text="Detailing Built" className="block" />
                <span className="block">
                  <ShimmerText className="font-display text-5xl uppercase leading-[0.92] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
                    Around Projects.
                  </ShimmerText>
                </span>
              </h1>

              {/* Description */}
              <div className="mt-8 border-l-2 border-copper-500/60 pl-5">
                <p className="max-w-xl text-base leading-relaxed text-steel-400 md:text-lg">
                  Every project brings its own detailing standards, coordination
                  requirements, schedules, fabrication needs, and technical
                  challenges.
                </p>
              </div>

              {/* Spec chips */}
              <div className="mt-8 flex flex-wrap items-center gap-3 text-xs text-steel-300">
                {["AISC / NISD", "LOD 350-400 BIM", "US Market Focus"].map((c) => (
                  <div key={c} className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 backdrop-blur-sm">
                    <CheckCircle2 size={12} className="text-copper-400" />
                    <span>{c}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right — 3D steel building */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="relative h-[420px] overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-br from-white/[0.08] via-white/[0.03] to-transparent shadow-[0_25px_60px_rgba(0,0,0,0.45)] md:h-[540px]"
            >
              {/* CAD corners */}
              <div className="pointer-events-none absolute left-3 top-3 z-10 h-3 w-3 border-l-2 border-t-2 border-copper-400/50" />
              <div className="pointer-events-none absolute right-3 top-3 z-10 h-3 w-3 border-r-2 border-t-2 border-copper-400/50" />
              <div className="pointer-events-none absolute bottom-3 left-3 z-10 h-3 w-3 border-b-2 border-l-2 border-copper-400/50" />
              <div className="pointer-events-none absolute bottom-3 right-3 z-10 h-3 w-3 border-b-2 border-r-2 border-copper-400/50" />

              {mounted && (
                <div className="absolute inset-0">
                  <ProjectScene />
                </div>
              )}

              {/* Floating labels */}
              {sceneTags.map((t, i) => (
                <motion.div
                  key={t.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + i * 0.12 }}
                  className={`pointer-events-none absolute z-10 flex items-center gap-2 rounded-lg border border-white/15 bg-navy-950/70 px-3 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-white/85 backdrop-blur ${t.pos}`}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-copper-400" />
                  {t.label}
                </motion.div>
              ))}

              {/* Caption */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-navy-950 to-transparent px-6 pb-5 pt-16">
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-copper-400">
                  KENZ / MODEL / LOD 350–400
                </p>
                <p className="mt-1 font-display text-lg uppercase text-white">
                  From model to erection
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-copper-500/60 to-transparent" />
      </section>

      {/* ── DELIVERY PROCESS ─────────────────────────────────── */}
      <section className="relative py-28 overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(#0a1420 1px, transparent 1px), linear-gradient(90deg, #0a1420 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-copper-500/20 bg-copper-500/5 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.25em] text-copper-600">
              <Workflow size={12} />
              Project Approach
            </div>
            <h2 className="mt-6 font-display text-4xl uppercase text-navy-950 sm:text-5xl lg:text-6xl">
              A Structured{" "}
              <span className="bg-gradient-to-r from-copper-600 to-copper-400 bg-clip-text text-transparent">
                Delivery Process
              </span>
            </h2>
          </motion.div>

          <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:items-start">
            {/* Step Navigation */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex flex-row gap-2 lg:flex-col"
            >
              {process.map((step, i) => {
                const Icon = step.icon;
                return (
                  <MagneticButton key={step.number} strength={0.15}>
                    <button
                      onClick={() => setActiveStep(i)}
                      className={`group flex w-full items-center gap-3 rounded-xl px-4 py-3.5 text-left transition-all duration-300 ${
                        activeStep === i
                          ? "border border-copper-500/40 bg-gradient-to-r from-copper-500/15 to-copper-500/5 shadow-lg shadow-copper-500/10"
                          : "border border-steel-200 bg-white hover:border-copper-500/30 hover:shadow-md"
                      }`}
                    >
                      <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-all duration-300 ${
                        activeStep === i
                          ? "bg-copper-500 text-white shadow-lg shadow-copper-500/30"
                          : "border border-steel-200 text-steel-500 group-hover:border-copper-500/40 group-hover:text-copper-600"
                      }`}>
                        <Icon size={15} />
                      </span>
                      <span className={`hidden text-xs font-bold uppercase tracking-wider transition-colors lg:block ${
                        activeStep === i ? "text-copper-700" : "text-steel-600 group-hover:text-navy-950"
                      }`}>
                        {step.title}
                      </span>
                      <span className={`ml-auto hidden font-mono text-[10px] lg:block ${
                        activeStep === i ? "text-copper-500" : "text-steel-400"
                      }`}>
                        {step.number}
                      </span>
                    </button>
                  </MagneticButton>
                );
              })}
            </motion.div>

            {/* Active Step Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 12, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.99 }}
                transition={{ duration: 0.4 }}
              >
                <TiltCard
                  maxTilt={6}
                  className="relative overflow-hidden rounded-2xl border border-steel-200 bg-white p-8 shadow-[0_15px_50px_rgba(0,0,0,0.05)] lg:p-10"
                >
                  {/* CAD corners */}
                  <div className="pointer-events-none absolute left-3 top-3 h-3 w-3 border-l-2 border-t-2 border-copper-500/30" />
                  <div className="pointer-events-none absolute right-3 top-3 h-3 w-3 border-r-2 border-t-2 border-copper-500/30" />
                  <div className="pointer-events-none absolute bottom-3 left-3 h-3 w-3 border-b-2 border-l-2 border-copper-500/30" />
                  <div className="pointer-events-none absolute bottom-3 right-3 h-3 w-3 border-b-2 border-r-2 border-copper-500/30" />

                  <div className="flex items-center gap-3 border-b border-steel-100 pb-5">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-copper-500/20 to-copper-500/5 border border-copper-500/20">
                      {(() => { const Icon = process[activeStep].icon; return <Icon size={18} className="text-copper-600" />; })()}
                    </span>
                    <div>
                      <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-copper-500">
                        Phase {process[activeStep].number}
                      </p>
                    </div>
                    <span className="ml-auto font-mono text-[10px] text-steel-400">
                      KENZ / PROCESS
                    </span>
                  </div>

                  <h3 className="mt-6 font-display text-3xl uppercase tracking-tight text-navy-950 sm:text-4xl">
                    {process[activeStep].title}
                  </h3>
                  <p className="mt-2 text-sm font-semibold uppercase tracking-wider text-copper-600">
                    {process[activeStep].description}
                  </p>
                  <p className="mt-5 text-base leading-relaxed text-steel-600">
                    {process[activeStep].detail}
                  </p>

                  <div className="mt-8 h-px w-full bg-gradient-to-r from-copper-500/40 via-copper-500/20 to-transparent" />

                  {/* Step progress indicators */}
                  <div className="mt-5 flex gap-2">
                    {process.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveStep(i)}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          i === activeStep ? "w-8 bg-copper-500" : "w-3 bg-steel-200 hover:bg-steel-300"
                        }`}
                      />
                    ))}
                  </div>
                </TiltCard>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ── CAPABILITIES GRID ─────────────────────────────────── */}
      <section className="relative overflow-hidden bg-navy-950 text-white py-28">
        {/* Blueprint */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
        <div className="pointer-events-none absolute -right-60 top-0 h-[500px] w-[500px] rounded-full bg-copper-500/10 blur-[160px]" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
          >
            <div>
              <div className="inline-flex items-center gap-2 rounded-md border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-copper-400 backdrop-blur-md">
                <Layers size={13} />
                <span>Project Portfolio</span>
              </div>
              <h2 className="mt-5 font-display text-4xl uppercase sm:text-5xl lg:text-6xl">
                Technical Capabilities
                <span className="block bg-gradient-to-r from-copper-400 via-copper-300 to-copper-500 bg-clip-text text-transparent">
                  Across the Steel Lifecycle
                </span>
              </h2>
            </div>
            <span className="font-mono text-[10px] tracking-[0.2em] text-steel-500">
              KENZ / SRV / 001–006
            </span>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {projectTypes.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.number}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.07 }}
                >
                  <TiltCard maxTilt={8}>
                    <SpotlightCard
                      glowColor="rgba(193,122,62,0.18)"
                      className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.07] via-white/[0.02] to-transparent p-7 transition-all duration-500 hover:border-copper-500/40 hover:shadow-[0_20px_50px_rgba(193,122,62,0.15)]"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[11px] font-bold text-copper-400">
                          {item.number}
                        </span>
                        <span className="rounded-full border border-copper-500/20 bg-copper-500/10 px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-copper-300">
                          {item.tag}
                        </span>
                      </div>

                      <div className="mt-5 flex h-11 w-11 items-center justify-center rounded-xl border border-copper-500/30 bg-copper-500/10 transition-all duration-300 group-hover:bg-copper-500 group-hover:shadow-lg group-hover:shadow-copper-500/30">
                        <Icon size={20} className="text-copper-400 transition-colors group-hover:text-white" />
                      </div>

                      <h3 className="mt-5 font-display text-xl uppercase tracking-wide transition-colors duration-300 group-hover:text-copper-300">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-xs leading-relaxed text-steel-400">
                        {item.desc}
                      </p>

                      <div className="mt-6 flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-copper-400 opacity-0 transition-all duration-300 group-hover:opacity-100">
                        <Link href={item.href} className="flex items-center gap-1.5 hover:text-copper-300">
                          View Service <ArrowUpRight size={12} />
                        </Link>
                      </div>

                      <div className="mt-4 h-px w-0 bg-gradient-to-r from-copper-500 to-copper-300 transition-all duration-500 group-hover:w-full" />
                    </SpotlightCard>
                  </TiltCard>
                </motion.div>
              );
            })}
          </div>

          {/* Notice */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-10 flex items-start gap-4 rounded-2xl border border-copper-500/20 bg-copper-500/5 p-6 backdrop-blur-sm"
          >
            <CheckCircle2 className="h-5 w-5 shrink-0 text-copper-400 mt-0.5" />
            <p className="text-sm leading-relaxed text-steel-400">
              Selected project case studies will be added here as actual projects, drawings,
              images, or client-approved portfolio information become available.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── 3 QUALITY PILLARS ─────────────────────────────────── */}
      <section className="relative py-24 overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(#0a1420 1px, transparent 1px), linear-gradient(90deg, #0a1420 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="font-display text-3xl uppercase text-navy-950 sm:text-4xl">
              Built on Three{" "}
              <span className="bg-gradient-to-r from-copper-600 to-copper-400 bg-clip-text text-transparent">
                Core Principles
              </span>
            </h2>
          </motion.div>

          <div className="grid gap-5 md:grid-cols-3">
            {pillars.map(({ icon: Icon, label, desc }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
              >
                <MagneticButton strength={0.1}>
                  <SpotlightCard
                    glowColor="rgba(193,122,62,0.10)"
                    className="group relative overflow-hidden rounded-2xl border border-steel-200 bg-white p-7 transition-all duration-500 hover:-translate-y-1 hover:border-copper-500/40 hover:shadow-[0_20px_50px_rgba(193,122,62,0.1)]"
                  >
                    <div className="absolute top-0 left-0 h-0.5 w-0 bg-gradient-to-r from-copper-500 to-copper-400 transition-all duration-500 group-hover:w-full" />
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-copper-500/30 bg-copper-500/10 transition-all group-hover:bg-copper-500">
                      <Icon size={20} className="text-copper-600 transition-colors group-hover:text-white" />
                    </div>
                    <h3 className="mt-5 font-display text-2xl uppercase text-navy-950 transition-colors group-hover:text-copper-600">
                      {label}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-steel-600">{desc}</p>
                  </SpotlightCard>
                </MagneticButton>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-28">
        <div className="absolute inset-0 bg-gradient-to-br from-copper-600 via-copper-500 to-copper-700" />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
        <div className="pointer-events-none absolute -left-40 top-0 h-[400px] w-[400px] rounded-full bg-white/10 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-4xl uppercase text-white sm:text-5xl lg:text-6xl">
                Have a Project to Discuss?
              </h2>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-white/70">
                Get in touch with our team for a detailed technical consultation and project evaluation.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mt-10 flex flex-col gap-4 sm:flex-row"
            >
              <MagneticButton>
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-3 rounded-xl bg-white px-8 py-4 text-xs font-bold uppercase tracking-[0.18em] text-copper-600 shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl"
                >
                  Start a Conversation
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </Link>
              </MagneticButton>
              <MagneticButton>
                <Link
                  href="/services"
                  className="group inline-flex items-center gap-3 rounded-xl border-2 border-white/30 bg-white/10 px-8 py-4 text-xs font-bold uppercase tracking-[0.18em] text-white backdrop-blur-sm transition-all hover:border-white/50 hover:bg-white/20"
                >
                  View All Services
                  <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </MagneticButton>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}