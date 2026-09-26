"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  ArrowUp,
  ArrowUpRight,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

const services = [
  {
    name: "Steel Detailing",
    href: "/services/steel-detailing",
  },
  {
    name: "Miscellaneous Detailing",
    href: "/services/miscellaneous-detailing",
  },
  {
    name: "Connection & Delegated Design",
    href: "/services/connection-design",
  },
  {
    name: "Joist & Deck Detailing",
    href: "/services/joist-deck",
  },
  {
    name: "BIM Support",
    href: "/services/bim-support",
  },
  {
    name: "Estimation & Material Take-Off",
    href: "/services/estimation",
  },
];

// "Services" has its own column, so it is left out here.
const company = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Projects", href: "/projects" },
  { name: "Accolades", href: "/accolades" },
  { name: "Careers", href: "/careers" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

const values = [
  "Precision",
  "Reliability",
  "Innovation",
  "Excellence",
];

const focusRing =
  "rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper-400 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-950";

const linkClass = `inline-flex items-center gap-1.5 text-sm text-steel-400 transition-colors hover:text-white ${focusRing}`;

const iconBox =
  "grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/5 text-copper-400 transition-colors";

export default function Footer() {
  const pathname = usePathname();
  const router = useRouter();

  const handleHomeNavigation = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (e.button !== 0 || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) {
      return;
    }

    if (pathname === "/") {
      e.preventDefault();
      const hero = document.getElementById("home");
      if (hero) {
        hero.scrollIntoView({ behavior: "smooth" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else {
      e.preventDefault();
      router.push("/");
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  };

  const handleBackToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <footer className="bg-navy-950 text-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* CTA PANEL */}
        <div className="pt-20">
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.02] px-8 py-10 md:px-12 md:py-12">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-copper-500/20 blur-3xl"
            />

            <div className="relative flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
              <div className="max-w-xl">
                <h2 className="font-display text-3xl leading-tight text-white sm:text-4xl">
                  Have a project to discuss?
                </h2>

                <p className="mt-3 text-sm leading-7 text-steel-400">
                  Tell us about your structural steel detailing needs
                  and our team will get back to you.
                </p>
              </div>

              <Link
                href="/contact"
                className={`group inline-flex w-fit shrink-0 items-center gap-2.5 rounded-lg bg-copper-500 px-6 py-3.5 text-sm font-bold text-navy-950 transition-colors hover:bg-copper-400 ${focusRing}`}
              >
                Start a project
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* LINK COLUMNS */}
        <div className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.4fr_0.7fr_1fr_1.1fr]">
          {/* BRAND */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link
              href="/"
              onClick={handleHomeNavigation}
              aria-label="Kenz Engineering LLC — home"
              className={`relative block h-[84px] w-[235px] cursor-pointer overflow-hidden ${focusRing}`}
            >
              <Image
                src="/kenz-logo.png"
                alt="Kenz Engineering LLC"
                width={300}
                height={180}
                className="absolute left-[-5px] top-1/2 h-auto w-[260px] max-w-none -translate-y-1/2 brightness-[1.12] contrast-[1.08]"
              />
            </Link>

            <p className="mt-6 max-w-sm text-sm leading-7 text-steel-400">
              Structural steel detailing and engineering support
              built around accuracy, coordination, modern BIM
              workflows, and dependable communication.
            </p>

            <ul className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs font-medium text-steel-500">
              {values.map((value, index) => (
                <li key={value} className="flex items-center gap-3">
                  {index > 0 && (
                    <span
                      aria-hidden="true"
                      className="h-3 w-px bg-copper-500/50"
                    />
                  )}
                  {value}
                </li>
              ))}
            </ul>
          </div>

          {/* COMPANY */}
          <nav aria-label="Company">
            <h3 className="text-sm font-semibold text-white">
              Company
            </h3>

            <ul className="mt-6 flex flex-col gap-3.5">
              {company.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={item.href === "/" ? handleHomeNavigation : undefined}
                    className={linkClass}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* SERVICES */}
          <nav aria-label="Services">
            <h3 className="text-sm font-semibold text-white">
              Services
            </h3>

            <ul className="mt-6 flex flex-col gap-3.5">
              {services.map((service) => (
                <li key={service.href}>
                  <Link
                    href={service.href}
                    className={linkClass}
                  >
                    {service.name}
                  </Link>
                </li>
              ))}

              <li className="pt-1">
                <Link
                  href="/services"
                  className={`group inline-flex items-center gap-1.5 text-sm font-semibold text-copper-400 transition-colors hover:text-copper-500 ${focusRing}`}
                >
                  View all services
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              </li>
            </ul>
          </nav>

          {/* CONTACT */}
          <div>
            <h3 className="text-sm font-semibold text-white">
              Contact
            </h3>

            <ul className="mt-6 flex flex-col gap-5">
              <li className="flex items-start gap-3.5">
                <span className={iconBox}>
                  <MapPin className="h-4 w-4" />
                </span>

                <address className="pt-0.5 text-sm not-italic leading-6 text-steel-400">
                  30 N Gould St #37010
                  <br />
                  Sheridan, WY 82801
                  <br />
                  USA
                </address>
              </li>

              <li>
                <a
                  href="tel:+917994040464"
                  className={`group flex items-center gap-3.5 text-sm text-steel-400 transition-colors hover:text-white ${focusRing}`}
                >
                  <span
                    className={`${iconBox} group-hover:border-copper-500/60`}
                  >
                    <Phone className="h-4 w-4" />
                  </span>
                  +91 799 404 0464
                </a>
              </li>

              <li>
                <a
                  href="mailto:sales@kenzengineering.com"
                  className={`group flex items-center gap-3.5 text-sm text-steel-400 transition-colors hover:text-white ${focusRing}`}
                >
                  <span
                    className={`${iconBox} group-hover:border-copper-500/60`}
                  >
                    <Mail className="h-4 w-4" />
                  </span>
                  <span className="break-all">
                    sales@kenzengineering.com
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="flex flex-col gap-4 border-t border-white/10 py-6 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-steel-500">
            © {new Date().getFullYear()} Kenz Engineering LLC. All
            rights reserved.
          </p>

          <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-8">
            <p className="text-xs text-steel-500">
              Engineering detail. Practical solutions. Reliable
              support.
            </p>

            <button
              type="button"
              onClick={handleBackToTop}
              className={`group inline-flex w-fit items-center gap-2 text-xs font-medium text-steel-400 transition-colors hover:text-white ${focusRing}`}
            >
              Back to top
              <span className="grid h-7 w-7 place-items-center rounded-full border border-white/15 transition-colors group-hover:border-copper-500 group-hover:text-copper-400">
                <ArrowUp className="h-3.5 w-3.5" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}