"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2, ArrowUpRight } from "lucide-react";
import {
  FadeUp,
  FadeIn,
  SlideIn,
  StaggerContainer,
  StaggerItem,
  LineExpand,
} from "@/components/ui/Motion";

const projectTypes = [
  "Structural Steel Detailing",
  "Miscellaneous Steel",
  "Joist & Deck Detailing",
  "BIM Support",
  "Connection Detailing",
  "Estimation & Material Take-Off",
];

const process = [
  {
    number: "01",
    title: "Understand",
    description:
      "Project requirements, standards, schedules, and scope.",
    detail:
      "We review drawings, specifications, and project requirements before starting any modelling or detailing work.",
  },
  {
    number: "02",
    title: "Coordinate",
    description:
      "Coordinate project information and technical requirements.",
    detail:
      "We identify interfaces and coordinate technical requirements before developing the model and drawings.",
  },
  {
    number: "03",
    title: "Model",
    description: "Develop coordinated 3D project information.",
    detail:
      "We build coordinated 3D models around the project's structural and fabrication requirements.",
  },
  {
    number: "04",
    title: "Detail",
    description: "Prepare detailed project documentation.",
    detail:
      "We produce shop and erection drawings with a practical fabrication-oriented approach.",
  },
  {
    number: "05",
    title: "Deliver",
    description:
      "Provide organized deliverables aligned with project needs.",
    detail:
      "We provide coordinated deliverables while maintaining communication throughout the project lifecycle.",
  },
];

export default function ProjectsPage() {
  return (
    <main className="bg-paper overflow-hidden">

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative bg-navy-950 text-white overflow-hidden">
        <div className="engineering-grid-dark kenz-grid-move absolute inset-0 opacity-30" />
        <div
          aria-hidden
          className="pointer-events-none absolute right-0 top-0 h-[600px] w-[600px] rounded-full"
          style={{
            background:
              "radial-gradient(circle at 80% 20%, rgba(193,122,62,0.18) 0%, transparent 60%)",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-6 pb-28 pt-44 lg:px-8">
          <FadeIn delay={0.05}>
            <div className="mb-6 flex items-center gap-4">
              <LineExpand className="h-px w-12 bg-copper-500" delay={0.1} />
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-copper-400">
                02 / Project Experience
              </p>
            </div>
          </FadeIn>

          <FadeUp delay={0.15}>
            <h1 className="max-w-5xl font-display text-5xl uppercase leading-[0.95] sm:text-6xl lg:text-8xl">
              Detailing Built Around
              <br />
              <span className="text-copper-400">Project Requirements.</span>
            </h1>
          </FadeUp>

          <FadeUp delay={0.3}>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-steel-400">
              Every project brings its own detailing standards, coordination
              requirements, schedules, fabrication needs, and technical
              challenges.
            </p>
          </FadeUp>
        </div>

        <div className="absolute bottom-0 left-0 h-px w-full bg-copper-500/50" />
      </section>

      {/* ── DELIVERY PROCESS ─────────────────────────────────── */}
      <section className="bg-paper border-b border-steel-200">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-[0.75fr_1.25fr]">
            <SlideIn from="left">
              <div className="lg:sticky lg:top-32">
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-copper-600">
                  Project Approach
                </p>
                <h2 className="mt-5 font-display text-4xl uppercase text-navy-950 sm:text-5xl">
                  A Structured
                  <br />
                  Delivery Process
                </h2>
                <LineExpand className="mt-8 h-px bg-copper-500" delay={0.15} />
                <p className="mt-8 leading-7 text-steel-700">
                  Our workflow is built around understanding project requirements
                  first, then coordinating, modelling, detailing, and delivering
                  with consistent communication.
                </p>
              </div>
            </SlideIn>

            {/* timeline steps */}
            <StaggerContainer className="relative" staggerDelay={0.1}>
              {/* vertical connector line */}
              <div className="absolute left-[22px] top-4 bottom-4 w-px bg-steel-200 hidden sm:block" />

              {process.map(({ number, title, description, detail }) => (
                <StaggerItem key={number}>
                  <div className="group relative mb-4 last:mb-0 sm:pl-16">
                    {/* circle node */}
                    <div className="absolute left-0 top-4 hidden h-11 w-11 items-center justify-center border border-steel-200 bg-paper transition-all duration-300 group-hover:border-copper-500 group-hover:bg-copper-500/10 sm:flex">
                      <span className="font-mono text-xs font-bold text-copper-600 transition-colors duration-300 group-hover:text-copper-500">
                        {number}
                      </span>
                    </div>

                    <div className="border border-steel-200 bg-white p-7 transition-all duration-300 hover:border-copper-500/40 hover:shadow-[0_8px_30px_rgba(193,122,62,0.08)]">
                      {/* mobile number */}
                      <span className="mb-3 block font-mono text-xs text-copper-600 sm:hidden">
                        {number}
                      </span>
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="font-display text-2xl uppercase text-navy-950 transition-colors duration-300 group-hover:text-copper-600">
                            {title}
                          </h3>
                          <p className="mt-1 text-sm font-medium text-steel-500">
                            {description}
                          </p>
                        </div>
                        <ArrowUpRight className="h-4 w-4 shrink-0 text-steel-400 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-copper-500" />
                      </div>
                      <p className="mt-4 text-sm leading-6 text-steel-700">
                        {detail}
                      </p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* ── CAPABILITIES GRID ────────────────────────────────── */}
      <section className="bg-navy-900 text-white">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <FadeUp>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-copper-400">
              Project Portfolio
            </p>
            <h2 className="mt-5 max-w-3xl font-display text-4xl uppercase sm:text-5xl">
              Technical Capabilities Across the Steel Lifecycle
            </h2>
          </FadeUp>

          <StaggerContainer
            className="mt-14 grid gap-px bg-steel-700/30 md:grid-cols-2 lg:grid-cols-3"
            staggerDelay={0.08}
          >
            {projectTypes.map((project, index) => (
              <StaggerItem key={project}>
                <div className="group relative overflow-hidden bg-navy-900 p-8 transition-all duration-400 hover:bg-navy-800 cursor-default">
                  <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-copper-500 transition-all duration-500 group-hover:w-full" />
                  <div className="mb-12 flex items-center justify-between">
                    <span className="font-mono text-xs text-copper-400">
                      0{index + 1}
                    </span>
                    <ArrowRight className="h-4 w-4 text-steel-500 transition-all duration-300 group-hover:translate-x-1 group-hover:text-copper-400" />
                  </div>
                  <h3 className="font-display text-2xl uppercase transition-colors duration-300 group-hover:text-copper-400">
                    {project}
                  </h3>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <FadeUp delay={0.2}>
            <div className="mt-10 flex gap-4 border border-copper-600/30 bg-navy-950/80 p-6 backdrop-blur-sm">
              <CheckCircle2 className="h-5 w-5 shrink-0 text-copper-400 mt-0.5" />
              <p className="text-sm leading-6 text-steel-400">
                Selected project case studies will be added here as actual
                projects, drawings, images, or client-approved portfolio
                information become available.
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-copper-600 text-white">
        <div className="engineering-grid absolute inset-0 opacity-20" />
        <div className="relative mx-auto flex max-w-7xl flex-col gap-7 px-6 py-20 md:flex-row md:items-center md:justify-between lg:px-8">
          <FadeUp>
            <h2 className="font-display text-4xl uppercase sm:text-5xl">
              Have a Project to Discuss?
            </h2>
          </FadeUp>

          <FadeIn delay={0.2}>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-3 border border-white px-8 py-4 text-xs font-bold uppercase tracking-[0.18em] transition-all duration-300 hover:bg-white hover:text-copper-600"
            >
              Start a Conversation
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}