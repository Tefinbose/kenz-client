"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  FileText,
  Plus,
  Search,
  ExternalLink,
  Edit2,
  Trash2,
  Eye,
  Calendar,
  Clock,
  BookOpen,
} from "lucide-react";

export default function AdminBlogPage() {
  const [search, setSearch] = useState("");

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-copper-400 uppercase tracking-widest">
            <FileText size={14} />
            <span>Editorial Desk</span>
          </div>
          <h1 className="mt-1 font-display text-3xl font-bold uppercase tracking-tight text-white">
            Blog Posts <span className="text-copper-400">& Technical Articles</span>
          </h1>
          <p className="mt-1 text-sm text-steel-400">
            Publish engineering articles, BIM guides, detailing best practices, and steel estimation insights.
          </p>
        </div>

        <button
          onClick={() => alert("Blog article composer will be connected in Phase 6 CRUD implementation.")}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-copper-500 to-copper-600 px-4 py-2.5 text-xs font-semibold text-white shadow-lg shadow-copper-500/20 hover:from-copper-400 hover:to-copper-500 transition-all self-start sm:self-center"
        >
          <Plus size={16} />
          <span>Write New Article</span>
        </button>
      </div>

      {/* Blog Table Placeholder */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 text-center backdrop-blur-xl">
        <div className="mx-auto grid h-12 w-12 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-copper-400 mb-3">
          <BookOpen size={24} />
        </div>
        <h3 className="text-base font-semibold text-white">Blog Content Hub Ready</h3>
        <p className="mt-1 text-xs text-steel-400 max-w-md mx-auto">
          Existing articles in <code className="text-copper-400 font-mono">data/blogData.ts</code> will be seeded into MongoDB in Phase 6, enabling real-time editing and publishing.
        </p>
      </div>
    </div>
  );
}
