"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ArrowUpRight, Check } from "lucide-react";

const commitments = [
  "Timely delivery",
  "Clear communication",
  "Advanced technology",
  "Consistent quality",
  "Continuous improvement",
  "Long-term partnerships",
];

const stats = [
  { value: "10+", label: "Years experience" },
  { value: "250+", label: "Projects detailed" },
  { value: "98%", label: "On-time delivery" },
];

/* ============================================================
   MASONRY (React Bits, inlined)
   - CSS from Masonry.css is converted to Tailwind / inline styles
   - column count follows the container width (not the window)
   - tile height = column width x ratio, so it scales at any size
   - the entrance plays when the gallery scrolls into view
   - last tile in each column stretches so the bottom edge is flush
   - respects prefers-reduced-motion
============================================================ */

type Direction =
  | "top"
  | "bottom"
  | "left"
  | "right"
  | "center"
  | "random";

type MasonryItem = {
  id: string;
  img: string;
  ratio: number; // height / width
};

type GridItem = MasonryItem & {
  x: number;
  y: number;
  w: number;
  h: number;
};

const unsplash = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=600&q=80`;

// Placeholder photos: swap for your own project images (e.g. /gallery/1.jpg)
const galleryItems: MasonryItem[] = [
  { id: "1", img: unsplash("photo-1516939884455-1445c8652f83"), ratio: 1.35 },
  { id: "2", img: unsplash("photo-1504307651254-35680f356dfd"), ratio: 0.9 },
  { id: "3", img: unsplash("photo-1541888946425-d81bb19240f5"), ratio: 1.15 },
  { id: "4", img: unsplash("photo-1503387762-592deb58ef4e"), ratio: 0.8 },
  { id: "5", img: unsplash("photo-1504917595217-d4dc5ebe6122"), ratio: 1.3 },
  { id: "6", img: unsplash("photo-1429497419816-9ca5cfb4571a"), ratio: 1.0 },
  { id: "7", img: unsplash("photo-1581094794329-c8112a89af12"), ratio: 1.4 },
  { id: "8", img: unsplash("photo-1487958449943-2429e8be8625"), ratio: 0.85 },
  { id: "9", img: unsplash("photo-1521791136064-7986c2920216"), ratio: 0.9 },
];

function Masonry({
  items,
  ease = "power3.out",
  duration = 0.6,
  stagger = 0.06,
  animateFrom = "bottom",
  scaleOnHover = true,
  hoverScale = 0.96,
  blurToFocus = true,
}: {
  items: MasonryItem[];
  ease?: string;
  duration?: number;
  stagger?: number;
  animateFrom?: Direction;
  scaleOnHover?: boolean;
  hoverScale?: number;
  blurToFocus?: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const hasMounted = useRef(false);

  const [width, setWidth] = useState(0);
  const [imagesReady, setImagesReady] = useState(false);
  const [inView, setInView] = useState(false);

  /* Measure the container */
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new ResizeObserver(([entry]) => {
      setWidth(entry.contentRect.width);
    });

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  /* Start the entrance when the gallery scrolls into view */
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px" }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  /* Preload images so tiles never pop in half-loaded */
  useEffect(() => {
    let cancelled = false;

    Promise.all(
      items.map(
        (item) =>
          new Promise<void>((resolve) => {
            const img = new Image();
            img.onload = () => resolve();
            img.onerror = () => resolve();
            img.src = item.img;
          })
      )
    ).then(() => {
      if (!cancelled) setImagesReady(true);
    });

    return () => {
      cancelled = true;
    };
  }, [items]);

  /* Column count follows the container width */
  const columns = width >= 640 ? 4 : width >= 340 ? 3 : 2;

  /* Shortest-column placement, then flush the bottom edge */
  const { grid, totalHeight } = useMemo(() => {
    if (!width) return { grid: [] as GridItem[], totalHeight: 0 };

    const colHeights: number[] = new Array(columns).fill(0);
    const lastInCol: number[] = new Array(columns).fill(-1);
    const columnWidth = width / columns;

    const placed: GridItem[] = items.map((item, index) => {
      const col = colHeights.indexOf(Math.min(...colHeights));
      const h = columnWidth * item.ratio;

      const entry: GridItem = {
        ...item,
        x: columnWidth * col,
        y: colHeights[col],
        w: columnWidth,
        h,
      };

      colHeights[col] += h;
      lastInCol[col] = index;

      return entry;
    });

    const tallest = Math.max(...colHeights);

    lastInCol.forEach((index, col) => {
      if (index >= 0) placed[index].h += tallest - colHeights[col];
    });

    return { grid: placed, totalHeight: tallest };
  }, [columns, items, width]);

  /* Animate: entrance first time, smooth re-layout afterwards */
  useEffect(() => {
    if (!imagesReady || !inView || grid.length === 0) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const startFor = (item: GridItem) => {
      const dir: Exclude<Direction, "random"> =
        animateFrom === "random"
          ? (["top", "bottom", "left", "right"] as const)[
              Math.floor(Math.random() * 4)
            ]
          : animateFrom;

      switch (dir) {
        case "top":
          return { x: item.x, y: item.y - 160 };
        case "left":
          return { x: item.x - 160, y: item.y };
        case "right":
          return { x: item.x + 160, y: item.y };
        case "center":
          return {
            x: width / 2 - item.w / 2,
            y: totalHeight / 2 - item.h / 2,
          };
        default:
          return { x: item.x, y: item.y + 160 };
      }
    };

    grid.forEach((item, index) => {
      const el = itemRefs.current.get(item.id);
      if (!el) return;

      const target = {
        x: item.x,
        y: item.y,
        width: item.w,
        height: item.h,
      };

      if (reduceMotion) {
        gsap.set(el, { ...target, opacity: 1, filter: "none" });
        return;
      }

      if (!hasMounted.current) {
        const from = startFor(item);

        gsap.fromTo(
          el,
          {
            opacity: 0,
            x: from.x,
            y: from.y,
            width: item.w,
            height: item.h,
            ...(blurToFocus && { filter: "blur(10px)" }),
          },
          {
            opacity: 1,
            ...target,
            ...(blurToFocus && { filter: "blur(0px)" }),
            duration: 0.8,
            ease: "power3.out",
            delay: index * stagger,
          }
        );
      } else {
        gsap.to(el, {
          ...target,
          duration,
          ease,
          overwrite: "auto",
        });
      }
    });

    hasMounted.current = true;
  }, [
    grid,
    imagesReady,
    inView,
    animateFrom,
    blurToFocus,
    duration,
    ease,
    stagger,
    totalHeight,
    width,
  ]);

  /* Stop running tweens on unmount */
  useEffect(() => {
    const map = itemRefs.current;

    return () => {
      gsap.killTweensOf(Array.from(map.values()));
    };
  }, []);

  const hover = (id: string, over: boolean) => {
    const el = itemRefs.current.get(id);
    if (!el || !scaleOnHover) return;

    gsap.to(el, {
      scale: over ? hoverScale : 1,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full ${
        totalHeight ? "" : "aspect-[4/5]"
      }`}
      style={totalHeight ? { height: totalHeight } : undefined}
    >
      {grid.map((item) => (
        <div
          key={item.id}
          ref={(el) => {
            if (el) itemRefs.current.set(item.id, el);
            else itemRefs.current.delete(item.id);
          }}
          className="absolute left-0 top-0 p-1.5 will-change-transform"
          style={{ opacity: 0 }}
          onMouseEnter={() => hover(item.id, true)}
          onMouseLeave={() => hover(item.id, false)}
        >
          <div
            className="h-full w-full rounded-[10px] bg-navy-900 bg-cover bg-center shadow-[0_10px_50px_-10px_rgba(0,0,0,0.2)]"
            style={{ backgroundImage: `url(${item.img})` }}
          />
        </div>
      ))}
    </div>
  );
}

/* ============================================================
   ABOUT PREVIEW
============================================================ */

export default function AboutPreview() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-paper py-14 md:py-16">
      {/* Technical background */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `
              linear-gradient(#17202a 1px, transparent 1px),
              linear-gradient(90deg, #17202a 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />

        <motion.div
          className="absolute left-1/2 top-0 h-px w-[70vw] bg-copper-500"
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 0.4 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4 }}
          style={{ transformOrigin: "left" }}
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr]">

          {/* MASONRY GALLERY */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6 }}
            className="relative mx-auto w-full max-w-sm lg:max-w-none"
          >
            <div className="max-h-[62vh] overflow-hidden rounded-md lg:max-h-[70vh]">
              <Masonry
                items={galleryItems}
                ease="power3.out"
                duration={0.6}
                stagger={0.06}
                animateFrom="bottom"
                scaleOnHover
                hoverScale={0.96}
                blurToFocus
              />
            </div>

            {/* Floating label */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: 0.6,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="absolute -bottom-4 left-5 z-10 border border-white/10 bg-navy-950 px-4 py-3 shadow-2xl"
            >
              <p className="text-[9px] uppercase tracking-[0.25em] text-copper-400">
                Kenz Engineering LLC
              </p>

              <p className="mt-1.5 font-display text-lg uppercase text-white">
                Built Around Precision
              </p>
            </motion.div>

            {/* Technical corners */}
            <motion.div
              initial={{ opacity: 0, width: 0, height: 0 }}
              whileInView={{ opacity: 1, width: 72, height: 72 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="pointer-events-none absolute -bottom-3 -right-3 border-b-2 border-r-2 border-copper-500"
            />

            <motion.div
              initial={{ opacity: 0, width: 0, height: 0 }}
              whileInView={{ opacity: 1, width: 72, height: 72 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="pointer-events-none absolute -left-3 -top-3 border-l-2 border-t-2 border-copper-500"
            />
          </motion.div>

          {/* ============ CONTENT (compact, viewport-fit) ============ */}
          <div>
            {/* Kicker with numbered index */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="mb-4 flex items-center gap-3"
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-full border border-copper-500/40 text-[8px] font-bold text-copper-600">
                01
              </span>

              <span className="h-px w-8 bg-copper-500" />

              <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-copper-600">
                About Kenz
              </span>
            </motion.div>

            {/* Heading — scaled down, single line per row */}
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.9,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="font-display text-3xl uppercase leading-[1.05] tracking-tight text-navy-950 md:text-4xl lg:text-5xl"
            >
              Engineering
              <span className="relative inline-block px-1">
                <span className="relative z-10">detail</span>
                <motion.span
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
                  className="absolute inset-x-0 bottom-1 z-0 h-[0.3em] origin-left bg-copper-200/70"
                />
              </span>
              <span className="block bg-gradient-to-r from-copper-600 via-copper-500 to-copper-400 bg-clip-text text-transparent">
                that moves projects forward
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="mt-4 max-w-xl text-sm leading-6 text-steel-700 md:text-base md:leading-7"
            >
              Kenz Engineering LLC is a structural steel detailing and
              engineering support company focused on accurate, practical, and
              dependable solutions for steel construction.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="mt-2.5 max-w-xl text-[13px] leading-6 text-steel-600"
            >
              From detailed 3D modeling and fabrication-ready drawings to BIM
              coordination, joist and deck detailing, and estimating support,
              we help teams move efficiently from design intent to
              fabrication and erection.
            </motion.p>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-6 flex flex-wrap gap-x-8 gap-y-3 border-y border-navy-900/10 py-4"
            >
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p className="font-display text-2xl text-navy-950">
                    {stat.value}
                  </p>
                  <p className="mt-0.5 text-[10px] uppercase tracking-[0.14em] text-steel-500">
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>

            {/* Commitments — compact bordered cards */}
            <div className="mt-6 grid gap-2 sm:grid-cols-2">
              {commitments.map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: 0.05 * index,
                  }}
                  className="group flex items-center gap-2.5 rounded-lg border border-navy-900/10 bg-white/60 px-3 py-2.5 backdrop-blur-sm transition-all duration-300 hover:border-copper-500/40 hover:bg-white hover:shadow-[0_8px_24px_-8px_rgba(23,32,42,0.15)]"
                >
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-copper-500 transition-transform duration-300 group-hover:rotate-45">
                    <Check
                      size={11}
                      className="text-white transition-transform duration-300 group-hover:-rotate-45"
                    />
                  </span>

                  <span className="text-[13px] font-medium text-navy-900">
                    {item}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* CTA — pill button with circular icon */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.5 }}
            >
              <Link
                href="/about"
                className="group mt-7 inline-flex items-center gap-3 rounded-full border border-navy-900/15 py-1 pl-5 pr-1 text-[13px] font-semibold uppercase tracking-[0.13em] text-navy-950 transition-all duration-300 hover:border-navy-900/30"
              >
                Discover Kenz Engineering

                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-navy-950 text-white transition-all duration-300 group-hover:bg-copper-500">
                  <ArrowUpRight
                    size={14}
                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </span>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}