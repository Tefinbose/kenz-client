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
  number: "06",
  eyebrow: "Quantity Information",
  title: "Estimation &",
  accentTitle: "Material Take-Off",
  description:
    "Model-based quantity extraction and steel estimation support providing project teams with organized quantity information for planning and project evaluation.",
};

const capabilities = [
  "Material take-off",
  "Quantity extraction",
  "Steel estimation support",
  "Model-based quantity information",
  "Project quantity documentation",
];

const deliverables = [
  "Material quantity information",
  "Model-based quantity extraction",
  "Steel quantity summaries",
  "Project quantity documentation",
  "Estimation support information",
  "Organized take-off data",
];

const applications = [
  "Pre-fabrication planning",
  "Project estimation support",
  "Steel quantity evaluation",
  "Model-based material take-offs",
  "Project planning and coordination",
];

const process = [
  { number: "01", title: "Review", text: "Review available drawings, models, project scope, and information relevant to quantity extraction." },
  { number: "02", title: "Identify", text: "Identify the project elements and quantity categories required for the agreed scope." },
  { number: "03", title: "Extract", text: "Extract relevant quantity information from available model and project data." },
  { number: "04", title: "Organize", text: "Organize quantities into project-specific documentation and usable summaries." },
  { number: "05", title: "Deliver", text: "Provide quantity and estimation support information according to the agreed project requirements." },
];

/* Sample line-item ledger — the literal document this service produces */
const ledgerRows = [
  { item: "W-Shape Beams", unit: "EA", qty: "42" },
  { item: "Base Plates", unit: "EA", qty: "18" },
  { item: "Bolts A325 ¾\"", unit: "EA", qty: "640" },
  { item: "Misc. Steel Angles", unit: "LF", qty: "312" },
];

function LedgerPanel() {
  return (
    <div className="w-full rounded-xl border border-white/[0.1] bg-navy-900/70 font-mono text-xs backdrop-blur-xl">
      <div className="flex items-center justify-between border-b border-white/[0.08] px-4 py-3 text-[10px] uppercase tracking-[0.16em] text-steel-500">
        <span>Item</span>
        <span className="flex gap-6">
          <span>Unit</span>
          <span>Qty</span>
        </span>
      </div>
      {ledgerRows.map((row, i) => (
        <motion.div
          key={row.item}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.15 + i * 0.08 }}
          className="flex items-center justify-between border-b border-white/[0.05] px-4 py-2.5 text-steel-300"
        >
          <span>{row.item}</span>
          <span className="flex gap-6">
            <span className="w-6 text-steel-500">{row.unit}</span>
            <span className="w-8 text-right text-steel-200">{row.qty}</span>
          </span>
        </motion.div>
      ))}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.6 }}
        className="flex items-center justify-between bg-copper-500/10 px-4 py-3"
      >
        <span className="font-semibold uppercase tracking-wider text-copper-300">
          Total Steel
        </span>
        <span className="font-semibold text-copper-300">86.4 TONS</span>
      </motion.div>
    </div>
  );
}

export default function EstimationPage() {
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
        {/* HERO — a live-looking material take-off ledger         */}
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
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <LedgerPanel />
            <p className="mt-3 text-center text-[10px] uppercase tracking-[0.16em] text-steel-600">
              Sample take-off excerpt
            </p>
          </motion.div>
        </section>

        {/* ---------------------------------------------------- */}
        {/* CAPABILITIES — dotted-leader schedule list             */}
        {/* ---------------------------------------------------- */}
        <section className="border-t border-white/[0.06] py-16">
          <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-copper-400">
            What We Do
          </h2>
          <div className="mt-6 max-w-2xl space-y-1">
            {capabilities.map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="flex items-baseline gap-2 py-2"
              >
                <span className="whitespace-nowrap text-sm text-steel-200 md:text-base">
                  {item}
                </span>
                <span className="mb-1 flex-1 border-b border-dotted border-steel-700" />
                <span className="font-mono text-xs text-copper-400">
                  {String(i + 1).padStart(2, "0")}
                </span>
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
        {/* PROCESS — running-tally rail, filling as it progresses */}
        {/* ---------------------------------------------------- */}
        <section id="process" className="scroll-mt-32 border-t border-white/[0.06] py-16">
          <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-copper-400">
            How It Works
          </h2>

          <div className="relative mt-14">
            <div className="absolute left-0 right-0 top-5 hidden h-1 rounded-full bg-white/[0.08] md:block" />
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
              style={{ transformOrigin: "left" }}
              className="absolute left-0 top-5 hidden h-1 w-full rounded-full bg-gradient-to-r from-copper-600 via-copper-400 to-copper-500 md:block"
            />

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
        {/* PREV (no next — this is the final service) + CTA       */}
        {/* ---------------------------------------------------- */}
        <section className="border-t border-white/[0.06] py-16">
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-stretch sm:justify-between">
            <Link
              href="/services/bim-support"
              className="group flex flex-1 items-center gap-3 rounded-xl border border-white/[0.08] bg-navy-900/60 px-5 py-4 transition-colors hover:border-copper-500/40"
            >
              <ArrowLeft
                size={16}
                className="shrink-0 text-steel-400 transition-transform group-hover:-translate-x-1 group-hover:text-copper-400"
              />
              <div className="text-left">
                <div className="text-[10px] uppercase tracking-[0.16em] text-steel-500">Previous</div>
                <div className="text-sm font-medium text-steel-200">BIM Support</div>
              </div>
            </Link>
            <div className="flex-1" />
          </div>

          <div className="flex flex-col items-start justify-between gap-6 rounded-2xl border border-white/[0.08] bg-navy-900/60 p-6 backdrop-blur-xl md:flex-row md:items-center md:p-8">
            <div>
              <h4 className="text-base font-semibold text-white">
                Ready to start on Estimation & Material Take-Off?
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