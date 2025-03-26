import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import prisma from "@/lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

export async function GET(request: NextRequest) {
  try {
    // Check if user is authenticated
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }
    
    // Get the current date
    const now = new Date();
    
    // Find all the events the user has registered for
    const registrations = await prisma.registration.findMany({
      where: {
        userId: session.user.id,
        status: "CONFIRMED",
      },
      include: {
        event: {
          select: {
            id: true,
            title: true,
            description: true,
            location: true,
            startDate: true,
            endDate: true,
            imageUrl: true,
          },
        },
      },
      orderBy: {
        event: {
          startDate: "asc",
        },
      },
    });
    
    // Separate upcoming and past events
    const upcomingEvents = registrations
      .filter(reg => new Date(reg.event.startDate) > now)
      .map(reg => reg.event);
    
    const pastEvents = registrations
      .filter(reg => new Date(reg.event.startDate) <= now)
      .map(reg => reg.event);
    
    // Return the events data
    return NextResponse.json({
      events: upcomingEvents,
      pastEvents: pastEvents,
    });
  } catch (error) {
    console.error("Error fetching user events:", error);
    
    return NextResponse.json(
      { error: "Failed to fetch user events" },
      { status: 500 }
    );
  }
}