import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { connectDB } from "@/lib/db";
import { getSessionAdmin } from "@/lib/auth";
import { Career } from "@/models";

export const dynamic = "force-dynamic";

const updateCareerSchema = z.object({
  title: z.string().min(2).optional(),
  department: z.string().min(2).optional(),
  location: z.string().min(2).optional(),
  type: z.string().min(2).optional(),
  experience: z.string().optional(),
  description: z.string().min(10).optional(),
  requirements: z.array(z.string()).optional(),
  responsibilities: z.array(z.string()).optional(),
  benefits: z.array(z.string()).optional(),
  isActive: z.boolean().optional(),
  order: z.number().optional(),
});

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

// GET single career
export async function GET(req: NextRequest, { params }: RouteParams) {
  try {
    const admin = await getSessionAdmin(req);
    if (!admin) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    await connectDB();

    const career = await Career.findById(id);
    if (!career) {
      return NextResponse.json({ success: false, error: "Career not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, career });
  } catch (error) {
    console.error("Admin career GET by ID error:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch career" }, { status: 500 });
  }
}

// PUT update career
export async function PUT(req: NextRequest, { params }: RouteParams) {
  try {
    const admin = await getSessionAdmin(req);
    if (!admin) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    await connectDB();

    const body = await req.json();
    const parsed = updateCareerSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: parsed.error.issues[0]?.message || "Validation failed" },
        { status: 400 }
      );
    }

    const updatedCareer = await Career.findByIdAndUpdate(
      id,
      { $set: parsed.data },
      { new: true, runValidators: true }
    );

    if (!updatedCareer) {
      return NextResponse.json({ success: false, error: "Career not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Career updated successfully",
      career: updatedCareer,
    });
  } catch (error) {
    console.error("Admin career PUT error:", error);
    return NextResponse.json({ success: false, error: "Failed to update career" }, { status: 500 });
  }
}

// DELETE career
export async function DELETE(req: NextRequest, { params }: RouteParams) {
  try {
    const admin = await getSessionAdmin(req);
    if (!admin) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    await connectDB();

    const deleted = await Career.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json({ success: false, error: "Career not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Career posting deleted successfully",
    });
  } catch (error) {
    console.error("Admin career DELETE error:", error);
    return NextResponse.json({ success: false, error: "Failed to delete career" }, { status: 500 });
  }
}
