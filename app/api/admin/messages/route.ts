import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { getSessionAdmin } from "@/lib/auth";
import { ContactMessage } from "@/models";

export const dynamic = "force-dynamic";
export const revalidate = 0;

// GET all contact inquiries for admin with optional filtering
export async function GET(req: NextRequest) {
  try {
    const admin = await getSessionAdmin(req);
    if (!admin) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const searchParams = req.nextUrl.searchParams;
    const query = searchParams.get("q") || "";
    const status = searchParams.get("status") || "all";

    const filter: Record<string, unknown> = {};

    if (query) {
      filter.$or = [
        { name: { $regex: query, $options: "i" } },
        { company: { $regex: query, $options: "i" } },
        { email: { $regex: query, $options: "i" } },
        { projectName: { $regex: query, $options: "i" } },
        { service: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
      ];
    }

    if (status && status !== "all") {
      filter.status = status;
    }

    const messages = await ContactMessage.find(filter)
      .sort({ createdAt: -1 })
      .lean();

    // Also get quick stats
    const [total, unread, replied, archived] = await Promise.all([
      ContactMessage.countDocuments(),
      ContactMessage.countDocuments({ status: "unread" }),
      ContactMessage.countDocuments({ status: "replied" }),
      ContactMessage.countDocuments({ status: "archived" }),
    ]);

    return NextResponse.json({
      success: true,
      messages,
      total: messages.length,
      stats: {
        total,
        unread,
        replied,
        archived,
        read: total - (unread + replied + archived),
      },
    });
  } catch (error) {
    console.error("Admin messages GET error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch contact inquiries" },
      { status: 500 }
    );
  }
}
