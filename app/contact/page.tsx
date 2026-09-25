"use client";

import ContactForm from "@/components/contact/ContactForm";
import ContactFlipCards from "@/components/contact/ContactFlipCards";
import {
  ArrowUpRight,
  ArrowDown,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";

const inquirySteps = [
  {
    step: "01",
    title: "Scope & Drawing Intake",
    desc: "We review your design drawings, specifications, and project timeline.",
  },
  {
    step: "02",
    title: "Technical Consultation",
    desc: "Direct communication with detailing coordinators to clarify connection details & schedules.",
  },
  {
    step: "03",
    title: "Detailed Proposal & Milestone Plan",
    desc: "A coordinated commercial and technical proposal aligned with shop fabrication.",
  },
];

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#fafbfc] overflow-hidden">
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-navy-950 text-white pt-40 pb-32 md:pb-40">
        {/* Dynamic Blueprint Background Grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
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
          CAD // 44°47&apos;49.9&quot;N 106°57&apos;22.3&quot;W • EL +3,743FT
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
                  04 / Contact Kenz Engineering
                </div>

                <div className="inline-flex items-center gap-1.5 rounded-full border border-copper-500/30 bg-copper-500/10 px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-copper-300">
                  <Sparkles size={12} className="text-copper-400" />
                  Direct RFQ Desk
                </div>
              </div>

              {/* Monumental Headline */}
              <h1 className="font-display text-5xl uppercase leading-[0.92] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
                Talk to
                <span className="block bg-gradient-to-r from-copper-400 via-copper-300 to-copper-500 bg-clip-text text-transparent drop-shadow-sm">
                  Kenz Engineering.
                </span>
              </h1>

              {/* Description with Vertical Accent Line */}
              <div className="mt-8 border-l-2 border-copper-500/60 pl-5">
                <p className="max-w-xl text-base leading-relaxed text-steel-400 md:text-lg">
                  Structural steel detailing and engineering support built around
                  accuracy, coordination, modern BIM workflows, and dependable
                  communication.
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

            {/* Right Side: High-Tech Glassmorphic Operations Cockpit */}
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
                    Live Inquiry Desk
                  </span>
                </div>

                <span className="font-mono text-[10px] text-white/40">
                  KENZ-OPS // 2026
                </span>
              </div>

              {/* SLA Core Block */}
              <div className="mt-6 flex items-start gap-4">
                <div className="flex h-13 w-13 shrink-0 items-center justify-center rounded-2xl border border-copper-500/30 bg-copper-500/15 text-copper-400 shadow-inner">
                  <Clock size={24} className="animate-[pulse_3s_ease-in-out_infinite]" />
                </div>
                <div>
                  <p className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-copper-400">
                    Guaranteed SLA
                  </p>
                  <h3 className="mt-1 text-xl font-bold tracking-tight text-white">
                    Response within 24 Hours
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-steel-400">
                    Direct engagement with senior detailing team leaders for rapid
                    technical and commercial evaluations.
                  </p>
                </div>
              </div>

              {/* 3 Telemetry Metrics */}
              <div className="mt-7 grid grid-cols-3 gap-2.5 rounded-2xl border border-white/10 bg-white/5 p-3 text-center">
                <div className="rounded-xl border border-white/5 bg-white/5 py-2.5">
                  <p className="font-display text-xl text-copper-300 sm:text-2xl">&lt; 24h</p>
                  <p className="text-[9px] uppercase tracking-wider text-steel-400">First SLA</p>
                </div>
                <div className="rounded-xl border border-white/5 bg-white/5 py-2.5">
                  <p className="font-display text-xl text-copper-300 sm:text-2xl">AISC</p>
                  <p className="text-[9px] uppercase tracking-wider text-steel-400">Standards</p>
                </div>
                <div className="rounded-xl border border-white/5 bg-white/5 py-2.5">
                  <p className="font-display text-xl text-copper-300 sm:text-2xl">100%</p>
                  <p className="text-[9px] uppercase tracking-wider text-steel-400">NDA Bound</p>
                </div>
              </div>

              {/* Quick Jump Action */}
              <a
                href="#inquiry-form"
                className="group mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-copper-600 to-copper-500 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-copper-500/20 transition-all hover:scale-[1.02] hover:shadow-copper-500/30"
              >
                <span>Jump to Project Inquiry Form</span>
                <ArrowDown size={14} className="transition-transform group-hover:translate-y-0.5" />
              </a>
            </motion.div>
          </div>
        </div>

        {/* Bottom Accent Gradient Beam */}
        <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-copper-500/60 to-transparent" />
      </section>

      {/* ── 3 ADVANCED 3D FLIP CONTACT CARDS ─────────────────── */}
      <section className="relative z-20 -mt-12 px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <ContactFlipCards />
        </div>
      </section>

      {/* ── PROJECT INQUIRY MAIN WORKBENCH ───────────────────── */}
      <section id="inquiry-form" className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            {/* LEFT OVERVIEW CONSOLE */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="lg:sticky lg:top-32"
            >
              {/* Badge */}
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-copper-200 bg-copper-50 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-copper-700">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-copper-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-copper-600" />
                </span>
                Project Inquiry
              </div>

              <h2 className="font-display text-4xl uppercase leading-[0.95] text-navy-950 sm:text-5xl md:text-6xl">
                Let&apos;s Discuss
                <span className="block bg-gradient-to-r from-copper-600 to-copper-500 bg-clip-text text-transparent">
                  Your Project
                </span>
              </h2>

              <p className="mt-6 text-base leading-relaxed text-steel-700">
                Tell us about your project requirements, scope, schedule, and
                technical needs. The more information you provide, the easier
                it is for our team to understand your requirements.
              </p>

              {/* Inquiry Next Steps Timeline */}
              <div className="mt-10 space-y-6 rounded-2xl border border-steel-200/90 bg-white p-7 shadow-sm">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-copper-600">
                  <Sparkles size={14} />
                  <span>What Happens Next</span>
                </div>

                <div className="space-y-5">
                  {inquirySteps.map((stepItem) => (
                    <div key={stepItem.step} className="flex gap-4">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-navy-950 font-mono text-xs font-bold text-white">
                        {stepItem.step}
                      </span>
                      <div>
                        <h4 className="text-sm font-semibold text-navy-950">
                          {stepItem.title}
                        </h4>
                        <p className="mt-1 text-xs leading-relaxed text-steel-600">
                          {stepItem.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Info Box */}
              <div className="mt-8 rounded-2xl border border-copper-500/30 bg-copper-50/50 p-6">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-copper-600">
                    KENZ / RFQ DESK
                  </span>
                  <ShieldCheck size={16} className="text-copper-600" />
                </div>
                <p className="mt-3 text-xs leading-relaxed text-steel-700">
                  Specialized in structural steel detailing, BIM coordination,
                  and engineering support adhering to AISC & NISD standards.
                </p>
              </div>
            </motion.div>

            {/* RIGHT FORM CONSOLE */}
            <ContactForm />
          </div>
        </div>
      </section>

      {/* ── BOTTOM CINEMATIC CTA ─────────────────────────────── */}
      <section className="relative overflow-hidden bg-navy-950 px-6 py-20 text-white md:py-24">
        {/* Subtle grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-br from-copper-600 via-copper-500 to-[#8c4614] p-8 shadow-2xl md:p-12 lg:p-16">
            <div className="relative z-10 flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-white/80">
                  Kenz Engineering LLC
                </p>
                <h2 className="mt-3 font-display text-4xl uppercase leading-[0.95] text-white sm:text-5xl md:text-6xl">
                  Engineering Detail.
                  <span className="block text-navy-950">
                    Practical Solutions.
                  </span>
                </h2>
              </div>

              <div className="shrink-0">
                <a
                  href="mailto:sales@kenzengineering.com"
                  className="group inline-flex items-center gap-4 rounded-xl bg-white px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] text-navy-950 shadow-md transition-all duration-300 hover:bg-navy-950 hover:text-white hover:scale-105"
                >
                  <span>Email Our Team</span>
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}