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

// In-memory storage for email subscribers
let subscribers = [];

// Email configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Admin notification recipient
const ADMIN_EMAIL = 'btiadmissionoffice@gmail.com';

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

    // Send confirmation email to student
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: studentInfo.email,
        subject: `Welcome to ${programName} - Enrollment Confirmed!`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #1e40af, #7c3aed); padding: 24px; border-radius: 10px 10px 0 0; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 28px;">Welcome to Breakthrough Training Institute!</h1>
            </div>
            <div style="background: #ffffff; padding: 24px; border: 1px solid #e2e8f0; border-radius: 0 0 10px 10px;">
              <p style="font-size: 16px; color: #1f2937;">Hi ${studentInfo.firstName},</p>
              <p style="font-size: 16px; color: #1f2937;">Thank you for enrolling in our <strong>${programName}</strong> program!</p>
              <p style="font-size: 16px; color: #1f2937;">Your payment of <strong style="color: #22c55e;">$${programPrice}</strong> has been successfully processed.</p>
              
              <div style="background: #f0f9ff; padding: 16px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #1e40af;">
                <p style="margin: 0; color: #1e40af; font-weight: bold; font-size: 16px;">Next Steps:</p>
                <ol style="color: #374151; font-size: 15px; padding-left: 20px;">
                  <li style="margin-bottom: 8px;">Download the <strong>Breakthrough Training app</strong> to access your coursework</li>
                  <li style="margin-bottom: 8px;">Our team will review your documents and reach out within <strong>24-48 hours</strong></li>
                  <li style="margin-bottom: 8px;">Complete your checklist items (background check, TB test, etc.)</li>
                  <li style="margin-bottom: 8px;">Contact us with any questions: <a href="mailto:btiadmissionoffice@gmail.com">btiadmissionoffice@gmail.com</a> or <a href="tel:6362425722">636-242-5722</a></li>
                </ol>
              </div>

              <div style="background: #faf5ff; padding: 16px; border-radius: 8px; margin: 20px 0; text-align: center;">
                <p style="font-style: italic; color: #6b21a8; font-size: 16px; margin: 0;">"The future belongs to those who believe in the beauty of their dreams."</p>
                <p style="color: #9333ea; font-size: 13px; margin: 8px 0 0 0;">— Eleanor Roosevelt</p>
              </div>

              <p style="font-size: 16px; color: #1f2937;">We're excited to have you join our program! This is YOUR breakthrough moment!</p>
              <p style="font-size: 14px; color: #6b7280; margin-top: 24px;">
                Best regards,<br>
                <strong>Breakthrough Training Institute Team</strong><br>
                636-242-5722 | btiadmissionoffice@gmail.com
              </p>
            </div>
          </div>
        `,
      });
    } catch (emailError) {
      console.error('Student email sending error:', emailError);
      // Don't fail the enrollment if email fails
    }

    // Send admin notification email to Nikki
    try {
      const enrollmentDate = new Date().toLocaleString('en-US', {
        timeZone: 'America/Chicago',
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });

      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: ADMIN_EMAIL,
        subject: `🎉 NEW ENROLLMENT: ${studentInfo.firstName} ${studentInfo.lastName} - ${programName}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #1e40af, #7c3aed); padding: 20px; border-radius: 10px 10px 0 0;">
              <h1 style="color: white; margin: 0; font-size: 24px;">🎉 New Student Enrolled!</h1>
            </div>
            <div style="background: #f8fafc; padding: 24px; border: 1px solid #e2e8f0; border-radius: 0 0 10px 10px;">
              <h2 style="color: #1e40af; margin-top: 0;">Student Information</h2>
              <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                <tr style="border-bottom: 1px solid #e2e8f0;">
                  <td style="padding: 10px 0; font-weight: bold; color: #374151; width: 140px;">Name:</td>
                  <td style="padding: 10px 0; color: #1f2937;">${studentInfo.firstName} ${studentInfo.lastName}</td>
                </tr>
                <tr style="border-bottom: 1px solid #e2e8f0;">
                  <td style="padding: 10px 0; font-weight: bold; color: #374151;">Email:</td>
                  <td style="padding: 10px 0; color: #1f2937;"><a href="mailto:${studentInfo.email}">${studentInfo.email}</a></td>
                </tr>
                <tr style="border-bottom: 1px solid #e2e8f0;">
                  <td style="padding: 10px 0; font-weight: bold; color: #374151;">Phone:</td>
                  <td style="padding: 10px 0; color: #1f2937;">${studentInfo.phone || 'Not provided'}</td>
                </tr>
                <tr style="border-bottom: 1px solid #e2e8f0;">
                  <td style="padding: 10px 0; font-weight: bold; color: #374151;">Program:</td>
                  <td style="padding: 10px 0; color: #1f2937; font-weight: bold;">${programName}</td>
                </tr>
                <tr style="border-bottom: 1px solid #e2e8f0;">
                  <td style="padding: 10px 0; font-weight: bold; color: #374151;">Amount Paid:</td>
                  <td style="padding: 10px 0; color: #22c55e; font-weight: bold; font-size: 18px;">$${programPrice}</td>
                </tr>
                <tr style="border-bottom: 1px solid #e2e8f0;">
                  <td style="padding: 10px 0; font-weight: bold; color: #374151;">Date/Time:</td>
                  <td style="padding: 10px 0; color: #1f2937;">${enrollmentDate}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; font-weight: bold; color: #374151;">Payment ID:</td>
                  <td style="padding: 10px 0; color: #6b7280; font-size: 12px;">${paymentIntentId}</td>
                </tr>
              </table>
              ${studentInfo.address ? `
              <h3 style="color: #1e40af;">Address</h3>
              <p style="color: #1f2937;">${studentInfo.address}${studentInfo.city ? `, ${studentInfo.city}` : ''}${studentInfo.state ? `, ${studentInfo.state}` : ''} ${studentInfo.zip || ''}</p>
              ` : ''}
              ${studentInfo.emergencyContact ? `
              <h3 style="color: #1e40af;">Emergency Contact</h3>
              <p style="color: #1f2937;">${studentInfo.emergencyContact}${studentInfo.emergencyPhone ? ` - ${studentInfo.emergencyPhone}` : ''}</p>
              ` : ''}
              <div style="background: #dbeafe; padding: 16px; border-radius: 8px; margin-top: 20px;">
                <p style="margin: 0; color: #1e40af; font-weight: bold;">📋 Action Items:</p>
                <ul style="color: #374151; margin: 8px 0 0 0; padding-left: 20px;">
                  <li>Review student documents (DL, SSC)</li>
                  <li>Verify payment in Stripe dashboard</li>
                  <li>Send student their app login credentials</li>
                  <li>Add to class roster</li>
                </ul>
              </div>
              <p style="color: #6b7280; font-size: 12px; margin-top: 20px; text-align: center;">
                Total Enrollments: ${enrollmentCount} | Spots Remaining: ${25 - enrollmentCount}
              </p>
            </div>
          </div>
        `,
      });
      console.log(`Admin notification sent for enrollment: ${studentInfo.firstName} ${studentInfo.lastName}`);
    } catch (adminEmailError) {
      console.error('Admin notification email error:', adminEmailError);
      // Don't fail the enrollment if admin email fails
    }

    res.json({
      success: true,
      enrollment,
      enrollmentCount,
      message: 'Enrollment confirmed and notification emails sent',
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

// Email subscription endpoint
app.post('/api/subscribe', async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }

    // Check for duplicate
    const existing = subscribers.find(s => s.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      return res.json({ success: true, message: 'Already subscribed' });
    }

    // Store subscriber
    const subscriber = {
      name,
      email,
      subscribedAt: new Date().toISOString(),
    };
    subscribers.push(subscriber);

    // Send confirmation email to subscriber
    try {
      await transporter.sendMail({
        from: `"Breakthrough Training Institute" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Welcome to the BTI Community!',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #f97316, #ea580c); padding: 30px; text-align: center;">
              <h1 style="color: white; margin: 0;">Welcome to BTI!</h1>
            </div>
            <div style="padding: 30px; background: #ffffff;">
              <p style="font-size: 18px; color: #333;">Hi ${name},</p>
              <p style="color: #555; line-height: 1.6;">Thank you for subscribing to updates from Breakthrough Training Institute! You'll now receive:</p>
              <ul style="color: #555; line-height: 2;">
                <li>🎯 New job openings</li>
                <li>📝 Blog posts and educational content</li>
                <li>📅 Upcoming events and class schedules</li>
                <li>🎓 Student success stories</li>
                <li>💡 Healthcare industry insights</li>
              </ul>
              <p style="color: #555; line-height: 1.6;">We're glad to have you in our community!</p>
              <p style="color: #555;">— The BTI Team</p>
              <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
              <p style="color: #999; font-size: 12px; text-align: center;">Breakthrough Training Institute | 636-242-5722 | btiadmissionoffice@gmail.com</p>
            </div>
          </div>
        `,
      });
    } catch (emailError) {
      console.error('Subscriber confirmation email error:', emailError);
    }

    // Notify admin of new subscriber
    try {
      await transporter.sendMail({
        from: `"BTI Website" <${process.env.EMAIL_USER}>`,
        to: ADMIN_EMAIL,
        subject: `New Subscriber: ${name}`,
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px;">
            <h2 style="color: #f97316;">New Email Subscriber</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Date:</strong> ${new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' })}</p>
            <p><strong>Total Subscribers:</strong> ${subscribers.length}</p>
          </div>
        `,
      });
    } catch (adminError) {
      console.error('Admin subscriber notification error:', adminError);
    }

    res.json({ success: true, message: 'Subscribed successfully' });
  } catch (error) {
    console.error('Subscription error:', error);
    res.status(500).json({ error: 'Failed to subscribe' });
  }
});

// Get subscribers list (admin)
app.get('/api/subscribers', (req, res) => {
  res.json({ subscribers, total: subscribers.length });
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
