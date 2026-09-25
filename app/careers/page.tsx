"use client";

import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
  Mail,
  Users,
  Zap,
  Shield,
  TrendingUp,
  Heart,
  Star,
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

const values = [
  {
    label: "Technical capability",
    icon: Zap,
    desc: "Depth of skill across all steel detailing disciplines.",
  },
  {
    label: "Attention to detail",
    icon: Shield,
    desc: "Precision in every drawing, model, and deliverable.",
  },
  {
    label: "Continuous improvement",
    icon: TrendingUp,
    desc: "Constantly evolving tools, methods, and processes.",
  },
  {
    label: "Collaboration",
    icon: Heart,
    desc: "Effective partnership with clients throughout projects.",
  },
  {
    label: "Accuracy",
    icon: Star,
    desc: "Correct data, coordinates, and documentation every time.",
  },
  {
    label: "Quality",
    icon: CheckCircle2,
    desc: "Consistent delivery of fabrication-ready documentation.",
  },
];

export default function CareersPage() {
  return (
    <main className="bg-paper overflow-hidden">

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative bg-navy-950 text-white overflow-hidden">
        <div className="engineering-grid-dark kenz-grid-move absolute inset-0 opacity-30" />
        <div
          aria-hidden
          className="pointer-events-none absolute -left-40 top-0 h-[500px] w-[500px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(193,122,62,0.15) 0%, transparent 65%)",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-6 pb-28 pt-44 lg:px-8">
          <FadeIn delay={0.05}>
            <div className="mb-6 flex items-center gap-4">
              <LineExpand className="h-px w-12 bg-copper-500" delay={0.1} />
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-copper-400">
                03 / Careers
              </p>
            </div>
          </FadeIn>

          <FadeUp delay={0.15}>
            <h1 className="max-w-5xl font-display text-5xl uppercase leading-[0.95] sm:text-6xl lg:text-8xl">
              Build Your Career Around
              <br />
              <span className="text-copper-400">Engineering Excellence.</span>
            </h1>
          </FadeUp>

          <FadeUp delay={0.3}>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-steel-400">
              Kenz Engineering values professionals who understand accuracy,
              quality, technical capability, and the importance of collaboration
              in steel detailing and engineering support.
            </p>
          </FadeUp>
        </div>

        <div className="absolute bottom-0 left-0 h-px w-full bg-copper-500/50" />
      </section>

      {/* ── GROW WITH PURPOSE ────────────────────────────────── */}
      <section className="border-b border-steel-200 bg-paper">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-2">
            <SlideIn from="left">
              <div>
                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center border border-copper-500/30 bg-copper-500/10">
                  <BriefcaseBusiness className="h-7 w-7 text-copper-600" />
                </div>
                <h2 className="font-display text-4xl uppercase text-navy-950 sm:text-5xl">
                  Grow With
                  <br />
                  Technical Purpose
                </h2>
                <LineExpand className="mt-8 h-px bg-copper-500" delay={0.15} />
              </div>
            </SlideIn>

            <SlideIn from="right" delay={0.1}>
              <div className="space-y-6 leading-8 text-steel-700">
                <p>
                  Our work is built around technical capability, attention to
                  detail, continuous improvement, and collaboration.
                </p>
                <p>
                  As Kenz Engineering grows, we are interested in professionals
                  who want to contribute to accurate, dependable engineering
                  support and develop their capabilities within a technical
                  environment.
                </p>
                <p>
                  Specific openings and role requirements can be published here
                  as positions become available.
                </p>
              </div>
            </SlideIn>
          </div>
        </div>
      </section>

      {/* ── WHAT WE VALUE ────────────────────────────────────── */}
      <section className="bg-navy-900 text-white">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <FadeUp>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-copper-400">
              What We Value
            </p>
            <h2 className="mt-4 font-display text-4xl uppercase sm:text-5xl">
              The Qualities
              <br />
              We Look For
            </h2>
          </FadeUp>

          <StaggerContainer
            className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            staggerDelay={0.08}
          >
            {values.map(({ label, icon: Icon, desc }, index) => (
              <StaggerItem key={label}>
                <div className="group relative overflow-hidden border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-copper-500/50 hover:bg-white/10">
                  {/* copper bottom bar */}
                  <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-copper-500 transition-all duration-500 group-hover:w-full" />

                  <div className="mb-8 flex items-start justify-between">
                    <span className="font-mono text-xs text-copper-400">
                      0{index + 1}
                    </span>
                    <div className="flex h-9 w-9 items-center justify-center border border-copper-500/30 bg-copper-500/10 transition-all duration-300 group-hover:bg-copper-500/20">
                      <Icon className="h-4 w-4 text-copper-400" />
                    </div>
                  </div>

                  <h3 className="font-display text-2xl uppercase transition-colors duration-300 group-hover:text-copper-400">
                    {label}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-steel-400">{desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ── OPEN POSITIONS NOTICE ─────────────────────────────── */}
      <section className="bg-paper">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <FadeUp>
            <div className="relative overflow-hidden border border-steel-200 bg-white p-10 lg:p-14">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle, rgba(193,122,62,0.08) 0%, transparent 70%)",
                }}
              />
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-copper-600">
                KENZ / OPENINGS / NOW
              </p>
              <h2 className="mt-4 font-display text-3xl uppercase text-navy-950 sm:text-4xl">
                No Active Openings
              </h2>
              <p className="mt-5 max-w-xl leading-7 text-steel-700">
                We are not currently advertising specific openings, but we are
                always interested in hearing from capable professionals. If
                you believe you can contribute to our team, we encourage you to
                reach out.
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden text-white"
        style={{
          background:
            "linear-gradient(135deg, #0a1420 0%, #142b45 100%)",
        }}
      >
        <div className="engineering-grid-dark absolute inset-0 opacity-20" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[1fr_auto] lg:items-center lg:px-8">
          <FadeUp>
            <div>
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center border border-copper-500/30 bg-copper-500/10">
                <Users className="h-6 w-6 text-copper-400" />
              </div>
              <h2 className="font-display text-4xl uppercase sm:text-5xl">
                Interested in Joining the Team?
              </h2>
              <p className="mt-5 max-w-2xl leading-7 text-steel-400">
                Send your resume and relevant experience to our team. We review
                all applications carefully.
              </p>
            </div>
          </FadeUp>

          <FadeIn delay={0.2}>
            <Link
              href="mailto:sales@kenzengineering.com?subject=Career%20Application"
              className="group inline-flex items-center justify-center gap-3 border border-copper-500 bg-transparent px-8 py-4 text-xs font-bold uppercase tracking-[0.18em] text-copper-400 transition-all duration-300 hover:bg-copper-500 hover:text-white"
            >
              <Mail className="h-4 w-4" />
              Submit Your Resume
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}