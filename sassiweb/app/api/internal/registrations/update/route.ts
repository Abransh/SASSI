import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    // Check API key
    const apiKey = req.headers.get("x-api-key");
    if (apiKey !== process.env.EVENT_SERVICE_API_KEY) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Get request data
    const data = await req.json();
    const { eventId, userId, status } = data;

    if (!eventId || !userId || !status) {
      return NextResponse.json(
        { error: "Event ID, user ID, and status are required" },
        { status: 400 }
      );
    }

    // Find the event
    const event = await prisma.event.findUnique({
      where: { id: eventId },
    });

    if (!event) {
      return NextResponse.json(
        { error: "Event not found" },
        { status: 404 }
      );
    }
    // Update registration
    const registration = await prisma.registration.upsert({
      where: {
        eventId_userId: {
          eventId: event.id,
          userId,
        },
      },
      update: {
        status,
      },
      create: {
        eventId: event.id,
        userId,
        status,
      },
    });

    return NextResponse.json({
      id: registration.id,
      status: registration.status,
      message: "Registration updated successfully",
    });
  } catch (error) {
    console.error("Error updating registration:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 