import Link from "next/link";
import {
  ArrowRight,
  Check,
  Compass,
  Layers3,
  MessageSquare,
  Target,
} from "lucide-react";

const commitments = [
  "Timely delivery",
  "Clear communication",
  "Advanced technology",
  "Continuous improvement",
  "Consistent quality",
  "Long-term client partnerships",
];

const capabilities = [
  "Structural steel detailing",
  "Miscellaneous steel",
  "Joist & deck detailing",
  "3D modeling",
  "Shop drawings",
  "Erection drawings",
  "BIM coordination",
  "Connection support",
  "Steel estimating",
];

export default function AboutPage() {
  return (
    <main className="bg-paper text-ink">
      {/* HERO */}
      <section className="relative overflow-hidden bg-navy-950 text-white">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute left-[8%] top-20 h-px w-[84%] bg-copper-500" />
          <div className="absolute left-[15%] top-40 h-px w-[70%] bg-steel-700" />
          <div className="absolute right-[10%] top-0 h-full w-px bg-steel-700" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-40 lg:px-8">
          <div className="max-w-4xl">
            <p className="mb-6 text-xs font-bold uppercase tracking-[0.28em] text-copper-400">
              01 / About Kenz Engineering
            </p>

            <h1 className="font-display text-5xl uppercase leading-[0.95] tracking-tight sm:text-6xl lg:text-8xl">
              Engineering Detail
              <br />
              That Moves Projects
              <br />
              <span className="text-copper-400">Forward.</span>
            </h1>

            <p className="mt-8 max-w-2xl text-base leading-8 text-steel-400 sm:text-lg">
              Kenz Engineering LLC provides structural steel detailing and
              engineering support solutions focused on accuracy, coordination,
              practical delivery, and dependable project support.
            </p>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="border-b border-steel-200 bg-paper">
        <div className="mx-auto grid max-w-7xl gap-14 px-6 py-24 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-copper-600">
              Who We Are
            </p>

            <h2 className="mt-5 font-display text-4xl uppercase leading-tight text-navy-950 sm:text-5xl">
              Detail-focused.
              <br />
              Project-minded.
            </h2>
          </div>

          <div className="space-y-6 text-base leading-8 text-steel-700">
            <p>
              Kenz Engineering LLC is a structural steel detailing and
              engineering support company focused on accurate, practical, and
              dependable solutions for steel construction.
            </p>

            <p>
              Our work supports project teams through detailed 3D modeling,
              fabrication-ready drawings, BIM coordination, miscellaneous
              steel detailing, joist and deck detailing, connection support,
              and estimating assistance.
            </p>

            <p>
              The objective is straightforward: provide technical support
              that helps project teams move efficiently from design intent
              through fabrication and erection.
            </p>
          </div>
        </div>
      </section>

      {/* CAPABILITIES */}
      <section className="bg-navy-900 text-white">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-copper-400">
                Core Expertise
              </p>
              <h2 className="mt-4 font-display text-4xl uppercase sm:text-5xl">
                Built Around
                <br />
                Technical Capability
              </h2>
            </div>

            <span className="font-mono text-xs text-steel-500">
              KENZ / CAPABILITIES / 001
            </span>
          </div>

          <div className="grid border-l border-t border-steel-700/50 sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((item, index) => (
              <div
                key={item}
                className="group border-b border-r border-steel-700/50 p-7 transition-colors hover:bg-navy-800"
              >
                <div className="mb-10 flex items-center justify-between">
                  <span className="font-mono text-xs text-copper-400">
                    0{index + 1}
                  </span>
                  <ArrowRight className="h-4 w-4 text-steel-500 transition-transform group-hover:translate-x-1 group-hover:text-copper-400" />
                </div>

                <h3 className="font-display text-2xl uppercase tracking-wide">
                  {item}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* APPROACH */}
      <section className="bg-paper">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-3">
            <div>
              <Compass className="h-8 w-8 text-copper-600" />
              <h3 className="mt-6 font-display text-3xl uppercase text-navy-950">
                Built Around Precision
              </h3>
              <p className="mt-5 leading-7 text-steel-700">
                Steel projects require coordination, accuracy, consistency,
                and an understanding of fabrication and erection requirements.
              </p>
            </div>

            <div>
              <Layers3 className="h-8 w-8 text-copper-600" />
              <h3 className="mt-6 font-display text-3xl uppercase text-navy-950">
                Modern BIM Workflows
              </h3>
              <p className="mt-5 leading-7 text-steel-700">
                Modern modeling and coordination workflows support clearer
                communication between design, detailing, fabrication, and
                erection.
              </p>
            </div>

            <div>
              <MessageSquare className="h-8 w-8 text-copper-600" />
              <h3 className="mt-6 font-display text-3xl uppercase text-navy-950">
                Dedicated Delivery
              </h3>
              <p className="mt-5 leading-7 text-steel-700">
                We aim to operate as a dependable extension of our clients'
                project teams through communication, coordination, and
                consistent delivery.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* VISION / MISSION */}
      <section className="bg-steel-200">
        <div className="mx-auto grid max-w-7xl gap-px px-6 py-24 lg:grid-cols-2 lg:px-8">
          <div className="bg-navy-950 p-10 text-white lg:p-14">
            <Target className="h-8 w-8 text-copper-400" />
            <p className="mt-10 text-xs font-bold uppercase tracking-[0.25em] text-copper-400">
              Our Vision
            </p>
            <h2 className="mt-4 font-display text-4xl uppercase leading-tight">
              A Globally Trusted Steel Detailing Partner
            </h2>
            <p className="mt-6 leading-8 text-steel-400">
              To become a globally trusted steel detailing partner recognized
              for precision, reliability, innovation, and excellence.
            </p>
          </div>

          <div className="bg-white p-10 lg:p-14">
            <Target className="h-8 w-8 text-copper-600" />
            <p className="mt-10 text-xs font-bold uppercase tracking-[0.25em] text-copper-600">
              Our Mission
            </p>
            <h2 className="mt-4 font-display text-4xl uppercase leading-tight text-navy-950">
              Accurate. Practical. Dependable.
            </h2>
            <p className="mt-6 leading-8 text-steel-700">
              To provide accurate, high-quality, cost-effective detailing and
              engineering support that contributes to successful design,
              fabrication, and erection.
            </p>
          </div>
        </div>
      </section>

      {/* COMMITMENTS */}
      <section className="bg-paper">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-copper-600">
            Our Commitments
          </p>

          <div className="mt-10 grid gap-x-12 gap-y-5 md:grid-cols-2 lg:grid-cols-3">
            {commitments.map((item) => (
              <div
                key={item}
                className="flex items-center gap-4 border-b border-steel-200 pb-5"
              >
                <Check className="h-5 w-5 shrink-0 text-copper-600" />
                <span className="font-medium text-navy-950">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-copper-600 text-white">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 px-6 py-16 md:flex-row md:items-center lg:px-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-white/70">
              Work With Us
            </p>
            <h2 className="mt-3 font-display text-4xl uppercase sm:text-5xl">
              Have a Project to Discuss?
            </h2>
          </div>

          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-3 border border-white px-7 py-4 text-xs font-bold uppercase tracking-[0.18em] transition hover:bg-white hover:text-copper-600"
          >
            Talk to Our Team
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}