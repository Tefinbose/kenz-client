"use client";

import Link from "next/link";
import {
  Crosshair,
  ShieldCheck,
  Layers,
  Users,
  ArrowUpRight,
  CheckCircle2,
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
  },
  {
    number: "02",
    title: "Reliability",
    text: "Consistent communication and dependable technical delivery throughout the project.",
    icon: ShieldCheck,
    metric: "On-Time Schedule",
  },
  {
    number: "03",
    title: "Technology",
    text: "Modern BIM workflows and industry-standard detailing software supporting project coordination.",
    icon: Layers,
    metric: "Advanced BIM Tech",
  },
  {
    number: "04",
    title: "Partnership",
    text: "A collaborative approach designed to operate as an extension of the project team.",
    icon: Users,
    metric: "Seamless Team Fit",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const,
    },
  },
};

export default function AccoladesPreview() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#fafbfc] via-white to-[#f4f5f7] py-24 md:py-32">
      {/* Background Engineering Technical Grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(#0a1420 1px, transparent 1px),
            linear-gradient(90deg, #0a1420 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />

      {/* Subtle Ambient Radial Lighting */}
      <div className="pointer-events-none absolute -left-40 top-1/4 h-96 w-96 rounded-full bg-copper-500/5 blur-[120px]" />
      <div className="pointer-events-none absolute -right-40 bottom-1/4 h-96 w-96 rounded-full bg-navy-600/5 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Top Header Section */}
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1.2fr] lg:items-end">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-md border border-copper-200/80 bg-copper-50/80 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-copper-800 shadow-sm backdrop-blur-sm">
              <Award size={13} className="text-copper-600" />
              <span>Recognition & Achievement</span>
            </div>

            <h2 className="font-display text-5xl uppercase tracking-tight text-navy-950 sm:text-6xl md:text-7xl">
              Built Around
              <span className="block bg-gradient-to-r from-copper-600 via-copper-500 to-copper-600 bg-clip-text text-transparent">
                Consistency
              </span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col justify-end"
          >
            <div className="relative pl-6 before:absolute before:left-0 before:top-2 before:bottom-2 before:w-1 before:rounded-full before:bg-gradient-to-b before:from-copper-500 before:to-copper-300">
              <p className="max-w-2xl text-base leading-8 text-steel-700 md:text-lg">
                Credibility is built through quality work, responsive communication,
                practical solutions, and long-term relationships. Our focus is to
                become a dependable extension of every project team we support.
              </p>
            </div>
          </motion.div>
        </div>

        {/* 4 Interactive Strengths Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {strengths.map((strength) => {
            const IconComponent = strength.icon;
            return (
              <motion.div
                key={strength.title}
                variants={cardVariants}
                whileHover={{ y: -8, transition: { duration: 0.25 } }}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-steel-200/90 bg-white p-8 shadow-[0_4px_20px_-4px_rgba(10,20,32,0.04)] transition-all duration-300 hover:border-copper-400 hover:shadow-[0_20px_35px_-8px_rgba(193,122,62,0.15)]"
              >
                {/* Top Subtle Animated Accent Line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-copper-500 via-copper-400 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                {/* Corner Technical Registration Mark */}
                <div className="absolute top-3 right-3 text-[10px] font-mono text-steel-400 opacity-60 transition-opacity duration-300 group-hover:opacity-100 group-hover:text-copper-600">
                  +{strength.number}
                </div>

                <div>
                  {/* Icon & Index Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex h-13 w-13 items-center justify-center rounded-xl border border-copper-500/20 bg-gradient-to-br from-copper-50 to-white text-copper-600 shadow-sm transition-all duration-300 group-hover:scale-105 group-hover:border-copper-500 group-hover:bg-copper-500 group-hover:text-white">
                      <IconComponent
                        size={22}
                        strokeWidth={1.8}
                        className="transition-transform duration-300 group-hover:rotate-6"
                      />
                    </div>

                    <span className="font-mono text-xs font-semibold tracking-wider text-steel-400 group-hover:text-copper-600 transition-colors">
                      {strength.metric}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="mt-7 font-display text-2xl uppercase tracking-wide text-navy-950 transition-colors duration-200 group-hover:text-copper-600">
                    {strength.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-3 text-sm leading-relaxed text-steel-700">
                    {strength.text}
                  </p>
                </div>

                {/* Bottom Status Indicator */}
                <div className="mt-8 flex items-center gap-2 border-t border-steel-200/60 pt-4 text-xs font-medium text-steel-500 transition-colors group-hover:text-navy-950">
                  <CheckCircle2
                    size={14}
                    className="text-copper-500 transition-transform group-hover:scale-110"
                  />
                  <span>Verified Standard</span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom Banner Showcase Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7 }}
          className="relative mt-16 overflow-hidden rounded-2xl border border-steel-200 bg-white p-8 shadow-[0_10px_30px_rgba(10,20,32,0.05)] md:p-12"
        >
          {/* Decorative Corner Blueprint Accents */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-copper-500/5 blur-3xl" />
          <div className="pointer-events-none absolute left-0 top-0 h-full w-1.5 bg-gradient-to-b from-copper-500 via-copper-400 to-copper-600" />

          <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-copper-600">
                <Award size={14} />
                <span>Our Core Philosophy</span>
              </div>
              <p className="font-display text-3xl uppercase leading-tight text-navy-950 sm:text-4xl md:text-5xl">
                More than a detailing vendor.
                <span className="block bg-gradient-to-r from-copper-600 to-copper-500 bg-clip-text text-transparent">
                  A dependable technical partner.
                </span>
              </p>
            </div>

            <div className="flex shrink-0 items-center">
              <Link
                href="/accolades"
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-xl border border-navy-950 bg-navy-950 px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-white shadow-md transition-all duration-300 hover:border-copper-500 hover:bg-copper-500 hover:shadow-lg hover:shadow-copper-500/20"
              >
                <span>Explore All Accolades</span>
                <ArrowUpRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}