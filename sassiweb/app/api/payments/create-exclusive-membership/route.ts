import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { stripe } from '@/lib/stripe';
import { prisma } from '@/lib/prisma';
import { PaymentType } from '@prisma/client';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { successUrl, cancelUrl } = await req.json();

    if (!successUrl || !cancelUrl) {
      return new NextResponse('Missing success or cancel URL', { status: 400 });
    }

    // Create a Stripe checkout session
    const stripeSession = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: 'SASSI Exclusive Membership',
              description: 'Annual membership for SASSI Milano',
            },
            unit_amount: 500, // €5.00 in cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        userId: session.user.id,
        type: 'exclusive_membership',
      },
    });

    // Create a payment record in our database
    await prisma.stripePayment.create({
      data: {
        stripeSessionId: stripeSession.id,
        amount: 5.00,
        currency: 'eur',
        status: 'PENDING',
        paymentType: PaymentType.EXCLUSIVE_MEMBERSHIP,
        userId: session.user.id,
      },
    });

    // Return both the sessionId and the checkout URL
    return NextResponse.json({ 
      sessionId: stripeSession.id,
      checkoutUrl: stripeSession.url 
    });
  } catch (error) {
    console.error('Error creating exclusive membership:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}