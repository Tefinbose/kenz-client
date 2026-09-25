import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
  Mail,
  Users,
} from "lucide-react";

const values = [
  "Technical capability",
  "Attention to detail",
  "Continuous improvement",
  "Collaboration",
  "Accuracy",
  "Quality",
];

export default function CareersPage() {
  return (
    <main className="bg-paper">
      <section className="bg-navy-950 text-white">
        <div className="mx-auto max-w-7xl px-6 pb-24 pt-40 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-copper-400">
            03 / Careers
          </p>

          <h1 className="mt-6 max-w-5xl font-display text-5xl uppercase leading-[0.95] sm:text-6xl lg:text-8xl">
            Build Your Career Around
            <br />
            <span className="text-copper-400">
              Engineering Excellence.
            </span>
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-steel-400">
            Kenz Engineering values professionals who understand accuracy,
            quality, technical capability, and the importance of collaboration
            in steel detailing and engineering support.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2">
          <div>
            <BriefcaseBusiness className="h-9 w-9 text-copper-600" />

            <h2 className="mt-7 font-display text-4xl uppercase text-navy-950 sm:text-5xl">
              Grow With
              <br />
              Technical Purpose
            </h2>
          </div>

          <div className="space-y-6 leading-8 text-steel-700">
            <p>
              Our work is built around technical capability, attention to
              detail, continuous improvement, and collaboration.
            </p>

            <p>
              As Kenz Engineering grows, we are interested in professionals
              who want to contribute to accurate, dependable engineering
              support and develop their capabilities within a technical
              environment.
            </p>

            <p>
              Specific openings and role requirements can be published here as
              positions become available.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-steel-200">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-copper-600">
            What We Value
          </p>

          <div className="mt-10 grid gap-px bg-steel-400/30 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((value, index) => (
              <div key={value} className="bg-paper p-8">
                <span className="font-mono text-xs text-copper-600">
                  0{index + 1}
                </span>
                <h3 className="mt-12 font-display text-2xl uppercase text-navy-950">
                  {value}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy-900 text-white">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[1fr_auto] lg:items-center lg:px-8">
          <div>
            <Users className="h-8 w-8 text-copper-400" />
            <h2 className="mt-6 font-display text-4xl uppercase sm:text-5xl">
              Interested in Joining the Team?
            </h2>
            <p className="mt-5 max-w-2xl leading-7 text-steel-400">
              Send your resume and relevant experience to our team.
            </p>
          </div>

          <Link
            href="mailto:sales@kenzengineering.com?subject=Career%20Application"
            className="inline-flex items-center justify-center gap-3 border border-copper-500 px-7 py-4 text-xs font-bold uppercase tracking-[0.18em] transition hover:bg-copper-600"
          >
            <Mail className="h-4 w-4" />
            Submit Your Resume
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}