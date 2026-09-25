"use client";

import {
  useRef,
  useState,
  useEffect,
  type ReactNode,
  type MouseEvent,
} from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";

/* ══════════════════════════════════════════════════
   1. MAGNETIC BUTTON
══════════════════════════════════════════════════ */
export function MagneticButton({
  children,
  className = "",
  strength = 0.35,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 20, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 200, damping: 20, mass: 0.5 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    x.set((e.clientX - (left + width / 2)) * strength);
    y.set((e.clientY - (top + height / 2)) * strength);
  };

  return (
    <motion.div
      ref={ref}
      style={{ x: sx, y: sy }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════
   2. TILT CARD
══════════════════════════════════════════════════ */
export function TiltCard({
  children,
  className = "",
  maxTilt = 10,
}: {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const rotX = useMotionValue(0);
  const rotY = useMotionValue(0);
  const sRotX = useSpring(rotX, { stiffness: 150, damping: 18 });
  const sRotY = useSpring(rotY, { stiffness: 150, damping: 18 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    rotY.set(((e.clientX - left) / width - 0.5) * maxTilt * 2);
    rotX.set((0.5 - (e.clientY - top) / height) * maxTilt * 2);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { rotX.set(0); rotY.set(0); }}
      style={{
        rotateX: sRotX,
        rotateY: sRotY,
        transformStyle: "preserve-3d",
        transformPerspective: "800px",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════
   3. SPOTLIGHT CARD
══════════════════════════════════════════════════ */
export function SpotlightCard({
  children,
  className = "",
  glowColor = "rgba(193,122,62,0.15)",
}: {
  children: ReactNode;
  className?: string;
  glowColor?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: "50%", y: "50%" });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const { left, top } = el.getBoundingClientRect();
    setPos({ x: `${e.clientX - left}px`, y: `${e.clientY - top}px` });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative overflow-hidden ${className}`}
      style={{
        background: hovered
          ? `radial-gradient(500px circle at ${pos.x} ${pos.y}, ${glowColor}, transparent 60%)`
          : undefined,
        transition: "background 0.15s ease",
      }}
    >
      {children}
    </div>
  );
}

/* ══════════════════════════════════════════════════
   4. SHIMMER TEXT
══════════════════════════════════════════════════ */
export function ShimmerText({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-block ${className}`}
      style={{
        backgroundImage:
          "linear-gradient(90deg, #c17a3e 0%, #f0c070 40%, #c17a3e 60%, #a85f26 100%)",
        backgroundSize: "200% 100%",
        backgroundClip: "text",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        animation: "shimmer-sweep 2.8s linear infinite",
      }}
    >
      {children}
    </span>
  );
}

/* ══════════════════════════════════════════════════
   5. REVEAL TEXT (word-by-word stagger)
══════════════════════════════════════════════════ */
export function RevealText({
  text,
  className = "",
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const words = text.split(" ");
  return (
    <motion.span
      className={`inline-flex flex-wrap gap-x-[0.3em] ${className}`}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.07, delayChildren: delay } },
      }}
    >
      {words.map((word, i) => (
        <span key={i} className="overflow-hidden inline-block">
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: "105%", opacity: 0 },
              show: {
                y: 0,
                opacity: 1,
                transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
              },
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

/* ══════════════════════════════════════════════════
   6. COUNT UP
══════════════════════════════════════════════════ */
export function CountUp({
  to,
  suffix = "",
  prefix = "",
  duration = 1.8,
  className = "",
}: {
  to: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [inView, setInView] = useState(false);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold: 0.4 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / (duration * 1000), 1);
      const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
      setDisplay(Math.round(eased * to));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, to, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}{display}{suffix}
    </span>
  );
}

/* ══════════════════════════════════════════════════
   7. GLITCH TEXT
══════════════════════════════════════════════════ */
export function GlitchText({
  children,
  className = "",
}: {
  children: string;
  className?: string;
}) {
  const [glitching, setGlitching] = useState(false);

  return (
    <span
      className={`relative inline-block cursor-default select-none ${className}`}
      onMouseEnter={() => {
        setGlitching(true);
        setTimeout(() => setGlitching(false), 400);
      }}
      style={{ isolation: "isolate" }}
    >
      {children}
      <AnimatePresence>
        {glitching && (
          <>
            <motion.span
              className="pointer-events-none absolute inset-0 text-copper-400"
              initial={{ x: 0, opacity: 0 }}
              animate={{ x: [-2, 3, -1, 0], opacity: [0.9, 0.5, 0.8, 0] }}
              transition={{ duration: 0.3, times: [0, 0.3, 0.7, 1] }}
              style={{ clipPath: "inset(30% 0 40% 0)" }}
            >
              {children}
            </motion.span>
            <motion.span
              className="pointer-events-none absolute inset-0"
              style={{ color: "#142b45", clipPath: "inset(60% 0 10% 0)" }}
              initial={{ x: 0, opacity: 0 }}
              animate={{ x: [3, -2, 1, 0], opacity: [0.7, 0.4, 0.6, 0] }}
              transition={{ duration: 0.3, times: [0, 0.3, 0.7, 1] }}
            >
              {children}
            </motion.span>
          </>
        )}
      </AnimatePresence>
    </span>
  );
}

/* ══════════════════════════════════════════════════
   8. FLOATING PARTICLES
══════════════════════════════════════════════════ */
export function FloatingParticles({
  count = 16,
  className = "",
}: {
  count?: number;
  className?: string;
}) {
  // Use seeded values so SSR and client match
  const particles = Array.from({ length: count }, (_, i) => ({
    id: i,
    x: ((i * 37 + 13) % 100),
    y: ((i * 53 + 7) % 100),
    size: (i % 3) + 1.5,
    delay: (i * 0.4) % 4,
    duration: ((i % 5) + 4),
  }));

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-copper-400/20"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
          animate={{ y: [0, -28, 0], opacity: [0, 0.8, 0], scale: [0.6, 1, 0.6] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════════════
   9. SCROLL PROGRESS BAR
══════════════════════════════════════════════════ */
export function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      setProgress(el.scrollTop / (el.scrollHeight - el.clientHeight));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 z-[9999] h-[2px] origin-left"
      style={{
        scaleX: progress,
        background: "linear-gradient(to right, #a85f26, #c17a3e, #d69660)",
      }}
    />
  );
}
