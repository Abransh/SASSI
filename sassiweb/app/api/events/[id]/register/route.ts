import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { sendEventRegistrationEmail } from "@/lib/email";
import { createEventCheckoutSession } from "@/lib/stripe";
import crypto from "crypto";
import Stripe from "stripe";
import { Registration } from "@prisma/client";

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
    
    if (!session || !session.user) {
      return NextResponse.json(
        { error: "You must be logged in to register for an event" },
        { status: 401 }
      );
    }
    
    // Check if the event exists and has capacity
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

    // Cast to our complete event type
    const completeEvent = event as unknown as CompleteEvent;

    if (
      completeEvent.maxAttendees &&
      completeEvent._count.registrations >= completeEvent.maxAttendees
    ) {
      return NextResponse.json(
        { error: "This event is at full capacity" },
        { status: 400 },
      );
    }

    // Check if user is already registered
    const existingRegistration = (await prisma.registration.findUnique({
      where: {
        eventId_userId: {
          eventId: id,
          userId: session.user.id,
        },
      },
    })) as Registration | null;

    if (existingRegistration) {
      // If previously cancelled, allow re-registration
      if (existingRegistration.status === "CANCELLED") {
        // If previously cancelled, update to pending (will be confirmed after payment if required)
        const registration = await prisma.registration.update({
          where: {
            id: existingRegistration.id,
          },
          data: {
            status: completeEvent.requiresPayment ? "PENDING" : "CONFIRMED",
          },
        });

        // For free events, send a confirmation email and return the registration
        if (!completeEvent.requiresPayment) {
          await sendEventRegistrationEmail(
            session.user.email as string,
            session.user.name as string,
            completeEvent.title,
            completeEvent.startDate,
          );

          return NextResponse.json(registration);
        }

        // For paid events, create a Stripe checkout session
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

        // Define base URL with proper protocol
        let baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
        
        // Ensure baseUrl starts with http:// or https://
        if (!baseUrl.startsWith('http://') && !baseUrl.startsWith('https://')) {
          baseUrl = `https://${baseUrl}`;
        }

        // Set expiresAt to 30 minutes from now for pending registrations
        const expiresAt = new Date(Date.now() + 30 * 60 * 1000); // 30 minutes from now

        // First create a stripe payment record
        const stripePayment = await prisma.stripePayment.create({
          data: {
            stripeSessionId: "", // Will update this after creating the checkout session
            amount: completeEvent.price || 0,
            status: "PENDING",
            paymentType: "EVENT_REGISTRATION",
            userId: session.user.id,
            eventId: completeEvent.id,
          },
        });

        // Then create a checkout session
        const checkoutSession = await stripe.checkout.sessions.create({
          payment_method_types: ["card"],
          line_items: [
            {
              price_data: {
                currency: "eur",
                product_data: {
                  name: completeEvent.title,
                  description: completeEvent.description,
                },
                unit_amount: Math.round((completeEvent.price || 0) * 100),
              },
              quantity: 1,
            },
          ],
          metadata: {
            eventId: completeEvent.id,
            userId: session.user.id,
          },
          client_reference_id: stripePayment.id,
          mode: "payment",
          success_url: `${baseUrl}/events/${completeEvent.id}?payment_status=success`,
          cancel_url: `${baseUrl}/events/${completeEvent.id}?payment_status=canceled`,
        });

        // Update the stripe payment record with the session ID
        await prisma.stripePayment.update({
          where: { id: stripePayment.id },
          data: { stripeSessionId: checkoutSession.id }
        });

        // Create a new registration or update an existing cancelled one
        if (existingRegistration) {
          // Update existing cancelled registration
          await prisma.registration.update({
            where: {
              id: (existingRegistration as Registration).id,
            },
            data: {
              status: "PENDING",
              paymentStatus: "PENDING",
              paymentId: stripePayment.id,
              expiresAt: expiresAt,
            },
          });
        } else {
          // Create a new registration
          await prisma.registration.create({
            data: {
              eventId: completeEvent.id,
              userId: session.user.id,
              status: "PENDING",
              paymentStatus: "PENDING",
              paymentId: stripePayment.id,
              expiresAt: expiresAt,
            },
          });
        }

        return NextResponse.json({ url: checkoutSession.url });
      } 
      // If PENDING and not expired, treat as already registered
      else if (existingRegistration.status === "PENDING") {
        // Check if the registration has expired
        const now = new Date();
        if (existingRegistration.expiresAt && existingRegistration.expiresAt < now) {
          // If expired, update it to cancelled first, then create a new registration
          await prisma.registration.update({
            where: {
              id: existingRegistration.id,
            },
            data: {
              status: "CANCELLED",
            },
          });
          
          // Continue with the registration flow (next section handles the actual registration)
        } else {
          // Not expired, so they're still considered registered
          return NextResponse.json(
            { error: "You are already registered for this event" },
            { status: 400 },
          );
        }
      }
      // If CONFIRMED, user is already registered
      else {
        return NextResponse.json(
          { error: "You are already registered for this event" },
          { status: 400 },
        );
      }
    }

    // For non-paid events, create registration immediately
    if (!completeEvent.requiresPayment) {
      // Create new registration
      const registration = await prisma.registration.create({
        data: {
          eventId: id,
          userId: session.user.id,
          status: "CONFIRMED",
          expiresAt: null,
        },
      });

      // Send confirmation email
      await sendEventRegistrationEmail(
        session.user.email as string,
        session.user.name as string,
        completeEvent.title,
        completeEvent.startDate,
      );

      return NextResponse.json(registration, { status: 201 });
    }

    // For paid events, create a Stripe checkout session
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

    // Define base URL with proper protocol
    let baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    
    // Ensure baseUrl starts with http:// or https://
    if (!baseUrl.startsWith('http://') && !baseUrl.startsWith('https://')) {
      baseUrl = `https://${baseUrl}`;
    }

    // Set expiresAt to 30 minutes from now for pending registrations
    const expiresAt = new Date(Date.now() + 30 * 60 * 1000); // 30 minutes from now

    // First create a stripe payment record
    const stripePayment = await prisma.stripePayment.create({
      data: {
        stripeSessionId: "", // Will update this after creating the checkout session
        amount: completeEvent.price || 0,
        status: "PENDING",
        paymentType: "EVENT_REGISTRATION",
        userId: session.user.id,
        eventId: completeEvent.id,
      },
    });

    // Then create a checkout session
    const checkoutSession = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: completeEvent.title,
              description: completeEvent.description,
            },
            unit_amount: Math.round((completeEvent.price || 0) * 100),
          },
          quantity: 1,
        },
      ],
      metadata: {
        eventId: completeEvent.id,
        userId: session.user.id,
      },
      client_reference_id: stripePayment.id,
      mode: "payment",
      success_url: `${baseUrl}/events/${completeEvent.id}?payment_status=success`,
      cancel_url: `${baseUrl}/events/${completeEvent.id}?payment_status=canceled`,
    });

    // Update the stripe payment record with the session ID
    await prisma.stripePayment.update({
      where: { id: stripePayment.id },
      data: { stripeSessionId: checkoutSession.id }
    });

    // Create a new registration or update an existing cancelled one
    if (existingRegistration) {
      // Update existing cancelled registration
      await prisma.registration.update({
        where: {
          id: (existingRegistration as Registration).id,
        },
        data: {
          status: "PENDING",
          paymentStatus: "PENDING",
          paymentId: stripePayment.id,
          expiresAt: expiresAt,
        },
      });
    } else {
      // Create a new registration
      await prisma.registration.create({
        data: {
          eventId: completeEvent.id,
          userId: session.user.id,
          status: "PENDING",
          paymentStatus: "PENDING",
          paymentId: stripePayment.id,
          expiresAt: expiresAt,
        },
      });
    }

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error) {
    console.error("Error registering for event:", error);
    return NextResponse.json(
      { error: "Failed to register for event" },
      { status: 500 },
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
    
    if (!session || !session.user) {
      return NextResponse.json(
        { error: "You must be logged in to cancel a registration" },
        { status: 401 }
      );
    }

    const registration = (await prisma.registration.findUnique({
      where: {
        eventId_userId: {
          eventId: id,
          userId: session.user.id,
        },
      },
    })) as Registration | null;

    if (!registration) {
      return NextResponse.json(
        { error: "You are not registered for this event" },
        { status: 404 },
      );
    }

    // Update registration status to cancelled
    await prisma.registration.update({
      where: {
        id: registration.id,
      },
      data: {
        status: "CANCELLED",
      },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("Error cancelling registration:", error);
    return NextResponse.json(
      { error: "Failed to cancel registration" },
      { status: 500 },
    );
  }
}
