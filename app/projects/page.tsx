import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const projectTypes = [
  "Structural Steel Detailing",
  "Miscellaneous Steel",
  "Joist & Deck Detailing",
  "BIM Support",
  "Connection Detailing",
  "Estimation & Material Take-Off",
];

const process = [
  ["01", "Understand", "Project requirements, standards, schedules, and scope."],
  ["02", "Coordinate", "Coordinate project information and technical requirements."],
  ["03", "Model", "Develop coordinated 3D project information."],
  ["04", "Detail", "Prepare detailed project documentation."],
  ["05", "Deliver", "Provide organized deliverables aligned with project needs."],
];

export default function ProjectsPage() {
  return (
    <main className="bg-paper">
      <section className="bg-navy-950 text-white">
        <div className="mx-auto max-w-7xl px-6 pb-24 pt-40 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-copper-400">
            02 / Project Experience
          </p>

          <h1 className="mt-6 max-w-5xl font-display text-5xl uppercase leading-[0.95] sm:text-6xl lg:text-8xl">
            Detailing Built Around
            <br />
            <span className="text-copper-400">Project Requirements.</span>
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-steel-400">
            Every project brings its own detailing standards, coordination
            requirements, schedules, fabrication needs, and technical
            challenges.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-copper-600">
              Project Approach
            </p>
            <h2 className="mt-5 font-display text-4xl uppercase text-navy-950 sm:text-5xl">
              A Structured
              <br />
              Delivery Process
            </h2>
          </div>

          <div className="space-y-0">
            {process.map(([number, title, description]) => (
              <div
                key={number}
                className="grid gap-5 border-b border-steel-200 py-7 md:grid-cols-[70px_180px_1fr]"
              >
                <span className="font-mono text-sm text-copper-600">
                  {number}
                </span>

                <h3 className="font-display text-2xl uppercase text-navy-950">
                  {title}
                </h3>

                <p className="leading-7 text-steel-700">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy-900 text-white">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-copper-400">
            Project Portfolio
          </p>

          <h2 className="mt-5 max-w-3xl font-display text-4xl uppercase sm:text-5xl">
            Technical Capabilities Across the Steel Lifecycle
          </h2>

          <div className="mt-14 grid gap-px bg-steel-700/40 md:grid-cols-2 lg:grid-cols-3">
            {projectTypes.map((project, index) => (
              <div
                key={project}
                className="group bg-navy-900 p-8 transition hover:bg-navy-800"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-copper-400">
                    0{index + 1}
                  </span>
                  <ArrowRight className="h-4 w-4 text-steel-500 transition group-hover:translate-x-1 group-hover:text-copper-400" />
                </div>

                <h3 className="mt-16 font-display text-2xl uppercase">
                  {project}
                </h3>
              </div>
            ))}
          </div>

          <div className="mt-10 flex gap-3 border border-copper-600/40 bg-navy-950 p-5 text-sm text-steel-400">
            <CheckCircle2 className="h-5 w-5 shrink-0 text-copper-400" />
            <p>
              Selected project case studies can be added here as actual
              projects, drawings, images, or client-approved portfolio
              information become available.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-copper-600 text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-7 px-6 py-16 md:flex-row md:items-center md:justify-between lg:px-8">
          <h2 className="font-display text-4xl uppercase sm:text-5xl">
            Have a Project to Discuss?
          </h2>

          <Link
            href="/contact"
            className="inline-flex items-center gap-3 border border-white px-7 py-4 text-xs font-bold uppercase tracking-[0.18em] transition hover:bg-white hover:text-copper-600"
          >
            Start a Conversation
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}