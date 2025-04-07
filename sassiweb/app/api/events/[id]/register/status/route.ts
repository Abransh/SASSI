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
    
    // Check if user has any registration for this event
    const registration = await prisma.registration.findUnique({
      where: {
        eventId_userId: {
          eventId: id,
          userId: session.user.id,
        },
      },
    });
    
    // If no registration exists, they're not registered
    if (!registration) {
      return NextResponse.json({ 
        isRegistered: false,
        status: null
      });
    }
    
    // Check for PENDING registrations that might have expired
    if (registration.status === "PENDING") {
      const now = new Date();
      
      // If the registration has no expiration set, add one (30 minutes from now)
      if (!registration.expiresAt) {
        const expiresAt = new Date(registration.createdAt);
        expiresAt.setMinutes(expiresAt.getMinutes() + 30);
        
        // Update the registration with the expiration
        await prisma.registration.update({
          where: { id: registration.id },
          data: { expiresAt }
        });
        
        // If this newly calculated expiration is in the past, it's expired
        if (expiresAt < now) {
          await prisma.registration.update({
            where: { id: registration.id },
            data: { 
              status: "CANCELLED",
              expiresAt: null
            }
          });
          return NextResponse.json({ 
            isRegistered: false,
            status: "CANCELLED"
          });
        }
      }
      // If the registration has expired, consider them not registered
      else if (registration.expiresAt < now) {
        // Automatically update to CANCELLED
        await prisma.registration.update({
          where: { id: registration.id },
          data: { 
            status: "CANCELLED",
            expiresAt: null
          }
        });
        return NextResponse.json({ 
          isRegistered: false,
          status: "CANCELLED"
        });
      }
    }
    
    // Consider them registered if status is CONFIRMED or unexpired PENDING
    const isRegistered = registration.status === "CONFIRMED" || registration.status === "PENDING";
    
    return NextResponse.json({ 
      isRegistered,
      status: registration.status
    });
  } catch (error) {
    console.error("Error checking registration status:", error);
    return NextResponse.json(
      { error: "Failed to check registration status" },
      { status: 500 }
    );
  }
} 