"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Box,
  Cable,
  Calculator,
  CheckCircle2,
  Cpu,
  Layers3,
  Ruler,
  ScanLine,
  Sparkles,
  ShieldCheck,
  Workflow,
  Crosshair,
  BarChart3,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MagneticButton,
  TiltCard,
  SpotlightCard,
  ShimmerText,
  RevealText,
  CountUp,
  GlitchText,
  FloatingParticles,
  ScrollProgressBar,
} from "@/components/ui/ReactBits";

/* ═══════════════════════════════════════════════ DATA ═══ */

const stats = [
  { value: 6, suffix: "+", label: "Disciplines" },
  { value: 100, suffix: "%", label: "Accuracy" },
  { value: 350, suffix: "+", label: "BIM LOD" },
  { value: 24, suffix: "h", label: "SLA Response" },
];

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
    icon: Cpu,
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

        {/* Floating particles */}
        <FloatingParticles count={20} />

        {/* Technical watermark */}
        <div className="pointer-events-none absolute right-8 top-32 hidden font-mono text-[10px] tracking-[0.25em] text-white/20 lg:block">
          CAD // KENZ-PRJ • EXP-001
        </div>

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">

            {/* Left */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              {/* Badge */}
              <div className="mb-7 flex flex-wrap items-center gap-3">
                <div className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-copper-400 backdrop-blur-md">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-copper-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-copper-500" />
                  </span>
                  03 / Project Experience
                </div>
                <div className="inline-flex items-center gap-1.5 rounded-full border border-copper-500/30 bg-copper-500/10 px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-copper-300">
                  <Sparkles size={11} className="text-copper-400" />
                  6 Core Disciplines
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

            {/* Right — Glassmorphic Cockpit */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="relative overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-br from-white/[0.08] via-white/[0.03] to-transparent p-7 shadow-[0_25px_60px_rgba(0,0,0,0.45)] backdrop-blur-xl md:p-8"
            >
              {/* CAD corners */}
              <div className="pointer-events-none absolute left-3 top-3 h-3 w-3 border-l-2 border-t-2 border-copper-400/50" />
              <div className="pointer-events-none absolute right-3 top-3 h-3 w-3 border-r-2 border-t-2 border-copper-400/50" />
              <div className="pointer-events-none absolute bottom-3 left-3 h-3 w-3 border-b-2 border-l-2 border-copper-400/50" />
              <div className="pointer-events-none absolute bottom-3 right-3 h-3 w-3 border-b-2 border-r-2 border-copper-400/50" />

              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-400">Project Registry</span>
                </div>
                <span className="font-mono text-[10px] text-white/40">KENZ-PRJ // 2026</span>
              </div>

              <div className="mt-6 flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-copper-500/30 bg-copper-500/15 text-copper-400 shadow-inner">
                  <Cpu size={22} className="animate-[pulse_3s_ease-in-out_infinite]" />
                </div>
                <div>
                  <p className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-copper-400">Active Disciplines</p>
                  <h3 className="mt-1 text-xl font-bold tracking-tight text-white">6 Core Service Areas</h3>
                  <p className="mt-2 text-xs leading-relaxed text-steel-400">
                    Full-cycle structural steel support from estimation to erection drawings.
                  </p>
                </div>
              </div>

              {/* Metric grid */}
              <div className="mt-7 grid grid-cols-2 gap-2.5 rounded-2xl border border-white/10 bg-white/5 p-3 text-center">
                {stats.map((s) => (
                  <div key={s.label} className="rounded-xl border border-white/5 bg-white/5 py-2.5">
                    <p className="font-display text-xl text-copper-300 sm:text-2xl">
                      <CountUp to={s.value} suffix={s.suffix} />
                    </p>
                    <p className="text-[9px] uppercase tracking-wider text-steel-400">{s.label}</p>
                  </div>
                ))}
              </div>

              <Link
                href="/contact"
                className="group mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-copper-600 to-copper-500 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-copper-500/20 transition-all hover:scale-[1.02]"
              >
                Start a Project
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
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
                    <GlitchText>{process[activeStep].title}</GlitchText>
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
        <FloatingParticles count={14} />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
          >
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.25em] text-copper-400 backdrop-blur-md">
                <Sparkles size={12} />
                Project Portfolio
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
        <FloatingParticles count={12} />
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