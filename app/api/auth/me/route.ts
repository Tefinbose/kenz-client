import { NextRequest, NextResponse } from "next/server";
import { getSessionAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const admin = await getSessionAdmin(req);

    if (!admin) {
      return NextResponse.json(
        {
          authenticated: false,
          admin: null,
        },
        { status: 401 }
      );
    }

    return NextResponse.json({
      authenticated: true,
      admin,
    });
  } catch (error) {
    console.error("Auth me error:", error);
    return NextResponse.json(
      {
        authenticated: false,
        admin: null,
      },
      { status: 500 }
    );
  }
}
