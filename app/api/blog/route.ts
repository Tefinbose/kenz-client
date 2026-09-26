import { NextResponse } from "next/server";
import { blogPosts } from "@/data/blogData";

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      data: blogPosts,
      total: blogPosts.length,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch blog posts",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
