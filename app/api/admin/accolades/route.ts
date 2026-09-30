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

    let accoladeDoc = await Accolade.findOne({ isDefault: true });

    if (!accoladeDoc) {
      accoladeDoc = await Accolade.create({
        ...initialAccoladesData,
        ...body,
        isDefault: true,
      });
    } else {
      // Deep merge updates or assign fields
      if (body.metrics) accoladeDoc.metrics = body.metrics;
      if (body.recognitions) accoladeDoc.recognitions = body.recognitions;
      if (body.certifications) accoladeDoc.certifications = body.certifications;
      if (body.endorsements) accoladeDoc.endorsements = body.endorsements;
      if (body.hero) accoladeDoc.hero = { ...accoladeDoc.hero, ...body.hero };
      if (body.philosophy) accoladeDoc.philosophy = { ...accoladeDoc.philosophy, ...body.philosophy };
      if (body.cta) accoladeDoc.cta = { ...accoladeDoc.cta, ...body.cta };
      if (body.meta) accoladeDoc.meta = { ...accoladeDoc.meta, ...body.meta };

      await accoladeDoc.save();
    }

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
