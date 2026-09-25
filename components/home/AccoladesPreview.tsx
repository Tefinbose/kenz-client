import Link from "next/link";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";

const strengths = [
  {
    title: "Precision",
    text: "Detail-focused workflows built around accurate models and coordinated drawings.",
  },
  {
    title: "Reliability",
    text: "Consistent communication and dependable technical delivery throughout the project.",
  },
  {
    title: "Technology",
    text: "Modern BIM workflows and industry-standard detailing software supporting project coordination.",
  },
  {
    title: "Partnership",
    text: "A collaborative approach designed to operate as an extension of the project team.",
  },
];

export default function AccoladesPreview() {
  return (
    <section className="bg-white py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-end">
          <div>
            <div className="mb-6 flex items-center gap-4">
              <span className="h-px w-12 bg-copper-500" />

              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-copper-600">
                Recognition & Achievement
              </span>
            </div>

            <h2 className="font-display text-5xl uppercase leading-[0.95] text-navy-950 md:text-6xl">
              Built Around
              <span className="block text-copper-500">
                Consistency
              </span>
            </h2>
          </div>

          <p className="max-w-2xl text-base leading-8 text-steel-700 md:text-lg">
            Credibility is built through quality work, responsive communication,
            practical solutions, and long-term relationships. Our focus is to
            become a dependable extension of every project team we support.
          </p>
        </div>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {strengths.map((strength) => (
            <div
              key={strength.title}
              className="border border-steel-200 bg-paper p-7 transition-all duration-300 hover:-translate-y-1 hover:border-copper-500"
            >
              <div className="flex h-10 w-10 items-center justify-center border border-copper-500">
                <CheckCircle2
                  size={18}
                  className="text-copper-600"
                  strokeWidth={1.5}
                />
              </div>

              <h3 className="mt-8 font-display text-2xl uppercase text-navy-950">
                {strength.title}
              </h3>

              <p className="mt-4 text-sm leading-7 text-steel-700">
                {strength.text}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 border-y border-steel-200 py-10">
          <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="font-display text-3xl uppercase leading-tight text-navy-950 md:text-4xl">
                More than a detailing vendor.
                <span className="block text-copper-500">
                  A dependable technical partner.
                </span>
              </p>
            </div>

            <Link
              href="/about"
              className="inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.15em] text-navy-950 hover:text-copper-600"
            >
              Learn About Kenz
              <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}