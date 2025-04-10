import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { stripe } from '@/lib/stripe';

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

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    // Check if user already has an exclusive membership
    const existingMembership = await prisma.exclusiveMembership.findUnique({
      where: { userId: session.user.id },
    });
    
    if (existingMembership) {
      return NextResponse.json({ 
        paymentVerified: true,
        membershipCode: existingMembership.code
      });
    }
    
    // Create Stripe checkout session
    const checkoutSession = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: 'SASSI Exclusive Membership',
              description: 'One-time payment for exclusive membership benefits',
            },
            unit_amount: 500, // €5.00
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/join/exclusive-member?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/join/exclusive-member?canceled=true`,
      metadata: {
        userId: session.user.id,
      },
    });
    
    return NextResponse.json({ checkoutUrl: checkoutSession.url });
  } catch (error) {
    console.error('Error creating exclusive membership:', error);
    return NextResponse.json(
      { error: 'Failed to create exclusive membership' },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    // Check if user has an exclusive membership
    const membership = await prisma.exclusiveMembership.findUnique({
      where: { userId: session.user.id },
    });
    
    return NextResponse.json({
      paymentVerified: !!membership,
      membershipCode: membership?.code || null,
    });
  } catch (error) {
    console.error('Error checking membership status:', error);
    return NextResponse.json(
      { error: 'Failed to check membership status' },
      { status: 500 }
    );
  }
} 