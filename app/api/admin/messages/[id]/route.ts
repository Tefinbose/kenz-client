import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { connectDB } from "@/lib/db";
import { getSessionAdmin } from "@/lib/auth";
import { ContactMessage } from "@/models";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

const updateStatusSchema = z.object({
  status: z.enum(["unread", "read", "replied", "archived"]).optional(),
  notes: z.string().optional(),
});

// GET single message
export async function GET(req: NextRequest, { params }: RouteParams) {
  try {
    const admin = await getSessionAdmin(req);
    if (!admin) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    await connectDB();

    const message = await ContactMessage.findById(id);
    if (!message) {
      return NextResponse.json({ success: false, error: "Message not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message });
  } catch (error) {
    console.error("Admin message GET by ID error:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch message" }, { status: 500 });
  }
}

// PUT / PATCH update message status or notes
export async function PUT(req: NextRequest, { params }: RouteParams) {
  try {
    const admin = await getSessionAdmin(req);
    if (!admin) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    await connectDB();

    const body = await req.json();
    const parsed = updateStatusSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: parsed.error.issues[0]?.message || "Validation failed" },
        { status: 400 }
      );
    }

    const updated = await ContactMessage.findByIdAndUpdate(
      id,
      { $set: parsed.data },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json({ success: false, error: "Message not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Inquiry status updated successfully",
      data: updated,
    });
  } catch (error) {
    console.error("Admin message PUT error:", error);
    return NextResponse.json({ success: false, error: "Failed to update message" }, { status: 500 });
  }
}

// DELETE message
export async function DELETE(req: NextRequest, { params }: RouteParams) {
  try {
    const admin = await getSessionAdmin(req);
    if (!admin) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    await connectDB();

    const deleted = await ContactMessage.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json({ success: false, error: "Message not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Inquiry deleted successfully",
    });
  } catch (error) {
    console.error("Admin message DELETE error:", error);
    return NextResponse.json({ success: false, error: "Failed to delete message" }, { status: 500 });
  }
}
