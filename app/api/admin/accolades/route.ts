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

    let accoladeDoc = await Accolade.findOne({ isDefault: true }).lean();
    if (!accoladeDoc) {
      const created = await Accolade.create({
        ...initialAccoladesData,
        isDefault: true,
      });
      accoladeDoc = created.toObject();
    }

    return NextResponse.json(
      { success: true, data: accoladeDoc },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
      }
    );
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

    // First ensure a document exists (seed if needed)
    const existing = await Accolade.findOne({ isDefault: true });
    if (!existing) {
      await Accolade.create({ ...initialAccoladesData, isDefault: true });
    }

    // Now perform a clean atomic update with only $set — no $setOnInsert conflict
    const accoladeDoc = await Accolade.findOneAndUpdate(
      { isDefault: true },
      { $set: { ...updatePayload, updatedAt: new Date() } },
      { new: true, upsert: false, runValidators: false, lean: true }
    );

    return NextResponse.json(
      {
        success: true,
        message: "Accolades and metrics updated successfully",
        data: accoladeDoc,
      },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
      }
    );
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
