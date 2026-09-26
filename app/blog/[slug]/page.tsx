import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Clock,
  Share2,
  Bookmark,
  ArrowUpRight,
  CheckCircle2,
  Building2,
  FileText,
  ChevronRight,
} from "lucide-react";
import { blogPosts, getBlogPostBySlug } from "@/data/blogData";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Find other articles for recommendations
  const otherPosts = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <main className="min-h-screen bg-[#fafbfc] text-navy-950">
      {/* ── 1. ARTICLE HEADER HERO ───────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-navy-950 text-white pt-36 pb-24 md:pt-44 md:pb-28">
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

        <div className="pointer-events-none absolute -left-48 top-1/4 h-[500px] w-[500px] rounded-full bg-copper-500/10 blur-[130px]" />
        <div className="pointer-events-none absolute -right-48 bottom-1/4 h-[500px] w-[500px] rounded-full bg-copper-600/10 blur-[130px]" />

        <div className="relative mx-auto max-w-4xl px-6 lg:px-8">
          {/* Back link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-copper-400 transition-colors hover:text-white mb-8"
          >
            <ArrowLeft size={14} />
            <span>Back to All Articles</span>
          </Link>

          {/* Meta Badges */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-copper-500/40 bg-copper-500/15 px-3.5 py-1 font-mono text-[11px] font-bold uppercase tracking-wider text-copper-300">
              {post.category}
            </span>
            <div className="flex items-center gap-1.5 text-xs text-steel-400">
              <Clock size={13} />
              <span>{post.readTime}</span>
            </div>
            <span className="text-steel-600">•</span>
            <span className="text-xs text-steel-400">{post.date}</span>
          </div>

          {/* Monumental Article Title */}
          <h1 className="mt-6 font-display text-3xl uppercase leading-[1.05] tracking-tight sm:text-4xl md:text-5xl lg:text-6xl text-white">
            {post.title}
          </h1>

          {/* Author Badge */}
          <div className="mt-8 flex items-center gap-3 border-t border-white/10 pt-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-copper-500/20 font-bold text-copper-400">
              KE
            </div>
            <div>
              <p className="text-xs font-bold text-white">{post.author.name}</p>
              <p className="text-[11px] text-steel-400">{post.author.role}</p>
            </div>
          </div>
        </div>

        {/* Bottom Accent Beam */}
        <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-copper-500/60 to-transparent" />
      </section>

      {/* ── 2. ARTICLE CONTENT WITH SIDEBAR ─────────────────────────────── */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1fr_320px] lg:items-start">
            {/* Left Column: Full Content */}
            <article className="rounded-3xl border border-steel-200/90 bg-white p-8 sm:p-12 md:p-16 shadow-sm">
              {/* Intro Lead Paragraphs */}
              <div className="space-y-5 text-base sm:text-lg leading-relaxed text-steel-700 font-normal border-b border-steel-100 pb-10">
                {post.introParagraphs.map((para, i) => (
                  <p key={i} className={i === 0 ? "font-medium text-navy-950 leading-relaxed text-lg sm:text-xl" : ""}>
                    {para}
                  </p>
                ))}
              </div>

              {/* Body Sections */}
              <div className="mt-10 space-y-12">
                {post.sections.map((section, sIdx) => (
                  <div key={sIdx} id={`section-${sIdx}`} className="scroll-mt-32">
                    {section.heading && (
                      <h2 className="font-display text-2xl uppercase tracking-tight text-navy-950 sm:text-3xl mb-5 pb-2 border-b border-steel-100/70">
                        {section.heading}
                      </h2>
                    )}
                    <div className="space-y-4 text-sm sm:text-base leading-relaxed text-steel-700">
                      {section.paragraphs.map((p, pIdx) => (
                        <p key={pIdx}>{p}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Post Footer Callout */}
              <div className="mt-14 rounded-2xl border border-copper-200 bg-copper-50/50 p-6 sm:p-8">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-copper-700">
                  <Building2 size={14} />
                  <span>Kenz Engineering LLC Detailing Support</span>
                </div>
                <p className="mt-2 text-sm text-steel-700 leading-relaxed">
                  Looking for accurate 3D modeling, coordinated shop drawings, and dependable project
                  support? Our team is ready to assist your detailing requirements.
                </p>
                <div className="mt-4">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-copper-700 underline underline-offset-4 hover:text-navy-950"
                  >
                    <span>Connect with our detailing team</span>
                    <ArrowUpRight size={13} />
                  </Link>
                </div>
              </div>
            </article>

            {/* Right Column: Sticky Sidebar */}
            <aside className="space-y-6 lg:sticky lg:top-32">
              {/* Quick Navigation / Table of Contents */}
              <div className="rounded-2xl border border-steel-200/90 bg-white p-6 shadow-sm">
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-copper-600 mb-4">
                  Article Outline
                </p>
                <nav className="space-y-2">
                  {post.sections.map((sec, idx) => (
                    sec.heading && (
                      <a
                        key={idx}
                        href={`#section-${idx}`}
                        className="flex items-start gap-2 text-xs font-medium text-steel-600 hover:text-copper-600 transition-colors py-1 leading-snug"
                      >
                        <ChevronRight size={13} className="shrink-0 mt-0.5 text-copper-500" />
                        <span>{sec.heading}</span>
                      </a>
                    )
                  ))}
                </nav>
              </div>

              {/* Direct RFQ Action Box */}
              <div className="rounded-2xl border border-navy-950 bg-navy-950 p-6 text-white shadow-lg">
                <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-copper-400">
                  RFQ Desk
                </span>
                <h4 className="mt-2 font-display text-xl uppercase tracking-tight">
                  Have a Project to Detail?
                </h4>
                <p className="mt-2 text-xs text-steel-400 leading-relaxed">
                  Send your drawing packages or project specifications for a 24-hour turnaround proposal.
                </p>
                <Link
                  href="/contact"
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-copper-600 to-copper-500 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-md hover:scale-[1.02] transition-transform"
                >
                  <span>Submit Inquiry</span>
                  <ArrowUpRight size={14} />
                </Link>
              </div>

              {/* Share / Back */}
              <div className="rounded-2xl border border-steel-200/90 bg-white p-4 text-center">
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-navy-950 hover:text-copper-600 transition-colors"
                >
                  <ArrowLeft size={13} />
                  <span>Browse More Articles</span>
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ── 3. RELATED ARTICLES ─────────────────────────────────────────── */}
      <section className="border-t border-steel-200/80 bg-steel-50/50 py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-display text-2xl uppercase tracking-tight text-navy-950 sm:text-3xl">
              More Engineering Insights
            </h3>
            <Link
              href="/blog"
              className="text-xs font-bold uppercase tracking-wider text-copper-600 hover:text-navy-950"
            >
              View All
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {otherPosts.map((other) => (
              <div
                key={other.id}
                className="group flex flex-col justify-between rounded-2xl border border-steel-200/90 bg-white p-6 shadow-sm transition-all hover:border-copper-300 hover:shadow-md"
              >
                <div>
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-copper-600">
                    {other.category} • {other.readTime}
                  </span>
                  <h4 className="mt-3 font-display text-xl font-bold uppercase tracking-tight text-navy-950 group-hover:text-copper-600 transition-colors">
                    <Link href={`/blog/${other.slug}`}>
                      {other.title}
                    </Link>
                  </h4>
                  <p className="mt-2 text-xs text-steel-600 leading-relaxed line-clamp-2">
                    {other.excerpt}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-steel-100 flex justify-end">
                  <Link
                    href={`/blog/${other.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-navy-950 group-hover:text-copper-600"
                  >
                    <span>Read</span>
                    <ArrowUpRight size={13} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
