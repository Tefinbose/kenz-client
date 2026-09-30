import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Blog } from "@/models";
import { blogPosts } from "@/data/blogData";

export const dynamic = "force-dynamic";

interface RouteParams {
  params: Promise<{
    slug: string;
  }>;
}

export async function GET(req: NextRequest, { params }: RouteParams) {
  try {
    const { slug } = await params;
    await connectDB();

    const post = await Blog.findOne({ slug }).lean();

    if (post) {
      return NextResponse.json({ success: true, data: post });
    }

    // Fallback to static blog data
    const fallbackPost = blogPosts.find((p) => p.slug === slug);
    if (fallbackPost) {
      return NextResponse.json({ success: true, data: fallbackPost });
    }

    return NextResponse.json(
      { success: false, error: "Blog post not found" },
      { status: 404 }
    );
  } catch (error) {
    console.error("Public Blog by Slug error:", error);
    const { slug } = await params;
    const fallbackPost = blogPosts.find((p) => p.slug === slug);
    if (fallbackPost) {
      return NextResponse.json({ success: true, data: fallbackPost });
    }
    return NextResponse.json(
      { success: false, error: "Failed to fetch blog post" },
      { status: 500 }
    );
  }
}
