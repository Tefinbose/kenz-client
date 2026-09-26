"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  FileSearch,
  Box,
  GitMerge,
  Ruler,
  CheckCheck,
} from "lucide-react";

const service = {
  number: "01",
  eyebrow: "Structural Steel",
  title: "Steel",
  accentTitle: "Detailing",
  description:
    "Structural steel 3D modeling and fabrication-oriented drawing development designed to support steel fabricators, contractors, and construction teams from design intent through fabrication and erection.",
};

const capabilities = [
  "Structural steel 3D modeling",
  "Shop drawing development",
  "Erection drawing development",
  "Fabrication-oriented detailing",
  "Project-specific detailing standards",
  "Model-based coordination",
];

const deliverables = [
  "Coordinated structural steel 3D models",
  "Fabrication-oriented shop drawings",
  "Erection drawings",
  "Member and assembly documentation",
  "Project-specific detailing documentation",
  "Model-based coordination information",
];

const applications = [
  "Structural steel fabrication projects",
  "Commercial and industrial structures",
  "Multi-discipline construction coordination",
  "Fabrication and erection workflows",
  "Projects requiring detailed 3D steel models",
];

const process = [
  { number: "01", title: "Review", icon: FileSearch, text: "Review structural drawings, specifications, project standards, schedules, and available design information." },
  { number: "02", title: "Model", icon: Box, text: "Develop the structural steel model based on project requirements and coordinated design information." },
  { number: "03", title: "Coordinate", icon: GitMerge, text: "Coordinate structural members, interfaces, and project-specific requirements within the model." },
  { number: "04", title: "Detail", icon: Ruler, text: "Develop fabrication-oriented shop and erection drawings from the coordinated model." },
  { number: "05", title: "Deliver", icon: CheckCheck, text: "Complete project deliverables according to the agreed scope, standards, and schedule." },
];

/* An I-beam cross-section — the base unit of structural steel — shown
   twice: bare as a model, then annotated as a shop drawing. This is the
   literal transformation this service performs. */
function IBeam({ annotated = false }: { annotated?: boolean }) {
  return (
    <svg viewBox="0 0 140 140" className="h-full w-full">
      {/* I-beam profile */}
      <g stroke="currentColor" className="text-steel-300" strokeWidth="2" fill="none">
        <rect x="30" y="26" width="80" height="10" />
        <rect x="60" y="36" width="20" height="68" />
        <rect x="30" y="104" width="80" height="10" />
      </g>

      {annotated && (
        <g style={{ color: "#c17a3e" }}>
          {/* width dimension */}
          <line x1="30" y1="16" x2="110" y2="16" stroke="currentColor" strokeWidth="1" strokeDasharray="3 2" />
          <line x1="30" y1="12" x2="30" y2="20" stroke="currentColor" strokeWidth="1" />
          <line x1="110" y1="12" x2="110" y2="20" stroke="currentColor" strokeWidth="1" />
          {/* depth dimension */}
          <line x1="118" y1="26" x2="118" y2="114" stroke="currentColor" strokeWidth="1" strokeDasharray="3 2" />
          {/* weld symbol */}
          <polygon points="30,104 38,104 30,118" fill="#c17a3e" />
          <text x="42" y="10" style={{ fontSize: 8, fontFamily: "monospace", fill: "#c17a3e" }}>
            W12X26
          </text>
        </g>
      )}
    </svg>
  );
}

export default function SteelDetailingPage() {
  return (
    <main className="relative overflow-hidden bg-navy-950 text-white">
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `
            linear-gradient(#ffffff 1px, transparent 1px),
            linear-gradient(90deg, #ffffff 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />
      <div className="pointer-events-none absolute -left-40 top-0 h-[520px] w-[520px] rounded-full bg-copper-500/10 blur-[140px]" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-[480px] w-[480px] rounded-full bg-navy-800/40 blur-[140px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-24 lg:px-8 md:pt-32">
        <Link
          href="/services"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-steel-400 transition-colors hover:text-copper-400"
        >
          <ArrowLeft size={14} />
          All Services
        </Link>

        {/* ---------------------------------------------------- */}
        {/* HERO — model becomes drawing, the core value of this   */}
        {/* service and the foundation the other five build on     */}
        {/* ---------------------------------------------------- */}
        <section className="py-16">
          <div className="grid gap-14 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="flex items-center gap-2.5">
                <span className="inline-flex items-center rounded-md border border-copper-500/25 bg-copper-500/10 px-2.5 py-1 font-mono text-xs font-semibold text-copper-400">
                  {service.number}
                </span>
                <span className="text-xs uppercase tracking-[0.16em] text-steel-400">
                  {service.eyebrow}
                </span>
              </div>

              <h1 className="mt-6 font-display text-5xl uppercase leading-[0.95] tracking-tight sm:text-6xl md:text-7xl">
                {service.title}{" "}
                <span className="block bg-gradient-to-r from-copper-400 via-copper-300 to-copper-500 bg-clip-text text-transparent">
                  {service.accentTitle}
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-base leading-relaxed text-steel-400 md:text-lg">
                {service.description}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-xl bg-copper-500 px-5 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-lg transition-all duration-300 hover:bg-copper-400 hover:shadow-copper-500/25"
                >
                  Request a Quote
                  <ArrowUpRight size={15} />
                </Link>
                <a
                  href="#process"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3 text-xs font-bold uppercase tracking-wider text-steel-200 transition-all duration-300 hover:border-copper-500/50 hover:bg-white/[0.08] hover:text-white"
                >
                  See How It Works
                </a>
              </div>
            </motion.div>

            {/* Model → Drawing transformation */}
            <div className="flex items-center gap-4">
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="flex-1"
              >
                <div className="flex aspect-square items-center justify-center rounded-2xl border border-white/[0.08] bg-navy-900/60 p-6 backdrop-blur-xl">
                  <IBeam />
                </div>
                <p className="mt-2 text-center text-[10px] uppercase tracking-[0.16em] text-steel-600">
                  3D Model
                </p>
              </motion.div>

              <ArrowRight size={20} className="shrink-0 text-copper-500" />

              <motion.div
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="flex-1"
              >
                <div className="flex aspect-square items-center justify-center rounded-2xl border border-copper-500/40 bg-copper-500/[0.06] p-6 backdrop-blur-xl">
                  <IBeam annotated />
                </div>
                <p className="mt-2 text-center text-[10px] uppercase tracking-[0.16em] text-copper-400">
                  Shop Drawing
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------- */}
        {/* CAPABILITIES — a drawing-set sheet index                */}
        {/* ---------------------------------------------------- */}
        <section className="border-t border-white/[0.06] py-16">
          <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-copper-400">
            What We Do
          </h2>
          <div className="mt-6 overflow-hidden rounded-xl border border-white/[0.08] font-mono text-sm">
            <div className="flex items-center gap-6 border-b border-white/[0.08] bg-navy-900/80 px-5 py-3 text-[10px] uppercase tracking-[0.16em] text-steel-500">
              <span className="w-16">Sheet</span>
              <span>Description</span>
            </div>
            {capabilities.map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className={`flex items-center gap-6 px-5 py-3.5 ${
                  i % 2 === 0 ? "bg-navy-900/60" : "bg-navy-900/30"
                }`}
              >
                <span className="w-16 shrink-0 text-copper-400">
                  S-{String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-sans text-steel-200">{item}</span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ---------------------------------------------------- */}
        {/* DELIVERABLES + APPLICATIONS                           */}
        {/* ---------------------------------------------------- */}
        <section className="border-t border-white/[0.06] py-16">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
            <div className="rounded-2xl border border-white/[0.08] bg-navy-900/60 p-7 backdrop-blur-xl md:p-8">
              <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-copper-400">
                Deliverables
              </h2>
              <ul className="mt-6 space-y-3.5">
                {deliverables.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-copper-400" />
                    <span className="text-sm text-steel-300 md:text-base">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-copper-400">
                Where It Applies
              </h2>
              <div className="mt-6 flex flex-wrap gap-2.5">
                {applications.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center rounded-full border border-white/[0.08] bg-white/[0.03] px-3.5 py-1.5 text-xs text-steel-300"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------- */}
        {/* PROCESS — icon-marked rail, the master workflow the    */}
        {/* other five disciplines each adapt                       */}
        {/* ---------------------------------------------------- */}
        <section id="process" className="scroll-mt-32 border-t border-white/[0.06] py-16">
          <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-copper-400">
            How It Works
          </h2>

          <div className="relative mt-14">
            <div className="absolute left-0 right-0 top-6 hidden h-px bg-gradient-to-r from-transparent via-copper-500/50 to-transparent md:block" />
            <div className="grid gap-6 md:grid-cols-5">
              {process.map((step, i) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={step.number}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    className="relative flex flex-col items-start"
                  >
                    <span className="relative z-10 mb-4 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-copper-500/50 bg-navy-950 text-copper-400">
                      <Icon size={18} />
                    </span>
                    <span className="font-mono text-[10px] text-steel-500">
                      {step.number}
                    </span>
                    <h3 className="font-display text-lg uppercase tracking-wide text-white">
                      {step.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-steel-400">
                      {step.text}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------- */}
        {/* NEXT (no previous — this is the first service) + CTA   */}
        {/* ---------------------------------------------------- */}
        <section className="border-t border-white/[0.06] py-16">
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-stretch sm:justify-between">
            <div className="flex-1" />
            <Link
              href="/services/miscellaneous-detailing"
              className="group flex flex-1 items-center justify-end gap-3 rounded-xl border border-white/[0.08] bg-navy-900/60 px-5 py-4 text-right transition-colors hover:border-copper-500/40"
            >
              <div>
                <div className="text-[10px] uppercase tracking-[0.16em] text-steel-500">Next</div>
                <div className="text-sm font-medium text-steel-200">Miscellaneous Detailing</div>
              </div>
              <ArrowRight
                size={16}
                className="shrink-0 text-steel-400 transition-transform group-hover:translate-x-1 group-hover:text-copper-400"
              />
            </Link>
          </div>

          <div className="flex flex-col items-start justify-between gap-6 rounded-2xl border border-white/[0.08] bg-navy-900/60 p-6 backdrop-blur-xl md:flex-row md:items-center md:p-8">
            <div>
              <h4 className="text-base font-semibold text-white">
                Ready to start on Steel Detailing?
              </h4>
              <p className="mt-2 text-sm text-steel-400">
                Send us your project drawings and scope — we'll follow up with
                turnaround and pricing.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-copper-500 px-5 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-lg transition-all duration-300 hover:bg-copper-400 hover:shadow-copper-500/25"
            >
              Request Detailing Quote
              <ArrowUpRight size={15} />
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}