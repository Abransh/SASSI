// This route handles event registration
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { sendEventRegistrationEmail, generateVerificationCode } from "@/lib/email";
import { createEventCheckoutSession } from "@/lib/stripe";
import crypto from "crypto";
import Stripe from "stripe";
import { Prisma } from "@prisma/client";

// POST handler for event registration
export async function POST(req: any, { params }: any) {
  try {
    // Await params before accessing its properties
    const resolvedParams = await params;
    const eventId: string = resolvedParams.id;
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return Response.json(
        { error: "You must be logged in to register for an event" },
        { status: 401 }
      );
    }

    // Check if user has phone number
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { phoneNumber: true, name: true, email: true }
    });

    if (!user?.phoneNumber) {
      return Response.json(
        { error: "Phone number required", requiresPhoneNumber: true },
        { status: 400 }
      );
    }
    
    // Check if the event exists and has capacity
    const event = await prisma.event.findUnique({
      where: { id: eventId },
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
      return Response.json(
        { error: "Event not found" },
        { status: 404 }
      );
    }

    // Check if event is at capacity
    if (
      event.maxAttendees &&
      event._count.registrations >= event.maxAttendees
    ) {
      return Response.json(
        { error: "This event is at full capacity" },
        { status: 400 },
      );
    }

    // Convert request to NextRequest to use the json method correctly
    const request = req as NextRequest;
    // Get request data (success and cancel URLs)
    const { successUrl, cancelUrl } = await request.json();

    // Check if user is already registered
    const existingRegistration = await prisma.registration.findUnique({
      where: {
        eventId_userId: {
          eventId: eventId,
          userId: session.user.id,
        },
      },
    });

    // Handle existing registrations
    if (existingRegistration) {
      // If already confirmed, return error
      if (existingRegistration.status === "CONFIRMED") {
        return Response.json(
          { error: "You are already registered for this event" },
          { status: 400 }
        );
      }
      
      // If pending, check if it's expired
      if (existingRegistration.status === "PENDING") {
        const now = new Date();
        
        // If not expired, return error directing to complete payment
        if (!existingRegistration.expiresAt || existingRegistration.expiresAt > now) {
          return Response.json(
            { error: "You have a pending registration. Please complete your payment." },
            { status: 400 }
          );
        }
        
        // If expired, we'll clean it up and allow re-registration
        await prisma.registration.update({
          where: { id: existingRegistration.id },
          data: { 
            status: "CANCELLED",
            expiresAt: null,
            paymentStatus: "EXPIRED"
          }
        });
      }
      
      // For cancelled registrations, we'll allow re-registration
    }

    // Check if the event requires payment
    const requiresPayment = event.requiresPayment && (event.price || 0) > 0;
    
    // For non-paid events, create registration immediately
    if (!requiresPayment) {
      // Generate verification code
      const verificationCode = generateVerificationCode();

      // Create new registration or update existing cancelled one
      const registration = existingRegistration 
        ? await prisma.registration.update({
            where: { id: existingRegistration.id },
            data: {
              status: "CONFIRMED",
              paymentStatus: "PAID",
              expiresAt: null,
              verificationCode: verificationCode,
            }
          })
        : await prisma.registration.create({
            data: {
              eventId: eventId,
              userId: session.user.id,
              status: "CONFIRMED",
              paymentStatus: "PAID",
              verificationCode: verificationCode,
            }
          });

      // Send confirmation email with verification code
      try {
        await sendEventRegistrationEmail(
          user.email || session.user.email || "",
          user.name || session.user.name || "",
          event.title,
          event.startDate,
          verificationCode
        );
      } catch (emailError) {
        console.error("Error sending registration email:", emailError);
        // Continue even if email fails
      }

      return Response.json({
        success: true,
        requiresPayment: false,
        registration: {
          id: registration.id,
          status: registration.status
        }
      }, { status: 201 });
    }

    // For paid events, create a Stripe checkout session
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
      apiVersion: "2025-04-30.basil",
    });

    // Set expiresAt to 5 minutes from now for pending registrations
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes from now

    // First create a stripe payment record
    const stripePayment = await prisma.stripePayment.create({
      data: {
        stripeSessionId: crypto.randomUUID(), // Temporary ID, will update after creating checkout
        amount: event.price || 0,
        status: "PENDING",
        paymentType: "EVENT_REGISTRATION",
        userId: session.user.id,
        eventId: event.id,
      },
    });

    // Create a checkout session
    const checkoutSession = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: event.title,
              description: event.description,
            },
            unit_amount: Math.round((event.price || 0) * 100), // Convert to cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: successUrl,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/events/${event.id}?payment_status=cancelled`,
      metadata: {
        eventId: event.id,
        userId: session.user.id,
        paymentId: stripePayment.id,
      },
    });

    // Update the stripe payment with the actual session ID
    await prisma.stripePayment.update({
      where: { id: stripePayment.id },
      data: { stripeSessionId: checkoutSession.id },
    });

    // Generate verification code for paid events too
    const verificationCode = generateVerificationCode();

    // Create or update the registration
    const registration = existingRegistration
      ? await prisma.registration.update({
          where: { id: existingRegistration.id },
          data: {
            status: "PENDING",
            paymentStatus: "PENDING",
            expiresAt,
            paymentId: stripePayment.id,
            verificationCode: verificationCode,
          },
        })
      : await prisma.registration.create({
          data: {
            eventId: eventId,
            userId: session.user.id,
            status: "PENDING",
            paymentStatus: "PENDING",
            expiresAt,
            paymentId: stripePayment.id,
            verificationCode: verificationCode,
          },
        });

    return Response.json({
      success: true,
      requiresPayment: true,
      checkoutUrl: checkoutSession.url,
      registration: {
        id: registration.id,
        status: registration.status,
      },
    });
  } catch (error) {
    console.error("Error registering for event:", error);
    return Response.json(
      { error: "Failed to register for event" },
      { status: 500 },
    );
  }
}

// DELETE handler for cancelling registration
export async function DELETE(req: any, { params }: any) {
  try {
    // Await params before accessing its properties
    const resolvedParams = await params;
    const eventId: string = resolvedParams.id;
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return Response.json(
        { error: "You must be logged in to cancel a registration" },
        { status: 401 }
      );
    }

    const registration = await prisma.registration.findUnique({
      where: {
        eventId_userId: {
          eventId: eventId,
          userId: session.user.id,
        },
      },
      include: {
        payment: true
      }
    });

    if (!registration) {
      return Response.json(
        { error: "You are not registered for this event" },
        { status: 404 },
      );
    }

    // Update registration status to cancelled
    await prisma.registration.update({
      where: { id: registration.id },
      data: {
        status: "CANCELLED",
        expiresAt: null
      },
    });

    // If there's an associated payment, mark it as cancelled too
    if (registration.payment) {
      await prisma.stripePayment.update({
        where: { id: registration.payment.id },
        data: { 
          status: "CANCELLED"
        }
      });
    }

    return Response.json({
      success: true,
      message: "Registration cancelled successfully"
    });
  } catch (error) {
    console.error("Error cancelling registration:", error);
    return Response.json(
      { error: "Failed to cancel registration" },
      { status: 500 },
    );
  }
}