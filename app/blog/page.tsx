"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  BookOpen,
  Clock,
  ArrowRight,
  ArrowUpRight,
  Search,
  Layers,
  Ruler,
  Building2,
  Calculator,
  Compass,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { blogPosts } from "@/data/blogData";

const categoryIcons: Record<string, typeof Layers> = {
  "Steel Detailing": Ruler,
  "BIM Support": Building2,
  "Joist & Deck": Layers,
  Estimation: Calculator,
};

export default function BlogPage() {
  const [posts, setPosts] = useState(blogPosts);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    let isMounted = true;
    fetch(`/api/blog?_t=${Date.now()}`)
      .then((res) => res.json())
      .then((json) => {
        if (isMounted && json.success && Array.isArray(json.data) && json.data.length > 0) {
          setPosts(json.data);
        }
      })
      .catch((err) => console.warn("Using default blog posts:", err));

    return () => {
      isMounted = false;
    };
  }, []);

  const categories = ["All", "Steel Detailing", "BIM Support", "Joist & Deck", "Estimation"];

  const filteredPosts = posts.filter((post) => {
    const matchesCategory =
      selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="min-h-screen bg-[#fafbfc] overflow-hidden text-navy-950">
      {/* ── 1. HERO SECTION ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-navy-950 text-white pt-36 pb-28 md:pt-44 md:pb-36">
        {/* Dynamic Blueprint Background Grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `
              linear-gradient(#ffffff 1px, transparent 1px),
              linear-gradient(90deg, #ffffff 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />

        {/* Ambient Radial Illumination */}
        <div className="pointer-events-none absolute -left-48 top-1/4 h-[550px] w-[550px] rounded-full bg-copper-500/12 blur-[140px]" />
        <div className="pointer-events-none absolute -right-48 bottom-1/4 h-[550px] w-[550px] rounded-full bg-copper-600/12 blur-[150px]" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl"
          >
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-md border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-copper-400 backdrop-blur-md">
              <BookOpen size={13} className="text-copper-400" />
              <span>Articles & Insights</span>
            </div>

            <h1 className="font-display text-5xl uppercase leading-[0.92] tracking-tight sm:text-6xl md:text-7xl">
              Engineering Insights &
              <span className="block bg-gradient-to-r from-copper-400 via-copper-300 to-copper-500 bg-clip-text text-transparent">
                Detailing Knowledge
              </span>
            </h1>

            <div className="mt-8 border-l-2 border-copper-500/60 pl-5">
              <p className="text-base leading-relaxed text-steel-300 md:text-lg">
                Technical articles, practical workflows, and industry perspectives on
                structural steel detailing, BIM coordination, joist and deck systems, and
                material estimation.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Bottom Accent Beam */}
        <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-copper-500/60 to-transparent" />
      </section>

      {/* ── 2. FILTER & SEARCH CONTROL STRIP ───────────────────────────── */}
      <section className="relative z-20 -mt-8 px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-4 rounded-2xl border border-steel-200/90 bg-white p-4 shadow-xl shadow-steel-200/40 md:flex-row md:items-center md:justify-between">
            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-xl px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all ${
                    selectedCategory === cat
                      ? "bg-navy-950 text-white shadow-md shadow-navy-950/20"
                      : "border border-steel-200/80 bg-white text-steel-600 hover:border-copper-300 hover:text-navy-950"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative min-w-[260px] md:w-80">
              <Search
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-steel-400"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles..."
                className="h-10 w-full rounded-xl border border-steel-200 bg-steel-50/50 pl-10 pr-4 text-xs font-medium text-navy-950 outline-none transition-all placeholder:text-steel-400 focus:border-copper-500 focus:bg-white focus:ring-2 focus:ring-copper-500/20"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. ARTICLES GRID ────────────────────────────────────────────── */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2">
            <AnimatePresence mode="popLayout">
              {filteredPosts.map((post, idx) => {
                const IconComponent = categoryIcons[post.category] || BookOpen;

                return (
                  <motion.article
                    key={post.slug || post.id || `blog-post-${idx}`}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.4, delay: idx * 0.08 }}
                    className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-steel-200/90 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-copper-300 hover:shadow-xl hover:shadow-copper-500/10"
                  >
                    <div>
                      {/* Card Media Banner */}
                      <Link
                        href={`/blog/${post.slug}`}
                        className="relative block h-56 sm:h-60 w-full overflow-hidden bg-navy-950"
                      >
                        {post.coverImage ? (
                          <img
                            src={post.coverImage}
                            alt={post.title}
                            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                            loading="lazy"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-navy-950 to-navy-900 text-copper-400">
                            <IconComponent size={44} className="opacity-40" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-navy-950/25 to-transparent" />
                        
                        {/* Overlay Badges */}
                        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                          <div className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-navy-950/75 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-md">
                            <IconComponent size={12} className="text-copper-400" />
                            <span>{post.category}</span>
                          </div>

                          <div className="flex items-center gap-1.5 rounded-full bg-navy-950/75 border border-white/10 px-2.5 py-1 text-xs text-steel-200 backdrop-blur-md">
                            <Clock size={12} className="text-copper-400" />
                            <span>{post.readTime}</span>
                          </div>
                        </div>
                      </Link>

                      {/* Card Body Content */}
                      <div className="p-7 sm:p-8">
                        {/* Title */}
                        <h2 className="font-display text-2xl font-bold uppercase tracking-tight text-navy-950 transition-colors group-hover:text-copper-600 sm:text-3xl leading-snug">
                          <Link href={`/blog/${post.slug}`}>
                            {post.title}
                          </Link>
                        </h2>

                        {/* Excerpt */}
                        <p className="mt-4 text-sm leading-relaxed text-steel-600 line-clamp-3">
                          {post.excerpt}
                        </p>

                        {/* Section Preview Tags */}
                        {post.sections && post.sections.length > 0 && (
                          <div className="mt-6 flex flex-wrap gap-2 border-t border-steel-100 pt-4">
                            {post.sections.map((sec, sIdx) => (
                              sec.heading && (
                                <span
                                  key={sIdx}
                                  className="rounded-lg bg-steel-50 px-2.5 py-1 text-[11px] font-medium text-steel-600"
                                >
                                  {sec.heading}
                                </span>
                              )
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Bottom Action Footer */}
                    <div className="mx-7 sm:mx-8 mb-7 sm:mb-8 flex items-center justify-between border-t border-steel-100 pt-5">
                      <div>
                        <p className="text-xs font-bold text-navy-950">
                          {post.author.name}
                        </p>
                        <p className="text-[11px] text-steel-500">
                          {post.author.role} • {post.date}
                        </p>
                      </div>

                      <Link
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center gap-2 rounded-xl bg-navy-950 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition-all hover:bg-copper-600 hover:scale-105"
                      >
                        <span>Read Article</span>
                        <ArrowUpRight size={14} />
                      </Link>
                    </div>
                  </motion.article>
                );
              })}
            </AnimatePresence>
          </div>

          {filteredPosts.length === 0 && (
            <div className="rounded-3xl border border-steel-200 bg-white p-12 text-center">
              <p className="text-sm font-semibold text-navy-950">
                No articles found matching &ldquo;{searchQuery}&rdquo; in category &ldquo;{selectedCategory}&rdquo;.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
                className="mt-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-copper-600 underline underline-offset-4"
              >
                Reset filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ── 4. BOTTOM CINEMATIC CTA ──────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-navy-950 px-6 py-20 text-white md:py-28">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-br from-copper-600 via-copper-500 to-[#8c4614] p-8 shadow-2xl md:p-14 lg:p-20">
            {/* CAD Corner Accents */}
            <div className="pointer-events-none absolute top-4 left-4 h-4 w-4 border-t-2 border-l-2 border-white/40" />
            <div className="pointer-events-none absolute top-4 right-4 h-4 w-4 border-t-2 border-r-2 border-white/40" />
            <div className="pointer-events-none absolute bottom-4 left-4 h-4 w-4 border-b-2 border-l-2 border-white/40" />
            <div className="pointer-events-none absolute bottom-4 right-4 h-4 w-4 border-b-2 border-r-2 border-white/40" />

            <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <span className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-white/80">
                  Engineering Partnership
                </span>
                <h2 className="mt-3 font-display text-4xl uppercase leading-[0.95] text-white sm:text-5xl md:text-6xl">
                  Need Dependable
                  <span className="block text-navy-950">
                    Detailing Support?
                  </span>
                </h2>
                <p className="mt-5 text-sm leading-relaxed text-white/90 sm:text-base">
                  Connect with Kenz Engineering for accurate 3D modeling, shop drawings,
                  and fabrication-oriented engineering support tailored to your project schedules.
                </p>
              </div>

              <div className="flex shrink-0">
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-3 rounded-xl bg-navy-950 px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] text-white shadow-xl transition-all duration-300 hover:bg-white hover:text-navy-950 hover:scale-105"
                >
                  <span>Start a Project Discussion</span>
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
