"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  CheckCircle2,
  Shield,
  Layers,
  Building2,
  Ruler,
  Boxes,
  Grid3x3,
  Cable,
  Calculator,
} from "lucide-react";
import { motion } from "framer-motion";

const keyPillars = [
  { label: "Engineering Detail", icon: Layers },
  { label: "Practical Solutions", icon: CheckCircle2 },
  { label: "Reliable Support", icon: Shield },
];

const services = [
  { label: "Structural Steel Detailing", icon: Building2 },
  { label: "BIM Coordination", icon: Boxes },
  { label: "Miscellaneous Steel", icon: Ruler },
  { label: "Joist & Deck", icon: Grid3x3 },
  { label: "Connection Design", icon: Cable },
  { label: "Estimation", icon: Calculator },
];

export default function CTASection() {
  return (
    <section className="relative overflow-hidden bg-white px-6 py-20 md:py-28">
      {/* Soft background glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[900px] -translate-x-1/2 rounded-full bg-copper-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative overflow-hidden rounded-[2rem] bg-navy-950 shadow-[0_30px_80px_-20px_rgba(10,20,32,0.55)]"
        >
          {/* Blueprint grid */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage: `
                linear-gradient(#ffffff 1px, transparent 1px),
                linear-gradient(90deg, #ffffff 1px, transparent 1px)
              `,
              backgroundSize: "48px 48px",
            }}
          />
          {/* Copper glow */}
          <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-copper-500/25 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-40 right-0 h-96 w-96 rounded-full bg-copper-600/20 blur-3xl" />

          <div className="relative grid gap-12 p-8 md:p-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 lg:p-20">
            {/* LEFT: message */}
            <div className="flex flex-col justify-between">
              <div>
                <motion.div
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.15 }}
                  className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-copper-500/40 bg-copper-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-copper-400"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-copper-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-copper-500" />
                  </span>
                  Now Accepting Projects
                </motion.div>

                <h2 className="font-display text-5xl uppercase leading-[0.92] text-white sm:text-6xl lg:text-7xl">
                  Have a Project
                  <span className="mt-1 block bg-gradient-to-r from-copper-400 to-copper-600 bg-clip-text text-transparent">
                    To Discuss?
                  </span>
                </h2>

                <p className="mt-8 max-w-xl text-base leading-relaxed text-white/70 md:text-lg">
                  Share your drawings, scope or just an idea. Our team will
                  review your requirements and come back with a clear,
                  practical plan.
                </p>

                <div className="mt-10 flex flex-wrap items-center gap-4">
                  <Link
                    href="/contact"
                    className="group inline-flex items-center gap-3 rounded-full bg-copper-500 py-2 pl-7 pr-2 text-sm font-semibold uppercase tracking-[0.15em] text-white shadow-[0_15px_35px_-8px_rgba(168,95,38,0.7)] transition-all duration-300 hover:bg-copper-400 hover:shadow-[0_20px_45px_-8px_rgba(168,95,38,0.85)]"
                  >
                    <span>Talk To Our Team</span>
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-navy-950 transition-transform duration-300 group-hover:rotate-45">
                      <ArrowUpRight size={20} />
                    </span>
                  </Link>
                </div>
              </div>

              {/* Pillars */}
              <div className="mt-12 flex flex-wrap gap-x-8 gap-y-4 border-t border-white/10 pt-8">
                {keyPillars.map((pillar, idx) => {
                  const Icon = pillar.icon;
                  return (
                    <motion.div
                      key={pillar.label}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.3 + idx * 0.1 }}
                      className="flex items-center gap-2.5 text-white/80"
                    >
                      <Icon size={16} className="text-copper-400" />
                      <span className="text-xs font-semibold uppercase tracking-[0.18em]">
                        {pillar.label}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* RIGHT: project brief card */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-md md:p-8"
            >
              {/* CAD corner marks */}
              <div className="pointer-events-none absolute -left-px -top-px h-5 w-5 rounded-tl-2xl border-l-2 border-t-2 border-copper-500" />
              <div className="pointer-events-none absolute -right-px -top-px h-5 w-5 rounded-tr-2xl border-r-2 border-t-2 border-copper-500" />
              <div className="pointer-events-none absolute -bottom-px -left-px h-5 w-5 rounded-bl-2xl border-b-2 border-l-2 border-copper-500" />
              <div className="pointer-events-none absolute -bottom-px -right-px h-5 w-5 rounded-br-2xl border-b-2 border-r-2 border-copper-500" />

              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-copper-400">
                What We Handle
              </p>
              <h3 className="mt-2 font-display text-2xl uppercase text-white md:text-3xl">
                Project Scope
              </h3>

              <ul className="mt-6 divide-y divide-white/10">
                {services.map((service, idx) => {
                  const Icon = service.icon;
                  return (
                    <motion.li
                      key={service.label}
                      initial={{ opacity: 0, x: 15 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.35 + idx * 0.07 }}
                      className="group flex items-center gap-4 py-3.5"
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-copper-500/15 text-copper-400 transition-colors duration-300 group-hover:bg-copper-500 group-hover:text-white">
                        <Icon size={17} />
                      </span>
                      <span className="flex-1 text-sm font-medium text-white/85 transition-colors group-hover:text-white">
                        {service.label}
                      </span>
                      <span className="font-mono text-xs text-white/30">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                    </motion.li>
                  );
                })}
              </ul>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}