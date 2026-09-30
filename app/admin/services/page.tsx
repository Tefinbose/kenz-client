"use client";

import { useEffect, useState, FormEvent } from "react";
import Link from "next/link";
import {
  Wrench,
  Plus,
  Search,
  ExternalLink,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  CheckCircle2,
  Layers3,
  Loader2,
  AlertCircle,
  X,
  Filter,
  Ruler,
  Box,
  Cable,
  ScanLine,
  Calculator,
  ArrowUpRight,
} from "lucide-react";

interface ServiceItem {
  _id: string;
  number: string;
  category: "structural" | "engineering" | "bim";
  title: string;
  shortTitle: string;
  code: string;
  spec: string;
  description: string;
  href: string;
  icon: string;
  capabilities: string[];
  featured?: boolean;
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
};

export default function AdminServicesPage() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  // Modal states
  const [modalOpen, setModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // Delete state
  const [deleteTarget, setDeleteTarget] = useState<ServiceItem | null>(null);
  const [deleting, setDeleting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    number: "01",
    category: "structural" as "structural" | "engineering" | "bim",
    title: "",
    shortTitle: "",
    code: "SRV-01",
    spec: "AISC / NISD",
    description: "",
    href: "/services/steel-detailing",
    icon: "Ruler",
    capabilitiesText: "",
    order: 1,
    isPublished: true,
    featured: false,
  });

  const availableIcons = ["Ruler", "Box", "Cable", "Layers3", "ScanLine", "Calculator"];

  const fetchServices = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`/api/admin/services?_t=${Date.now()}`, {
        cache: "no-store",
      });
      const data = await res.json();
      if (data.success) {
        setServices(data.services || []);
      } else {
        throw new Error(data.error || "Failed to load services");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error loading services");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const showToast = (msg: string) => {
    setSuccessToast(msg);
    setTimeout(() => setSuccessToast(null), 4000);
  };

  const openCreateModal = () => {
    setEditingService(null);
    const nextOrder = (services.length + 1);
    const nextNumber = nextOrder < 10 ? `0${nextOrder}` : `${nextOrder}`;
    setFormData({
      number: nextNumber,
      category: "structural",
      title: "",
      shortTitle: "",
      code: `SRV-${nextNumber}`,
      spec: "AISC / NISD",
      description: "",
      href: "/services",
      icon: "Ruler",
      capabilitiesText: "",
      order: nextOrder,
      isPublished: true,
      featured: false,
    });
    setModalOpen(true);
  };

  const openEditModal = (service: ServiceItem) => {
    setEditingService(service);
    setFormData({
      number: service.number,
      category: service.category,
      title: service.title,
      shortTitle: service.shortTitle,
      code: service.code,
      spec: service.spec,
      description: service.description,
      href: service.href,
      icon: service.icon || "Ruler",
      capabilitiesText: (service.capabilities || []).join("\n"),
      order: service.order,
      isPublished: service.isPublished,
      featured: service.featured || false,
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const capabilities = formData.capabilitiesText
        .split("\n")
        .map((c) => c.trim())
        .filter(Boolean);

      const payload = {
        number: formData.number,
        category: formData.category,
        title: formData.title,
        shortTitle: formData.shortTitle,
        code: formData.code,
        spec: formData.spec,
        description: formData.description,
        href: formData.href,
        icon: formData.icon,
        capabilities,
        order: Number(formData.order),
        isPublished: formData.isPublished,
        featured: formData.featured,
      };

      const url = editingService
        ? `/api/admin/services/${editingService._id}`
        : "/api/admin/services";
      const method = editingService ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!data.success) {
        throw new Error(data.error || "Failed to save service discipline");
      }

      showToast(
        editingService
          ? "Service updated successfully!"
          : "Service discipline added successfully!"
      );
      setModalOpen(false);
      fetchServices();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error saving service");
    } finally {
      setSubmitting(false);
    }
  };

  const handleTogglePublish = async (service: ServiceItem) => {
    try {
      const res = await fetch(`/api/admin/services/${service._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isPublished: !service.isPublished }),
      });
      const data = await res.json();
      if (data.success) {
        setServices((prev) =>
          prev.map((s) =>
            s._id === service._id ? { ...s, isPublished: !s.isPublished } : s
          )
        );
        showToast(
          !service.isPublished ? "Service is now live" : "Service moved to draft"
        );
      }
    } catch (err) {
      console.error("Toggle publish error:", err);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      setDeleting(true);
      const res = await fetch(`/api/admin/services/${deleteTarget._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setServices((prev) => prev.filter((s) => s._id !== deleteTarget._id));
        showToast("Service discipline deleted successfully");
        setDeleteTarget(null);
      } else {
        throw new Error(data.error || "Failed to delete service");
      }
    } catch (err) {
      showToast(err instanceof Error ? err.message : "Error deleting service");
    } finally {
      setDeleting(false);
    }
  };

  const filteredServices = services.filter((s) => {
    const matchesSearch =
      s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.shortTitle.toLowerCase().includes(search.toLowerCase()) ||
      s.code.toLowerCase().includes(search.toLowerCase()) ||
      s.spec.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || s.category === selectedCategory;
    const matchesStatus =
      selectedStatus === "all" ||
      (selectedStatus === "published" && s.isPublished) ||
      (selectedStatus === "draft" && !s.isPublished);

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
            <Wrench size={14} />
            <span>Disciplines & Capabilities</span>
          </div>
          <h1 className="mt-1 font-display text-3xl font-bold uppercase tracking-tight text-white">
            Engineering <span className="text-copper-400">Services</span>
          </h1>
          <p className="mt-1 text-sm text-steel-400">
            Manage steel detailing, miscellaneous steel, connection design, joist & deck, BIM, and estimation services.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-copper-500 to-copper-600 px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-copper-500/20 hover:from-copper-400 hover:to-copper-500 transition-all self-start sm:self-center"
        >
          <Plus size={16} />
          <span>Add New Service</span>
        </button>
      </div>

      {/* Stats Counters */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-xl border border-white/10 bg-[#111827] p-4">
          <p className="text-xs text-steel-400 font-medium">Total Disciplines</p>
          <p className="mt-1 font-display text-2xl font-bold text-white">{services.length}</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-[#111827] p-4">
          <p className="text-xs text-steel-400 font-medium">Structural Detailing</p>
          <p className="mt-1 font-display text-2xl font-bold text-copper-400">
            {services.filter((s) => s.category === "structural").length}
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-[#111827] p-4">
          <p className="text-xs text-steel-400 font-medium">Engineering & Joist</p>
          <p className="mt-1 font-display text-2xl font-bold text-sky-400">
            {services.filter((s) => s.category === "engineering").length}
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-[#111827] p-4">
          <p className="text-xs text-steel-400 font-medium">BIM & Estimation</p>
          <p className="mt-1 font-display text-2xl font-bold text-emerald-400">
            {services.filter((s) => s.category === "bim").length}
          </p>
        </div>
      </div>

      {/* Filter / Search Bar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-steel-400" />
          <input
            type="text"
            placeholder="Search disciplines by title, code, or spec..."
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
              <option value="structural" className="bg-[#111827]">Structural Detailing</option>
              <option value="engineering" className="bg-[#111827]">Engineering & Connections</option>
              <option value="bim" className="bg-[#111827]">BIM & Take-Off</option>
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
      ) : filteredServices.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-[#111827] p-12 text-center">
          <Layers3 className="mx-auto h-12 w-12 text-steel-500 mb-3" />
          <h3 className="text-base font-semibold text-white">No services found</h3>
          <p className="mt-1 text-xs text-steel-400">
            {search ? "Try adjusting your search query" : "Get started by adding an engineering discipline"}
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#111827] shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-white/10 bg-white/[0.02] text-steel-400 uppercase tracking-wider font-semibold">
                <tr>
                  <th className="py-3.5 px-4">Code / No.</th>
                  <th className="py-3.5 px-4">Discipline</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Specification</th>
                  <th className="py-3.5 px-4">Capabilities</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-steel-300">
                {filteredServices.map((service) => {
                  const Icon = iconMap[service.icon] || Ruler;
                  return (
                    <tr key={service._id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-4 px-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-copper-400">
                            {service.code}
                          </span>
                          <span className="rounded bg-white/5 border border-white/10 px-1.5 py-0.5 font-mono text-[10px] text-steel-400">
                            #{service.number}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-copper-500/20 bg-copper-500/10 text-copper-400">
                            <Icon size={16} />
                          </div>
                          <div>
                            <p className="font-semibold text-white">{service.title}</p>
                            <p className="text-[11px] text-steel-400">{service.shortTitle}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4 whitespace-nowrap">
                        <span className="inline-block rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] uppercase font-semibold text-steel-300">
                          {service.category}
                        </span>
                      </td>
                      <td className="py-4 px-4 whitespace-nowrap font-mono text-[11px] text-copper-300">
                        {service.spec}
                      </td>
                      <td className="py-4 px-4 max-w-xs">
                        <p className="text-[11px] text-steel-400 line-clamp-1">
                          {(service.capabilities || []).join(", ")}
                        </p>
                      </td>
                      <td className="py-4 px-4 whitespace-nowrap">
                        <button
                          onClick={() => handleTogglePublish(service)}
                          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold transition-all ${
                            service.isPublished
                              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20"
                              : "bg-amber-500/10 text-amber-400 border border-amber-500/20 hover:bg-amber-500/20"
                          }`}
                        >
                          {service.isPublished ? <Eye size={12} /> : <EyeOff size={12} />}
                          <span>{service.isPublished ? "Active" : "Draft"}</span>
                        </button>
                      </td>
                      <td className="py-4 px-4 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <Link
                            href={service.href || "/services"}
                            target="_blank"
                            title="View on site"
                            className="rounded-lg p-1.5 text-steel-400 hover:bg-white/5 hover:text-white transition-colors"
                          >
                            <ExternalLink size={15} />
                          </Link>
                          <button
                            onClick={() => openEditModal(service)}
                            title="Edit discipline"
                            className="rounded-lg p-1.5 text-steel-400 hover:bg-white/5 hover:text-copper-400 transition-colors"
                          >
                            <Edit2 size={15} />
                          </button>
                          <button
                            onClick={() => setDeleteTarget(service)}
                            title="Delete discipline"
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
                {editingService ? "Edit Service Discipline" : "Add Service Discipline"}
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
                    required
                    value={formData.number}
                    onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                    placeholder="01"
                    className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-xs text-white focus:border-copper-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-steel-400 mb-1">
                    Code
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                    placeholder="SRV-01"
                    className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-xs text-white focus:border-copper-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-steel-400 mb-1">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        category: e.target.value as "structural" | "engineering" | "bim",
                      })
                    }
                    className="w-full rounded-xl border border-white/10 bg-[#1f2937] px-3 py-2 text-xs text-white focus:border-copper-500 focus:outline-none"
                  >
                    <option value="structural">Structural</option>
                    <option value="engineering">Engineering</option>
                    <option value="bim">BIM</option>
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-steel-400 mb-1">
                    Full Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. Steel Detailing"
                    className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-xs text-white focus:border-copper-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-steel-400 mb-1">
                    Short Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.shortTitle}
                    onChange={(e) => setFormData({ ...formData, shortTitle: e.target.value })}
                    placeholder="e.g. Structural Steel"
                    className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-xs text-white focus:border-copper-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-steel-400 mb-1">
                    Standard / Specification *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.spec}
                    onChange={(e) => setFormData({ ...formData, spec: e.target.value })}
                    placeholder="e.g. AISC / NISD"
                    className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-xs text-white focus:border-copper-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-steel-400 mb-1">
                    Target Page Link
                  </label>
                  <input
                    type="text"
                    value={formData.href}
                    onChange={(e) => setFormData({ ...formData, href: e.target.value })}
                    placeholder="/services/steel-detailing"
                    className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-xs text-white focus:border-copper-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-steel-400 mb-1">
                  Description *
                </label>
                <textarea
                  rows={3}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Detailed technical overview of this discipline..."
                  className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-xs text-white focus:border-copper-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-steel-400 mb-1">
                  Key Capabilities (One per line)
                </label>
                <textarea
                  rows={4}
                  value={formData.capabilitiesText}
                  onChange={(e) => setFormData({ ...formData, capabilitiesText: e.target.value })}
                  placeholder="Structural steel 3D modeling&#10;Shop drawing development&#10;Erection drawing development"
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
                  <span>Active & visible on public site</span>
                </label>
                <label className="flex items-center gap-2 text-xs text-white cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="rounded border-white/20 bg-white/5 text-copper-500 focus:ring-copper-500"
                  />
                  <span>Mark as featured</span>
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
                  <span>{editingService ? "Update Discipline" : "Create Discipline"}</span>
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
              Delete Discipline?
            </h3>
            <p className="mt-2 text-xs text-steel-400 leading-relaxed">
              Are you sure you want to permanently delete{" "}
              <strong className="text-white">"{deleteTarget.title}"</strong> ({deleteTarget.code})?
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
                <span>Delete Discipline</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
