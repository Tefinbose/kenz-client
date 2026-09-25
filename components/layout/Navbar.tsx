"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties, SyntheticEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  ArrowUpRight,
  Box,
  Calculator,
  ChevronDown,
  GitMerge,
  Layers,
  Menu,
  Ruler,
  Wrench,
  X,
} from "lucide-react";

import styles from "./Navbar.module.css";

const services = [
  {
    name: "Steel Detailing",
    href: "/services/steel-detailing",
    description:
      "Structural steel modeling, shop drawings & erection drawings",
    icon: Ruler,
  },
  {
    name: "Miscellaneous Detailing",
    href: "/services/miscellaneous-detailing",
    description:
      "Miscellaneous steel components and fabrication detailing",
    icon: Wrench,
  },
  {
    name: "Connection & Delegated Design",
    href: "/services/connection-design",
    description:
      "Connection coordination and delegated design support",
    icon: GitMerge,
  },
  {
    name: "Joist & Deck Detailing",
    href: "/services/joist-deck",
    description:
      "Joist, deck and structural interface detailing",
    icon: Layers,
  },
  {
    name: "BIM Support",
    href: "/services/bim-support",
    description:
      "3D modeling, coordination and BIM workflows",
    icon: Box,
  },
  {
    name: "Estimation & Material Take-Off",
    href: "/services/estimation",
    description:
      "Quantity extraction and steel estimation support",
    icon: Calculator,
  },
];

const mainLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Projects", href: "/projects" },
  { name: "Careers", href: "/careers" },
  { name: "Contact", href: "/contact" },
];

// Links shown before / after the Services menu
const linksBefore = mainLinks.slice(0, 2);
const linksAfter = mainLinks.slice(2);

const stagger = (index: number) =>
  ({ "--i": index }) as CSSProperties;

type Indicator = {
  x: number;
  w: number;
  show: boolean;
  instant: boolean;
};

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] =
    useState(false);
  const [indicator, setIndicator] = useState<Indicator>({
    x: 0,
    w: 0,
    show: false,
    instant: true,
  });

  const headerRef = useRef<HTMLElement>(null);
  const topBarRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const indicatorShown = useRef(false);

  const isActive = (href: string) =>
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(`${href}/`);

  const servicesActive = isActive("/services");

  /* Sliding hover pill: one element that glides between links */
  const moveIndicator = (event: SyntheticEvent<HTMLElement>) => {
    const nav = navRef.current;
    if (!nav) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const navRect = nav.getBoundingClientRect();

    setIndicator({
      x: rect.left - navRect.left,
      w: rect.width,
      show: true,
      // first appearance snaps into place, later moves glide
      instant: !indicatorShown.current,
    });

    indicatorShown.current = true;
  };

  const hideIndicator = () =>
    setIndicator((current) => ({
      ...current,
      show: false,
      instant: false,
    }));

  /*
    Scroll behaviour (scroll-linked, no timed animation):
    - the thin top bar scrolls away with the page, so the main
      bar simply docks at the top of the screen
    - the bar never changes size and never hides
    - glass effect + reading-progress line
  */
  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;

      const y = Math.max(window.scrollY, 0);
      const topH = topBarRef.current?.offsetHeight ?? 0;

      if (headerRef.current) {
        headerRef.current.style.transform = `translateY(${-Math.min(
          y,
          topH
        )}px)`;
      }

      setScrolled(y > 40);

      const max =
        document.documentElement.scrollHeight -
        window.innerHeight;
      const ratio = max > 0 ? Math.min(y / max, 1) : 0;

      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${ratio})`;
      }
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  /* Close everything when the route changes */
  useEffect(() => {
    setMobileOpen(false);
    setMobileServicesOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  /* Lock body scroll while the mobile menu is open */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  /* Escape closes menus; leaving mobile breakpoint resets state */
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setServicesOpen(false);
        setMobileOpen(false);
      }
    };

    const onResize = () => {
      if (window.innerWidth > 900) setMobileOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  /* Tap / click outside closes the services menu */
  useEffect(() => {
    if (!servicesOpen) return;

    const onPointerDown = (event: PointerEvent) => {
      if (
        servicesRef.current &&
        !servicesRef.current.contains(event.target as Node)
      ) {
        setServicesOpen(false);
      }
    };

    document.addEventListener("pointerdown", onPointerDown);

    return () => {
      document.removeEventListener(
        "pointerdown",
        onPointerDown
      );
    };
  }, [servicesOpen]);

  const closeMobileMenu = () => {
    setMobileOpen(false);
    setMobileServicesOpen(false);
  };

  const handleHomeNavigation = (e: React.MouseEvent<HTMLAnchorElement>) => {
    closeMobileMenu();
    // Allow modifier clicks (Cmd+click, Ctrl+click, middle click) to open in new tab
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

  const renderDesktopLink = (
    link: { name: string; href: string },
    order: number
  ) => (
    <Link
      key={link.href}
      href={link.href}
      className={`${styles.navLink} ${styles.enter} ${
        isActive(link.href) ? styles.navLinkActive : ""
      }`}
      style={stagger(order)}
      aria-current={isActive(link.href) ? "page" : undefined}
      onMouseEnter={moveIndicator}
      onFocus={moveIndicator}
      onClick={link.href === "/" ? handleHomeNavigation : undefined}
    >
      {link.name}
    </Link>
  );

  return (
    <>
      {/*
        The header is fixed, so this spacer reserves its height in the
        page flow. Page content always starts BELOW the navbar.
        (Remove any top padding you added to compensate for the navbar.)
      */}
      <div className={styles.spacer} aria-hidden="true" />

      <header
        ref={headerRef}
        className={`${styles.navbar} ${
          scrolled ? styles.navbarScrolled : ""
        } ${mobileOpen ? styles.navbarOpen : ""}`}
      >
        {/* Top bar — scrolls away with the page */}
        <div
          ref={topBarRef}
          className={styles.topBar}
          aria-hidden="true"
        >
          <div className={styles.topBarInner}>
            <div className={styles.topBarLeft}>
              <span className={styles.statusDot} />
              <span>
                Structural steel detailing & engineering support
              </span>
            </div>

            <div className={styles.topBarRight}>
              <span>Precision</span>
              <span className={styles.topDivider} />
              <span>Reliability</span>
              <span className={styles.topDivider} />
              <span>Excellence</span>
            </div>
          </div>
        </div>

        {/* Main bar */}
        <div className={styles.mainNav}>
          <div className={styles.navInner}>
            <Link
              href="/"
              className={`${styles.logo} ${styles.enter}`}
              style={stagger(0)}
              onClick={handleHomeNavigation}
              aria-label="Kenz Engineering LLC — home"
            >
              <span className={styles.logoFrame}>
                <Image
                  src="/kenz-logo.png"
                  alt="Kenz Engineering LLC"
                  width={300}
                  height={180}
                  priority
                  className={styles.logoImage}
                />
              </span>
            </Link>

            {/* Desktop navigation */}
            <nav
              ref={navRef}
              className={styles.desktopNav}
              aria-label="Primary"
              onMouseLeave={hideIndicator}
              onBlur={(event) => {
                if (
                  !event.currentTarget.contains(
                    event.relatedTarget as Node | null
                  )
                ) {
                  hideIndicator();
                }
              }}
            >
              <span
                aria-hidden="true"
                className={`${styles.navIndicator} ${
                  indicator.show ? styles.navIndicatorShow : ""
                } ${
                  indicator.instant ? styles.navIndicatorInstant : ""
                }`}
                style={
                  {
                    "--x": `${indicator.x}px`,
                    "--w": `${indicator.w}px`,
                  } as CSSProperties
                }
              />

              {linksBefore.map((link, i) =>
                renderDesktopLink(link, i + 1)
              )}

              <div
                ref={servicesRef}
                className={`${styles.servicesWrapper} ${styles.enter}`}
                style={stagger(3)}
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
                onBlur={(event) => {
                  if (
                    !event.currentTarget.contains(
                      event.relatedTarget as Node | null
                    )
                  ) {
                    setServicesOpen(false);
                  }
                }}
              >
                <button
                  type="button"
                  className={`${styles.navLink} ${
                    servicesActive ? styles.navLinkActive : ""
                  } ${servicesOpen ? styles.navLinkOpen : ""}`}
                  // Mouse clicks keep the menu open (hover already opened it);
                  // keyboard activation (detail === 0) toggles it.
                  onClick={(event) =>
                    setServicesOpen(
                      event.detail === 0
                        ? (value) => !value
                        : true
                    )
                  }
                  onMouseEnter={moveIndicator}
                  onFocus={moveIndicator}
                  aria-expanded={servicesOpen}
                  aria-haspopup="true"
                  aria-controls="services-menu"
                >
                  <span>Services</span>

                  <ChevronDown
                    size={14}
                    className={`${styles.chevron} ${
                      servicesOpen ? styles.chevronOpen : ""
                    }`}
                  />
                </button>

                {/* Compact dropdown, anchored under the button */}
                <div
                  id="services-menu"
                  className={`${styles.dropdown} ${
                    servicesOpen ? styles.dropdownVisible : ""
                  }`}
                >
                  <div className={styles.dropdownPanel}>
                    <div className={styles.dropdownGrid}>
                      {services.map((service, index) => {
                        const Icon = service.icon;

                        return (
                          <Link
                            key={service.href}
                            href={service.href}
                            className={`${styles.serviceItem} ${
                              isActive(service.href)
                                ? styles.serviceItemActive
                                : ""
                            }`}
                            style={stagger(index)}
                            onClick={() =>
                              setServicesOpen(false)
                            }
                          >
                            <span className={styles.serviceIcon}>
                              <Icon size={18} strokeWidth={1.75} />
                            </span>

                            <span className={styles.serviceContent}>
                              <span className={styles.serviceName}>
                                {service.name}
                              </span>

                              <span
                                className={
                                  styles.serviceDescription
                                }
                              >
                                {service.description}
                              </span>
                            </span>
                          </Link>
                        );
                      })}
                    </div>

                    <div className={styles.dropdownFooter}>
                      <span>Engineering support services</span>

                      <Link
                        href="/services"
                        className={styles.viewAllServices}
                        onClick={() => setServicesOpen(false)}
                      >
                        View all services
                        <ArrowUpRight size={14} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {linksAfter.map((link, i) =>
                renderDesktopLink(link, i + 4)
              )}
            </nav>

            <Link
              href="/contact"
              className={`${styles.desktopCta} ${styles.enter}`}
              style={stagger(7)}
            >
              <span>Start a project</span>
              <ArrowUpRight size={16} />
            </Link>

            {/* Mobile toggle */}
            <button
              type="button"
              className={styles.mobileButton}
              onClick={() => setMobileOpen((value) => !value)}
              aria-label={
                mobileOpen
                  ? "Close navigation"
                  : "Open navigation"
              }
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Reading progress */}
        <span
          ref={progressRef}
          className={styles.progress}
          aria-hidden="true"
        />
      </header>

      {/* Mobile menu — sibling of the header so the header's blur
          layer and transform can never affect its fixed positioning */}
      <div
        id="mobile-menu"
        className={`${styles.mobileMenu} ${
          mobileOpen ? styles.mobileMenuOpen : ""
        }`}
      >
        <div className={styles.mobileMenuInner}>
          <nav className={styles.mobileNav} aria-label="Mobile">
            {[mainLinks[0], mainLinks[1]].map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                className={`${styles.mobileNavLink} ${styles.mobileItem} ${
                  isActive(link.href)
                    ? styles.mobileNavLinkActive
                    : ""
                }`}
                style={stagger(i)}
                onClick={link.href === "/" ? handleHomeNavigation : closeMobileMenu}
                aria-current={
                  isActive(link.href) ? "page" : undefined
                }
              >
                <strong>{link.name}</strong>
                <ArrowUpRight size={18} />
              </Link>
            ))}

            <div
              className={`${styles.mobileServices} ${styles.mobileItem}`}
              style={stagger(2)}
            >
              <button
                type="button"
                className={`${styles.mobileServicesButton} ${
                  servicesActive
                    ? styles.mobileNavLinkActive
                    : ""
                }`}
                onClick={() =>
                  setMobileServicesOpen((value) => !value)
                }
                aria-expanded={mobileServicesOpen}
              >
                <strong>Services</strong>

                <ChevronDown
                  size={18}
                  className={`${styles.mobileChevron} ${
                    mobileServicesOpen
                      ? styles.mobileChevronOpen
                      : ""
                  }`}
                />
              </button>

              <div
                className={`${styles.mobileServicesList} ${
                  mobileServicesOpen
                    ? styles.mobileServicesListOpen
                    : ""
                }`}
              >
                <div className={styles.mobileServicesInner}>
                  {services.map((service) => {
                    const Icon = service.icon;

                    return (
                      <Link
                        key={service.href}
                        href={service.href}
                        className={styles.mobileServiceLink}
                        onClick={closeMobileMenu}
                      >
                        <Icon size={16} strokeWidth={1.75} />
                        {service.name}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>

            {linksAfter.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                className={`${styles.mobileNavLink} ${styles.mobileItem} ${
                  isActive(link.href)
                    ? styles.mobileNavLinkActive
                    : ""
                }`}
                style={stagger(i + 3)}
                onClick={closeMobileMenu}
                aria-current={
                  isActive(link.href) ? "page" : undefined
                }
              >
                <strong>{link.name}</strong>
                <ArrowUpRight size={18} />
              </Link>
            ))}
          </nav>

          <div
            className={`${styles.mobileBottom} ${styles.mobileItem}`}
            style={stagger(6)}
          >
            <p>
              Structural steel detailing and engineering support
              built around accuracy, coordination and dependable
              delivery.
            </p>

            <Link
              href="/contact"
              className={styles.mobileCta}
              onClick={closeMobileMenu}
            >
              Start a project
              <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}