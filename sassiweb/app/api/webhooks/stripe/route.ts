import { NextRequest, NextResponse } from "next/server";
import { getStripeClient } from "@/lib/stripe";
import prisma from "@/lib/prisma";
import { sendEventRegistrationEmail } from "@/lib/email";
import { PaymentStatus, RegistrationStatus, Prisma } from "@prisma/client";

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
    let event;
    try {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET as string
      );
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      console.error(`Webhook signature verification failed: ${errorMessage}`);
      return NextResponse.json({ error: `Webhook error: ${errorMessage}` }, { status: 400 });
    }

    console.log(`Received stripe webhook event: ${event.type}`);

    // Handle the event
    try {
      switch (event.type) {
        // Checkout Session Events
        case "checkout.session.completed": {
          await handleCheckoutCompleted(event.data.object);
          break;
        }
        
        case "checkout.session.expired": {
          await handleCheckoutExpired(event.data.object);
          break;
        }

        case "checkout.session.async_payment_succeeded": {
          await handleCheckoutCompleted(event.data.object);
          break;
        }

        case "checkout.session.async_payment_failed": {
          await handleCheckoutFailed(event.data.object);
          break;
        }
        
        // Payment Intent Events
        case "payment_intent.succeeded": {
          await handlePaymentIntentSucceeded(event.data.object);
          break;
        }
        
        case "payment_intent.payment_failed": {
          await handlePaymentFailed(event.data.object);
          break;
        }

        case "payment_intent.canceled": {
          await handlePaymentCanceled(event.data.object);
          break;
        }

        default:
          console.log(`Unhandled event type ${event.type}`);
      }
    } catch (error) {
      console.error(`Error handling webhook event ${event.type}:`, error);
      // Continue processing to acknowledge receipt to Stripe
    }

    return NextResponse.json({ received: true });
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
  console.log(`Processing completed checkout session: ${session.id}`);
  
  try {
    // Find the payment record using stripeSessionId
    const payment = await prisma.stripePayment.findUnique({
      where: { stripeSessionId: session.id },
      include: {
        user: true,
        event: true,
        registrations: true
      }
    });

    if (!payment) {
      console.error(`Payment not found for session ${session.id}`);
      return;
    }

    console.log(`Found payment record: ${payment.id}, type: ${payment.paymentType}`);

    // Update the payment status to PAID
    await prisma.stripePayment.update({
      where: { id: payment.id },
      data: { 
        status: "PAID" as Prisma.EnumPaymentStatusFieldUpdateOperationsInput["set"],
        stripePaymentId: session.payment_intent || null,
      }
    });

    // Process based on payment type
    if (payment.paymentType === "EVENT_REGISTRATION" && payment.eventId) {
      // Find and update associated registration
      const registration = payment.registrations[0] || await prisma.registration.findFirst({
        where: { 
          paymentId: payment.id,
          userId: payment.userId,
          eventId: payment.eventId
        },
        include: {
          user: true,
          event: true
        }
      });

      if (registration) {
        console.log(`Updating registration ${registration.id} to CONFIRMED`);
        
        // Update registration status
        const updatedRegistration = await prisma.registration.update({
          where: { id: registration.id },
          data: {
            status: "CONFIRMED" as Prisma.EnumRegistrationStatusFieldUpdateOperationsInput["set"],
            paymentStatus: "PAID" as Prisma.EnumPaymentStatusFieldUpdateOperationsInput["set"],
            expiresAt: null
          },
          include: {
            user: {
              select: {
                email: true,
                name: true
              }
            },
            event: {
              select: {
                title: true,
                startDate: true
              }
            }
          }
        });

        // Send confirmation email if we have user and event data
        if (updatedRegistration.user?.email && updatedRegistration.event) {
          try {
            await sendEventRegistrationEmail(
              updatedRegistration.user.email,
              updatedRegistration.user.name || "",
              updatedRegistration.event.title,
              updatedRegistration.event.startDate,
            );
          } catch (emailError) {
            console.error("Error sending registration email:", emailError);
            // Continue even if email fails
          }
        }
      } else {
        console.error(`No registration found for payment ${payment.id}`);
      }
    } else if (payment.paymentType === "TEAM_APPLICATION") {
      // Update user payment verification for team applications
      await prisma.user.update({
        where: { id: payment.userId },
        data: {
          paymentVerified: true,
          membershipExpiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year from now
        }
      });
    }
  } catch (error) {
    console.error("Error processing checkout.session.completed:", error);
    throw error; // Rethrow to be caught by main handler
  }
}

// Handle checkout.session.expired event
async function handleCheckoutExpired(session: any) {
  console.log(`Processing expired checkout session: ${session.id}`);
  
  try {
    // Find the payment record using stripeSessionId
    const payment = await prisma.stripePayment.findUnique({
      where: { stripeSessionId: session.id },
      include: {
        registrations: true
      }
    });

    if (!payment) {
      console.error(`Payment not found for expired session ${session.id}`);
      return;
    }

    console.log(`Found payment for expired session: ${payment.id}`);

    // Update the payment status to EXPIRED
    await prisma.stripePayment.update({
      where: { id: payment.id },
      data: { 
        status: "EXPIRED" as Prisma.EnumPaymentStatusFieldUpdateOperationsInput["set"]
      }
    });

    // If this was an event registration, update the registration status
    if (payment.paymentType === "EVENT_REGISTRATION") {
      const registration = payment.registrations[0] || await prisma.registration.findFirst({
        where: { paymentId: payment.id }
      });

      if (registration) {
        console.log(`Cancelling registration ${registration.id} due to payment expiration`);
        
        // Update registration status to cancelled
        await prisma.registration.update({
          where: { id: registration.id },
          data: {
            status: "CANCELLED" as Prisma.EnumRegistrationStatusFieldUpdateOperationsInput["set"],
            paymentStatus: "EXPIRED" as Prisma.EnumPaymentStatusFieldUpdateOperationsInput["set"],
            expiresAt: null
          }
        });
      }
    }
  } catch (error) {
    console.error("Error processing checkout.session.expired:", error);
    throw error;
  }
}

// Handle checkout.session.async_payment_failed
async function handleCheckoutFailed(session: any) {
  console.log(`Processing failed checkout session: ${session.id}`);
  
  try {
    // Find the payment record
    const payment = await prisma.stripePayment.findUnique({
      where: { stripeSessionId: session.id },
      include: {
        registrations: true
      }
    });

    if (!payment) {
      console.error(`Payment not found for failed session ${session.id}`);
      return;
    }

    // Update payment status to FAILED
    await prisma.stripePayment.update({
      where: { id: payment.id },
      data: { status: "FAILED" }
    });

    // Handle registration if it exists
    if (payment.paymentType === "EVENT_REGISTRATION") {
      const registration = payment.registrations[0] || await prisma.registration.findFirst({
        where: { paymentId: payment.id }
      });

      if (registration) {
        await prisma.registration.update({
          where: { id: registration.id },
          data: {
            status: "CANCELLED",
            paymentStatus: "FAILED",
            expiresAt: null
          }
        });
      }
    }
  } catch (error) {
    console.error("Error processing checkout.session.async_payment_failed:", error);
    throw error;
  }
}

// Handle payment_intent.succeeded
async function handlePaymentIntentSucceeded(paymentIntent: any) {
  console.log(`Processing succeeded payment intent: ${paymentIntent.id}`);
  
  try {
    // If we have a session ID in metadata, update our payment record
    if (paymentIntent.metadata?.checkout_session_id) {
      const payment = await prisma.stripePayment.findFirst({
        where: { stripeSessionId: paymentIntent.metadata.checkout_session_id }
      });

      if (payment) {
        await prisma.stripePayment.update({
          where: { id: payment.id },
          data: { 
            stripePaymentId: paymentIntent.id,
            status: "PAID" as Prisma.EnumPaymentStatusFieldUpdateOperationsInput["set"]
          }
        });
      }
    }
  } catch (error) {
    console.error("Error processing payment_intent.succeeded:", error);
    throw error;
  }
}

// Handle payment_intent.payment_failed
async function handlePaymentFailed(paymentIntent: any) {
  console.log(`Processing failed payment intent: ${paymentIntent.id}`);
  
  try {
    if (paymentIntent.metadata?.checkout_session_id) {
      const payment = await prisma.stripePayment.findFirst({
        where: { stripeSessionId: paymentIntent.metadata.checkout_session_id },
        include: {
          registrations: true
        }
      });

      if (payment) {
        // Update payment status
        await prisma.stripePayment.update({
          where: { id: payment.id },
          data: { 
            stripePaymentId: paymentIntent.id,
            status: "FAILED" as Prisma.EnumPaymentStatusFieldUpdateOperationsInput["set"]
          }
        });

        // Update any associated registrations
        if (payment.registrations.length > 0) {
          await prisma.registration.updateMany({
            where: { paymentId: payment.id },
            data: {
              status: "CANCELLED" as Prisma.EnumRegistrationStatusFieldUpdateOperationsInput["set"],
              paymentStatus: "FAILED" as Prisma.EnumPaymentStatusFieldUpdateOperationsInput["set"],
              expiresAt: null
            }
          });
        }
      }
    }
  } catch (error) {
    console.error("Error processing payment_intent.payment_failed:", error);
    throw error;
  }
}

// Handle payment_intent.canceled
async function handlePaymentCanceled(paymentIntent: any) {
  console.log(`Processing canceled payment intent: ${paymentIntent.id}`);
  
  try {
    if (paymentIntent.metadata?.checkout_session_id) {
      const payment = await prisma.stripePayment.findFirst({
        where: { stripeSessionId: paymentIntent.metadata.checkout_session_id },
        include: {
          registrations: true
        }
      });

      if (payment) {
        // Update payment status
        await prisma.stripePayment.update({
          where: { id: payment.id },
          data: { 
            stripePaymentId: paymentIntent.id,
            status: "CANCELLED" as Prisma.EnumPaymentStatusFieldUpdateOperationsInput["set"]
          }
        });

        // Update any associated registrations
        if (payment.registrations.length > 0) {
          await prisma.registration.updateMany({
            where: { paymentId: payment.id },
            data: {
              status: "CANCELLED" as Prisma.EnumRegistrationStatusFieldUpdateOperationsInput["set"],
              paymentStatus: "CANCELLED" as Prisma.EnumPaymentStatusFieldUpdateOperationsInput["set"],
              expiresAt: null
            }
          });
        }
      }
    }
  } catch (error) {
    console.error("Error processing payment_intent.canceled:", error);
    throw error;
  }
}