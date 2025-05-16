import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2025-04-30.basil",
});

export async function POST(req : any, { params } : any ) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const eventId = params.id;
    const searchParams = new URL(req.url).searchParams;
    const sessionId = searchParams.get("sessionId");

    if (!sessionId) {
      return NextResponse.json(
        { error: "Session ID is required" },
        { status: 400 }
      );
    }

    // Verify the Stripe session
    const stripeSession = await stripe.checkout.sessions.retrieve(sessionId);
    
    if (!stripeSession || stripeSession.status !== "complete") {
      return NextResponse.json(
        { error: "Invalid or incomplete payment session" },
        { status: 400 }
      );
    }

    // Get the event details
    const event = await prisma.event.findUnique({
      where: { id: eventId },
      select: {
        id: true,
        title: true,
        description: true,
        startDate: true,
        location: true,
        imageUrl: true,
      },
    });

    if (!event) {
      return NextResponse.json(
        { error: "Event not found" },
        { status: 404 }
      );
    }

    // Update the registration status
    await prisma.registration.updateMany({
      where: {
        eventId: eventId,
        userId: session.user.id,
        paymentId: stripeSession.metadata?.paymentId,
      },
      data: {
        status: "CONFIRMED",
        paymentStatus: "PAID",
      },
    });

    return NextResponse.json({ event });
  } catch (error) {
    console.error("Error verifying registration:", error);
    return NextResponse.json(
      { error: "Failed to verify registration" },
      { status: 500 }
    );
  }
} 