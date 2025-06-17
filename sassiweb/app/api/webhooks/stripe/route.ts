import { NextRequest, NextResponse } from "next/server";
import { getStripeClient } from "@/lib/stripe";
import prisma from "@/lib/prisma";
import { sendEventRegistrationEmail } from "@/lib/email";
import { Prisma } from "@prisma/client";
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
  let tx: any = null;
  
  try {
    console.log("Webhook received at:", new Date().toISOString());
    const body = await req.text();
    const headersList = headers();
    const signature = (await headersList).get('stripe-signature');
    
    console.log("Signature present:", !!signature);
    
    if (!signature) {
      console.error("No signature found in webhook request");
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
      console.log("Event verified:", event.type);
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

        console.log("Processing checkout.session.completed:", session.id);
        console.log("Metadata:", metadata);
        
        if (!metadata?.paymentId || !metadata.userId) {
          console.error("Missing required metadata in session:", session.id);
          return new NextResponse('Invalid metadata', { status: 400 });
        }

        try {
          // Use a transaction for better connection reliability
          await prisma.$transaction(async (txClient) => {
            tx = txClient; // Store for error reporting
            
            // Find the payment
            const payment = await txClient.stripePayment.findUnique({
              where: { id: metadata.paymentId },
            });

            if (!payment) {
              console.log(`No payment found for ID ${metadata.paymentId}`);
              return;
            }

            console.log(`Found payment: ${payment.id}, type: ${payment.paymentType}`);
            
            // Update payment record
            await txClient.stripePayment.update({
              where: { id: payment.id },
              data: {
                stripeSessionId: session.id,
                stripePaymentId: session.payment_intent?.toString() || '',
                amount: session.amount_total ? session.amount_total / 100 : 0,
                currency: session.currency || 'eur',
                status: 'PAID',
              },
            });

            // Handle event registration
            if (payment.paymentType === 'EVENT_REGISTRATION' && payment.eventId) {
              console.log(`Processing event registration for event: ${payment.eventId}`);
              
              // Get event and user details for email
              const [event, user] = await Promise.all([
                txClient.event.findUnique({
                  where: { id: payment.eventId },
                }),
                txClient.user.findUnique({
                  where: { id: payment.userId },
                }),
              ]);

              if (!event || !user) {
                console.error(`Event or user not found: event=${!!event}, user=${!!user}`);
                return;
              }

              // Update registration status
              await txClient.registration.updateMany({
                where: {
                  eventId: payment.eventId,
                  userId: payment.userId,
                  paymentId: payment.id,
                },
                data: {
                  status: 'CONFIRMED',
                  paymentStatus: 'PAID',
                  expiresAt: null,
                },
              });

              // Get the updated registration to get the verification code
              const registration = await txClient.registration.findFirst({
                where: {
                  eventId: payment.eventId,
                  userId: payment.userId,
                  paymentId: payment.id,
                },
              });

              // Send confirmation email with verification code
              try {
                await sendEventRegistrationEmail(
                  user.email,
                  user.name || "",
                  event.title,
                  event.startDate,
                  registration?.verificationCode || ""
                );
                console.log(`Confirmation email sent to ${user.email}`);
              } catch (emailError) {
                console.error("Error sending registration email:", emailError);
                // Continue even if email fails
              }
            }
            // Handle exclusive membership
            else if (payment.paymentType === 'EXCLUSIVE_MEMBERSHIP') {
              console.log(`Processing exclusive membership for user: ${payment.userId}`);
              
              // Generate a unique membership code
              let membershipCode;
              let isUnique = false;
              
              while (!isUnique) {
                membershipCode = generateMembershipCode();
                const existingCode = await txClient.exclusiveMembership.findUnique({
                  where: { code: membershipCode },
                });
                isUnique = !existingCode;
              }

              console.log(`Generated membership code: ${membershipCode}`);
              
              // Create exclusive membership record
              await txClient.exclusiveMembership.create({
                data: {
                  userId: payment.userId,
                  code: membershipCode!,
                  paymentId: payment.id,
                },
              });

              // Update user's payment verification status
              await txClient.user.update({
                where: { id: payment.userId },
                data: {
                  paymentVerified: true,
                  membershipExpiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year from now
                },
              });
            }
            // Handle team application
            else if (payment.paymentType === 'TEAM_APPLICATION') {
              console.log(`Processing team application payment for user: ${payment.userId}`);
              
              // Find the team application first
              const teamApplication = await txClient.teamApplication.findFirst({
                where: {
                  userId: payment.userId,
                  status: 'PENDING',
                },
              });

              if (!teamApplication) {
                console.error(`No pending team application found for user: ${payment.userId}`);
                return;
              }

              // Update team application status
              await txClient.teamApplication.update({
                where: {
                  id: teamApplication.id,
                },
                data: {
                  status: 'APPROVED',
                  paymentId: payment.id,
                },
              });
              
              // Update user verification status for team applications
              await txClient.user.update({
                where: { id: payment.userId },
                data: {
                  paymentVerified: true,
                  membershipExpiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year from now
                },
              });
            }
          }, {
            // Transaction options optimized for Neon + Serverless
            maxWait: 5000, // 5 seconds
            timeout: 10000  // 10 seconds
          });
          
          console.log("Payment processed successfully");
          return new NextResponse('Payment processed successfully', { status: 200 });
        } catch (txError) {
          console.error("Transaction error:", txError);
          return new NextResponse(`Transaction error: ${txError instanceof Error ? txError.message : String(txError)}`, { status: 500 });
        }
      }
      
      case 'checkout.session.expired': {
        console.log(`Processing expired checkout session: ${event.data.object.id}`);
        return await handleCheckoutExpired(event.data.object);
      }
      
      case 'checkout.session.async_payment_failed': {
        console.log(`Processing failed checkout: ${event.data.object.id}`);
        return await handleCheckoutFailed(event.data.object);
      }
      
      case 'payment_intent.succeeded': {
        console.log(`Processing successful payment intent: ${event.data.object.id}`);
        return await handlePaymentIntentSucceeded(event.data.object);
      }
      
      case 'payment_intent.payment_failed': {
        console.log(`Processing failed payment intent: ${event.data.object.id}`);
        return await handlePaymentFailed(event.data.object);
      }
      
      case 'payment_intent.canceled': {
        console.log(`Processing canceled payment intent: ${event.data.object.id}`);
        return await handlePaymentCanceled(event.data.object);
      }
      
      default:
        console.log(`Unhandled event type: ${event.type}`);
        return new NextResponse(`Unhandled event type: ${event.type}`, { status: 200 });
    }
  } catch (err) {
    const error = err as Error;
    const errorDetails = tx ? `at transaction step: ${tx._currentStep || 'unknown'}` : '';
    console.error(`Error processing webhook ${errorDetails}:`, error);
    console.error(error.stack);
    return new NextResponse('Webhook error: ' + error.message, { status: 500 });
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
      return new NextResponse('Payment not found', { status: 404 });
    }

    console.log(`Found payment for expired session: ${payment.id}`);

    // Update the payment status to EXPIRED
    await prisma.stripePayment.update({
      where: { id: payment.id },
      data: { 
        status: "EXPIRED"
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
            status: "CANCELLED",
            paymentStatus: "EXPIRED",
            expiresAt: null
          }
        });
      }
    }
    
    return new NextResponse('Expired payment processed', { status: 200 });
  } catch (error) {
    console.error("Error processing checkout.session.expired:", error);
    return new NextResponse(`Error: ${error instanceof Error ? error.message : String(error)}`, { status: 500 });
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
      return new NextResponse('Payment not found', { status: 404 });
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
    
    return new NextResponse('Failed payment processed', { status: 200 });
  } catch (error) {
    console.error("Error processing checkout.session.async_payment_failed:", error);
    return new NextResponse(`Error: ${error instanceof Error ? error.message : String(error)}`, { status: 500 });
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
            status: "PAID"
          }
        });
      }
    }
    
    return new NextResponse('Payment intent succeeded processed', { status: 200 });
  } catch (error) {
    console.error("Error processing payment_intent.succeeded:", error);
    return new NextResponse(`Error: ${error instanceof Error ? error.message : String(error)}`, { status: 500 });
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
            status: "FAILED"
          }
        });

        // Update any associated registrations
        if (payment.registrations.length > 0) {
          await prisma.registration.updateMany({
            where: { paymentId: payment.id },
            data: {
              status: "CANCELLED",
              paymentStatus: "FAILED",
              expiresAt: null
            }
          });
        }
      }
    }
    
    return new NextResponse('Payment intent failed processed', { status: 200 });
  } catch (error) {
    console.error("Error processing payment_intent.payment_failed:", error);
    return new NextResponse(`Error: ${error instanceof Error ? error.message : String(error)}`, { status: 500 });
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
            status: "CANCELLED"
          }
        });

        // Update any associated registrations
        if (payment.registrations.length > 0) {
          await prisma.registration.updateMany({
            where: { paymentId: payment.id },
            data: {
              status: "CANCELLED",
              paymentStatus: "CANCELLED",
              expiresAt: null
            }
          });
        }
      }
    }
    
    return new NextResponse('Payment intent canceled processed', { status: 200 });
  } catch (error) {
    console.error("Error processing payment_intent.canceled:", error);
    return new NextResponse(`Error: ${error instanceof Error ? error.message : String(error)}`, { status: 500 });
  }
}