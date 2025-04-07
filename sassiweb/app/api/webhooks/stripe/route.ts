import { NextRequest, NextResponse } from "next/server";
import { getStripeClient } from "@/lib/stripe";
import prisma from "@/lib/prisma";

// Process Stripe webhook events
export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get("stripe-signature") as string;

    if (!signature) {
      return NextResponse.json(
        { error: "Missing stripe-signature header" },
        { status: 400 }
      );
    }

    let event;
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET as string;

    // Get the Stripe client
    const stripe = getStripeClient();

    try {
      // Verify and construct the event
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        webhookSecret
      );
    } catch (err: any) {
      console.error(`⚠️ Webhook signature verification failed: ${err.message}`);
      return NextResponse.json(
        { error: `Webhook Error: ${err.message}` },
        { status: 400 }
      );
    }

    console.log(`✅ Successfully received ${event.type} event`);

    // Handle the event
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;
        
        console.log(`Processing checkout session: ${session.id}`);
        // Update the payment status in our database
        await handleCheckoutCompleted(session);
        break;
      }
      
      case "payment_intent.succeeded": {
        const paymentIntent = event.data.object;
        
        console.log(`Processing payment intent: ${paymentIntent.id}`);
        // Update the payment with the payment intent ID
        await handlePaymentIntentSucceeded(paymentIntent);
        break;
      }
      
      case "payment_intent.payment_failed": {
        const paymentIntent = event.data.object;
        
        console.log(`Processing failed payment: ${paymentIntent.id}`);
        // Mark the payment as failed
        await handlePaymentFailed(paymentIntent);
        break;
      }
      
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    console.error("Error handling webhook:", error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }
}

// Handle checkout.session.completed event
async function handleCheckoutCompleted(session: any) {
  // Find the payment in our database
  try {
    const payment = await prisma.stripePayment.findUnique({
      where: { stripeSessionId: session.id }
    });

    if (!payment) {
      console.error(`Payment not found for session ${session.id}`);
      return;
    }

    console.log(`Updating payment ${payment.id} to PAID`);
    
    // Update the payment status
    await prisma.stripePayment.update({
      where: { id: payment.id },
      data: { status: 'PAID' }
    });

    // Process based on payment type
    if (payment.paymentType === "EVENT_REGISTRATION") {
      console.log(`Confirming registration for payment ${payment.id}`);
      
      // Update registration status and clear expiresAt field
      await prisma.registration.updateMany({
        where: { paymentId: payment.id },
        data: {
          status: 'CONFIRMED', 
          paymentStatus: 'PAID', 
          expiresAt: null
        }
      });
    } else if (payment.paymentType === "TEAM_APPLICATION") {
      // Update user payment verification
      await prisma.user.update({
        where: {
          id: payment.userId,
        },
        data: {
          paymentVerified: true,
          membershipExpiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year from now
        },
      });
    }
  } catch (error) {
    console.error("Error processing checkout.session.completed:", error);
    throw error;
  }
}

// Handle payment_intent.succeeded event
async function handlePaymentIntentSucceeded(paymentIntent: any) {
  try {
    // Update payment with payment intent ID
    if (paymentIntent.metadata?.checkout_session_id) {
      await prisma.stripePayment.updateMany({
        where: { stripeSessionId: paymentIntent.metadata.checkout_session_id },
        data: { stripePaymentId: paymentIntent.id }
      });
    }
  } catch (error) {
    console.error("Error processing payment_intent.succeeded:", error);
    throw error;
  }
}

// Handle payment_intent.payment_failed event
async function handlePaymentFailed(paymentIntent: any) {
  try {
    // Mark payment as failed
    if (paymentIntent.metadata?.checkout_session_id) {
      const payment = await prisma.stripePayment.findFirst({
        where: { stripeSessionId: paymentIntent.metadata.checkout_session_id }
      });
      
      if (payment) {
        // Update payment status
        await prisma.stripePayment.update({
          where: { id: payment.id },
          data: { status: 'FAILED' }
        });
        
        // Also update any associated registrations
        await prisma.registration.updateMany({
          where: { paymentId: payment.id },
          data: { 
            status: 'CANCELLED',
            paymentStatus: 'FAILED',
            expiresAt: null
          }
        });
      }
    }
  } catch (error) {
    console.error("Error processing payment_intent.payment_failed:", error);
    throw error;
  }
} 