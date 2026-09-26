import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronRight,
  FileText,
  FolderOpen,
  Grid3x3,
  LayoutGrid,
  MoveRight,
  Package,
  LucideIcon,
  CircleDot,
  Milestone,
  Building2,
  ClipboardList,
  CornerDownRight,
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
    <main className="min-h-screen bg-[#f7f8fa] text-ink overflow-hidden">
      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-navy-950 text-white pt-40 pb-28 lg:pb-36">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.028]"
          style={{
            backgroundImage: `
              linear-gradient(#ffffff 1px, transparent 1px),
              linear-gradient(90deg, #ffffff 1px, transparent 1px)
            `,
            backgroundSize: "52px 52px",
          }}
        />

        <div className="pointer-events-none absolute -left-56 top-1/3 h-[600px] w-[600px] rounded-full bg-copper-500/10 blur-[160px]" />
        <div className="pointer-events-none absolute right-0 top-0 h-[400px] w-[400px] rounded-full bg-copper-600/8 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="mb-10">
            <Link
              href="/services"
              className="group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-steel-400 transition-colors hover:text-white"
            >
              <ArrowLeft
                size={13}
                className="transition-transform duration-300 group-hover:-translate-x-1"
              />
              <span>All Services</span>
              <span className="mx-1 text-steel-600">/</span>
              <span className="text-copper-400">{service.eyebrow}</span>
            </Link>
          </div>

          <div className="grid gap-16 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            {/* Left – headline block */}
            <div>
              <div className="mb-7 inline-flex items-center gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-full border border-copper-500/40 bg-copper-500/15 font-mono text-[11px] font-bold text-copper-400">
                  {service.number}
                </span>
                <span className="h-px w-8 bg-copper-500/50" />
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-copper-400">
                  {service.eyebrow}
                </span>
              </div>

              <h1 className="font-display text-5xl uppercase leading-[0.9] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
                {service.title}
                <span className="block bg-gradient-to-r from-copper-400 via-copper-300 to-copper-500 bg-clip-text text-transparent">
                  {service.accentTitle}
                </span>
              </h1>

              <p className="mt-8 max-w-xl text-base leading-relaxed text-steel-300 md:text-lg">
                {service.description}
              </p>

              <div className="mt-10 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2.5 rounded-xl bg-copper-500 px-7 py-3.5 text-xs font-bold uppercase tracking-[0.18em] text-white shadow-lg shadow-copper-500/25 transition-all duration-300 hover:bg-copper-400 hover:shadow-xl hover:shadow-copper-500/30 hover:-translate-y-0.5"
                >
                  <span>Discuss This Service</span>
                  <ArrowRight
                    size={14}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>

                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2.5 rounded-xl border border-white/15 px-7 py-3.5 text-xs font-bold uppercase tracking-[0.18em] text-steel-300 transition-all duration-300 hover:border-white/30 hover:text-white"
                >
                  View Projects
                </Link>
              </div>
            </div>

            {/* Right – compact stat panel */}
            <div className="flex flex-col gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-md">
              <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-copper-500/25 bg-copper-500/10 text-copper-400">
                    <Icon size={22} strokeWidth={1.7} />
                  </div>
                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-steel-500">
                      Discipline
                    </p>
                    <p className="text-sm font-bold text-white">
                      {service.eyebrow}
                    </p>
                  </div>
                </div>
                <span className="font-mono text-4xl font-bold text-white/15">
                  {service.number}
                </span>
              </div>

              {[
                {
                  label: "Capabilities",
                  value: `${service.capabilities.length} Areas`,
                  icon: Grid3x3,
                },
                {
                  label: "Deliverables",
                  value: `${service.deliverables.length} Outputs`,
                  icon: Package,
                },
                {
                  label: "Applications",
                  value: `${service.applications.length} Use Cases`,
                  icon: Building2,
                },
                {
                  label: "Process Steps",
                  value: `${service.process.length} Phases`,
                  icon: Milestone,
                },
              ].map(({ label, value, icon: StatIcon }) => (
                <div
                  key={label}
                  className="flex items-center justify-between px-6 py-3.5 transition-colors hover:bg-white/[0.03]"
                >
                  <div className="flex items-center gap-2.5">
                    <StatIcon size={13} className="text-steel-500" />
                    <span className="text-xs text-steel-400">{label}</span>
                  </div>
                  <span className="font-mono text-xs font-semibold text-copper-400">
                    {value}
                  </span>
                </div>
              ))}

              <div className="flex items-center gap-2 border-t border-white/10 px-6 py-3.5">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                <span className="text-[11px] text-steel-400">
                  Available for project inquiries
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-copper-500/60 to-transparent" />
      </section>

      {/* ── CAPABILITIES ──────────────────────────────────────────────── */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <LayoutGrid size={13} className="text-copper-600" />
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-copper-600">
                What We Provide
              </span>
            </div>
            <h2 className="font-display text-4xl uppercase leading-tight text-navy-950 sm:text-5xl">
              Service{" "}
              <span className="bg-gradient-to-r from-copper-600 to-copper-500 bg-clip-text text-transparent">
                Capabilities
              </span>
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-steel-600">
              These capabilities are adapted to each project&apos;s scope,
              detailing standards, schedule, and coordination requirements.
            </p>
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {service.capabilities.map((item, index) => (
              <div
                key={item}
                className="group flex items-start gap-4 rounded-xl border border-steel-200 bg-white p-5 shadow-sm transition-all duration-250 hover:border-copper-400 hover:shadow-md"
              >
                <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-copper-500/25 bg-copper-50 text-copper-500 transition-colors group-hover:bg-copper-500 group-hover:text-white group-hover:border-copper-500">
                  <Check size={12} strokeWidth={2.5} />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-semibold leading-snug text-navy-950 group-hover:text-copper-600 transition-colors">
                      {item}
                    </p>
                    <span className="shrink-0 font-mono text-[10px] text-steel-300 group-hover:text-copper-400 transition-colors">
                      {(index + 1).toString().padStart(2, "0")}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DELIVERABLES & APPLICATIONS ───────────────────────────────── */}
      <section className="border-t border-steel-200/60 bg-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-10">
            <div className="mb-2 flex items-center gap-2">
              <FolderOpen size={13} className="text-copper-600" />
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-copper-600">
                Scope Detail
              </span>
            </div>
            <h2 className="font-display text-4xl uppercase leading-tight text-navy-950 sm:text-5xl">
              Outputs &amp;{" "}
              <span className="bg-gradient-to-r from-copper-600 to-copper-500 bg-clip-text text-transparent">
                Applications
              </span>
            </h2>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <div className="mb-5 flex items-center gap-2.5">
                <FileText size={14} className="text-copper-600" />
                <h3 className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-navy-950">
                  Project Deliverables
                </h3>
              </div>
              <div className="space-y-2.5">
                {service.deliverables.map((item, i) => (
                  <div
                    key={item}
                    className="group flex items-center gap-3.5 rounded-xl border border-steel-200 bg-[#fafbfc] p-4 transition-all hover:border-copper-400 hover:bg-white hover:shadow-sm"
                  >
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-steel-200 bg-white text-copper-500 transition-all group-hover:border-copper-500 group-hover:bg-copper-500 group-hover:text-white">
                      <ClipboardList size={13} />
                    </div>
                    <p className="text-sm font-medium leading-snug text-navy-950">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="mb-5 flex items-center gap-2.5">
                <Building2 size={14} className="text-copper-600" />
                <h3 className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-navy-950">
                  Where It Applies
                </h3>
              </div>
              <div className="space-y-2.5">
                {service.applications.map((item, i) => (
                  <div
                    key={item}
                    className="group flex items-center gap-3.5 rounded-xl border border-steel-200 bg-[#fafbfc] p-4 transition-all hover:border-copper-400 hover:bg-white hover:shadow-sm"
                  >
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-steel-200 bg-white text-copper-500 transition-all group-hover:border-copper-500 group-hover:bg-copper-500 group-hover:text-white">
                      <CornerDownRight size={13} />
                    </div>
                    <p className="text-sm font-medium leading-snug text-navy-950">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROCESS ───────────────────────────────────────────────────── */}
      <section className="border-t border-steel-200/60 bg-[#f7f8fa] py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div className="lg:sticky lg:top-32">
              <div className="mb-2 flex items-center gap-2">
                <CircleDot size={13} className="text-copper-600" />
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-copper-600">
                  How We Work
                </span>
              </div>
              <h2 className="font-display text-4xl uppercase leading-tight text-navy-950 sm:text-5xl">
                Project{" "}
                <span className="block bg-gradient-to-r from-copper-600 to-copper-500 bg-clip-text text-transparent">
                  Process
                </span>
              </h2>

              <p className="mt-5 text-sm leading-relaxed text-steel-600">
                Our process is structured around understanding project
                information first, then coordinating, modeling, and delivering
                technical documentation that meets fabrication requirements.
              </p>

              <div className="mt-8 rounded-xl border border-copper-200 bg-copper-50/60 p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-copper-700">
                  Communication Throughout
                </p>
                <p className="mt-1.5 text-xs leading-relaxed text-copper-800/70">
                  We maintain consistent communication at each stage to ensure
                  the project scope and schedule are being met.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute left-[21px] top-12 bottom-12 w-px bg-gradient-to-b from-copper-400/50 via-copper-300/30 to-transparent" />

              <div className="space-y-3">
                {service.process.map((item, i) => (
                  <div
                    key={item.number}
                    className="group relative flex items-start gap-5 rounded-xl border border-steel-200 bg-white p-5 shadow-sm transition-all duration-300 hover:border-copper-400 hover:shadow-md"
                  >
                    <div className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-steel-200 bg-white font-mono text-xs font-bold text-steel-500 shadow-sm transition-all group-hover:border-copper-500 group-hover:bg-copper-500 group-hover:text-white">
                      {item.number}
                    </div>

                    <div className="flex-1 pt-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-display text-xl uppercase tracking-wide text-navy-950 transition-colors group-hover:text-copper-600">
                          {item.title}
                        </h3>
                        <ChevronRight
                          size={14}
                          className="text-steel-300 transition-all group-hover:translate-x-1 group-hover:text-copper-500"
                        />
                      </div>
                      <p className="mt-1.5 text-xs leading-relaxed text-steel-600">
                        {item.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────── */}
      <section className="border-t border-steel-200/60 bg-navy-950 py-20 text-white md:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.3em] text-copper-400">
                Kenz Engineering LLC
              </p>
              <h2 className="font-display text-4xl uppercase leading-[0.92] sm:text-5xl">
                Ready to discuss
                <span className="block text-copper-400">your project?</span>
              </h2>
              <p className="mt-5 max-w-lg text-sm leading-relaxed text-steel-400">
                Tell us about your project requirements, schedule, scope, and
                technical needs — and we&apos;ll take it from there.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-3 rounded-xl bg-copper-500 px-7 py-4 text-xs font-bold uppercase tracking-[0.18em] text-white shadow-lg shadow-copper-500/20 transition-all duration-300 hover:bg-copper-400 hover:-translate-y-0.5"
              >
                <span>Start a Project</span>
                <MoveRight
                  size={15}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>

              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 px-7 py-4 text-xs font-bold uppercase tracking-[0.18em] text-steel-300 transition-all duration-300 hover:border-white/30 hover:text-white"
              >
                All Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICE NAVIGATION ────────────────────────────────────────── */}
      <nav className="border-t border-steel-200 bg-white py-6">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex items-center justify-between gap-6">
            {previous ? (
              <Link
                href={previous.href}
                className="group flex items-center gap-3"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-steel-200 bg-steel-50 transition-all group-hover:border-copper-500 group-hover:bg-copper-500 group-hover:text-white">
                  <ArrowLeft
                    size={15}
                    className="transition-transform group-hover:-translate-x-0.5"
                  />
                </div>
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-steel-400">
                    Previous
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
              className="hidden items-center gap-2 rounded-lg border border-steel-200 bg-steel-50 px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-steel-600 transition-all hover:border-copper-500 hover:bg-copper-50 hover:text-copper-700 sm:inline-flex"
            >
              <Grid3x3 size={13} />
              <span>All Services</span>
            </Link>

            {next ? (
              <Link
                href={next.href}
                className="group flex items-center justify-end gap-3 text-right"
              >
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-steel-400">
                    Next
                  </p>
                  <p className="text-xs font-bold uppercase text-navy-950 transition-colors group-hover:text-copper-600">
                    {next.title}
                  </p>
                </div>
                <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-steel-200 bg-steel-50 transition-all group-hover:border-copper-500 group-hover:bg-copper-500 group-hover:text-white">
                  <ArrowRight
                    size={15}
                    className="transition-transform group-hover:translate-x-0.5"
                  />
                </div>
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      </nav>
    </main>
  );
}
