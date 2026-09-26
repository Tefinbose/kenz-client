"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  MessageSquare,
  Search,
  Mail,
  Building,
  Phone,
  Calendar,
  CheckCircle2,
  Trash2,
  Eye,
  Clock,
  Filter,
} from "lucide-react";

export default function AdminMessagesPage() {
  const [search, setSearch] = useState("");

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-copper-400 uppercase tracking-widest">
            <MessageSquare size={14} />
            <span>Client Communications</span>
          </div>
          <h1 className="mt-1 font-display text-3xl font-bold uppercase tracking-tight text-white">
            RFQ Inquiries <span className="text-copper-400">& Messages</span>
          </h1>
          <p className="mt-1 text-sm text-steel-400">
            Review, reply to, and archive incoming project requests and drawing intake inquiries.
          </p>
        </div>
      </div>

      {/* Messages Placeholder */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 text-center backdrop-blur-xl">
        <div className="mx-auto grid h-12 w-12 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-copper-400 mb-3">
          <Mail size={24} />
        </div>
        <h3 className="text-base font-semibold text-white">RFQ Message Desk Initialized</h3>
        <p className="mt-1 text-xs text-steel-400 max-w-md mx-auto">
          Submissions through the public Contact page form will be recorded in <code className="text-copper-400 font-mono">ContactMessage</code> and listed here for administrative management.
        </p>
      </div>
    </div>
  );
}
