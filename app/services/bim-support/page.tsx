"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ScanLine,
  Layers,
  GitMerge,
  FileOutput,
  MessageSquare,
  Boxes,
} from "lucide-react";

const service = {
  number: "05",
  eyebrow: "Digital Coordination",
  title: "BIM",
  accentTitle: "Support",
  description:
    "3D steel modeling, model coordination, clash and coordination support, and drawing extraction designed to improve project communication and model-based workflows.",
};

const layers = [
  { label: "Architectural", offset: 0 },
  { label: "Structural Steel", offset: 1 },
  { label: "MEP / Services", offset: 2 },
  { label: "Coordinated Model", offset: 3 },
];

const capabilities = [
  "3D steel modeling",
  "Model coordination",
  "Clash and coordination support",
  "Drawing extraction",
  "Model-based project communication",
  "Fabrication-oriented BIM workflows",
];

const deliverables = [
  "Coordinated 3D models",
  "Model coordination information",
  "Coordination and clash information",
  "Drawing extraction",
  "Model-based project documentation",
  "Fabrication-oriented BIM outputs",
];

const applications = [
  "Multi-discipline coordination",
  "Structural steel projects",
  "Fabrication workflows",
  "Model-based communication",
  "Projects requiring coordinated BIM information",
];

const process = [
  { number: "01", title: "Collect", icon: Boxes, text: "Gather available models, drawings, specifications, and project coordination information." },
  { number: "02", title: "Model", icon: Layers, text: "Develop or update 3D steel model information according to project requirements." },
  { number: "03", title: "Coordinate", icon: GitMerge, text: "Review model interfaces and identify coordination issues requiring project attention." },
  { number: "04", title: "Extract", icon: FileOutput, text: "Generate required project information and drawing outputs from coordinated model data." },
  { number: "05", title: "Communicate", icon: MessageSquare, text: "Use model-based information to support clear communication between project stakeholders." },
];

export default function BimSupportPage() {
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
        {/* HERO — layered model stack instead of a single icon plate */}
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

          {/* Exploded layer stack — each discipline as an offset translucent plane, converging into "Coordinated Model" */}
          <div className="relative mx-auto h-72 w-full max-w-sm lg:h-80">
            {layers.map((layer, i) => (
              <motion.div
                key={layer.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 + i * 0.12 }}
                style={{
                  top: `${i * 15}%`,
                  left: `${i * 6}%`,
                  right: `${(layers.length - 1 - i) * 6}%`,
                  zIndex: i,
                }}
                className={`absolute flex h-24 items-center justify-between rounded-xl border px-5 backdrop-blur-xl ${
                  i === layers.length - 1
                    ? "border-copper-500/50 bg-copper-500/10"
                    : "border-white/[0.1] bg-navy-900/70"
                }`}
              >
                <span
                  className={`text-xs font-semibold uppercase tracking-wider ${
                    i === layers.length - 1 ? "text-copper-300" : "text-steel-300"
                  }`}
                >
                  {layer.label}
                </span>
                <ScanLine
                  size={16}
                  className={i === layers.length - 1 ? "text-copper-400" : "text-steel-500"}
                />
              </motion.div>
            ))}
          </div>
        </section>

        {/* ---------------------------------------------------- */}
        {/* CAPABILITIES                                          */}
        {/* ---------------------------------------------------- */}
        <section className="border-t border-white/[0.06] py-16">
          <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-copper-400">
            What We Do
          </h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {capabilities.map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="flex items-center gap-4 rounded-xl border border-white/[0.08] bg-navy-900/60 px-5 py-4 backdrop-blur-xl"
              >
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-copper-500" />
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
        {/* PROCESS — coordination node graph                    */}
        {/* ---------------------------------------------------- */}
        <section id="process" className="scroll-mt-32 border-t border-white/[0.06] py-16">
          <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-copper-400">
            How It Works
          </h2>

          {/* Desktop: zig-zag node line */}
          <div className="relative mt-14 hidden md:block">
            <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-white/[0.1]" />
            <div className="relative grid grid-cols-5 gap-4">
              {process.map((step, i) => {
                const Icon = step.icon;
                const labelBelow = i % 2 === 1;
                return (
                  <motion.div
                    key={step.number}
                    initial={{ opacity: 0, y: labelBelow ? -12 : 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    className={`flex flex-col items-center ${labelBelow ? "flex-col-reverse" : ""}`}
                  >
                    <div className={labelBelow ? "mt-4 text-center" : "mb-4 text-center"}>
                      <span className="font-mono text-[10px] text-copper-400">{step.number}</span>
                      <h3 className="font-display text-base uppercase tracking-wide text-white">
                        {step.title}
                      </h3>
                      <p className="mt-1 max-w-[160px] text-xs leading-relaxed text-steel-500">
                        {step.text}
                      </p>
                    </div>
                    <span className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-copper-500/40 bg-navy-950 text-copper-400">
                      <Icon size={18} />
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Mobile: vertical timeline */}
          <div className="relative mt-8 md:hidden">
            <div className="absolute bottom-0 left-[19px] top-0 w-px bg-white/[0.08]" />
            <div className="space-y-8">
              {process.map((step) => {
                const Icon = step.icon;
                return (
                  <div key={step.number} className="relative flex gap-6">
                    <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-copper-500/40 bg-navy-950 text-copper-400">
                      <Icon size={16} />
                    </span>
                    <div className="pt-1.5">
                      <span className="font-mono text-[10px] text-copper-400">{step.number}</span>
                      <h3 className="font-display text-lg uppercase tracking-wide text-white">
                        {step.title}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-steel-400">{step.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------- */}
        {/* PREV / NEXT + CTA                                     */}
        {/* ---------------------------------------------------- */}
        <section className="border-t border-white/[0.06] py-16">
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-stretch sm:justify-between">
            <Link
              href="/services/joist-deck"
              className="group flex flex-1 items-center gap-3 rounded-xl border border-white/[0.08] bg-navy-900/60 px-5 py-4 transition-colors hover:border-copper-500/40"
            >
              <ArrowLeft
                size={16}
                className="shrink-0 text-steel-400 transition-transform group-hover:-translate-x-1 group-hover:text-copper-400"
              />
              <div className="text-left">
                <div className="text-[10px] uppercase tracking-[0.16em] text-steel-500">Previous</div>
                <div className="text-sm font-medium text-steel-200">Joist & Deck Detailing</div>
              </div>
            </Link>

            <Link
              href="/services/estimation"
              className="group flex flex-1 items-center justify-end gap-3 rounded-xl border border-white/[0.08] bg-navy-900/60 px-5 py-4 text-right transition-colors hover:border-copper-500/40"
            >
              <div>
                <div className="text-[10px] uppercase tracking-[0.16em] text-steel-500">Next</div>
                <div className="text-sm font-medium text-steel-200">
                  Estimation & Material Take-Off
                </div>
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
                Ready to start on BIM Support?
              </h4>
              <p className="mt-2 text-sm text-steel-400">
                Send us your project models and scope — we'll follow up with
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