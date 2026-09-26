"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Layers,
  Plus,
  Search,
  ExternalLink,
  Edit2,
  Trash2,
  Eye,
  CheckCircle2,
  XCircle,
  FolderGit2,
} from "lucide-react";

export default function AdminProjectsPage() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-copper-400 uppercase tracking-widest">
            <Layers size={14} />
            <span>Portfolio Management</span>
          </div>
          <h1 className="mt-1 font-display text-3xl font-bold uppercase tracking-tight text-white">
            Projects <span className="text-copper-400">& Disciplines</span>
          </h1>
          <p className="mt-1 text-sm text-steel-400">
            Showcase structural detailing, BIM LOD 350-400, connection, and miscellaneous steel deliverables.
          </p>
        </div>

        <button
          onClick={() => alert("Project modal will be connected in Phase 6 CRUD implementation.")}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-copper-500 to-copper-600 px-4 py-2.5 text-xs font-semibold text-white shadow-lg shadow-copper-500/20 hover:from-copper-400 hover:to-copper-500 transition-all self-start sm:self-center"
        >
          <Plus size={16} />
          <span>Add New Project</span>
        </button>
      </div>

      {/* Filter / Search Bar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-steel-400" />
          <input
            type="text"
            placeholder="Search projects by title, category, or scope..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/[0.03] py-2.5 pl-10 pr-4 text-xs text-white placeholder-steel-500 focus:border-copper-500/80 focus:outline-none"
          />
        </div>
      </div>

      {/* Projects Table Placeholder */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 text-center backdrop-blur-xl">
        <div className="mx-auto grid h-12 w-12 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-copper-400 mb-3">
          <FolderGit2 size={24} />
        </div>
        <h3 className="text-base font-semibold text-white">Project Records Ready</h3>
        <p className="mt-1 text-xs text-steel-400 max-w-md mx-auto">
          Database model <code className="text-copper-400 font-mono">Project</code> is initialized. Use the upcoming Phase 6 data migration to populate projects from existing static data or create new records.
        </p>
      </div>
    </div>
  );
}
