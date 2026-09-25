"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Box,
  Boxes,
  Calculator,
  Cable,
  Layers3,
  Ruler,
  CheckCircle2,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const categories = [
  { id: "all", label: "All Disciplines" },
  { id: "structural", label: "Structural Detailing" },
  { id: "engineering", label: "Design & Engineering" },
  { id: "bim", label: "BIM & Take-Off" },
] as const;

type CategoryId = (typeof categories)[number]["id"];

const services = [
  {
    number: "01",
    categoryId: "structural" as CategoryId,
    categoryLabel: "Structural Detailing",
    title: "Steel Detailing",
    description:
      "Accurate structural steel 3D modeling, shop drawings, erection drawings, and fabrication-oriented detailing.",
    items: [
      "3D Structural Modeling",
      "Shop Drawings",
      "Erection Drawings",
      "Fabrication Detailing",
    ],
    icon: Ruler,
    href: "/services/steel-detailing",
    spec: "AISC / NISD",
  },
  {
    number: "02",
    categoryId: "structural" as CategoryId,
    categoryLabel: "Structural Detailing",
    title: "Miscellaneous Detailing",
    description:
      "Detailed modeling and documentation for miscellaneous steel components coordinated with the primary structure.",
    items: [
      "Miscellaneous Steel",
      "Component Modeling",
      "Shop Drawings",
      "Fabrication Documentation",
    ],
    icon: Box,
    href: "/services/miscellaneous-detailing",
    spec: "Stairs & Rails",
  },
  {
    number: "03",
    categoryId: "engineering" as CategoryId,
    categoryLabel: "Design & Engineering",
    title: "Connection & Delegated Design",
    description:
      "Connection detailing and delegated design support integrated into coordinated project workflows.",
    items: [
      "Connection Detailing",
      "Design Coordination",
      "Model Integration",
      "Drawing Coordination",
    ],
    icon: Cable,
    href: "/services/connection-design",
    spec: "PE / SE Stamped",
  },
  {
    number: "04",
    categoryId: "structural" as CategoryId,
    categoryLabel: "Structural Detailing",
    title: "Joist & Deck Detailing",
    description:
      "Joist and deck detailing coordinated with structural systems, fabrication requirements, and erection needs.",
    items: [
      "Joist Detailing",
      "Deck Detailing",
      "3D Coordination",
      "Interface Coordination",
    ],
    icon: Layers3,
    href: "/services/joist-deck",
    spec: "SJI / SDI Specs",
  },
  {
    number: "05",
    categoryId: "bim" as CategoryId,
    categoryLabel: "BIM & Take-Off",
    title: "BIM Support",
    description:
      "Model-based coordination and BIM support helping project teams communicate clearly throughout construction.",
    items: [
      "3D Steel Modeling",
      "Clash Coordination",
      "Drawing Extraction",
      "BIM Workflows",
    ],
    icon: Boxes,
    href: "/services/bim-support",
    spec: "LOD 350 - 400",
  },
  {
    number: "06",
    categoryId: "bim" as CategoryId,
    categoryLabel: "BIM & Take-Off",
    title: "Estimation & Material Take-Off",
    description:
      "Model-based quantity information and estimation support for more informed project planning.",
    items: [
      "Material Take-Off",
      "Quantity Extraction",
      "Steel Estimation",
      "Quantity Documentation",
    ],
    icon: Calculator,
    href: "/services/estimation",
    spec: "Advance Bill of Material",
  },
];

function ModernServiceCard({
  service,
  index,
}: {
  service: (typeof services)[number];
  index: number;
}) {
  const Icon = service.icon;
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.45, delay: index * 0.05 }}
      className="h-full"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-white/[0.08] bg-navy-900/60 p-7 md:p-8 backdrop-blur-xl transition-all duration-500 hover:border-copper-500/50 hover:bg-navy-900/90 hover:shadow-[0_22px_45px_-12px_rgba(193,122,62,0.18)] hover:-translate-y-1.5"
      >
        {/* Interactive Mouse Spotlight */}
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-500"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(193, 122, 62, 0.14), transparent 75%)`,
          }}
        />

        {/* Subtle Tech Corner Crosshairs */}
        <span className="pointer-events-none absolute left-3 top-3 font-mono text-[9px] text-white/10 transition-colors duration-300 group-hover:text-copper-400/40">
          +
        </span>
        <span className="pointer-events-none absolute right-3 top-3 font-mono text-[9px] text-white/10 transition-colors duration-300 group-hover:text-copper-400/40">
          +
        </span>

        {/* Ambient Top Glow */}
        <div className="pointer-events-none absolute -right-16 -top-16 h-36 w-36 rounded-full bg-copper-500/10 blur-3xl transition-opacity duration-700 group-hover:opacity-100" />

        {/* Header: Index, Spec Pill, and Icon */}
        <div>
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="inline-flex items-center rounded-md border border-copper-500/25 bg-copper-500/10 px-2.5 py-1 font-mono text-xs font-semibold text-copper-400">
                {service.number}
              </span>
              <span className="hidden rounded border border-white/[0.07] bg-white/[0.03] px-2 py-0.5 font-mono text-[10px] tracking-wider text-steel-400 sm:inline-block">
                {service.spec}
              </span>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-steel-300 shadow-inner transition-all duration-500 group-hover:scale-110 group-hover:border-copper-500/50 group-hover:bg-copper-500/10 group-hover:text-copper-400">
              <Icon size={22} strokeWidth={1.6} />
            </div>
          </div>

          {/* Title & Description */}
          <div className="relative z-10 mt-7">
            <h3 className="font-display text-2xl uppercase tracking-wide text-white transition-colors duration-300 group-hover:text-copper-300 md:text-3xl">
              {service.title}
            </h3>

            <p className="mt-3.5 text-sm leading-relaxed text-steel-400 transition-colors duration-300 group-hover:text-steel-300">
              {service.description}
            </p>
          </div>

          {/* Deliverable Tags / Chips */}
          <div className="relative z-10 mt-6 flex flex-wrap gap-2 pt-4 border-t border-white/[0.06]">
            {service.items.map((item) => (
              <span
                key={item}
                className="inline-flex items-center gap-1.5 rounded-md border border-white/[0.06] bg-white/[0.02] px-2.5 py-1 text-[11px] font-medium tracking-wide text-steel-300 transition-colors duration-300 group-hover:border-copper-500/20 group-hover:text-steel-200"
              >
                <span className="h-1 w-1 rounded-full bg-copper-500/70" />
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Footer: Explore Action Link */}
        <div className="relative z-10 mt-8 pt-5 border-t border-white/[0.06] flex items-center justify-between">
          <Link
            href={service.href}
            className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-copper-400 transition-all duration-300 group-hover:text-copper-300 group-hover:gap-2.5"
          >
            <span>Explore Scope</span>
            <ChevronRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>

          <Link
            href={service.href}
            aria-label={`View details for ${service.title}`}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-steel-400 transition-all duration-300 group-hover:border-copper-500 group-hover:bg-copper-500 group-hover:text-white group-hover:scale-110"
          >
            <ArrowUpRight size={16} />
          </Link>
        </div>

        {/* Animated Bottom Copper Beam */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-copper-500 via-copper-400 to-copper-600 transition-transform duration-500 group-hover:scale-x-100" />
      </div>
    </motion.div>
  );
}

export default function ServicesPreview() {
  const [activeCategory, setActiveCategory] = useState<CategoryId>("all");

  const filteredServices =
    activeCategory === "all"
      ? services
      : services.filter((s) => s.categoryId === activeCategory);

  return (
    <section className="relative overflow-hidden bg-navy-950 py-28 text-white md:py-36">
      {/* Background Blueprint Grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `
            linear-gradient(#ffffff 1px, transparent 1px),
            linear-gradient(90deg, #ffffff 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Atmospheric Ambient Glows */}
      <div className="pointer-events-none absolute -left-40 top-1/4 h-[500px] w-[500px] rounded-full bg-copper-500/10 blur-[130px]" />
      <div className="pointer-events-none absolute -right-40 bottom-1/4 h-[500px] w-[500px] rounded-full bg-navy-800/40 blur-[140px]" />

      {/* Top Decorative Copper Accent Line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-copper-500/40 to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        {/* ================================================= */}
        {/* SECTION HEADER */}
        {/* ================================================= */}
        <div className="mb-14 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            {/* Live Indicator Pill */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-copper-500/25 bg-copper-500/10 px-3.5 py-1.5 font-mono text-xs uppercase tracking-widest text-copper-400"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-copper-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-copper-500" />
              </span>
              Engineering Disciplines & Scope
            </motion.div>

            {/* Main Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display text-4xl uppercase leading-[0.98] tracking-tight text-white sm:text-5xl md:text-6xl"
            >
              Detailed Solutions.{" "}
              <span className="block bg-gradient-to-r from-copper-400 via-copper-300 to-copper-500 bg-clip-text text-transparent">
                Engineered For Fabrication.
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-6 text-base leading-relaxed text-steel-400 md:text-lg"
            >
              From structural steel detailing and BIM coordination to miscellaneous
              steel, joist and deck detailing, connection support, and estimation,
              Kenz Engineering delivers clash-free, fabricator-ready models and drawings.
            </motion.p>
          </div>

          {/* Category Filter Pills (Modern App Interaction) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="flex flex-wrap gap-2 rounded-2xl border border-white/[0.08] bg-navy-900/80 p-1.5 backdrop-blur-xl"
          >
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              const count =
                cat.id === "all"
                  ? services.length
                  : services.filter((s) => s.categoryId === cat.id).length;

              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`relative flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                    isActive
                      ? "text-white"
                      : "text-steel-400 hover:text-steel-200 hover:bg-white/[0.03]"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activePill"
                      className="absolute inset-0 rounded-xl bg-gradient-to-r from-copper-600 to-copper-500 shadow-md"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{cat.label}</span>
                  <span
                    className={`relative z-10 rounded-full px-1.5 py-0.2 font-mono text-[10px] ${
                      isActive
                        ? "bg-black/25 text-white"
                        : "bg-white/[0.06] text-steel-400"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </motion.div>
        </div>

        {/* ================================================= */}
        {/* SERVICE CARDS GRID */}
        {/* ================================================= */}
        <motion.div
          layout
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filteredServices.map((service, index) => (
              <ModernServiceCard
                key={service.number}
                service={service}
                index={index}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* ================================================= */}
        {/* BOTTOM METRICS & CONVERSION BAR */}
        {/* ================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-14 rounded-2xl border border-white/[0.08] bg-navy-900/60 p-6 md:p-8 backdrop-blur-xl"
        >
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <div className="flex items-center gap-3">
                <Sparkles size={18} className="text-copper-400" />
                <h4 className="text-base font-semibold text-white">
                  Comprehensive Fabrication & Construction Workflows
                </h4>
              </div>
              <p className="mt-2 text-sm text-steel-400">
                Technical capabilities structured to support fabricators, general
                contractors, and engineers from design intent through erection.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/services"
                className="inline-flex items-center gap-2 rounded-xl bg-copper-500 px-5 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-lg transition-all duration-300 hover:bg-copper-400 hover:shadow-copper-500/25"
              >
                <span>View Full Scope</span>
                <ArrowUpRight size={15} />
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3 text-xs font-bold uppercase tracking-wider text-steel-200 transition-all duration-300 hover:border-copper-500/50 hover:bg-white/[0.08] hover:text-white"
              >
                <span>Request Detailing Quote</span>
              </Link>
            </div>
          </div>

          {/* Quick Technical Assurance Badges */}
          <div className="mt-6 flex flex-wrap items-center gap-y-2 gap-x-6 border-t border-white/[0.06] pt-5 text-xs text-steel-400">
            <span className="flex items-center gap-2">
              <CheckCircle2 size={14} className="text-copper-400" />
              AISC & NISD Code Compliant
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 size={14} className="text-copper-400" />
              LOD 350-400 Clash-Free Tekla Models
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 size={14} className="text-copper-400" />
              Direct CNC & NC1 Data Extraction
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 size={14} className="text-copper-400" />
              Fast Turnaround for Submittals & RFI
            </span>
          </div>
        </motion.div>
      </div>

      {/* Bottom Subtle Divider Line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
}
