"use client";

import Link from "next/link";
import {
  ArrowRight,
  Box,
  Cable,
  Layers3,
  Ruler,
  ScanLine,
  Calculator,
  CheckCircle2,
} from "lucide-react";
import {
  FadeUp,
  FadeIn,
  SlideIn,
  StaggerContainer,
  StaggerItem,
  LineExpand,
} from "@/components/ui/Motion";

const services = [
  {
    number: "01",
    title: "Steel Detailing",
    shortTitle: "Structural Steel",
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
    title: "Miscellaneous Detailing",
    shortTitle: "Miscellaneous Steel",
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
    title: "Connection & Delegated Design",
    shortTitle: "Connections",
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
    title: "Joist & Deck Detailing",
    shortTitle: "Joist & Deck",
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
    title: "BIM Support",
    shortTitle: "BIM Coordination",
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
    title: "Estimation & Material Take-Off",
    shortTitle: "Estimation",
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
    title: "Understand",
    text: "We review drawings, specifications, project requirements, detailing standards, schedules, and fabrication needs.",
  },
  {
    number: "02",
    title: "Coordinate",
    text: "We identify interfaces and coordination requirements before developing the project model and drawings.",
  },
  {
    number: "03",
    title: "Model",
    text: "We develop coordinated 3D models around the project's structural and fabrication requirements.",
  },
  {
    number: "04",
    title: "Detail",
    text: "We produce shop and erection drawings with a practical fabrication-oriented approach.",
  },
  {
    number: "05",
    title: "Deliver",
    text: "We provide coordinated deliverables while maintaining communication throughout the project lifecycle.",
  },
];

const pillars = [
  {
    label: "Focus",
    title: "Accuracy",
    desc: "Detailing structured around project requirements and fabrication needs.",
  },
  {
    label: "Method",
    title: "Coordination",
    desc: "Model-based workflows supporting communication between project stakeholders.",
  },
  {
    label: "Objective",
    title: "Reliability",
    desc: "Practical technical support designed around dependable project delivery.",
  },
];

export default function ServicesPage() {
  return (
    <main className="bg-paper text-ink overflow-hidden">

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-navy-950 text-white">
        <div className="engineering-grid-dark kenz-grid-move absolute inset-0 opacity-40" />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 top-0 h-[700px] w-[700px] rounded-full"
          style={{
            background:
              "radial-gradient(circle at 70% 30%, rgba(193,122,62,0.2) 0%, transparent 60%)",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-6 py-36 lg:px-8 lg:py-44">
          <div className="max-w-5xl">
            <FadeIn delay={0.05}>
              <div className="mb-8 flex items-center gap-4">
                <LineExpand className="h-px w-12 bg-copper-500" delay={0.1} />
                <span className="text-xs font-semibold uppercase tracking-[0.28em] text-copper-400">
                  Our Services
                </span>
              </div>
            </FadeIn>

            <FadeUp delay={0.15}>
              <h1 className="font-display text-5xl font-semibold uppercase leading-[0.94] tracking-tight sm:text-6xl lg:text-8xl">
                Detailed Solutions
                <br />
                <span className="text-copper-400">
                  For The Steel Construction Lifecycle.
                </span>
              </h1>
            </FadeUp>

            <FadeUp delay={0.3}>
              <p className="mt-8 max-w-3xl text-base leading-8 text-steel-200 sm:text-lg">
                From structural steel modeling and shop drawings to BIM
                coordination, miscellaneous steel, joist and deck detailing,
                connection support, and estimation, Kenz Engineering provides
                technical capabilities built around project requirements.
              </p>
            </FadeUp>

            <FadeUp delay={0.4}>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-3 bg-copper-500 px-8 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-white transition-all duration-300 hover:bg-copper-400"
                >
                  Start A Project
                  <ArrowRight
                    size={17}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-3 border border-steel-500/50 px-8 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-steel-200 transition-all duration-300 hover:border-copper-400 hover:text-white"
                >
                  View Projects
                </Link>
              </div>
            </FadeUp>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 h-px w-full bg-copper-500/60" />
      </section>

      {/* ── INTRO ────────────────────────────────────────────── */}
      <section className="bg-paper border-b border-steel-200">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
            <SlideIn from="left">
              <div>
                <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-copper-600">
                  Technical Capabilities
                </p>
                <h2 className="font-display text-4xl font-semibold uppercase leading-tight text-navy-950 sm:text-5xl">
                  One Team.
                  <br />
                  Multiple Capabilities.
                </h2>
                <LineExpand className="mt-8 h-px bg-copper-500" delay={0.15} />
              </div>
            </SlideIn>

            <SlideIn from="right" delay={0.1}>
              <div className="space-y-6 text-base leading-8 text-steel-700">
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
                <p>
                  Each service can be used independently or integrated into a
                  broader project workflow depending on the requirements,
                  schedule, and scope of work.
                </p>
              </div>
            </SlideIn>
          </div>
        </div>
      </section>

      {/* ── SERVICES GRID ────────────────────────────────────── */}
      <section className="bg-navy-900 text-white">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
          <FadeUp>
            <div className="mb-14 max-w-3xl">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-copper-400">
                What We Do
              </p>
              <h2 className="font-display text-4xl font-semibold uppercase leading-tight sm:text-5xl">
                Engineering Support
                <br />
                Built Around Detail.
              </h2>
              <p className="mt-6 leading-8 text-steel-400">
                Explore our core service capabilities and see how each can
                support the structural steel construction process.
              </p>
            </div>
          </FadeUp>

          <StaggerContainer
            className="grid gap-4 md:grid-cols-2 xl:grid-cols-3"
            staggerDelay={0.08}
          >
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <StaggerItem key={service.number}>
                  <article className="group relative flex flex-col overflow-hidden border border-steel-700/50 bg-navy-950 transition-all duration-400 hover:-translate-y-1 hover:border-copper-500/70 hover:shadow-[0_24px_60px_rgba(0,0,0,0.4)]">
                    {/* top bar */}
                    <div className="flex items-center justify-between border-b border-steel-700/50 px-7 py-6">
                      <span className="font-display text-3xl text-copper-400">
                        {service.number}
                      </span>
                      <Icon
                        size={23}
                        strokeWidth={1.5}
                        className="text-steel-500 transition-colors duration-300 group-hover:text-copper-400"
                      />
                    </div>

                    {/* content */}
                    <div className="flex flex-1 flex-col p-7">
                      <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.2em] text-copper-400">
                        {service.shortTitle}
                      </p>
                      <h3 className="font-display text-2xl font-semibold uppercase leading-tight">
                        {service.title}
                      </h3>
                      <p className="mt-5 text-sm leading-7 text-steel-400">
                        {service.description}
                      </p>

                      <div className="my-7 h-px bg-steel-700/50" />

                      <ul className="space-y-3">
                        {service.capabilities.map((cap) => (
                          <li
                            key={cap}
                            className="flex items-start gap-3 text-sm text-steel-300"
                          >
                            <CheckCircle2
                              size={16}
                              className="mt-0.5 shrink-0 text-copper-500"
                            />
                            <span>{cap}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="mt-auto pt-8">
                        <Link
                          href={service.href}
                          className="group/link inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.18em] text-white"
                        >
                          Explore Service
                          <ArrowRight
                            size={16}
                            className="text-copper-400 transition-transform duration-300 group-hover/link:translate-x-1"
                          />
                        </Link>
                      </div>
                    </div>

                    {/* bottom copper bar */}
                    <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-copper-500 transition-all duration-400 group-hover:w-full" />
                  </article>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* ── WORKFLOW ─────────────────────────────────────────── */}
      <section className="bg-paper">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
          <div className="grid gap-14 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
            <SlideIn from="left">
              <div className="lg:sticky lg:top-32">
                <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-copper-600">
                  Our Workflow
                </p>
                <h2 className="font-display text-4xl font-semibold uppercase leading-tight text-navy-950 sm:text-5xl">
                  From Design
                  <br />
                  To Fabrication.
                </h2>
                <LineExpand className="mt-8 h-px bg-copper-500" delay={0.15} />
                <p className="mt-8 leading-8 text-steel-700">
                  Our workflow is structured around understanding project
                  requirements first, then coordinating, modeling, detailing,
                  and delivering project information.
                </p>
              </div>
            </SlideIn>

            <StaggerContainer staggerDelay={0.1}>
              {workflow.map((item) => (
                <StaggerItem key={item.number}>
                  <div className="group grid gap-5 border-b border-steel-200 py-7 last:border-b-0 sm:grid-cols-[80px_170px_1fr] sm:items-start hover:bg-steel-200/30 transition-colors duration-300 px-4 -mx-4">
                    <span className="font-display text-3xl text-copper-500 transition-colors duration-300 group-hover:text-copper-600">
                      {item.number}
                    </span>
                    <h3 className="font-display text-2xl font-semibold uppercase text-navy-950 transition-colors duration-300 group-hover:text-copper-600">
                      {item.title}
                    </h3>
                    <p className="text-sm leading-7 text-steel-700">{item.text}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* ── PILLARS ──────────────────────────────────────────── */}
      <section className="border-y border-steel-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <StaggerContainer
            className="grid gap-8 md:grid-cols-3"
            staggerDelay={0.12}
          >
            {pillars.map(({ label, title, desc }) => (
              <StaggerItem key={title}>
                <div className="group border-l-2 border-copper-500 pl-6 transition-all duration-300 hover:border-copper-400">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-copper-600">
                    {label}
                  </p>
                  <h3 className="mt-3 font-display text-2xl font-semibold uppercase text-navy-950 transition-colors duration-300 group-hover:text-copper-600">
                    {title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-steel-700">{desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ── SCOPE NOTE ───────────────────────────────────────── */}
      <section className="bg-navy-950 text-white">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <FadeUp>
              <div>
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-copper-400">
                  Project Scope
                </p>
                <h2 className="font-display text-3xl font-semibold uppercase sm:text-4xl">
                  Engineering Responsibility
                  <br />
                  Follows Project Scope.
                </h2>
                <p className="mt-5 max-w-3xl text-sm leading-7 text-steel-400">
                  Specific engineering and design responsibilities for
                  connections or delegated design services are subject to the
                  project scope, contractual requirements, applicable approvals,
                  and responsibilities defined for each project.
                </p>
              </div>
            </FadeUp>

            <FadeIn delay={0.2}>
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-3 border border-copper-500 px-8 py-4 text-xs font-bold uppercase tracking-[0.18em] text-copper-400 transition-all duration-300 hover:bg-copper-500 hover:text-white"
              >
                Discuss Your Scope
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-copper-500 text-white">
        <div className="engineering-grid absolute inset-0 opacity-20" />
        <div
          aria-hidden
          className="pointer-events-none absolute -left-32 -bottom-32 h-[500px] w-[500px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 60%)",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">
          <div className="max-w-4xl">
            <FadeUp>
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-white/70">
                Kenz Engineering LLC
              </p>
              <h2 className="font-display text-4xl font-semibold uppercase leading-none sm:text-5xl lg:text-7xl">
                One Team.
                <br />
                Multiple Technical Capabilities.
              </h2>
              <p className="mt-7 max-w-2xl leading-7 text-white/80">
                Tell us about your project requirements and let&apos;s discuss how
                Kenz Engineering can support your detailing and engineering
                workflow.
              </p>
            </FadeUp>

            <FadeIn delay={0.2}>
              <div className="mt-9">
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-3 bg-navy-950 px-8 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-white transition-all duration-300 hover:bg-navy-900"
                >
                  Start A Project
                  <ArrowRight
                    size={17}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </main>
  );
}