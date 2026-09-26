"use client";

import { useState, useEffect, ReactNode } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Layers,
  Wrench,
  Briefcase,
  Award,
  FileText,
  MessageSquare,
  Settings,
  LogOut,
  Building2,
  ExternalLink,
  Menu,
  X,
  ChevronRight,
  Database,
  User,
  Shield,
  Bell,
} from "lucide-react";

interface AdminLayoutProps {
  children: ReactNode;
}

interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: string;
}

const navItems = [
  {
    name: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
    badge: null,
  },
  {
    name: "Projects",
    href: "/admin/projects",
    icon: Layers,
    badge: null,
  },
  {
    name: "Services",
    href: "/admin/services",
    icon: Wrench,
    badge: null,
  },
  {
    name: "Careers",
    href: "/admin/careers",
    icon: Briefcase,
    badge: null,
  },
  {
    name: "Accolades",
    href: "/admin/accolades",
    icon: Award,
    badge: null,
  },
  {
    name: "Blog",
    href: "/admin/blog",
    icon: FileText,
    badge: null,
  },
  {
    name: "Messages",
    href: "/admin/messages",
    icon: MessageSquare,
    badge: "inbox",
  },
  {
    name: "Settings",
    href: "/admin/settings",
    icon: Settings,
    badge: null,
  },
];

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [unreadCount, setUnreadCount] = useState<number>(0);

  // If on login page, render children directly without admin shell
  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (isLoginPage) return;

    let isMounted = true;

    async function fetchSessionAndStats() {
      try {
        const [meRes, statsRes] = await Promise.all([
          fetch("/api/auth/me"),
          fetch("/api/admin/stats").catch(() => null),
        ]);

        if (meRes.ok) {
          const meData = await meRes.json();
          if (meData.authenticated && meData.admin && isMounted) {
            setAdmin(meData.admin);
          }
        }

        if (statsRes && statsRes.ok) {
          const statsData = await statsRes.json();
          if (statsData.success && isMounted) {
            setUnreadCount(statsData.stats?.messages?.unread || 0);
          }
        }
      } catch (err) {
        console.error("Admin layout fetch error:", err);
      }
    }

    fetchSessionAndStats();

    return () => {
      isMounted = false;
    };
  }, [pathname, isLoginPage]);

  // Close mobile sidebar on route change
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  if (isLoginPage) {
    return <>{children}</>;
  }

  // Determine current active item title for breadcrumb
  const currentNav =
    navItems.find((item) =>
      item.href === "/admin"
        ? pathname === "/admin"
        : pathname.startsWith(item.href)
    ) || navItems[0];

  return (
    <div className="min-h-screen bg-[#070e1b] text-white flex flex-col antialiased selection:bg-copper-500 selection:text-white">
      {/* Background blueprint grid watermark */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `
            linear-gradient(#ffffff 1px, transparent 1px),
            linear-gradient(90deg, #ffffff 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* ── MOBILE SIDEBAR BACKDROP ── */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden transition-opacity"
        />
      )}

      {/* ── SIDEBAR (DESKTOP + MOBILE DRAWER) ── */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-white/10 bg-[#091122]/95 backdrop-blur-xl transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Sidebar Header / Brand */}
        <div className="flex h-20 items-center justify-between border-b border-white/10 px-6">
          <Link href="/admin" className="flex items-center gap-3 group">
            <div className="grid h-11 w-11 place-items-center rounded-xl border border-copper-500/40 bg-gradient-to-br from-copper-500/20 to-copper-600/10 text-copper-400 shadow-md shadow-copper-500/10 transition-transform group-hover:scale-105">
              <Building2 size={22} />
            </div>
            <div>
              <div className="font-display text-lg font-bold tracking-wider text-white">
                KENZ<span className="text-copper-400">ENGINEERING</span>
              </div>
              <div className="font-mono text-[9px] font-semibold tracking-widest text-copper-400/90 uppercase">
                Secure Admin CMS
              </div>
            </div>
          </Link>

          <button
            onClick={() => setSidebarOpen(false)}
            className="rounded-lg p-1.5 text-steel-400 hover:bg-white/5 hover:text-white lg:hidden"
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation List */}
        <div className="flex-1 overflow-y-auto px-4 py-6 scrollbar-thin scrollbar-thumb-white/10">
          <div className="mb-2 px-3 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-steel-400">
            Content Management
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center justify-between rounded-xl px-3.5 py-3 text-sm font-medium transition-all ${
                    isActive
                      ? "border border-copper-500/40 bg-copper-500/15 text-white shadow-sm shadow-copper-500/10"
                      : "text-steel-300 hover:border-white/5 hover:bg-white/[0.04] hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      size={18}
                      className={
                        isActive
                          ? "text-copper-400"
                          : "text-steel-400 transition-colors group-hover:text-copper-400"
                      }
                    />
                    <span>{item.name}</span>
                  </div>

                  {item.badge === "inbox" && unreadCount > 0 && (
                    <span className="rounded-full bg-copper-500 px-2 py-0.5 font-mono text-[10px] font-bold text-white shadow-sm">
                      {unreadCount}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="mt-8 mb-2 px-3 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-steel-400">
            External Links
          </div>

          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between rounded-xl px-3.5 py-2.5 text-xs text-steel-400 hover:bg-white/[0.04] hover:text-copper-300 transition-all border border-transparent hover:border-white/5"
          >
            <span className="flex items-center gap-2.5">
              <ExternalLink size={14} className="text-copper-400" />
              Live Public Website
            </span>
            <ChevronRight
              size={14}
              className="text-steel-600 group-hover:text-copper-400 transition-transform group-hover:translate-x-0.5"
            />
          </Link>
        </div>

        {/* Sidebar Footer / User Profile */}
        <div className="border-t border-white/10 p-4">
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3.5">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-copper-500/30 to-blue-600/20 text-copper-300 font-mono font-bold border border-copper-500/30 text-xs">
                {admin?.name ? admin.name.substring(0, 2).toUpperCase() : "AD"}
              </div>

              <div className="flex-1 min-w-0">
                <div className="truncate text-xs font-semibold text-white">
                  {admin?.name || "Administrator"}
                </div>
                <div className="truncate font-mono text-[10px] text-steel-400">
                  {admin?.email || "admin@kenzengineering.com"}
                </div>
              </div>

              <button
                onClick={handleLogout}
                title="Sign Out"
                className="rounded-lg p-2 text-steel-400 hover:bg-red-500/10 hover:text-red-400 transition-colors"
                aria-label="Sign Out"
              >
                <LogOut size={16} />
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* ── MAIN CONTENT SHELL ── */}
      <div className="flex-1 lg:pl-72 flex flex-col min-w-0">
        {/* Top Navigation Bar */}
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-white/10 bg-[#070e1b]/90 backdrop-blur-md px-4 sm:px-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="rounded-xl border border-white/10 bg-white/[0.03] p-2.5 text-steel-300 hover:bg-white/[0.08] hover:text-white lg:hidden"
              aria-label="Open sidebar"
            >
              <Menu size={20} />
            </button>

            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm">
              <span className="font-mono text-xs text-steel-400 hidden sm:inline">
                CMS
              </span>
              <ChevronRight
                size={14}
                className="text-steel-600 hidden sm:inline"
              />
              <span className="font-semibold text-white">
                {currentNav.name}
              </span>
            </div>
          </div>

          {/* Top Bar Actions */}
          <div className="flex items-center gap-3">
            {/* Database indicator */}
            <div className="hidden sm:inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 font-mono text-[11px] text-emerald-400">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              MongoDB Active
            </div>

            {/* Messages notification icon */}
            <Link
              href="/admin/messages"
              className="relative rounded-xl border border-white/10 bg-white/[0.03] p-2.5 text-steel-300 hover:bg-white/[0.08] hover:text-copper-300 transition-colors"
              title="Inquiries"
            >
              <Bell size={18} />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-copper-500 text-[9px] font-bold text-white">
                  {unreadCount}
                </span>
              )}
            </Link>

            {/* Live website button */}
            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2 text-xs font-medium text-steel-300 hover:border-copper-500/30 hover:bg-white/[0.07] hover:text-white transition-all"
            >
              <span>View Site</span>
              <ExternalLink size={13} className="text-copper-400" />
            </Link>
          </div>
        </header>

        {/* Page Viewport */}
        <main className="flex-1 p-4 sm:p-8 min-w-0">
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
