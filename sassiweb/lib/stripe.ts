import Stripe from 'stripe';

// Do not initialize Stripe directly here, use getStripeClient instead
export const getStripeClient = () => {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('STRIPE_SECRET_KEY is not defined');
  }
  
  // Initialize Stripe with the secret key from environment variables
  return new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2025-03-31.basil',
  });
};

/**
 * Create a Stripe checkout session for event registration
 */
export const createEventCheckoutSession = async ({
  eventId,
  userId,
  eventTitle,
  amount,
  successUrl,
  cancelUrl,
}: {
  eventId: string;
  userId: string;
  eventTitle: string;
  amount: number;
  successUrl: string;
  cancelUrl: string;
}) => {
  const stripe = getStripeClient();
  
  // Create a checkout session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'eur',
          product_data: {
            name: `Registration for ${eventTitle}`,
            description: `Event ID: ${eventId}`,
          },
          unit_amount: amount * 100, // Convert to cents
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${successUrl}?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: cancelUrl,
    metadata: {
      eventId,
      userId,
      type: 'event_registration',
    },
  });
  
  return session;
};

/**
 * Create a Stripe checkout session for team application payment
 */
export const createTeamApplicationCheckoutSession = async ({
  userId,
  department,
  successUrl,
  cancelUrl,
}: {
  userId: string;
  department: string;
  successUrl: string;
  cancelUrl: string;
}) => {
  const stripe = getStripeClient();
  
  // Create a checkout session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'eur',
          product_data: {
            name: 'SASSI Membership Fee',
            description: 'Annual membership fee for SASSI Milano',
          },
          unit_amount: 500, // €5.00 in cents
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${successUrl}?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: cancelUrl,
    metadata: {
      userId,
      department,
      type: 'team_application',
    },
  });
  
  return session;
};

/**
 * Verify a Stripe checkout session
 */
export const verifyCheckoutSession = async (sessionId: string) => {
  const stripe = getStripeClient();
  
  const session = await stripe.checkout.sessions.retrieve(sessionId);
  
  return {
    success: session.payment_status === 'paid',
    metadata: session.metadata,
  };
}; 