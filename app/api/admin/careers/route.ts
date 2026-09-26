import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { connectDB } from "@/lib/db";
import { getSessionAdmin } from "@/lib/auth";
import { Career } from "@/models";

export const dynamic = "force-dynamic";

const careerSchema = z.object({
  title: z.string().min(2, "Title is required"),
  department: z.string().min(2, "Department is required"),
  location: z.string().min(2, "Location is required"),
  type: z.string().min(2, "Employment type is required"),
  experience: z.string().default("2+ years"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  requirements: z.array(z.string()).default([]),
  responsibilities: z.array(z.string()).default([]),
  benefits: z.array(z.string()).default([]),
  isActive: z.boolean().default(true),
  order: z.number().default(0),
});

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// GET all careers for admin (including drafts)
export async function GET(req: NextRequest) {
  try {
    const admin = await getSessionAdmin(req);
    if (!admin) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const searchParams = req.nextUrl.searchParams;
    const query = searchParams.get("q") || "";
    const department = searchParams.get("department") || "";
    const status = searchParams.get("status"); // "active", "inactive", or null

    const filter: Record<string, unknown> = {};

    if (query) {
      filter.$or = [
        { title: { $regex: query, $options: "i" } },
        { department: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
      ];
    }

    if (department && department !== "all") {
      filter.department = department;
    }

    if (status === "active") {
      filter.isActive = true;
    } else if (status === "inactive") {
      filter.isActive = false;
    }

    const careers = await Career.find(filter).sort({ order: 1, createdAt: -1 });

    return NextResponse.json({
      success: true,
      careers,
      total: careers.length,
    });
  } catch (error) {
    console.error("Admin careers GET error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch careers" },
      { status: 500 }
    );
  }
}

// POST create new career
export async function POST(req: NextRequest) {
  try {
    const admin = await getSessionAdmin(req);
    if (!admin) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const body = await req.json();
    const parsed = careerSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: parsed.error.issues[0]?.message || "Validation failed" },
        { status: 400 }
      );
    }

    const data = parsed.data;
    const slug = `${slugify(data.title)}-${Date.now().toString(36)}`;

    const newCareer = await Career.create({
      ...data,
      slug,
    });

    return NextResponse.json({
      success: true,
      message: "Career posting created successfully",
      career: newCareer,
    });
  } catch (error) {
    console.error("Admin careers POST error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create career posting" },
      { status: 500 }
    );
  }
}
