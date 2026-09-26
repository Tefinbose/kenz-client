"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  CheckCircle2,
  Heart,
  Mail,
  Rocket,
  Shield,
  Sparkles,
  Star,
  TrendingUp,
  Users,
  Zap,
  Target,
  Layers,
  MapPin,
  Clock,
  ChevronDown,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MagneticButton,
  TiltCard,
  SpotlightCard,
  ShimmerText,
  RevealText,
  CountUp,
  GlitchText,
  FloatingParticles,
  ScrollProgressBar,
} from "@/components/ui/ReactBits";

/* ═══════════════════════════════════════════════ DATA ═══ */

const values = [
  {
    icon: Zap,
    tag: "Skill",
    label: "Technical Capability",
    desc: "Depth of skill across all steel detailing disciplines and BIM coordination workflows.",
    color: "from-yellow-500/15 to-yellow-500/5",
    border: "border-yellow-500/20",
    iconColor: "text-yellow-500",
    hoverBg: "group-hover:bg-yellow-500",
  },
  {
    icon: Shield,
    tag: "Standards",
    label: "Attention to Detail",
    desc: "Precision in every drawing, model, and deliverable — fabrication-ready accuracy.",
    color: "from-blue-500/15 to-blue-500/5",
    border: "border-blue-500/20",
    iconColor: "text-blue-400",
    hoverBg: "group-hover:bg-blue-500",
  },
  {
    icon: TrendingUp,
    tag: "Growth",
    label: "Continuous Improvement",
    desc: "Constantly evolving tools, methods, and processes to stay ahead of industry standards.",
    color: "from-emerald-500/15 to-emerald-500/5",
    border: "border-emerald-500/20",
    iconColor: "text-emerald-400",
    hoverBg: "group-hover:bg-emerald-500",
  },
  {
    icon: Heart,
    tag: "People",
    label: "Collaboration",
    desc: "Effective partnership with clients and teams throughout every stage of the project.",
    color: "from-rose-500/15 to-rose-500/5",
    border: "border-rose-500/20",
    iconColor: "text-rose-400",
    hoverBg: "group-hover:bg-rose-500",
  },
  {
    icon: Star,
    tag: "Quality",
    label: "Accuracy",
    desc: "Correct data, coordinates, and documentation — every time, without compromise.",
    color: "from-copper-500/15 to-copper-500/5",
    border: "border-copper-500/20",
    iconColor: "text-copper-400",
    hoverBg: "group-hover:bg-copper-500",
  },
  {
    icon: CheckCircle2,
    tag: "Delivery",
    label: "Consistent Quality",
    desc: "Dependable delivery of fabrication-ready documentation aligned with project needs.",
    color: "from-violet-500/15 to-violet-500/5",
    border: "border-violet-500/20",
    iconColor: "text-violet-400",
    hoverBg: "group-hover:bg-violet-500",
  },
];

const perks = [
  { icon: Target, label: "Technical Growth", desc: "Develop expertise across steel disciplines." },
  { icon: Layers, label: "BIM-First Workflow", desc: "Work with advanced 3D modeling tools." },
  { icon: Users, label: "Collaborative Team", desc: "Partner with experienced professionals." },
  { icon: Rocket, label: "Career Development", desc: "Grow your skills in a technical environment." },
];

const faqItems = [
  {
    q: "What disciplines do you hire for?",
    a: "We hire across structural steel detailing, BIM coordination, connection design, joist & deck detailing, estimation, and related technical disciplines.",
  },
  {
    q: "Do you accept remote candidates?",
    a: "Yes. We work with professionals across various locations and are open to discussing remote and hybrid arrangements based on the role.",
  },
  {
    q: "How should I apply?",
    a: "Send your resume and a brief note about your experience to sales@kenzengineering.com with the subject 'Career Application'. We review all submissions carefully.",
  },
];

/* ═══════════════════════════════════════════════ PAGE ═══ */

interface PublicCareer {
  _id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  benefits: string[];
  isActive: boolean;
}

export default function CareersPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [openings, setOpenings] = useState<PublicCareer[]>([]);
  const [loadingOpenings, setLoadingOpenings] = useState<boolean>(true);
  const [expandedRole, setExpandedRole] = useState<string | null>(null);

  useEffect(() => {
    async function loadCareers() {
      try {
        const res = await fetch("/api/public/careers");
        if (res.ok) {
          const data = await res.json();
          if (data.careers) {
            setOpenings(data.careers);
          }
        }
      } catch (err) {
        console.warn("Could not fetch careers from API:", err);
      } finally {
        setLoadingOpenings(false);
      }
    }
    loadCareers();
  }, []);

  return (
    <main className="min-h-screen bg-[#fafbfc] overflow-hidden">
      <ScrollProgressBar />

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-navy-950 text-white pt-40 pb-32 md:pb-44">
        {/* Blueprint grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        {/* Ambient glow */}
        <div className="pointer-events-none absolute -left-60 top-1/3 h-[600px] w-[600px] rounded-full bg-copper-500/10 blur-[160px]" />
        <div className="pointer-events-none absolute -right-40 bottom-0 h-[400px] w-[400px] rounded-full bg-copper-600/8 blur-[120px]" />

        <FloatingParticles count={20} />

        <div className="pointer-events-none absolute right-8 top-32 hidden font-mono text-[10px] tracking-[0.25em] text-white/20 lg:block">
          CAD // KENZ-HR • CAR-001
        </div>

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">

            {/* Left */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="mb-7 flex flex-wrap items-center gap-3">
                <div className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-copper-400 backdrop-blur-md">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-copper-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-copper-500" />
                  </span>
                  04 / Careers
                </div>
                <div className="inline-flex items-center gap-1.5 rounded-full border border-copper-500/30 bg-copper-500/10 px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-copper-300">
                  <Sparkles size={11} className="text-copper-400" />
                  We're Growing
                </div>
              </div>

              <h1 className="font-display text-5xl uppercase leading-[0.92] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
                <RevealText text="Build Your Career" className="block" />
                <span className="block mt-1">
                  <ShimmerText className="font-display text-5xl uppercase leading-[0.92] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
                    Around Excellence.
                  </ShimmerText>
                </span>
              </h1>

              <div className="mt-8 border-l-2 border-copper-500/60 pl-5">
                <p className="max-w-xl text-base leading-relaxed text-steel-400 md:text-lg">
                  Kenz Engineering values professionals who understand accuracy,
                  quality, technical capability, and the importance of collaboration
                  in steel detailing and engineering support.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-3 text-xs text-steel-300">
                {["Technical Roles", "BIM Expertise", "Remote Friendly"].map((c) => (
                  <div key={c} className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 backdrop-blur-sm">
                    <CheckCircle2 size={12} className="text-copper-400" />
                    <span>{c}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right — HR Cockpit */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="relative overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-br from-white/[0.08] via-white/[0.03] to-transparent p-7 shadow-[0_25px_60px_rgba(0,0,0,0.45)] backdrop-blur-xl md:p-8"
            >
              <div className="pointer-events-none absolute left-3 top-3 h-3 w-3 border-l-2 border-t-2 border-copper-400/50" />
              <div className="pointer-events-none absolute right-3 top-3 h-3 w-3 border-r-2 border-t-2 border-copper-400/50" />
              <div className="pointer-events-none absolute bottom-3 left-3 h-3 w-3 border-b-2 border-l-2 border-copper-400/50" />
              <div className="pointer-events-none absolute bottom-3 right-3 h-3 w-3 border-b-2 border-r-2 border-copper-400/50" />

              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-copper-400 animate-pulse" />
                  <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-copper-400">Talent Portal</span>
                </div>
                <span className="font-mono text-[10px] text-white/40">KENZ-HR // 2026</span>
              </div>

              <div className="mt-6 flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-copper-500/30 bg-copper-500/15 text-copper-400">
                  <BriefcaseBusiness size={22} className="animate-[pulse_3s_ease-in-out_infinite]" />
                </div>
                <div>
                  <p className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-copper-400">Current Status</p>
                  <h3 className="mt-1 text-xl font-bold tracking-tight text-white">Accepting Applications</h3>
                  <p className="mt-2 text-xs leading-relaxed text-steel-400">
                    We're always interested in capable professionals across steel detailing disciplines.
                  </p>
                </div>
              </div>

              <div className="mt-7 grid grid-cols-2 gap-2.5 rounded-2xl border border-white/10 bg-white/5 p-3 text-center">
                <div className="rounded-xl border border-white/5 bg-white/5 py-2.5">
                  <p className="font-display text-xl text-copper-300 sm:text-2xl">6+</p>
                  <p className="text-[9px] uppercase tracking-wider text-steel-400">Value Areas</p>
                </div>
                <div className="rounded-xl border border-white/5 bg-white/5 py-2.5">
                  <p className="font-display text-xl text-copper-300 sm:text-2xl">BIM</p>
                  <p className="text-[9px] uppercase tracking-wider text-steel-400">Workflow</p>
                </div>
                <div className="rounded-xl border border-white/5 bg-white/5 py-2.5">
                  <p className="font-display text-xl text-copper-300 sm:text-2xl">US</p>
                  <p className="text-[9px] uppercase tracking-wider text-steel-400">Market</p>
                </div>
                <div className="rounded-xl border border-white/5 bg-white/5 py-2.5">
                  <p className="font-display text-xl text-copper-300 sm:text-2xl">100%</p>
                  <p className="text-[9px] uppercase tracking-wider text-steel-400">Technical</p>
                </div>
              </div>

              <Link
                href="mailto:sales@kenzengineering.com?subject=Career%20Application"
                className="group mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-copper-600 to-copper-500 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-copper-500/20 transition-all hover:scale-[1.02]"
              >
                <Mail size={14} />
                Submit Your Resume
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-copper-500/60 to-transparent" />
      </section>

      {/* ── GROW WITH PURPOSE ─────────────────────────────────── */}
      <section className="relative py-28 overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(#0a1420 1px, transparent 1px), linear-gradient(90deg, #0a1420 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            {/* Left */}
            <motion.div
              initial={{ opacity: 0, x: -25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-copper-500/20 bg-copper-500/5 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.25em] text-copper-600">
                <TrendingUp size={12} />
                Career Growth
              </div>
              <h2 className="mt-6 font-display text-4xl uppercase leading-[0.95] text-navy-950 sm:text-5xl lg:text-6xl">
                Grow With
                <span className="block bg-gradient-to-r from-copper-600 to-copper-400 bg-clip-text text-transparent">
                  Technical Purpose
                </span>
              </h2>
              <div className="mt-8 h-px w-24 bg-gradient-to-r from-copper-500 to-transparent" />
              <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-steel-400">
                KENZ / TEAM / 001
              </p>
            </motion.div>

            {/* Right */}
            <motion.div
              initial={{ opacity: 0, x: 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <TiltCard maxTilt={5} className="relative overflow-hidden rounded-2xl border border-steel-200 bg-white p-8 shadow-[0_15px_50px_rgba(0,0,0,0.05)] lg:p-10">
                <div className="pointer-events-none absolute left-3 top-3 h-3 w-3 border-l-2 border-t-2 border-copper-500/30" />
                <div className="pointer-events-none absolute right-3 top-3 h-3 w-3 border-r-2 border-t-2 border-copper-500/30" />
                <div className="pointer-events-none absolute bottom-3 left-3 h-3 w-3 border-b-2 border-l-2 border-copper-500/30" />
                <div className="pointer-events-none absolute bottom-3 right-3 h-3 w-3 border-b-2 border-r-2 border-copper-500/30" />

                <div className="space-y-5 text-base leading-relaxed text-steel-700">
                  <p>
                    Our work is built around technical capability, attention to detail,
                    continuous improvement, and collaboration.
                  </p>
                  <p>
                    As Kenz Engineering grows, we are interested in professionals who
                    want to contribute to accurate, dependable engineering support and
                    develop their capabilities within a technical environment.
                  </p>
                  <p>
                    Specific openings and role requirements will be published here as
                    positions become available.
                  </p>
                </div>

                <div className="mt-8 h-px w-full bg-gradient-to-r from-copper-500/40 via-copper-500/20 to-transparent" />
                <div className="mt-4 flex items-center gap-2 text-[10px] text-steel-400">
                  <BriefcaseBusiness size={13} className="text-copper-500" />
                  <span className="font-mono uppercase tracking-wider">Technical Environment — Detail-Driven Culture</span>
                </div>
              </TiltCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── PERKS STRIP ───────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-navy-950 text-white py-20">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
        <div className="pointer-events-none absolute -left-40 top-0 h-[400px] w-[400px] rounded-full bg-copper-500/10 blur-[140px]" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-10 text-center font-mono text-[10px] uppercase tracking-[0.3em] text-copper-400"
          >
            KENZ / CULTURE / PILLARS
          </motion.p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {perks.map(({ icon: Icon, label, desc }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <SpotlightCard
                  glowColor="rgba(193,122,62,0.18)"
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 text-center transition-all duration-500 hover:border-copper-500/40 hover:shadow-[0_15px_40px_rgba(193,122,62,0.12)] backdrop-blur-sm"
                >
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl border border-copper-500/30 bg-copper-500/10 transition-all duration-300 group-hover:bg-copper-500">
                    <Icon size={20} className="text-copper-400 transition-colors group-hover:text-white" />
                  </div>
                  <h3 className="mt-4 font-display text-lg uppercase tracking-wide transition-colors group-hover:text-copper-300">
                    {label}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-steel-400">{desc}</p>
                  <div className="mt-4 h-px w-0 bg-gradient-to-r from-copper-500 to-copper-300 mx-auto transition-all duration-500 group-hover:w-full" />
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT WE VALUE ─────────────────────────────────────── */}
      <section className="relative py-28 overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(#0a1420 1px, transparent 1px), linear-gradient(90deg, #0a1420 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-copper-500/20 bg-copper-500/5 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.25em] text-copper-600">
              <Star size={12} />
              What We Value
            </div>
            <h2 className="mt-6 font-display text-4xl uppercase text-navy-950 sm:text-5xl lg:text-6xl">
              The Qualities{" "}
              <span className="bg-gradient-to-r from-copper-600 to-copper-400 bg-clip-text text-transparent">
                We Look For
              </span>
            </h2>
          </motion.div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {values.map(({ icon: Icon, tag, label, desc, color, border, iconColor, hoverBg }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <TiltCard maxTilt={8}>
                  <SpotlightCard
                    glowColor="rgba(193,122,62,0.10)"
                    className="group relative h-full overflow-hidden rounded-2xl border border-steel-200 bg-white p-7 transition-all duration-500 hover:-translate-y-1 hover:border-copper-500/30 hover:shadow-[0_20px_60px_rgba(193,122,62,0.1)]"
                  >
                    {/* Top accent */}
                    <div className="absolute top-0 left-0 h-0.5 w-0 bg-gradient-to-r from-copper-500 to-copper-400 transition-all duration-500 group-hover:w-full" />

                    <div className="flex items-start justify-between">
                      <span className={`inline-flex items-center rounded-full border ${border} bg-gradient-to-br ${color} px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider ${iconColor}`}>
                        {tag}
                      </span>
                      <div className={`flex h-10 w-10 items-center justify-center rounded-xl border ${border} bg-gradient-to-br ${color} transition-all duration-300 ${hoverBg} group-hover:border-transparent`}>
                        <Icon size={18} className={`${iconColor} transition-colors group-hover:text-white`} />
                      </div>
                    </div>

                    <h3 className="mt-6 font-display text-xl uppercase tracking-wide text-navy-950 transition-colors group-hover:text-copper-600">
                      <GlitchText>{label}</GlitchText>
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-steel-600">{desc}</p>
                  </SpotlightCard>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OPEN POSITIONS NOTICE + FAQ ───────────────────────── */}
      <section className="relative overflow-hidden bg-navy-950 text-white py-28">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
        <div className="pointer-events-none absolute -right-60 top-0 h-[500px] w-[500px] rounded-full bg-copper-600/10 blur-[160px]" />
        <FloatingParticles count={14} />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start">

            {/* Openings notice or live positions card */}
            <motion.div
              initial={{ opacity: 0, x: -25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {openings.length > 0 ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-copper-400 animate-pulse" />
                      <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-copper-400">
                        KENZ / LIVE OPENINGS ({openings.length})
                      </span>
                    </div>
                    <span className="font-mono text-[10px] text-steel-400">
                      Engineering Opportunities
                    </span>
                  </div>

                  <div className="space-y-4">
                    {openings.map((job) => {
                      const isExpanded = expandedRole === job._id;
                      return (
                        <TiltCard
                          key={job._id}
                          maxTilt={4}
                          className="relative overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-br from-white/[0.08] via-white/[0.03] to-transparent p-6 backdrop-blur-sm transition-all hover:border-copper-500/40"
                        >
                          <div className="pointer-events-none absolute left-3 top-3 h-2 w-2 border-l-2 border-t-2 border-copper-400/40" />
                          <div className="pointer-events-none absolute right-3 top-3 h-2 w-2 border-r-2 border-t-2 border-copper-400/40" />

                          <div className="flex flex-wrap items-center gap-2">
                            <span className="rounded-full border border-copper-500/40 bg-copper-500/15 px-2.5 py-0.5 font-mono text-[9px] font-semibold text-copper-300">
                              {job.department}
                            </span>
                            <span className="inline-flex items-center gap-1 font-mono text-[10px] text-steel-400">
                              <MapPin size={11} className="text-copper-400" />
                              {job.location}
                            </span>
                            <span className="inline-flex items-center gap-1 font-mono text-[10px] text-steel-400">
                              <Clock size={11} className="text-steel-500" />
                              {job.experience}
                            </span>
                          </div>

                          <h3 className="mt-3 font-display text-2xl uppercase tracking-tight text-white">
                            {job.title}
                          </h3>

                          <p className="mt-2 text-xs leading-relaxed text-steel-300">
                            {job.description}
                          </p>

                          {/* Collapsible Requirements & Responsibilities */}
                          {isExpanded && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="mt-4 border-t border-white/10 pt-4 space-y-3 text-xs"
                            >
                              {job.responsibilities?.length > 0 && (
                                <div>
                                  <div className="font-mono text-[10px] uppercase text-copper-400 font-semibold mb-1.5">
                                    Responsibilities:
                                  </div>
                                  <ul className="space-y-1 text-steel-400 pl-4 list-disc">
                                    {job.responsibilities.map((r, idx) => (
                                      <li key={idx}>{r}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}

                              {job.requirements?.length > 0 && (
                                <div>
                                  <div className="font-mono text-[10px] uppercase text-copper-400 font-semibold mb-1.5">
                                    Requirements:
                                  </div>
                                  <ul className="space-y-1 text-steel-400 pl-4 list-disc">
                                    {job.requirements.map((r, idx) => (
                                      <li key={idx}>{r}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </motion.div>
                          )}

                          <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
                            <button
                              onClick={() => setExpandedRole(isExpanded ? null : job._id)}
                              className="inline-flex items-center gap-1 text-[11px] font-mono text-steel-400 hover:text-copper-300"
                            >
                              <span>{isExpanded ? "Hide Details" : "View Details"}</span>
                              <ChevronDown
                                size={13}
                                className={`transition-transform ${isExpanded ? "rotate-180" : ""}`}
                              />
                            </button>

                            <MagneticButton>
                              <Link
                                href={`mailto:sales@kenzengineering.com?subject=Application%20for%20${encodeURIComponent(
                                  job.title
                                )}`}
                                className="group inline-flex items-center gap-2 rounded-xl border border-copper-500/40 bg-copper-500/10 px-4 py-2 text-[11px] font-bold uppercase tracking-wider text-copper-300 transition-all hover:border-copper-500 hover:bg-copper-500 hover:text-white"
                              >
                                <Mail size={13} />
                                <span>Apply Now</span>
                                <ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" />
                              </Link>
                            </MagneticButton>
                          </div>
                        </TiltCard>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <TiltCard maxTilt={6} className="relative overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-br from-white/[0.08] via-white/[0.03] to-transparent p-8 backdrop-blur-sm lg:p-10">
                  <div className="pointer-events-none absolute left-3 top-3 h-3 w-3 border-l-2 border-t-2 border-copper-400/50" />
                  <div className="pointer-events-none absolute right-3 top-3 h-3 w-3 border-r-2 border-t-2 border-copper-400/50" />
                  <div className="pointer-events-none absolute bottom-3 left-3 h-3 w-3 border-b-2 border-l-2 border-copper-400/50" />
                  <div className="pointer-events-none absolute bottom-3 right-3 h-3 w-3 border-b-2 border-r-2 border-copper-400/50" />

                  <div className="flex items-center gap-2 border-b border-white/10 pb-4">
                    <span className="h-2 w-2 rounded-full bg-copper-400 animate-pulse" />
                    <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-copper-400">
                      KENZ / OPENINGS / NOW
                    </span>
                  </div>

                  <div className="mt-7 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-copper-500/30 bg-copper-500/15">
                    <BriefcaseBusiness size={22} className="text-copper-400" />
                  </div>

                  <h3 className="mt-5 font-display text-3xl uppercase tracking-tight text-white">
                    <GlitchText>No Active Openings</GlitchText>
                  </h3>
                  <p className="mt-4 leading-relaxed text-steel-400">
                    We are not currently advertising specific openings, but we are always
                    interested in hearing from capable professionals. If you believe you
                    can contribute to our team, we encourage you to reach out.
                  </p>
                  <div className="mt-8 h-px w-full bg-gradient-to-r from-copper-500/40 to-transparent" />

                  <MagneticButton className="mt-6 inline-block">
                    <Link
                      href="mailto:sales@kenzengineering.com?subject=Career%20Application"
                      className="group inline-flex items-center gap-3 rounded-xl border border-copper-500/40 bg-copper-500/10 px-6 py-3 text-xs font-bold uppercase tracking-wider text-copper-300 transition-all hover:border-copper-500 hover:bg-copper-500 hover:text-white"
                    >
                      <Mail size={14} />
                      Submit Your Resume
                      <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </MagneticButton>
                </TiltCard>
              )}
            </motion.div>

            {/* FAQ Accordion */}
            <motion.div
              initial={{ opacity: 0, x: 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.25em] text-copper-400 backdrop-blur-md mb-8">
                <Sparkles size={12} />
                Common Questions
              </div>

              <div className="space-y-3">
                {faqItems.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm"
                  >
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="flex w-full items-center justify-between p-5 text-left transition-colors hover:bg-white/5"
                    >
                      <span className="text-sm font-semibold text-white">{item.q}</span>
                      <motion.span
                        animate={{ rotate: openFaq === i ? 45 : 0 }}
                        transition={{ duration: 0.25 }}
                        className="ml-4 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-copper-500/30 text-copper-400"
                      >
                        +
                      </motion.span>
                    </button>

                    <AnimatePresence initial={false}>
                      {openFaq === i && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        >
                          <div className="border-t border-white/10 px-5 pb-5 pt-4">
                            <p className="text-sm leading-relaxed text-steel-400">{item.a}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-28">
        <div className="absolute inset-0 bg-gradient-to-br from-copper-600 via-copper-500 to-copper-700" />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
        <FloatingParticles count={12} />
        <div className="pointer-events-none absolute -right-40 bottom-0 h-[400px] w-[400px] rounded-full bg-black/10 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-white/30 bg-white/15">
                <Users size={22} className="text-white" />
              </div>
              <h2 className="mt-6 font-display text-4xl uppercase text-white sm:text-5xl">
                Interested in Joining the Team?
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/70">
                Send your resume and relevant experience to our team. We review all applications carefully.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <MagneticButton>
                <Link
                  href="mailto:sales@kenzengineering.com?subject=Career%20Application"
                  className="group inline-flex items-center gap-3 rounded-xl bg-white px-8 py-4 text-xs font-bold uppercase tracking-[0.18em] text-copper-600 shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl"
                >
                  <Mail size={14} />
                  Submit Your Resume
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </Link>
              </MagneticButton>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}