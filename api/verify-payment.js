import Stripe from 'stripe';
import nodemailer from 'nodemailer';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Configure email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { sessionId } = req.body;

    if (!sessionId) {
      return res.status(400).json({ error: 'Session ID required' });
    }

    // Retrieve session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== 'paid') {
      return res.status(400).json({ error: 'Payment not completed' });
    }

    const { metadata, customer_email } = session;

    // Send confirmation email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: customer_email,
      subject: 'Enrollment Confirmation - Breakthrough Training Institute',
      html: `
        <h2>Welcome to Breakthrough Training Institute!</h2>
        <p>Hi ${metadata.firstName},</p>
        <p>Thank you for enrolling in our ${metadata.programName} program!</p>
        <p><strong>Enrollment Details:</strong></p>
        <ul>
          <li>Program: ${metadata.programName}</li>
          <li>Amount Paid: $${session.amount_total / 100}</li>
          <li>Email: ${customer_email}</li>
          <li>Phone: ${metadata.phone}</li>
        </ul>
        <p>We're excited to have you join our inaugural class! You'll receive further instructions soon.</p>
        <p>Best regards,<br/>Breakthrough Training Institute Team</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    // Update enrollment counter (if using the JSON file approach)
    // This would require reading/writing the enrollmentConfig.json file

    return res.status(200).json({
      success: true,
      message: 'Payment verified and enrollment confirmed',
      studentName: `${metadata.firstName} ${metadata.lastName}`,
    });
  } catch (error) {
    console.error('Verification error:', error);
    return res.status(500).json({ error: error.message });
  }
}
