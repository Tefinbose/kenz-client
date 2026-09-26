"use client";

import { useEffect, useState } from "react";
import {
  Settings,
  Shield,
  Key,
  Mail,
  Building,
  Save,
  CheckCircle2,
  Lock,
  User,
  Database,
} from "lucide-react";

export default function AdminSettingsPage() {
  const [adminEmail, setAdminEmail] = useState("admin@kenzengineering.com");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [saved, setSaved] = useState(false);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Top Header */}
      <div className="border-b border-white/10 pb-6">
        <div className="flex items-center gap-2 font-mono text-xs text-copper-400 uppercase tracking-widest">
          <Settings size={14} />
          <span>System Configuration</span>
        </div>
        <h1 className="mt-1 font-display text-3xl font-bold uppercase tracking-tight text-white">
          Admin <span className="text-copper-400">Settings</span>
        </h1>
        <p className="mt-1 text-sm text-steel-400">
          Configure security credentials, contact email destinations, and system parameters.
        </p>
      </div>

      {saved && (
        <div className="flex items-center gap-2.5 rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-4 text-xs font-semibold text-emerald-300">
          <CheckCircle2 size={16} />
          Settings updated successfully.
        </div>
      )}

      {/* Account & Security Card */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8 backdrop-blur-xl">
        <div className="flex items-center gap-3 border-b border-white/10 pb-4 mb-6">
          <div className="grid h-9 w-9 place-items-center rounded-lg border border-copper-500/40 bg-copper-500/15 text-copper-400">
            <Lock size={18} />
          </div>
          <div>
            <h2 className="text-base font-bold text-white">Security & Password</h2>
            <p className="text-xs text-steel-400">Change administrator authentication password</p>
          </div>
        </div>

        <form onSubmit={handlePasswordSubmit} className="space-y-4 max-w-lg">
          <div>
            <label className="block font-mono text-xs text-steel-300 mb-1">
              Administrator Email
            </label>
            <input
              type="email"
              value={adminEmail}
              disabled
              className="w-full rounded-xl border border-white/10 bg-white/[0.02] px-3.5 py-2.5 text-xs text-steel-400 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block font-mono text-xs text-steel-300 mb-1">
              Current Password
            </label>
            <input
              type="password"
              placeholder="••••••••••••"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-xs text-white placeholder-steel-500 focus:border-copper-500/80 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-mono text-xs text-steel-300 mb-1">
              New Password
            </label>
            <input
              type="password"
              placeholder="••••••••••••"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-xs text-white placeholder-steel-500 focus:border-copper-500/80 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-mono text-xs text-steel-300 mb-1">
              Confirm New Password
            </label>
            <input
              type="password"
              placeholder="••••••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-xs text-white placeholder-steel-500 focus:border-copper-500/80 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-copper-500 to-copper-600 px-5 py-2.5 text-xs font-semibold text-white shadow-md shadow-copper-500/20 hover:from-copper-400 hover:to-copper-500 transition-all mt-2"
          >
            <Save size={14} />
            <span>Update Password</span>
          </button>
        </form>
      </div>

      {/* System Information Card */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8 backdrop-blur-xl">
        <div className="flex items-center gap-3 border-b border-white/10 pb-4 mb-6">
          <div className="grid h-9 w-9 place-items-center rounded-lg border border-blue-500/40 bg-blue-500/15 text-blue-400">
            <Database size={18} />
          </div>
          <div>
            <h2 className="text-base font-bold text-white">Environment Details</h2>
            <p className="text-xs text-steel-400">Active server connection and configuration</p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 font-mono text-xs">
          <div className="rounded-xl border border-white/5 bg-white/[0.01] p-3.5">
            <div className="text-steel-400 text-[10px] uppercase">Node Environment</div>
            <div className="mt-1 text-white font-semibold">{process.env.NODE_ENV || "development"}</div>
          </div>
          <div className="rounded-xl border border-white/5 bg-white/[0.01] p-3.5">
            <div className="text-steel-400 text-[10px] uppercase">CMS Portal Status</div>
            <div className="mt-1 text-emerald-400 font-semibold">Active & Secured</div>
          </div>
        </div>
      </div>
    </div>
  );
}
