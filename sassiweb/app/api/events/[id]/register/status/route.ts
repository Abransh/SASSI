import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

// GET /api/events/[id]/register/status - Check if user is registered for an event
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json(
        { isRegistered: false },
        { status: 200 }
      );
    }
    
    // Check if user has any registration for this event (regardless of status)
    const registration = await prisma.registration.findUnique({
      where: {
        eventId_userId: {
          eventId: id,
          userId: session.user.id,
        },
      },
    });
    
    // Check if there is a registration and if its status is CONFIRMED or PENDING
    const isRegistered = !!registration && 
      (registration.status === "CONFIRMED" || registration.status === "PENDING");
    
    return NextResponse.json({ 
      isRegistered,
      status: registration?.status || null
    });
  } catch (error) {
    console.error("Error checking registration status:", error);
    return NextResponse.json(
      { error: "Failed to check registration status" },
      { status: 500 }
    );
  }
} 