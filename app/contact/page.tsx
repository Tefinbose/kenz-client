import ContactForm from "@/components/contact/ContactForm";
import {
  ArrowUpRight,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

export default function ContactPage() {
  return (
    <main className="bg-paper">
      {/* HERO */}
      <section className="relative overflow-hidden bg-navy-950 text-white">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute left-[8%] top-24 h-px w-[84%] bg-copper-500" />
          <div className="absolute left-[18%] top-48 h-px w-[65%] bg-steel-700" />
          <div className="absolute right-[12%] top-0 h-full w-px bg-steel-700" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-40 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-copper-400">
            04 / Contact Kenz Engineering
          </p>

          <h1 className="mt-6 max-w-5xl font-display text-5xl uppercase leading-[0.95] sm:text-6xl lg:text-8xl">
            Talk to
            <br />
            <span className="text-copper-400">
              Kenz Engineering.
            </span>
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-steel-400">
            Structural steel detailing and engineering support built around
            accuracy, coordination, modern BIM workflows, and dependable
            communication.
          </p>
        </div>
      </section>

      {/* CONTACT INFORMATION */}
      <section className="border-b border-steel-200 bg-paper">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="grid gap-px bg-steel-300 md:grid-cols-3">
            {/* ADDRESS */}
            <div className="bg-white p-8 lg:p-10">
              <MapPin className="h-7 w-7 text-copper-600" />

              <p className="mt-8 text-[10px] font-bold uppercase tracking-[0.2em] text-steel-500">
                Office
              </p>

              <p className="mt-3 leading-7 text-navy-950">
                30 N Gould St #37010
                <br />
                Sheridan, WY 82801
                <br />
                USA
              </p>
            </div>

            {/* PHONE */}
            <a
              href="tel:+917994040464"
              className="group bg-white p-8 transition hover:bg-navy-950 hover:text-white lg:p-10"
            >
              <Phone className="h-7 w-7 text-copper-600" />

              <p className="mt-8 text-[10px] font-bold uppercase tracking-[0.2em] text-steel-500">
                Phone / WhatsApp
              </p>

              <p className="mt-3 text-lg">
                +91 799 404 0464
              </p>

              <ArrowUpRight className="mt-6 h-4 w-4 text-copper-500 transition group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>

            {/* EMAIL */}
            <a
              href="mailto:sales@kenzengineering.com"
              className="group bg-white p-8 transition hover:bg-navy-950 hover:text-white lg:p-10"
            >
              <Mail className="h-7 w-7 text-copper-600" />

              <p className="mt-8 text-[10px] font-bold uppercase tracking-[0.2em] text-steel-500">
                Email
              </p>

              <p className="mt-3 break-all text-lg">
                sales@kenzengineering.com
              </p>

              <ArrowUpRight className="mt-6 h-4 w-4 text-copper-500 transition group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>
          </div>
        </div>
      </section>

      {/* INQUIRY */}
      <section className="bg-paper">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <div className="grid gap-14 lg:grid-cols-[0.65fr_1.35fr] lg:items-start">
            {/* LEFT */}
            <div className="lg:sticky lg:top-32">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-copper-600">
                Project Inquiry
              </p>

              <h2 className="mt-5 font-display text-4xl uppercase leading-tight text-navy-950 sm:text-5xl">
                Let's Discuss
                <br />
                Your Project
              </h2>

              <p className="mt-6 max-w-md leading-7 text-steel-700">
                Tell us about your project requirements, scope, schedule, and
                technical needs. The more information you provide, the easier
                it is for our team to understand your requirements.
              </p>

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

            {/* FORM */}
            <ContactForm />
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="bg-copper-600 text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-7 px-6 py-16 md:flex-row md:items-center md:justify-between lg:px-8">
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

          <a
            href="mailto:sales@kenzengineering.com"
            className="inline-flex items-center gap-3 border border-white px-7 py-4 text-xs font-bold uppercase tracking-[0.18em] transition hover:bg-white hover:text-copper-600"
          >
            Email Our Team
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </section>
    </main>
  );
}