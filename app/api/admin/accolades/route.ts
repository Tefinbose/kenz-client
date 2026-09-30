import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { getSessionAdmin } from "@/lib/auth";
import { Accolade } from "@/models";
import { initialAccoladesData } from "@/data/accoladesData";

export const dynamic = "force-dynamic";

// GET accolades page configuration
export async function GET(req: NextRequest) {
  try {
    const admin = await getSessionAdmin(req);
    if (!admin) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    let accoladeDoc = await Accolade.findOne({ isDefault: true });
    if (!accoladeDoc) {
      accoladeDoc = await Accolade.create({
        ...initialAccoladesData,
        isDefault: true,
      });
    }

    return NextResponse.json({
      success: true,
      data: accoladeDoc,
    });
  } catch (error) {
    console.error("Admin accolades GET error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch accolades data" },
      { status: 500 }
    );
  }
}

// PUT update accolades configuration (supports partial or complete updates)
export async function PUT(req: NextRequest) {
  try {
    const admin = await getSessionAdmin(req);
    if (!admin) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const body = await req.json();

    const updatePayload: Record<string, unknown> = {};
    if (body.metrics !== undefined) updatePayload.metrics = body.metrics;
    if (body.recognitions !== undefined) updatePayload.recognitions = body.recognitions;
    if (body.certifications !== undefined) updatePayload.certifications = body.certifications;
    if (body.endorsements !== undefined) updatePayload.endorsements = body.endorsements;
    if (body.hero !== undefined) updatePayload.hero = body.hero;
    if (body.philosophy !== undefined) updatePayload.philosophy = body.philosophy;
    if (body.cta !== undefined) updatePayload.cta = body.cta;
    if (body.meta !== undefined) updatePayload.meta = body.meta;

    const accoladeDoc = await Accolade.findOneAndUpdate(
      { isDefault: true },
      {
        $set: {
          ...updatePayload,
          isDefault: true,
        },
        $setOnInsert: {
          ...initialAccoladesData,
        },
      },
      { new: true, upsert: true, runValidators: false }
    );

    return NextResponse.json({
      success: true,
      message: "Accolades and metrics updated successfully",
      data: accoladeDoc,
    });
  } catch (error) {
    console.error("Admin accolades PUT error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to update accolades data",
      },
      { status: 500 }
    );
  }
}
