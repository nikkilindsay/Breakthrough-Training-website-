# Breakthrough Training Institute - Backend Server

Professional Node.js/Express backend for handling Stripe payments, email confirmations, and enrollment tracking.

## Features

- ✅ **Stripe Payment Processing** - Real credit card payments with secure payment intents
- ✅ **Email Confirmations** - Automated enrollment confirmation emails
- ✅ **Enrollment Tracking** - Track student enrollments and enrollment count
- ✅ **Payment Verification** - Verify payments before confirming enrollments
- ✅ **Error Handling** - Comprehensive error handling and logging

## Setup Instructions

### 1. Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Stripe Keys (from your Stripe dashboard)
STRIPE_SECRET_KEY=sk_live_...your_secret_key...
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_...your_publishable_key...

# Email Configuration (Gmail)
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password

# Server Configuration
PORT=3001
NODE_ENV=production

# Frontend URL
VITE_API_URL=http://localhost:3001
```

### 2. Getting Your Stripe Keys

1. Go to https://dashboard.stripe.com
2. Click **Developers** → **API Keys**
3. Copy your **Secret Key** (starts with `sk_live_`)
4. Copy your **Publishable Key** (starts with `pk_live_`)

### 3. Setting Up Gmail for Email Confirmations

1. Go to https://myaccount.google.com/apppasswords
2. Select **Mail** and **Windows Computer** (or your device)
3. Generate an app password
4. Use this password in `EMAIL_PASSWORD`

### 4. Install Dependencies

```bash
npm install
```

### 5. Run the Server

**Development:**
```bash
npm run dev:server
```

**Production:**
```bash
npm start
```

**Run Frontend + Backend Together:**
```bash
npm run dev:all
```

## API Endpoints

### POST `/api/create-payment-intent`

Creates a Stripe payment intent for a student enrollment.

**Request:**
```json
{
  "amount": 475,
  "programId": "cna-self-paced",
  "studentInfo": {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "555-1234"
  }
}
```

**Response:**
```json
{
  "clientSecret": "pi_1234567890_secret_1234567890"
}
```

### POST `/api/confirm-payment`

Confirms a successful payment and sends confirmation email.

**Request:**
```json
{
  "paymentIntentId": "pi_1234567890",
  "studentInfo": {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com"
  },
  "programId": "cna-self-paced",
  "programName": "Certified Nursing Assistant (CNA)",
  "programPrice": 475
}
```

**Response:**
```json
{
  "success": true,
  "enrollment": {
    "id": "enrollment_1234567890",
    "studentInfo": {...},
    "programId": "cna-self-paced",
    "programName": "Certified Nursing Assistant (CNA)",
    "programPrice": 475,
    "paymentIntentId": "pi_1234567890",
    "enrolledAt": "2026-06-04T19:00:00.000Z",
    "status": "completed"
  },
  "enrollmentCount": 1,
  "message": "Enrollment confirmed and confirmation email sent"
}
```

### GET `/api/enrollment-count`

Get current enrollment count and capacity information.

**Response:**
```json
{
  "currentEnrollments": 1,
  "maxCapacity": 25,
  "spotsRemaining": 24
}
```

### GET `/api/enrollments`

Get all enrollments (admin endpoint - should be protected in production).

**Response:**
```json
[
  {
    "id": "enrollment_1234567890",
    "studentInfo": {...},
    "programId": "cna-self-paced",
    "programName": "Certified Nursing Assistant (CNA)",
    "programPrice": 475,
    "paymentIntentId": "pi_1234567890",
    "enrolledAt": "2026-06-04T19:00:00.000Z",
    "status": "completed"
  }
]
```

### GET `/health`

Health check endpoint to verify server is running.

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2026-06-04T19:00:00.000Z"
}
```

## Payment Flow

1. **Frontend:** User fills out enrollment form and clicks "Pay"
2. **Frontend:** Calls `POST /api/create-payment-intent` with student info
3. **Backend:** Creates Stripe payment intent and returns client secret
4. **Frontend:** Uses Stripe.js to confirm payment with card details
5. **Frontend:** On success, calls `POST /api/confirm-payment`
6. **Backend:** Verifies payment succeeded with Stripe
7. **Backend:** Stores enrollment in database
8. **Backend:** Sends confirmation email to student
9. **Frontend:** Shows success message and redirects to home

## Error Handling

All endpoints return appropriate HTTP status codes:

- `200` - Success
- `400` - Bad request (missing fields)
- `500` - Server error

Error responses include a message:
```json
{
  "error": "Payment did not succeed"
}
```

## Future Enhancements

- [ ] Database integration (PostgreSQL/MongoDB) for persistent storage
- [ ] Admin dashboard for managing enrollments
- [ ] Payment webhooks for handling refunds and disputes
- [ ] Student portal for accessing course materials
- [ ] Automated SMS notifications
- [ ] Payment plan support
- [ ] Bulk enrollment import
- [ ] Analytics and reporting

## Troubleshooting

### "Payment processing failed"
- Check that Stripe keys are correct in `.env`
- Verify card details are valid
- Check server logs for specific error

### "Email not sending"
- Verify Gmail app password is correct
- Check that 2-factor authentication is enabled on Gmail
- Verify email address is correct

### "Server not starting"
- Check that port 3001 is not in use
- Verify all environment variables are set
- Check Node.js version (requires 14+)

## Support

For issues or questions, contact: btiadmissionoffice@gmail.com
