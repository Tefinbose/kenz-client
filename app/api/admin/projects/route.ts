import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { connectDB } from "@/lib/db";
import { getSessionAdmin } from "@/lib/auth";
import { Project } from "@/models";
import { initialProjectsData } from "@/data/projectsData";

export const dynamic = "force-dynamic";

const projectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().optional(),
  number: z.string().optional().default("01"),
  tag: z.string().optional().default("Structural"),
  category: z.string().optional().default("Structural"),
  description: z.string().min(1, "Description is required"),
  detailedScope: z.array(z.string()).optional().default([]),
  icon: z.string().optional().default("Ruler"),
  href: z.string().optional().default("/services"),
  client: z.string().optional(),
  location: z.string().optional(),
  year: z.string().optional(),
  image: z.string().optional(),
  gallery: z.array(z.string()).optional().default([]),
  featured: z.boolean().optional().default(false),
  order: z.number().optional().default(0),
  isPublished: z.boolean().optional().default(true),
});

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// GET all projects for admin
export async function GET(req: NextRequest) {
  try {
    const admin = await getSessionAdmin(req);
    if (!admin) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    // Auto-seed initial projects if collection is empty
    const count = await Project.countDocuments();
    if (count === 0) {
      await Project.insertMany(initialProjectsData);
    }

    const { searchParams } = req.nextUrl;
    const query = searchParams.get("q") || "";
    const category = searchParams.get("category") || "";
    const status = searchParams.get("status");

    const filter: Record<string, unknown> = {};

    if (query) {
      filter.$or = [
        { title: { $regex: query, $options: "i" } },
        { tag: { $regex: query, $options: "i" } },
        { category: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
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

    const projects = await Project.find(filter).sort({ order: 1, createdAt: -1 });

    return NextResponse.json({
      success: true,
      projects,
      total: projects.length,
    });
  } catch (error) {
    console.error("Admin projects GET error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}

// POST create project
export async function POST(req: NextRequest) {
  try {
    const admin = await getSessionAdmin(req);
    if (!admin) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const body = await req.json();
    const parsed = projectSchema.safeParse(body);

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

    const newProject = await Project.create({
      ...data,
      slug,
    });

    return NextResponse.json({
      success: true,
      message: "Project record created successfully",
      project: newProject,
    });
  } catch (error) {
    console.error("Admin projects POST error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to create project",
      },
      { status: 500 }
    );
  }
}
