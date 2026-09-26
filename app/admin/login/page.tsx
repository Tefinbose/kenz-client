"use client";

import { useState, FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  ShieldCheck,
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  Loader2,
  AlertCircle,
  Building2,
  Terminal,
} from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTarget = searchParams.get("from") || "/admin";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim() || !password.trim()) {
      setError("Please enter both email and password");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Authentication failed. Please check your credentials.");
      }

      // Successful login
      router.push(redirectTarget);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const fillDefaultCredentials = () => {
    setEmail("admin@kenzengineering.com");
    setPassword("Admin@Kenz2026");
    setError(null);
  };

  return (
    <div className="relative min-h-screen bg-[#070e1b] text-white flex flex-col justify-center py-12 sm:px-6 lg:px-8 selection:bg-copper-500 selection:text-white">
      {/* Blueprint Grid Background Pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(#ffffff 1px, transparent 1px),
            linear-gradient(90deg, #ffffff 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Ambient Lighting Orbs */}
      <div className="pointer-events-none absolute -left-40 top-1/4 h-[500px] w-[500px] rounded-full bg-copper-500/10 blur-[140px]" />
      <div className="pointer-events-none absolute -right-40 bottom-1/4 h-[500px] w-[500px] rounded-full bg-blue-600/10 blur-[150px]" />

      <div className="relative sm:mx-auto sm:w-full sm:max-w-md">
        {/* Top Header Badge */}
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-copper-500/30 bg-copper-500/10 px-4 py-1 font-mono text-xs font-semibold tracking-wider text-copper-300">
            <Terminal size={13} className="text-copper-400" />
            SECURE CMS // PORTAL-AUTH
          </div>

          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-xl border border-copper-500/40 bg-gradient-to-br from-copper-500/20 to-copper-600/10 text-copper-400 shadow-lg shadow-copper-500/10">
              <Building2 size={24} />
            </div>
            <div className="text-left">
              <span className="block font-display text-2xl font-bold tracking-wider text-white">
                KENZ<span className="text-copper-400">ENGINEERING</span>
              </span>
              <span className="block font-mono text-[10px] tracking-widest text-steel-400 uppercase">
                Content Management System
              </span>
            </div>
          </div>

          <h2 className="mt-6 text-xl font-semibold tracking-tight text-white/90">
            Admin Authentication
          </h2>
          <p className="mt-1 text-sm text-steel-400">
            Sign in with verified administrator credentials
          </p>
        </div>

        {/* Card */}
        <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl shadow-2xl shadow-black/50">
          {error && (
            <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300">
              <AlertCircle size={18} className="mt-0.5 shrink-0 text-red-400" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email Field */}
            <div>
              <label className="block font-mono text-xs font-medium uppercase tracking-wider text-steel-300">
                Email Address
              </label>
              <div className="relative mt-2">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-steel-400">
                  <Mail size={16} />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@kenzengineering.com"
                  className="w-full rounded-xl border border-white/10 bg-white/[0.04] py-3 pl-10 pr-4 text-sm text-white placeholder-steel-500 transition-all focus:border-copper-500/80 focus:bg-white/[0.07] focus:outline-none focus:ring-1 focus:ring-copper-500/80"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between">
                <label className="block font-mono text-xs font-medium uppercase tracking-wider text-steel-300">
                  Password
                </label>
              </div>
              <div className="relative mt-2">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-steel-400">
                  <Lock size={16} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full rounded-xl border border-white/10 bg-white/[0.04] py-3 pl-10 pr-11 text-sm text-white placeholder-steel-500 transition-all focus:border-copper-500/80 focus:bg-white/[0.07] focus:outline-none focus:ring-1 focus:ring-copper-500/80"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-steel-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-copper-500 to-copper-600 py-3.5 text-sm font-semibold text-white shadow-lg shadow-copper-500/25 transition-all hover:from-copper-400 hover:to-copper-500 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Verifying Credentials...
                </>
              ) : (
                <>
                  <ShieldCheck size={17} />
                  Authorize & Sign In
                  <ArrowRight size={15} />
                </>
              )}
            </button>
          </form>

          {/* Development Quick-Fill Helper */}
          <div className="mt-6 border-t border-white/10 pt-5">
            <div className="rounded-lg border border-white/5 bg-white/[0.02] p-3 text-xs text-steel-400">
              <div className="flex items-center justify-between mb-1">
                <span className="font-mono text-[10px] uppercase text-copper-400">
                  Initial Admin Credential
                </span>
                <button
                  type="button"
                  onClick={fillDefaultCredentials}
                  className="text-[11px] text-copper-300 hover:text-copper-200 underline font-medium"
                >
                  Auto-fill
                </button>
              </div>
              <div className="font-mono text-[11px] text-steel-300">
                admin@kenzengineering.com / Admin@Kenz2026
              </div>
            </div>
          </div>
        </div>

        {/* Back Link */}
        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-steel-400 hover:text-copper-400 transition-colors"
          >
            ← Return to public website
          </Link>
        </div>
      </div>
    </div>
  );
}
