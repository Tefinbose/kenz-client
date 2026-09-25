"use client";

import { useEffect, useRef, useState } from "react";

const steps = [
  {
    number: "01",
    title: "Understand",
    description:
      "We begin by understanding project requirements, detailing standards, schedules, fabrication requirements, and coordination expectations.",
  },
  {
    number: "02",
    title: "Coordinate",
    description:
      "Project information is reviewed and coordinated with structural, architectural, fabrication, and erection requirements.",
  },
  {
    number: "03",
    title: "Model",
    description:
      "Our detailing team develops accurate 3D models using modern BIM workflows and industry-standard detailing practices.",
  },
  {
    number: "04",
    title: "Detail",
    description:
      "Models are developed into coordinated shop drawings, erection drawings, and fabrication-oriented documentation.",
  },
  {
    number: "05",
    title: "Deliver",
    description:
      "Final deliverables are reviewed and communicated clearly to support fabrication, erection, and project schedules.",
  },
];

function useInView<T extends HTMLElement>(threshold = 0.2) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

function StepRow({
  step,
  index,
  active,
  onHover,
}: {
  step: (typeof steps)[number];
  index: number;
  active: boolean;
  onHover: (i: number | null) => void;
}) {
  const { ref, inView } = useInView<HTMLDivElement>(0.15);

  return (
    <div
      ref={ref}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(null)}
      className={`group relative grid gap-5 overflow-hidden border-b border-navy-800 py-8 transition-all duration-500 ease-out md:grid-cols-[90px_220px_1fr] md:items-start ${
        inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
      style={{ transitionDelay: inView ? `${index * 90}ms` : "0ms" }}
    >
      {/* Sliding accent bar */}
      <span
        className={`absolute inset-y-0 left-0 w-[2px] bg-copper-500 transition-transform duration-500 ease-out ${
          active ? "scale-y-100" : "scale-y-0"
        }`}
        style={{ transformOrigin: "top" }}
      />

      {/* Background wash on hover */}
      <span
        className={`pointer-events-none absolute inset-0 bg-gradient-to-r from-copper-500/[0.04] to-transparent transition-opacity duration-500 ${
          active ? "opacity-100" : "opacity-0"
        }`}
      />

      <span
        className={`relative font-display text-sm tracking-[0.2em] transition-all duration-500 ${
          active ? "text-copper-300" : "text-copper-400"
        }`}
      >
        {step.number}
      </span>

      <h3
        className={`relative font-display text-3xl uppercase transition-all duration-500 ${
          active ? "translate-x-1.5 text-copper-400" : "translate-x-0 text-white"
        }`}
      >
        {step.title}
      </h3>

      <p
        className={`relative max-w-2xl text-sm leading-7 transition-colors duration-500 ${
          active ? "text-steel-300" : "text-steel-400"
        }`}
      >
        {step.description}
      </p>
    </div>
  );
}

export default function ProcessSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const { ref: headerRef, inView: headerInView } = useInView<HTMLDivElement>(0.3);

  return (
    <section className="bg-navy-950 py-24 text-white md:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div
          ref={headerRef}
          className={`mb-16 grid gap-10 transition-all duration-700 ease-out lg:grid-cols-[0.8fr_1.2fr] lg:items-end ${
            headerInView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          <div>
            <div className="mb-6 flex items-center gap-4">
              <span
                className={`h-px bg-copper-500 transition-all duration-700 ease-out ${
                  headerInView ? "w-12" : "w-0"
                }`}
                style={{ transitionDelay: "150ms" }}
              />

              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-copper-400">
                Our Process
              </span>
            </div>

            <h2 className="font-display text-5xl uppercase leading-[0.9] md:text-6xl lg:text-7xl">
              From Design
              <span className="block text-copper-400">
                To Delivery
              </span>
            </h2>
          </div>

          <p className="max-w-2xl text-base leading-8 text-steel-400 md:text-lg">
            A structured detailing process built around accuracy,
            coordination, communication, and dependable delivery.
          </p>
        </div>

        <div className="relative border-t border-navy-800">
          {steps.map((step, index) => (
            <StepRow
              key={step.number}
              step={step}
              index={index}
              active={activeIndex === index}
              onHover={setActiveIndex}
            />
          ))}
        </div>

        <div className="mt-12 flex items-center gap-4">
          <span className="h-px flex-1 bg-navy-800" />

          <span className="text-center text-[10px] uppercase tracking-[0.25em] text-steel-500">
            Precision • Coordination • Delivery
          </span>

          <span className="h-px flex-1 bg-navy-800" />
        </div>
      </div>
    </section>
  );
}