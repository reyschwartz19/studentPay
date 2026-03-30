import { loadStripe } from "@stripe/stripe-js";

const stripePublicKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY;
export const stripeKeyMissing = !stripePublicKey;
export const stripePromise = stripePublicKey ? loadStripe(stripePublicKey) : null;

if (stripeKeyMissing) {
  console.error('Missing Stripe publishable key: set VITE_STRIPE_PUBLIC_KEY in frontend/.env');
}