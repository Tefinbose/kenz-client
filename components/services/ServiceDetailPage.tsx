import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  FileCheck2,
  Layers3,
  MessageSquare,
  Ruler,
} from "lucide-react";

export type ServiceDetail = {
  number: string;
  eyebrow: string;
  title: string;
  accentTitle: string;
  description: string;
  icon: React.ElementType;
  capabilities: string[];
  deliverables: string[];
  applications: string[];
  process: {
    number: string;
    title: string;
    text: string;
  }[];
};

type ServiceDetailPageProps = {
  service: ServiceDetail;
  previous?: {
    title: string;
    href: string;
  };
  next?: {
    title: string;
    href: string;
  };
};

export default function ServiceDetailPage({
  service,
  previous,
  next,
}: ServiceDetailPageProps) {
  const Icon = service.icon;

  return (
    <main className="bg-paper text-ink">
      {/* =====================================================
          HERO
      ===================================================== */}
      <section className="relative overflow-hidden bg-navy-950 text-white">
        <div className="engineering-grid-dark absolute inset-0 opacity-40" />

        <div className="container-kenz relative mx-auto px-6 py-20 lg:px-8 lg:py-28">
          <div className="mb-10">
            <Link
              href="/services"
              className="group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-steel-400 transition hover:text-copper-400"
            >
              <ArrowLeft
                size={15}
                className="transition-transform group-hover:-translate-x-1"
              />
              All Services
            </Link>
          </div>

          <div className="grid gap-12 lg:grid-cols-[1fr_280px] lg:items-end">
            <div className="max-w-5xl">
              <div className="mb-7 flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.28em] text-copper-400">
                <span className="h-px w-12 bg-copper-500" />
                {service.number} / {service.eyebrow}
              </div>

              <h1 className="font-display text-5xl font-semibold uppercase leading-[0.94] tracking-tight sm:text-6xl lg:text-8xl">
                {service.title}
                <br />
                <span className="text-copper-400">
                  {service.accentTitle}
                </span>
              </h1>

              <p className="mt-8 max-w-3xl text-base leading-8 text-steel-200 sm:text-lg">
                {service.description}
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-3 bg-copper-500 px-7 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-copper-400"
                >
                  Discuss Your Project
                  <ArrowRight
                    size={17}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>

                <Link
                  href="/projects"
                  className="inline-flex items-center gap-3 border border-steel-500/50 px-7 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-steel-200 transition hover:border-copper-400 hover:text-white"
                >
                  View Projects
                </Link>
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="relative border border-steel-700/60 bg-navy-900 p-8">
                <div className="absolute right-0 top-0 h-14 w-14 border-l border-b border-copper-500/50" />

                <div className="flex h-16 w-16 items-center justify-center bg-copper-500 text-white">
                  <Icon size={30} strokeWidth={1.5} />
                </div>

                <p className="mt-8 font-display text-6xl text-copper-400">
                  {service.number}
                </p>

                <p className="mt-2 text-xs font-bold uppercase tracking-[0.2em] text-steel-400">
                  Technical Capability
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 h-px w-full bg-copper-500/60" />
      </section>

      {/* =====================================================
          OVERVIEW
      ===================================================== */}
      <section className="bg-paper">
        <div className="container-kenz mx-auto px-6 py-20 lg:px-8 lg:py-28">
          <div className="grid gap-14 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
            <div>
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-copper-600">
                Service Overview
              </p>

              <h2 className="font-display text-4xl font-semibold uppercase leading-tight text-navy-950 sm:text-5xl">
                Detail Built
                <br />
                Around Requirements.
              </h2>

              <div className="mt-7 h-px w-20 bg-copper-500" />
            </div>

            <div>
              <p className="text-lg leading-9 text-steel-700">
                Kenz Engineering approaches every service with a focus on
                accuracy, coordination, fabrication requirements, and clear
                project communication.
              </p>

              <p className="mt-6 text-base leading-8 text-steel-700">
                Our technical workflows are designed to support project teams
                through coordinated models, drawings, documentation, and
                project information.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <div className="border border-steel-200 bg-white p-5">
                  <Ruler size={20} className="text-copper-500" />
                  <p className="mt-4 text-xs font-bold uppercase tracking-[0.15em] text-navy-950">
                    Precision
                  </p>
                </div>

                <div className="border border-steel-200 bg-white p-5">
                  <Layers3 size={20} className="text-copper-500" />
                  <p className="mt-4 text-xs font-bold uppercase tracking-[0.15em] text-navy-950">
                    Coordination
                  </p>
                </div>

                <div className="border border-steel-200 bg-white p-5">
                  <FileCheck2 size={20} className="text-copper-500" />
                  <p className="mt-4 text-xs font-bold uppercase tracking-[0.15em] text-navy-950">
                    Documentation
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          CAPABILITIES
      ===================================================== */}
      <section className="bg-navy-900 text-white">
        <div className="container-kenz mx-auto px-6 py-20 lg:px-8 lg:py-28">
          <div className="mb-14 max-w-3xl">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-copper-400">
              What We Provide
            </p>

            <h2 className="font-display text-4xl font-semibold uppercase leading-tight sm:text-5xl">
              Technical Capabilities
            </h2>

            <p className="mt-6 leading-8 text-steel-400">
              Service capabilities can be adapted to the project scope,
              detailing standards, schedule, and coordination requirements.
            </p>
          </div>

          <div className="grid gap-px border border-steel-700/40 bg-steel-700/40 sm:grid-cols-2 lg:grid-cols-3">
            {service.capabilities.map((item, index) => (
              <div
                key={item}
                className="group bg-navy-900 p-7 transition hover:bg-navy-800"
              >
                <div className="mb-8 flex items-center justify-between">
                  <span className="font-display text-2xl text-copper-400">
                    {(index + 1).toString().padStart(2, "0")}
                  </span>

                  <CheckCircle2
                    size={18}
                    className="text-steel-600 transition group-hover:text-copper-400"
                  />
                </div>

                <h3 className="text-sm font-semibold uppercase leading-6 tracking-wide text-steel-200">
                  {item}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          DELIVERABLES + APPLICATIONS
      ===================================================== */}
      <section className="bg-paper">
        <div className="container-kenz mx-auto px-6 py-20 lg:px-8 lg:py-28">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="border border-steel-200 bg-white p-8 sm:p-10 lg:p-12">
              <div className="mb-8 flex h-12 w-12 items-center justify-center bg-navy-950 text-copper-400">
                <FileCheck2 size={22} />
              </div>

              <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-copper-600">
                Deliverables
              </p>

              <h2 className="font-display text-3xl font-semibold uppercase text-navy-950 sm:text-4xl">
                Project
                <br />
                Documentation
              </h2>

              <ul className="mt-8 space-y-4">
                {service.deliverables.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 border-b border-steel-200 pb-4 text-sm leading-6 text-steel-700 last:border-0"
                  >
                    <CheckCircle2
                      size={17}
                      className="mt-0.5 shrink-0 text-copper-500"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-navy-950 p-8 text-white sm:p-10 lg:p-12">
              <div className="mb-8 flex h-12 w-12 items-center justify-center bg-copper-500 text-white">
                <Layers3 size={22} />
              </div>

              <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-copper-400">
                Applications
              </p>

              <h2 className="font-display text-3xl font-semibold uppercase sm:text-4xl">
                Where It
                <br />
                Supports Projects
              </h2>

              <ul className="mt-8 space-y-4">
                {service.applications.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 border-b border-steel-700/50 pb-4 text-sm leading-6 text-steel-300 last:border-0"
                  >
                    <ArrowRight
                      size={17}
                      className="mt-0.5 shrink-0 text-copper-400"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          PROCESS
      ===================================================== */}
      <section className="bg-navy-900 text-white">
        <div className="container-kenz mx-auto px-6 py-20 lg:px-8 lg:py-28">
          <div className="grid gap-14 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
            <div>
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-copper-400">
                Delivery Process
              </p>

              <h2 className="font-display text-4xl font-semibold uppercase leading-tight sm:text-5xl">
                Structured
                <br />
                For Delivery.
              </h2>

              <p className="mt-7 leading-8 text-steel-400">
                We structure our workflow around the information and
                coordination required to move from project inputs to usable
                technical deliverables.
              </p>
            </div>

            <div className="divide-y divide-steel-700/50 border-y border-steel-700/50">
              {service.process.map((item) => (
                <div
                  key={item.number}
                  className="grid gap-5 py-7 sm:grid-cols-[80px_180px_1fr] sm:items-start"
                >
                  <span className="font-display text-3xl text-copper-400">
                    {item.number}
                  </span>

                  <h3 className="font-display text-2xl font-semibold uppercase text-white">
                    {item.title}
                  </h3>

                  <p className="text-sm leading-7 text-steel-400">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          CTA
      ===================================================== */}
      <section className="relative overflow-hidden bg-copper-500 text-white">
        <div className="engineering-grid absolute inset-0 opacity-20" />

        <div className="container-kenz relative mx-auto px-6 py-20 lg:px-8 lg:py-24">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-white/70">
                Start A Conversation
              </p>

              <h2 className="font-display text-4xl font-semibold uppercase leading-none sm:text-5xl lg:text-6xl">
                Have A Project
                <br />
                To Discuss?
              </h2>

              <p className="mt-6 max-w-2xl leading-7 text-white/80">
                Tell us about your project requirements, schedule, scope, and
                technical needs.
              </p>
            </div>

            <Link
              href="/contact"
              className="group inline-flex shrink-0 items-center justify-center gap-3 bg-navy-950 px-8 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-navy-900"
            >
              Submit Project Inquiry
              <ArrowRight
                size={17}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </section>

      {/* =====================================================
          SERVICE NAVIGATION
      ===================================================== */}
      <section className="border-t border-steel-200 bg-white">
        <div className="container-kenz mx-auto px-6 py-8 lg:px-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            {previous ? (
              <Link
                href={previous.href}
                className="group flex items-center gap-4"
              >
                <div className="flex h-10 w-10 items-center justify-center border border-steel-200 transition group-hover:border-copper-500">
                  <ArrowLeft
                    size={16}
                    className="text-steel-500 transition group-hover:-translate-x-1 group-hover:text-copper-500"
                  />
                </div>

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-steel-400">
                    Previous Service
                  </p>
                  <p className="mt-1 text-sm font-semibold uppercase text-navy-950">
                    {previous.title}
                  </p>
                </div>
              </Link>
            ) : (
              <div />
            )}

            <Link
              href="/services"
              className="text-center text-xs font-bold uppercase tracking-[0.18em] text-copper-600 hover:text-copper-500"
            >
              All Services
            </Link>

            {next ? (
              <Link
                href={next.href}
                className="group flex items-center justify-end gap-4 text-right"
              >
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-steel-400">
                    Next Service
                  </p>
                  <p className="mt-1 text-sm font-semibold uppercase text-navy-950">
                    {next.title}
                  </p>
                </div>

                <div className="flex h-10 w-10 items-center justify-center border border-steel-200 transition group-hover:border-copper-500">
                  <ArrowRight
                    size={16}
                    className="text-steel-500 transition group-hover:translate-x-1 group-hover:text-copper-500"
                  />
                </div>
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      </section>
    </main>
  );
}