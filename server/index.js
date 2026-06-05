import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import stripe from 'stripe';
import nodemailer from 'nodemailer';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const stripeClient = stripe(process.env.STRIPE_SECRET_KEY);

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage for enrollments (replace with database later)
let enrollments = [];
let enrollmentCount = 0;

// Email configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Routes
app.post('/api/create-payment-intent', async (req, res) => {
  try {
    const { amount, programId, studentInfo } = req.body;

    if (!amount || !programId || !studentInfo) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Create payment intent
    const paymentIntent = await stripeClient.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: 'usd',
      metadata: {
        programId,
        studentEmail: studentInfo.email,
        studentName: `${studentInfo.firstName} ${studentInfo.lastName}`,
      },
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Payment intent error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/confirm-payment', async (req, res) => {
  try {
    const { paymentIntentId, studentInfo, programId, programName, programPrice } = req.body;

    if (!paymentIntentId || !studentInfo || !programId) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Retrieve payment intent to verify it succeeded
    const paymentIntent = await stripeClient.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status !== 'succeeded') {
      return res.status(400).json({ error: 'Payment did not succeed' });
    }

    // Store enrollment
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
      // Don't fail the enrollment if email fails
    }

    res.json({
      success: true,
      enrollment,
      enrollmentCount,
      message: 'Enrollment confirmed and confirmation email sent',
    });
  } catch (error) {
    console.error('Confirmation error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/enrollment-count', (req, res) => {
  res.json({
    currentEnrollments: enrollmentCount,
    maxCapacity: 25,
    spotsRemaining: 25 - enrollmentCount,
  });
});

app.get('/api/enrollments', (req, res) => {
  res.json(enrollments);
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
