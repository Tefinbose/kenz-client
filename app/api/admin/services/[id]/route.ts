import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { connectDB } from "@/lib/db";
import { getSessionAdmin } from "@/lib/auth";
import { Service } from "@/models";

export const dynamic = "force-dynamic";

const updateServiceSchema = z.object({
  number: z.string().min(1).optional(),
  category: z.enum(["structural", "engineering", "bim"]).optional(),
  title: z.string().min(1).optional(),
  shortTitle: z.string().min(1).optional(),
  code: z.string().min(1).optional(),
  spec: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  href: z.string().min(1).optional(),
  icon: z.string().optional(),
  capabilities: z.array(z.string()).optional(),
  featured: z.boolean().optional(),
  order: z.number().optional(),
  isPublished: z.boolean().optional(),
});

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

// GET single service
export async function GET(req: NextRequest, { params }: RouteParams) {
  try {
    const admin = await getSessionAdmin(req);
    if (!admin) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    await connectDB();

    const service = await Service.findById(id);
    if (!service) {
      return NextResponse.json({ success: false, error: "Service not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, service });
  } catch (error) {
    console.error("Admin service GET by ID error:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch service" }, { status: 500 });
  }
}

// PUT update service
export async function PUT(req: NextRequest, { params }: RouteParams) {
  try {
    const admin = await getSessionAdmin(req);
    if (!admin) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    await connectDB();

    const body = await req.json();
    const parsed = updateServiceSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: parsed.error.issues[0]?.message || "Validation failed" },
        { status: 400 }
      );
    }

    const updated = await Service.findByIdAndUpdate(
      id,
      { $set: parsed.data },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return NextResponse.json({ success: false, error: "Service not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Service discipline updated successfully",
      service: updated,
    });
  } catch (error) {
    console.error("Admin service PUT error:", error);
    return NextResponse.json({ success: false, error: "Failed to update service" }, { status: 500 });
  }
}

// DELETE service
export async function DELETE(req: NextRequest, { params }: RouteParams) {
  try {
    const admin = await getSessionAdmin(req);
    if (!admin) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    await connectDB();

    const deleted = await Service.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json({ success: false, error: "Service not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Service discipline deleted successfully",
    });
  } catch (error) {
    console.error("Admin service DELETE error:", error);
    return NextResponse.json({ success: false, error: "Failed to delete service" }, { status: 500 });
  }
}
