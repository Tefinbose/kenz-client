"use client";

import { useEffect, useState, FormEvent } from "react";
import {
  Award,
  Plus,
  Edit2,
  Trash2,
  Star,
  CheckCircle2,
  Shield,
  BarChart3,
  MessageSquareQuote,
  Loader2,
  AlertCircle,
  X,
  FileCheck,
  TrendingUp,
} from "lucide-react";
import {
  AccoladeMetric,
  AccoladeItem,
  Certification,
  ClientEndorsement,
  AccoladesPageData,
} from "@/types/accolades";

export default function AdminAccoladesPage() {
  const [data, setData] = useState<AccoladesPageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"metrics" | "recognitions" | "certifications" | "endorsements">("metrics");
  const [saving, setSaving] = useState(false);
  const [successToast, setSuccessToast] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Sub-item modals
  const [modalType, setModalType] = useState<"metric" | "recognition" | "certification" | "endorsement" | null>(null);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  // Form states
  const [metricForm, setMetricForm] = useState<AccoladeMetric>({
    value: "50,000+",
    numericValue: 50000,
    suffix: "+",
    label: "Tons Detailed",
    subtext: "Across Commercial, Industrial & Infrastructure Projects",
    badge: "DELIVERED VOLUME",
  });

  const [recognitionForm, setRecognitionForm] = useState<AccoladeItem>({
    id: "",
    year: "2026",
    title: "",
    organization: "",
    category: "Award",
    summary: "",
    badge: "INDUSTRY HONOUR",
    details: [""],
    featured: false,
  });

  const [certForm, setCertForm] = useState<Certification>({
    id: "",
    title: "",
    code: "",
    issuer: "",
    validity: "Active / Current",
    description: "",
    badge: "CERTIFIED",
    standards: [""],
  });

  const [endorsementForm, setEndorsementForm] = useState<ClientEndorsement>({
    id: "",
    quote: "",
    clientName: "",
    role: "",
    company: "",
    location: "",
    projectType: "",
    year: "2026",
    rating: 5,
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`/api/admin/accolades?_t=${Date.now()}`, {
        cache: "no-store",
      });
      const json = await res.json();
      if (json.success) {
        setData(json.data);
      } else {
        throw new Error(json.error || "Failed to load accolades data");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error loading data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const showToast = (msg: string) => {
    setSuccessToast(msg);
    setTimeout(() => setSuccessToast(null), 4000);
  };

  const saveFullData = async (updatedData: AccoladesPageData) => {
    try {
      setSaving(true);
      setError(null);
      const res = await fetch("/api/admin/accolades", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.error || "Failed to save changes");
      setData(json.data);
      showToast("Changes saved successfully!");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error saving changes");
    } finally {
      setSaving(false);
    }
  };

  /* ── METRIC HANDLERS ── */
  const openMetricModal = (metric?: AccoladeMetric, index?: number) => {
    if (metric !== undefined && index !== undefined) {
      setMetricForm(metric);
      setEditingIndex(index);
    } else {
      setMetricForm({
        value: "99.8%",
        numericValue: 99.8,
        suffix: "%",
        label: "Shop Drawing Accuracy",
        subtext: "First-pass fabrication approval rate across 1,200+ projects",
        badge: "FABRICATION ACCURACY",
      });
      setEditingIndex(null);
    }
    setModalType("metric");
  };

  const handleSaveMetric = (e: FormEvent) => {
    e.preventDefault();
    if (!data) return;
    const list = [...(data.metrics || [])];
    if (editingIndex !== null) {
      list[editingIndex] = metricForm;
    } else {
      list.push(metricForm);
    }
    const updated = { ...data, metrics: list };
    saveFullData(updated);
    setModalType(null);
  };

  const handleDeleteMetric = (index: number) => {
    if (!data || !confirm("Delete this metric?")) return;
    const list = data.metrics.filter((_, i) => i !== index);
    saveFullData({ ...data, metrics: list });
  };

  /* ── RECOGNITION HANDLERS ── */
  const openRecognitionModal = (item?: AccoladeItem, index?: number) => {
    if (item && index !== undefined) {
      setRecognitionForm(item);
      setEditingIndex(index);
    } else {
      setRecognitionForm({
        id: `rec-${Date.now()}`,
        year: "2026",
        title: "",
        organization: "AISC / Industry Council",
        category: "Award",
        summary: "",
        badge: "EXCELLENCE IN DETAILING",
        details: [""],
        featured: false,
      });
      setEditingIndex(null);
    }
    setModalType("recognition");
  };

  const handleSaveRecognition = (e: FormEvent) => {
    e.preventDefault();
    if (!data) return;
    const list = [...(data.recognitions || [])];
    const details = recognitionForm.details.filter(Boolean);
    const item = { ...recognitionForm, details };
    if (editingIndex !== null) {
      list[editingIndex] = item;
    } else {
      list.push(item);
    }
    saveFullData({ ...data, recognitions: list });
    setModalType(null);
  };

  const handleDeleteRecognition = (index: number) => {
    if (!data || !confirm("Delete this recognition?")) return;
    const list = data.recognitions.filter((_, i) => i !== index);
    saveFullData({ ...data, recognitions: list });
  };

  /* ── CERTIFICATION HANDLERS ── */
  const openCertModal = (cert?: Certification, index?: number) => {
    if (cert && index !== undefined) {
      setCertForm(cert);
      setEditingIndex(index);
    } else {
      setCertForm({
        id: `cert-${Date.now()}`,
        title: "",
        code: "ISO 9001:2015",
        issuer: "Quality Management Institute",
        validity: "Active / Current",
        description: "",
        badge: "CERTIFIED COMPLIANT",
        standards: [""],
      });
      setEditingIndex(null);
    }
    setModalType("certification");
  };

  const handleSaveCert = (e: FormEvent) => {
    e.preventDefault();
    if (!data) return;
    const list = [...(data.certifications || [])];
    const standards = certForm.standards.filter(Boolean);
    const item = { ...certForm, standards };
    if (editingIndex !== null) {
      list[editingIndex] = item;
    } else {
      list.push(item);
    }
    saveFullData({ ...data, certifications: list });
    setModalType(null);
  };

  const handleDeleteCert = (index: number) => {
    if (!data || !confirm("Delete this certification?")) return;
    const list = data.certifications.filter((_, i) => i !== index);
    saveFullData({ ...data, certifications: list });
  };

  /* ── ENDORSEMENT HANDLERS ── */
  const openEndorsementModal = (end?: ClientEndorsement, index?: number) => {
    if (end && index !== undefined) {
      setEndorsementForm(end);
      setEditingIndex(index);
    } else {
      setEndorsementForm({
        id: `end-${Date.now()}`,
        quote: "",
        clientName: "",
        role: "Chief Structural Engineer",
        company: "",
        location: "USA",
        projectType: "Commercial High-Rise",
        year: "2026",
        rating: 5,
      });
      setEditingIndex(null);
    }
    setModalType("endorsement");
  };

  const handleSaveEndorsement = (e: FormEvent) => {
    e.preventDefault();
    if (!data) return;
    const list = [...(data.endorsements || [])];
    if (editingIndex !== null) {
      list[editingIndex] = endorsementForm;
    } else {
      list.push(endorsementForm);
    }
    saveFullData({ ...data, endorsements: list });
    setModalType(null);
  };

  const handleDeleteEndorsement = (index: number) => {
    if (!data || !confirm("Delete this client endorsement?")) return;
    const list = data.endorsements.filter((_, i) => i !== index);
    saveFullData({ ...data, endorsements: list });
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center rounded-2xl border border-white/10 bg-[#111827]">
        <Loader2 className="h-8 w-8 animate-spin text-copper-400" />
      </div>
    );
  }

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
            <Award size={14} />
            <span>Credibility & Accolades Hub</span>
          </div>
          <h1 className="mt-1 font-display text-3xl font-bold uppercase tracking-tight text-white">
            Accolades, <span className="text-copper-400">Metrics & Endorsements</span>
          </h1>
          <p className="mt-1 text-sm text-steel-400">
            Manage live hero metrics, industry recognitions, professional certifications, and client testimonials.
          </p>
        </div>

        {activeTab === "metrics" && (
          <button
            onClick={() => openMetricModal()}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-copper-500 to-copper-600 px-4 py-2.5 text-xs font-semibold text-white shadow-lg shadow-copper-500/20 hover:from-copper-400 hover:to-copper-500 transition-all self-start sm:self-center"
          >
            <Plus size={16} />
            <span>Add Live Metric</span>
          </button>
        )}
        {activeTab === "recognitions" && (
          <button
            onClick={() => openRecognitionModal()}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-copper-500 to-copper-600 px-4 py-2.5 text-xs font-semibold text-white shadow-lg shadow-copper-500/20 hover:from-copper-400 hover:to-copper-500 transition-all self-start sm:self-center"
          >
            <Plus size={16} />
            <span>Add Recognition</span>
          </button>
        )}
        {activeTab === "certifications" && (
          <button
            onClick={() => openCertModal()}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-copper-500 to-copper-600 px-4 py-2.5 text-xs font-semibold text-white shadow-lg shadow-copper-500/20 hover:from-copper-400 hover:to-copper-500 transition-all self-start sm:self-center"
          >
            <Plus size={16} />
            <span>Add Certification</span>
          </button>
        )}
        {activeTab === "endorsements" && (
          <button
            onClick={() => openEndorsementModal()}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-copper-500 to-copper-600 px-4 py-2.5 text-xs font-semibold text-white shadow-lg shadow-copper-500/20 hover:from-copper-400 hover:to-copper-500 transition-all self-start sm:self-center"
          >
            <Plus size={16} />
            <span>Add Endorsement</span>
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-white/10 gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => setActiveTab("metrics")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-t-xl transition-colors ${
            activeTab === "metrics"
              ? "bg-[#111827] text-copper-400 border-t border-l border-r border-white/10"
              : "text-steel-400 hover:text-white"
          }`}
        >
          <BarChart3 size={15} />
          <span>Live Metrics ({data?.metrics?.length || 0})</span>
        </button>
        <button
          onClick={() => setActiveTab("recognitions")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-t-xl transition-colors ${
            activeTab === "recognitions"
              ? "bg-[#111827] text-copper-400 border-t border-l border-r border-white/10"
              : "text-steel-400 hover:text-white"
          }`}
        >
          <Award size={15} />
          <span>Recognitions & Awards ({data?.recognitions?.length || 0})</span>
        </button>
        <button
          onClick={() => setActiveTab("certifications")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-t-xl transition-colors ${
            activeTab === "certifications"
              ? "bg-[#111827] text-copper-400 border-t border-l border-r border-white/10"
              : "text-steel-400 hover:text-white"
          }`}
        >
          <Shield size={15} />
          <span>Certifications ({data?.certifications?.length || 0})</span>
        </button>
        <button
          onClick={() => setActiveTab("endorsements")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-t-xl transition-colors ${
            activeTab === "endorsements"
              ? "bg-[#111827] text-copper-400 border-t border-l border-r border-white/10"
              : "text-steel-400 hover:text-white"
          }`}
        >
          <MessageSquareQuote size={15} />
          <span>Client Endorsements ({data?.endorsements?.length || 0})</span>
        </button>
      </div>

      {/* ── TAB 1: METRICS ── */}
      {activeTab === "metrics" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {(data?.metrics || []).map((metric, i) => (
            <div
              key={i}
              className="rounded-2xl border border-white/10 bg-[#111827] p-5 relative group hover:border-copper-500/40 transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="rounded-md border border-copper-500/30 bg-copper-500/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-copper-300">
                  {metric.badge}
                </span>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => openMetricModal(metric, i)}
                    className="p-1 text-steel-400 hover:text-copper-400"
                    title="Edit"
                  >
                    <Edit2 size={13} />
                  </button>
                  <button
                    onClick={() => handleDeleteMetric(i)}
                    className="p-1 text-steel-400 hover:text-red-400"
                    title="Delete"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>

              <p className="mt-4 font-display text-4xl font-bold text-white tracking-tight">
                {metric.value}
              </p>
              <h3 className="mt-1 font-semibold text-sm text-copper-400">
                {metric.label}
              </h3>
              <p className="mt-2 text-xs text-steel-400 leading-relaxed">
                {metric.subtext}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* ── TAB 2: RECOGNITIONS ── */}
      {activeTab === "recognitions" && (
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#111827]">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-white/10 bg-white/[0.02] text-steel-400 uppercase tracking-wider font-semibold">
                <tr>
                  <th className="py-3.5 px-4">Title & Organization</th>
                  <th className="py-3.5 px-4">Year</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Summary</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-steel-300">
                {(data?.recognitions || []).map((item, i) => (
                  <tr key={item.id || i} className="hover:bg-white/[0.02]">
                    <td className="py-4 px-4">
                      <p className="font-semibold text-white">{item.title}</p>
                      <p className="text-[11px] text-copper-400">{item.organization}</p>
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap text-steel-400 font-mono">
                      {item.year}
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      <span className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] text-steel-300">
                        {item.category}
                      </span>
                    </td>
                    <td className="py-4 px-4 max-w-sm text-steel-400 line-clamp-2">
                      {item.summary}
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => openRecognitionModal(item, i)}
                          className="rounded-lg p-1.5 text-steel-400 hover:text-copper-400"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          onClick={() => handleDeleteRecognition(i)}
                          className="rounded-lg p-1.5 text-steel-400 hover:text-red-400"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── TAB 3: CERTIFICATIONS ── */}
      {activeTab === "certifications" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(data?.certifications || []).map((cert, i) => (
            <div
              key={cert.id || i}
              className="rounded-2xl border border-white/10 bg-[#111827] p-5 space-y-3 relative group hover:border-copper-500/40 transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-copper-400">
                  {cert.code}
                </span>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => openCertModal(cert, i)}
                    className="p-1 text-steel-400 hover:text-copper-400"
                  >
                    <Edit2 size={13} />
                  </button>
                  <button
                    onClick={() => handleDeleteCert(i)}
                    className="p-1 text-steel-400 hover:text-red-400"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
              <h3 className="font-semibold text-white text-sm">{cert.title}</h3>
              <p className="text-xs text-steel-400">{cert.description}</p>
              <div className="flex flex-wrap gap-1.5 pt-2">
                {cert.standards?.map((st) => (
                  <span
                    key={st}
                    className="rounded bg-white/5 border border-white/10 px-2 py-0.5 text-[10px] text-steel-300 font-mono"
                  >
                    {st}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── TAB 4: ENDORSEMENTS ── */}
      {activeTab === "endorsements" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(data?.endorsements || []).map((end, i) => (
            <div
              key={end.id || i}
              className="rounded-2xl border border-white/10 bg-[#111827] p-5 space-y-3 relative group hover:border-copper-500/40 transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="flex text-amber-400 gap-0.5">
                  {Array.from({ length: end.rating || 5 }).map((_, r) => (
                    <Star key={r} size={12} fill="currentColor" />
                  ))}
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => openEndorsementModal(end, i)}
                    className="p-1 text-steel-400 hover:text-copper-400"
                  >
                    <Edit2 size={13} />
                  </button>
                  <button
                    onClick={() => handleDeleteEndorsement(i)}
                    className="p-1 text-steel-400 hover:text-red-400"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>

              <blockquote className="text-xs italic text-steel-300 leading-relaxed">
                "{end.quote}"
              </blockquote>

              <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs">
                <div>
                  <p className="font-semibold text-white">{end.clientName}</p>
                  <p className="text-[11px] text-steel-400">
                    {end.role}, {end.company}
                  </p>
                </div>
                <span className="font-mono text-[10px] text-copper-400">
                  {end.projectType}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── MODALS ── */}
      {modalType === "metric" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#111827] p-6 shadow-2xl">
            <h3 className="font-display text-lg font-bold text-white uppercase">
              {editingIndex !== null ? "Edit Live Metric" : "Add Live Metric"}
            </h3>
            <form onSubmit={handleSaveMetric} className="mt-4 space-y-3">
              <div>
                <label className="block text-xs font-semibold text-steel-400 mb-1">
                  Display Value (e.g. 50,000+ or 99.8%)
                </label>
                <input
                  type="text"
                  required
                  value={metricForm.value}
                  onChange={(e) => setMetricForm({ ...metricForm, value: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white focus:border-copper-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-steel-400 mb-1">
                  Metric Label
                </label>
                <input
                  type="text"
                  required
                  value={metricForm.label}
                  onChange={(e) => setMetricForm({ ...metricForm, label: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white focus:border-copper-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-steel-400 mb-1">
                  Category Badge
                </label>
                <input
                  type="text"
                  required
                  value={metricForm.badge}
                  onChange={(e) => setMetricForm({ ...metricForm, badge: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white focus:border-copper-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-steel-400 mb-1">
                  Detailed Subtext
                </label>
                <textarea
                  rows={2}
                  value={metricForm.subtext}
                  onChange={(e) => setMetricForm({ ...metricForm, subtext: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white focus:border-copper-500 focus:outline-none"
                />
              </div>
              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setModalType(null)}
                  className="rounded-xl border border-white/10 px-4 py-2 text-xs text-steel-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-xl bg-copper-500 px-5 py-2 text-xs font-bold text-white hover:bg-copper-400"
                >
                  {saving ? "Saving..." : "Save Metric"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Recognition Modal */}
      {modalType === "recognition" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#111827] p-6 shadow-2xl">
            <h3 className="font-display text-lg font-bold text-white uppercase">
              {editingIndex !== null ? "Edit Recognition" : "Add Recognition"}
            </h3>
            <form onSubmit={handleSaveRecognition} className="mt-4 space-y-3">
              <div>
                <label className="block text-xs font-semibold text-steel-400 mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={recognitionForm.title}
                  onChange={(e) => setRecognitionForm({ ...recognitionForm, title: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white focus:border-copper-500 focus:outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-steel-400 mb-1">Organization</label>
                  <input
                    type="text"
                    required
                    value={recognitionForm.organization}
                    onChange={(e) => setRecognitionForm({ ...recognitionForm, organization: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white focus:border-copper-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-steel-400 mb-1">Year</label>
                  <input
                    type="text"
                    required
                    value={recognitionForm.year}
                    onChange={(e) => setRecognitionForm({ ...recognitionForm, year: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white focus:border-copper-500 focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-steel-400 mb-1">Summary</label>
                <textarea
                  rows={2}
                  required
                  value={recognitionForm.summary}
                  onChange={(e) => setRecognitionForm({ ...recognitionForm, summary: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white focus:border-copper-500 focus:outline-none"
                />
              </div>
              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setModalType(null)}
                  className="rounded-xl border border-white/10 px-4 py-2 text-xs text-steel-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-xl bg-copper-500 px-5 py-2 text-xs font-bold text-white hover:bg-copper-400"
                >
                  {saving ? "Saving..." : "Save Recognition"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Certification Modal */}
      {modalType === "certification" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#111827] p-6 shadow-2xl">
            <h3 className="font-display text-lg font-bold text-white uppercase">
              {editingIndex !== null ? "Edit Certification" : "Add Certification"}
            </h3>
            <form onSubmit={handleSaveCert} className="mt-4 space-y-3">
              <div>
                <label className="block text-xs font-semibold text-steel-400 mb-1">Certification Title</label>
                <input
                  type="text"
                  required
                  value={certForm.title}
                  onChange={(e) => setCertForm({ ...certForm, title: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white focus:border-copper-500 focus:outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-steel-400 mb-1">Code / Standard</label>
                  <input
                    type="text"
                    required
                    value={certForm.code}
                    onChange={(e) => setCertForm({ ...certForm, code: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white focus:border-copper-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-steel-400 mb-1">Issuer</label>
                  <input
                    type="text"
                    required
                    value={certForm.issuer}
                    onChange={(e) => setCertForm({ ...certForm, issuer: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white focus:border-copper-500 focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-steel-400 mb-1">Description</label>
                <textarea
                  rows={2}
                  required
                  value={certForm.description}
                  onChange={(e) => setCertForm({ ...certForm, description: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white focus:border-copper-500 focus:outline-none"
                />
              </div>
              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setModalType(null)}
                  className="rounded-xl border border-white/10 px-4 py-2 text-xs text-steel-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-xl bg-copper-500 px-5 py-2 text-xs font-bold text-white hover:bg-copper-400"
                >
                  {saving ? "Saving..." : "Save Certification"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Endorsement Modal */}
      {modalType === "endorsement" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#111827] p-6 shadow-2xl">
            <h3 className="font-display text-lg font-bold text-white uppercase">
              {editingIndex !== null ? "Edit Endorsement" : "Add Endorsement"}
            </h3>
            <form onSubmit={handleSaveEndorsement} className="mt-4 space-y-3">
              <div>
                <label className="block text-xs font-semibold text-steel-400 mb-1">Quote</label>
                <textarea
                  rows={3}
                  required
                  value={endorsementForm.quote}
                  onChange={(e) => setEndorsementForm({ ...endorsementForm, quote: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white focus:border-copper-500 focus:outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-steel-400 mb-1">Client Name</label>
                  <input
                    type="text"
                    required
                    value={endorsementForm.clientName}
                    onChange={(e) => setEndorsementForm({ ...endorsementForm, clientName: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white focus:border-copper-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-steel-400 mb-1">Company</label>
                  <input
                    type="text"
                    required
                    value={endorsementForm.company}
                    onChange={(e) => setEndorsementForm({ ...endorsementForm, company: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white focus:border-copper-500 focus:outline-none"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-steel-400 mb-1">Role</label>
                  <input
                    type="text"
                    value={endorsementForm.role}
                    onChange={(e) => setEndorsementForm({ ...endorsementForm, role: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white focus:border-copper-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-steel-400 mb-1">Project Type</label>
                  <input
                    type="text"
                    value={endorsementForm.projectType}
                    onChange={(e) => setEndorsementForm({ ...endorsementForm, projectType: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white focus:border-copper-500 focus:outline-none"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setModalType(null)}
                  className="rounded-xl border border-white/10 px-4 py-2 text-xs text-steel-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-xl bg-copper-500 px-5 py-2 text-xs font-bold text-white hover:bg-copper-400"
                >
                  {saving ? "Saving..." : "Save Endorsement"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
