import { NextRequest, NextResponse } from "next/server";
import { getStripeClient } from "@/lib/stripe";
import prisma from "@/lib/prisma";
import { sendEventRegistrationEmail } from "@/lib/email";
import { PaymentStatus, RegistrationStatus, Prisma, PaymentType } from "@prisma/client";
import { headers } from 'next/headers';
import { stripe } from '@/lib/stripe';
import Stripe from 'stripe';

// Helper function to generate membership code
function generateMembershipCode(): string {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';
  
  // Generate 2 random letters
  const randomLetters = Array.from({ length: 2 }, () => 
    letters.charAt(Math.floor(Math.random() * letters.length))
  ).join('');
  
  // Generate 4 random numbers
  const randomNumbers = Array.from({ length: 4 }, () => 
    numbers.charAt(Math.floor(Math.random() * numbers.length))
  ).join('');
  
  return randomLetters + randomNumbers;
}

if (!process.env.STRIPE_WEBHOOK_SECRET) {
  throw new Error('STRIPE_WEBHOOK_SECRET is not defined');
}

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const headersList = await headers();
    const signature = headersList.get('stripe-signature');

    if (!signature) {
      return new NextResponse('No signature found', { status: 400 });
    }

    // Verify webhook signature
    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET!
      );
    } catch (err) {
      const error = err as Error;
      console.error('Webhook signature verification failed:', error);
      return new NextResponse(`Webhook signature verification failed: ${error.message}`, { status: 400 });
    }

    // Handle different event types
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const metadata = session.metadata;

        if (!metadata?.type || !metadata.userId) {
          return new NextResponse('Invalid metadata', { status: 400 });
        }

        // First create the payment record
        const payment = await prisma.stripePayment.create({
          data: {
            stripeSessionId: session.id,
            stripePaymentId: session.payment_intent?.toString() || '',
            amount: session.amount_total ? session.amount_total / 100 : 0,
            currency: session.currency || 'eur',
            status: 'PAID',
            paymentType: metadata.type === 'event_registration' 
              ? PaymentType.EVENT_REGISTRATION 
              : PaymentType.TEAM_APPLICATION,
            userId: metadata.userId,
            eventId: metadata.eventId || null,
          },
        });

        switch (metadata.type) {
          case 'event_registration': {
            if (!metadata.eventId) {
              return new NextResponse('Missing eventId for event registration', { status: 400 });
            }

            // Handle event registration payment
            await prisma.registration.update({
              where: {
                eventId_userId: {
                  eventId: metadata.eventId,
                  userId: metadata.userId,
                },
              },
              data: {
                status: 'CONFIRMED',
                paymentId: payment.id,
                paymentStatus: 'PAID',
              },
            });
            break;
          }
          case 'team_application': {
            // Find the team application first
            const teamApplication = await prisma.teamApplication.findFirst({
              where: {
                userId: metadata.userId,
                status: 'PENDING',
              },
            });

            if (!teamApplication) {
              return new NextResponse('No pending team application found', { status: 400 });
            }

            // Handle team application payment
            await prisma.teamApplication.update({
              where: {
                id: teamApplication.id,
              },
              data: {
                status: 'APPROVED',
                paymentId: payment.id,
              },
            });
            break;
          }
          default:
            return new NextResponse(`Unknown payment type: ${metadata.type}`, { status: 400 });
        }

        return new NextResponse('Payment processed successfully', { status: 200 });
      }
      default:
        return new NextResponse(`Unhandled event type: ${event.type}`, { status: 400 });
    }
  } catch (err) {
    const error = err as Error;
    console.error('Error processing webhook:', error);
    return new NextResponse('Webhook error: ' + error.message, { status: 400 });
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