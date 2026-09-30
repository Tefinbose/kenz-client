"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  Building2,
  Boxes,
  Ruler,
  Grid3x3,
  Cable,
  Calculator,
  Layers,
  CheckCircle2,
  Shield,
  Mail,
} from "lucide-react";
import { motion } from "framer-motion";

const services = [
  { label: "Structural Steel Detailing", icon: Building2 },
  { label: "BIM Coordination", icon: Boxes },
  { label: "Miscellaneous Steel", icon: Ruler },
  { label: "Joist & Deck", icon: Grid3x3 },
  { label: "Connections", icon: Cable },
  { label: "Estimation", icon: Calculator },
];

const pillars = [
  { label: "Engineering Detail", icon: Layers },
  { label: "Practical Solutions", icon: CheckCircle2 },
  { label: "Reliable Support", icon: Shield },
];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
};

export default function CTASection() {
  return (
    <section className="relative overflow-hidden bg-[#F5F3EE] px-6 py-20 md:py-28">
      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-5 lg:grid-cols-12">
          {/* MAIN CARD */}
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative overflow-hidden rounded-[2rem] bg-[#0B3B3C] p-8 md:p-12 lg:col-span-8 lg:p-16"
          >
            {/* Grid texture */}
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.06]"
              style={{
                backgroundImage: `
                  linear-gradient(#ffffff 1px, transparent 1px),
                  linear-gradient(90deg, #ffffff 1px, transparent 1px)
                `,
                backgroundSize: "44px 44px",
              }}
            />
            {/* Glows */}
            <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#1F7A78]/40 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-[#C8823F]/20 blur-3xl" />

            <div className="relative z-10 flex h-full flex-col justify-between gap-12">
              <div>
                <div className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/90 backdrop-blur">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#E0A263] opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-[#E0A263]" />
                  </span>
                  Start A Project
                </div>

                <h2 className="font-display text-5xl uppercase leading-[0.92] text-white sm:text-6xl lg:text-7xl">
                  Have a Project
                  <span className="mt-1 block text-[#E0A263]">To Discuss?</span>
                </h2>

                <p className="mt-8 max-w-xl text-base leading-relaxed text-white/75 md:text-lg">
                  Tell us about your structural steel detailing, BIM,
                  miscellaneous steel, joist and deck, connection, or
                  estimation requirements. We&apos;ll respond with a clear,
                  practical plan.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-5">
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-3 rounded-full bg-[#E0A263] py-2 pl-7 pr-2 text-sm font-semibold uppercase tracking-[0.15em] text-[#0B3B3C] shadow-[0_15px_35px_-10px_rgba(224,162,99,0.6)] transition-all duration-300 hover:bg-white"
                >
                  {/* <span>Talk To Our Team</span> */}
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#0B3B3C] text-white transition-transform duration-300 group-hover:rotate-45">
                    <ArrowUpRight size={20} />
                  </span>
                </Link>

                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-sm font-medium text-white/80 underline-offset-4 transition-colors hover:text-white hover:underline"
                >
                  <Mail size={16} />
                  Send us your drawings
                </Link>
              </div>
            </div>
          </motion.div>

          {/* SIDE COLUMN */}
          <div className="grid gap-5 lg:col-span-4">
            {/* Scope card */}
            <motion.div
              {...fadeUp}
              transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
              className="rounded-[2rem] border border-[#0B3B3C]/10 bg-white p-7 shadow-[0_20px_50px_-25px_rgba(11,59,60,0.35)]"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#B8702C]">
                What We Handle
              </p>
              <ul className="mt-5 grid gap-1">
                {services.map((service, idx) => {
                  const Icon = service.icon;
                  return (
                    <motion.li
                      key={service.label}
                      initial={{ opacity: 0, x: 12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.25 + idx * 0.06 }}
                      className="group flex items-center gap-3 rounded-xl px-2 py-2.5 transition-colors hover:bg-[#F5F3EE]"
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#0B3B3C]/[0.07] text-[#0B3B3C] transition-colors group-hover:bg-[#0B3B3C] group-hover:text-white">
                        <Icon size={16} />
                      </span>
                      <span className="text-sm font-medium text-[#0B3B3C]">
                        {service.label}
                      </span>
                    </motion.li>
                  );
                })}
              </ul>
            </motion.div>

            {/* Pillars card */}
            <motion.div
              {...fadeUp}
              transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
              className="rounded-[2rem] bg-gradient-to-br from-[#E0A263] to-[#B8702C] p-7"
            >
              <div className="grid gap-3.5">
                {pillars.map((pillar) => {
                  const Icon = pillar.icon;
                  return (
                    <div
                      key={pillar.label}
                      className="flex items-center gap-3 text-[#0B3B3C]"
                    >
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/40">
                        <Icon size={16} />
                      </span>
                      <span className="text-xs font-bold uppercase tracking-[0.18em]">
                        {pillar.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}