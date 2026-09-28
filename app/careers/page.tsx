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

/* ═══════════════════════════════ ANIMATED BLUEPRINT ═══ */

const STEEL = "#9FB1C5";
const COPPER = "#C17A3E";
const COPPER_LIGHT = "#E0A263";

const CYCLE = 14; // seconds for one full build + dismantle loop
const DRAW = [0, 0, 1, 1, 0, 0];

// Shared timeline: idle -> draw in at `s` -> hold -> undraw -> idle
const cyc = (s: number, e = 0.09) => ({
  times: [0, s, s + e, 0.8, 0.93, 1],
  duration: CYCLE,
  repeat: Infinity,
  ease: "easeInOut" as const,
});

const COLS_X = [140, 300, 460];
const GROUND_Y = 610;
const LEVEL_Y = [500, 390, 280, 170];

const towerPoints = Array.from({ length: 19 })
  .map((_, i) => `${i % 2 === 0 ? 528 : 552},${610 - i * 30}`)
  .join(" ");

function CareerBlueprint() {
  return (
    <svg
      viewBox="0 0 600 700"
      preserveAspectRatio="xMidYMid meet"
      className="h-full w-full"
      role="img"
      aria-label="Animated blueprint of a steel building frame being erected"
    >
      <defs>
        <pattern id="bp-grid" width="30" height="30" patternUnits="userSpaceOnUse">
          <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#ffffff" strokeOpacity="0.05" strokeWidth="1" />
        </pattern>
        <radialGradient id="bp-glow" cx="50%" cy="55%" r="55%">
          <stop offset="0%" stopColor={COPPER} stopOpacity="0.22" />
          <stop offset="100%" stopColor={COPPER} stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="600" height="700" fill="url(#bp-grid)" />
      <rect width="600" height="700" fill="url(#bp-glow)" />

      {/* Scan line */}
      <motion.rect
        x="0"
        width="600"
        height="2"
        fill={COPPER}
        opacity="0.3"
        animate={{ y: [0, 700] }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      />

      {/* Ground */}
      <line x1="60" y1={GROUND_Y} x2="590" y2={GROUND_Y} stroke={STEEL} strokeWidth="2" strokeOpacity="0.6" />
      {Array.from({ length: 27 }).map((_, i) => (
        <line
          key={`h-${i}`}
          x1={64 + i * 20}
          y1={GROUND_Y}
          x2={54 + i * 20}
          y2={GROUND_Y + 12}
          stroke={STEEL}
          strokeOpacity="0.25"
          strokeWidth="1.5"
        />
      ))}

      {/* ── Columns ── */}
      {COLS_X.map((x, i) => (
        <motion.line
          key={`col-${x}`}
          x1={x}
          y1={GROUND_Y}
          x2={x}
          y2={LEVEL_Y[LEVEL_Y.length - 1]}
          stroke={STEEL}
          strokeWidth="6"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: DRAW }}
          transition={cyc(0.02 + i * 0.03)}
        />
      ))}

      {/* ── Beams, one level at a time ── */}
      {LEVEL_Y.map((y, li) => (
        <motion.line
          key={`beam-${y}`}
          x1={COLS_X[0]}
          y1={y}
          x2={COLS_X[2]}
          y2={y}
          stroke={STEEL}
          strokeWidth="5"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: DRAW }}
          transition={cyc(0.12 + li * 0.1)}
        />
      ))}

      {/* ── Bracing ── */}
      {[
        [COLS_X[0], GROUND_Y, COLS_X[1], LEVEL_Y[0]],
        [COLS_X[1], GROUND_Y, COLS_X[0], LEVEL_Y[0]],
        [COLS_X[0], LEVEL_Y[0], COLS_X[1], LEVEL_Y[1]],
        [COLS_X[1], LEVEL_Y[0], COLS_X[0], LEVEL_Y[1]],
        [COLS_X[1], LEVEL_Y[1], COLS_X[2], LEVEL_Y[2]],
        [COLS_X[2], LEVEL_Y[1], COLS_X[1], LEVEL_Y[2]],
      ].map(([x1, y1, x2, y2], i) => (
        <motion.line
          key={`brace-${i}`}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke={STEEL}
          strokeOpacity="0.7"
          strokeWidth="2.5"
          strokeDasharray="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: DRAW }}
          transition={cyc(0.5 + i * 0.015)}
        />
      ))}

      {/* ── Copper connection plates ── */}
      {LEVEL_Y.flatMap((y, li) =>
        COLS_X.map((x, ci) => (
          <motion.rect
            key={`plate-${li}-${ci}`}
            x={x - 9}
            y={y - 9}
            width="18"
            height="18"
            rx="3"
            fill={COPPER}
            stroke={COPPER_LIGHT}
            strokeWidth="1.5"
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: DRAW, opacity: DRAW }}
            transition={cyc(0.2 + li * 0.1 + ci * 0.012, 0.05)}
          />
        ))
      )}

      {/* Pulsing beacon on the top joint */}
      <motion.circle
        cx={COLS_X[1]}
        cy={LEVEL_Y[3]}
        r="16"
        fill="none"
        stroke={COPPER_LIGHT}
        strokeWidth="2"
        style={{ transformBox: "fill-box", transformOrigin: "center" }}
        animate={{ scale: [1, 2.2], opacity: [0.7, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
      />

      {/* ── Tower crane ── */}
      <motion.polyline
        points={towerPoints}
        fill="none"
        stroke={STEEL}
        strokeOpacity="0.8"
        strokeWidth="2"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: DRAW }}
        transition={cyc(0.0, 0.14)}
      />
      {[528, 552].map((x) => (
        <motion.line
          key={`tw-${x}`}
          x1={x}
          y1={GROUND_Y}
          x2={x}
          y2="70"
          stroke={STEEL}
          strokeWidth="3.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: DRAW }}
          transition={cyc(0.0, 0.14)}
        />
      ))}
      <motion.line
        x1="330"
        y1="70"
        x2="590"
        y2="70"
        stroke={COPPER}
        strokeWidth="5"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: DRAW }}
        transition={cyc(0.1, 0.1)}
      />
      <motion.line
        x1="540"
        y1="70"
        x2="540"
        y2="40"
        stroke={COPPER}
        strokeWidth="4"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: DRAW }}
        transition={cyc(0.14, 0.06)}
      />

      {/* Swaying hoisted beam */}
      <motion.g
        style={{ transformBox: "fill-box", transformOrigin: "50% 0%" }}
        animate={{ rotate: [-4, 4, -4] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <line x1="400" y1="70" x2="400" y2="132" stroke={STEEL} strokeWidth="2" />
        <line x1="400" y1="132" x2="370" y2="146" stroke={STEEL} strokeWidth="1.5" />
        <line x1="400" y1="132" x2="430" y2="146" stroke={STEEL} strokeWidth="1.5" />
        <rect x="358" y="146" width="84" height="10" rx="2" fill={COPPER} />
        <rect x="358" y="141" width="84" height="5" rx="2" fill={COPPER_LIGHT} opacity="0.8" />
      </motion.g>

      {/* ── Dimension lines ── */}
      <motion.g
        animate={{ opacity: [0, 0, 1, 1, 0, 0] }}
        transition={cyc(0.55, 0.08)}
      >
        <line x1="92" y1="170" x2="92" y2={GROUND_Y} stroke={COPPER_LIGHT} strokeWidth="1.5" />
        <line x1="84" y1="170" x2="100" y2="170" stroke={COPPER_LIGHT} strokeWidth="1.5" />
        <line x1="84" y1={GROUND_Y} x2="100" y2={GROUND_Y} stroke={COPPER_LIGHT} strokeWidth="1.5" />
        <text
          x="76"
          y="395"
          fill={COPPER_LIGHT}
          fontSize="13"
          fontFamily="ui-monospace, monospace"
          textAnchor="middle"
          transform="rotate(-90 76 395)"
        >
          44&apos;-0&quot;
        </text>

        <line x1="140" y1="652" x2="460" y2="652" stroke={COPPER_LIGHT} strokeWidth="1.5" />
        <line x1="140" y1="644" x2="140" y2="660" stroke={COPPER_LIGHT} strokeWidth="1.5" />
        <line x1="460" y1="644" x2="460" y2="660" stroke={COPPER_LIGHT} strokeWidth="1.5" />
        <text
          x="300"
          y="678"
          fill={COPPER_LIGHT}
          fontSize="13"
          fontFamily="ui-monospace, monospace"
          textAnchor="middle"
        >
          32&apos;-0&quot; · LOD 350
        </text>
      </motion.g>
    </svg>
  );
}

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
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#C17A3E] opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#C17A3E]" />
                </span>
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

            {/* Right — animated blueprint illustration */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="relative h-[420px] overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#122033] to-[#0A1420] shadow-[0_30px_80px_rgba(0,0,0,0.5)] md:h-[540px]"
            >
              <div className="pointer-events-none absolute left-4 top-4 z-10 h-4 w-4 border-l-2 border-t-2 border-[#C17A3E]/70" />
              <div className="pointer-events-none absolute right-4 top-4 z-10 h-4 w-4 border-r-2 border-t-2 border-[#C17A3E]/70" />
              <div className="pointer-events-none absolute bottom-4 left-4 z-10 h-4 w-4 border-b-2 border-l-2 border-[#C17A3E]/70" />
              <div className="pointer-events-none absolute bottom-4 right-4 z-10 h-4 w-4 border-b-2 border-r-2 border-[#C17A3E]/70" />

              <div className="absolute inset-0 px-4 pb-16 pt-6">
                <CareerBlueprint />
              </div>

              {/* Floating labels */}
              {floatTags.map((t, i) => (
                <motion.div
                  key={t.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + i * 0.12 }}
                  className={`pointer-events-none absolute z-10 flex items-center gap-2 rounded-full border border-white/15 bg-[#0A1420]/70 px-3 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-white/85 backdrop-blur ${t.pos}`}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[#C17A3E]" />
                  {t.label}
                </motion.div>
              ))}

              <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-[#0A1420] to-transparent px-6 pb-5 pt-16">
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#C17A3E]">
                  KENZ / CAREER / FRAME
                </p>
                <p className="mt-1 font-display text-lg uppercase text-white">
                  Built level by level
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
                      <span className="h-2 w-2 rounded-full bg-[#C17A3E]" />
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
                    <span className="h-2 w-2 animate-pulse rounded-full bg-[#C17A3E]" />
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