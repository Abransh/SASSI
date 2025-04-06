import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { sendEventRegistrationEmail } from "@/lib/email";
import { createEventCheckoutSession } from "@/lib/stripe";
import crypto from 'crypto';

// Define a complete event type based on the Prisma schema
interface CompleteEvent {
  id: string;
  title: string;
  description: string;
  content: string | null;
  location: string;
  startDate: Date;
  endDate: Date;
  imageUrl: string | null;
  maxAttendees: number | null;
  price: number | null;
  requiresPayment: boolean;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  published: boolean;
  _count: {
    registrations: number;
  };
}

// POST /api/events/[id]/register - Register for an event
export async function POST(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { error: "You must be logged in to register for events" },
        { status: 401 }
      );
    }
    
    // Check if event exists and isn't full
    const eventResult = await prisma.event.findUnique({
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
    
    if (!eventResult) {
      return NextResponse.json(
        { error: "Event not found" },
        { status: 404 }
      );
    }
    
    // Cast to our complete event type
    const event = eventResult as unknown as CompleteEvent;
    
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
        // If previously cancelled, update to pending (will be confirmed after payment if required)
        const registration = await prisma.registration.update({
          where: {
            id: existingRegistration.id
          },
          data: {
            status: event.requiresPayment ? "PENDING" : "CONFIRMED"
          }
        });
        
        // For free events, send a confirmation email and return the registration
        if (!event.requiresPayment) {
          await sendEventRegistrationEmail(
            session.user.email as string,
            session.user.name as string,
            event.title,
            event.startDate
          );
          
          return NextResponse.json(registration);
        }
        
        // For paid events, create a Stripe checkout session
        const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
        const successUrl = `${baseUrl}/dashboard?registration=success`;
        const cancelUrl = `${baseUrl}/events/${id}?registration=cancelled`;
        
        const stripeSession = await createEventCheckoutSession({
          eventId: event.id,
          userId: session.user.id,
          eventTitle: event.title,
          amount: event.price || 0,
          successUrl,
          cancelUrl
        });
        
        // Create a payment record using raw SQL
        const paymentId = crypto.randomUUID();
        await prisma.$executeRaw`
          INSERT INTO "StripePayment" (
            id, "stripeSessionId", amount, currency, status,
            "paymentType", "userId", "eventId", "createdAt", "updatedAt"
          )
          VALUES (
            ${paymentId}, ${stripeSession.id}, ${event.price || 0}, 'eur', 'PENDING',
            'EVENT_REGISTRATION', ${session.user.id}, ${event.id}, now(), now()
          )
        `;
        
        // Update the registration with the payment ID using Prisma
        await prisma.registration.update({
          where: {
            id: registration.id
          },
          data: {
            paymentStatus: "PENDING",
            payment: {
              connect: {
                id: paymentId
              }
            }
          }
        });
        
        // Return Stripe checkout URL
        return NextResponse.json({
          registration,
          requiresPayment: true,
          checkoutUrl: stripeSession.url
        }, { status: 201 });
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
        status: event.requiresPayment ? "PENDING" : "CONFIRMED"
      }
    });
    
    // For free events, send a confirmation email and return the registration
    if (!event.requiresPayment) {
      await sendEventRegistrationEmail(
        session.user.email as string,
        session.user.name as string,
        event.title,
        event.startDate
      );
      
      return NextResponse.json(registration, { status: 201 });
    }
    
    // For paid events, create a Stripe checkout session
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const successUrl = `${baseUrl}/dashboard?registration=success`;
    const cancelUrl = `${baseUrl}/events/${id}?registration=cancelled`;
    
    const stripeSession = await createEventCheckoutSession({
      eventId: event.id,
      userId: session.user.id,
      eventTitle: event.title,
      amount: event.price || 0,
      successUrl,
      cancelUrl
    });
    
    // Create a payment record using raw SQL
    const paymentId = crypto.randomUUID();
    await prisma.$executeRaw`
      INSERT INTO "StripePayment" (
        id, "stripeSessionId", amount, currency, status,
        "paymentType", "userId", "eventId", "createdAt", "updatedAt"
      )
      VALUES (
        ${paymentId}, ${stripeSession.id}, ${event.price || 0}, 'eur', 'PENDING',
        'EVENT_REGISTRATION', ${session.user.id}, ${event.id}, now(), now()
      )
    `;
    
    // Update the registration with the payment ID using Prisma
    await prisma.registration.update({
      where: {
        id: registration.id
      },
      data: {
        paymentStatus: "PENDING",
        payment: {
          connect: {
            id: paymentId
          }
        }
      }
    });
    
    // Return Stripe checkout URL
    return NextResponse.json({
      registration,
      requiresPayment: true,
      checkoutUrl: stripeSession.url
    }, { status: 201 });
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
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
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