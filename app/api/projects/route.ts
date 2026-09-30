import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Project } from "@/models";
import { initialProjectsData } from "@/data/projectsData";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    // Auto-seed initial projects if collection is empty
    const count = await Project.countDocuments();
    if (count === 0) {
      await Project.insertMany(initialProjectsData);
    }

    const { searchParams } = req.nextUrl;
    const category = searchParams.get("category");
    const query = searchParams.get("q");

    const filter: Record<string, unknown> = { isPublished: true };

    if (category && category !== "all" && category !== "All") {
      filter.category = category;
    }

    if (query) {
      filter.$or = [
        { title: { $regex: query, $options: "i" } },
        { tag: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
        { category: { $regex: query, $options: "i" } },
      ];
    }

    const projects = await Project.find(filter)
      .sort({ order: 1, createdAt: 1 })
      .lean();

    return NextResponse.json({
      success: true,
      projects,
      total: projects.length,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Public Projects GET error:", error);
    // Graceful fallback to static initial projects
    return NextResponse.json({
      success: true,
      projects: initialProjectsData,
      total: initialProjectsData.length,
      fallback: true,
      timestamp: new Date().toISOString(),
    });
  }
}
