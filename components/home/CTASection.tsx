import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CTASection() {
  return (
    <section className="bg-copper-600 px-6 py-20 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="border border-white/30 p-8 md:p-12 lg:p-16">
          <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="mb-6 text-xs font-semibold uppercase tracking-[0.3em] text-white/80">
                Start A Project
              </p>

              <h2 className="font-display text-5xl uppercase leading-[0.9] text-white md:text-7xl lg:text-8xl">
                Have a Project
                <span className="block text-navy-950">
                  To Discuss?
                </span>
              </h2>

              <p className="mt-8 max-w-2xl text-base leading-8 text-white/85 md:text-lg">
                Tell us about your structural steel detailing, BIM,
                miscellaneous steel, joist and deck, connection, or estimation
                requirements.
              </p>
            </div>

            <Link
              href="/contact"
              className="group inline-flex w-fit items-center gap-4 bg-white px-7 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-navy-950 transition-all duration-300 hover:bg-navy-950 hover:text-white"
            >
              Talk To Our Team

              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>

          <div className="mt-12 grid gap-4 border-t border-white/30 pt-6 text-xs uppercase tracking-[0.18em] text-white/75 sm:grid-cols-3">
            <span>Engineering Detail</span>
            <span>Practical Solutions</span>
            <span>Reliable Support</span>
          </div>
        </div>
      </div>
    </section>
  );
}