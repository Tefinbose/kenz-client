"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Box,
  Cable,
  Layers3,
  Ruler,
  ScanLine,
  Calculator,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Workflow,
  Crosshair,
  Cpu,
  Layers,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const categories = [
  { id: "all", label: "All Capabilities" },
  { id: "structural", label: "Structural Detailing" },
  { id: "engineering", label: "Connections & Joist" },
  { id: "bim", label: "BIM & Take-Off" },
] as const;

type CategoryId = (typeof categories)[number]["id"];

const services = [
  {
    number: "01",
    category: "structural" as CategoryId,
    title: "Steel Detailing",
    shortTitle: "Structural Steel",
    code: "SRV-01",
    spec: "AISC / NISD",
    description:
      "Detailed 3D modeling and fabrication-oriented drawing development for structural steel projects.",
    href: "/services/steel-detailing",
    icon: Ruler,
    capabilities: [
      "Structural steel 3D modeling",
      "Shop drawing development",
      "Erection drawing development",
      "Fabrication-oriented detailing",
      "Project-specific detailing standards",
      "Model-based coordination",
    ],
  },
  {
    number: "02",
    category: "structural" as CategoryId,
    title: "Miscellaneous Detailing",
    shortTitle: "Miscellaneous Steel",
    code: "SRV-02",
    spec: "Stairs & Rails",
    description:
      "Detailed modeling and documentation for miscellaneous steel components coordinated with the primary structure.",
    href: "/services/miscellaneous-detailing",
    icon: Box,
    capabilities: [
      "Miscellaneous steel detailing",
      "Component modeling",
      "Shop drawing preparation",
      "Primary steel coordination",
      "Fabrication-ready documentation",
    ],
  },
  {
    number: "03",
    category: "engineering" as CategoryId,
    title: "Connection & Delegated Design",
    shortTitle: "Connections",
    code: "SRV-03",
    spec: "PE / SE Stamped",
    description:
      "Connection coordination and delegated design support integrated into the overall steel detailing workflow.",
    href: "/services/connection-design",
    icon: Cable,
    capabilities: [
      "Connection detailing",
      "Connection coordination",
      "Delegated design support",
      "Model integration",
      "Drawing coordination",
      "Fabrication-oriented documentation",
    ],
  },
  {
    number: "04",
    category: "engineering" as CategoryId,
    title: "Joist & Deck Detailing",
    shortTitle: "Joist & Deck",
    code: "SRV-04",
    spec: "SJI Standards",
    description:
      "Coordinated joist and deck detailing supporting structural interfaces, fabrication, and erection.",
    href: "/services/joist-deck",
    icon: Layers3,
    capabilities: [
      "Joist detailing",
      "Deck detailing",
      "3D coordination",
      "Drawing preparation",
      "Structural interface coordination",
      "Fabrication and erection support",
    ],
  },
  {
    number: "05",
    category: "bim" as CategoryId,
    title: "BIM Support",
    shortTitle: "BIM Coordination",
    code: "SRV-05",
    spec: "LOD 350-400",
    description:
      "Model-based coordination and BIM support designed to improve project communication and drawing workflows.",
    href: "/services/bim-support",
    icon: ScanLine,
    capabilities: [
      "3D steel modeling",
      "Model coordination",
      "Clash and coordination support",
      "Drawing extraction",
      "Model-based communication",
      "Fabrication-oriented BIM workflows",
    ],
  },
  {
    number: "06",
    category: "bim" as CategoryId,
    title: "Estimation & Material Take-Off",
    shortTitle: "Estimation",
    code: "SRV-06",
    spec: "Advance BOM",
    description:
      "Model-based quantity extraction and estimation support for better project planning and material visibility.",
    href: "/services/estimation",
    icon: Calculator,
    capabilities: [
      "Material take-off",
      "Quantity extraction",
      "Steel estimation support",
      "Model-based quantity information",
      "Project quantity documentation",
    ],
  },
];

const workflow = [
  {
    number: "01",
    phase: "Phase 01",
    title: "Understand",
    text: "We review drawings, specifications, project requirements, detailing standards, schedules, and fabrication needs.",
  },
  {
    number: "02",
    phase: "Phase 02",
    title: "Coordinate",
    text: "We identify interfaces and coordination requirements before developing the project model and drawings.",
  },
  {
    number: "03",
    phase: "Phase 03",
    title: "Model",
    text: "We develop coordinated 3D models around the project's structural and fabrication requirements.",
  },
  {
    number: "04",
    phase: "Phase 04",
    title: "Detail",
    text: "We produce shop and erection drawings with a practical fabrication-oriented approach.",
  },
  {
    number: "05",
    phase: "Phase 05",
    title: "Deliver",
    text: "We provide coordinated deliverables while maintaining communication throughout the project lifecycle.",
  },
];

const pillars = [
  {
    icon: Crosshair,
    label: "Focus",
    title: "Accuracy",
    desc: "Detailing structured around project requirements and fabrication needs.",
  },
  {
    icon: Workflow,
    label: "Method",
    title: "Coordination",
    desc: "Model-based workflows supporting communication between project stakeholders.",
  },
  {
    icon: ShieldCheck,
    label: "Objective",
    title: "Reliability",
    desc: "Practical technical support designed around dependable project delivery.",
  },
];

export default function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState<CategoryId>("all");

  const filteredServices =
    activeCategory === "all"
      ? services
      : services.filter((s) => s.category === activeCategory);

  return (
    <main className="min-h-screen bg-[#fafbfc] text-ink overflow-hidden">
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-navy-950 text-white pt-44 pb-32 lg:pb-40">
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

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-5xl">
            {/* Pill Badge */}
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-copper-400 backdrop-blur-md"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-copper-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-copper-500" />
              </span>
              Our Capabilities // 06 Disciplines
            </motion.div>

            {/* Monumental Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display text-5xl uppercase leading-[0.92] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
            >
              Detailed Solutions
              <span className="block bg-gradient-to-r from-copper-400 via-copper-300 to-copper-500 bg-clip-text text-transparent">
                For The Steel Construction Lifecycle.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-8 max-w-3xl text-base leading-relaxed text-steel-300 md:text-lg"
            >
              From structural steel modeling and shop drawings to BIM
              coordination, miscellaneous steel, joist and deck detailing,
              connection support, and estimation, Kenz Engineering provides
              technical capabilities built around project requirements.
            </motion.p>

            {/* CTA Buttons & Specs Row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <Link
                href="/contact"
                className="group inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-copper-600 via-copper-500 to-copper-600 px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] text-white shadow-lg shadow-copper-500/25 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-copper-500/35"
              >
                <span>Start A Project</span>
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>

              <Link
                href="/projects"
                className="inline-flex items-center gap-3 rounded-xl border border-white/20 bg-white/5 px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] text-steel-200 backdrop-blur-sm transition-all duration-300 hover:border-copper-400 hover:bg-white/10 hover:text-white"
              >
                View Projects
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Bottom accent gradient beam */}
        <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-copper-500/60 to-transparent" />
      </section>

      {/* ── INTRO PHILOSOPHY STRIP ───────────────────────────── */}
      <section className="relative z-20 -mt-8 px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl border border-steel-200/90 bg-white p-8 shadow-[0_15px_40px_rgba(10,20,32,0.06)] md:p-12"
          >
            <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
              <div>
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-copper-600">
                  TECHNICAL CAPABILITIES
                </span>
                <h2 className="mt-3 font-display text-4xl uppercase leading-tight text-navy-950 sm:text-5xl">
                  One Team.
                  <span className="block bg-gradient-to-r from-copper-600 to-copper-500 bg-clip-text text-transparent">
                    Multiple Capabilities.
                  </span>
                </h2>
              </div>

              <div className="space-y-4 text-sm leading-relaxed text-steel-700 md:text-base">
                <p>
                  Kenz Engineering LLC provides a range of structural steel
                  detailing and engineering support services designed to work
                  together across the project lifecycle.
                </p>
                <p>
                  Our approach combines 3D modeling, coordinated detailing,
                  fabrication-oriented documentation, BIM workflows, and
                  quantity information to support steel fabricators, contractors,
                  and construction professionals.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── SERVICES GRID WORKBENCH ──────────────────────────── */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Section Header & Interactive Filter Bar */}
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-copper-200 bg-copper-50 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-copper-700">
                <Sparkles size={13} className="text-copper-600" />
                <span>What We Do</span>
              </div>

              <h2 className="mt-4 font-display text-4xl uppercase leading-[0.95] text-navy-950 sm:text-5xl md:text-6xl">
                Engineering Support
                <span className="block bg-gradient-to-r from-copper-600 to-copper-500 bg-clip-text text-transparent">
                  Built Around Detail.
                </span>
              </h2>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-2 rounded-2xl border border-steel-200 bg-white p-1.5 shadow-sm">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`rounded-xl px-4 py-2 text-xs font-semibold transition-all duration-200 ${
                    activeCategory === cat.id
                      ? "bg-navy-950 text-white shadow-sm"
                      : "text-steel-600 hover:bg-steel-50 hover:text-navy-950"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Cards Grid */}
          <motion.div
            layout
            className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence>
              {filteredServices.map((service, idx) => {
                const Icon = service.icon;
                return (
                  <motion.article
                    key={service.number}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                    className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-steel-200/90 bg-white p-8 shadow-[0_10px_30px_-5px_rgba(10,20,32,0.05)] transition-all duration-300 hover:border-copper-400 hover:shadow-[0_20px_45px_-8px_rgba(193,122,62,0.18)] hover:-translate-y-1.5"
                  >
                    {/* Top laser accent line */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-copper-500 to-copper-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                    <div>
                      {/* Card Top: Number + Icon + Spec Tag */}
                      <div className="flex items-center justify-between">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-copper-500/20 bg-copper-50 text-copper-600 shadow-sm transition-all duration-300 group-hover:bg-copper-500 group-hover:text-white group-hover:scale-105">
                          <Icon size={22} strokeWidth={1.7} />
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-semibold text-steel-400 group-hover:text-copper-600 transition-colors">
                            {service.code}
                          </span>
                          <span className="rounded-md border border-steel-200 bg-steel-50 px-2 py-0.5 font-mono text-[10px] font-semibold text-steel-600">
                            {service.spec}
                          </span>
                        </div>
                      </div>

                      {/* Title & Short Title */}
                      <p className="mt-6 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-copper-600">
                        {service.shortTitle}
                      </p>
                      <h3 className="mt-1 font-display text-2xl uppercase tracking-wide text-navy-950 group-hover:text-copper-600 transition-colors">
                        {service.title}
                      </h3>

                      <p className="mt-3 text-xs leading-relaxed text-steel-600">
                        {service.description}
                      </p>

                      <div className="my-6 h-px bg-steel-100" />

                      {/* Capabilities Checklist */}
                      <ul className="space-y-2.5">
                        {service.capabilities.map((cap) => (
                          <li
                            key={cap}
                            className="flex items-start gap-2.5 text-xs text-steel-700"
                          >
                            <CheckCircle2
                              size={14}
                              className="mt-0.5 shrink-0 text-copper-500"
                            />
                            <span>{cap}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Bottom Action Link */}
                    <div className="mt-8 border-t border-steel-100 pt-5">
                      <Link
                        href={service.href}
                        className="group/link flex items-center justify-between text-xs font-bold uppercase tracking-[0.18em] text-navy-950 transition-colors hover:text-copper-600"
                      >
                        <span>Explore Service Details</span>
                        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-steel-50 text-steel-600 transition-all duration-300 group-hover/link:bg-copper-500 group-hover/link:text-white group-hover/link:translate-x-1">
                          <ArrowRight size={14} />
                        </span>
                      </Link>
                    </div>
                  </motion.article>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* ── WORKFLOW TIMELINE ─────────────────────────────────── */}
      <section className="border-t border-steel-200/80 bg-white py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div className="lg:sticky lg:top-32">
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-copper-600">
                PROVEN METHODOLOGY
              </span>
              <h2 className="mt-3 font-display text-4xl uppercase leading-tight text-navy-950 sm:text-5xl">
                From Design
                <span className="block bg-gradient-to-r from-copper-600 to-copper-500 bg-clip-text text-transparent">
                  To Fabrication.
                </span>
              </h2>

              <p className="mt-6 text-base leading-relaxed text-steel-700">
                Our workflow is structured around understanding project
                requirements first, then coordinating, modeling, detailing,
                and delivering project information.
              </p>

              <div className="mt-8 inline-flex items-center gap-3 rounded-2xl border border-copper-500/30 bg-copper-50/50 p-4">
                <Workflow size={20} className="text-copper-600" />
                <span className="text-xs font-semibold text-navy-950">
                  Zero-Clash Tolerance Execution Standard
                </span>
              </div>
            </div>

            {/* Stepper Vertical Workbench */}
            <div className="space-y-4">
              {workflow.map((item) => (
                <div
                  key={item.number}
                  className="group rounded-2xl border border-steel-200/90 bg-white p-6 transition-all duration-300 hover:border-copper-400 hover:bg-copper-50/20 hover:shadow-md"
                >
                  <div className="flex items-start gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-navy-950 font-mono text-xs font-bold text-white transition-colors group-hover:bg-copper-500">
                      {item.number}
                    </span>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] font-bold uppercase text-copper-600">
                          {item.phase}
                        </span>
                      </div>
                      <h3 className="mt-1 font-display text-2xl uppercase tracking-wide text-navy-950 group-hover:text-copper-600 transition-colors">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-xs leading-relaxed text-steel-700">
                        {item.text}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 3 PILLARS WORKBENCH ──────────────────────────────── */}
      <section className="border-t border-steel-200/80 bg-[#fafbfc] py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-3">
            {pillars.map(({ icon: Icon, label, title, desc }) => (
              <div
                key={title}
                className="group relative flex flex-col justify-between rounded-2xl border border-steel-200 bg-white p-8 shadow-sm transition-all duration-300 hover:border-copper-400 hover:shadow-lg hover:-translate-y-1"
              >
                <div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-copper-500/20 bg-copper-50 text-copper-600">
                    <Icon size={22} />
                  </div>
                  <p className="mt-6 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-copper-600">
                    {label}
                  </p>
                  <h3 className="mt-1 font-display text-2xl uppercase text-navy-950 group-hover:text-copper-600 transition-colors">
                    {title}
                  </h3>
                  <p className="mt-3 text-xs leading-relaxed text-steel-600">
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SCOPE NOTE BAR ───────────────────────────────────── */}
      <section className="relative overflow-hidden bg-navy-950 py-16 text-white lg:py-20">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[10px] uppercase text-copper-400">
                <ShieldCheck size={12} />
                <span>Project Scope Clarification</span>
              </div>
              <h2 className="font-display text-3xl uppercase leading-tight sm:text-4xl">
                Engineering Responsibility
                <span className="block text-copper-400">Follows Project Scope.</span>
              </h2>
              <p className="mt-4 max-w-3xl text-xs leading-relaxed text-steel-400 md:text-sm">
                Specific engineering and design responsibilities for
                connections or delegated design services are subject to the
                project scope, contractual requirements, applicable approvals,
                and responsibilities defined for each project.
              </p>
            </div>

            <div className="shrink-0">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-3 rounded-xl border border-copper-500/80 px-7 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-copper-300 transition-all duration-300 hover:bg-copper-500 hover:text-white"
              >
                <span>Discuss Your Scope</span>
                <ArrowRight
                  size={15}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── BOTTOM CINEMATIC CTA ─────────────────────────────── */}
      <section className="relative overflow-hidden bg-navy-950 px-6 py-20 text-white md:py-24">
        <div className="relative mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-br from-copper-600 via-copper-500 to-[#8c4614] p-8 shadow-2xl md:p-14 lg:p-16">
            <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-white/80">
                  Kenz Engineering LLC
                </p>
                <h2 className="mt-3 font-display text-4xl uppercase leading-[0.92] text-white sm:text-5xl lg:text-6xl">
                  One Team.
                  <span className="block text-navy-950">
                    Multiple Technical Capabilities.
                  </span>
                </h2>
                <p className="mt-6 max-w-2xl text-sm leading-relaxed text-white/90">
                  Tell us about your project requirements and let&apos;s discuss how
                  Kenz Engineering can support your detailing and engineering
                  workflow.
                </p>
              </div>

              <div className="shrink-0">
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-4 rounded-xl bg-white px-9 py-4 text-xs font-bold uppercase tracking-[0.2em] text-navy-950 shadow-md transition-all duration-300 hover:bg-navy-950 hover:text-white hover:scale-105"
                >
                  <span>Start A Project</span>
                  <ArrowRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}