"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  TrendingUp,
  MoveUp,
  Shield,
  Settings,
  Boxes,
  Plus,
} from "lucide-react";

const service = {
  number: "02",
  eyebrow: "Miscellaneous Steel",
  title: "Miscellaneous",
  accentTitle: "Detailing",
  description:
    "Detailed modeling and documentation for miscellaneous steel components, coordinated with the primary structural steel and developed with fabrication requirements in mind.",
};

const capabilities = [
  "Miscellaneous steel detailing",
  "Component modeling",
  "Shop drawing preparation",
  "Coordination with primary structural steel",
  "Fabrication-ready documentation",
  "Model-based component coordination",
];

const deliverables = [
  "Miscellaneous steel 3D models",
  "Component and assembly drawings",
  "Fabrication-oriented shop drawings",
  "Connection and interface information",
  "Coordinated documentation",
  "Project-specific detailing outputs",
];

/* Every application doubles as a catalog tile in the hero — the point of
   this service is variety, not one system, so the design shows a set. */
const catalog = [
  { code: "MISC-01", label: "Stairs & Platforms", icon: TrendingUp },
  { code: "MISC-02", label: "Ladders & Access Systems", icon: MoveUp },
  { code: "MISC-03", label: "Handrails & Guardrails", icon: Shield },
  { code: "MISC-04", label: "Equipment Support Steel", icon: Settings },
  { code: "MISC-05", label: "Miscellaneous Framing", icon: Boxes },
  { code: "MISC-06", label: "Project-Specific Components", icon: Plus },
];

const process = [
  { number: "01", title: "Identify", text: "Review the project drawings and identify miscellaneous steel components and interfaces." },
  { number: "02", title: "Coordinate", text: "Coordinate miscellaneous components with the primary structure and available project information." },
  { number: "03", title: "Model", text: "Develop detailed 3D representations of the required miscellaneous steel components." },
  { number: "04", title: "Document", text: "Prepare drawings and documentation required for fabrication and project coordination." },
  { number: "05", title: "Deliver", text: "Provide coordinated deliverables according to the defined project scope and schedule." },
];

/* Slight, deterministic rotation per chip — a loose "pinned parts board"
   feel rather than a rigid grid, matching the catch-all nature of the work. */
const tilt = [-1.5, 1, -0.5, 1.5, -1, 0.5];

export default function MiscellaneousDetailingPage() {
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
        {/* HERO — a parts catalog, since this service is defined  */}
        {/* by variety rather than one repeated system              */}
        {/* ---------------------------------------------------- */}
        <section className="grid gap-14 py-16 lg:grid-cols-[1.1fr_1.3fr] lg:items-center">
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

          {/* Catalog board */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {catalog.map(({ code, label, icon: Icon }, i) => (
              <motion.div
                key={code}
                initial={{ opacity: 0, y: 16, rotate: 0 }}
                animate={{ opacity: 1, y: 0, rotate: tilt[i] }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.06 }}
                whileHover={{ rotate: 0, scale: 1.03 }}
                className="flex flex-col justify-between rounded-xl border border-white/[0.08] bg-navy-900/60 p-4 backdrop-blur-xl"
              >
                <Icon size={18} className="text-copper-400" />
                <div className="mt-4">
                  <span className="block font-mono text-[9px] text-steel-600">
                    {code}
                  </span>
                  <span className="mt-0.5 block text-xs font-medium leading-snug text-steel-200">
                    {label}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ---------------------------------------------------- */}
        {/* CAPABILITIES — pinned tag chips, not a rigid list       */}
        {/* ---------------------------------------------------- */}
        <section className="border-t border-white/[0.06] py-16">
          <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-copper-400">
            What We Do
          </h2>
          <div className="mt-7 flex flex-wrap gap-3">
            {capabilities.map((item, i) => (
              <motion.span
                key={item}
                initial={{ opacity: 0, y: 10, rotate: 0 }}
                whileInView={{ opacity: 1, y: 0, rotate: tilt[i % tilt.length] }}
                viewport={{ once: true, margin: "-60px" }}
                whileHover={{ rotate: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="inline-flex items-center gap-2 rounded-lg border border-white/[0.08] bg-navy-900/60 px-4 py-2.5 text-sm text-steel-200 backdrop-blur-xl"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-copper-500" />
                {item}
              </motion.span>
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
                {catalog.map(({ label }) => (
                  <span
                    key={label}
                    className="inline-flex items-center rounded-full border border-white/[0.08] bg-white/[0.03] px-3.5 py-1.5 text-xs text-steel-300"
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------- */}
        {/* PROCESS — dashed connector, a looser path than the      */}
        {/* single-system pages                                     */}
        {/* ---------------------------------------------------- */}
        <section id="process" className="scroll-mt-32 border-t border-white/[0.06] py-16">
          <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-copper-400">
            How It Works
          </h2>

          <div className="relative mt-14">
            <div className="absolute left-0 right-0 top-5 hidden border-t border-dashed border-steel-600 md:block" />
            <div className="grid gap-6 md:grid-cols-5">
              {process.map((step, i) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="relative flex flex-col items-start"
                >
                  <span className="relative z-10 mb-4 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-copper-500 bg-navy-950 font-mono text-xs font-semibold text-copper-400">
                    {step.number}
                  </span>
                  <h3 className="font-display text-lg uppercase tracking-wide text-white">
                    {step.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-steel-400">
                    {step.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------- */}
        {/* PREV / NEXT + CTA                                     */}
        {/* ---------------------------------------------------- */}
        <section className="border-t border-white/[0.06] py-16">
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-stretch sm:justify-between">
            <Link
              href="/services/steel-detailing"
              className="group flex flex-1 items-center gap-3 rounded-xl border border-white/[0.08] bg-navy-900/60 px-5 py-4 transition-colors hover:border-copper-500/40"
            >
              <ArrowLeft
                size={16}
                className="shrink-0 text-steel-400 transition-transform group-hover:-translate-x-1 group-hover:text-copper-400"
              />
              <div className="text-left">
                <div className="text-[10px] uppercase tracking-[0.16em] text-steel-500">Previous</div>
                <div className="text-sm font-medium text-steel-200">Steel Detailing</div>
              </div>
            </Link>

            <Link
              href="/services/connection-design"
              className="group flex flex-1 items-center justify-end gap-3 rounded-xl border border-white/[0.08] bg-navy-900/60 px-5 py-4 text-right transition-colors hover:border-copper-500/40"
            >
              <div>
                <div className="text-[10px] uppercase tracking-[0.16em] text-steel-500">Next</div>
                <div className="text-sm font-medium text-steel-200">Connection & Delegated Design</div>
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
                Ready to start on Miscellaneous Detailing?
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