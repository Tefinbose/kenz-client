"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  Box,
  Boxes,
  Calculator,
  Cable,
  Layers3,
  Ruler,
} from "lucide-react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef } from "react";

const services = [
  {
    number: "01",
    title: "Steel Detailing",
    description:
      "Accurate structural steel 3D modeling, shop drawings, erection drawings, and fabrication-oriented detailing.",
    items: [
      "3D Structural Modeling",
      "Shop Drawings",
      "Erection Drawings",
      "Fabrication Detailing",
    ],
    icon: Ruler,
    href: "/services/steel-detailing",
  },
  {
    number: "02",
    title: "Miscellaneous Detailing",
    description:
      "Detailed modeling and documentation for miscellaneous steel components coordinated with the primary structure.",
    items: [
      "Miscellaneous Steel",
      "Component Modeling",
      "Shop Drawings",
      "Fabrication Documentation",
    ],
    icon: Box,
    href: "/services/miscellaneous-detailing",
  },
  {
    number: "03",
    title: "Connection & Delegated Design",
    description:
      "Connection detailing and delegated design support integrated into coordinated project workflows.",
    items: [
      "Connection Detailing",
      "Design Coordination",
      "Model Integration",
      "Drawing Coordination",
    ],
    icon: Cable,
    href: "/services/connection-design",
  },
  {
    number: "04",
    title: "Joist & Deck Detailing",
    description:
      "Joist and deck detailing coordinated with structural systems, fabrication requirements, and erection needs.",
    items: [
      "Joist Detailing",
      "Deck Detailing",
      "3D Coordination",
      "Interface Coordination",
    ],
    icon: Layers3,
    href: "/services/joist-deck",
  },
  {
    number: "05",
    title: "BIM Support",
    description:
      "Model-based coordination and BIM support helping project teams communicate clearly throughout construction.",
    items: [
      "3D Steel Modeling",
      "Clash Coordination",
      "Drawing Extraction",
      "BIM Workflows",
    ],
    icon: Boxes,
    href: "/services/bim-support",
  },
  {
    number: "06",
    title: "Estimation & Material Take-Off",
    description:
      "Model-based quantity information and estimation support for more informed project planning.",
    items: [
      "Material Take-Off",
      "Quantity Extraction",
      "Steel Estimation",
      "Quantity Documentation",
    ],
    icon: Calculator,
    href: "/services/estimation",
  },
];

function ServiceCard({
  service,
  index,
}: {
  service: (typeof services)[number];
  index: number;
}) {
  const Icon = service.icon;
  const ref = useRef<HTMLAnchorElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [4, -4]),
    {
      stiffness: 250,
      damping: 25,
    }
  );

  const rotateY = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [-4, 4]),
    {
      stiffness: 250,
      damping: 25,
    }
  );

  function handleMouseMove(
    event: React.MouseEvent<HTMLAnchorElement>
  ) {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();

    const x =
      (event.clientX - rect.left) / rect.width - 0.5;

    const y =
      (event.clientY - rect.top) / rect.height - 0.5;

    mouseX.set(x);
    mouseY.set(y);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 80,
        scale: 0.96,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      viewport={{
        once: true,
        amount: 0.15,
      }}
      transition={{
        duration: 0.8,
        delay: index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{
        perspective: 1200,
      }}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
        }}
      >
        <Link
          ref={ref}
          href={service.href}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="group relative block min-h-[510px] overflow-hidden bg-white p-7 md:p-8"
        >
          {/* Blueprint grid */}
          <div
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-[0.07]"
            style={{
              backgroundImage: `
                linear-gradient(#ffffff 1px, transparent 1px),
                linear-gradient(90deg, #ffffff 1px, transparent 1px)
              `,
              backgroundSize: "24px 24px",
            }}
          />

          {/* Copper glow */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-copper-500/20 opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100" />

          {/* Animated technical frame */}
          <span className="absolute left-0 top-0 h-px w-0 bg-copper-500 transition-all duration-700 group-hover:w-full" />
          <span className="absolute right-0 top-0 h-0 w-px bg-copper-500 transition-all duration-700 group-hover:h-full" />
          <span className="absolute bottom-0 right-0 h-px w-0 bg-copper-500 transition-all duration-700 group-hover:w-full" />
          <span className="absolute bottom-0 left-0 h-0 w-px bg-copper-500 transition-all duration-700 group-hover:h-full" />

          {/* Header */}
          <div className="relative z-10 flex items-start justify-between">
            <motion.span
              className="font-display text-sm tracking-[0.2em] text-copper-500"
              whileHover={{
                letterSpacing: "0.4em",
              }}
            >
              {service.number}
            </motion.span>

            <motion.div
              className="flex h-12 w-12 items-center justify-center border border-steel-200 transition-colors duration-500 group-hover:border-copper-500 group-hover:bg-copper-500"
              whileHover={{
                rotate: 90,
              }}
              transition={{
                duration: 0.4,
              }}
            >
              <Icon
                size={20}
                strokeWidth={1.4}
                className="text-navy-800 transition-colors duration-300 group-hover:text-white"
              />
            </motion.div>
          </div>

          {/* Main content */}
          <div className="relative z-10 mt-16">
            <motion.h3
              className="max-w-[340px] font-display text-2xl uppercase leading-tight text-navy-950 transition-colors duration-300 group-hover:text-white md:text-3xl"
              initial={false}
              whileHover={{
                x: 8,
              }}
            >
              {service.title}
            </motion.h3>

            <p className="mt-5 max-w-[380px] text-sm leading-7 text-steel-700 transition-colors duration-300 group-hover:text-steel-200">
              {service.description}
            </p>
          </div>

          {/* Items */}
          <div className="relative z-10 mt-8 border-t border-steel-200 pt-5 transition-colors duration-500 group-hover:border-navy-700">
            {service.items.map((item, itemIndex) => (
              <motion.div
                key={item}
                initial={{ opacity: 0.8 }}
                whileHover={{
                  x: 8,
                }}
                transition={{
                  duration: 0.2,
                  delay: itemIndex * 0.02,
                }}
                className="flex items-center gap-3 py-1.5 text-xs uppercase tracking-wide text-steel-700 transition-colors duration-300 group-hover:text-steel-200"
              >
                <span className="relative flex h-1.5 w-1.5 shrink-0">
                  <span className="absolute inset-0 bg-copper-500" />

                  <motion.span
                    className="absolute inset-0 bg-copper-300"
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 2 }}
                  />
                </span>

                {item}
              </motion.div>
            ))}
          </div>

          {/* Footer */}
          <div className="absolute bottom-7 left-7 right-7 z-10 flex items-center justify-between md:left-8 md:right-8">
            <span className="text-xs font-semibold uppercase tracking-[0.15em] text-copper-600 transition-colors duration-300 group-hover:text-copper-400">
              Explore Service
            </span>

            <motion.div
              whileHover={{
                x: 5,
                y: -5,
              }}
            >
              <ArrowUpRight
                size={19}
                className="text-copper-600 transition-colors duration-300 group-hover:text-copper-400"
              />
            </motion.div>
          </div>

          {/* Corner coordinates */}
          <span className="absolute bottom-2 left-2 font-mono text-[7px] tracking-[0.15em] text-steel-300 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            KENZ / {service.number}
          </span>

          <span className="absolute right-2 top-2 font-mono text-[7px] tracking-[0.15em] text-copper-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            DETAIL
          </span>
        </Link>
      </motion.div>
    </motion.div>
  );
}

export default function ServicesPreview() {
  return (
    <section className="relative overflow-hidden bg-paper py-24 md:py-32">

      {/* ================================================= */}
      {/* BACKGROUND ENGINEERING GRID */}
      {/* ================================================= */}

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `
            linear-gradient(#17202a 1px, transparent 1px),
            linear-gradient(90deg, #17202a 1px, transparent 1px)
          `,
          backgroundSize: "70px 70px",
        }}
      />

      {/* Large background ring */}
      <motion.div
        className="pointer-events-none absolute -right-[300px] top-[15%] h-[700px] w-[700px] rounded-full border border-copper-500/10"
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 60,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <motion.div
        className="pointer-events-none absolute -right-[250px] top-[20%] h-[600px] w-[600px] rounded-full border border-copper-500/5"
        animate={{
          rotate: -360,
        }}
        transition={{
          duration: 45,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">

        {/* ================================================= */}
        {/* HEADING */}
        {/* ================================================= */}

        <div className="mb-14 grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-end">

          <div>
            <motion.div
              initial={{
                opacity: 0,
                x: -40,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.7,
              }}
              className="mb-6 flex items-center gap-4"
            >
              <motion.span
                initial={{ width: 0 }}
                whileInView={{ width: 48 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.8,
                }}
                className="h-px bg-copper-500"
              />

              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-copper-600">
                Our Capabilities
              </span>
            </motion.div>

            <motion.h2
              initial={{
                opacity: 0,
                y: 50,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.4,
              }}
              transition={{
                duration: 0.9,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="font-display text-5xl uppercase leading-[0.95] text-navy-950 md:text-6xl lg:text-7xl"
            >
              Detailed Solutions

              <span className="block text-copper-500">
                For Steel Construction
              </span>
            </motion.h2>
          </div>

          <motion.p
            initial={{
              opacity: 0,
              y: 30,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.8,
              delay: 0.2,
            }}
            className="max-w-2xl text-base leading-8 text-steel-700 md:text-lg"
          >
            From structural steel detailing and BIM coordination to
            miscellaneous steel, joist and deck detailing, connection support,
            and estimation, Kenz Engineering provides practical technical
            support throughout the steel construction lifecycle.
          </motion.p>
        </div>

        {/* ================================================= */}
        {/* SERVICE GRID */}
        {/* ================================================= */}

        <div className="grid gap-px overflow-hidden border border-steel-200 bg-steel-200 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <ServiceCard
              key={service.number}
              service={service}
              index={index}
            />
          ))}
        </div>

        {/* ================================================= */}
        {/* BOTTOM */}
        {/* ================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.8,
            delay: 0.3,
          }}
          className="mt-10 flex flex-col justify-between gap-5 border-t border-steel-200 pt-7 md:flex-row md:items-center"
        >
          <p className="max-w-2xl text-sm leading-7 text-steel-700">
            Technical capabilities structured to support fabricators,
            contractors, and construction professionals from design intent
            through fabrication and erection.
          </p>

          <Link
            href="/services"
            className="group inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.15em] text-navy-950"
          >
            <span className="transition-colors group-hover:text-copper-600">
              View All Services
            </span>

            <ArrowUpRight
              size={18}
              className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-copper-600"
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
