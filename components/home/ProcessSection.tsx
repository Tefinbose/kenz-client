"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Compass,
  Workflow,
  Box,
  Ruler,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ChevronRight,
  Layers,
  FileCheck,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const steps = [
  {
    number: "01",
    phase: "Phase 01",
    title: "Understand",
    subtitle: "Scope & Specification Intake",
    description:
      "We begin by understanding project requirements, detailing standards, schedules, fabrication requirements, and coordination expectations.",
    deliverables: [
      "Specification Review",
      "AISC / NISD Alignment",
      "Schedule Synchronization",
      "Fabrication Requirements",
    ],
    icon: Compass,
    badge: "Milestone: Kickoff & Scope Lock",
    code: "KENZ-STG-01",
    summary:
      "Direct engagement with fabricators and engineers to eliminate downstream ambiguities early.",
  },
  {
    number: "02",
    phase: "Phase 02",
    title: "Coordinate",
    subtitle: "Multi-Discipline Clash Review",
    description:
      "Project information is reviewed and coordinated with structural, architectural, fabrication, and erection requirements.",
    deliverables: [
      "Architectural Overlay",
      "Interference Detection",
      "RFI Resolution",
      "Interface Coordination",
    ],
    icon: Workflow,
    badge: "Milestone: Structural Alignment",
    code: "KENZ-STG-02",
    summary:
      "Continuous cross-checking with design drawings to identify and resolve clashes before modeling.",
  },
  {
    number: "03",
    phase: "Phase 03",
    title: "Model",
    subtitle: "Parametric 3D BIM Detailing",
    description:
      "Our detailing team develops accurate 3D models using modern BIM workflows and industry-standard detailing practices.",
    deliverables: [
      "LOD 350-400 Modeling",
      "Connection Node Detailing",
      "Tekla Structures Integration",
      "Clash-Free Geometry",
    ],
    icon: Box,
    badge: "Milestone: 3D Model Sign-off",
    code: "KENZ-STG-03",
    summary:
      "High-fidelity intelligent steel assemblies ready for direct digital manufacturing extraction.",
  },
  {
    number: "04",
    phase: "Phase 04",
    title: "Detail",
    subtitle: "Shop Drawings & CNC Generation",
    description:
      "Models are developed into coordinated shop drawings, erection drawings, and fabrication-oriented documentation.",
    deliverables: [
      "Assembly Shop Drawings",
      "Erection Key Plans",
      "NC1 & DXF Machine Files",
      "Advance Bill of Materials",
    ],
    icon: Ruler,
    badge: "Milestone: Fabrication Package",
    code: "KENZ-STG-04",
    summary:
      "Clean, fabrication-ready drawing packages formatted to shop-specific cutting and welding standards.",
  },
  {
    number: "05",
    phase: "Phase 05",
    title: "Deliver",
    subtitle: "Quality Assurance & Handover",
    description:
      "Final deliverables are reviewed and communicated clearly to support fabrication, erection, and project schedules.",
    deliverables: [
      "Multi-Tier QA Verification",
      "Submittal Transmittal Packages",
      "Shop & Field Support",
      "Turnkey Project Closeout",
    ],
    icon: ShieldCheck,
    badge: "Milestone: Turnkey Delivery",
    code: "KENZ-STG-05",
    summary:
      "Rigorous quality sign-off followed by dependable ongoing field and shop coordination.",
  },
];

export default function ProcessSection() {
  const [activeStep, setActiveStep] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-advance preview every 6 seconds when not paused
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const current = steps[activeStep];
  const CurrentIcon = current.icon;

  return (
    <section className="relative overflow-hidden bg-navy-950 py-28 text-white md:py-36">
      {/* Background Engineering Blueprint Grid */}
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

      {/* Atmospheric Ambient Glows */}
      <div className="pointer-events-none absolute -left-48 top-1/3 h-[500px] w-[500px] rounded-full bg-copper-500/10 blur-[140px]" />
      <div className="pointer-events-none absolute -right-48 bottom-1/4 h-[500px] w-[500px] rounded-full bg-copper-600/10 blur-[150px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        {/* ================================================= */}
        {/* SECTION HEADER */}
        {/* ================================================= */}
        <div className="mb-16 grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            {/* Live Indicator Pill */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-5 inline-flex items-center gap-2 rounded-md border border-copper-500/30 bg-copper-500/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-copper-300"
            >
              <Workflow size={13} className="text-copper-400" />
              <span>Execution Pipeline & Methodology</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display text-4xl uppercase leading-[0.98] tracking-tight sm:text-5xl md:text-6xl"
            >
              From Design Intent{" "}
              <span className="block bg-gradient-to-r from-copper-400 via-copper-300 to-copper-500 bg-clip-text text-transparent">
                To Flawless Delivery.
              </span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-4"
          >
            <p className="text-base leading-relaxed text-steel-400 md:text-lg">
              A structured detailing process built around accuracy, coordination,
              communication, and dependable delivery at every fabrication phase.
            </p>

            {/* Quick Metrics Bar */}
            <div className="flex flex-wrap items-center gap-6 pt-2 text-xs font-mono text-steel-400">
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-copper-500" />
                5 Linear Stages
              </span>
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-copper-500" />
                Zero-Clash Modeling
              </span>
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-copper-500" />
                AISC / NISD Code Verified
              </span>
            </div>
          </motion.div>
        </div>

        {/* ================================================= */}
        {/* INTERACTIVE STAGE STEPPER RAIL */}
        {/* ================================================= */}
        <div className="mb-10 hidden lg:block">
          <div className="relative flex items-center justify-between">
            {/* Progress background line */}
            <div className="absolute left-8 right-8 top-1/2 h-[2px] -translate-y-1/2 bg-white/[0.08]" />

            {/* Active progress highlight line */}
            <motion.div
              className="absolute left-8 top-1/2 h-[2px] -translate-y-1/2 bg-gradient-to-r from-copper-500 to-copper-400"
              initial={false}
              animate={{
                width: `${(activeStep / (steps.length - 1)) * 92}%`,
              }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />

            {steps.map((step, idx) => {
              const isCurrent = activeStep === idx;
              const isPast = activeStep > idx;

              return (
                <button
                  key={step.number}
                  onClick={() => {
                    setIsAutoPlaying(false);
                    setActiveStep(idx);
                  }}
                  className="group relative z-10 flex flex-col items-center focus:outline-none"
                >
                  {/* Step Node Circle */}
                  <motion.div
                    whileHover={{ scale: 1.12 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex h-12 w-12 items-center justify-center rounded-xl border text-xs font-mono font-bold transition-all duration-300 ${
                      isCurrent
                        ? "border-copper-400 bg-copper-500 text-white shadow-[0_0_20px_rgba(193,122,62,0.6)]"
                        : isPast
                        ? "border-copper-500/60 bg-navy-900 text-copper-300"
                        : "border-white/10 bg-navy-900 text-steel-400 hover:border-white/20 hover:text-white"
                    }`}
                  >
                    {step.number}
                  </motion.div>

                  {/* Node Label */}
                  <span
                    className={`mt-3 text-xs font-semibold uppercase tracking-wider transition-colors duration-300 ${
                      isCurrent
                        ? "text-copper-400"
                        : "text-steel-400 group-hover:text-steel-200"
                    }`}
                  >
                    {step.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ================================================= */}
        {/* INTERACTIVE STAGE SHOWCASE (SPLIT VIEW) */}
        {/* ================================================= */}
        <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
          {/* Left Column: Interactive Step Selector Cards */}
          <div className="space-y-3">
            {steps.map((step, idx) => {
              const isCurrent = activeStep === idx;
              const StepIcon = step.icon;

              return (
                <motion.div
                  key={step.number}
                  onClick={() => {
                    setIsAutoPlaying(false);
                    setActiveStep(idx);
                  }}
                  onMouseEnter={() => {
                    setIsAutoPlaying(false);
                    setActiveStep(idx);
                  }}
                  className={`group relative cursor-pointer overflow-hidden rounded-2xl border p-5 transition-all duration-300 ${
                    isCurrent
                      ? "border-copper-500/60 bg-navy-900/90 shadow-[0_12px_30px_-10px_rgba(193,122,62,0.2)] backdrop-blur-xl"
                      : "border-white/[0.06] bg-navy-900/40 hover:border-white/15 hover:bg-navy-900/60"
                  }`}
                >
                  {/* Left Active Accent Beam */}
                  {isCurrent && (
                    <motion.div
                      layoutId="activeProcessBeam"
                      className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-copper-400 via-copper-500 to-copper-600"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}

                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      {/* Number Pill */}
                      <span
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-mono text-xs font-bold transition-colors ${
                          isCurrent
                            ? "bg-copper-500 text-white"
                            : "border border-white/10 bg-white/[0.04] text-steel-400 group-hover:text-steel-200"
                        }`}
                      >
                        {step.number}
                      </span>

                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[10px] uppercase tracking-wider text-copper-400">
                            {step.phase}
                          </span>
                          <span className="text-[10px] text-steel-500">•</span>
                          <span className="text-xs text-steel-400">{step.subtitle}</span>
                        </div>
                        <h3
                          className={`font-display text-2xl uppercase tracking-wide transition-colors ${
                            isCurrent
                              ? "text-white"
                              : "text-steel-300 group-hover:text-white"
                          }`}
                        >
                          {step.title}
                        </h3>
                      </div>
                    </div>

                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-lg transition-all ${
                        isCurrent
                          ? "bg-copper-500/20 text-copper-400"
                          : "text-steel-500 group-hover:text-steel-300"
                      }`}
                    >
                      <StepIcon size={18} />
                    </div>
                  </div>

                  {/* Summary preview on active */}
                  {isCurrent && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-3.5 pl-14 text-xs leading-relaxed text-steel-300"
                    >
                      {step.summary}
                    </motion.p>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Right Column: Dynamic Stage Inspection Canvas */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.number}
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.98 }}
                transition={{ duration: 0.4 }}
                className="relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-white/[0.08] bg-navy-900/80 p-8 backdrop-blur-2xl shadow-2xl md:p-10"
              >
                {/* Background Schematic Watermark */}
                <div className="pointer-events-none absolute -right-6 -top-10 select-none font-display text-[160px] font-bold leading-none text-white/[0.02]">
                  {current.number}
                </div>

                {/* Ambient Copper Spotlight */}
                <div className="pointer-events-none absolute -top-24 -right-24 h-56 w-56 rounded-full bg-copper-500/15 blur-3xl" />

                {/* Top Strip: Stage Code & Milestone Badge */}
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.08] pb-6">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-copper-500/40 bg-copper-500/10 text-copper-400 shadow-[0_0_15px_rgba(193,122,62,0.2)]">
                        <CurrentIcon size={24} strokeWidth={1.75} />
                      </div>
                      <div>
                        <span className="font-mono text-xs uppercase tracking-widest text-copper-400">
                          {current.phase} · {current.code}
                        </span>
                        <h4 className="font-display text-3xl uppercase tracking-wide text-white">
                          {current.title}
                        </h4>
                      </div>
                    </div>

                    <span className="rounded-full border border-copper-500/30 bg-copper-500/10 px-3 py-1 font-mono text-[11px] font-semibold text-copper-300">
                      {current.badge}
                    </span>
                  </div>

                  {/* Primary Description */}
                  <div className="mt-8">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-steel-400">
                      Standard Operating Procedure
                    </span>
                    <p className="mt-2 text-base leading-relaxed text-steel-200 md:text-lg">
                      {current.description}
                    </p>
                  </div>

                  {/* Deliverables & Outputs Breakdown */}
                  <div className="mt-8">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-steel-400">
                      Key Deliverables & Checkpoints
                    </span>

                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      {current.deliverables.map((item) => (
                        <div
                          key={item}
                          className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.03] p-3 transition-colors hover:border-copper-500/30 hover:bg-white/[0.05]"
                        >
                          <CheckCircle2 size={16} className="shrink-0 text-copper-400" />
                          <span className="text-xs font-medium text-steel-200">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Footer: Stepper Controls & Action */}
                <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.08] pt-6">
                  {/* Stepper Pagination */}
                  <div className="flex items-center gap-2">
                    {steps.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          setIsAutoPlaying(false);
                          setActiveStep(i);
                        }}
                        aria-label={`Go to step ${i + 1}`}
                        className={`h-2 rounded-full transition-all ${
                          activeStep === i
                            ? "w-8 bg-copper-500"
                            : "w-2 bg-white/20 hover:bg-white/40"
                        }`}
                      />
                    ))}
                    <span className="ml-3 font-mono text-xs text-steel-400">
                      Step {activeStep + 1} of {steps.length}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => {
                        setIsAutoPlaying(false);
                        setActiveStep((prev) => (prev + 1) % steps.length);
                      }}
                      className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-steel-200 transition-all hover:border-copper-500/50 hover:bg-copper-500/10 hover:text-copper-300"
                    >
                      <span>Next Phase</span>
                      <ChevronRight size={14} />
                    </button>

                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 rounded-xl bg-copper-500 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-md transition-all hover:bg-copper-400 hover:shadow-copper-500/25"
                    >
                      <span>Start Project</span>
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ================================================= */}
        {/* BOTTOM METRICS STRIP */}
        {/* ================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-14 flex flex-col items-center justify-between gap-6 rounded-2xl border border-white/[0.08] bg-navy-900/40 p-6 md:flex-row md:px-8"
        >
          <div className="flex items-center gap-3">
            <ShieldCheck size={20} className="shrink-0 text-copper-400" />
            <p className="text-xs text-steel-300 md:text-sm">
              <span className="font-semibold text-white">
                Turnkey Detailing Governance:
              </span>{" "}
              Every model undergoes dual-layer verification by Senior Detailing Leads
              before release.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs font-semibold text-steel-300">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={15} className="text-copper-400" />
              24-Hour RFI Turnaround SLA
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={15} className="text-copper-400" />
              100% NC1 & DXF Verified
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}