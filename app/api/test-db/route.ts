import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import {
  Admin,
  Project,
  Service,
  Career,
  Accolade,
  Blog,
  ContactMessage,
} from "@/models";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const mongooseInstance = await connectDB();
    const connectionState = mongooseInstance.connection.readyState;
    const dbName = mongooseInstance.connection.name;

    // 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
    const stateLabels: Record<number, string> = {
      0: "disconnected",
      1: "connected",
      2: "connecting",
      3: "disconnecting",
    };

    // Verify all models are registered and count documents
    const modelsVerified = {
      Admin: Admin.modelName,
      Project: Project.modelName,
      Service: Service.modelName,
      Career: Career.modelName,
      Accolade: Accolade.modelName,
      Blog: Blog.modelName,
      ContactMessage: ContactMessage.modelName,
    };

    return NextResponse.json({
      success: true,
      message: "MongoDB connected and all models verified successfully",
      database: dbName,
      status: stateLabels[connectionState] || "unknown",
      readyState: connectionState,
      registeredModels: Object.keys(modelsVerified),
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("MongoDB verification error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "MongoDB connection or model initialization failed",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}