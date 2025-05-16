import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2025-04-30.basil",
});

export async function GET(req: any , { params }: any ) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json(
        { error: "You must be logged in to view payment details" },
        { status: 401 }
      );
    }

    // Get the payment record
    const payment = await prisma.stripePayment.findUnique({
      where: { id: params.id },
      include: {
        event: true,
        registrations: {
          where: {
            userId: session.user.id
          }
        }
      }
    });

    if (!payment) {
      return NextResponse.json(
        { error: "Payment not found" },
        { status: 404 }
      );
    }

    // Verify the payment belongs to the current user
    if (payment.userId !== session.user.id) {
      return NextResponse.json(
        { error: "You don't have permission to view this payment" },
        { status: 403 }
      );
    }

    // If payment is still pending, get the checkout session URL
    let checkoutUrl = null;
    if (payment.status === "PENDING" && payment.stripeSessionId) {
      try {
        const session = await stripe.checkout.sessions.retrieve(payment.stripeSessionId);
        checkoutUrl = session.url;
      } catch (error) {
        console.error("Error retrieving Stripe session:", error);
      }
    }

    return NextResponse.json({
      id: payment.id,
      status: payment.status,
      amount: payment.amount,
      currency: payment.currency,
      checkoutUrl,
      event: payment.event,
      registration: payment.registrations[0] || null
    });
  } catch (error) {
    console.error("Error getting payment details:", error);
    return NextResponse.json(
      { error: "Failed to get payment details" },
      { status: 500 }
    );
  }
} 