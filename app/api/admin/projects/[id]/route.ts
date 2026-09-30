import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { connectDB } from "@/lib/db";
import { getSessionAdmin } from "@/lib/auth";
import { Project } from "@/models";

export const dynamic = "force-dynamic";

const updateProjectSchema = z.object({
  title: z.string().min(1).optional(),
  slug: z.string().optional(),
  number: z.string().optional(),
  tag: z.string().optional(),
  category: z.string().optional(),
  description: z.string().min(1).optional(),
  detailedScope: z.array(z.string()).optional(),
  icon: z.string().optional(),
  href: z.string().optional(),
  client: z.string().optional(),
  location: z.string().optional(),
  year: z.string().optional(),
  image: z.string().optional(),
  gallery: z.array(z.string()).optional(),
  featured: z.boolean().optional(),
  order: z.number().optional(),
  isPublished: z.boolean().optional(),
});

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

// GET single project
export async function GET(req: NextRequest, { params }: RouteParams) {
  try {
    const admin = await getSessionAdmin(req);
    if (!admin) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    await connectDB();

    const project = await Project.findById(id);
    if (!project) {
      return NextResponse.json({ success: false, error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, project });
  } catch (error) {
    console.error("Admin project GET by ID error:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch project" }, { status: 500 });
  }
}

// PUT update project
export async function PUT(req: NextRequest, { params }: RouteParams) {
  try {
    const admin = await getSessionAdmin(req);
    if (!admin) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    await connectDB();

    const body = await req.json();
    const parsed = updateProjectSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: parsed.error.issues[0]?.message || "Validation failed" },
        { status: 400 }
      );
    }

    const updated = await Project.findByIdAndUpdate(
      id,
      { $set: parsed.data },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return NextResponse.json({ success: false, error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Project updated successfully",
      project: updated,
    });
  } catch (error) {
    console.error("Admin project PUT error:", error);
    return NextResponse.json({ success: false, error: "Failed to update project" }, { status: 500 });
  }
}

// DELETE project
export async function DELETE(req: NextRequest, { params }: RouteParams) {
  try {
    const admin = await getSessionAdmin(req);
    if (!admin) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    await connectDB();

    const deleted = await Project.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json({ success: false, error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error) {
    console.error("Admin project DELETE error:", error);
    return NextResponse.json({ success: false, error: "Failed to delete project" }, { status: 500 });
  }
}
