import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  FileCheck2,
  Layers3,
  LucideIcon,
  MessageSquare,
  Ruler,
  Sparkles,
  ShieldCheck,
  Workflow,
  Clock,
  Send,
  Boxes,
} from "lucide-react";

export type ServiceDetail = {
  number: string;
  eyebrow: string;
  title: string;
  accentTitle: string;
  description: string;
  icon: LucideIcon;
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
    <main className="min-h-screen bg-[#fafbfc] text-ink overflow-hidden">
      {/* =====================================================
          HERO
      ===================================================== */}
      <section className="relative overflow-hidden bg-navy-950 text-white pt-40 pb-28 lg:pb-36">
        {/* Dynamic Blueprint Background Grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `
              linear-gradient(#ffffff 1px, transparent 1px),
              linear-gradient(90deg, #ffffff 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />

        {/* Ambient Radial Illumination */}
        <div className="pointer-events-none absolute -left-48 top-1/4 h-[500px] w-[500px] rounded-full bg-copper-500/12 blur-[140px]" />
        <div className="pointer-events-none absolute -right-48 bottom-1/4 h-[500px] w-[500px] rounded-full bg-copper-600/12 blur-[150px]" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          {/* Back Link Breadcrumb */}
          <div className="mb-8">
            <Link
              href="/services"
              className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-steel-400 backdrop-blur-md transition-all hover:border-copper-400 hover:text-white"
            >
              <ArrowLeft
                size={14}
                className="transition-transform duration-300 group-hover:-translate-x-1"
              />
              <span>Back to All Services</span>
            </Link>
          </div>

          <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            {/* Left Header Content */}
            <div className="transition-all duration-500">
              <div className="mb-6 flex items-center gap-3">
                <span className="h-px w-10 bg-copper-500" />
                <span className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-copper-400">
                  {service.number} // {service.eyebrow}
                </span>
              </div>

              <h1 className="font-display text-5xl uppercase leading-[0.92] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
                {service.title}
                <span className="block bg-gradient-to-r from-copper-400 via-copper-300 to-copper-500 bg-clip-text text-transparent">
                  {service.accentTitle}
                </span>
              </h1>

              <div className="mt-8 border-l-2 border-copper-500/60 pl-5">
                <p className="max-w-2xl text-base leading-relaxed text-steel-300 md:text-lg">
                  {service.description}
                </p>
              </div>

              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-copper-600 via-copper-500 to-copper-600 px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] text-white shadow-lg shadow-copper-500/25 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-copper-500/35"
                >
                  <span>Discuss Your Project</span>
                  <ArrowRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>

                <Link
                  href="/projects"
                  className="inline-flex items-center gap-3 rounded-xl border border-white/20 bg-white/5 px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] text-steel-200 backdrop-blur-sm transition-all duration-300 hover:border-copper-400 hover:bg-white/10 hover:text-white"
                >
                  View Projects
                </Link>
              </div>
            </div>

            {/* Right Telemetry Badge Cockpit */}
            <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-br from-white/[0.08] via-white/[0.03] to-transparent p-8 shadow-[0_25px_60px_rgba(0,0,0,0.45)] backdrop-blur-xl">
              {/* CAD Crosshairs */}
              <div className="pointer-events-none absolute left-3 top-3 h-3 w-3 border-l-2 border-t-2 border-copper-400/50" />
              <div className="pointer-events-none absolute right-3 top-3 h-3 w-3 border-r-2 border-t-2 border-copper-400/50" />
              <div className="pointer-events-none absolute bottom-3 left-3 h-3 w-3 border-b-2 border-l-2 border-copper-400/50" />
              <div className="pointer-events-none absolute bottom-3 right-3 h-3 w-3 border-b-2 border-r-2 border-copper-400/50" />

              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-copper-500/30 bg-copper-500/15 text-copper-400 shadow-inner">
                  <Icon size={28} strokeWidth={1.8} />
                </div>

                <div className="text-right">
                  <span className="font-mono text-xs font-semibold text-copper-400">
                    DISCIPLINE CODE
                  </span>
                  <p className="font-display text-4xl text-white">
                    {service.number}
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-copper-400">
                  STANDARD COMPLIANCE
                </p>
                <h3 className="mt-1 text-lg font-bold text-white">
                  AISC &amp; NISD Detailing Protocol
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-steel-400">
                  Engineered with intelligent parametric 3D models ready for CNC
                  extraction and multi-discipline clash coordination.
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4 text-xs text-steel-300">
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  <span>Available for Active RFQs</span>
                </div>
                <span className="font-mono text-[10px] text-white/40">
                  LOD 350-400
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom accent gradient beam */}
        <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-copper-500/60 to-transparent" />
      </section>

      {/* =====================================================
          OVERVIEW PHILOSOPHY
      ===================================================== */}
      <section className="relative z-20 -mt-8 px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-3xl border border-steel-200/90 bg-white p-8 shadow-[0_15px_40px_rgba(10,20,32,0.06)] md:p-12">
            <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
              <div>
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-copper-600">
                  SERVICE OVERVIEW
                </span>
                <h2 className="mt-3 font-display text-4xl uppercase leading-tight text-navy-950 sm:text-5xl">
                  Detail Built
                  <span className="block bg-gradient-to-r from-copper-600 to-copper-500 bg-clip-text text-transparent">
                    Around Requirements.
                  </span>
                </h2>
              </div>

              <div>
                <p className="text-base leading-relaxed text-steel-700 md:text-lg">
                  Kenz Engineering approaches every service with a focus on
                  accuracy, coordination, fabrication requirements, and clear
                  project communication.
                </p>

                <div className="mt-8 grid gap-3 sm:grid-cols-3">
                  <div className="flex items-center gap-3 rounded-xl border border-steel-200 bg-steel-50/50 p-4">
                    <Ruler size={18} className="text-copper-600 shrink-0" />
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-navy-950">
                        Precision
                      </p>
                      <p className="text-[10px] text-steel-500">Fabrication-First</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 rounded-xl border border-steel-200 bg-steel-50/50 p-4">
                    <Layers3 size={18} className="text-copper-600 shrink-0" />
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-navy-950">
                        Coordination
                      </p>
                      <p className="text-[10px] text-steel-500">Zero-Clash Model</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 rounded-xl border border-steel-200 bg-steel-50/50 p-4">
                    <FileCheck2 size={18} className="text-copper-600 shrink-0" />
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-navy-950">
                        Documentation
                      </p>
                      <p className="text-[10px] text-steel-500">Clear Drawing Sets</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          TECHNICAL CAPABILITIES WORKBENCH
      ===================================================== */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-copper-200 bg-copper-50 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-copper-700">
              <Sparkles size={13} className="text-copper-600" />
              <span>What We Provide</span>
            </div>

            <h2 className="mt-4 font-display text-4xl uppercase leading-[0.95] text-navy-950 sm:text-5xl md:text-6xl">
              Technical
              <span className="block bg-gradient-to-r from-copper-600 to-copper-500 bg-clip-text text-transparent">
                Capabilities
              </span>
            </h2>

            <p className="mt-4 max-w-2xl text-base leading-relaxed text-steel-700">
              Service capabilities can be adapted to the project scope,
              detailing standards, schedule, and coordination requirements.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {service.capabilities.map((item, index) => (
              <div
                key={item}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-steel-200/90 bg-white p-7 shadow-sm transition-all duration-300 hover:border-copper-400 hover:shadow-lg hover:-translate-y-1"
              >
                {/* Laser top accent */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-copper-500 to-copper-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-copper-600">
                      {(index + 1).toString().padStart(2, "0")}
                    </span>
                    <CheckCircle2
                      size={18}
                      className="text-steel-300 transition-colors group-hover:text-copper-500"
                    />
                  </div>

                  <h3 className="mt-6 text-base font-bold uppercase tracking-wide text-navy-950 group-hover:text-copper-600 transition-colors">
                    {item}
                  </h3>
                </div>

                <div className="mt-6 border-t border-steel-100 pt-3 text-[11px] font-mono text-steel-400">
                  STANDARD EXECUTION
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          DELIVERABLES + APPLICATIONS (DUAL HIGH-CONTRAST CONSOLES)
      ===================================================== */}
      <section className="border-t border-steel-200/80 bg-white py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Deliverables Console (Light Architectural) */}
            <div className="relative overflow-hidden rounded-3xl border border-steel-200/90 bg-[#fafbfc] p-8 shadow-sm md:p-12 transition-all hover:shadow-md">
              <div className="flex h-13 w-13 items-center justify-center rounded-2xl bg-navy-950 text-copper-400 shadow-md">
                <FileCheck2 size={24} />
              </div>

              <p className="mt-7 font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-copper-600">
                OUTPUT SPECIFICATION
              </p>

              <h2 className="mt-2 font-display text-3xl uppercase text-navy-950 sm:text-4xl">
                Project Deliverables &amp; Documentation
              </h2>

              <ul className="mt-8 space-y-3.5">
                {service.deliverables.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 rounded-xl border border-steel-200/80 bg-white p-3.5 text-xs font-medium text-steel-800 shadow-sm transition-all hover:border-copper-400"
                  >
                    <CheckCircle2
                      size={16}
                      className="mt-0.5 shrink-0 text-copper-500"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Applications Console (Dark Navy Cockpit) */}
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-navy-950 p-8 text-white shadow-2xl md:p-12 transition-all">
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.04]"
                style={{
                  backgroundImage: `linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)`,
                  backgroundSize: "36px 36px",
                }}
              />

              <div className="relative z-10 flex h-13 w-13 items-center justify-center rounded-2xl bg-copper-500 text-white shadow-lg">
                <Layers3 size={24} />
              </div>

              <p className="relative z-10 mt-7 font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-copper-400">
                PRACTICAL DEPLOYMENT
              </p>

              <h2 className="relative z-10 mt-2 font-display text-3xl uppercase text-white sm:text-4xl">
                Where It Supports Projects
              </h2>

              <ul className="relative z-10 mt-8 space-y-3.5">
                {service.applications.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-3.5 text-xs text-steel-300 backdrop-blur-sm transition-all hover:border-copper-400 hover:text-white"
                  >
                    <ArrowRight
                      size={15}
                      className="mt-0.5 shrink-0 text-copper-400"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          PROCESS (STRUCTURED FOR DELIVERY)
      ===================================================== */}
      <section className="border-t border-steel-200/80 bg-[#fafbfc] py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div className="lg:sticky lg:top-32">
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-copper-600">
                EXECUTION FLOW
              </span>
              <h2 className="mt-3 font-display text-4xl uppercase leading-tight text-navy-950 sm:text-5xl">
                Structured
                <span className="block bg-gradient-to-r from-copper-600 to-copper-500 bg-clip-text text-transparent">
                  For Delivery.
                </span>
              </h2>

              <p className="mt-6 text-base leading-relaxed text-steel-700">
                We structure our workflow around the information and
                coordination required to move from project inputs to usable
                technical deliverables.
              </p>
            </div>

            <div className="space-y-4">
              {service.process.map((item) => (
                <div
                  key={item.number}
                  className="group rounded-2xl border border-steel-200/90 bg-white p-6 shadow-sm transition-all duration-300 hover:border-copper-400 hover:bg-copper-50/20"
                >
                  <div className="flex items-start gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-navy-950 font-mono text-xs font-bold text-white transition-colors group-hover:bg-copper-500">
                      {item.number}
                    </span>

                    <div>
                      <h3 className="font-display text-2xl uppercase tracking-wide text-navy-950 group-hover:text-copper-600 transition-colors">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-xs leading-relaxed text-steel-700">
                        {item.text}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          BOTTOM CINEMATIC CTA
      ===================================================== */}
      <section className="relative overflow-hidden bg-navy-950 px-6 py-20 text-white md:py-24">
        <div className="relative mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-br from-copper-600 via-copper-500 to-[#8c4614] p-8 shadow-2xl md:p-14 lg:p-16">
            <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-white/80">
                  Start A Conversation
                </p>
                <h2 className="mt-3 font-display text-4xl uppercase leading-[0.92] text-white sm:text-5xl lg:text-6xl">
                  Have A Project
                  <span className="block text-navy-950">
                    To Discuss?
                  </span>
                </h2>
                <p className="mt-6 max-w-2xl text-sm leading-relaxed text-white/90">
                  Tell us about your project requirements, schedule, scope, and
                  technical needs.
                </p>
              </div>

              <div className="shrink-0">
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-4 rounded-xl bg-white px-9 py-4 text-xs font-bold uppercase tracking-[0.2em] text-navy-950 shadow-md transition-all duration-300 hover:bg-navy-950 hover:text-white hover:scale-105"
                >
                  <span>Submit Project Inquiry</span>
                  <ArrowRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          SERVICE NAVIGATION FOOTER
      ===================================================== */}
      <section className="border-t border-steel-200 bg-white py-8">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            {previous ? (
              <Link
                href={previous.href}
                className="group flex items-center gap-3.5"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-steel-200 bg-steel-50 transition-colors group-hover:border-copper-500 group-hover:bg-copper-500 group-hover:text-white">
                  <ArrowLeft
                    size={16}
                    className="transition-transform group-hover:-translate-x-1"
                  />
                </div>

                <div>
                  <p className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-steel-400">
                    Previous Service
                  </p>
                  <p className="text-xs font-bold uppercase text-navy-950 transition-colors group-hover:text-copper-600">
                    {previous.title}
                  </p>
                </div>
              </Link>
            ) : (
              <div />
            )}

            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-xl border border-steel-200 bg-steel-50 px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-copper-600 transition-colors hover:border-copper-500 hover:bg-copper-50 hover:text-copper-700"
            >
              <Boxes size={14} />
              <span>All 6 Services Hub</span>
            </Link>

            {next ? (
              <Link
                href={next.href}
                className="group flex items-center justify-end gap-3.5 text-right"
              >
                <div>
                  <p className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-steel-400">
                    Next Service
                  </p>
                  <p className="text-xs font-bold uppercase text-navy-950 transition-colors group-hover:text-copper-600">
                    {next.title}
                  </p>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-steel-200 bg-steel-50 transition-colors group-hover:border-copper-500 group-hover:bg-copper-500 group-hover:text-white">
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1"
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