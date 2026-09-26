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
  ChevronDown,
  ShieldCheck,
  Workflow,
  Crosshair,
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
  const [openService, setOpenService] = useState<string>("01");

  const filteredServices =
    activeCategory === "all"
      ? services
      : services.filter((s) => s.category === activeCategory);

  return (
    <main className="min-h-screen bg-[#fafbfc] text-ink">
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-navy-950 pt-40 pb-24 text-white lg:pt-48">
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
        <div className="pointer-events-none absolute -left-48 top-1/4 h-[550px] w-[550px] rounded-full bg-copper-500/12 blur-[140px]" />
        <div className="pointer-events-none absolute -right-48 bottom-1/4 h-[550px] w-[550px] rounded-full bg-copper-600/12 blur-[150px]" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr] lg:items-end">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-copper-400">
                Capability Index — 06 Disciplines
              </span>

              <h1 className="mt-6 font-display text-5xl uppercase leading-[0.92] tracking-tight sm:text-6xl md:text-7xl">
                Detailed Solutions
                <span className="block bg-gradient-to-r from-copper-400 via-copper-300 to-copper-500 bg-clip-text text-transparent">
                  For The Steel Construction Lifecycle.
                </span>
              </h1>

              <p className="mt-8 max-w-2xl text-base leading-relaxed text-steel-300 md:text-lg">
                From structural steel modeling and shop drawings to BIM
                coordination, miscellaneous steel, joist and deck detailing,
                connection support, and estimation — Kenz Engineering
                provides technical capabilities built around project
                requirements.
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-3 rounded-xl bg-copper-500 px-7 py-3.5 text-xs font-bold uppercase tracking-[0.18em] text-white shadow-lg shadow-copper-500/25 transition-all duration-300 hover:bg-copper-400"
                >
                  Start A Project
                  <ArrowRight
                    size={15}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-3 rounded-xl border border-white/15 bg-white/[0.04] px-7 py-3.5 text-xs font-bold uppercase tracking-[0.18em] text-steel-200 transition-all duration-300 hover:border-copper-400 hover:text-white"
                >
                  View Projects
                </Link>
              </div>
            </div>

            {/* Index rail — doubles as jump-nav, sets up the section below */}
            <div className="hidden border-t border-white/[0.08] pt-6 lg:block">
              <ul className="space-y-2">
                {services.map((s) => (
                  <li key={s.number}>
                    <a
                      href={`#${s.href.split("/").pop()}`}
                      onClick={() => setOpenService(s.number)}
                      className="group flex items-center justify-between border-b border-white/[0.06] py-2 text-sm text-steel-400 transition-colors hover:text-copper-300"
                    >
                      <span className="flex items-center gap-3">
                        <span className="font-mono text-xs text-steel-600 group-hover:text-copper-400">
                          {s.number}
                        </span>
                        {s.shortTitle}
                      </span>
                      <ArrowUpRight
                        size={13}
                        className="opacity-0 transition-opacity group-hover:opacity-100"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-copper-500/60 to-transparent" />
      </section>

      {/* ── PILLARS — quiet inline band, not repeated cards ───── */}
      <section className="border-b border-steel-200/80 bg-white py-10">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid divide-y divide-steel-200 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {pillars.map(({ icon: Icon, label, title, desc }) => (
              <div key={title} className="flex items-start gap-4 py-4 sm:px-8 sm:py-0 first:sm:pl-0">
                <Icon size={20} className="mt-0.5 shrink-0 text-copper-600" />
                <div>
                  <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-copper-600">
                    {label}
                  </p>
                  <h3 className="mt-1 text-sm font-semibold text-navy-950">
                    {title}
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-steel-600">
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES — interactive spec-sheet index/accordion ──── */}
      <section className="py-24 md:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-copper-600">
                What We Do
              </span>
              <h2 className="mt-3 font-display text-4xl uppercase leading-[0.95] text-navy-950 sm:text-5xl">
                Engineering Support
                <span className="block bg-gradient-to-r from-copper-600 to-copper-500 bg-clip-text text-transparent">
                  Built Around Detail.
                </span>
              </h2>
            </div>

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

          {/* Index list */}
          <div className="mt-12 divide-y divide-steel-200 border-y border-steel-200">
            <AnimatePresence initial={false}>
              {filteredServices.map((service) => {
                const Icon = service.icon;
                const isOpen = openService === service.number;
                return (
                  <div
                    key={service.number}
                    id={service.href.split("/").pop()}
                    className="scroll-mt-32"
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setOpenService(isOpen ? "" : service.number)
                      }
                      className="flex w-full items-center gap-6 py-6 text-left transition-colors hover:bg-steel-50/60"
                    >
                      <span className="font-mono text-sm text-steel-400">
                        {service.number}
                      </span>
                      <span
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border transition-colors ${
                          isOpen
                            ? "border-copper-500 bg-copper-500 text-white"
                            : "border-copper-500/20 bg-copper-50 text-copper-600"
                        }`}
                      >
                        <Icon size={19} strokeWidth={1.7} />
                      </span>

                      <span className="min-w-0 flex-1">
                        <span className="block font-display text-xl uppercase tracking-wide text-navy-950 sm:text-2xl">
                          {service.title}
                        </span>
                        <span className="hidden text-xs text-steel-500 sm:block">
                          {service.description}
                        </span>
                      </span>

                      <span className="hidden shrink-0 rounded-md border border-steel-200 bg-steel-50 px-2 py-0.5 font-mono text-[10px] font-semibold text-steel-600 md:inline-block">
                        {service.spec}
                      </span>

                      <ChevronDown
                        size={18}
                        className={`shrink-0 text-steel-400 transition-transform duration-300 ${
                          isOpen ? "rotate-180 text-copper-500" : ""
                        }`}
                      />
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="grid gap-8 pb-8 pl-[68px] sm:grid-cols-[1fr_1fr] lg:grid-cols-[1fr_1.2fr]">
                            <p className="text-sm leading-relaxed text-steel-600 sm:hidden">
                              {service.description}
                            </p>

                            <ul className="space-y-2.5">
                              {service.capabilities.map((cap) => (
                                <li
                                  key={cap}
                                  className="flex items-start gap-2.5 text-sm text-steel-700"
                                >
                                  <CheckCircle2
                                    size={15}
                                    className="mt-0.5 shrink-0 text-copper-500"
                                  />
                                  <span>{cap}</span>
                                </li>
                              ))}
                            </ul>

                            <div className="flex flex-col items-start justify-between gap-4 rounded-xl border border-steel-200 bg-steel-50/60 p-5">
                              <p className="text-xs leading-relaxed text-steel-600">
                                Full scope, deliverables, and workflow for
                                this discipline.
                              </p>
                              <Link
                                href={service.href}
                                className="group/link inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-navy-950 transition-colors hover:text-copper-600"
                              >
                                Explore Service Details
                                <ArrowRight
                                  size={14}
                                  className="transition-transform group-hover/link:translate-x-1"
                                />
                              </Link>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ── WORKFLOW — horizontal stepper ─────────────────────── */}
      <section className="border-t border-steel-200/80 bg-white py-24 md:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-copper-600">
              Proven Methodology
            </span>
            <h2 className="mt-3 font-display text-4xl uppercase leading-tight text-navy-950 sm:text-5xl">
              From Design
              <span className="block bg-gradient-to-r from-copper-600 to-copper-500 bg-clip-text text-transparent">
                To Fabrication.
              </span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-steel-700">
              Our workflow is structured around understanding project
              requirements first, then coordinating, modeling, detailing,
              and delivering project information.
            </p>
          </div>

          <div className="mt-12 grid gap-4 overflow-x-auto pb-2 md:grid-cols-5">
            {workflow.map((item, i) => (
              <div key={item.number} className="relative">
                <div className="rounded-2xl border border-steel-200 bg-white p-5 transition-colors hover:border-copper-400 hover:bg-copper-50/20">
                  <span className="font-mono text-[10px] font-bold uppercase text-copper-600">
                    {item.phase}
                  </span>
                  <h3 className="mt-2 font-display text-xl uppercase tracking-wide text-navy-950">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-steel-600">
                    {item.text}
                  </p>
                </div>
                {i < workflow.length - 1 && (
                  <span className="absolute -right-4 top-1/2 hidden -translate-y-1/2 text-steel-300 md:block">
                    <ArrowRight size={14} />
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CLOSING CTA ────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-navy-950 px-6 py-20 text-white md:py-24">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
        <div className="relative mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[10px] uppercase text-copper-400">
                <ShieldCheck size={12} />
                Project Scope Clarification
              </div>
              <h2 className="mt-4 font-display text-4xl uppercase leading-[0.95] sm:text-5xl">
                One Team.
                <span className="block bg-gradient-to-r from-copper-400 via-copper-300 to-copper-500 bg-clip-text text-transparent">
                  Multiple Technical Capabilities.
                </span>
              </h2>
              <p className="mt-5 max-w-xl text-sm leading-relaxed text-steel-400 md:text-base">
                Engineering and design responsibilities for connections or
                delegated design services are subject to the project scope,
                contractual requirements, and applicable approvals defined
                for each project.
              </p>
            </div>

            <div className="flex flex-col items-start gap-3 lg:items-end">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-3 rounded-xl bg-copper-500 px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] text-white shadow-lg shadow-copper-500/25 transition-all duration-300 hover:bg-copper-400"
              >
                Start A Project
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
              <Link
                href="/contact"
                className="text-xs font-semibold uppercase tracking-[0.18em] text-steel-400 transition-colors hover:text-copper-300"
              >
                Or discuss your scope directly →
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-copper-500/60 to-transparent" />
      </section>
    </main>
  );
}