import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    number: "01",
    category: "Structural Steel",
    title: "Commercial Steel Framing",
    description:
      "Detailed structural steel modeling and fabrication-ready documentation supporting coordinated construction workflows.",
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1400&q=85",
  },
  {
    number: "02",
    category: "BIM Coordination",
    title: "Model-Based Coordination",
    description:
      "3D structural coordination and model-based workflows developed to improve project communication and constructability.",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=85",
  },
  {
    number: "03",
    category: "Industrial Steel",
    title: "Fabrication Support",
    description:
      "Detailed steel documentation developed around fabrication requirements, coordination, and erection needs.",
    image:
      "https://images.unsplash.com/photo-1516939884455-1445c8652f83?auto=format&fit=crop&w=1400&q=85",
  },
];

export default function ProjectsPreview() {
  return (
    <section className="bg-paper py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-14 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <div className="mb-6 flex items-center gap-4">
              <span className="h-px w-12 bg-copper-500" />

              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-copper-600">
                Selected Work
              </span>
            </div>

            <h2 className="font-display text-5xl uppercase leading-[0.95] text-navy-950 md:text-6xl lg:text-7xl">
              Detailing Built Around
              <span className="block text-copper-500">
                Project Requirements
              </span>
            </h2>
          </div>

          <Link
            href="/projects"
            className="inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.15em] text-navy-950 hover:text-copper-600"
          >
            View Projects
            <ArrowUpRight size={18} />
          </Link>
        </div>

        <div className="grid gap-7 lg:grid-cols-3">
          {projects.map((project) => (
            <article
              key={project.number}
              className="group overflow-hidden border border-steel-200 bg-white"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-navy-900">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{
                    backgroundImage: `url('${project.image}')`,
                  }}
                />

                <div className="absolute inset-0 bg-navy-950/30 transition-colors duration-500 group-hover:bg-navy-950/50" />

                <span className="absolute left-5 top-5 bg-navy-950 px-3 py-2 font-display text-sm text-copper-400">
                  {project.number}
                </span>
              </div>

              <div className="p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-copper-600">
                  {project.category}
                </p>

                <h3 className="mt-3 font-display text-3xl uppercase leading-tight text-navy-950">
                  {project.title}
                </h3>

                <p className="mt-4 text-sm leading-7 text-steel-700">
                  {project.description}
                </p>

                <Link
                  href="/projects"
                  className="mt-7 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.15em] text-navy-950 hover:text-copper-600"
                >
                  View Project
                  <ArrowUpRight size={16} />
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 border-t border-steel-200 pt-7">
          <p className="max-w-3xl text-sm leading-7 text-steel-700">
            Every project is approached around its specific detailing
            standards, coordination requirements, schedule, fabrication needs,
            and erection considerations.
          </p>
        </div>
      </div>
    </section>
  );
}