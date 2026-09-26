import { NextResponse } from "next/server";
import { initialAccoladesData } from "@/data/accoladesData";

/**
 * GET /api/accolades
 * Serves the dynamic accolades, recognition, and testimonial data.
 * When you connect a database (e.g. PostgreSQL, MongoDB, Prisma),
 * query your database here and return the records.
 */
export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      data: initialAccoladesData,
      source: "dynamic_memory_data",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch accolades data",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
