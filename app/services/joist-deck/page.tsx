"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
} from "lucide-react";

const service = {
  number: "04",
  eyebrow: "Floor & Roof Systems",
  title: "Joist & Deck",
  accentTitle: "Detailing",
  description:
    "Coordinated joist and deck detailing supporting structural interfaces, drawing preparation, fabrication requirements, and erection workflows.",
};

const capabilities = [
  "Joist detailing",
  "Deck detailing",
  "3D coordination",
  "Drawing preparation",
  "Structural interface coordination",
  "Fabrication and erection support",
];

const deliverables = [
  "Joist detailing documentation",
  "Deck layout documentation",
  "Coordinated 3D information",
  "Interface and edge condition information",
  "Project-specific drawings",
  "Fabrication and erection support documentation",
];

const applications = [
  "Structural floor systems",
  "Roof systems",
  "Steel-framed buildings",
  "Joist and deck coordination",
  "Structural interface coordination",
];

const process = [
  { number: "01", title: "Review", text: "Review architectural and structural information relevant to joists, deck, supports, openings, and interfaces." },
  { number: "02", title: "Coordinate", text: "Coordinate joist and deck information with the structural steel model and project requirements." },
  { number: "03", title: "Model", text: "Develop coordinated model information representing the required joist and deck elements." },
  { number: "04", title: "Detail", text: "Prepare project drawings and documentation required for coordination and execution." },
  { number: "05", title: "Deliver", text: "Provide coordinated deliverables aligned with project scope and agreed schedules." },
];

/* A framing-plan schematic: bounding beams, evenly spaced joists, and a
   deck hatch pattern — the literal subject of this service. */
function FramingPlan() {
  const joistX = [20, 50, 80, 110, 140, 170, 200];
  return (
    <svg viewBox="0 0 220 170" className="h-full w-full">
      <defs>
        <pattern id="deckHatch" width="8" height="8" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
          <line x1="0" y1="0" x2="0" y2="8" stroke="currentColor" className="text-steel-600" strokeWidth="1" />
        </pattern>
      </defs>

      {/* deck fill */}
      <rect x="20" y="30" width="180" height="90" fill="url(#deckHatch)" opacity="0.35" />

      {/* beams */}
      <rect x="16" y="26" width="188" height="6" style={{ fill: "#c17a3e" }} />
      <rect x="16" y="118" width="188" height="6" style={{ fill: "#c17a3e" }} />

      {/* joists */}
      {joistX.map((x) => (
        <line
          key={x}
          x1={x}
          y1="30"
          x2={x}
          y2="120"
          stroke="currentColor"
          className="text-steel-400"
          strokeWidth="2.5"
        />
      ))}

      {/* spacing dimension line */}
      <line x1="20" y1="14" x2="50" y2="14" stroke="currentColor" className="text-steel-600" strokeWidth="1" strokeDasharray="2 2" />
      <line x1="20" y1="10" x2="20" y2="18" stroke="currentColor" className="text-steel-600" strokeWidth="1" />
      <line x1="50" y1="10" x2="50" y2="18" stroke="currentColor" className="text-steel-600" strokeWidth="1" />
      <text x="22" y="9" className="fill-steel-500" style={{ fontSize: 7, fontFamily: "monospace" }}>
        5'-0" TYP.
      </text>
    </svg>
  );
}

export default function JoistDeckPage() {
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
        {/* HERO — framing plan schematic instead of an icon plate */}
        {/* ---------------------------------------------------- */}
        <section className="grid gap-14 py-16 lg:grid-cols-[1.3fr_1fr] lg:items-center">
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

          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mx-auto flex w-full max-w-[340px] items-center justify-center rounded-2xl border border-white/[0.08] bg-navy-900/60 p-8 backdrop-blur-xl"
          >
            <FramingPlan />
          </motion.div>
        </section>

        {/* ---------------------------------------------------- */}
        {/* CAPABILITIES — joist-spacing tick list                 */}
        {/* ---------------------------------------------------- */}
        <section className="border-t border-white/[0.06] py-16">
          <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-copper-400">
            What We Do
          </h2>
          <div className="relative mt-8 border-t border-white/[0.08]">
            {capabilities.map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="relative flex items-center gap-4 border-b border-white/[0.08] py-4"
              >
                {/* tick mark, evenly spaced like joists on the plan above */}
                <span className="h-6 w-[2.5px] shrink-0 bg-copper-500" />
                <span className="font-mono text-[11px] text-steel-500">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-sm text-steel-200 md:text-base">{item}</span>
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
        {/* PROCESS — spans between numbered supports, echoing joists */}
        {/* ---------------------------------------------------- */}
        <section id="process" className="scroll-mt-32 border-t border-white/[0.06] py-16">
          <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-copper-400">
            How It Works
          </h2>

          <div className="relative mt-14">
            <div className="absolute left-0 right-0 top-5 hidden h-[2px] bg-gradient-to-r from-copper-600 via-copper-400 to-copper-500 md:block" />
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
                  <span className="relative z-10 mb-4 flex h-10 w-2.5 shrink-0 bg-copper-500 md:h-10">
                    <span className="sr-only">{step.number}</span>
                  </span>
                  <span className="-mt-2 mb-2 font-mono text-[10px] text-copper-400">
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
              href="/services/connection-design"
              className="group flex flex-1 items-center gap-3 rounded-xl border border-white/[0.08] bg-navy-900/60 px-5 py-4 transition-colors hover:border-copper-500/40"
            >
              <ArrowLeft
                size={16}
                className="shrink-0 text-steel-400 transition-transform group-hover:-translate-x-1 group-hover:text-copper-400"
              />
              <div className="text-left">
                <div className="text-[10px] uppercase tracking-[0.16em] text-steel-500">Previous</div>
                <div className="text-sm font-medium text-steel-200">Connection & Delegated Design</div>
              </div>
            </Link>

            <Link
              href="/services/bim-support"
              className="group flex flex-1 items-center justify-end gap-3 rounded-xl border border-white/[0.08] bg-navy-900/60 px-5 py-4 text-right transition-colors hover:border-copper-500/40"
            >
              <div>
                <div className="text-[10px] uppercase tracking-[0.16em] text-steel-500">Next</div>
                <div className="text-sm font-medium text-steel-200">BIM Support</div>
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
                Ready to start on Joist & Deck Detailing?
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