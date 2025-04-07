import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Using a simpler parameter structure
export async function GET(request: any, context: any) {
  try {
    // Get the ID from the context
    const id = context.params.id;
    
    // Check API key
    const apiKey = request.headers.get("x-api-key");
    if (apiKey !== process.env.EVENT_SERVICE_API_KEY) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    if (!id) {
      return NextResponse.json(
        { error: "Event ID is required" },
        { status: 400 }
      );
    }

    // Find the event
    const event = await prisma.event.findUnique({
      where: { id },
    });

    if (!event) {
      return NextResponse.json(
        { error: "Event not found" },
        { status: 404 }
      );
    }

    // Return only the necessary data
    return NextResponse.json({
      id: event.id,
      title: event.title,
      description: event.description,
      price: event.price,
      maxAttendees: event.maxAttendees,
      startDate: event.startDate,
      endDate: event.endDate,
    });
  } catch (error) {
    console.error("Error fetching event:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}