import Stripe from 'stripe';
import nodemailer from 'nodemailer';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { sessionId } = req.body;

    if (!sessionId) {
      return res.status(400).json({ error: 'Session ID required' });
    }

    // Must retrieve a CHECKOUT SESSION (not a PaymentIntent)
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status === 'paid') {
      const { metadata, customer_email } = session;

      // Send confirmation email if email credentials are configured
      if (process.env.EMAIL_USER && process.env.EMAIL_PASSWORD) {
        try {
          const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: process.env.EMAIL_USER,
              pass: process.env.EMAIL_PASSWORD,
            },
          });

          const mailOptions = {
            from: process.env.EMAIL_USER,
            to: customer_email,
            subject: 'Enrollment Confirmation - Breakthrough Training Institute',
            html: `
              <h2>Welcome to Breakthrough Training Institute!</h2>
              <p>Hi ${metadata?.firstName || 'Student'},</p>
              <p>Thank you for enrolling in our <strong>${metadata?.programName || 'CNA Program'}</strong>!</p>
              <p><strong>Enrollment Details:</strong></p>
              <ul>
                <li>Program: ${metadata?.programName || 'CNA Program'}</li>
                <li>Amount Paid: $${(session.amount_total / 100).toFixed(2)}</li>
                <li>Email: ${customer_email}</li>
                <li>Phone: ${metadata?.phone || 'N/A'}</li>
              </ul>
              <p>We're excited to have you join our program! You'll receive further instructions within 24 hours.</p>
              <p>Questions? Call us at <strong>314-649-5586</strong> or email <a href="mailto:btiadmissionoffice@gmail.com">btiadmissionoffice@gmail.com</a></p>
              <p>Best regards,<br/>Breakthrough Training Institute Team</p>
            `,
          };

          await transporter.sendMail(mailOptions);
        } catch (emailErr) {
          // Log email error but don't fail the verification
          console.error('[verify-payment] Email send error:', emailErr.message);
        }
      }

      return res.status(200).json({
        success: true,
        message: 'Payment verified and enrollment confirmed',
        customer: {
          email: customer_email,
          firstName: metadata?.firstName,
          lastName: metadata?.lastName,
          phone: metadata?.phone,
          program: metadata?.programName,
        },
      });
    }

    return res.status(200).json({ success: false, message: 'Payment not completed yet' });
  } catch (error) {
    console.error('[v0] verify-payment error:', error);
    return res.status(500).json({ error: error.message });
  }
}
