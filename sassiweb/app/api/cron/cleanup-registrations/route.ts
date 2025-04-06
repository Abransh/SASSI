import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// This endpoint will be called by a cron job to clean up expired pending registrations
export async function GET(request: NextRequest) {
  try {
    // Only accept requests with the correct API key
    const apiKey = request.headers.get("x-api-key");
    if (apiKey !== process.env.CRON_API_KEY) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const now = new Date();
    
    // Find and update all expired pending registrations
    const result = await prisma.registration.updateMany({
      where: {
        status: "PENDING",
        expiresAt: {
          lt: now,
        },
      },
      data: {
        status: "CANCELLED",
      },
    });

    return NextResponse.json({
      success: true,
      message: `Cleaned up ${result.count} expired registrations`,
      count: result.count,
    });
  } catch (error) {
    console.error("Error cleaning up registrations:", error);
    return NextResponse.json(
      { error: "Failed to clean up registrations" },
      { status: 500 }
    );
  }
} 