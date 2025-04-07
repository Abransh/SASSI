import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { db } from "@/lib/db";
import { validateRequest } from "@/lib/auth";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Authenticate the user
    const { user } = await validateRequest();
    
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const eventId = params.id;
    if (!eventId) {
      return NextResponse.json(
        { error: "Event ID is required" },
        { status: 400 }
      );
    }

    // Find the event
    const event = await db.event.findUnique({
      where: { id: eventId },
    });

    if (!event) {
      return NextResponse.json(
        { error: "Event not found" },
        { status: 404 }
      );
    }

    // Get the request data
    const data = await req.json();
    const { successUrl, cancelUrl } = data;

    // Check if user is already registered
    const existingRegistration = await db.registration.findUnique({
      where: {
        eventId_userId: {
          eventId: event.id,
          userId: user.id,
        },
      },
    });

    if (existingRegistration) {
      if (existingRegistration.status === "CONFIRMED") {
        return NextResponse.json(
          { error: "You are already registered for this event" },
          { status: 400 }
        );
      }
    }

    // Call the event-service API to create a registration
    const eventServiceUrl = process.env.EVENT_SERVICE_URL || 'http://localhost:3001';
    const response = await fetch(`${eventServiceUrl}/api/registrations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.EVENT_SERVICE_API_KEY}`,
      },
      body: JSON.stringify({
        eventId: event.id,
        userId: user.id,
        successUrl: successUrl || `${process.env.NEXT_PUBLIC_SITE_URL}/events/${event.id}?registration=success`,
        cancelUrl: cancelUrl || `${process.env.NEXT_PUBLIC_SITE_URL}/events/${event.id}?registration=canceled`,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData.message || "Failed to register for event" },
        { status: response.status }
      );
    }

    const result = await response.json();

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error registering for event:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 