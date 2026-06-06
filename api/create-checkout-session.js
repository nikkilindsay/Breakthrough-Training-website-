import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { programId, programName, programPrice, studentInfo } = req.body;

    if (!programName || !programPrice || !studentInfo) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: programName,
              description: `CNA Training Program - ${programName}`,
            },
            unit_amount: Math.round(programPrice * 100), // Convert to cents
          },
          quantity: 1,
        },
      ],
      customer_email: studentInfo.email,
      mode: 'payment',
      success_url: `https://www.btieducation.com/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `https://www.btieducation.com/checkout/${programId}`,
      metadata: {
        firstName: studentInfo.firstName,
        lastName: studentInfo.lastName,
        email: studentInfo.email,
        phone: studentInfo.phone,
        programId: programId,
        programName: programName,
      },
    });

    // Return both sessionId and url so the frontend can redirect directly
    return res.status(200).json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error('[create-checkout-session] Stripe error:', error);
    return res.status(500).json({ error: error.message });
  }
}
