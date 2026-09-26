"use client";

import { useEffect, useState } from "react";
import {
  Search,
  Mail,
  Phone,
  Paperclip,
  Trash2,
  Eye,
  RefreshCw,
  X,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  Send,
  Building2,
  Calendar,
  Filter,
} from "lucide-react";

interface ContactMessageItem {
  _id: string;
  name: string;
  company: string;
  email: string;
  phone?: string;
  projectName: string;
  projectType: string;
  service: string;
  description: string;
  fileName?: string;
  fileSize?: string;
  status: "unread" | "read" | "replied" | "archived";
  notes?: string;
  createdAt: string;
}

interface MessageStats {
  total: number;
  unread: number;
  replied: number;
  archived: number;
  read: number;
}

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<ContactMessageItem[]>([]);
  const [stats, setStats] = useState<MessageStats>({
    total: 0,
    unread: 0,
    replied: 0,
    archived: 0,
    read: 0,
  });
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedMessage, setSelectedMessage] = useState<ContactMessageItem | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<ContactMessageItem | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [adminNotes, setAdminNotes] = useState("");
  const [savingNotes, setSavingNotes] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const fetchMessages = async () => {
    try {
      setRefreshing(true);
      const res = await fetch(`/api/admin/messages?_t=${Date.now()}`, {
        cache: "no-store",
        headers: { "Cache-Control": "no-cache" },
      });
      const data = await res.json();

      if (data.success) {
        setMessages(data.messages || []);
        if (data.stats) {
          setStats(data.stats);
        }
      }
    } catch (err) {
      console.error("Error loading inquiries:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  // Update status
  const handleUpdateStatus = async (
    id: string,
    newStatus: "unread" | "read" | "replied" | "archived",
    notes?: string
  ) => {
    try {
      setMessages((prev) =>
        prev.map((m) =>
          m._id === id
            ? { ...m, status: newStatus, ...(notes !== undefined ? { notes } : {}) }
            : m
        )
      );

      if (selectedMessage && selectedMessage._id === id) {
        setSelectedMessage((prev) =>
          prev
            ? { ...prev, status: newStatus, ...(notes !== undefined ? { notes } : {}) }
            : null
        );
      }

      await fetch(`/api/admin/messages/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus, notes }),
      });

      fetchMessages();
    } catch (err) {
      console.error("Status update error:", err);
      fetchMessages();
    }
  };

  // Save admin notes
  const handleSaveNotes = async () => {
    if (!selectedMessage) return;
    setSavingNotes(true);
    try {
      await fetch(`/api/admin/messages/${selectedMessage._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notes: adminNotes }),
      });
      showToast("Notes saved");
      fetchMessages();
    } catch (err) {
      console.error("Error saving notes:", err);
    } finally {
      setSavingNotes(false);
    }
  };

  // Delete message
  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    setDeleting(true);

    try {
      const res = await fetch(`/api/admin/messages/${deleteTarget._id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to delete inquiry");
      }

      setMessages((prev) => prev.filter((m) => m._id !== deleteTarget._id));
      if (selectedMessage?._id === deleteTarget._id) {
        setSelectedMessage(null);
      }
      setDeleteTarget(null);
      showToast("Inquiry deleted");
      fetchMessages();
    } catch (err) {
      console.error("Delete error:", err);
    } finally {
      setDeleting(false);
    }
  };

  // Open detail view
  const handleOpenDetail = (msg: ContactMessageItem) => {
    setSelectedMessage(msg);
    setAdminNotes(msg.notes || "");
    if (msg.status === "unread") {
      handleUpdateStatus(msg._id, "read");
    }
  };

  // Filter messages
  const filteredMessages = messages.filter((m) => {
    const q = search.toLowerCase();
    const matchesSearch =
      !q ||
      m.name.toLowerCase().includes(q) ||
      m.company.toLowerCase().includes(q) ||
      m.email.toLowerCase().includes(q) ||
      m.projectName.toLowerCase().includes(q) ||
      m.service.toLowerCase().includes(q) ||
      m.description.toLowerCase().includes(q);

    const matchesStatus = statusFilter === "all" || m.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-[#0f172a] px-4 py-2.5 text-xs font-medium text-emerald-300 shadow-xl">
          <CheckCircle2 size={15} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Clean Enterprise Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-white/10 pb-5">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight text-white">
              Inquiries
            </h1>
            <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-xs font-semibold text-steel-300">
              {stats.total}
            </span>
            {stats.unread > 0 && (
              <span className="rounded-full bg-copper-500/20 border border-copper-500/30 px-2.5 py-0.5 text-xs font-semibold text-copper-300">
                {stats.unread} unread
              </span>
            )}
          </div>
          <p className="mt-1 text-xs text-steel-400">
            Client RFQs and drawing intake submissions from the public website
          </p>
        </div>

        <button
          onClick={fetchMessages}
          disabled={refreshing}
          className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-[#111827] px-3.5 py-2 text-xs font-medium text-steel-300 hover:border-white/20 hover:text-white transition-all disabled:opacity-50 self-start sm:self-auto"
        >
          <RefreshCw
            size={13}
            className={refreshing ? "animate-spin text-copper-400" : "text-steel-400"}
          />
          <span>Refresh</span>
        </button>
      </div>

      {/* Control Bar: Search & Status Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-steel-400" />
          <input
            type="text"
            placeholder="Filter inquiries..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-white/10 bg-[#111827] py-2 pl-9 pr-3 text-xs text-white placeholder-steel-500 focus:border-copper-500/60 focus:outline-none"
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1 rounded-lg border border-white/10 bg-[#111827] p-1">
          {[
            { id: "all", label: "All", count: stats.total },
            { id: "unread", label: "Unread", count: stats.unread },
            { id: "read", label: "Reviewed", count: stats.read },
            { id: "replied", label: "Replied", count: stats.replied },
            { id: "archived", label: "Archived", count: stats.archived },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id)}
              className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                statusFilter === tab.id
                  ? "bg-white/10 text-white font-semibold"
                  : "text-steel-400 hover:text-white"
              }`}
            >
              <span>{tab.label}</span>
              <span className="ml-1 text-[10px] opacity-60">({tab.count})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Inquiries Table / Inbox List */}
      <div className="rounded-xl border border-white/10 bg-[#111827] overflow-hidden shadow-sm">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <RefreshCw size={20} className="animate-spin text-copper-400 mb-2" />
            <span className="text-xs text-steel-400">Loading inquiries...</span>
          </div>
        ) : filteredMessages.length === 0 ? (
          <div className="py-16 text-center">
            <div className="mx-auto grid h-10 w-10 place-items-center rounded-lg border border-white/10 bg-white/5 text-steel-400 mb-2">
              <Mail size={18} />
            </div>
            <div className="text-sm font-medium text-white">No inquiries found</div>
            <p className="mt-1 text-xs text-steel-500 max-w-sm mx-auto">
              {search || statusFilter !== "all"
                ? "No inquiries match your current filter criteria."
                : "New client project inquiries will show up here as they arrive."}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {/* Desktop Table Header */}
            <div className="hidden md:grid grid-cols-12 gap-4 px-5 py-2.5 bg-white/[0.02] text-[11px] font-medium uppercase tracking-wider text-steel-400 border-b border-white/5">
              <div className="col-span-3">Client</div>
              <div className="col-span-4">Project & Scope</div>
              <div className="col-span-2">Service</div>
              <div className="col-span-2">Date</div>
              <div className="col-span-1 text-right">Status</div>
            </div>

            {/* Rows */}
            {filteredMessages.map((msg) => {
              const isUnread = msg.status === "unread";
              const formattedDate = new Date(msg.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              });

              return (
                <div
                  key={msg._id}
                  onClick={() => handleOpenDetail(msg)}
                  className={`group grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 items-center px-5 py-3.5 transition-colors cursor-pointer ${
                    isUnread
                      ? "bg-copper-500/[0.04] hover:bg-copper-500/[0.08]"
                      : "hover:bg-white/[0.02]"
                  }`}
                >
                  {/* Client Column */}
                  <div className="md:col-span-3 flex items-center gap-3 min-w-0">
                    <div
                      className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg text-xs font-semibold uppercase ${
                        isUnread
                          ? "bg-copper-500/20 text-copper-300 border border-copper-500/40"
                          : "bg-white/5 text-steel-400 border border-white/10"
                      }`}
                    >
                      {msg.name.substring(0, 2)}
                    </div>
                    <div className="min-w-0">
                      <div
                        className={`truncate text-xs ${
                          isUnread ? "font-bold text-white" : "font-medium text-steel-200"
                        }`}
                      >
                        {msg.name}
                      </div>
                      <div className="truncate text-[11px] text-steel-400">
                        {msg.company}
                      </div>
                    </div>
                  </div>

                  {/* Project & Scope Column */}
                  <div className="md:col-span-4 min-w-0">
                    <div className="flex items-center gap-2">
                      <span
                        className={`truncate text-xs ${
                          isUnread ? "font-semibold text-white" : "text-steel-200"
                        }`}
                      >
                        {msg.projectName}
                      </span>
                      {msg.fileName && (
                        <span title={`Attached: ${msg.fileName}`} className="text-copper-400 shrink-0">
                          <Paperclip size={12} />
                        </span>
                      )}
                    </div>
                    <div className="truncate text-[11px] text-steel-400">
                      {msg.description}
                    </div>
                  </div>

                  {/* Service Column */}
                  <div className="md:col-span-2 hidden md:block">
                    <span className="inline-block truncate rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] text-steel-300">
                      {msg.service}
                    </span>
                  </div>

                  {/* Date Column */}
                  <div className="md:col-span-2 hidden md:block text-xs text-steel-400">
                    {formattedDate}
                  </div>

                  {/* Status / Quick Action Column */}
                  <div className="md:col-span-1 flex items-center justify-between md:justify-end gap-2">
                    <span
                      className={`inline-flex items-center gap-1.5 text-xs ${
                        msg.status === "unread"
                          ? "text-copper-400 font-semibold"
                          : msg.status === "replied"
                          ? "text-emerald-400"
                          : msg.status === "archived"
                          ? "text-steel-500"
                          : "text-steel-400"
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          msg.status === "unread"
                            ? "bg-copper-400 animate-pulse"
                            : msg.status === "replied"
                            ? "bg-emerald-400"
                            : msg.status === "archived"
                            ? "bg-steel-500"
                            : "bg-blue-400"
                        }`}
                      />
                      <span className="capitalize">{msg.status}</span>
                    </span>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setDeleteTarget(msg);
                      }}
                      title="Delete"
                      className="opacity-0 group-hover:opacity-100 rounded p-1 text-steel-400 hover:text-red-400 transition-opacity"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Detail Slide-Over Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="relative w-full max-w-xl rounded-xl border border-white/10 bg-[#0f172a] p-6 text-white shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-[11px] font-medium uppercase tracking-wider text-copper-400">
                  {selectedMessage.service} • {selectedMessage.projectType}
                </span>
                <h2 className="text-lg font-bold text-white mt-0.5">
                  {selectedMessage.projectName}
                </h2>
                <div className="text-xs text-steel-400 mt-0.5">
                  Received on {new Date(selectedMessage.createdAt).toLocaleString()}
                </div>
              </div>
              <button
                onClick={() => setSelectedMessage(null)}
                className="rounded-lg p-1.5 text-steel-400 hover:bg-white/5 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-5 space-y-5 max-h-[65vh] overflow-y-auto pr-1 text-xs">
              {/* Client Info Grid */}
              <div className="grid grid-cols-2 gap-3 rounded-lg border border-white/5 bg-[#111827] p-3.5">
                <div>
                  <div className="text-[10px] uppercase text-steel-400">Contact</div>
                  <div className="font-semibold text-white mt-0.5">{selectedMessage.name}</div>
                  <div className="text-steel-400">{selectedMessage.company}</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase text-steel-400">Communication</div>
                  <div className="mt-0.5">
                    <a
                      href={`mailto:${selectedMessage.email}`}
                      className="text-copper-400 hover:underline block truncate"
                    >
                      {selectedMessage.email}
                    </a>
                    {selectedMessage.phone && (
                      <a
                        href={`tel:${selectedMessage.phone}`}
                        className="text-steel-300 hover:underline block"
                      >
                        {selectedMessage.phone}
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Message Scope */}
              <div>
                <div className="text-[10px] uppercase text-steel-400 mb-1.5">
                  Inquiry Description & Scope
                </div>
                <div className="rounded-lg border border-white/5 bg-[#111827] p-3.5 text-steel-200 leading-relaxed whitespace-pre-wrap">
                  {selectedMessage.description}
                </div>
              </div>

              {/* Attachment if present */}
              {selectedMessage.fileName && (
                <div>
                  <div className="text-[10px] uppercase text-steel-400 mb-1.5">
                    Attached Drawing / Package
                  </div>
                  <div className="flex items-center justify-between rounded-lg border border-white/10 bg-[#111827] px-3.5 py-2.5">
                    <div className="flex items-center gap-2.5">
                      <Paperclip size={14} className="text-copper-400" />
                      <div>
                        <div className="font-medium text-white">{selectedMessage.fileName}</div>
                        <div className="text-[10px] text-steel-400">{selectedMessage.fileSize || "Attachment"}</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Status & Notes */}
              <div className="space-y-3 border-t border-white/10 pt-4">
                <div className="flex items-center justify-between">
                  <label className="text-steel-300 font-medium">Status</label>
                  <select
                    value={selectedMessage.status}
                    onChange={(e) =>
                      handleUpdateStatus(
                        selectedMessage._id,
                        e.target.value as "unread" | "read" | "replied" | "archived"
                      )
                    }
                    className="rounded-lg border border-white/10 bg-[#111827] px-3 py-1.5 text-xs text-white focus:outline-none"
                  >
                    <option value="unread">Unread</option>
                    <option value="read">Reviewed</option>
                    <option value="replied">Replied</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>

                <div>
                  <label className="text-steel-300 font-medium block mb-1">
                    Internal Notes
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Add team notes on drawings, timeline, or assigned detailer..."
                    value={adminNotes}
                    onChange={(e) => setAdminNotes(e.target.value)}
                    className="w-full rounded-lg border border-white/10 bg-[#111827] p-2.5 text-xs text-white placeholder-steel-500 focus:outline-none"
                  />
                  <div className="mt-1.5 flex justify-end">
                    <button
                      type="button"
                      onClick={handleSaveNotes}
                      disabled={savingNotes}
                      className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-steel-300 hover:bg-white/10 hover:text-white transition-colors"
                    >
                      {savingNotes ? "Saving..." : "Save Notes"}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
              <button
                type="button"
                onClick={() => setDeleteTarget(selectedMessage)}
                className="text-xs text-red-400 hover:text-red-300 transition-colors"
              >
                Delete Inquiry
              </button>

              <a
                href={`mailto:${selectedMessage.email}?subject=RE: ${encodeURIComponent(
                  selectedMessage.projectName
                )} - Kenz Engineering Detailing Inquiry`}
                className="inline-flex items-center gap-2 rounded-lg bg-copper-500 hover:bg-copper-600 px-4 py-2 text-xs font-semibold text-white transition-colors"
              >
                <Send size={13} />
                <span>Reply via Email</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-xl border border-white/10 bg-[#0f172a] p-5 text-white shadow-xl">
            <h3 className="text-sm font-bold">Delete Inquiry?</h3>
            <p className="mt-2 text-xs text-steel-400">
              Are you sure you want to delete the inquiry from{" "}
              <strong className="text-white">{deleteTarget.name}</strong> ({deleteTarget.projectName})? This action cannot be undone.
            </p>
            <div className="mt-5 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                className="rounded-lg border border-white/10 px-3 py-1.5 text-xs font-medium text-steel-300 hover:bg-white/5"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteConfirm}
                disabled={deleting}
                className="rounded-lg bg-red-600 hover:bg-red-700 px-3 py-1.5 text-xs font-medium text-white disabled:opacity-50"
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
