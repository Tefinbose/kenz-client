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
  number: "03",
  eyebrow: "Connections",
  title: "Connection &",
  accentTitle: "Delegated Design",
  description:
    "Connection detailing, coordination, and delegated design support integrated with the structural steel detailing workflow and project requirements.",
};

const capabilities = [
  "Connection detailing",
  "Connection coordination",
  "Delegated design support",
  "Model integration",
  "Drawing coordination",
  "Fabrication-oriented documentation",
];

const deliverables = [
  "Connection detailing information",
  "Coordinated connection models",
  "Connection drawing documentation",
  "Delegated design support documentation",
  "Model integration",
  "Fabrication-oriented outputs",
];

const applications = [
  "Structural steel connections",
  "Fabricator coordination",
  "Connection model integration",
  "Projects requiring delegated design support",
  "Multi-discipline coordination",
];

const process = [
  { number: "01", title: "Review", text: "Review the structural design information, project requirements, connection scope, and applicable documentation." },
  { number: "02", title: "Coordinate", text: "Coordinate connection requirements with the structural model and other relevant project disciplines." },
  { number: "03", title: "Develop", text: "Develop connection detailing and supporting information according to the defined project scope." },
  { number: "04", title: "Integrate", text: "Integrate connection information into the overall steel model and drawing workflow." },
  { number: "05", title: "Document", text: "Prepare coordinated project documentation and fabrication-oriented outputs." },
];

/* A schematic beam-to-column bolted moment connection: column, beam, gusset,
   and a bolt array — the literal subject of this service, not a stock icon. */
function ConnectionDiagram() {
  const bolts = [
    [64, 58], [80, 58], [96, 58],
    [64, 74], [80, 74], [96, 74],
    [64, 90], [80, 90], [96, 90],
  ];

  return (
    <svg viewBox="0 0 220 220" className="h-full w-full">
      {/* column */}
      <rect x="24" y="16" width="26" height="188" rx="2" fill="none" stroke="currentColor" className="text-steel-500" strokeWidth="1.5" />
      {/* beam */}
      <rect x="50" y="78" width="150" height="30" rx="2" fill="none" stroke="currentColor" className="text-steel-500" strokeWidth="1.5" />
      {/* gusset / connection plate */}
      <rect x="50" y="50" width="60" height="98" rx="2" className="fill-copper-500/10" stroke="currentColor" strokeWidth="1.5" style={{ color: "#c17a3e" }} />
      {/* bolt array */}
      {bolts.map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="3.4" style={{ fill: "#c17a3e" }} />
      ))}
      {/* dimension / callout lines */}
      <line x1="50" y1="42" x2="110" y2="42" stroke="currentColor" className="text-steel-600" strokeWidth="1" strokeDasharray="3 3" />
      <text x="56" y="38" className="fill-steel-500" style={{ fontSize: 8, fontFamily: "monospace" }}>
        CONN. PLATE
      </text>
    </svg>
  );
}

export default function ConnectionDesignPage() {
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
        {/* HERO — bolted connection schematic instead of an icon plate */}
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
            className="mx-auto flex aspect-square w-full max-w-[280px] items-center justify-center rounded-2xl border border-white/[0.08] bg-navy-900/60 p-8 text-steel-300 backdrop-blur-xl"
          >
            <ConnectionDiagram />
          </motion.div>
        </section>

        {/* ---------------------------------------------------- */}
        {/* CAPABILITIES — bolt-schedule style table                */}
        {/* ---------------------------------------------------- */}
        <section className="border-t border-white/[0.06] py-16">
          <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-copper-400">
            What We Do
          </h2>
          <div className="mt-6 overflow-hidden rounded-xl border border-white/[0.08]">
            {capabilities.map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className={`flex items-center gap-5 px-5 py-4 ${
                  i % 2 === 0 ? "bg-navy-900/60" : "bg-navy-900/30"
                }`}
              >
                <span className="w-10 shrink-0 font-mono text-xs text-copper-400">
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
        {/* PROCESS — a handoff chain, since delegated design passes  */}
        {/* between structural engineer, detailer, and fabricator     */}
        {/* ---------------------------------------------------- */}
        <section id="process" className="scroll-mt-32 border-t border-white/[0.06] py-16">
          <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-copper-400">
            How It Works
          </h2>

          <div className="relative mt-10">
            {/* connecting rail with bolt dots at each joint, echoing the hero diagram */}
            <div className="absolute left-5 right-5 top-5 hidden h-px bg-white/[0.1] md:block" />
            <div className="grid gap-6 md:grid-cols-5">
              {process.map((step, i) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  className="relative flex flex-col items-start"
                >
                  <span className="relative z-10 mb-4 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-copper-500 bg-navy-950 font-mono text-xs font-semibold text-copper-400">
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
              href="/services/miscellaneous-detailing"
              className="group flex flex-1 items-center gap-3 rounded-xl border border-white/[0.08] bg-navy-900/60 px-5 py-4 transition-colors hover:border-copper-500/40"
            >
              <ArrowLeft
                size={16}
                className="shrink-0 text-steel-400 transition-transform group-hover:-translate-x-1 group-hover:text-copper-400"
              />
              <div className="text-left">
                <div className="text-[10px] uppercase tracking-[0.16em] text-steel-500">Previous</div>
                <div className="text-sm font-medium text-steel-200">Miscellaneous Detailing</div>
              </div>
            </Link>

            <Link
              href="/services/joist-deck"
              className="group flex flex-1 items-center justify-end gap-3 rounded-xl border border-white/[0.08] bg-navy-900/60 px-5 py-4 text-right transition-colors hover:border-copper-500/40"
            >
              <div>
                <div className="text-[10px] uppercase tracking-[0.16em] text-steel-500">Next</div>
                <div className="text-sm font-medium text-steel-200">Joist & Deck Detailing</div>
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
                Ready to start on Connection & Delegated Design?
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