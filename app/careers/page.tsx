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
  ScrollProgressBar,
} from "@/components/ui/ReactBits";

/* ═══════════════════════════════════════════════ DATA ═══ */

const floatTags = [
  { label: "Skill", pos: "left-4 top-[14%]" },
  { label: "Standards", pos: "right-4 top-[26%]" },
  { label: "Growth", pos: "left-4 bottom-[30%]" },
  { label: "Collaboration", pos: "right-4 bottom-[22%]" },
];

const values = [
  { icon: Zap, tag: "Skill", label: "Technical Capability", desc: "Depth of skill across all steel detailing disciplines and BIM coordination workflows." },
  { icon: Shield, tag: "Standards", label: "Attention to Detail", desc: "Precision in every drawing, model, and deliverable — fabrication-ready accuracy." },
  { icon: TrendingUp, tag: "Growth", label: "Continuous Improvement", desc: "Constantly evolving tools, methods, and processes to stay ahead of industry standards." },
  { icon: Heart, tag: "People", label: "Collaboration", desc: "Effective partnership with clients and teams throughout every stage of the project." },
  { icon: Star, tag: "Quality", label: "Accuracy", desc: "Correct data, coordinates, and documentation — every time, without compromise." },
  { icon: CheckCircle2, tag: "Delivery", label: "Consistent Quality", desc: "Dependable delivery of fabrication-ready documentation aligned with project needs." },
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

const MAIL = "mailto:sales@kenzengineering.com?subject=Career%20Application";

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

/* ═══════════════════════════════════════════════ PAGE ═══ */

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
          if (data.careers) setOpenings(data.careers);
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
    <main className="min-h-screen overflow-hidden bg-[#F5F3EE]">
      <ScrollProgressBar />

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#0A1420] pb-24 pt-36 text-white md:pb-32 md:pt-44">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
            backgroundSize: "56px 56px",
            maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
            WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
          }}
        />
        <div className="pointer-events-none absolute -left-60 top-1/3 h-[600px] w-[600px] rounded-full bg-[#C17A3E]/15 blur-[160px]" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            {/* Left */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/80 backdrop-blur">
                
                Careers · We&apos;re Growing
              </div>

              <h1 className="font-display text-5xl uppercase leading-[0.9] tracking-tight sm:text-6xl md:text-7xl">
                <RevealText text="Build Your Career" className="block" />
                <span className="mt-1 block">
                  <ShimmerText className="font-display text-5xl uppercase leading-[0.9] tracking-tight sm:text-6xl md:text-7xl">
                    Around Excellence.
                  </ShimmerText>
                </span>
              </h1>

              <p className="mt-8 max-w-xl border-l-2 border-[#C17A3E] pl-5 text-base leading-relaxed text-white/65 md:text-lg">
                Kenz Engineering values professionals who understand accuracy,
                quality, technical capability, and the importance of
                collaboration in steel detailing and engineering support.
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-4">
                <MagneticButton>
                  <Link
                    href={MAIL}
                    className="group inline-flex items-center gap-3 rounded-full bg-white py-2 pl-7 pr-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#0A1420] transition-all duration-300 hover:bg-[#C17A3E] hover:text-white"
                  >
                    <span>Submit Your Resume</span>
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#0A1420] text-white transition-transform duration-300 group-hover:rotate-45">
                      <ArrowUpRight size={20} />
                    </span>
                  </Link>
                </MagneticButton>
              </div>

              <div className="mt-10 flex flex-wrap gap-2.5 text-xs text-white/70">
                {["Technical Roles", "BIM Expertise", "Remote Friendly"].map((c) => (
                  <div key={c} className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 backdrop-blur-sm">
                    <CheckCircle2 size={12} className="text-[#C17A3E]" />
                    {c}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right — Professional Engineering Team & Career Feature */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="group relative h-[440px] overflow-hidden rounded-[2.5rem] border border-white/15 bg-[#0A1420] shadow-[0_30px_90px_rgba(0,0,0,0.6)] md:h-[560px]"
            >
              {/* Corner Engineering Framing Accents */}
              <div className="pointer-events-none absolute left-4 top-4 z-20 h-4 w-4 border-l-2 border-t-2 border-[#C17A3E]" />
              <div className="pointer-events-none absolute right-4 top-4 z-20 h-4 w-4 border-r-2 border-t-2 border-[#C17A3E]" />
              <div className="pointer-events-none absolute bottom-4 left-4 z-20 h-4 w-4 border-b-2 border-l-2 border-[#C17A3E]" />
              <div className="pointer-events-none absolute bottom-4 right-4 z-20 h-4 w-4 border-b-2 border-r-2 border-[#C17A3E]" />

              {/* High-Quality Authentic Structural Engineering Team Image */}
              <img
                src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1600&q=85"
                alt="Kenz Engineering structural steel detailing and engineering team"
                className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                loading="eager"
              />

              {/* Cinematic Vignette & Lighting Gradients */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0A1420] via-[#0A1420]/30 to-transparent" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#0A1420]/50 to-transparent" />

              {/* Floating Culture & Capability Badges */}
              {floatTags.map((t, i) => (
                <motion.div
                  key={t.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + i * 0.12 }}
                  className={`pointer-events-none absolute z-10 flex items-center gap-2 rounded-full border border-white/20 bg-[#0A1420]/80 px-3.5 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-white shadow-xl backdrop-blur-md ${t.pos}`}
                >
                  {t.label}
                </motion.div>
              ))}

              {/* Bottom Caption Bar */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-[#0A1420] via-[#0A1420]/90 to-transparent px-7 pb-6 pt-20">
                <div className="flex items-center gap-2">
                  <p className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-[#C17A3E]">
                    KENZ ENGINEERING / CAREER DESK
                  </p>
                </div>
                <p className="mt-1 font-display text-xl uppercase font-bold text-white tracking-tight">
                  Where Precision Meets Career Growth
                </p>
                <p className="mt-1 text-xs text-white/70 max-w-sm line-clamp-1">
                  Structural steel detailers, Tekla modelers, and connection engineers.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── GROW WITH PURPOSE ─────────────────────────────────── */}
      <section className="relative overflow-hidden py-28">
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <motion.div
              initial={{ opacity: 0, x: -25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-[#C17A3E]/25 bg-[#C17A3E1A] px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em] text-[#A5622B]">
                <TrendingUp size={12} />
                Career Growth
              </div>
              <h2 className="mt-6 font-display text-5xl uppercase leading-[0.92] text-[#0A1420] sm:text-6xl lg:text-7xl">
                Grow With
                <span className="block bg-gradient-to-r from-[#C17A3E] to-[#E0A263] bg-clip-text text-transparent">
                  Technical Purpose
                </span>
              </h2>
              <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-[#0A1420]/40">
                KENZ / TEAM / 001
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <TiltCard
                maxTilt={4}
                className="relative overflow-hidden rounded-[2rem] border border-[#0A1420]/10 bg-white p-8 shadow-[0_25px_60px_-30px_rgba(10,20,32,0.35)] lg:p-10"
              >
                <div className="absolute left-0 top-0 h-full w-1.5 bg-gradient-to-b from-[#C17A3E] to-[#E0A263]" />
                <div className="space-y-5 pl-3 text-base leading-relaxed text-[#0A1420]/75">
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
                    Specific openings and role requirements will be published
                    here as positions become available.
                  </p>
                </div>
                <div className="mt-8 flex items-center gap-2 pl-3 font-mono text-[10px] uppercase tracking-wider text-[#0A1420]/45">
                  <BriefcaseBusiness size={13} className="text-[#C17A3E]" />
                  Technical Environment — Detail-Driven Culture
                </div>
              </TiltCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── PERKS ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#0A1420] py-24 text-white">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
            backgroundSize: "56px 56px",
          }}
        />
        <div className="pointer-events-none absolute -left-40 top-0 h-[400px] w-[400px] rounded-full bg-[#C17A3E]/15 blur-[140px]" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <p className="mb-12 text-center font-mono text-[10px] uppercase tracking-[0.3em] text-[#C17A3E]">
            KENZ / CULTURE / PILLARS
          </p>
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
                  glowColor="rgba(193,122,62,0.20)"
                  className="group relative h-full overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur-sm transition-colors duration-500 hover:border-[#C17A3E]/50"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#C17A3E1A] text-[#C17A3E] transition-all duration-300 group-hover:rotate-6 group-hover:bg-[#C17A3E] group-hover:text-white">
                    <Icon size={20} />
                  </div>
                  <h3 className="mt-6 font-display text-xl uppercase tracking-wide">{label}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">{desc}</p>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT WE VALUE ─────────────────────────────────────── */}
      <section className="relative overflow-hidden py-28">
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-[#C17A3E]/25 bg-[#C17A3E1A] px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em] text-[#A5622B]">
              <Star size={12} />
              What We Value
            </div>
            <h2 className="mt-6 font-display text-5xl uppercase text-[#0A1420] sm:text-6xl">
              The Qualities{" "}
              <span className="bg-gradient-to-r from-[#C17A3E] to-[#E0A263] bg-clip-text text-transparent">
                We Look For
              </span>
            </h2>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {values.map(({ icon: Icon, tag, label, desc }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <SpotlightCard
                  glowColor="rgba(193,122,62,0.12)"
                  className="group relative h-full overflow-hidden rounded-3xl border border-[#0A1420]/10 bg-white p-7 transition-all duration-500 hover:-translate-y-1 hover:border-[#C17A3E]/40 hover:shadow-[0_25px_60px_-25px_rgba(193,122,62,0.4)]"
                >
                  <div className="absolute left-0 top-0 h-0.5 w-0 bg-gradient-to-r from-[#C17A3E] to-[#E0A263] transition-all duration-500 group-hover:w-full" />
                  <div className="flex items-start justify-between">
                    <span className="rounded-full border border-[#C17A3E]/25 bg-[#C17A3E1A] px-2.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-[#A5622B]">
                      {tag}
                    </span>
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#C17A3E1A] text-[#C17A3E] transition-colors duration-300 group-hover:bg-[#C17A3E] group-hover:text-white">
                      <Icon size={19} />
                    </div>
                  </div>
                  <h3 className="mt-8 font-display text-2xl uppercase tracking-wide text-[#0A1420]">
                    {label}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#0A1420]/65">{desc}</p>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OPENINGS + FAQ ────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#0A1420] py-28 text-white">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
            backgroundSize: "56px 56px",
          }}
        />
        <div className="pointer-events-none absolute -right-60 top-0 h-[500px] w-[500px] rounded-full bg-[#C17A3E]/15 blur-[160px]" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
            {/* Openings */}
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
                      <span className="text-xs font-semibold uppercase tracking-wider text-[#C17A3E]">
                        Current Openings ({openings.length})
                      </span>
                    </div>
                    <span className="text-xs text-white/50">Engineering Opportunities</span>
                  </div>

                  <div className="space-y-4">
                    {openings.map((job) => {
                      const isExpanded = expandedRole === job._id;
                      return (
                        <TiltCard
                          key={job._id}
                          maxTilt={3}
                          className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur-sm transition-all hover:border-[#C17A3E]/50"
                        >
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="rounded-full border border-[#C17A3E]/40 bg-[#C17A3E1A] px-2.5 py-0.5 font-mono text-[9px] font-semibold text-[#E0A263]">
                              {job.department}
                            </span>
                            <span className="inline-flex items-center gap-1 font-mono text-[10px] text-white/50">
                              <MapPin size={11} className="text-[#C17A3E]" />
                              {job.location}
                            </span>
                            <span className="inline-flex items-center gap-1 font-mono text-[10px] text-white/50">
                              <Clock size={11} />
                              {job.experience}
                            </span>
                          </div>

                          <h3 className="mt-3 font-display text-2xl uppercase tracking-tight text-white">
                            {job.title}
                          </h3>
                          <p className="mt-2 text-xs leading-relaxed text-white/60">{job.description}</p>

                          <AnimatePresence initial={false}>
                            {isExpanded && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mt-4 space-y-3 overflow-hidden border-t border-white/10 pt-4 text-xs"
                              >
                                {job.responsibilities?.length > 0 && (
                                  <div>
                                    <div className="mb-1.5 font-mono text-[10px] font-semibold uppercase text-[#C17A3E]">
                                      Responsibilities:
                                    </div>
                                    <ul className="list-disc space-y-1 pl-4 text-white/60">
                                      {job.responsibilities.map((r, idx) => (
                                        <li key={idx}>{r}</li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                                {job.requirements?.length > 0 && (
                                  <div>
                                    <div className="mb-1.5 font-mono text-[10px] font-semibold uppercase text-[#C17A3E]">
                                      Requirements:
                                    </div>
                                    <ul className="list-disc space-y-1 pl-4 text-white/60">
                                      {job.requirements.map((r, idx) => (
                                        <li key={idx}>{r}</li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                              </motion.div>
                            )}
                          </AnimatePresence>

                          <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
                            <button
                              onClick={() => setExpandedRole(isExpanded ? null : job._id)}
                              className="inline-flex items-center gap-1 font-mono text-[11px] text-white/50 hover:text-[#E0A263]"
                            >
                              <span>{isExpanded ? "Hide Details" : "View Details"}</span>
                              <ChevronDown
                                size={13}
                                className={`transition-transform ${isExpanded ? "rotate-180" : ""}`}
                              />
                            </button>

                            <MagneticButton>
                              <Link
                                href={`mailto:sales@kenzengineering.com?subject=Application%20for%20${encodeURIComponent(job.title)}`}
                                className="group inline-flex items-center gap-2 rounded-full bg-[#C17A3E] px-5 py-2.5 text-[11px] font-bold uppercase tracking-wider text-white transition-all hover:bg-white hover:text-[#0A1420]"
                              >
                                <Mail size={13} />
                                Apply Now
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
                <TiltCard
                  maxTilt={4}
                  className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.05] p-8 backdrop-blur-sm lg:p-10"
                >
                  <div className="flex items-center gap-2 border-b border-white/10 pb-4">
                    <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#C17A3E]">
                      {loadingOpenings ? "KENZ / OPENINGS / LOADING" : "KENZ / OPENINGS / NOW"}
                    </span>
                  </div>

                  <div className="mt-7 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#C17A3E1A]">
                    <BriefcaseBusiness size={22} className="text-[#C17A3E]" />
                  </div>

                  <h3 className="mt-5 font-display text-3xl uppercase tracking-tight text-white">
                    No Active Openings
                  </h3>
                  <p className="mt-4 leading-relaxed text-white/60">
                    We are not currently advertising specific openings, but we are
                    always interested in hearing from capable professionals. If you
                    believe you can contribute to our team, we encourage you to
                    reach out.
                  </p>

                  <MagneticButton className="mt-8 inline-block">
                    <Link
                      href={MAIL}
                      className="group inline-flex items-center gap-3 rounded-full bg-white py-2 pl-7 pr-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#0A1420] transition-all hover:bg-[#C17A3E] hover:text-white"
                    >
                      Submit Your Resume
                      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#0A1420] text-white transition-transform group-hover:rotate-45">
                        <ArrowUpRight size={20} />
                      </span>
                    </Link>
                  </MagneticButton>
                </TiltCard>
              )}
            </motion.div>

            {/* FAQ */}
            <motion.div
              initial={{ opacity: 0, x: 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/80 backdrop-blur">
                <BriefcaseBusiness size={13} className="text-[#C17A3E]" />
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
                    className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm"
                  >
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="flex w-full items-center justify-between p-5 text-left transition-colors hover:bg-white/5"
                    >
                      <span className="text-sm font-semibold text-white">{item.q}</span>
                      <motion.span
                        animate={{ rotate: openFaq === i ? 45 : 0 }}
                        transition={{ duration: 0.25 }}
                        className="ml-4 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#C17A3E1A] text-[#C17A3E]"
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
                            <p className="text-sm leading-relaxed text-white/60">{item.a}</p>
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
      <section className="relative px-6 py-20 md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7 }}
          className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#C17A3E] via-[#B36E33] to-[#8E4F1F] p-8 shadow-[0_40px_90px_-30px_rgba(193,122,62,0.7)] md:p-14 lg:p-20"
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.12]"
            style={{
              backgroundImage: `radial-gradient(circle, #ffffff 1px, transparent 1px)`,
              backgroundSize: "26px 26px",
            }}
          />
          <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-white/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-[#0A1420]/30 blur-3xl" />

          <div className="relative grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0A1420] text-white">
                <Users size={22} />
              </div>
              <h2 className="mt-6 font-display text-5xl uppercase leading-[0.92] text-white sm:text-6xl lg:text-7xl">
                Interested in
                <span className="block text-[#0A1420]">Joining the Team?</span>
              </h2>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-white/90 md:text-lg">
                Send your resume and relevant experience to our team. We review
                all applications carefully.
              </p>
            </div>

            <MagneticButton>
              <Link
                href={MAIL}
                className="group inline-flex items-center gap-3 rounded-full bg-[#0A1420] py-2 pl-8 pr-2 text-sm font-semibold uppercase tracking-[0.15em] text-white shadow-[0_20px_40px_-10px_rgba(10,20,32,0.6)] transition-all duration-300 hover:bg-white hover:text-[#0A1420]"
              >
                <span>Submit Your Resume</span>
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#C17A3E] text-white transition-transform duration-300 group-hover:rotate-45">
                  <ArrowUpRight size={22} />
                </span>
              </Link>
            </MagneticButton>
          </div>
        </motion.div>
      </section>
    </main>
  );
}