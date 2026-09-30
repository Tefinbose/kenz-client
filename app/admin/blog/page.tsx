"use client";

import { useEffect, useState, FormEvent } from "react";
import Link from "next/link";
import {
  FileText,
  Plus,
  Search,
  ExternalLink,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  BookOpen,
  Loader2,
  AlertCircle,
  X,
  Star,
  CheckCircle2,
  Filter,
} from "lucide-react";

interface BlogSection {
  heading: string;
  paragraphs: string[];
}

interface BlogPostItem {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  author: {
    name: string;
    role: string;
  };
  introParagraphs: string[];
  sections: BlogSection[];
  coverImage?: string;
  isPublished: boolean;
  featured: boolean;
  createdAt: string;
}

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPostItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  // Modal states
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPostItem | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // Delete state
  const [deleteTarget, setDeleteTarget] = useState<BlogPostItem | null>(null);
  const [deleting, setDeleting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    category: "Steel Detailing",
    readTime: "4 min read",
    authorName: "Kenz Engineering LLC",
    authorRole: "Structural Detailing Team",
    excerpt: "",
    introText: "", // Joined by newlines for easy editing
    coverImage: "",
    sections: [
      { heading: "From Design Intent to Fabrication", paragraphsText: "" },
    ],
    isPublished: true,
    featured: false,
  });

  const categories = [
    "Steel Detailing",
    "BIM Support",
    "Joist & Deck",
    "Estimation",
    "Engineering",
  ];

  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`/api/admin/blog?_t=${Date.now()}`, {
        cache: "no-store",
      });
      const data = await res.json();
      if (data.success) {
        setPosts(data.posts || []);
      } else {
        throw new Error(data.error || "Failed to load blog posts");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error loading blog posts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const showToast = (msg: string) => {
    setSuccessToast(msg);
    setTimeout(() => setSuccessToast(null), 4000);
  };

  const openCreateModal = () => {
    setEditingPost(null);
    setFormData({
      title: "",
      slug: "",
      category: "Steel Detailing",
      readTime: "4 min read",
      authorName: "Kenz Engineering LLC",
      authorRole: "Structural Detailing Team",
      excerpt: "",
      introText: "",
      coverImage: "",
      sections: [{ heading: "Key Technical Considerations", paragraphsText: "" }],
      isPublished: true,
      featured: false,
    });
    setModalOpen(true);
  };

  const openEditModal = (post: BlogPostItem) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      slug: post.slug,
      category: post.category,
      readTime: post.readTime || "4 min read",
      authorName: post.author?.name || "Kenz Engineering LLC",
      authorRole: post.author?.role || "Engineering Team",
      excerpt: post.excerpt,
      introText: (post.introParagraphs || []).join("\n\n"),
      coverImage: post.coverImage || "",
      sections: (post.sections || []).map((s) => ({
        heading: s.heading || "",
        paragraphsText: (s.paragraphs || []).join("\n\n"),
      })),
      isPublished: post.isPublished,
      featured: post.featured,
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const introParagraphs = formData.introText
        .split("\n\n")
        .map((p) => p.trim())
        .filter(Boolean);

      const sections = formData.sections.map((s) => ({
        heading: s.heading.trim(),
        paragraphs: s.paragraphsText
          .split("\n\n")
          .map((p) => p.trim())
          .filter(Boolean),
      }));

      const payload = {
        title: formData.title,
        slug: formData.slug || undefined,
        category: formData.category,
        readTime: formData.readTime,
        excerpt: formData.excerpt,
        author: {
          name: formData.authorName,
          role: formData.authorRole,
        },
        introParagraphs,
        sections,
        coverImage: formData.coverImage.trim() || undefined,
        isPublished: formData.isPublished,
        featured: formData.featured,
      };

      const url = editingPost
        ? `/api/admin/blog/${editingPost._id}`
        : "/api/admin/blog";
      const method = editingPost ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!data.success) {
        throw new Error(data.error || "Failed to save article");
      }

      showToast(
        editingPost
          ? "Article updated successfully!"
          : "New article published successfully!"
      );
      setModalOpen(false);
      fetchPosts();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error saving article");
    } finally {
      setSubmitting(false);
    }
  };

  const handleTogglePublish = async (post: BlogPostItem) => {
    try {
      const res = await fetch(`/api/admin/blog/${post._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isPublished: !post.isPublished }),
      });
      const data = await res.json();
      if (data.success) {
        setPosts((prev) =>
          prev.map((p) =>
            p._id === post._id ? { ...p, isPublished: !p.isPublished } : p
          )
        );
        showToast(
          !post.isPublished ? "Article published live" : "Article moved to draft"
        );
      }
    } catch (err) {
      console.error("Toggle publish error:", err);
    }
  };

  const handleToggleFeatured = async (post: BlogPostItem) => {
    try {
      const res = await fetch(`/api/admin/blog/${post._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ featured: !post.featured }),
      });
      const data = await res.json();
      if (data.success) {
        setPosts((prev) =>
          prev.map((p) =>
            p._id === post._id ? { ...p, featured: !p.featured } : p
          )
        );
        showToast(!post.featured ? "Pinned as featured article" : "Removed from featured");
      }
    } catch (err) {
      console.error("Toggle featured error:", err);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      setDeleting(true);
      const res = await fetch(`/api/admin/blog/${deleteTarget._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setPosts((prev) => prev.filter((p) => p._id !== deleteTarget._id));
        showToast("Article deleted successfully");
        setDeleteTarget(null);
      } else {
        throw new Error(data.error || "Failed to delete article");
      }
    } catch (err) {
      showToast(err instanceof Error ? err.message : "Error deleting article");
    } finally {
      setDeleting(false);
    }
  };

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(search.toLowerCase()) ||
      post.category.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || post.category === selectedCategory;
    const matchesStatus =
      selectedStatus === "all" ||
      (selectedStatus === "published" && post.isPublished) ||
      (selectedStatus === "draft" && !post.isPublished);

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
            <FileText size={14} />
            <span>Editorial Desk</span>
          </div>
          <h1 className="mt-1 font-display text-3xl font-bold uppercase tracking-tight text-white">
            Blog Posts <span className="text-copper-400">& Technical Articles</span>
          </h1>
          <p className="mt-1 text-sm text-steel-400">
            Manage engineering insights, detailing guides, BIM coordination articles, and steel estimation posts.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-copper-500 to-copper-600 px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-copper-500/20 hover:from-copper-400 hover:to-copper-500 transition-all self-start sm:self-center"
        >
          <Plus size={16} />
          <span>Write New Article</span>
        </button>
      </div>

      {/* Stats Counters */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-xl border border-white/10 bg-[#111827] p-4">
          <p className="text-xs text-steel-400 font-medium">Total Articles</p>
          <p className="mt-1 font-display text-2xl font-bold text-white">{posts.length}</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-[#111827] p-4">
          <p className="text-xs text-steel-400 font-medium">Published Live</p>
          <p className="mt-1 font-display text-2xl font-bold text-emerald-400">
            {posts.filter((p) => p.isPublished).length}
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-[#111827] p-4">
          <p className="text-xs text-steel-400 font-medium">Drafts</p>
          <p className="mt-1 font-display text-2xl font-bold text-amber-400">
            {posts.filter((p) => !p.isPublished).length}
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-[#111827] p-4">
          <p className="text-xs text-steel-400 font-medium">Featured</p>
          <p className="mt-1 font-display text-2xl font-bold text-copper-400">
            {posts.filter((p) => p.featured).length}
          </p>
        </div>
      </div>

      {/* Filter / Search Bar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-steel-400" />
          <input
            type="text"
            placeholder="Search articles by title, excerpt, or category..."
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
              <option value="all" className="bg-[#111827] text-white">All Categories</option>
              {categories.map((c) => (
                <option key={c} value={c} className="bg-[#111827] text-white">
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
      ) : filteredPosts.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-[#111827] p-12 text-center">
          <BookOpen className="mx-auto h-12 w-12 text-steel-500 mb-3" />
          <h3 className="text-base font-semibold text-white">No articles found</h3>
          <p className="mt-1 text-xs text-steel-400">
            {search ? "Try adjusting your search criteria" : "Start by creating your first technical article"}
          </p>
          {!search && (
            <button
              onClick={openCreateModal}
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-copper-500 px-4 py-2 text-xs font-semibold text-white hover:bg-copper-400"
            >
              <Plus size={14} />
              Write First Article
            </button>
          )}
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#111827] shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-white/10 bg-white/[0.02] text-steel-400 uppercase tracking-wider font-semibold">
                <tr>
                  <th className="py-3.5 px-4">Article</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Read Time</th>
                  <th className="py-3.5 px-4">Date</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-steel-300">
                {filteredPosts.map((post) => (
                  <tr key={post._id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 px-4 max-w-sm">
                      <div className="flex items-start gap-3">
                        <button
                          onClick={() => handleToggleFeatured(post)}
                          title={post.featured ? "Featured article" : "Mark as featured"}
                          className={`mt-1 shrink-0 ${
                            post.featured ? "text-copper-400" : "text-steel-600 hover:text-copper-400"
                          }`}
                        >
                          <Star size={15} fill={post.featured ? "currentColor" : "none"} />
                        </button>

                        {/* Thumbnail */}
                        <div className="h-12 w-16 shrink-0 overflow-hidden rounded-lg bg-white/5 border border-white/10">
                          {post.coverImage ? (
                            <img
                              src={post.coverImage}
                              alt={post.title}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center text-[9px] font-mono text-steel-500 uppercase">
                              No Img
                            </div>
                          )}
                        </div>

                        <div>
                          <p className="font-semibold text-white hover:text-copper-300 transition-colors line-clamp-1">
                            {post.title}
                          </p>
                          <p className="mt-1 text-[11px] text-steel-400 line-clamp-1">
                            {post.excerpt}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      <span className="inline-block rounded-md border border-copper-500/30 bg-copper-500/10 px-2 py-0.5 text-[10px] font-semibold text-copper-300">
                        {post.category}
                      </span>
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap text-steel-400">
                      {post.readTime}
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap text-steel-400">
                      {post.date}
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      <button
                        onClick={() => handleTogglePublish(post)}
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold transition-all ${
                          post.isPublished
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20"
                            : "bg-amber-500/10 text-amber-400 border border-amber-500/20 hover:bg-amber-500/20"
                        }`}
                      >
                        {post.isPublished ? <Eye size={12} /> : <EyeOff size={12} />}
                        <span>{post.isPublished ? "Published" : "Draft"}</span>
                      </button>
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Link
                          href={`/blog/${post.slug}`}
                          target="_blank"
                          title="View on site"
                          className="rounded-lg p-1.5 text-steel-400 hover:bg-white/5 hover:text-white transition-colors"
                        >
                          <ExternalLink size={15} />
                        </Link>
                        <button
                          onClick={() => openEditModal(post)}
                          title="Edit article"
                          className="rounded-lg p-1.5 text-steel-400 hover:bg-white/5 hover:text-copper-400 transition-colors"
                        >
                          <Edit2 size={15} />
                        </button>
                        <button
                          onClick={() => setDeleteTarget(post)}
                          title="Delete article"
                          className="rounded-lg p-1.5 text-steel-400 hover:bg-red-500/10 hover:text-red-400 transition-colors"
                        >
                          <Trash2 size={15} />
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

      {/* CREATE / EDIT MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-3xl rounded-2xl border border-white/10 bg-[#111827] p-6 shadow-2xl my-8">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h2 className="font-display text-xl font-bold uppercase text-white">
                {editingPost ? "Edit Technical Article" : "Publish New Article"}
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

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-steel-400 mb-1.5">
                  Article Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Why Accurate Structural Steel Detailing Matters in Modern Construction"
                  className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-white focus:border-copper-500 focus:outline-none"
                />
              </div>

              {/* Cover Image Input with Live Preview & Presets */}
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3.5 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-steel-300">
                    Cover Image URL
                  </label>
                  <span className="text-[11px] text-steel-400">Direct image link (Unsplash, CDN, or URL)</span>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="url"
                    value={formData.coverImage}
                    onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                    placeholder="https://images.unsplash.com/photo-..."
                    className="flex-1 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white focus:border-copper-500 focus:outline-none"
                  />
                  {formData.coverImage && (
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, coverImage: "" })}
                      className="text-xs text-red-400 hover:underline shrink-0"
                    >
                      Clear
                    </button>
                  )}
                </div>

                {/* Preset Suggestions */}
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <span className="text-[10px] uppercase font-bold text-copper-400">Quick Presets:</span>
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        coverImage:
                          "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1400&q=80",
                      })
                    }
                    className="rounded-md border border-white/10 bg-white/5 px-2 py-1 text-[10px] text-steel-300 hover:border-copper-500 hover:text-white transition-all"
                  >
                    Steel Detailing
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        coverImage:
                          "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1400&q=80",
                      })
                    }
                    className="rounded-md border border-white/10 bg-white/5 px-2 py-1 text-[10px] text-steel-300 hover:border-copper-500 hover:text-white transition-all"
                  >
                    BIM & Blueprint
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        coverImage:
                          "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1400&q=80",
                      })
                    }
                    className="rounded-md border border-white/10 bg-white/5 px-2 py-1 text-[10px] text-steel-300 hover:border-copper-500 hover:text-white transition-all"
                  >
                    Joist & Deck
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        coverImage:
                          "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1400&q=80",
                      })
                    }
                    className="rounded-md border border-white/10 bg-white/5 px-2 py-1 text-[10px] text-steel-300 hover:border-copper-500 hover:text-white transition-all"
                  >
                    Estimation & Fabrication
                  </button>
                </div>

                {/* Live Preview */}
                {formData.coverImage && (
                  <div className="relative mt-2 h-36 w-full overflow-hidden rounded-xl border border-white/15 bg-black/40">
                    <img
                      src={formData.coverImage}
                      alt="Cover Preview"
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = "none";
                      }}
                    />
                    <div className="absolute bottom-2 left-2 rounded bg-black/70 px-2 py-0.5 text-[10px] font-mono text-steel-200">
                      Live Preview
                    </div>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-steel-400 mb-1.5">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-[#1f2937] px-4 py-2.5 text-sm text-white focus:border-copper-500 focus:outline-none"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-steel-400 mb-1.5">
                    Estimated Read Time
                  </label>
                  <input
                    type="text"
                    value={formData.readTime}
                    onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                    placeholder="e.g. 5 min read"
                    className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-white focus:border-copper-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-steel-400 mb-1.5">
                    Author Name
                  </label>
                  <input
                    type="text"
                    value={formData.authorName}
                    onChange={(e) => setFormData({ ...formData, authorName: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-white focus:border-copper-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-steel-400 mb-1.5">
                    Author Role / Desk
                  </label>
                  <input
                    type="text"
                    value={formData.authorRole}
                    onChange={(e) => setFormData({ ...formData, authorRole: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-white focus:border-copper-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-steel-400 mb-1.5">
                  Summary / Excerpt *
                </label>
                <textarea
                  rows={2}
                  required
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  placeholder="Short 2-3 sentence overview that appears on preview cards..."
                  className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white focus:border-copper-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-steel-400 mb-1.5">
                  Introductory Paragraphs (Separate with double enter)
                </label>
                <textarea
                  rows={4}
                  value={formData.introText}
                  onChange={(e) => setFormData({ ...formData, introText: e.target.value })}
                  placeholder="Introductory text that sets the context for the engineering discussion..."
                  className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white focus:border-copper-500 focus:outline-none"
                />
              </div>

              {/* Sections Editor */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold uppercase tracking-wider text-copper-400">
                    Content Sections
                  </label>
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        sections: [
                          ...formData.sections,
                          { heading: "New Section", paragraphsText: "" },
                        ],
                      })
                    }
                    className="inline-flex items-center gap-1 text-xs text-copper-400 hover:text-copper-300 font-semibold"
                  >
                    <Plus size={13} />
                    Add Section
                  </button>
                </div>

                {formData.sections.map((section, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <input
                        type="text"
                        value={section.heading}
                        onChange={(e) => {
                          const updated = [...formData.sections];
                          updated[idx].heading = e.target.value;
                          setFormData({ ...formData, sections: updated });
                        }}
                        placeholder={`Section ${idx + 1} Heading`}
                        className="w-3/4 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs font-bold text-white focus:border-copper-500 focus:outline-none"
                      />
                      {formData.sections.length > 1 && (
                        <button
                          type="button"
                          onClick={() => {
                            const updated = formData.sections.filter((_, i) => i !== idx);
                            setFormData({ ...formData, sections: updated });
                          }}
                          className="text-red-400 hover:text-red-300 text-xs"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                    <textarea
                      rows={4}
                      value={section.paragraphsText}
                      onChange={(e) => {
                        const updated = [...formData.sections];
                        updated[idx].paragraphsText = e.target.value;
                        setFormData({ ...formData, sections: updated });
                      }}
                      placeholder="Section content paragraphs (separate with double enter)..."
                      className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-xs text-white focus:border-copper-500 focus:outline-none"
                    />
                  </div>
                ))}
              </div>

              {/* Status checkboxes */}
              <div className="flex items-center gap-6 pt-3">
                <label className="flex items-center gap-2 text-xs text-white cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isPublished}
                    onChange={(e) =>
                      setFormData({ ...formData, isPublished: e.target.checked })
                    }
                    className="rounded border-white/20 bg-white/5 text-copper-500 focus:ring-copper-500"
                  />
                  <span>Publish live immediately</span>
                </label>
                <label className="flex items-center gap-2 text-xs text-white cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) =>
                      setFormData({ ...formData, featured: e.target.checked })
                    }
                    className="rounded border-white/20 bg-white/5 text-copper-500 focus:ring-copper-500"
                  />
                  <span>Pin as featured article</span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 border-t border-white/10 pt-4">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="rounded-xl border border-white/10 px-4 py-2 text-xs font-semibold text-steel-400 hover:bg-white/5 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center gap-2 rounded-xl bg-copper-500 px-5 py-2 text-xs font-bold text-white shadow-lg shadow-copper-500/20 hover:bg-copper-400 disabled:opacity-50"
                >
                  {submitting && <Loader2 size={14} className="animate-spin" />}
                  <span>{editingPost ? "Update Article" : "Publish Article"}</span>
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
              Delete Article?
            </h3>
            <p className="mt-2 text-xs text-steel-400 leading-relaxed">
              Are you sure you want to permanently delete{" "}
              <strong className="text-white">"{deleteTarget.title}"</strong>? This action cannot be undone.
            </p>
            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                onClick={() => setDeleteTarget(null)}
                className="rounded-xl border border-white/10 px-4 py-2 text-xs font-semibold text-steel-400 hover:bg-white/5 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2 text-xs font-bold text-white hover:bg-red-500 disabled:opacity-50"
              >
                {deleting && <Loader2 size={13} className="animate-spin" />}
                <span>Delete Article</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
