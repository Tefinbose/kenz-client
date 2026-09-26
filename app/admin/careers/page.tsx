"use client";

import { useEffect, useState, FormEvent } from "react";
import {
  Briefcase,
  Plus,
  Search,
  Edit2,
  Trash2,
  CheckCircle2,
  XCircle,
  MapPin,
  Clock,
  Building,
  Loader2,
  AlertCircle,
  X,
  Eye,
  EyeOff,
  ChevronDown,
  Sparkles,
  Layers,
  ArrowUpRight,
  Filter,
} from "lucide-react";

interface CareerItem {
  _id: string;
  title: string;
  slug: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  benefits: string[];
  isActive: boolean;
  order: number;
  createdAt: string;
}

export default function AdminCareersPage() {
  const [careers, setCareers] = useState<CareerItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedDept, setSelectedDept] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  // Modal states
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCareer, setEditingCareer] = useState<CareerItem | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // Delete confirmation modal state
  const [deleteTarget, setDeleteTarget] = useState<CareerItem | null>(null);
  const [deleting, setDeleting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    department: "Structural Detailing",
    location: "Remote / Hybrid",
    type: "Full-Time",
    experience: "3+ years",
    description: "",
    requirements: [""],
    responsibilities: [""],
    benefits: [""],
    isActive: true,
  });

  const fetchCareers = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("/api/admin/careers");
      const data = await res.json();
      if (data.success) {
        setCareers(data.careers || []);
      } else {
        throw new Error(data.error || "Failed to load careers");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error loading careers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCareers();
  }, []);

  const showToast = (msg: string) => {
    setSuccessToast(msg);
    setTimeout(() => setSuccessToast(null), 3500);
  };

  // Open modal for Create
  const handleOpenCreate = () => {
    setEditingCareer(null);
    setFormData({
      title: "",
      department: "Structural Detailing",
      location: "Remote / Hybrid",
      type: "Full-Time",
      experience: "3+ years",
      description: "",
      requirements: ["Proficiency in structural steel detailing or BIM modeling."],
      responsibilities: ["Prepare and coordinate structural steel fabrication drawings."],
      benefits: ["Competitive compensation and remote work flexibility."],
      isActive: true,
    });
    setModalOpen(true);
  };

  // Open modal for Edit
  const handleOpenEdit = (career: CareerItem) => {
    setEditingCareer(career);
    setFormData({
      title: career.title,
      department: career.department,
      location: career.location,
      type: career.type,
      experience: career.experience,
      description: career.description,
      requirements: career.requirements?.length ? [...career.requirements] : [""],
      responsibilities: career.responsibilities?.length ? [...career.responsibilities] : [""],
      benefits: career.benefits?.length ? [...career.benefits] : [""],
      isActive: career.isActive,
    });
    setModalOpen(true);
  };

  // Toggle publish / unpublish status
  const handleToggleStatus = async (career: CareerItem) => {
    try {
      const newStatus = !career.isActive;
      // Optimistic update
      setCareers((prev) =>
        prev.map((c) => (c._id === career._id ? { ...c, isActive: newStatus } : c))
      );

      const res = await fetch(`/api/admin/careers/${career._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: newStatus }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to update status");
      }

      showToast(`Position marked as ${newStatus ? "Published" : "Draft"}`);
    } catch (err) {
      fetchCareers(); // Revert on error
      setError(err instanceof Error ? err.message : "Failed to toggle status");
    }
  };

  // Submit Create or Edit Form
  const handleSubmitForm = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      // Clean up empty list items
      const payload = {
        ...formData,
        requirements: formData.requirements.filter((r) => r.trim() !== ""),
        responsibilities: formData.responsibilities.filter((r) => r.trim() !== ""),
        benefits: formData.benefits.filter((b) => b.trim() !== ""),
      };

      const url = editingCareer
        ? `/api/admin/careers/${editingCareer._id}`
        : "/api/admin/careers";
      const method = editingCareer ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to save career");
      }

      setModalOpen(false);
      showToast(
        editingCareer
          ? "Career opening updated successfully"
          : "New career opening published successfully"
      );
      fetchCareers();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Submission failed");
    } finally {
      setSubmitting(false);
    }
  };

  // Delete Career
  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    setDeleting(true);

    try {
      const res = await fetch(`/api/admin/careers/${deleteTarget._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to delete career");
      }

      setCareers((prev) => prev.filter((c) => c._id !== deleteTarget._id));
      showToast("Career opening removed successfully");
      setDeleteTarget(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed");
    } finally {
      setDeleting(false);
    }
  };

  // Array item helpers
  const handleListChange = (
    field: "requirements" | "responsibilities" | "benefits",
    idx: number,
    value: string
  ) => {
    const list = [...formData[field]];
    list[idx] = value;
    setFormData((prev) => ({ ...prev, [field]: list }));
  };

  const handleAddListItem = (field: "requirements" | "responsibilities" | "benefits") => {
    setFormData((prev) => ({ ...prev, [field]: [...prev[field], ""] }));
  };

  const handleRemoveListItem = (
    field: "requirements" | "responsibilities" | "benefits",
    idx: number
  ) => {
    const list = formData[field].filter((_, i) => i !== idx);
    setFormData((prev) => ({ ...prev, [field]: list.length ? list : [""] }));
  };

  // Filtered careers
  const filteredCareers = careers.filter((c) => {
    const matchesSearch =
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.department.toLowerCase().includes(search.toLowerCase()) ||
      c.location.toLowerCase().includes(search.toLowerCase());

    const matchesDept = selectedDept === "all" || c.department === selectedDept;
    const matchesStatus =
      selectedStatus === "all" ||
      (selectedStatus === "active" && c.isActive) ||
      (selectedStatus === "inactive" && !c.isActive);

    return matchesSearch && matchesDept && matchesStatus;
  });

  const departments = [
    "Structural Detailing",
    "BIM Services",
    "Engineering Support",
    "Estimation & Take-Off",
    "Project Coordination",
  ];

  const activeCount = careers.filter((c) => c.isActive).length;

  return (
    <div className="space-y-6">
      {/* ── TOAST NOTIFICATION ── */}
      {successToast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-xl border border-emerald-500/40 bg-[#091528] px-5 py-3 text-xs font-semibold text-emerald-300 shadow-2xl backdrop-blur-md">
          <CheckCircle2 size={16} className="text-emerald-400" />
          <span>{successToast}</span>
        </div>
      )}

      {/* ── TOP HEADER ── */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-copper-400 uppercase tracking-widest">
            <Briefcase size={14} />
            <span>Recruitment & Talent Management</span>
          </div>
          <h1 className="mt-1 font-display text-3xl font-bold uppercase tracking-tight text-white">
            Careers <span className="text-copper-400">& Job Openings</span>
          </h1>
          <p className="mt-1 text-sm text-steel-400">
            Publish engineering opportunities, structural detailing roles, and coordinate job openings.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-copper-500 to-copper-600 px-4 py-2.5 text-xs font-semibold text-white shadow-lg shadow-copper-500/20 hover:from-copper-400 hover:to-copper-500 transition-all self-start sm:self-center"
        >
          <Plus size={16} />
          <span>Post New Opening</span>
        </button>
      </div>

      {/* ── METRIC TILES ── */}
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-4">
        <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
          <div className="font-mono text-[10px] uppercase text-steel-400">Total Openings</div>
          <div className="text-2xl font-bold font-display text-white mt-1">{careers.length}</div>
        </div>
        <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-4">
          <div className="font-mono text-[10px] uppercase text-emerald-400">Live / Published</div>
          <div className="text-2xl font-bold font-display text-emerald-300 mt-1">{activeCount}</div>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
          <div className="font-mono text-[10px] uppercase text-steel-400">Drafts / Inactive</div>
          <div className="text-2xl font-bold font-display text-steel-300 mt-1">
            {careers.length - activeCount}
          </div>
        </div>
        <div className="rounded-xl border border-copper-500/30 bg-copper-500/5 p-4">
          <div className="font-mono text-[10px] uppercase text-copper-400">Public Visibility</div>
          <div className="text-xs font-semibold text-copper-300 mt-2 flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-copper-400 animate-pulse" />
            Live Sync Enabled
          </div>
        </div>
      </div>

      {/* ── SEARCH & FILTER CONTROLS ── */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-steel-400" />
          <input
            type="text"
            placeholder="Search roles by title, department, or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/[0.03] py-2.5 pl-10 pr-4 text-xs text-white placeholder-steel-500 focus:border-copper-500/80 focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Department Filter */}
          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="rounded-xl border border-white/10 bg-[#091122] px-3 py-2 text-xs text-steel-300 focus:border-copper-500/80 focus:outline-none"
          >
            <option value="all">All Departments</option>
            {departments.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="rounded-xl border border-white/10 bg-[#091122] px-3 py-2 text-xs text-steel-300 focus:border-copper-500/80 focus:outline-none"
          >
            <option value="all">All Status</option>
            <option value="active">Published</option>
            <option value="inactive">Draft / Hidden</option>
          </select>
        </div>
      </div>

      {/* ── CAREERS LIST / CARDS ── */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <Loader2 size={24} className="animate-spin text-copper-400 mb-3" />
          <span className="font-mono text-xs text-steel-400">Loading careers from MongoDB...</span>
        </div>
      ) : filteredCareers.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-12 text-center backdrop-blur-xl">
          <div className="mx-auto grid h-12 w-12 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-steel-500 mb-3">
            <Briefcase size={22} />
          </div>
          <h3 className="text-base font-semibold text-white">No Career Postings Found</h3>
          <p className="mt-1 text-xs text-steel-400 max-w-sm mx-auto">
            {search || selectedDept !== "all" || selectedStatus !== "all"
              ? "Try adjusting your search criteria or clear active filters."
              : "Click 'Post New Opening' to create the first career posting."}
          </p>
          {(search || selectedDept !== "all" || selectedStatus !== "all") && (
            <button
              onClick={() => {
                setSearch("");
                setSelectedDept("all");
                setSelectedStatus("all");
              }}
              className="mt-4 text-xs font-semibold text-copper-400 hover:text-copper-300 underline"
            >
              Reset Filters
            </button>
          )}
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredCareers.map((career) => (
            <div
              key={career._id}
              className="group relative rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-all hover:border-copper-500/40 hover:bg-white/[0.04]"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                {/* Left Role Info */}
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full border border-copper-500/40 bg-copper-500/15 px-3 py-0.5 font-mono text-[10px] font-semibold text-copper-300">
                      {career.department}
                    </span>
                    <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 font-mono text-[10px] text-steel-400">
                      {career.type}
                    </span>
                    <span className="inline-flex items-center gap-1 font-mono text-[11px] text-steel-400">
                      <MapPin size={12} className="text-copper-400" />
                      {career.location}
                    </span>
                    <span className="inline-flex items-center gap-1 font-mono text-[11px] text-steel-400">
                      <Clock size={12} className="text-steel-500" />
                      {career.experience}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-copper-300 transition-colors">
                    {career.title}
                  </h3>

                  <p className="text-xs text-steel-400 max-w-3xl line-clamp-2">
                    {career.description}
                  </p>
                </div>

                {/* Right Actions & Status */}
                <div className="flex items-center gap-2.5 self-start lg:self-center border-t border-white/5 pt-4 lg:border-t-0 lg:pt-0">
                  {/* Publish Toggle Button */}
                  <button
                    onClick={() => handleToggleStatus(career)}
                    className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 font-mono text-xs font-semibold transition-all border ${
                      career.isActive
                        ? "border-emerald-500/40 bg-emerald-500/15 text-emerald-300 hover:bg-emerald-500/25"
                        : "border-white/10 bg-white/5 text-steel-400 hover:bg-white/10 hover:text-white"
                    }`}
                    title={career.isActive ? "Click to set as Draft" : "Click to Publish"}
                  >
                    {career.isActive ? (
                      <>
                        <CheckCircle2 size={13} className="text-emerald-400" />
                        Published
                      </>
                    ) : (
                      <>
                        <EyeOff size={13} />
                        Draft
                      </>
                    )}
                  </button>

                  {/* Edit Button */}
                  <button
                    onClick={() => handleOpenEdit(career)}
                    className="rounded-xl border border-white/10 bg-white/[0.04] p-2 text-steel-300 hover:border-copper-500/40 hover:bg-copper-500/10 hover:text-copper-300 transition-all"
                    title="Edit Career Opening"
                  >
                    <Edit2 size={15} />
                  </button>

                  {/* Delete Button */}
                  <button
                    onClick={() => setDeleteTarget(career)}
                    className="rounded-xl border border-red-500/20 bg-red-500/5 p-2 text-red-400 hover:border-red-500/50 hover:bg-red-500/15 transition-all"
                    title="Delete Career Opening"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── CREATE / EDIT CAREER MODAL ── */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-2xl rounded-2xl border border-white/10 bg-[#091224] p-6 sm:p-8 text-white shadow-2xl my-8">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-copper-400">
                  {editingCareer ? "Edit Posting" : "New Career Opportunity"}
                </span>
                <h2 className="text-xl font-bold font-display uppercase tracking-wide text-white">
                  {editingCareer ? editingCareer.title : "Create Job Opening"}
                </h2>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="rounded-lg p-1.5 text-steel-400 hover:bg-white/5 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            {error && (
              <div className="mt-4 flex items-center gap-2 rounded-xl border border-red-500/40 bg-red-500/10 p-3 text-xs text-red-300">
                <AlertCircle size={15} className="shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmitForm} className="mt-5 space-y-4 max-h-[70vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/10">
              {/* Title */}
              <div>
                <label className="block font-mono text-xs text-steel-300 mb-1">
                  Job Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Senior Tekla Steel Detailer"
                  value={formData.title}
                  onChange={(e) => setFormData((p) => ({ ...p, title: e.target.value }))}
                  className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-xs text-white placeholder-steel-500 focus:border-copper-500/80 focus:outline-none"
                />
              </div>

              {/* Department & Employment Type */}
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="block font-mono text-xs text-steel-300 mb-1">
                    Department *
                  </label>
                  <select
                    value={formData.department}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, department: e.target.value }))
                    }
                    className="w-full rounded-xl border border-white/10 bg-[#0a162b] px-3 py-2.5 text-xs text-white focus:border-copper-500/80 focus:outline-none"
                  >
                    {departments.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-mono text-xs text-steel-300 mb-1">
                    Employment Type *
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData((p) => ({ ...p, type: e.target.value }))}
                    className="w-full rounded-xl border border-white/10 bg-[#0a162b] px-3 py-2.5 text-xs text-white focus:border-copper-500/80 focus:outline-none"
                  >
                    <option value="Full-Time">Full-Time</option>
                    <option value="Contract / Project-Based">Contract / Project-Based</option>
                    <option value="Part-Time">Part-Time</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>
              </div>

              {/* Location & Experience */}
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="block font-mono text-xs text-steel-300 mb-1">
                    Location *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Remote / Hybrid, or Sheridan, WY"
                    value={formData.location}
                    onChange={(e) => setFormData((p) => ({ ...p, location: e.target.value }))}
                    className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-xs text-white placeholder-steel-500 focus:border-copper-500/80 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-mono text-xs text-steel-300 mb-1">
                    Experience Level *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 3-5 years, or 5+ years"
                    value={formData.experience}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, experience: e.target.value }))
                    }
                    className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-xs text-white placeholder-steel-500 focus:border-copper-500/80 focus:outline-none"
                  />
                </div>
              </div>

              {/* Overview Description */}
              <div>
                <label className="block font-mono text-xs text-steel-300 mb-1">
                  Role Overview & Description *
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Summary of responsibilities and technical mission..."
                  value={formData.description}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, description: e.target.value }))
                  }
                  className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-xs text-white placeholder-steel-500 focus:border-copper-500/80 focus:outline-none"
                />
              </div>

              {/* Dynamic Responsibilities */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="font-mono text-xs text-steel-300">
                    Key Responsibilities
                  </label>
                  <button
                    type="button"
                    onClick={() => handleAddListItem("responsibilities")}
                    className="text-[11px] text-copper-400 hover:text-copper-300 font-mono"
                  >
                    + Add Item
                  </button>
                </div>
                <div className="space-y-2">
                  {formData.responsibilities.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="e.g. Produce coordinated 3D Tekla structural models"
                        value={item}
                        onChange={(e) =>
                          handleListChange("responsibilities", idx, e.target.value)
                        }
                        className="flex-1 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-xs text-white focus:border-copper-500/80 focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveListItem("responsibilities", idx)}
                        className="p-1.5 text-steel-500 hover:text-red-400"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dynamic Requirements */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="font-mono text-xs text-steel-300">
                    Candidate Requirements
                  </label>
                  <button
                    type="button"
                    onClick={() => handleAddListItem("requirements")}
                    className="text-[11px] text-copper-400 hover:text-copper-300 font-mono"
                  >
                    + Add Item
                  </button>
                </div>
                <div className="space-y-2">
                  {formData.requirements.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="e.g. 3+ years experience with AISC structural steel standards"
                        value={item}
                        onChange={(e) =>
                          handleListChange("requirements", idx, e.target.value)
                        }
                        className="flex-1 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-xs text-white focus:border-copper-500/80 focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveListItem("requirements", idx)}
                        className="p-1.5 text-steel-500 hover:text-red-400"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Publish Toggle Checkbox */}
              <div className="flex items-center gap-3 border-t border-white/10 pt-4">
                <input
                  type="checkbox"
                  id="isActiveToggle"
                  checked={formData.isActive}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, isActive: e.target.checked }))
                  }
                  className="h-4 w-4 rounded border-white/20 bg-white/5 text-copper-500 focus:ring-copper-500/50"
                />
                <label
                  htmlFor="isActiveToggle"
                  className="text-xs font-semibold text-white select-none cursor-pointer"
                >
                  Publish immediately (visible on public /careers page)
                </label>
              </div>

              {/* Modal Actions */}
              <div className="flex items-center justify-end gap-3 border-t border-white/10 pt-4">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="rounded-xl border border-white/10 px-4 py-2.5 text-xs font-semibold text-steel-300 hover:bg-white/5"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-copper-500 to-copper-600 px-5 py-2.5 text-xs font-semibold text-white shadow-lg shadow-copper-500/20 hover:from-copper-400 hover:to-copper-500 disabled:opacity-50"
                >
                  {submitting ? (
                    <>
                      <Loader2 size={14} className="animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <span>{editingCareer ? "Update Posting" : "Publish Career"}</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── DELETE CONFIRMATION MODAL ── */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-red-500/30 bg-[#0d1729] p-6 text-white shadow-2xl">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl border border-red-500/30 bg-red-500/10 text-red-400">
                <Trash2 size={20} />
              </div>
              <div>
                <h3 className="text-base font-bold">Delete Career Opening?</h3>
                <p className="text-xs text-steel-400">This action cannot be undone.</p>
              </div>
            </div>

            <p className="mt-4 text-xs text-steel-300">
              Are you sure you want to permanently delete{" "}
              <span className="font-semibold text-white">"{deleteTarget.title}"</span>?
            </p>

            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                className="rounded-xl border border-white/10 px-4 py-2 text-xs font-semibold text-steel-300 hover:bg-white/5"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteConfirm}
                disabled={deleting}
                className="inline-flex items-center gap-1.5 rounded-xl bg-red-500 px-4 py-2 text-xs font-semibold text-white hover:bg-red-600 disabled:opacity-50"
              >
                {deleting ? (
                  <>
                    <Loader2 size={13} className="animate-spin" />
                    Deleting...
                  </>
                ) : (
                  <span>Delete Opening</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
