import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Service } from "@/models";
import { initialServicesData } from "@/data/servicesData";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    // Auto-seed initial services if collection is empty
    const count = await Service.countDocuments();
    if (count === 0) {
      await Service.insertMany(initialServicesData);
    }

    const { searchParams } = req.nextUrl;
    const category = searchParams.get("category");
    const query = searchParams.get("q");

    const filter: Record<string, unknown> = { isPublished: true };

    if (category && category !== "all") {
      filter.category = category;
    }

    if (query) {
      filter.$or = [
        { title: { $regex: query, $options: "i" } },
        { shortTitle: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
        { code: { $regex: query, $options: "i" } },
      ];
    }

    const services = await Service.find(filter)
      .sort({ order: 1, createdAt: 1 })
      .lean();

    return NextResponse.json({
      success: true,
      services,
      total: services.length,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Public Services GET error:", error);
    // Graceful fallback to static initial services
    return NextResponse.json({
      success: true,
      services: initialServicesData,
      total: initialServicesData.length,
      fallback: true,
      timestamp: new Date().toISOString(),
    });
  }
}
