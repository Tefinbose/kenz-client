import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { getSessionAdmin } from "@/lib/auth";
import {
  Project,
  Service,
  Career,
  Accolade,
  Blog,
  ContactMessage,
} from "@/models";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const admin = await getSessionAdmin(req);
    if (!admin) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectDB();

    // Query stats in parallel
    const [
      totalProjects,
      totalServices,
      activeCareers,
      totalCareers,
      totalBlogs,
      totalMessages,
      unreadMessages,
      recentMessages,
      accoladeDoc,
    ] = await Promise.all([
      Project.countDocuments(),
      Service.countDocuments(),
      Career.countDocuments({ isActive: true }),
      Career.countDocuments(),
      Blog.countDocuments(),
      ContactMessage.countDocuments(),
      ContactMessage.countDocuments({ status: "unread" }),
      ContactMessage.find().sort({ createdAt: -1 }).limit(5).lean(),
      Accolade.findOne({ isDefault: true }).lean(),
    ]);

    const totalAccolades = accoladeDoc?.recognitions?.length || 0;
    const totalCertifications = accoladeDoc?.certifications?.length || 0;
    const totalEndorsements = accoladeDoc?.endorsements?.length || 0;

    return NextResponse.json({
      success: true,
      stats: {
        projects: totalProjects,
        services: totalServices,
        careers: {
          active: activeCareers,
          total: totalCareers,
        },
        blog: totalBlogs,
        accolades: {
          recognitions: totalAccolades,
          certifications: totalCertifications,
          endorsements: totalEndorsements,
          total: totalAccolades + totalCertifications,
        },
        messages: {
          total: totalMessages,
          unread: unreadMessages,
        },
      },
      recentMessages,
      serverTime: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Admin stats error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to load admin stats",
      },
      { status: 500 }
    );
  }
}
