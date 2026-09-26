"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Wrench,
  Plus,
  Search,
  ExternalLink,
  Edit2,
  Trash2,
  Eye,
  CheckCircle2,
  Layers3,
} from "lucide-react";

export default function AdminServicesPage() {
  const [search, setSearch] = useState("");

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-copper-400">
            <Wrench size={14} />
            <span>Disciplines & Capabilities</span>
          </div>
          <h1 className="mt-1 font-display text-3xl font-bold uppercase tracking-tight text-white">
            Engineering <span className="text-copper-400">Services</span>
          </h1>
          <p className="mt-1 text-sm text-steel-400">
            Configure steel detailing, miscellaneous steel, connection design, joist & deck, BIM, and estimation services.
          </p>
        </div>

        <button
          onClick={() => alert("Service editor will be connected in Phase 6 CRUD implementation.")}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-copper-500 to-copper-600 px-4 py-2.5 text-xs font-semibold text-white shadow-lg shadow-copper-500/20 hover:from-copper-400 hover:to-copper-500 transition-all self-start sm:self-center"
        >
          <Plus size={16} />
          <span>Add New Service</span>
        </button>
      </div>

      {/* Services Table Placeholder */}
      <div className="rounded-2xl border border-white/10 bg-[#111827] p-8 text-center shadow-sm">
        <div className="mx-auto grid h-12 w-12 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-copper-400 mb-3">
          <Layers3 size={24} />
        </div>
        <h3 className="text-base font-semibold text-white">Services Model Ready</h3>
        <p className="mt-1 text-xs text-steel-400 max-w-md mx-auto">
          Database model <code className="text-copper-400 font-mono">Service</code> is ready. Existing 6 disciplines will be populated from data into live database records.
        </p>
      </div>
    </div>
  );
}
