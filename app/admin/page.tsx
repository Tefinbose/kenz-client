"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Layers,
  Wrench,
  Briefcase,
  Award,
  FileText,
  MessageSquare,
  ArrowUpRight,
  RefreshCw,
  Mail,
  ShieldCheck,
  Calendar,
  AlertCircle,
} from "lucide-react";

interface DashboardStats {
  projects: number;
  services: number;
  careers: {
    active: number;
    total: number;
  };
  blog: number;
  accolades: {
    recognitions: number;
    certifications: number;
    endorsements: number;
    total: number;
  };
  messages: {
    total: number;
    unread: number;
  };
}

interface RecentMessage {
  _id: string;
  name: string;
  company: string;
  email: string;
  projectName: string;
  service: string;
  status: "unread" | "read" | "replied" | "archived";
  createdAt: string;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentMessages, setRecentMessages] = useState<RecentMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboardData = async () => {
    try {
      setError(null);
      const res = await fetch("/api/admin/stats");
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to load dashboard data");
      }

      setStats(data.stats);
      setRecentMessages(data.recentMessages || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error fetching stats");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchDashboardData();
  };

  const statCards = [
    {
      title: "Projects",
      count: stats?.projects ?? 0,
      subtext: "Featured detailing & BIM items",
      href: "/admin/projects",
      icon: Layers,
    },
    {
      title: "Services",
      count: stats?.services ?? 0,
      subtext: "Engineering disciplines",
      href: "/admin/services",
      icon: Wrench,
    },
    {
      title: "Careers",
      count: stats?.careers?.active ?? 0,
      subtext: `${stats?.careers?.total ?? 0} total postings recorded`,
      href: "/admin/careers",
      icon: Briefcase,
    },
    {
      title: "Accolades & Certs",
      count: stats?.accolades?.total ?? 0,
      subtext: `${stats?.accolades?.endorsements ?? 0} client endorsements`,
      href: "/admin/accolades",
      icon: Award,
    },
    {
      title: "Blog Articles",
      count: stats?.blog ?? 0,
      subtext: "Technical knowledge posts",
      href: "/admin/blog",
      icon: FileText,
    },
    {
      title: "Client RFQs",
      count: stats?.messages?.total ?? 0,
      subtext: `${stats?.messages?.unread ?? 0} unread submissions`,
      href: "/admin/messages",
      icon: MessageSquare,
      alert: (stats?.messages?.unread ?? 0) > 0,
    },
  ];

  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="space-y-8">
      {/* ── TOP HEADER / WELCOME BANNER ── */}
      <div className="rounded-2xl border border-white/10 bg-[#111827] p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-copper-500/30 bg-copper-500/10 px-3 py-1 text-xs font-semibold text-copper-300">
                <ShieldCheck size={13} className="text-copper-400" />
                Admin Dashboard
              </span>
              <span className="flex items-center gap-1.5 text-xs text-steel-400">
                <Calendar size={13} />
                {currentDate}
              </span>
            </div>

            <h1 className="mt-3 font-display text-3xl font-bold uppercase tracking-tight sm:text-4xl text-white">
              Operations & Content Overview
            </h1>
            <p className="mt-1 max-w-2xl text-sm text-steel-300">
              Manage website content, review structural detailing project deliverables,
              track job opportunities, and respond to incoming client RFQ inquiries.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start sm:self-center">
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-xs font-semibold text-white hover:border-copper-500/40 hover:bg-white/[0.08] transition-all disabled:opacity-50"
            >
              <RefreshCw
                size={14}
                className={refreshing ? "animate-spin text-copper-400" : "text-steel-400"}
              />
              <span>Refresh Metrics</span>
            </button>
          </div>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-3 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300">
          <AlertCircle size={18} className="text-red-400" />
          <span>{error}</span>
        </div>
      )}

      {/* ── METRIC STATS GRID (CLEAN SOLID CARDS) ── */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xs font-bold uppercase tracking-wider text-steel-400">
            System Overview & Record Totals
          </h2>
          <span className="text-xs text-steel-400">Live Database Records</span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {statCards.map((card) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.title}
                href={card.href}
                className="group relative rounded-2xl border border-white/10 bg-[#111827] p-6 transition-all hover:-translate-y-0.5 hover:border-copper-500/40 hover:bg-[#141e30] shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div className="grid h-12 w-12 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-copper-400 group-hover:bg-copper-500/10 group-hover:text-copper-300 transition-colors">
                    <Icon size={22} />
                  </div>
                  <div className="flex items-center gap-1.5 font-mono text-xs text-steel-400 group-hover:text-copper-300 transition-colors">
                    <span>Manage</span>
                    <ArrowUpRight size={14} />
                  </div>
                </div>

                <div className="mt-5">
                  <div className="text-3xl font-bold font-display tracking-tight text-white">
                    {loading ? (
                      <span className="inline-block h-8 w-12 animate-pulse rounded bg-white/10" />
                    ) : (
                      card.count
                    )}
                  </div>
                  <div className="mt-1 font-semibold text-sm text-white/90">
                    {card.title}
                  </div>
                  <div className="mt-1 text-xs text-steel-400">
                    {card.subtext}
                  </div>
                </div>

                {card.alert && (
                  <div className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-copper-500/40 bg-copper-500/20 px-2.5 py-0.5 font-mono text-[10px] font-semibold text-copper-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-copper-400 animate-pulse" />
                    Requires attention
                  </div>
                )}
              </Link>
            );
          })}
        </div>
      </div>

      {/* ── RECENT RFQ & CLIENT INQUIRIES ── */}
      <div className="rounded-2xl border border-white/10 bg-[#111827] p-6 sm:p-8 shadow-sm">
        <div className="flex items-center justify-between border-b border-white/10 pb-5">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <MessageSquare size={18} className="text-copper-400" />
              Latest RFQ & Client Inquiries
            </h2>
            <p className="mt-0.5 text-xs text-steel-400">
              Recent project submissions from the public contact desk
            </p>
          </div>
          <Link
            href="/admin/messages"
            className="font-mono text-xs font-semibold text-copper-400 hover:text-copper-300 transition-colors inline-flex items-center gap-1"
          >
            View All ({stats?.messages?.total ?? 0})
            <ArrowUpRight size={13} />
          </Link>
        </div>

        <div className="mt-5">
          {recentMessages.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="grid h-12 w-12 place-items-center rounded-xl border border-white/10 bg-white/[0.03] text-steel-500 mb-3">
                <Mail size={20} />
              </div>
              <div className="text-sm font-semibold text-steel-300">
                No inquiries received yet
              </div>
              <p className="mt-1 text-xs text-steel-500 max-w-xs">
                New submissions submitted through the website RFQ form will appear here in real-time.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-white/5">
              {recentMessages.map((msg) => (
                <div
                  key={msg._id}
                  className="flex flex-col gap-2 py-4 sm:flex-row sm:items-center sm:justify-between transition-colors hover:bg-white/[0.02] px-2 rounded-xl"
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`mt-1 h-2 w-2 rounded-full shrink-0 ${
                        msg.status === "unread"
                          ? "bg-copper-400 ring-4 ring-copper-500/20"
                          : "bg-steel-600"
                      }`}
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm text-white">
                          {msg.name}
                        </span>
                        <span className="text-xs text-steel-400">
                          • {msg.company}
                        </span>
                      </div>
                      <div className="text-xs text-steel-300 mt-0.5">
                        <span className="font-mono text-copper-400">{msg.service}</span>
                        {" — "}
                        <span className="text-steel-400">{msg.projectName}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-center">
                    <span
                      className={`rounded-full px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase ${
                        msg.status === "unread"
                          ? "border border-copper-500/40 bg-copper-500/20 text-copper-300"
                          : msg.status === "replied"
                          ? "border border-emerald-500/40 bg-emerald-500/20 text-emerald-300"
                          : "border border-white/10 bg-white/5 text-steel-400"
                      }`}
                    >
                      {msg.status}
                    </span>
                    <span className="font-mono text-[10px] text-steel-500">
                      {new Date(msg.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
