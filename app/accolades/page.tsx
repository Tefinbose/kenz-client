"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Award,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  ArrowRight,
  Star,
  Layers,
  FileCheck,
  Building2,
  Users,
  Compass,
  Zap,
  TrendingUp,
  ChevronRight,
  Filter,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { initialAccoladesData, getAccoladesData } from "@/data/accoladesData";
import { AccoladesPageData, AccoladeItem } from "@/types/accolades";

export default function AccoladesPage() {
  const [data, setData] = useState<AccoladesPageData>(initialAccoladesData);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Dynamic backend data loader: fetches from API route when available
  useEffect(() => {
    let isMounted = true;
    async function loadAccolades() {
      try {
        setIsLoading(true);
        const res = await fetch("/api/accolades");
        if (res.ok) {
          const json = await res.json();
          if (json?.data && isMounted) {
            setData(json.data);
          }
        }
      } catch (err) {
        console.warn("Backend API not reachable, using local data store:", err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }
    loadAccolades();
    return () => {
      isMounted = false;
    };
  }, []);

  const categories = ["All", "Award", "Standard", "Milestone", "Certification"];

  const filteredRecognitions =
    selectedCategory === "All"
      ? data.recognitions
      : data.recognitions.filter((item) => item.category === selectedCategory);

  return (
    <main className="min-h-screen bg-[#fafbfc] overflow-hidden text-navy-950">
      {/* ── 1. HERO SECTION ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-navy-950 text-white pt-36 pb-28 md:pt-44 md:pb-36">
        {/* Dynamic Blueprint Background Grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
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
          <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            {/* Left Column: Monumental Headline & Core Message */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              {/* Dual Modern Badges */}
              <div className="mb-7 flex flex-wrap items-center gap-3">
                <div className="inline-flex items-center gap-2 rounded-md border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-copper-400 backdrop-blur-md">
                  <span>{data.hero.badge}</span>
                </div>

                <div className="inline-flex items-center gap-1.5 rounded-md border border-copper-500/30 bg-copper-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-copper-300">
                  <Award size={12} className="text-copper-400" />
                  <span>Credibility & Trust</span>
                </div>
              </div>

              {/* Monumental Headline */}
              <h1 className="font-display text-5xl uppercase leading-[0.92] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
                {data.hero.headlinePart1}
                <span className="block bg-gradient-to-r from-copper-400 via-copper-300 to-copper-500 bg-clip-text text-transparent drop-shadow-sm">
                  {data.hero.headlineGradient}
                </span>
              </h1>

              {/* Exact User Requested Lead Statement */}
              <div className="mt-8 border-l-2 border-copper-500/60 pl-5">
                <p className="max-w-xl text-base leading-relaxed text-steel-300 md:text-lg">
                  {data.hero.leadStatement}
                </p>
                <p className="mt-2 text-xs font-semibold text-copper-400 uppercase tracking-wider">
                  AISC & NISD Verified Detailing Standards
                </p>
              </div>

              {/* Quick Spec Chips */}
              <div className="mt-8 flex flex-wrap items-center gap-3 text-xs text-steel-300">
                <div className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 backdrop-blur-sm">
                  <ShieldCheck size={13} className="text-copper-400" />
                  <span>AISC 303 & 360 Standards</span>
                </div>
                <div className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 backdrop-blur-sm">
                  <CheckCircle2 size={13} className="text-copper-400" />
                  <span>LOD 350–400 BIM Precision</span>
                </div>
                <div className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 backdrop-blur-sm">
                  <Star size={13} className="text-copper-400" />
                  <span>North American Track Record</span>
                </div>
              </div>
            </motion.div>

            {/* Right Side: High-Tech Operations Cockpit Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="relative overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-br from-white/[0.08] via-white/[0.03] to-transparent p-7 shadow-[0_25px_60px_rgba(0,0,0,0.45)] backdrop-blur-xl md:p-8"
            >
              {/* Corner Accents */}
              <div className="pointer-events-none absolute left-3 top-3 h-3 w-3 border-l-2 border-t-2 border-copper-400/50" />
              <div className="pointer-events-none absolute right-3 top-3 h-3 w-3 border-r-2 border-t-2 border-copper-400/50" />
              <div className="pointer-events-none absolute bottom-3 left-3 h-3 w-3 border-b-2 border-l-2 border-copper-400/50" />
              <div className="pointer-events-none absolute bottom-3 right-3 h-3 w-3 border-b-2 border-r-2 border-copper-400/50" />

              {/* Core Badge Block */}
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-copper-500/30 bg-copper-500/15 text-copper-400 shadow-inner">
                  <Award size={26} className="animate-[pulse_3s_ease-in-out_infinite]" />
                </div>
                <div>
                  <p className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-copper-400">
                    Quality Benchmark
                  </p>
                  <h3 className="mt-1 text-xl font-bold tracking-tight text-white">
                    Recognized Detailing Rigor
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-steel-400">
                    Precision Tekla modeling, fabrication-ready erection plans, and connection
                    engineering trusted by fabricators across the United States.
                  </p>
                </div>
              </div>

              {/* 3 Telemetry Metrics */}
              <div className="mt-7 grid grid-cols-3 gap-2.5 rounded-2xl border border-white/10 bg-white/5 p-3 text-center">
                <div className="rounded-xl border border-white/5 bg-white/5 py-2.5">
                  <p className="font-display text-xl text-copper-300 sm:text-2xl">50k+</p>
                  <p className="text-[9px] uppercase tracking-wider text-steel-400">Tons Modeled</p>
                </div>
                <div className="rounded-xl border border-white/5 bg-white/5 py-2.5">
                  <p className="font-display text-xl text-copper-300 sm:text-2xl">99.4%</p>
                  <p className="text-[9px] uppercase tracking-wider text-steel-400">1st Pass Approval</p>
                </div>
                <div className="rounded-xl border border-white/5 bg-white/5 py-2.5">
                  <p className="font-display text-xl text-copper-300 sm:text-2xl">&lt; 24h</p>
                  <p className="text-[9px] uppercase tracking-wider text-steel-400">RFI Support</p>
                </div>
              </div>

              {/* Quick Jump Action */}
              <a
                href="#recognition-section"
                className="group mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-copper-600 to-copper-500 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-copper-500/20 transition-all hover:scale-[1.02] hover:shadow-copper-500/30"
              >
                <span>Explore Recognitions & Achievements</span>
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </a>
            </motion.div>
          </div>
        </div>

        {/* Bottom Accent Gradient Beam */}
        <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-copper-500/60 to-transparent" />
      </section>

      {/* ── 2. METRICS STRIP ────────────────────────────────────────────── */}
      <section className="relative z-20 -mt-10 px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {data.metrics.map((metric, i) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative overflow-hidden rounded-2xl border border-steel-200/90 bg-white p-6 shadow-lg shadow-steel-200/40 transition-all hover:-translate-y-1 hover:border-copper-300 hover:shadow-xl"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-copper-600">
                    {metric.badge}
                  </span>
                  <span className="h-1.5 w-1.5 rounded-full bg-copper-500" />
                </div>
                <p className="mt-3 font-display text-3xl font-bold tracking-tight text-navy-950 sm:text-4xl">
                  {metric.value}
                </p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-steel-700">
                  {metric.label}
                </p>
                <p className="mt-2 text-xs leading-relaxed text-steel-500">
                  {metric.subtext}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. RECOGNITION & ACHIEVEMENT SECTION ───────────────────────── */}
      <section id="recognition-section" className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Section Header */}
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-md border border-copper-200 bg-copper-50 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-copper-700">
                <Award size={14} />
                <span>Recognition & Achievement</span>
              </div>
              <h2 className="mt-4 font-display text-4xl uppercase leading-[0.95] text-navy-950 sm:text-5xl md:text-6xl">
                Industry Standards &
                <span className="block bg-gradient-to-r from-copper-600 to-copper-500 bg-clip-text text-transparent">
                  Detailing Milestones
                </span>
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-steel-600 sm:text-base">
                Our portfolio of professional recognitions demonstrates our dedication to
                flawless connection engineering, BIM model coordination, and customer-first execution.
              </p>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-xl px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all ${
                    selectedCategory === cat
                      ? "bg-navy-950 text-white shadow-md shadow-navy-950/20"
                      : "border border-steel-200 bg-white text-steel-600 hover:border-copper-300 hover:text-navy-950"
                  }`}
                >
                  {cat === "All" ? "All Recognitions" : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Cards Grid */}
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filteredRecognitions.map((item, index) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className={`group relative flex flex-col justify-between rounded-3xl border bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl ${
                    item.featured
                      ? "border-copper-300/80 shadow-copper-500/5 ring-1 ring-copper-500/20"
                      : "border-steel-200/90 shadow-steel-200/20 hover:border-copper-300"
                  }`}
                >
                  <div>
                    {/* Header Row */}
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-copper-600">
                        {item.year}
                      </span>
                      <span className="rounded-full border border-steel-200 bg-steel-50 px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-steel-600">
                        {item.badge}
                      </span>
                    </div>

                    <h3 className="mt-4 font-display text-xl font-bold uppercase tracking-tight text-navy-950 transition-colors group-hover:text-copper-600">
                      {item.title}
                    </h3>

                    <p className="mt-1 text-xs font-semibold text-steel-500">
                      {item.organization}
                    </p>

                    <p className="mt-3 text-xs leading-relaxed text-steel-600">
                      {item.summary}
                    </p>

                    {/* Bullet Points */}
                    <ul className="mt-5 space-y-2 border-t border-steel-100 pt-4 text-xs text-steel-600">
                      {item.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 size={13} className="mt-0.5 shrink-0 text-copper-600" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Bottom Metrics Bar */}
                  {item.metrics && item.metrics.length > 0 && (
                    <div className="mt-6 grid grid-cols-2 gap-2 border-t border-steel-100 pt-4">
                      {item.metrics.map((m, mIdx) => (
                        <div key={mIdx} className="rounded-xl bg-steel-50/70 p-2 text-center">
                          <p className="font-display text-sm font-bold text-navy-950">
                            {m.val}
                          </p>
                          <p className="text-[9px] uppercase tracking-wider text-steel-500">
                            {m.label}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ── 4. EXTENSION OF TEAM PHILOSOPHY (CORE PROMPT REQ) ─────────── */}
      <section className="relative overflow-hidden bg-navy-950 py-24 text-white md:py-32">
        {/* Decorative Grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
        <div className="pointer-events-none absolute -left-40 top-1/3 h-96 w-96 rounded-full bg-copper-500/10 blur-[130px]" />
        <div className="pointer-events-none absolute -right-40 bottom-1/3 h-96 w-96 rounded-full bg-copper-600/10 blur-[130px]" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          {/* Main Statement Box */}
          <div className="mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-copper-400/30 bg-copper-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-copper-300 backdrop-blur-md">
              <Compass size={14} className="text-copper-400" />
              <span>{data.philosophy.sectionTag}</span>
            </div>

            <h2 className="mt-6 font-display text-4xl uppercase leading-[0.95] tracking-tight sm:text-5xl md:text-6xl">
              {data.philosophy.heading}
              <span className="block bg-gradient-to-r from-copper-400 via-copper-300 to-copper-500 bg-clip-text text-transparent">
                {data.philosophy.subheading}
              </span>
            </h2>

            {/* Exact User Prompt Statement */}
            <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl md:p-10">
              <p className="text-lg font-medium leading-relaxed text-steel-200 sm:text-xl md:text-2xl">
                &ldquo;{data.philosophy.statement}&rdquo;
              </p>
            </div>
          </div>

          {/* 4 Pillars Grid */}
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {data.philosophy.pillars.map((pillar, pIdx) => (
              <motion.div
                key={pillar.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: pIdx * 0.1 }}
                className="group relative flex flex-col justify-between rounded-3xl border border-white/10 bg-white/[0.04] p-7 transition-all duration-300 hover:border-copper-500/50 hover:bg-white/[0.08]"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-copper-500/20 font-mono text-xs font-bold text-copper-400">
                      {pillar.number}
                    </span>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-steel-400">
                      Pillar
                    </span>
                  </div>

                  <h3 className="mt-5 font-display text-xl font-bold uppercase tracking-tight text-white group-hover:text-copper-300 transition-colors">
                    {pillar.title}
                  </h3>

                  <p className="mt-1 text-xs font-semibold text-copper-400">
                    {pillar.subtitle}
                  </p>

                  <p className="mt-3 text-xs leading-relaxed text-steel-400">
                    {pillar.description}
                  </p>
                </div>

                <ul className="mt-6 space-y-2 border-t border-white/10 pt-4 text-xs text-steel-300">
                  {pillar.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2">
                      <ChevronRight size={13} className="mt-0.5 shrink-0 text-copper-400" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. PROFESSIONAL CERTIFICATIONS & CODE CONFORMANCE ────────── */}
      <section className="py-24 md:py-32 bg-steel-50/50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full border border-steel-200 bg-white px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-steel-700 shadow-sm">
              <FileCheck size={14} className="text-copper-600" />
              <span>Codes & Compliance</span>
            </div>
            <h2 className="mt-4 font-display text-4xl uppercase leading-[0.95] text-navy-950 sm:text-5xl">
              Professional Engineering
              <span className="block bg-gradient-to-r from-copper-600 to-copper-500 bg-clip-text text-transparent">
                Certifications & Specifications
              </span>
            </h2>
            <p className="mt-3 text-sm text-steel-600">
              Rigorous compliance standards embedded into all models, shop drawings, and submittals.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {data.certifications.map((cert) => (
              <div
                key={cert.id}
                className="flex flex-col justify-between rounded-3xl border border-steel-200/90 bg-white p-7 shadow-sm transition-all hover:border-copper-300 hover:shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-copper-600">
                      {cert.badge}
                    </span>
                    <span className="rounded-md bg-steel-100 px-2 py-0.5 font-mono text-[10px] text-steel-700">
                      {cert.code}
                    </span>
                  </div>

                  <h3 className="mt-4 font-display text-lg font-bold text-navy-950 leading-snug">
                    {cert.title}
                  </h3>

                  <p className="mt-1 text-xs text-steel-500">
                    Issuer: {cert.issuer}
                  </p>

                  <p className="mt-3 text-xs leading-relaxed text-steel-600">
                    {cert.description}
                  </p>
                </div>

                <div className="mt-6 flex flex-wrap gap-1.5 border-t border-steel-100 pt-4">
                  {cert.standards.map((std, sIdx) => (
                    <span
                      key={sIdx}
                      className="rounded-lg border border-steel-200 bg-steel-50/70 px-2 py-0.5 text-[10px] font-medium text-steel-700"
                    >
                      {std}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. CLIENT RECOGNITION & ENDORSEMENTS ──────────────────────── */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-copper-200 bg-copper-50 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-copper-700">
                <Users size={14} />
                <span>Client Trust & Relationships</span>
              </div>
              <h2 className="mt-4 font-display text-4xl uppercase leading-[0.95] text-navy-950 sm:text-5xl">
                What North American
                <span className="block bg-gradient-to-r from-copper-600 to-copper-500 bg-clip-text text-transparent">
                  Fabricators Say
                </span>
              </h2>
            </div>
            <p className="max-w-md text-xs sm:text-sm text-steel-600 leading-relaxed">
              Credibility is validated in the fabrication shop and on the jobsite.
              Hear from the structural engineers and steel fabricators who count on our team.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {data.endorsements.map((item) => (
              <div
                key={item.id}
                className="relative flex flex-col justify-between rounded-3xl border border-steel-200/90 bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:border-copper-300 hover:shadow-lg"
              >
                <div>
                  {/* Star Rating */}
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} size={15} fill="currentColor" />
                    ))}
                  </div>

                  <p className="mt-5 text-sm leading-relaxed text-steel-700 italic">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                </div>

                <div className="mt-8 border-t border-steel-100 pt-5">
                  <p className="font-display text-base font-bold text-navy-950">
                    {item.clientName}
                  </p>
                  <p className="text-xs font-semibold text-copper-600">
                    {item.role}
                  </p>
                  <div className="mt-1 flex items-center justify-between text-xs text-steel-500">
                    <span>{item.company}</span>
                    <span>{item.location}</span>
                  </div>
                  <div className="mt-2 inline-flex items-center gap-1 rounded-md bg-steel-100/70 px-2 py-0.5 text-[10px] text-steel-600">
                    <Building2 size={11} />
                    <span>{item.projectType}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. CINEMATIC BILLBOARD CTA (USER REQUEST) ──────────────────── */}
      <section className="relative overflow-hidden bg-navy-950 px-6 py-20 text-white md:py-28">
        {/* Subtle grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-br from-copper-600 via-copper-500 to-[#8c4614] p-8 shadow-2xl md:p-14 lg:p-20">
            {/* Corner CAD Marks */}
            <div className="pointer-events-none absolute top-4 left-4 h-4 w-4 border-t-2 border-l-2 border-white/40" />
            <div className="pointer-events-none absolute top-4 right-4 h-4 w-4 border-t-2 border-r-2 border-white/40" />
            <div className="pointer-events-none absolute bottom-4 left-4 h-4 w-4 border-b-2 border-l-2 border-white/40" />
            <div className="pointer-events-none absolute bottom-4 right-4 h-4 w-4 border-b-2 border-r-2 border-white/40" />

            <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <span className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-white/80">
                  {data.cta.badge}
                </span>
                <h2 className="mt-3 font-display text-4xl uppercase leading-[0.95] text-white sm:text-5xl md:text-6xl">
                  {data.cta.heading}
                  <span className="block text-navy-950">
                    {data.cta.subheading}
                  </span>
                </h2>
                <p className="mt-5 text-sm leading-relaxed text-white/90 sm:text-base">
                  {data.cta.description}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4 shrink-0">
                <Link
                  href={data.cta.primaryActionHref}
                  className="group inline-flex items-center gap-3 rounded-xl bg-navy-950 px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] text-white shadow-xl transition-all duration-300 hover:bg-white hover:text-navy-950 hover:scale-105"
                >
                  <span>{data.cta.primaryActionLabel}</span>
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>

                <Link
                  href={data.cta.secondaryActionHref}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 py-4 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-sm transition-all hover:bg-white/20"
                >
                  <span>{data.cta.secondaryActionLabel}</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
