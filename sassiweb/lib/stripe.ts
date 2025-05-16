import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not defined');
}

// Create a single instance of the Stripe client
const stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-04-30.basil',
  typescript: true,
});

// Export a function to get the Stripe client instance
export const getStripeClient = () => stripeClient;

// Export the stripe instance directly for convenience
export const stripe = stripeClient;

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
  // Use the singleton instance directly
  const session = await stripeClient.checkout.sessions.create({
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
  // Use the singleton instance directly
  const session = await stripeClient.checkout.sessions.create({
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
  // Use the singleton instance directly
  const session = await stripeClient.checkout.sessions.retrieve(sessionId);
  
  return {
    success: session.payment_status === 'paid',
    metadata: session.metadata,
  };
};

// Add an export of a utility function to help set up a webhook for local testing

/**
 * Instructions for setting up a Stripe webhook for local testing:
 * 
 * 1. Install the Stripe CLI from https://stripe.com/docs/stripe-cli
 * 2. Run this command to log in:
 *    stripe login
 * 
 * 3. Run this command to forward events to your local webhook endpoint:
 *    stripe listen --forward-to http://localhost:3000/api/webhooks/stripe
 * 
 * 4. The CLI will show a webhook signing secret. Add this to your .env.local file:
 *    STRIPE_WEBHOOK_SECRET=whsec_xxxxx
 * 
 * 5. In another terminal, you can trigger test events like this:
 *    stripe trigger checkout.session.completed
 */

export function getStripeWebhookTestInstructions() {
  return `
To test Stripe webhooks locally:

1. Install the Stripe CLI: https://stripe.com/docs/stripe-cli
2. Login: stripe login
3. Forward events: stripe listen --forward-to http://localhost:3000/api/webhooks/stripe
4. Copy the webhook secret and add it to .env.local
5. Trigger test events: stripe trigger checkout.session.completed
`;
} 