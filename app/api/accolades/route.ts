import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Accolade } from "@/models";
import { initialAccoladesData } from "@/data/accoladesData";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await connectDB();

    // Auto-seed initial accolades data if collection is empty
    let accoladeDoc = await Accolade.findOne({ isDefault: true }).lean();

    if (!accoladeDoc) {
      const created = await Accolade.create({
        ...initialAccoladesData,
        isDefault: true,
      });
      accoladeDoc = created.toObject();
    }

    return NextResponse.json(
      {
        success: true,
        data: accoladeDoc,
        source: "database",
        timestamp: new Date().toISOString(),
      },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
      }
    );
  } catch (error) {
    console.error("Public accolades GET error:", error);
    // Graceful fallback to initial static data
    return NextResponse.json(
      {
        success: true,
        data: initialAccoladesData,
        source: "static_fallback",
        error: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
      },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate",
        },
      }
    );
  }
}
