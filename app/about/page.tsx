"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  CheckCircle2,
  Compass,
  Crosshair,
  Eye,
  Layers3,
  MessageSquare,
  Rocket,
  ShieldCheck,
  Sparkles,
  Target,
  Zap,
} from "lucide-react";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";

/* ═══════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════ */

const commitments = [
  { text: "Timely delivery", icon: Zap },
  { text: "Clear communication", icon: MessageSquare },
  { text: "Advanced technology", icon: Sparkles },
  { text: "Continuous improvement", icon: Rocket },
  { text: "Consistent quality", icon: ShieldCheck },
  { text: "Long-term client partnerships", icon: Check },
];

const capabilities = [
  "Structural steel detailing",
  "Miscellaneous steel",
  "Joist & deck detailing",
  "3D modeling",
  "Shop drawings",
  "Erection drawings",
  "BIM coordination",
  "Connection support",
  "Steel estimating",
];

const stats = [
  { value: 100, suffix: "%", label: "Accuracy Focused" },
  { value: 6, suffix: "+", label: "Core Services" },
  { value: 350, suffix: "+", label: "BIM LOD Ready" },
  { value: 24, suffix: "h", label: "SLA Response" },
];

const approach = [
  {
    icon: Compass,
    tag: "Precision",
    title: "Built Around Precision",
    description:
      "Steel projects require coordination, accuracy, consistency, and an understanding of fabrication and erection requirements.",
  },
  {
    icon: Layers3,
    tag: "Technology",
    title: "Modern BIM Workflows",
    description:
      "Modern modeling and coordination workflows support clearer communication between design, detailing, fabrication, and erection.",
  },
  {
    icon: MessageSquare,
    tag: "Reliability",
    title: "Dedicated Delivery",
    description:
      "We aim to operate as a dependable extension of our clients' project teams through communication, coordination, and consistent delivery.",
  },
];

const timeline = [
  {
    year: "Foundation",
    title: "Established Engineering Practice",
    text: "Kenz Engineering LLC was founded with a clear focus: structural steel detailing and engineering support built around accuracy, coordination, and practical delivery.",
  },
  {
    year: "Growth",
    title: "Expanded Service Capabilities",
    text: "Extended from core structural steel to cover miscellaneous detailing, joist & deck, BIM coordination, connection design support, and estimation services.",
  },
  {
    year: "Innovation",
    title: "Modern BIM-First Workflows",
    text: "Adopted advanced 3D modeling and BIM-integrated workflows to support clearer communication and model-based coordination between project teams.",
  },
  {
    year: "Today",
    title: "Trusted US Market Partner",
    text: "Operating as a dependable extension of client project teams across the North American market, with focus on consistent quality and long-term partnerships.",
  },
];

/* ═══════════════════════════════════════════════════
   ANIMATED COUNTER COMPONENT
   ═══════════════════════════════════════════════════ */
function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (inView) {
      const controls = animate(count, value, {
        duration: 2,
        ease: [0.22, 1, 0.36, 1],
      });
      const unsub = rounded.on("change", (v) => setDisplay(v));
      return () => {
        controls.stop();
        unsub();
      };
    }
  }, [inView, count, rounded, value]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

/* ═══════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════ */
export default function AboutPage() {
  const [activeTimeline, setActiveTimeline] = useState(0);

  return (
    <main className="min-h-screen bg-[#fafbfc] text-ink overflow-hidden">
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-navy-950 text-white pt-40 pb-32 md:pb-40">
        {/* Dynamic Blueprint Background Grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `
              linear-gradient(#ffffff 1px, transparent 1px),
              linear-gradient(90deg, #ffffff 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />

        {/* Ambient Radial Illumination */}
        <div className="pointer-events-none absolute -left-48 top-1/4 h-[550px] w-[550px] rounded-full bg-copper-500/12 blur-[140px]" />
        <div className="pointer-events-none absolute -right-48 bottom-1/4 h-[550px] w-[550px] rounded-full bg-copper-600/12 blur-[150px]" />

        {/* Technical Coordinate Watermark */}
        <div className="pointer-events-none absolute right-8 top-32 hidden font-mono text-[10px] tracking-[0.25em] text-white/20 lg:block">
          CAD // KENZ-ENG • ABT-001 • REV.02
        </div>

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            {/* Left Content Column */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              {/* Dual Modern Badges */}
              <div className="mb-7 flex flex-wrap items-center gap-3">
                <div className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-copper-400 backdrop-blur-md">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-copper-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-copper-500" />
                  </span>
                  02 / About Kenz Engineering
                </div>

                <div className="inline-flex items-center gap-1.5 rounded-full border border-copper-500/30 bg-copper-500/10 px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-copper-300">
                  <Sparkles size={12} className="text-copper-400" />
                  Established Practice
                </div>
              </div>

              {/* Monumental Headline */}
              <h1 className="font-display text-5xl uppercase leading-[0.92] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
                Engineering
                <span className="block bg-gradient-to-r from-copper-400 via-copper-300 to-copper-500 bg-clip-text text-transparent drop-shadow-sm">
                  Detail That
                </span>
                Moves Forward.
              </h1>

              {/* Description with Vertical Accent Line */}
              <div className="mt-8 border-l-2 border-copper-500/60 pl-5">
                <p className="max-w-xl text-base leading-relaxed text-steel-400 md:text-lg">
                  Kenz Engineering LLC provides structural steel detailing and
                  engineering support solutions focused on accuracy, coordination,
                  practical delivery, and dependable project support.
                </p>
              </div>

              {/* Technical Quick Spec Chips */}
              <div className="mt-8 flex flex-wrap items-center gap-3 text-xs text-steel-300">
                <div className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 backdrop-blur-sm">
                  <CheckCircle2 size={13} className="text-copper-400" />
                  <span>AISC & NISD Standard</span>
                </div>
                <div className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 backdrop-blur-sm">
                  <CheckCircle2 size={13} className="text-copper-400" />
                  <span>LOD 350-400 BIM</span>
                </div>
                <div className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 backdrop-blur-sm">
                  <CheckCircle2 size={13} className="text-copper-400" />
                  <span>North American Focus</span>
                </div>
              </div>
            </motion.div>

            {/* Right Side: Glassmorphic Company Profile Cockpit */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="relative overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-br from-white/[0.08] via-white/[0.03] to-transparent p-7 shadow-[0_25px_60px_rgba(0,0,0,0.45)] backdrop-blur-xl md:p-8"
            >
              {/* CAD Crosshair Corner Accents */}
              <div className="pointer-events-none absolute left-3 top-3 h-3 w-3 border-l-2 border-t-2 border-copper-400/50" />
              <div className="pointer-events-none absolute right-3 top-3 h-3 w-3 border-r-2 border-t-2 border-copper-400/50" />
              <div className="pointer-events-none absolute bottom-3 left-3 h-3 w-3 border-b-2 border-l-2 border-copper-400/50" />
              <div className="pointer-events-none absolute bottom-3 right-3 h-3 w-3 border-b-2 border-r-2 border-copper-400/50" />

              {/* Console Header Strip */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-400">
                    Company Profile
                  </span>
                </div>

                <span className="font-mono text-[10px] text-white/40">
                  KENZ-LLC // EST.
                </span>
              </div>

              {/* Company Identity Block */}
              <div className="mt-6 flex items-start gap-4">
                <div className="flex h-13 w-13 shrink-0 items-center justify-center rounded-2xl border border-copper-500/30 bg-copper-500/15 text-copper-400 shadow-inner">
                  <Crosshair size={24} className="animate-[pulse_3s_ease-in-out_infinite]" />
                </div>
                <div>
                  <p className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-copper-400">
                    Engineering Focus
                  </p>
                  <h3 className="mt-1 text-xl font-bold tracking-tight text-white">
                    Steel Detailing & BIM Support
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-steel-400">
                    Structural steel detailing, engineering support, and
                    BIM-integrated coordination for the North American market.
                  </p>
                </div>
              </div>

              {/* 4 Telemetry Metrics */}
              <div className="mt-7 grid grid-cols-2 gap-2.5 rounded-2xl border border-white/10 bg-white/5 p-3 text-center">
                <div className="rounded-xl border border-white/5 bg-white/5 py-2.5">
                  <p className="font-display text-xl text-copper-300 sm:text-2xl">6+</p>
                  <p className="text-[9px] uppercase tracking-wider text-steel-400">Services</p>
                </div>
                <div className="rounded-xl border border-white/5 bg-white/5 py-2.5">
                  <p className="font-display text-xl text-copper-300 sm:text-2xl">AISC</p>
                  <p className="text-[9px] uppercase tracking-wider text-steel-400">Standards</p>
                </div>
                <div className="rounded-xl border border-white/5 bg-white/5 py-2.5">
                  <p className="font-display text-xl text-copper-300 sm:text-2xl">100%</p>
                  <p className="text-[9px] uppercase tracking-wider text-steel-400">Accuracy</p>
                </div>
                <div className="rounded-xl border border-white/5 bg-white/5 py-2.5">
                  <p className="font-display text-xl text-copper-300 sm:text-2xl">BIM</p>
                  <p className="text-[9px] uppercase tracking-wider text-steel-400">Workflow</p>
                </div>
              </div>

              {/* Quick CTA */}
              <Link
                href="/services"
                className="group mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-copper-600 to-copper-500 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-copper-500/20 transition-all hover:scale-[1.02] hover:shadow-copper-500/30"
              >
                <span>Explore Our Services</span>
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Bottom Accent Gradient Beam */}
        <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-copper-500/60 to-transparent" />
      </section>

      {/* ── ANIMATED STATS DASHBOARD ──────────────────────────── */}
      <section className="relative z-20 -mt-10 px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 gap-3 rounded-2xl border border-steel-200 bg-white p-4 shadow-[0_20px_60px_rgba(0,0,0,0.06)] md:grid-cols-4"
          >
            {stats.map((s, i) => (
              <div
                key={s.label}
                className="group relative overflow-hidden rounded-xl border border-steel-100 bg-gradient-to-br from-steel-50/80 to-white p-5 text-center transition-all duration-500 hover:border-copper-500/30 hover:shadow-lg"
              >
                {/* Subtle hover glow */}
                <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-br from-copper-500/0 to-copper-500/0 transition-all duration-500 group-hover:from-copper-500/5 group-hover:to-copper-500/10" />
                <p className="relative font-display text-3xl tracking-tight sm:text-4xl">
                  <span className="bg-gradient-to-r from-copper-600 to-copper-400 bg-clip-text text-transparent">
                    <AnimatedCounter value={s.value} suffix={s.suffix} />
                  </span>
                </p>
                <p className="relative mt-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-steel-500">
                  {s.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── WHO WE ARE ───────────────────────────────────────── */}
      <section className="relative py-28 overflow-hidden">
        {/* Faint background pattern */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(#0a1420 1px, transparent 1px),
              linear-gradient(90deg, #0a1420 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            {/* Left */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-copper-500/20 bg-copper-500/5 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.25em] text-copper-600">
                <Eye size={12} />
                Who We Are
              </div>
              <h2 className="mt-6 font-display text-4xl uppercase leading-[0.95] tracking-tight text-navy-950 sm:text-5xl lg:text-6xl">
                Detail-focused.
                <span className="block bg-gradient-to-r from-copper-600 to-copper-400 bg-clip-text text-transparent">
                  Project-minded.
                </span>
              </h2>
              <div className="mt-8 h-px w-24 bg-gradient-to-r from-copper-500 to-transparent" />
              <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-steel-400">
                KENZ / IDENTITY / 001
              </p>
            </motion.div>

            {/* Right — Glassmorphic Content Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="relative overflow-hidden rounded-2xl border border-steel-200 bg-white p-8 shadow-[0_15px_50px_rgba(0,0,0,0.05)] lg:p-10"
            >
              {/* CAD corner accents */}
              <div className="pointer-events-none absolute left-3 top-3 h-3 w-3 border-l-2 border-t-2 border-copper-500/30" />
              <div className="pointer-events-none absolute right-3 top-3 h-3 w-3 border-r-2 border-t-2 border-copper-500/30" />
              <div className="pointer-events-none absolute bottom-3 left-3 h-3 w-3 border-b-2 border-l-2 border-copper-500/30" />
              <div className="pointer-events-none absolute bottom-3 right-3 h-3 w-3 border-b-2 border-r-2 border-copper-500/30" />

              <div className="space-y-5 text-base leading-relaxed text-steel-700">
                <p>
                  Kenz Engineering LLC is a structural steel detailing and
                  engineering support company focused on accurate, practical, and
                  dependable solutions for steel construction.
                </p>
                <p>
                  Our work supports project teams through detailed 3D modeling,
                  fabrication-ready drawings, BIM coordination, miscellaneous
                  steel detailing, joist and deck detailing, connection support,
                  and estimating assistance.
                </p>
                <p>
                  The objective is straightforward: provide technical support
                  that helps project teams move efficiently from design intent
                  through fabrication and erection.
                </p>
              </div>

              {/* Bottom accent */}
              <div className="mt-8 h-px w-full bg-gradient-to-r from-copper-500/40 via-copper-500/20 to-transparent" />
              <div className="mt-4 flex items-center gap-2 text-xs text-steel-400">
                <ShieldCheck size={13} className="text-copper-500" />
                <span className="font-mono text-[10px] uppercase tracking-wider">
                  Accuracy-First Engineering Approach
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CAPABILITIES ─────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-navy-950 text-white">
        {/* Blueprint Grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `
              linear-gradient(#ffffff 1px, transparent 1px),
              linear-gradient(90deg, #ffffff 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
        {/* Ambient Glow */}
        <div className="pointer-events-none absolute -left-60 top-0 h-[500px] w-[500px] rounded-full bg-copper-500/10 blur-[160px]" />

        <div className="relative mx-auto max-w-7xl px-6 py-28 lg:px-8">
          <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.25em] text-copper-400 backdrop-blur-md">
                <Sparkles size={12} />
                Core Expertise
              </div>
              <h2 className="mt-6 font-display text-4xl uppercase leading-tight sm:text-5xl lg:text-6xl">
                Built Around
                <span className="block bg-gradient-to-r from-copper-400 via-copper-300 to-copper-500 bg-clip-text text-transparent">
                  Technical Capability
                </span>
              </h2>
            </motion.div>

            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="font-mono text-[10px] tracking-[0.2em] text-steel-500"
            >
              KENZ / CAPABILITIES / 001
            </motion.span>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.06 }}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.06] via-white/[0.02] to-transparent p-6 backdrop-blur-sm transition-all duration-500 hover:border-copper-500/40 hover:shadow-[0_15px_40px_rgba(193,122,62,0.12)]"
              >
                {/* Hover glow */}
                <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-copper-500/0 to-copper-500/0 transition-all duration-500 group-hover:from-copper-500/5 group-hover:to-copper-500/10" />

                <div className="relative flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-copper-500/30 bg-copper-500/10 font-mono text-xs font-bold text-copper-400 transition-all duration-300 group-hover:bg-copper-500 group-hover:text-white group-hover:border-copper-500">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-sm font-semibold uppercase tracking-wide text-white transition-colors duration-300 group-hover:text-copper-300">
                      {item}
                    </h3>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-steel-500 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:text-copper-400" />
                </div>

                {/* Bottom bar animation */}
                <div className="mt-4 h-px w-0 bg-gradient-to-r from-copper-500 to-copper-300 transition-all duration-500 group-hover:w-full" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OUR APPROACH ──────────────────────────────────────── */}
      <section className="relative py-28 overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(#0a1420 1px, transparent 1px),
              linear-gradient(90deg, #0a1420 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16 text-center"
          >
            <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-copper-500/20 bg-copper-500/5 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.25em] text-copper-600">
              <Compass size={12} />
              Our Approach
            </div>
            <h2 className="mt-6 font-display text-4xl uppercase leading-tight text-navy-950 sm:text-5xl lg:text-6xl">
              How We{" "}
              <span className="bg-gradient-to-r from-copper-600 to-copper-400 bg-clip-text text-transparent">
                Work
              </span>
            </h2>
          </motion.div>

          <div className="grid gap-6 lg:grid-cols-3">
            {approach.map(({ icon: Icon, tag, title, description }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                className="group relative overflow-hidden rounded-2xl border border-steel-200 bg-white p-8 transition-all duration-500 hover:-translate-y-1 hover:border-copper-500/40 hover:shadow-[0_20px_60px_rgba(193,122,62,0.1)]"
              >
                {/* Top copper accent line on hover */}
                <div className="absolute top-0 left-0 h-0.5 w-0 bg-gradient-to-r from-copper-500 to-copper-400 transition-all duration-500 group-hover:w-full" />

                {/* CAD corner accents */}
                <div className="pointer-events-none absolute left-2 top-2 h-2.5 w-2.5 border-l border-t border-copper-500/0 transition-all duration-500 group-hover:border-copper-500/40" />
                <div className="pointer-events-none absolute right-2 top-2 h-2.5 w-2.5 border-r border-t border-copper-500/0 transition-all duration-500 group-hover:border-copper-500/40" />

                {/* Tag */}
                <span className="inline-flex items-center gap-1 rounded-full border border-copper-500/20 bg-copper-500/5 px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-copper-600">
                  {tag}
                </span>

                {/* Icon */}
                <div className="mt-5 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-copper-500/30 bg-gradient-to-br from-copper-500/15 to-copper-500/5 transition-all duration-300 group-hover:from-copper-500/25 group-hover:to-copper-500/10">
                  <Icon className="h-6 w-6 text-copper-600 transition-colors group-hover:text-copper-500" />
                </div>

                <h3 className="mt-5 font-display text-xl uppercase tracking-wide text-navy-950 transition-colors duration-300 group-hover:text-copper-600">
                  {title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-steel-600">{description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── JOURNEY TIMELINE ───────────────────────────────────── */}
      <section className="relative overflow-hidden bg-navy-950 text-white py-28">
        {/* Blueprint Grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `
              linear-gradient(#ffffff 1px, transparent 1px),
              linear-gradient(90deg, #ffffff 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
        <div className="pointer-events-none absolute -right-60 top-0 h-[500px] w-[500px] rounded-full bg-copper-600/10 blur-[160px]" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.25em] text-copper-400 backdrop-blur-md">
              <Sparkles size={12} />
              Our Journey
            </div>
            <h2 className="mt-6 font-display text-4xl uppercase leading-tight sm:text-5xl lg:text-6xl">
              Building a{" "}
              <span className="bg-gradient-to-r from-copper-400 via-copper-300 to-copper-500 bg-clip-text text-transparent">
                Legacy
              </span>
            </h2>
          </motion.div>

          <div className="grid gap-8 lg:grid-cols-[280px_1fr] lg:items-start">
            {/* Timeline Navigation */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex gap-2 lg:flex-col"
            >
              {timeline.map((item, i) => (
                <button
                  key={item.year}
                  onClick={() => setActiveTimeline(i)}
                  className={`group relative flex items-center gap-3 rounded-xl px-4 py-3 text-left transition-all duration-300 ${
                    activeTimeline === i
                      ? "border border-copper-500/40 bg-copper-500/15 shadow-lg shadow-copper-500/10"
                      : "border border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10"
                  }`}
                >
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg font-mono text-xs font-bold transition-all duration-300 ${
                      activeTimeline === i
                        ? "bg-copper-500 text-white"
                        : "border border-white/15 text-steel-400 group-hover:border-copper-500/30 group-hover:text-copper-400"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`hidden text-xs font-semibold uppercase tracking-wider transition-colors lg:block ${
                      activeTimeline === i ? "text-copper-300" : "text-steel-500 group-hover:text-steel-300"
                    }`}
                  >
                    {item.year}
                  </span>
                </button>
              ))}
            </motion.div>

            {/* Active Timeline Content */}
            <motion.div
              key={activeTimeline}
              initial={{ opacity: 0, y: 15, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-br from-white/[0.08] via-white/[0.03] to-transparent p-8 backdrop-blur-sm lg:p-10"
            >
              {/* CAD Crosshair Corner Accents */}
              <div className="pointer-events-none absolute left-3 top-3 h-3 w-3 border-l-2 border-t-2 border-copper-400/50" />
              <div className="pointer-events-none absolute right-3 top-3 h-3 w-3 border-r-2 border-t-2 border-copper-400/50" />
              <div className="pointer-events-none absolute bottom-3 left-3 h-3 w-3 border-b-2 border-l-2 border-copper-400/50" />
              <div className="pointer-events-none absolute bottom-3 right-3 h-3 w-3 border-b-2 border-r-2 border-copper-400/50" />

              <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                <span className="h-2 w-2 rounded-full bg-copper-400 animate-pulse" />
                <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-copper-400">
                  Phase {String(activeTimeline + 1).padStart(2, "0")} — {timeline[activeTimeline].year}
                </span>
              </div>

              <h3 className="mt-6 font-display text-3xl uppercase tracking-tight text-white sm:text-4xl">
                {timeline[activeTimeline].title}
              </h3>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-steel-400">
                {timeline[activeTimeline].text}
              </p>

              <div className="mt-8 h-px w-full bg-gradient-to-r from-copper-500/40 via-copper-500/20 to-transparent" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── VISION / MISSION ─────────────────────────────────── */}
      <section className="relative py-28 overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(#0a1420 1px, transparent 1px),
              linear-gradient(90deg, #0a1420 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16 text-center"
          >
            <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-copper-500/20 bg-copper-500/5 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.25em] text-copper-600">
              <Target size={12} />
              Our Purpose
            </div>
            <h2 className="mt-6 font-display text-4xl uppercase leading-tight text-navy-950 sm:text-5xl lg:text-6xl">
              Vision &{" "}
              <span className="bg-gradient-to-r from-copper-600 to-copper-400 bg-clip-text text-transparent">
                Mission
              </span>
            </h2>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Vision Card */}
            <motion.div
              initial={{ opacity: 0, x: -25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="group relative overflow-hidden rounded-2xl border border-navy-950/10 bg-navy-950 p-8 text-white transition-all duration-500 hover:shadow-[0_25px_60px_rgba(10,20,32,0.3)] lg:p-10"
            >
              {/* Ambient Glow */}
              <div className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-copper-500/15 blur-[80px]" />

              {/* CAD corners */}
              <div className="pointer-events-none absolute left-3 top-3 h-3 w-3 border-l-2 border-t-2 border-copper-400/40" />
              <div className="pointer-events-none absolute right-3 top-3 h-3 w-3 border-r-2 border-t-2 border-copper-400/40" />
              <div className="pointer-events-none absolute bottom-3 left-3 h-3 w-3 border-b-2 border-l-2 border-copper-400/40" />
              <div className="pointer-events-none absolute bottom-3 right-3 h-3 w-3 border-b-2 border-r-2 border-copper-400/40" />

              <div className="relative">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-copper-500/30 bg-copper-500/15">
                  <Eye className="h-6 w-6 text-copper-400" />
                </div>
                <p className="mt-6 font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-copper-400">
                  Our Vision
                </p>
                <h3 className="mt-3 font-display text-2xl uppercase leading-tight text-white sm:text-3xl">
                  A Globally Trusted Steel Detailing Partner
                </h3>
                <p className="mt-4 leading-relaxed text-steel-400">
                  To become a globally trusted steel detailing partner recognized
                  for precision, reliability, innovation, and excellence.
                </p>
                <div className="mt-6 h-px w-full bg-gradient-to-r from-copper-500/40 to-transparent" />
              </div>
            </motion.div>

            {/* Mission Card */}
            <motion.div
              initial={{ opacity: 0, x: 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="group relative overflow-hidden rounded-2xl border border-copper-500/30 bg-gradient-to-br from-copper-600 to-copper-500 p-8 text-white transition-all duration-500 hover:shadow-[0_25px_60px_rgba(193,122,62,0.3)] lg:p-10"
            >
              {/* Ambient Glow */}
              <div className="pointer-events-none absolute -left-12 -bottom-12 h-48 w-48 rounded-full bg-white/10 blur-[80px]" />

              {/* CAD corners */}
              <div className="pointer-events-none absolute left-3 top-3 h-3 w-3 border-l-2 border-t-2 border-white/30" />
              <div className="pointer-events-none absolute right-3 top-3 h-3 w-3 border-r-2 border-t-2 border-white/30" />
              <div className="pointer-events-none absolute bottom-3 left-3 h-3 w-3 border-b-2 border-l-2 border-white/30" />
              <div className="pointer-events-none absolute bottom-3 right-3 h-3 w-3 border-b-2 border-r-2 border-white/30" />

              <div className="relative">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-white/30 bg-white/15">
                  <Target className="h-6 w-6 text-white" />
                </div>
                <p className="mt-6 font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-white/80">
                  Our Mission
                </p>
                <h3 className="mt-3 font-display text-2xl uppercase leading-tight text-white sm:text-3xl">
                  Accurate. Practical. Dependable.
                </h3>
                <p className="mt-4 leading-relaxed text-white/80">
                  To provide accurate, high-quality, cost-effective detailing and
                  engineering support that contributes to successful design,
                  fabrication, and erection.
                </p>
                <div className="mt-6 h-px w-full bg-gradient-to-r from-white/40 to-transparent" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── COMMITMENTS ──────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-navy-950 text-white py-28">
        {/* Blueprint Grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `
              linear-gradient(#ffffff 1px, transparent 1px),
              linear-gradient(90deg, #ffffff 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
        <div className="pointer-events-none absolute -left-40 bottom-0 h-[500px] w-[500px] rounded-full bg-copper-500/10 blur-[160px]" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16 text-center"
          >
            <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.25em] text-copper-400 backdrop-blur-md">
              <ShieldCheck size={12} />
              Our Commitments
            </div>
            <h2 className="mt-6 font-display text-4xl uppercase leading-tight sm:text-5xl lg:text-6xl">
              What You Can{" "}
              <span className="bg-gradient-to-r from-copper-400 via-copper-300 to-copper-500 bg-clip-text text-transparent">
                Count On
              </span>
            </h2>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {commitments.map(({ text, icon: Icon }, i) => (
              <motion.div
                key={text}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.06] via-white/[0.02] to-transparent p-6 backdrop-blur-sm transition-all duration-500 hover:border-copper-500/40 hover:shadow-[0_15px_40px_rgba(193,122,62,0.12)]"
              >
                {/* Hover glow */}
                <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-copper-500/0 to-copper-500/0 transition-all duration-500 group-hover:from-copper-500/5 group-hover:to-copper-500/10" />

                <div className="relative flex items-center gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-copper-500/30 bg-copper-500/10 transition-all duration-300 group-hover:bg-copper-500 group-hover:border-copper-500">
                    <Icon className="h-5 w-5 text-copper-400 transition-colors duration-300 group-hover:text-white" />
                  </div>
                  <span className="text-sm font-semibold text-white transition-colors duration-300 group-hover:text-copper-300">
                    {text}
                  </span>
                </div>

                {/* Bottom bar animation */}
                <div className="mt-4 h-px w-0 bg-gradient-to-r from-copper-500 to-copper-300 transition-all duration-500 group-hover:w-full" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-28">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-copper-600 via-copper-500 to-copper-700" />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: `
              linear-gradient(#ffffff 1px, transparent 1px),
              linear-gradient(90deg, #ffffff 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
        {/* Ambient glow */}
        <div className="pointer-events-none absolute -left-40 top-0 h-[400px] w-[400px] rounded-full bg-white/10 blur-[120px]" />
        <div className="pointer-events-none absolute -right-40 bottom-0 h-[400px] w-[400px] rounded-full bg-black/10 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.25em] text-white/90 backdrop-blur-md">
                <Sparkles size={12} />
                Work With Us
              </div>
              <h2 className="mt-8 font-display text-4xl uppercase leading-tight text-white sm:text-5xl lg:text-6xl">
                Have a Project to
                <span className="block text-white/90">Discuss?</span>
              </h2>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-white/70">
                Get in touch with our team for a detailed technical consultation
                and project evaluation.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-10 flex flex-col gap-4 sm:flex-row"
            >
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-3 rounded-xl bg-white px-8 py-4 text-xs font-bold uppercase tracking-[0.18em] text-copper-600 shadow-lg shadow-black/20 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
              >
                Talk to Our Team
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/services"
                className="group inline-flex items-center justify-center gap-3 rounded-xl border-2 border-white/30 bg-white/10 px-8 py-4 text-xs font-bold uppercase tracking-[0.18em] text-white backdrop-blur-sm transition-all duration-300 hover:border-white/50 hover:bg-white/20"
              >
                View Services
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}