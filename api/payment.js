import stripe from 'stripe';
import nodemailer from 'nodemailer';

const stripeClient = stripe(process.env.STRIPE_SECRET_KEY);

// Email configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// In-memory storage for enrollments (replace with database in production)
let enrollments = [];
let enrollmentCount = 0;

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    if (req.url === '/api/create-payment-intent' && req.method === 'POST') {
      const { amount, programId, studentInfo } = req.body;

      if (!amount || !programId || !studentInfo) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const paymentIntent = await stripeClient.paymentIntents.create({
        amount: Math.round(amount * 100),
        currency: 'usd',
        metadata: {
          programId,
          studentEmail: studentInfo.email,
          studentName: `${studentInfo.firstName} ${studentInfo.lastName}`,
        },
      });

      return res.status(200).json({ clientSecret: paymentIntent.client_secret });
    }

    if (req.url === '/api/confirm-payment' && req.method === 'POST') {
      const { paymentIntentId, studentInfo, programId, programName, programPrice } = req.body;

      if (!paymentIntentId || !studentInfo || !programId) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const paymentIntent = await stripeClient.paymentIntents.retrieve(paymentIntentId);

      if (paymentIntent.status !== 'succeeded') {
        return res.status(400).json({ error: 'Payment did not succeed' });
      }

      const enrollment = {
        id: `enrollment_${Date.now()}`,
        studentInfo,
        programId,
        programName,
        programPrice,
        paymentIntentId,
        enrolledAt: new Date().toISOString(),
        status: 'completed',
      };

      enrollments.push(enrollment);
      enrollmentCount++;

      // Send confirmation email
      try {
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: studentInfo.email,
          subject: `Welcome to ${programName} - Enrollment Confirmed!`,
          html: `
            <h1>Welcome to Breakthrough Training Institute!</h1>
            <p>Hi ${studentInfo.firstName},</p>
            <p>Thank you for enrolling in our <strong>${programName}</strong> program!</p>
            <p>Your payment of <strong>$${programPrice}</strong> has been successfully processed.</p>
            <h2>Next Steps:</h2>
            <ul>
              <li>Check your email for program details and login credentials</li>
              <li>Review the course materials and schedule</li>
              <li>Contact us if you have any questions: btiadmissionoffice@gmail.com</li>
            </ul>
            <p>We're excited to have you join our inaugural class!</p>
            <p>Best regards,<br>Breakthrough Training Institute Team</p>
          `,
        });
      } catch (emailError) {
        console.error('Email sending error:', emailError);
      }

      return res.status(200).json({
        success: true,
        enrollment,
        enrollmentCount,
        message: 'Enrollment confirmed and confirmation email sent',
      });
    }

    if (req.url === '/api/enrollment-count' && req.method === 'GET') {
      return res.status(200).json({
        currentEnrollments: enrollmentCount,
        maxCapacity: 25,
        spotsRemaining: 25 - enrollmentCount,
      });
    }

    if (req.url === '/api/enrollments' && req.method === 'GET') {
      return res.status(200).json(enrollments);
    }

    res.status(404).json({ error: 'Not found' });
  } catch (error) {
    console.error('API error:', error);
    res.status(500).json({ error: error.message });
  }
}
