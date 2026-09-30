import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { connectDB } from "@/lib/db";
import { getSessionAdmin } from "@/lib/auth";
import { Blog } from "@/models";

export const dynamic = "force-dynamic";

const blogSectionSchema = z.object({
  heading: z.string().optional().default(""),
  paragraphs: z.array(z.string()).optional().default([]),
});

const createBlogSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().optional(),
  excerpt: z.string().min(1, "Excerpt is required"),
  category: z.string().min(1, "Category is required"),
  readTime: z.string().optional().default("4 min read"),
  author: z
    .object({
      name: z.string().default("Kenz Engineering LLC"),
      role: z.string().default("Engineering Team"),
    })
    .optional(),
  introParagraphs: z.array(z.string()).optional().default([]),
  sections: z.array(blogSectionSchema).optional().default([]),
  coverImage: z.string().optional(),
  isPublished: z.boolean().optional().default(true),
  featured: z.boolean().optional().default(false),
});

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// GET all blogs for admin
export async function GET(req: NextRequest) {
  try {
    const admin = await getSessionAdmin(req);
    if (!admin) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const { searchParams } = req.nextUrl;
    const query = searchParams.get("q") || "";
    const category = searchParams.get("category") || "";
    const status = searchParams.get("status");

    const filter: Record<string, unknown> = {};

    if (query) {
      filter.$or = [
        { title: { $regex: query, $options: "i" } },
        { excerpt: { $regex: query, $options: "i" } },
        { category: { $regex: query, $options: "i" } },
      ];
    }

    if (category && category !== "all" && category !== "All") {
      filter.category = category;
    }

    if (status === "published") {
      filter.isPublished = true;
    } else if (status === "draft") {
      filter.isPublished = false;
    }

    const posts = await Blog.find(filter).sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      posts,
      total: posts.length,
    });
  } catch (error) {
    console.error("Admin blog GET error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch blog posts" },
      { status: 500 }
    );
  }
}

// POST create blog
export async function POST(req: NextRequest) {
  try {
    const admin = await getSessionAdmin(req);
    if (!admin) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const body = await req.json();
    const parsed = createBlogSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: parsed.error.issues[0]?.message || "Validation failed" },
        { status: 400 }
      );
    }

    const data = parsed.data;
    const slug = data.slug?.trim()
      ? slugify(data.slug)
      : `${slugify(data.title)}-${Date.now().toString(36)}`;

    // Check unique slug
    const existing = await Blog.findOne({ slug });
    const finalSlug = existing ? `${slug}-${Date.now().toString(36)}` : slug;

    const formattedDate = new Date().toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });

    const newPost = await Blog.create({
      ...data,
      slug: finalSlug,
      date: formattedDate,
    });

    return NextResponse.json({
      success: true,
      message: "Blog post published successfully",
      post: newPost,
    });
  } catch (error) {
    console.error("Admin blog POST error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create blog post" },
      { status: 500 }
    );
  }
}
