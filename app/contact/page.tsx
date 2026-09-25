"use client";

import ContactForm from "@/components/contact/ContactForm";
import {
  ArrowUpRight,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import {
  FadeUp,
  FadeIn,
  SlideIn,
  StaggerContainer,
  StaggerItem,
  LineExpand,
} from "@/components/ui/Motion";

const contactCards = [
  {
    icon: MapPin,
    label: "Office",
    value: "30 N Gould St #37010\nSheridan, WY 82801\nUSA",
    href: null,
  },
  {
    icon: Phone,
    label: "Phone / WhatsApp",
    value: "+91 799 404 0464",
    href: "tel:+917994040464",
  },
  {
    icon: Mail,
    label: "Email",
    value: "sales@kenzengineering.com",
    href: "mailto:sales@kenzengineering.com",
  },
];

export default function ContactPage() {
  return (
    <main className="bg-paper overflow-hidden">

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative bg-navy-950 text-white overflow-hidden">
        <div className="engineering-grid-dark kenz-grid-move absolute inset-0 opacity-30" />
        {/* decorative lines */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute left-[8%] top-24 h-px w-[84%] bg-copper-500" />
          <div className="absolute left-[18%] top-48 h-px w-[65%] bg-steel-700" />
          <div className="absolute right-[12%] top-0 h-full w-px bg-steel-700" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 pb-28 pt-44 lg:px-8">
          <FadeIn delay={0.05}>
            <div className="mb-6 flex items-center gap-4">
              <LineExpand className="h-px w-12 bg-copper-500" delay={0.1} />
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-copper-400">
                04 / Contact Kenz Engineering
              </p>
            </div>
          </FadeIn>

          <FadeUp delay={0.15}>
            <h1 className="max-w-5xl font-display text-5xl uppercase leading-[0.95] sm:text-6xl lg:text-8xl">
              Talk to
              <br />
              <span className="text-copper-400">Kenz Engineering.</span>
            </h1>
          </FadeUp>

          <FadeUp delay={0.3}>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-steel-400">
              Structural steel detailing and engineering support built around
              accuracy, coordination, modern BIM workflows, and dependable
              communication.
            </p>
          </FadeUp>
        </div>

        <div className="absolute bottom-0 left-0 h-px w-full bg-copper-500/50" />
      </section>

      {/* ── CONTACT CARDS ────────────────────────────────────── */}
      <section className="bg-paper border-b border-steel-200">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <StaggerContainer
            className="grid gap-4 md:grid-cols-3"
            staggerDelay={0.1}
          >
            {contactCards.map(({ icon: Icon, label, value, href }) => (
              <StaggerItem key={label}>
                {href ? (
                  <a
                    href={href}
                    className="group relative flex flex-col overflow-hidden border border-steel-200 bg-white p-8 transition-all duration-400 hover:-translate-y-1 hover:border-copper-500/40 hover:shadow-[0_20px_60px_rgba(193,122,62,0.1)] lg:p-10"
                  >
                    <div className="absolute top-0 left-0 h-0.5 w-0 bg-copper-500 transition-all duration-500 group-hover:w-full" />
                    <div className="mb-7 inline-flex h-12 w-12 items-center justify-center border border-copper-500/30 bg-copper-500/10 transition-all duration-300 group-hover:bg-copper-500/20">
                      <Icon className="h-5 w-5 text-copper-600" />
                    </div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-steel-500">
                      {label}
                    </p>
                    <p className="mt-3 text-base font-medium text-navy-950 transition-colors duration-300 group-hover:text-copper-600 whitespace-pre-line">
                      {value}
                    </p>
                    <ArrowUpRight className="mt-6 h-4 w-4 text-copper-500 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                ) : (
                  <div className="relative flex flex-col overflow-hidden border border-steel-200 bg-white p-8 lg:p-10">
                    <div className="mb-7 inline-flex h-12 w-12 items-center justify-center border border-copper-500/30 bg-copper-500/10">
                      <Icon className="h-5 w-5 text-copper-600" />
                    </div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-steel-500">
                      {label}
                    </p>
                    <p className="mt-3 text-base font-medium text-navy-950 whitespace-pre-line">
                      {value}
                    </p>
                  </div>
                )}
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ── PROJECT INQUIRY ──────────────────────────────────── */}
      <section className="bg-paper">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <div className="grid gap-14 lg:grid-cols-[0.65fr_1.35fr] lg:items-start">

            {/* LEFT PANEL */}
            <SlideIn from="left">
              <div className="lg:sticky lg:top-32">
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-copper-600">
                  Project Inquiry
                </p>
                <h2 className="mt-5 font-display text-4xl uppercase leading-tight text-navy-950 sm:text-5xl">
                  Let&apos;s Discuss
                  <br />
                  Your Project
                </h2>
                <LineExpand className="mt-8 h-px bg-copper-500" delay={0.15} />
                <p className="mt-8 max-w-md leading-7 text-steel-700">
                  Tell us about your project requirements, scope, schedule, and
                  technical needs. The more information you provide, the easier
                  it is for our team to understand your requirements.
                </p>

                {/* quick info block */}
                <div className="mt-10 border-l-2 border-copper-600 pl-5">
                  <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-copper-600">
                    KENZ / RFQ
                  </p>
                  <p className="mt-2 text-sm leading-6 text-steel-600">
                    Structural steel detailing
                    <br />
                    BIM coordination
                    <br />
                    Engineering support
                  </p>
                </div>
              </div>
            </SlideIn>

            {/* FORM */}
            <FadeUp delay={0.1}>
              <ContactForm />
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ───────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-copper-600 text-white">
        <div className="engineering-grid absolute inset-0 opacity-20" />
        <div className="relative mx-auto flex max-w-7xl flex-col gap-7 px-6 py-20 md:flex-row md:items-center md:justify-between lg:px-8">
          <FadeUp>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-white/70">
                Kenz Engineering LLC
              </p>
              <h2 className="mt-3 font-display text-4xl uppercase sm:text-5xl">
                Engineering Detail.
                <br />
                Practical Solutions.
              </h2>
            </div>
          </FadeUp>

          <FadeIn delay={0.2}>
            <a
              href="mailto:sales@kenzengineering.com"
              className="group inline-flex items-center gap-3 border border-white px-8 py-4 text-xs font-bold uppercase tracking-[0.18em] transition-all duration-300 hover:bg-white hover:text-copper-600"
            >
              Email Our Team
              <ArrowUpRight className="h-4 w-4 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}