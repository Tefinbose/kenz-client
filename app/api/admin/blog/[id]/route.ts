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

const updateBlogSchema = z.object({
  title: z.string().min(1).optional(),
  slug: z.string().optional(),
  excerpt: z.string().min(1).optional(),
  category: z.string().min(1).optional(),
  readTime: z.string().optional(),
  author: z
    .object({
      name: z.string().optional(),
      role: z.string().optional(),
    })
    .optional(),
  introParagraphs: z.array(z.string()).optional(),
  sections: z.array(blogSectionSchema).optional(),
  coverImage: z.string().optional(),
  isPublished: z.boolean().optional(),
  featured: z.boolean().optional(),
});

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

// GET single blog post
export async function GET(req: NextRequest, { params }: RouteParams) {
  try {
    const admin = await getSessionAdmin(req);
    if (!admin) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    await connectDB();

    const post = await Blog.findById(id);
    if (!post) {
      return NextResponse.json({ success: false, error: "Blog post not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, post });
  } catch (error) {
    console.error("Admin blog GET by ID error:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch post" }, { status: 500 });
  }
}

// PUT update blog post
export async function PUT(req: NextRequest, { params }: RouteParams) {
  try {
    const admin = await getSessionAdmin(req);
    if (!admin) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    await connectDB();

    const body = await req.json();
    const parsed = updateBlogSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: parsed.error.issues[0]?.message || "Validation failed" },
        { status: 400 }
      );
    }

    const updated = await Blog.findByIdAndUpdate(
      id,
      { $set: parsed.data },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return NextResponse.json({ success: false, error: "Blog post not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Blog post updated successfully",
      post: updated,
    });
  } catch (error) {
    console.error("Admin blog PUT error:", error);
    return NextResponse.json({ success: false, error: "Failed to update blog post" }, { status: 500 });
  }
}

// DELETE blog post
export async function DELETE(req: NextRequest, { params }: RouteParams) {
  try {
    const admin = await getSessionAdmin(req);
    if (!admin) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    await connectDB();

    const deleted = await Blog.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json({ success: false, error: "Blog post not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Blog post deleted successfully",
    });
  } catch (error) {
    console.error("Admin blog DELETE error:", error);
    return NextResponse.json({ success: false, error: "Failed to delete blog post" }, { status: 500 });
  }
}
