import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { connectDB } from "@/lib/db";
import { getSessionAdmin } from "@/lib/auth";
import { Service } from "@/models";
import { initialServicesData } from "@/data/servicesData";

export const dynamic = "force-dynamic";

const serviceSchema = z.object({
  number: z.string().min(1, "Number (e.g. 01) is required"),
  category: z.enum(["structural", "engineering", "bim"]),
  title: z.string().min(1, "Title is required"),
  shortTitle: z.string().min(1, "Short title is required"),
  code: z.string().min(1, "Service code (e.g. SRV-01) is required"),
  spec: z.string().min(1, "Specification is required"),
  description: z.string().min(1, "Description is required"),
  href: z.string().min(1, "Link href is required"),
  icon: z.string().optional().default("Ruler"),
  capabilities: z.array(z.string()).optional().default([]),
  featured: z.boolean().optional().default(false),
  order: z.number().optional().default(0),
  isPublished: z.boolean().optional().default(true),
});

// GET all services for admin
export async function GET(req: NextRequest) {
  try {
    const admin = await getSessionAdmin(req);
    if (!admin) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    // Auto-seed initial services if count is 0
    const count = await Service.countDocuments();
    if (count === 0) {
      await Service.insertMany(initialServicesData);
    }

    const { searchParams } = req.nextUrl;
    const query = searchParams.get("q") || "";
    const category = searchParams.get("category") || "";
    const status = searchParams.get("status");

    const filter: Record<string, unknown> = {};

    if (query) {
      filter.$or = [
        { title: { $regex: query, $options: "i" } },
        { shortTitle: { $regex: query, $options: "i" } },
        { code: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
      ];
    }

    if (category && category !== "all") {
      filter.category = category;
    }

    if (status === "published") {
      filter.isPublished = true;
    } else if (status === "draft") {
      filter.isPublished = false;
    }

    const services = await Service.find(filter).sort({ order: 1, createdAt: 1 });

    return NextResponse.json({
      success: true,
      services,
      total: services.length,
    });
  } catch (error) {
    console.error("Admin services GET error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch services" },
      { status: 500 }
    );
  }
}

// POST create service
export async function POST(req: NextRequest) {
  try {
    const admin = await getSessionAdmin(req);
    if (!admin) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const body = await req.json();
    const parsed = serviceSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: parsed.error.issues[0]?.message || "Validation failed" },
        { status: 400 }
      );
    }

    const data = parsed.data;

    const newService = await Service.create(data);

    return NextResponse.json({
      success: true,
      message: "Service discipline created successfully",
      service: newService,
    });
  } catch (error) {
    console.error("Admin services POST error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to create service",
      },
      { status: 500 }
    );
  }
}
