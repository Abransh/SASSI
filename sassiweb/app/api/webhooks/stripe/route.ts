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

    // Get the Stripe client
    const stripe = getStripeClient();

    // Verify and construct the event
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );

    // Handle the event
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;
        
        // Update the payment status in our database
        await handleCheckoutCompleted(session);
        break;
      }
      
      case "payment_intent.succeeded": {
        const paymentIntent = event.data.object;
        
        // Update the payment with the payment intent ID
        await handlePaymentIntentSucceeded(paymentIntent);
        break;
      }
      
      case "payment_intent.payment_failed": {
        const paymentIntent = event.data.object;
        
        // Mark the payment as failed
        await handlePaymentFailed(paymentIntent);
        break;
      }
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
  const payment = await prisma.$queryRaw`
    SELECT * FROM "StripePayment" WHERE "stripeSessionId" = ${session.id}
  `;

  const paymentRecord = Array.isArray(payment) && payment.length > 0 ? payment[0] : null;

  if (!paymentRecord) {
    console.error(`Payment not found for session ${session.id}`);
    return;
  }

  // Update the payment status
  await prisma.$executeRaw`
    UPDATE "StripePayment" SET status = 'PAID' WHERE id = ${paymentRecord.id}
  `;

  // Process based on payment type
  if (paymentRecord.paymentType === "EVENT_REGISTRATION") {
    // Update registration status and clear expiresAt field
    await prisma.$executeRaw`
      UPDATE "Registration" 
      SET "status" = 'CONFIRMED', "paymentStatus" = 'PAID', "expiresAt" = NULL
      WHERE "paymentId" = ${paymentRecord.id}
    `;
  } else if (paymentRecord.paymentType === "TEAM_APPLICATION") {
    // Update user payment verification
    await prisma.user.update({
      where: {
        id: paymentRecord.userId,
      },
      data: {
        paymentVerified: true,
        membershipExpiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year from now
      },
    });
  }
}

// Handle payment_intent.succeeded event
async function handlePaymentIntentSucceeded(paymentIntent: any) {
  // Update payment with payment intent ID
  if (paymentIntent.metadata?.checkout_session_id) {
    await prisma.$executeRaw`
      UPDATE "StripePayment" 
      SET "stripePaymentId" = ${paymentIntent.id}
      WHERE "stripeSessionId" = ${paymentIntent.metadata.checkout_session_id}
    `;
  }
}

// Handle payment_intent.payment_failed event
async function handlePaymentFailed(paymentIntent: any) {
  // Mark payment as failed
  if (paymentIntent.metadata?.checkout_session_id) {
    await prisma.$executeRaw`
      UPDATE "StripePayment" 
      SET "status" = 'FAILED'
      WHERE "stripeSessionId" = ${paymentIntent.metadata.checkout_session_id}
    `;
  }
} 