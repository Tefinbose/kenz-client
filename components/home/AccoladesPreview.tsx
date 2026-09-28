"use client";

import Link from "next/link";
import Image from "next/image";
import type { MouseEvent } from "react";
import {
  Crosshair,
  ShieldCheck,
  Layers,
  Users,
  ArrowUpRight,
  Award,
} from "lucide-react";
import { motion } from "framer-motion";

const strengths = [
  {
    number: "01",
    title: "Precision",
    text: "Detail-focused workflows built around accurate models and coordinated drawings.",
    icon: Crosshair,
    metric: "Zero-Clash Standard",
    span: "lg:col-span-2 lg:row-span-2",
    featured: true,
    image: "/images/precision.jpg",
  },
  {
    number: "02",
    title: "Reliability",
    text: "Consistent communication and dependable technical delivery throughout the project.",
    icon: ShieldCheck,
    metric: "On-Time Schedule",
    span: "",
    featured: false,
    image: "",
  },
  {
    number: "03",
    title: "Technology",
    text: "Modern BIM workflows and industry-standard detailing software supporting project coordination.",
    icon: Layers,
    metric: "Advanced BIM Tech",
    span: "",
    featured: false,
    image: "",
  },
  {
    number: "04",
    title: "Partnership",
    text: "A collaborative approach designed to operate as an extension of the project team.",
    icon: Users,
    metric: "Seamless Team Fit",
    span: "lg:col-span-2",
    featured: false,
    image: "",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

// Cursor-following spotlight
const handleMove = (e: MouseEvent<HTMLDivElement>) => {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--x", `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty("--y", `${e.clientY - rect.top}px`);
};

export default function AccoladesPreview() {
  return (
    <section className="relative overflow-hidden bg-[#0A1420] py-24 md:py-32">
      {/* Grid texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `
            linear-gradient(#ffffff 1px, transparent 1px),
            linear-gradient(90deg, #ffffff 1px, transparent 1px)
          `,
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        }}
      />
      {/* Glows */}
      <div className="pointer-events-none absolute -left-40 top-20 h-[420px] w-[420px] rounded-full bg-[#C17A3E]/20 blur-[140px]" />
      <div className="pointer-events-none absolute -right-40 bottom-20 h-[380px] w-[380px] rounded-full bg-[#C17A3E]/10 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* HEADER */}
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/80 backdrop-blur">
              <Award size={13} className="text-[#C17A3E]" />
              Recognition &amp; Achievement
            </div>

            <h2 className="font-display text-5xl uppercase leading-[0.9] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl">
              Built Around
              <span className="block bg-gradient-to-r from-[#E0A263] via-[#C17A3E] to-[#A5622B] bg-clip-text text-transparent">
                Consistency
              </span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-xl border-l-2 border-[#C17A3E] pl-6 text-base leading-8 text-white/65 md:text-lg lg:justify-self-end"
          >
            Credibility is built through quality work, responsive communication,
            practical solutions, and long-term relationships. Our focus is to
            become a dependable extension of every project team we support.
          </motion.p>
        </div>

        {/* BENTO GRID */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {strengths.map((s) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.title}
                variants={cardVariants}
                onMouseMove={handleMove}
                className={`group relative flex flex-col justify-between overflow-hidden rounded-3xl border p-7 transition-colors duration-300 md:p-8 ${
                  s.featured
                    ? "min-h-[380px] border-[#C17A3E]/40 bg-gradient-to-br from-[#C17A3E] to-[#8E4F1F] sm:col-span-2 md:p-10"
                    : "border-white/10 bg-white/[0.04] backdrop-blur-sm hover:border-[#C17A3E]/50"
                } ${s.span}`}
              >
                {/* Background image (featured card only) */}
                {s.featured && s.image && (
                  <>
                    <Image
                      src={s.image}
                      alt="Structural steel detailing model"
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-cover opacity-40 mix-blend-luminosity transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#8E4F1F] via-[#8E4F1F]/60 to-[#C17A3E]/30" />
                  </>
                )}

                {/* Spotlight */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background: s.featured
                      ? "radial-gradient(400px circle at var(--x,50%) var(--y,50%), rgba(255,255,255,0.18), transparent 60%)"
                      : "radial-gradient(360px circle at var(--x,50%) var(--y,50%), rgba(193,122,62,0.20), transparent 60%)",
                  }}
                />

                {/* Oversized number */}
                {s.featured && (
                  <span className="pointer-events-none absolute -bottom-8 right-4 font-display text-[10rem] leading-none text-white/10 md:text-[13rem]">
                    {s.number}
                  </span>
                )}

                <div className="relative z-10 flex items-start justify-between">
                  <div
                    className={`flex items-center justify-center rounded-2xl transition-transform duration-300 group-hover:rotate-6 ${
                      s.featured
                        ? "h-14 w-14 bg-[#0A1420] text-white"
                        : "h-12 w-12 bg-[#C17A3E1A] text-[#C17A3E]"
                    }`}
                  >
                    <Icon size={s.featured ? 26 : 22} strokeWidth={1.8} />
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider ${
                      s.featured
                        ? "border border-white/25 bg-white/15 text-white backdrop-blur"
                        : "border border-white/10 text-white/50"
                    }`}
                  >
                    {s.metric}
                  </span>
                </div>

                <div className={`relative z-10 ${s.featured ? "mt-20" : "mt-12"}`}>
                  <h3
                    className={`font-display uppercase tracking-wide text-white ${
                      s.featured ? "text-4xl md:text-6xl" : "text-2xl"
                    }`}
                  >
                    {s.title}
                  </h3>
                  <p
                    className={`mt-3 max-w-md leading-relaxed ${
                      s.featured
                        ? "text-base text-white/90"
                        : "text-sm text-white/60"
                    }`}
                  >
                    {s.text}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* PHILOSOPHY BAND */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7 }}
          className="mt-16 grid gap-8 border-t border-white/10 pt-12 md:grid-cols-[1fr_auto] md:items-end"
        >
          <div>
            <div className="mb-4 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#C17A3E]">
              <span className="h-px w-8 bg-[#C17A3E]" />
              Our Core Philosophy
            </div>
            <p className="font-display text-3xl uppercase leading-tight text-white sm:text-4xl md:text-5xl">
              More than a detailing vendor.
              <span className="block text-white/40">
                A dependable technical partner.
              </span>
            </p>
          </div>

          <Link
            href="/accolades"
            className="group inline-flex items-center gap-3 rounded-full bg-white py-2 pl-7 pr-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#0A1420] transition-all duration-300 hover:bg-[#C17A3E] hover:text-white"
          >
            <span>Explore All Accolades</span>
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#0A1420] text-white transition-transform duration-300 group-hover:rotate-45">
              <ArrowUpRight size={20} />
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}