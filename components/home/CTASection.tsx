"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2, Shield, Layers, Building2 } from "lucide-react";
import { motion } from "framer-motion";

const keyPillars = [
  {
    label: "Engineering Detail",
    icon: Layers,
  },
  {
    label: "Practical Solutions",
    icon: CheckCircle2,
  },
  {
    label: "Reliable Support",
    icon: Shield,
  },
];

export default function CTASection() {
  return (
    <section className="relative overflow-hidden bg-navy-950 px-6 py-20 md:py-28">
      {/* Background Subtle Blueprint Grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(#ffffff 1px, transparent 1px),
            linear-gradient(90deg, #ffffff 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative mx-auto max-w-7xl">
        {/* Main Dramatic Billboard Card */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-br from-copper-600 via-copper-500 to-[#8c4614] p-8 shadow-[0_25px_60px_-15px_rgba(168,95,38,0.4)] md:p-14 lg:p-20"
        >
          {/* Engineering CAD Alignment Corner Marks */}
          <div className="pointer-events-none absolute top-4 left-4 h-4 w-4 border-t-2 border-l-2 border-white/40" />
          <div className="pointer-events-none absolute top-4 right-4 h-4 w-4 border-t-2 border-r-2 border-white/40" />
          <div className="pointer-events-none absolute bottom-4 left-4 h-4 w-4 border-b-2 border-l-2 border-white/40" />
          <div className="pointer-events-none absolute bottom-4 right-4 h-4 w-4 border-b-2 border-r-2 border-white/40" />

          {/* Atmospheric Light Orbs */}
          <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-white/15 blur-3xl" />
          <div className="pointer-events-none absolute -left-24 -bottom-24 h-96 w-96 rounded-full bg-navy-950/30 blur-3xl" />

          {/* Architectural Watermark Pattern */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage: `radial-gradient(circle, #ffffff 1px, transparent 1px)`,
              backgroundSize: "28px 28px",
            }}
          />

          <div className="relative z-10">
            <div className="grid gap-12 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                {/* Modern Badge */}
                <motion.div
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mb-8 inline-flex items-center gap-2 rounded-md border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-md"
                >
                  <Layers size={13} className="text-white/90" />
                  <span>Start A Project</span>
                </motion.div>

                {/* Monumental Headline */}
                <h2 className="font-display text-5xl uppercase leading-[0.9] text-white sm:text-6xl md:text-7xl lg:text-8xl">
                  Have a Project
                  <span className="block text-navy-950 drop-shadow-sm">
                    To Discuss?
                  </span>
                </h2>

                {/* Description */}
                <p className="mt-8 max-w-2xl text-base leading-relaxed text-white/90 md:text-lg">
                  Tell us about your structural steel detailing, BIM,
                  miscellaneous steel, joist and deck, connection, or estimation
                  requirements.
                </p>
              </div>

              {/* Action Button */}
              <div className="shrink-0 lg:pb-2">
                <Link
                  href="/contact"
                  className="group relative inline-flex items-center gap-4 overflow-hidden rounded-2xl bg-white px-9 py-5 text-sm font-semibold uppercase tracking-[0.2em] text-navy-950 shadow-[0_15px_30px_-5px_rgba(10,20,32,0.3)] transition-all duration-300 hover:scale-[1.03] hover:bg-navy-950 hover:text-white hover:shadow-[0_20px_40px_-5px_rgba(10,20,32,0.5)]"
                >
                  <span>Talk To Our Team</span>

                  <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-copper-50 text-copper-600 transition-all duration-300 group-hover:bg-copper-500 group-hover:text-white">
                    <ArrowRight
                      size={18}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </span>
                </Link>
              </div>
            </div>

            {/* Bottom 3 Feature Chips */}
            <div className="mt-14 border-t border-white/20 pt-8">
              <div className="grid gap-4 sm:grid-cols-3">
                {keyPillars.map((pillar, idx) => {
                  const Icon = pillar.icon;
                  return (
                    <motion.div
                      key={pillar.label}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.3 + idx * 0.1 }}
                      className="flex items-center gap-3.5 rounded-xl border border-white/15 bg-white/10 px-5 py-3.5 backdrop-blur-sm transition-all duration-300 hover:border-white/30 hover:bg-white/15"
                    >
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/20 text-white">
                        <Icon size={15} />
                      </div>
                      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white">
                        {pillar.label}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}