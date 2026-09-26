import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
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

    const body = await req.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: parsed.error.issues[0]?.message || "Validation failed",
        },
        { status: 400 }
      );
    }

    const message = await ContactMessage.create({
      ...parsed.data,
      status: "unread",
    });

    return NextResponse.json(
      {
        success: true,
        message: "Your inquiry has been submitted and stored successfully.",
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
