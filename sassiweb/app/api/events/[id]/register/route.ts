import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { sendEventRegistrationEmail } from "@/lib/email";

// POST /api/events/[id]/register - Register for an event
export async function POST(
  request: NextRequest,
  context: any  // Use 'any' to bypass TypeScript's type checking
  //{ params }: { params: { id: string } }
) {
  try {
    const id = context.params.id; // Access the ID via context.params.id
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { error: "You must be logged in to register for events" },
        { status: 401 }
      );
    }
    
    // Check if event exists and isn't full
    const event = await prisma.event.findUnique({
      where: {
        id: id
      },
      include: {
        _count: {
          select: {
            registrations: {
              where: {
                status: "CONFIRMED"
              }
            }
          }
        }
      }
    });
    
    if (!event) {
      return NextResponse.json(
        { error: "Event not found" },
        { status: 404 }
      );
    }
    
    if (event.maxAttendees && event._count.registrations >= event.maxAttendees) {
      return NextResponse.json(
        { error: "This event is at full capacity" },
        { status: 400 }
      );
    }
    
    // Check if user is already registered
    const existingRegistration = await prisma.registration.findUnique({
      where: {
        eventId_userId: {
          eventId: id,
          userId: session.user.id
        }
      }
    });
    
    if (existingRegistration) {
      if (existingRegistration.status === "CANCELLED") {
        // If previously cancelled, update to confirmed
        const registration = await prisma.registration.update({
          where: {
            id: existingRegistration.id
          },
          data: {
            status: "CONFIRMED"
          }
        });
        
        // Send confirmation email
        await sendEventRegistrationEmail(
          session.user.email as string,
          session.user.name as string,
          event.title,
          event.startDate
        );
        
        return NextResponse.json(registration);
      }
      
      return NextResponse.json(
        { error: "You are already registered for this event" },
        { status: 400 }
      );
    }
    
    // Create new registration
    const registration = await prisma.registration.create({
      data: {
        eventId: id,
        userId: session.user.id,
        status: "CONFIRMED"
      }
    });
    
    // Send confirmation email
    await sendEventRegistrationEmail(
      session.user.email as string,
      session.user.name as string,
      event.title,
      event.startDate
    );
    
    return NextResponse.json(registration, { status: 201 });
  } catch (error) {
    console.error("Error registering for event:", error);
    return NextResponse.json(
      { error: "Failed to register for event" },
      { status: 500 }
    );
  }
}

// DELETE /api/events/[id]/register - Cancel registration
export async function DELETE(
  request: NextRequest,
  context: any  // Use 'any' to bypass TypeScript's type checking
  //{ params }: { params: { id: string } }
) {
  try {
    const id = context.params.id; // Access the ID via context.params.id
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { error: "You must be logged in to cancel registration" },
        { status: 401 }
      );
    }
    
    const registration = await prisma.registration.findUnique({
      where: {
        eventId_userId: {
          eventId: id,
          userId: session.user.id
        }
      }
    });
    
    if (!registration) {
      return NextResponse.json(
        { error: "You are not registered for this event" },
        { status: 404 }
      );
    }
    
    // Update registration status to cancelled
    await prisma.registration.update({
      where: {
        id: registration.id
      },
      data: {
        status: "CANCELLED"
      }
    });
    
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("Error cancelling registration:", error);
    return NextResponse.json(
      { error: "Failed to cancel registration" },
      { status: 500 }
    );
  }
}