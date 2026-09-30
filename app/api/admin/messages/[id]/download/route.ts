import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { connectDB } from "@/lib/db";
import { getSessionAdmin } from "@/lib/auth";
import { ContactMessage } from "@/models";

export const dynamic = "force-dynamic";

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(req: NextRequest, { params }: RouteParams) {
  try {
    const admin = await getSessionAdmin(req);
    if (!admin) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    await connectDB();

    const message = await ContactMessage.findById(id);
    if (!message) {
      return NextResponse.json({ success: false, error: "Message not found" }, { status: 404 });
    }

    if (!message.fileName) {
      return NextResponse.json({ success: false, error: "No document attached to this message" }, { status: 404 });
    }

    const downloadRequested = req.nextUrl.searchParams.get("download") === "true";
    let fileBuffer: Buffer | null = null;
    let mimeType = message.fileType || "application/octet-stream";

    // 1. Try to read from public/uploads disk
    if (message.fileUrl && message.fileUrl.startsWith("/uploads/")) {
      const relativePath = message.fileUrl.replace(/^\/uploads\//, "");
      const fullPath = path.join(process.cwd(), "public", "uploads", relativePath);
      if (fs.existsSync(fullPath)) {
        fileBuffer = fs.readFileSync(fullPath);
      }
    }

    // 2. Fallback to base64 data stored in DB
    if (!fileBuffer && message.fileData) {
      const match = message.fileData.match(/^data:([^;]+);base64,(.+)$/);
      if (match) {
        mimeType = match[1];
        fileBuffer = Buffer.from(match[2], "base64");
      } else {
        fileBuffer = Buffer.from(message.fileData, "base64");
      }
    }

    if (!fileBuffer) {
      // If neither disk nor base64 is available (e.g. from an old test record before file uploads were implemented)
      return NextResponse.json(
        {
          success: false,
          error: "Document content was not stored with this older inquiry record.",
        },
        { status: 404 }
      );
    }

    const dispositionType = downloadRequested ? "attachment" : "inline";
    // Clean filename for header
    const safeHeaderFilename = encodeURIComponent(message.fileName).replace(/['()]/g, escape);

    return new NextResponse(new Uint8Array(fileBuffer), {
      status: 200,
      headers: {
        "Content-Type": mimeType,
        "Content-Disposition": `${dispositionType}; filename="${message.fileName}"; filename*=UTF-8''${safeHeaderFilename}`,
        "Content-Length": fileBuffer.length.toString(),
        "Cache-Control": "private, max-age=3600",
      },
    });
  } catch (error) {
    console.error("Admin document download error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to download document" },
      { status: 500 }
    );
  }
}
