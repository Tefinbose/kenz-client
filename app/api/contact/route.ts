import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import fs from "fs";
import path from "path";
import { connectDB } from "@/lib/db";
import { ContactMessage } from "@/models";

export const dynamic = "force-dynamic";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  company: z.string().min(1, "Company is required"),
  email: z.string().email("Valid email address is required"),
  phone: z.string().optional().default(""),
  projectName: z.string().min(1, "Project name is required"),
  projectType: z.string().default("Commercial"),
  service: z.string().default("Steel Detailing"),
  description: z.string().min(1, "Description is required"),
  fileName: z.string().optional().default(""),
  fileSize: z.string().optional().default(""),
});

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const contentType = req.headers.get("content-type") || "";
    let data: Record<string, unknown> = {};
    let fileBuffer: Buffer | null = null;
    let originalFileName = "";
    let fileMimeType = "";
    let formattedSize = "";

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      data = {
        name: formData.get("name")?.toString() || "",
        company: formData.get("company")?.toString() || "",
        email: formData.get("email")?.toString() || "",
        phone: formData.get("phone")?.toString() || "",
        projectName: formData.get("projectName")?.toString() || "",
        projectType: formData.get("projectType")?.toString() || "Commercial",
        service: formData.get("service")?.toString() || "Steel Detailing",
        description: formData.get("description")?.toString() || "",
      };

      const file = formData.get("file");
      if (file && typeof file === "object" && "arrayBuffer" in file) {
        const uploadedFile = file as File;
        if (uploadedFile.size > 0) {
          originalFileName = uploadedFile.name;
          fileMimeType = uploadedFile.type || "application/octet-stream";
          formattedSize = `${(uploadedFile.size / (1024 * 1024)).toFixed(2)} MB`;
          const bytes = await uploadedFile.arrayBuffer();
          fileBuffer = Buffer.from(bytes);
        }
      }
    } else {
      const body = await req.json();
      data = body;
      originalFileName = body.fileName || "";
      formattedSize = body.fileSize || "";
      if (body.fileData && typeof body.fileData === "string") {
        const base64Data = body.fileData.replace(/^data:[^;]+;base64,/, "");
        fileBuffer = Buffer.from(base64Data, "base64");
      }
    }

    const parsed = contactSchema.safeParse(data);
    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: parsed.error.issues[0]?.message || "Validation failed",
        },
        { status: 400 }
      );
    }

    let fileUrl = "";
    let base64Data = "";

    if (fileBuffer && originalFileName) {
      try {
        const uploadsDir = path.join(process.cwd(), "public", "uploads");
        if (!fs.existsSync(uploadsDir)) {
          fs.mkdirSync(uploadsDir, { recursive: true });
        }

        const ext = path.extname(originalFileName);
        const baseName = path.basename(originalFileName, ext).replace(/[^a-zA-Z0-9_-]/g, "_");
        const safeFilename = `${Date.now()}-${baseName}${ext}`;
        const filePath = path.join(uploadsDir, safeFilename);

        fs.writeFileSync(filePath, fileBuffer);
        fileUrl = `/uploads/${safeFilename}`;

        // Store base64 data for resilient backup if under 8MB
        if (fileBuffer.length <= 8 * 1024 * 1024) {
          base64Data = `data:${fileMimeType || "application/octet-stream"};base64,${fileBuffer.toString("base64")}`;
        }
      } catch (fileErr) {
        console.warn("Failed to write file to disk, relying on base64:", fileErr);
        if (fileBuffer.length <= 8 * 1024 * 1024) {
          base64Data = `data:${fileMimeType || "application/octet-stream"};base64,${fileBuffer.toString("base64")}`;
        }
      }
    }

    const message = await ContactMessage.create({
      ...parsed.data,
      fileName: originalFileName || parsed.data.fileName,
      fileSize: formattedSize || parsed.data.fileSize,
      fileUrl: fileUrl || undefined,
      fileType: fileMimeType || undefined,
      fileData: base64Data || undefined,
      status: "unread",
    });

    return NextResponse.json(
      {
        success: true,
        message: "Your inquiry and documents have been submitted successfully.",
        id: message._id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Contact submission error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to submit inquiry",
      },
      { status: 500 }
    );
  }
}
