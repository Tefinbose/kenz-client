"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowDownRight, ArrowRight } from "lucide-react";

// Loaded on the client only: keeps three.js out of the server render
// and out of the first paint.
const SteelStructure = dynamic(() => import("./SteelStructure"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 grid place-items-center">
      <span className="h-8 w-8 animate-spin rounded-full border-2 border-[#c9d3de] border-t-copper-500" />
    </div>
  ),
});

const chips = [
  {
    title: "3D",
    text: "Structural modeling",
    position: "left-5 top-20 lg:left-6",
    delay: "0s",
  },
  {
    title: "BIM",
    text: "Coordination support",
    position: "right-5 top-[38%] lg:right-6",
    delay: "1.4s",
  },
  {
    title: "FAB",
    text: "Fabrication ready",
    position: "bottom-24 left-5 lg:left-8",
    delay: "2.8s",
  },
];

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper-400 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-950";

const reveal =
  "motion-safe:animate-[hero-fade-up_700ms_cubic-bezier(0.22,1,0.36,1)_both]";

export default function Hero() {
  return (
    <section id="home" className="relative isolate min-h-[calc(100svh-70px)] overflow-hidden bg-navy-950 text-white min-[901px]:min-h-[calc(100svh-110px)]">
      <style>{`
        @keyframes hero-fade-up {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes hero-float {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-7px); }
        }
      `}</style>

      {/* Background: soft glows + faint grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_85%_30%,rgba(193,122,62,0.16),transparent),radial-gradient(50%_50%_at_10%_90%,rgba(36,70,107,0.35),transparent)]"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.7) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse 80% 70% at 30% 40%, black, transparent)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 70% at 30% 40%, black, transparent)",
        }}
      />

      <div className="mx-auto grid min-h-[inherit] max-w-7xl items-center gap-12 px-6 py-14 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-20">
        {/* ============ LEFT COLUMN ============ */}
        {/* ============ LEFT COLUMN ============ */}
<div className="relative z-10 flex flex-col justify-center">

  {/* Eyebrow */}
  <div
    className={`${reveal} mb-6 inline-flex w-fit items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1.5 backdrop-blur-xl transition-all duration-300 hover:border-copper-500/30 hover:bg-white/[0.05] [animation-delay:50ms]`}
  >
    <span className="relative flex h-1.5 w-1.5">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-copper-400 opacity-60 motion-reduce:animate-none" />
      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-copper-500" />
    </span>

    <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-steel-200">
      Kenz Engineering LLC
    </span>

    <span className="h-2.5 w-px bg-white/15" />

    <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-copper-400">
      Structural BIM
    </span>
  </div>

  {/* Main Heading */}
  <h1
    className={`${reveal} max-w-2xl text-balance font-display text-[2.5rem] font-medium leading-[0.96] tracking-[-0.03em] text-white sm:text-[3.25rem] lg:text-[3.75rem] xl:text-[4.25rem] [animation-delay:120ms]`}
  >
    Structural steel
    <br />

    <span className="relative inline-block">
      detailing
      <span className="absolute -bottom-0.5 left-0 h-[2px] w-12 origin-left scale-x-0 bg-copper-500 [animation:reveal-line_0.8s_0.9s_ease-out_forwards] sm:w-16" />
    </span>

    <br />

    <span className="text-steel-400">
      built for
    </span>{" "}

    <span className="animate-gradient-x bg-[length:200%_auto] bg-gradient-to-r from-copper-300 via-copper-400 to-copper-500 bg-clip-text text-transparent">
      fabrication.
    </span>
  </h1>

  {/* Description */}
  <p
    className={`${reveal} mt-6 max-w-lg text-[15px] leading-6 text-steel-300 sm:text-base sm:leading-7 [animation-delay:220ms]`}
  >
    From design intent to fabrication and erection, we deliver
    coordinated structural steel detailing and engineering support
    that keeps projects moving with clarity and precision.
  </p>

  {/* CTA */}
  <div
    className={`${reveal} mt-7 flex flex-col gap-2.5 sm:flex-row sm:items-center [animation-delay:320ms]`}
  >
    <Link
      href="/contact"
      className={`group relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-lg bg-copper-500 px-5 py-3 text-[13px] font-bold text-navy-950 shadow-lg shadow-copper-500/10 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-copper-500/25 ${focusRing}`}
    >
      <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
      <span className="relative">Start a project</span>
      <ArrowRight
        size={15}
        className="relative transition-transform duration-300 group-hover:translate-x-1"
      />
    </Link>

    <Link
      href="/projects"
      className={`group inline-flex items-center justify-center gap-1.5 rounded-lg px-4 py-3 text-[13px] font-semibold text-white transition-colors duration-300 hover:text-copper-400 ${focusRing}`}
    >
      View our work

      <ArrowDownRight
        size={15}
        className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5"
      />
    </Link>
  </div>

  {/* Capability Strip */}
  <div
    className={`${reveal} mt-10 border-t border-white/10 pt-4 [animation-delay:420ms]`}
  >
    <div className="grid grid-cols-2 gap-y-4 sm:grid-cols-4 sm:gap-x-4">
      {[
        { n: "01", label: "Steel Detailing" },
        { n: "02", label: "BIM Support" },
        { n: "03", label: "Connections" },
        { n: "04", label: "Estimation" },
      ].map((item) => (
        <div key={item.n} className="group cursor-default">
          <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-steel-500 transition-colors duration-300 group-hover:text-copper-400">
            {item.n}
          </p>

          <p className="mt-1 text-[13px] font-semibold text-steel-100 transition-transform duration-300 group-hover:translate-x-0.5">
            {item.label}
          </p>
        </div>
      ))}
    </div>
  </div>

</div>

        {/* ============ RIGHT COLUMN — 3D STUDIO CARD ============ */}
        <div
          className={`${reveal} relative [animation-delay:250ms]`}
        >
          {/* copper halo behind the card */}
          <div
            aria-hidden="true"
            className="absolute -inset-3 -z-10 rounded-[2rem] bg-copper-500/25 blur-3xl"
          />

          <div
            role="img"
            aria-label="Animated 3D model of a two-storey structural steel frame being erected"
            className="relative h-[400px] overflow-hidden rounded-3xl border border-white/30 bg-gradient-to-br from-white via-[#f3f6f9] to-[#dbe4ee] shadow-2xl shadow-black/40 sm:h-[500px] lg:h-[600px]"
          >
            {/* blueprint grid on the light surface */}
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(15,37,59,.07) 1px, transparent 1px), linear-gradient(90deg, rgba(15,37,59,.07) 1px, transparent 1px)",
                backgroundSize: "36px 36px",
                maskImage:
                  "radial-gradient(ellipse at center, black 30%, transparent 78%)",
                WebkitMaskImage:
                  "radial-gradient(ellipse at center, black 30%, transparent 78%)",
              }}
            />

            {/* the 3D scene */}
            <SteelStructure />

            {/* status tag */}
            <div className="pointer-events-none absolute left-5 top-5 z-10 inline-flex items-center gap-2 rounded-full border border-[#0f2539]/10 bg-white/80 py-1.5 pl-3 pr-3.5 text-xs font-semibold text-[#0f2539] shadow-sm backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-copper-500 opacity-60 motion-reduce:animate-none" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-copper-500" />
              </span>
              Live 3D model
            </div>

            {/* floating chips */}
            {chips.map((chip) => (
              <div
                key={chip.title}
                style={{ animationDelay: chip.delay }}
                className={`pointer-events-none absolute z-10 hidden rounded-xl border border-white/70 bg-white/75 px-3.5 py-2.5 shadow-lg shadow-[#0f2539]/10 backdrop-blur-md motion-safe:animate-[hero-float_6s_ease-in-out_infinite] sm:block ${chip.position}`}
              >
                <p className="font-display text-xl leading-none text-[#0f2539]">
                  {chip.title}
                </p>

                <p className="mt-1 text-[11px] font-medium text-[#5b6b7d]">
                  {chip.text}
                </p>
              </div>
            ))}

            {/* caption */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-white via-white/85 to-transparent px-6 pb-5 pt-12">
              <p className="text-sm font-medium text-[#42566b]">
                From design intent to fabrication and erection.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}