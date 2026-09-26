"use client";

import { useState } from "react";
import { MapPin, Phone, Mail, Copy, Check, MessageSquare } from "lucide-react";

type Method = {
  icon: typeof MapPin;
  label: string;
  value: string;
  subtext: string;
  href: string;
  copyValue: string;
  secondary?: { label: string; href: string };
};

const methods: Method[] = [
  {
    icon: MapPin,
    label: "Office",
    value: "Sheridan, Wyoming, USA",
    subtext: "30 N Gould St #37010, Sheridan, WY 82801",
    href: "https://maps.google.com/?q=30+N+Gould+St+%2337010+Sheridan+WY+82801+USA",
    copyValue: "30 N Gould St #37010, Sheridan, WY 82801, USA",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 799 404 0464",
    subtext: "Mon–Sat, 9:00 AM–7:00 PM",
    href: "tel:+917994040464",
    copyValue: "+917994040464",
    secondary: { label: "WhatsApp", href: "https://wa.me/917994040464" },
  },
  {
    icon: Mail,
    label: "Email",
    value: "sales@kenzengineering.com",
    subtext: "Response within 24 hours",
    href: "mailto:sales@kenzengineering.com",
    copyValue: "sales@kenzengineering.com",
  },
];

export default function ContactInfo() {
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const handleCopy = (idx: number, text: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedIdx(idx);
      setTimeout(() => setCopiedIdx(null), 2000);
    }
  };

  return (
    <div className="grid gap-5 sm:grid-cols-3">
      {methods.map((m, idx) => {
        const Icon = m.icon;
        const isCopied = copiedIdx === idx;
        return (
          <div
            key={m.label}
            className="flex flex-col rounded-2xl border border-steel-200 bg-white p-6"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-copper-500/20 bg-copper-50 text-copper-600">
              <Icon size={18} />
            </div>

            <p className="mt-4 text-xs font-medium uppercase tracking-wide text-steel-500">
              {m.label}
            </p>
            <a
              href={m.href}
              target={m.label === "Office" ? "_blank" : undefined}
              rel={m.label === "Office" ? "noopener noreferrer" : undefined}
              className="mt-1 text-sm font-semibold leading-snug text-navy-950 hover:text-copper-600"
            >
              {m.value}
            </a>
            <p className="mt-1 text-xs leading-relaxed text-steel-500">
              {m.subtext}
            </p>

            <div className="mt-5 flex items-center gap-2 border-t border-steel-100 pt-4">
              {m.secondary && (
                <a
                  href={m.secondary.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-steel-200 px-2.5 py-1.5 text-xs font-medium text-steel-700 hover:border-copper-300 hover:text-copper-700"
                >
                  <MessageSquare size={13} />
                  {m.secondary.label}
                </a>
              )}
              <button
                type="button"
                onClick={() => handleCopy(idx, m.copyValue)}
                className="ml-auto inline-flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-xs font-medium text-steel-500 transition-colors hover:text-copper-600"
              >
                {isCopied ? (
                  <>
                    <Check size={13} className="text-copper-600" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy size={13} />
                    Copy
                  </>
                )}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}