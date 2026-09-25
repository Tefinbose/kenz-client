"use client";

import { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  RotateCcw,
  Copy,
  Check,
  ExternalLink,
  MessageSquare,
  ArrowUpRight,
  ShieldCheck,
  Clock,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";

type ContactCardData = {
  id: string;
  code: string;
  icon: typeof MapPin;
  badge: string;
  category: string;
  title: string;
  value: string;
  subtext: string;
  details: { label: string; val: string }[];
  primaryAction: {
    label: string;
    href: string;
    icon: typeof ExternalLink;
    isExternal?: boolean;
  };
  secondaryAction?: {
    label: string;
    href: string;
    icon: typeof MessageSquare;
    isExternal?: boolean;
  };
  copyValue: string;
};

const cardsData: ContactCardData[] = [
  {
    id: "location",
    code: "LOC-01",
    icon: MapPin,
    badge: "US Headquarters",
    category: "Physical Office",
    title: "Sheridan, Wyoming USA",
    value: "30 N Gould St #37010\nSheridan, WY 82801\nUSA",
    subtext: "Corporate entity and North American project coordination office.",
    details: [
      { label: "Jurisdiction", val: "United States (Wyoming LLC)" },
      { label: "Service Focus", val: "AISC Steel Detailing & BIM" },
      { label: "Timezone", val: "MST / US Working Hours" },
    ],
    primaryAction: {
      label: "Open in Google Maps",
      href: "https://maps.google.com/?q=30+N+Gould+St+%2337010+Sheridan+WY+82801+USA",
      icon: ExternalLink,
      isExternal: true,
    },
    copyValue: "30 N Gould St #37010, Sheridan, WY 82801, USA",
  },
  {
    id: "phone",
    code: "TEL-02",
    icon: Phone,
    badge: "Direct Line & WhatsApp",
    category: "Telephone & Chat",
    title: "Instant Phone & WhatsApp",
    value: "+91 799 404 0464",
    subtext: "Available for technical inquiries, urgent RFQs, and direct coordination.",
    details: [
      { label: "Availability", val: "Mon – Sat (9:00 AM – 7:00 PM)" },
      { label: "WhatsApp Desk", val: "Active for drawing submittals" },
      { label: "Direct Access", val: "Senior Detailing Coordinator" },
    ],
    primaryAction: {
      label: "Direct Phone Call",
      href: "tel:+917994040464",
      icon: Phone,
      isExternal: false,
    },
    secondaryAction: {
      label: "Chat on WhatsApp",
      href: "https://wa.me/917994040464",
      icon: MessageSquare,
      isExternal: true,
    },
    copyValue: "+917994040464",
  },
  {
    id: "email",
    code: "EML-03",
    icon: Mail,
    badge: "Official Inquiry Desk",
    category: "Electronic Mail",
    title: "Official RFQ Inbox",
    value: "sales@kenzengineering.com",
    subtext: "Monitored round the clock for drawing packages and project RFQs.",
    details: [
      { label: "Response SLA", val: "Guaranteed within 24 Hours" },
      { label: "File Types", val: "PDF, DWG, DXF, Tekla, ZIP" },
      { label: "Security", val: "Confidential NDA Standard" },
    ],
    primaryAction: {
      label: "Send Email Message",
      href: "mailto:sales@kenzengineering.com",
      icon: Mail,
      isExternal: false,
    },
    copyValue: "sales@kenzengineering.com",
  },
];

export default function ContactFlipCards() {
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const toggleFlip = (id: string) => {
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleCopy = (id: string, text: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => {
        setCopiedId(null);
      }, 2500);
    }
  };

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {cardsData.map((card, idx) => {
        const Icon = card.icon;
        const isFlipped = !!flippedCards[card.id];
        const isCopied = copiedId === card.id;

        return (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.12 }}
            className="group relative h-[440px] w-full [perspective:1200px]"
            onMouseEnter={() => {
              // Only flip on hover if on desktop
              if (typeof window !== "undefined" && window.innerWidth >= 1024) {
                setFlippedCards((prev) => ({ ...prev, [card.id]: true }));
              }
            }}
            onMouseLeave={() => {
              if (typeof window !== "undefined" && window.innerWidth >= 1024) {
                setFlippedCards((prev) => ({ ...prev, [card.id]: false }));
              }
            }}
          >
            {/* 3D Rotating Flippable Inner Container */}
            <div
              className={`relative h-full w-full rounded-2xl transition-transform duration-700 [transform-style:preserve-3d] ${
                isFlipped ? "[transform:rotateY(180deg)]" : ""
              }`}
            >
              {/* =========================================================
                  FRONT FACE
                  ========================================================= */}
              <div className="absolute inset-0 flex flex-col justify-between overflow-hidden rounded-2xl border border-steel-200/90 bg-white p-7 shadow-[0_10px_35px_-5px_rgba(10,20,32,0.06)] [backface-visibility:hidden] [-webkit-backface-visibility:hidden] transition-all duration-300 hover:border-copper-400 hover:shadow-[0_20px_45px_-8px_rgba(193,122,62,0.18)]">
                {/* Top Glowing Laser Accent */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-copper-500 via-copper-400 to-transparent" />

                {/* Subtle blueprint grid watermark */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-[0.03]"
                  style={{
                    backgroundImage: `linear-gradient(#0a1420 1px, transparent 1px), linear-gradient(90deg, #0a1420 1px, transparent 1px)`,
                    backgroundSize: "28px 28px",
                  }}
                />

                <div className="relative z-10">
                  {/* Top Header: Icon + Code + Flip Prompt */}
                  <div className="flex items-center justify-between">
                    <div className="flex h-13 w-13 items-center justify-center rounded-xl border border-copper-500/20 bg-copper-50 text-copper-600 shadow-sm transition-all duration-300 group-hover:bg-copper-500 group-hover:text-white group-hover:scale-105">
                      <Icon size={22} />
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-semibold text-steel-400">
                        {card.code}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFlip(card.id);
                        }}
                        className="flex h-7 w-7 items-center justify-center rounded-lg border border-steel-200 bg-steel-50 text-steel-500 transition-all hover:border-copper-500 hover:bg-copper-50 hover:text-copper-600"
                        title="Click to flip card"
                      >
                        <RotateCcw size={13} className="transition-transform group-hover:rotate-180 duration-500" />
                      </button>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-steel-100/80 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-steel-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-copper-500 animate-pulse" />
                    {card.badge}
                  </div>

                  {/* Category */}
                  <p className="mt-3 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-copper-600">
                    {card.category}
                  </p>

                  {/* Main Value Display */}
                  <p className="mt-2 text-lg font-bold leading-snug text-navy-950 whitespace-pre-line group-hover:text-copper-600 transition-colors">
                    {card.value}
                  </p>

                  <p className="mt-3 text-xs leading-relaxed text-steel-600 line-clamp-2">
                    {card.subtext}
                  </p>
                </div>

                {/* Front Footer: Tap / Hover to Flip Hint */}
                <div
                  onClick={() => toggleFlip(card.id)}
                  className="relative z-10 flex cursor-pointer items-center justify-between border-t border-steel-100 pt-4 text-xs font-semibold text-steel-500 transition-colors group-hover:text-copper-600"
                >
                  <span className="flex items-center gap-1.5">
                    <RotateCcw size={12} />
                    <span>Flip for Actions & Details</span>
                  </span>
                  <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>

              {/* =========================================================
                  BACK FACE (3D Rotated: 180deg)
                  ========================================================= */}
              <div className="absolute inset-0 flex flex-col justify-between overflow-hidden rounded-2xl border border-white/20 bg-gradient-to-br from-navy-950 via-[#102235] to-navy-950 p-7 text-white shadow-[0_20px_50px_rgba(10,20,32,0.35)] [backface-visibility:hidden] [-webkit-backface-visibility:hidden] [transform:rotateY(180deg)]">
                {/* Engineering Blueprint Grid on Dark */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-[0.06]"
                  style={{
                    backgroundImage: `linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)`,
                    backgroundSize: "24px 24px",
                  }}
                />

                {/* Ambient Copper Halo */}
                <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-copper-500/20 blur-2xl" />

                <div className="relative z-10">
                  {/* Top Bar of Back Face */}
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-semibold text-copper-400">
                        {card.code}
                      </span>
                      <span className="text-white/40">•</span>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-white/70">
                        Quick Console
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFlip(card.id);
                      }}
                      className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/20 bg-white/10 text-white/80 transition-all hover:border-copper-400 hover:bg-copper-500 hover:text-white"
                      title="Flip back"
                    >
                      <RotateCcw size={13} />
                    </button>
                  </div>

                  {/* Back Title */}
                  <h4 className="mt-4 font-display text-xl uppercase tracking-wide text-white">
                    {card.title}
                  </h4>

                  {/* Metadata Specs Grid */}
                  <div className="mt-3 space-y-2 rounded-xl border border-white/10 bg-white/5 p-3 text-[11px] backdrop-blur-sm">
                    {card.details.map((detail) => (
                      <div
                        key={detail.label}
                        className="flex items-center justify-between gap-2 border-b border-white/5 pb-1.5 last:border-b-0 last:pb-0"
                      >
                        <span className="text-white/50">{detail.label}</span>
                        <span className="font-semibold text-copper-300">
                          {detail.val}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Back Actions: Buttons & Copy */}
                <div className="relative z-10 space-y-2.5 pt-3">
                  {/* Primary Direct Action Button */}
                  <a
                    href={card.primaryAction.href}
                    target={card.primaryAction.isExternal ? "_blank" : undefined}
                    rel={card.primaryAction.isExternal ? "noopener noreferrer" : undefined}
                    onClick={(e) => e.stopPropagation()}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-copper-600 to-copper-500 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-md transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-copper-500/25"
                  >
                    <card.primaryAction.icon size={14} />
                    <span>{card.primaryAction.label}</span>
                  </a>

                  {/* Secondary Action (e.g. WhatsApp for phone) */}
                  {card.secondaryAction && (
                    <a
                      href={card.secondaryAction.href}
                      target={card.secondaryAction.isExternal ? "_blank" : undefined}
                      rel={card.secondaryAction.isExternal ? "noopener noreferrer" : undefined}
                      onClick={(e) => e.stopPropagation()}
                      className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white transition-all hover:border-white/40 hover:bg-white/20"
                    >
                      <card.secondaryAction.icon size={14} />
                      <span>{card.secondaryAction.label}</span>
                    </a>
                  )}

                  {/* Copy to Clipboard Button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopy(card.id, card.copyValue);
                    }}
                    className={`flex w-full items-center justify-center gap-2 rounded-xl border px-3 py-2 text-[11px] font-semibold transition-all ${
                      isCopied
                        ? "border-green-500/50 bg-green-500/20 text-green-300"
                        : "border-white/15 bg-white/5 text-white/70 hover:border-white/30 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    {isCopied ? (
                      <>
                        <Check size={13} className="text-green-400" />
                        <span>Copied to Clipboard!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={13} />
                        <span>Copy Details</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
