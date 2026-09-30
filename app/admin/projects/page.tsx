"use client";

import { useEffect, useState, FormEvent } from "react";
import Link from "next/link";
import {
  Layers,
  Plus,
  Search,
  ExternalLink,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  FolderGit2,
  Loader2,
  AlertCircle,
  X,
  Filter,
  CheckCircle2,
  Star,
  Ruler,
  Box,
  Cable,
  Layers3,
  ScanLine,
  Calculator,
} from "lucide-react";

interface ProjectItem {
  _id: string;
  title: string;
  slug: string;
  number?: string;
  tag?: string;
  category: string;
  description: string;
  detailedScope?: string[];
  icon?: string;
  href?: string;
  client?: string;
  location?: string;
  year?: string;
  featured: boolean;
  order: number;
  isPublished: boolean;
  createdAt: string;
}

const iconMap: Record<string, typeof Ruler> = {
  Ruler,
  Box,
  Cable,
  Layers3,
  ScanLine,
  Calculator,
  Layers,
};

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  // Modal states
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // Delete state
  const [deleteTarget, setDeleteTarget] = useState<ProjectItem | null>(null);
  const [deleting, setDeleting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    number: "01",
    tag: "Structural",
    category: "Structural",
    description: "",
    scopeText: "",
    icon: "Ruler",
    href: "/services/steel-detailing",
    client: "",
    location: "USA",
    year: "2026",
    order: 1,
    isPublished: true,
    featured: false,
  });

  const categories = [
    "Structural",
    "Miscellaneous",
    "Engineering",
    "BIM",
    "Estimation",
  ];

  const availableIcons = ["Ruler", "Box", "Layers3", "ScanLine", "Cable", "Calculator", "Layers"];

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`/api/admin/projects?_t=${Date.now()}`, {
        cache: "no-store",
      });
      const data = await res.json();
      if (data.success) {
        setProjects(data.projects || []);
      } else {
        throw new Error(data.error || "Failed to load projects");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error loading projects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const showToast = (msg: string) => {
    setSuccessToast(msg);
    setTimeout(() => setSuccessToast(null), 4000);
  };

  const openCreateModal = () => {
    setEditingProject(null);
    const nextOrder = projects.length + 1;
    const nextNumber = nextOrder < 10 ? `0${nextOrder}` : `${nextOrder}`;
    setFormData({
      title: "",
      number: nextNumber,
      tag: "Structural",
      category: "Structural",
      description: "",
      scopeText: "",
      icon: "Ruler",
      href: "/services",
      client: "",
      location: "USA",
      year: "2026",
      order: nextOrder,
      isPublished: true,
      featured: false,
    });
    setModalOpen(true);
  };

  const openEditModal = (project: ProjectItem) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      number: project.number || "01",
      tag: project.tag || "Structural",
      category: project.category || "Structural",
      description: project.description,
      scopeText: (project.detailedScope || []).join("\n"),
      icon: project.icon || "Ruler",
      href: project.href || "/services",
      client: project.client || "",
      location: project.location || "USA",
      year: project.year || "2026",
      order: project.order || 1,
      isPublished: project.isPublished,
      featured: project.featured || false,
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const detailedScope = formData.scopeText
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean);

      const payload = {
        title: formData.title,
        number: formData.number,
        tag: formData.tag,
        category: formData.category,
        description: formData.description,
        detailedScope,
        icon: formData.icon,
        href: formData.href,
        client: formData.client || undefined,
        location: formData.location || undefined,
        year: formData.year || undefined,
        order: Number(formData.order),
        isPublished: formData.isPublished,
        featured: formData.featured,
      };

      const url = editingProject
        ? `/api/admin/projects/${editingProject._id}`
        : "/api/admin/projects";
      const method = editingProject ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!data.success) {
        throw new Error(data.error || "Failed to save project record");
      }

      showToast(
        editingProject
          ? "Project updated successfully!"
          : "Project portfolio item created successfully!"
      );
      setModalOpen(false);
      fetchProjects();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error saving project");
    } finally {
      setSubmitting(false);
    }
  };

  const handleTogglePublish = async (project: ProjectItem) => {
    try {
      const res = await fetch(`/api/admin/projects/${project._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isPublished: !project.isPublished }),
      });
      const data = await res.json();
      if (data.success) {
        setProjects((prev) =>
          prev.map((p) =>
            p._id === project._id ? { ...p, isPublished: !p.isPublished } : p
          )
        );
        showToast(
          !project.isPublished ? "Project is now live" : "Project moved to draft"
        );
      }
    } catch (err) {
      console.error("Toggle publish error:", err);
    }
  };

  const handleToggleFeatured = async (project: ProjectItem) => {
    try {
      const res = await fetch(`/api/admin/projects/${project._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ featured: !project.featured }),
      });
      const data = await res.json();
      if (data.success) {
        setProjects((prev) =>
          prev.map((p) =>
            p._id === project._id ? { ...p, featured: !p.featured } : p
          )
        );
        showToast(!project.featured ? "Marked as featured" : "Removed from featured");
      }
    } catch (err) {
      console.error("Toggle featured error:", err);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      setDeleting(true);
      const res = await fetch(`/api/admin/projects/${deleteTarget._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setProjects((prev) => prev.filter((p) => p._id !== deleteTarget._id));
        showToast("Project record deleted successfully");
        setDeleteTarget(null);
      } else {
        throw new Error(data.error || "Failed to delete project");
      }
    } catch (err) {
      showToast(err instanceof Error ? err.message : "Error deleting project");
    } finally {
      setDeleting(false);
    }
  };

  const filteredProjects = projects.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase()) ||
      (p.tag && p.tag.toLowerCase().includes(search.toLowerCase())) ||
      p.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || p.category === selectedCategory;
    const matchesStatus =
      selectedStatus === "all" ||
      (selectedStatus === "published" && p.isPublished) ||
      (selectedStatus === "draft" && !p.isPublished);

    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {successToast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-xl bg-copper-500 px-5 py-3.5 text-sm font-semibold text-white shadow-2xl animate-in fade-in slide-in-from-bottom-5">
          <CheckCircle2 size={18} />
          <span>{successToast}</span>
        </div>
      )}

      {/* Top Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-copper-400">
            <Layers size={14} />
            <span>Portfolio Management</span>
          </div>
          <h1 className="mt-1 font-display text-3xl font-bold uppercase tracking-tight text-white">
            Projects <span className="text-copper-400">& Technical Deliverables</span>
          </h1>
          <p className="mt-1 text-sm text-steel-400">
            Showcase structural detailing, BIM LOD 350-400, connection, and miscellaneous steel deliverables.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-copper-500 to-copper-600 px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-copper-500/20 hover:from-copper-400 hover:to-copper-500 transition-all self-start sm:self-center"
        >
          <Plus size={16} />
          <span>Add New Project</span>
        </button>
      </div>

      {/* Stats Counters */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-xl border border-white/10 bg-[#111827] p-4">
          <p className="text-xs text-steel-400 font-medium">Total Deliverables</p>
          <p className="mt-1 font-display text-2xl font-bold text-white">{projects.length}</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-[#111827] p-4">
          <p className="text-xs text-steel-400 font-medium">Published Live</p>
          <p className="mt-1 font-display text-2xl font-bold text-emerald-400">
            {projects.filter((p) => p.isPublished).length}
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-[#111827] p-4">
          <p className="text-xs text-steel-400 font-medium">Featured</p>
          <p className="mt-1 font-display text-2xl font-bold text-copper-400">
            {projects.filter((p) => p.featured).length}
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-[#111827] p-4">
          <p className="text-xs text-steel-400 font-medium">Drafts</p>
          <p className="mt-1 font-display text-2xl font-bold text-amber-400">
            {projects.filter((p) => !p.isPublished).length}
          </p>
        </div>
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

        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-steel-400">
            <Filter size={13} />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-transparent text-white focus:outline-none"
            >
              <option value="all" className="bg-[#111827]">All Categories</option>
              {categories.map((c) => (
                <option key={c} value={c} className="bg-[#111827]">
                  {c}
                </option>
              ))}
            </select>
          </div>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-xs text-white focus:border-copper-500/80 focus:outline-none"
          >
            <option value="all" className="bg-[#111827]">All Status</option>
            <option value="published" className="bg-[#111827]">Published</option>
            <option value="draft" className="bg-[#111827]">Draft</option>
          </select>
        </div>
      </div>

      {/* Main Table Content */}
      {loading ? (
        <div className="flex h-64 items-center justify-center rounded-2xl border border-white/10 bg-[#111827]">
          <Loader2 className="h-8 w-8 animate-spin text-copper-400" />
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-[#111827] p-12 text-center">
          <FolderGit2 className="mx-auto h-12 w-12 text-steel-500 mb-3" />
          <h3 className="text-base font-semibold text-white">No projects found</h3>
          <p className="mt-1 text-xs text-steel-400">
            {search ? "Try adjusting your search filter" : "Get started by creating your first project item"}
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#111827] shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-white/10 bg-white/[0.02] text-steel-400 uppercase tracking-wider font-semibold">
                <tr>
                  <th className="py-3.5 px-4">No.</th>
                  <th className="py-3.5 px-4">Project Deliverable</th>
                  <th className="py-3.5 px-4">Tag / Category</th>
                  <th className="py-3.5 px-4">Detailed Scope</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-steel-300">
                {filteredProjects.map((project) => {
                  const Icon = iconMap[project.icon || ""] || Ruler;
                  return (
                    <tr key={project._id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-4 px-4 whitespace-nowrap">
                        <span className="font-mono text-xs font-bold text-copper-400">
                          {project.number || "—"}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => handleToggleFeatured(project)}
                            title={project.featured ? "Featured" : "Mark as featured"}
                            className={`shrink-0 ${
                              project.featured ? "text-copper-400" : "text-steel-600 hover:text-copper-400"
                            }`}
                          >
                            <Star size={14} fill={project.featured ? "currentColor" : "none"} />
                          </button>
                          <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-copper-500/20 bg-copper-500/10 text-copper-400">
                            <Icon size={16} />
                          </div>
                          <div>
                            <p className="font-semibold text-white">{project.title}</p>
                            <p className="text-[11px] text-steel-400 line-clamp-1">{project.description}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4 whitespace-nowrap">
                        <div className="flex flex-col gap-1 items-start">
                          <span className="rounded-full border border-copper-500/20 bg-copper-500/10 px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-copper-300">
                            {project.tag || project.category}
                          </span>
                          <span className="text-[10px] text-steel-500">
                            {project.category}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4 max-w-xs">
                        <p className="text-[11px] text-steel-400 line-clamp-1">
                          {(project.detailedScope || []).join(" • ") || "—"}
                        </p>
                      </td>
                      <td className="py-4 px-4 whitespace-nowrap">
                        <button
                          onClick={() => handleTogglePublish(project)}
                          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold transition-all ${
                            project.isPublished
                              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20"
                              : "bg-amber-500/10 text-amber-400 border border-amber-500/20 hover:bg-amber-500/20"
                          }`}
                        >
                          {project.isPublished ? <Eye size={12} /> : <EyeOff size={12} />}
                          <span>{project.isPublished ? "Active" : "Draft"}</span>
                        </button>
                      </td>
                      <td className="py-4 px-4 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <Link
                            href={project.href || "/projects"}
                            target="_blank"
                            title="View on site"
                            className="rounded-lg p-1.5 text-steel-400 hover:bg-white/5 hover:text-white transition-colors"
                          >
                            <ExternalLink size={15} />
                          </Link>
                          <button
                            onClick={() => openEditModal(project)}
                            title="Edit project"
                            className="rounded-lg p-1.5 text-steel-400 hover:bg-white/5 hover:text-copper-400 transition-colors"
                          >
                            <Edit2 size={15} />
                          </button>
                          <button
                            onClick={() => setDeleteTarget(project)}
                            title="Delete project"
                            className="rounded-lg p-1.5 text-steel-400 hover:bg-red-500/10 hover:text-red-400 transition-colors"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* CREATE / EDIT MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-2xl rounded-2xl border border-white/10 bg-[#111827] p-6 shadow-2xl my-8">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h2 className="font-display text-xl font-bold uppercase text-white">
                {editingProject ? "Edit Project Deliverable" : "Add Project Deliverable"}
              </h2>
              <button
                onClick={() => setModalOpen(false)}
                className="rounded-lg p-1 text-steel-400 hover:bg-white/5 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4 max-h-[75vh] overflow-y-auto pr-1">
              {error && (
                <div className="flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-xs text-red-400">
                  <AlertCircle size={15} />
                  <span>{error}</span>
                </div>
              )}

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-steel-400 mb-1">
                    Number
                  </label>
                  <input
                    type="text"
                    value={formData.number}
                    onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                    placeholder="01"
                    className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-xs text-white focus:border-copper-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-steel-400 mb-1">
                    Tag
                  </label>
                  <input
                    type="text"
                    value={formData.tag}
                    onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                    placeholder="e.g. Structural"
                    className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-xs text-white focus:border-copper-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-steel-400 mb-1">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-[#1f2937] px-3 py-2 text-xs text-white focus:border-copper-500 focus:outline-none"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-steel-400 mb-1">
                    Icon
                  </label>
                  <select
                    value={formData.icon}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-[#1f2937] px-3 py-2 text-xs text-white focus:border-copper-500 focus:outline-none"
                  >
                    {availableIcons.map((ic) => (
                      <option key={ic} value={ic}>
                        {ic}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-steel-400 mb-1">
                  Deliverable Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Structural Steel Detailing"
                  className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-xs text-white focus:border-copper-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-steel-400 mb-1">
                  Brief Overview *
                </label>
                <textarea
                  rows={2}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="3D modelling, shop and erection drawings for structural steel frameworks..."
                  className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-xs text-white focus:border-copper-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-steel-400 mb-1">
                  Detailed Scope Points (One per line)
                </label>
                <textarea
                  rows={3}
                  value={formData.scopeText}
                  onChange={(e) => setFormData({ ...formData, scopeText: e.target.value })}
                  placeholder="AISC-compliant 3D model creation&#10;Detailed shop fabrication drawings&#10;Anchor bolt plans and field erection drawings"
                  className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-xs text-white focus:border-copper-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-steel-400 mb-1">
                  Target Service Link
                </label>
                <input
                  type="text"
                  value={formData.href}
                  onChange={(e) => setFormData({ ...formData, href: e.target.value })}
                  placeholder="/services/steel-detailing"
                  className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-xs text-white focus:border-copper-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 text-xs text-white cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isPublished}
                    onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                    className="rounded border-white/20 bg-white/5 text-copper-500 focus:ring-copper-500"
                  />
                  <span>Active on public portfolio</span>
                </label>
                <label className="flex items-center gap-2 text-xs text-white cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="rounded border-white/20 bg-white/5 text-copper-500 focus:ring-copper-500"
                  />
                  <span>Pin as featured deliverable</span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 border-t border-white/10 pt-4">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="rounded-xl border border-white/10 px-4 py-2 text-xs text-steel-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center gap-2 rounded-xl bg-copper-500 px-5 py-2 text-xs font-bold text-white hover:bg-copper-400 disabled:opacity-50"
                >
                  {submitting && <Loader2 size={13} className="animate-spin" />}
                  <span>{editingProject ? "Update Project" : "Create Project"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#111827] p-6 shadow-2xl">
            <h3 className="font-display text-lg font-bold text-white uppercase">
              Delete Deliverable?
            </h3>
            <p className="mt-2 text-xs text-steel-400 leading-relaxed">
              Are you sure you want to delete <strong className="text-white">"{deleteTarget.title}"</strong>?
            </p>
            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                onClick={() => setDeleteTarget(null)}
                className="rounded-xl border border-white/10 px-4 py-2 text-xs text-steel-400"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2 text-xs font-bold text-white hover:bg-red-500 disabled:opacity-50"
              >
                {deleting && <Loader2 size={13} className="animate-spin" />}
                <span>Delete Deliverable</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
