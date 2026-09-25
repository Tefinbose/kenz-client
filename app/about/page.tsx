"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  Compass,
  Layers3,
  MessageSquare,
  Target,
} from "lucide-react";

/* ── Local animation primitives (replaces @/components/ui/Motion) ── */

const fadeUpVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const slideVariants = {
  left: { hidden: { opacity: 0, x: -40 }, visible: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: 40 }, visible: { opacity: 1, x: 0 } },
};

function FadeUp({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={fadeUpVariants}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function FadeIn({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={fadeInVariants}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

function SlideIn({
  children,
  from = "left",
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  from?: "left" | "right";
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={slideVariants[from]}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function StaggerContainer({
  children,
  className,
  staggerDelay = 0.08,
}: {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: staggerDelay },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

function StaggerItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 16 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

function LineExpand({
  className,
  delay = 0,
}: {
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ width: 0 }}
      whileInView={{ width: "100%" }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{ maxWidth: "100%" }}
    />
  );
}

/* ── Page data ── */

const commitments = [
  "Timely delivery",
  "Clear communication",
  "Advanced technology",
  "Continuous improvement",
  "Consistent quality",
  "Long-term client partnerships",
];

const capabilities = [
  "Structural steel detailing",
  "Miscellaneous steel",
  "Joist & deck detailing",
  "3D modeling",
  "Shop drawings",
  "Erection drawings",
  "BIM coordination",
  "Connection support",
  "Steel estimating",
];

const stats = [
  { value: "100%", label: "Accuracy focused" },
  { value: "6+", label: "Core services" },
  { value: "BIM", label: "Workflow ready" },
  { value: "US", label: "Market expertise" },
];

const approach = [
  {
    icon: Compass,
    title: "Built Around Precision",
    description:
      "Steel projects require coordination, accuracy, consistency, and an understanding of fabrication and erection requirements.",
  },
  {
    icon: Layers3,
    title: "Modern BIM Workflows",
    description:
      "Modern modeling and coordination workflows support clearer communication between design, detailing, fabrication, and erection.",
  },
  {
    icon: MessageSquare,
    title: "Dedicated Delivery",
    description:
      "We aim to operate as a dependable extension of our clients' project teams through communication, coordination, and consistent delivery.",
  },
];

export default function AboutPage() {
  return (
    <main className="bg-paper text-ink overflow-hidden">

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative bg-navy-950 text-white overflow-hidden">
        <div className="engineering-grid-dark kenz-grid-move absolute inset-0 opacity-30" />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-40 -top-40 h-[600px] w-[600px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(193,122,62,0.18) 0%, transparent 65%)",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-6 pb-28 pt-44 lg:px-8">
          <FadeIn delay={0.05}>
            <div className="mb-6 flex items-center gap-4">
              <LineExpand className="h-px w-12 bg-copper-500" delay={0.1} />
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-copper-400">
                01 / About Kenz Engineering
              </p>
            </div>
          </FadeIn>

          <FadeUp delay={0.15}>
            <h1 className="font-display text-5xl uppercase leading-[0.95] tracking-tight sm:text-6xl lg:text-8xl">
              Engineering Detail
              <br />
              That Moves Projects
              <br />
              <span className="text-copper-400">Forward.</span>
            </h1>
          </FadeUp>

          <FadeUp delay={0.3}>
            <p className="mt-8 max-w-2xl text-base leading-8 text-steel-400 sm:text-lg">
              Kenz Engineering LLC provides structural steel detailing and
              engineering support solutions focused on accuracy, coordination,
              practical delivery, and dependable project support.
            </p>
          </FadeUp>
        </div>

        <div className="absolute bottom-0 left-0 h-px w-full bg-copper-500/50" />
      </section>

      {/* ── STATS STRIP ──────────────────────────────────────── */}
      <section className="bg-navy-900 border-b border-white/5">
        <StaggerContainer
          className="mx-auto max-w-7xl px-6 py-10 grid grid-cols-2 gap-px md:grid-cols-4 lg:px-8"
          staggerDelay={0.08}
        >
          {stats.map((s) => (
            <StaggerItem key={s.label}>
              <div className="flex flex-col items-center gap-1 py-4 text-center">
                <span className="font-display text-4xl text-copper-400 lg:text-5xl">
                  {s.value}
                </span>
                <span className="text-xs font-medium uppercase tracking-[0.18em] text-steel-500">
                  {s.label}
                </span>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* ── WHO WE ARE ───────────────────────────────────────── */}
      <section className="border-b border-steel-200 bg-paper">
        <div className="mx-auto grid max-w-7xl gap-14 px-6 py-24 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <SlideIn from="left">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-copper-600">
                Who We Are
              </p>
              <h2 className="mt-5 font-display text-4xl uppercase leading-tight text-navy-950 sm:text-5xl">
                Detail-focused.
                <br />
                Project-minded.
              </h2>
              <LineExpand
                className="mt-8 h-px bg-copper-500"
                delay={0.1}
              />
            </div>
          </SlideIn>

          <SlideIn from="right" delay={0.1}>
            <div className="space-y-6 text-base leading-8 text-steel-700">
              <p>
                Kenz Engineering LLC is a structural steel detailing and
                engineering support company focused on accurate, practical, and
                dependable solutions for steel construction.
              </p>
              <p>
                Our work supports project teams through detailed 3D modeling,
                fabrication-ready drawings, BIM coordination, miscellaneous
                steel detailing, joist and deck detailing, connection support,
                and estimating assistance.
              </p>
              <p>
                The objective is straightforward: provide technical support
                that helps project teams move efficiently from design intent
                through fabrication and erection.
              </p>
            </div>
          </SlideIn>
        </div>
      </section>

      {/* ── CAPABILITIES ─────────────────────────────────────── */}
      <section className="bg-navy-900 text-white">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <FadeUp>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-copper-400">
                  Core Expertise
                </p>
                <h2 className="mt-4 font-display text-4xl uppercase sm:text-5xl">
                  Built Around
                  <br />
                  Technical Capability
                </h2>
              </div>
            </FadeUp>

            <FadeIn delay={0.2}>
              <span className="font-mono text-xs text-steel-500">
                KENZ / CAPABILITIES / 001
              </span>
            </FadeIn>
          </div>

          <StaggerContainer
            className="grid border-l border-t border-steel-700/50 sm:grid-cols-2 lg:grid-cols-3"
            staggerDelay={0.07}
          >
            {capabilities.map((item, index) => (
              <StaggerItem key={item}>
                <div className="group border-b border-r border-steel-700/50 p-7 transition-all duration-300 hover:bg-navy-800 hover:border-copper-500/30 cursor-default">
                  <div className="mb-10 flex items-center justify-between">
                    <span className="font-mono text-xs text-copper-400">
                      0{index + 1}
                    </span>
                    <ArrowRight className="h-4 w-4 text-steel-500 transition-all duration-300 group-hover:translate-x-1 group-hover:text-copper-400" />
                  </div>
                  <h3 className="font-display text-2xl uppercase tracking-wide transition-colors duration-300 group-hover:text-copper-400">
                    {item}
                  </h3>
                  <div className="mt-5 h-px w-0 bg-copper-500 transition-all duration-500 group-hover:w-full" />
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ── APPROACH ─────────────────────────────────────────── */}
      <section className="bg-paper">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <FadeUp>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-copper-600 mb-4">
              Our Approach
            </p>
            <h2 className="font-display text-4xl uppercase text-navy-950 sm:text-5xl mb-16">
              How We Work
            </h2>
          </FadeUp>

          <StaggerContainer className="grid gap-8 lg:grid-cols-3" staggerDelay={0.12}>
            {approach.map(({ icon: Icon, title, description }) => (
              <StaggerItem key={title}>
                <div className="group relative overflow-hidden border border-steel-200 bg-white p-8 transition-all duration-500 hover:-translate-y-1 hover:border-copper-500/40 hover:shadow-[0_20px_60px_rgba(193,122,62,0.1)]">
                  <div className="absolute top-0 left-0 h-0.5 w-0 bg-copper-500 transition-all duration-500 group-hover:w-full" />
                  <div className="mb-6 inline-flex h-12 w-12 items-center justify-center border border-copper-500/30 bg-copper-500/10 transition-all duration-300 group-hover:bg-copper-500/20">
                    <Icon className="h-6 w-6 text-copper-600" />
                  </div>
                  <h3 className="font-display text-2xl uppercase text-navy-950 transition-colors duration-300 group-hover:text-copper-600">
                    {title}
                  </h3>
                  <p className="mt-4 leading-7 text-steel-700">{description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ── VISION / MISSION ─────────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0a1420 50%, #142b45 100%)" }}
      >
        <div className="engineering-grid-dark absolute inset-0 opacity-20" />

        <div className="relative mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <FadeUp>
            <p className="mb-12 text-xs font-bold uppercase tracking-[0.25em] text-copper-400">
              Our Purpose
            </p>
          </FadeUp>

          <div className="grid gap-px md:grid-cols-2">
            <SlideIn from="left">
              <div className="relative overflow-hidden border border-white/10 bg-white/5 p-10 backdrop-blur-sm lg:p-14 h-full">
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(193,122,62,0.2) 0%, transparent 70%)",
                  }}
                />
                <Target className="h-8 w-8 text-copper-400" />
                <p className="mt-10 text-xs font-bold uppercase tracking-[0.25em] text-copper-400">
                  Our Vision
                </p>
                <h2 className="mt-4 font-display text-4xl uppercase leading-tight text-white">
                  A Globally Trusted Steel Detailing Partner
                </h2>
                <p className="mt-6 leading-8 text-steel-400">
                  To become a globally trusted steel detailing partner recognized
                  for precision, reliability, innovation, and excellence.
                </p>
              </div>
            </SlideIn>

            <SlideIn from="right" delay={0.1}>
              <div className="relative overflow-hidden border border-copper-500/30 bg-copper-500/10 p-10 backdrop-blur-sm lg:p-14 h-full">
                <Target className="h-8 w-8 text-copper-400" />
                <p className="mt-10 text-xs font-bold uppercase tracking-[0.25em] text-copper-400">
                  Our Mission
                </p>
                <h2 className="mt-4 font-display text-4xl uppercase leading-tight text-white">
                  Accurate. Practical. Dependable.
                </h2>
                <p className="mt-6 leading-8 text-steel-400">
                  To provide accurate, high-quality, cost-effective detailing and
                  engineering support that contributes to successful design,
                  fabrication, and erection.
                </p>
              </div>
            </SlideIn>
          </div>
        </div>
      </section>

      {/* ── COMMITMENTS ──────────────────────────────────────── */}
      <section className="bg-paper">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <FadeUp>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-copper-600">
              Our Commitments
            </p>
            <h2 className="mt-4 font-display text-4xl uppercase text-navy-950 sm:text-5xl">
              What You Can Count On
            </h2>
          </FadeUp>

          <StaggerContainer
            className="mt-12 grid gap-x-12 gap-y-4 md:grid-cols-2 lg:grid-cols-3"
            staggerDelay={0.07}
          >
            {commitments.map((item) => (
              <StaggerItem key={item}>
                <div className="group flex items-center gap-4 border-b border-steel-200 py-5 transition-colors duration-300 hover:border-copper-500/40">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center border border-copper-500/30 bg-copper-500/10 transition-all duration-300 group-hover:bg-copper-500 group-hover:border-copper-500">
                    <Check className="h-4 w-4 text-copper-600 transition-colors duration-300 group-hover:text-white" />
                  </div>
                  <span className="font-medium text-navy-950 transition-colors duration-300 group-hover:text-copper-600">
                    {item}
                  </span>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-copper-600 text-white">
        <div className="engineering-grid absolute inset-0 opacity-20" />
        <div className="relative mx-auto flex max-w-7xl flex-col justify-between gap-8 px-6 py-20 md:flex-row md:items-center lg:px-8">
          <FadeUp>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-white/70">
                Work With Us
              </p>
              <h2 className="mt-3 font-display text-4xl uppercase sm:text-5xl">
                Have a Project to Discuss?
              </h2>
            </div>
          </FadeUp>

          <FadeIn delay={0.2}>
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center gap-3 border border-white px-8 py-4 text-xs font-bold uppercase tracking-[0.18em] transition-all duration-300 hover:bg-white hover:text-copper-600"
            >
              Talk to Our Team
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}