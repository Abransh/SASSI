import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { cleanupExpiredRegistrations } from "@/lib/events";

// GET /api/user/events - Fetch user registrations
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { error: "You must be logged in to view your events" },
        { status: 401 }
      );
    }
    
    // Clean up any expired registrations first
    await cleanupExpiredRegistrations();
    
    // Get the current date
    const now = new Date();
    
    // Fetch upcoming events for the user
    const registrations = await prisma.registration.findMany({
      where: {
        userId: session.user.id,
        event: {
          startDate: {
            gte: now
          }
        },
        OR: [
          { status: "CONFIRMED" },
          {
            status: "PENDING",
            expiresAt: {
              gt: now
            }
          }
        ]
      },
      include: {
        event: {
          select: {
            id: true,
            title: true,
            description: true,
            startDate: true,
            endDate: true,
            location: true,
            imageUrl: true,
            maxAttendees: true,
            requiresPayment: true,
            price: true,
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
        }
      },
      orderBy: {
        event: {
          startDate: 'asc'
        }
      }
    });
    
    // Fetch past events for the user
    const pastRegistrations = await prisma.registration.findMany({
      where: {
        userId: session.user.id,
        status: "CONFIRMED",
        event: {
          endDate: {
            lt: now
          }
        }
      },
      include: {
        event: {
          select: {
            id: true,
            title: true,
            description: true,
            startDate: true,
            endDate: true,
            location: true,
            imageUrl: true,
            maxAttendees: true,
            requiresPayment: true,
            price: true,
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
        }
      },
      orderBy: {
        event: {
          startDate: 'desc'
        }
      }
    });
    
    // Return upcoming and past events
    return NextResponse.json({
      upcoming: registrations,
      past: pastRegistrations
    });
  } catch (error) {
    console.error("Error fetching user events:", error);
    return NextResponse.json(
      { error: "Failed to fetch events" },
      { status: 500 }
    );
  }
}