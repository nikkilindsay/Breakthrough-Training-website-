// ─────────────────────────────────────────────────────────────
// Stripe Payment Links — the ONLY place any payment link is defined.
// Checkout.jsx reads from here. Paste a link between the quotes to turn
// an option ON; set it to '' and that option disappears from the page.
// Links are created in the Stripe Dashboard → Payment Links.
// ─────────────────────────────────────────────────────────────
export const PAYMENT_LINKS = {
  // Self-Paced CNA — tuition $475
  'cna': {
    full:    'https://buy.stripe.com/28EfZg0AEdPTfj6dLY6g800', // Stripe charges $475.00 — full tuition (confirmed by a real customer payment)
    deposit: 'https://buy.stripe.com/cNi8wO3MQeTX2wkcHU6g80g', // Stripe charges $75.00  — down payment (confirmed by owner 2026-11-10)
  },

  // CNA Hybrid — tuition $1,175
  'cna-hybrid': {
    full:    'https://buy.stripe.com/14AfZg3MQ3bf3AocHU6g801', // Stripe charges $1,175.00 — full tuition
    deposit: 'https://buy.stripe.com/aFa4gydnq8vz7QE23g6g80f', // Stripe charges $125.00 — down payment (confirmed by owner 2026-11-10)
  },

  // CNA Clinical Experience Only — tuition $915. FULL PAYMENT ONLY.
  // No down payment and no payment plan are offered on this program by design.
  'cna-clinical': {
    full:    'https://buy.stripe.com/eVqcN497a3bfdaYazM6g802', // Stripe charges $915.00 — full tuition
    deposit: '',
  },
};
