import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Blog } from "@/models";
import { blogPosts } from "@/data/blogData";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    // Auto-seed initial blog posts if collection is empty
    const count = await Blog.countDocuments();
    if (count === 0) {
      const postsToInsert = blogPosts.map((p, idx) => ({
        slug: p.slug,
        title: p.title,
        excerpt: p.excerpt,
        date: p.date,
        readTime: p.readTime,
        category: p.category,
        author: p.author,
        introParagraphs: p.introParagraphs || [],
        sections: p.sections || [],
        coverImage: p.coverImage,
        isPublished: true,
        featured: idx === 0,
      }));
      await Blog.insertMany(postsToInsert);
    }

    const { searchParams } = req.nextUrl;
    const category = searchParams.get("category");
    const query = searchParams.get("q");

    const filter: Record<string, unknown> = { isPublished: true };

    if (category && category !== "All") {
      filter.category = category;
    }

    if (query) {
      filter.$or = [
        { title: { $regex: query, $options: "i" } },
        { excerpt: { $regex: query, $options: "i" } },
        { category: { $regex: query, $options: "i" } },
      ];
    }

    const posts = await Blog.find(filter)
      .sort({ featured: -1, createdAt: -1 })
      .lean();

    const formattedPosts = posts.map((p) => ({
      ...p,
      id: p._id?.toString() || p.slug,
    }));

    return NextResponse.json({
      success: true,
      data: formattedPosts,
      total: formattedPosts.length,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Public Blog GET error:", error);
    // Fallback to static blogPosts if DB error occurs
    return NextResponse.json({
      success: true,
      data: blogPosts,
      total: blogPosts.length,
      fallback: true,
      timestamp: new Date().toISOString(),
    });
  }
}
