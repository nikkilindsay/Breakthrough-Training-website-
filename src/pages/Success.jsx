import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

export default function Success() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [studentName, setStudentName] = useState('');

  useEffect(() => {
    const sessionId = searchParams.get('session_id');

    if (!sessionId) {
      setError('No session found');
      setLoading(false);
      return;
    }

    // Verify payment and update enrollment
    const verifyPayment = async () => {
      try {
        const response = await fetch('/api/verify-payment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ sessionId }),
        });

        if (!response.ok) {
          throw new Error('Failed to verify payment');
        }

        const data = await response.json();
        if (data.customerName) {
          setStudentName(data.customerName);
        }
      } catch (err) {
        console.error('Verification error:', err);
        // Don't show error to student - payment was successful via Stripe
        // Just show the success page
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [searchParams, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="animate-spin inline-block w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full mb-4"></div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Confirming Your Enrollment</h1>
          <p className="text-gray-600">Please wait while we process everything...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-red-600 mb-2">Something Went Wrong</h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <p className="text-gray-500 text-sm mb-6">If you were charged, please contact us at <a href="tel:6362425722" className="text-blue-600 font-semibold">636-242-5722</a> and we'll get it sorted out.</p>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors w-full"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 max-w-lg w-full text-center">
        {/* Success Icon */}
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        {/* Thank You Header */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
          Registration Confirmed!
        </h1>
        
        <p className="text-lg text-green-600 font-semibold mb-6">
          {studentName ? `Welcome, ${studentName}!` : 'Welcome to Breakthrough Training Institute!'}
        </p>

        {/* Inspirational Message */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 mb-8 border border-blue-100">
          <p className="text-lg text-gray-700 italic leading-relaxed mb-3">
            "The future belongs to those who believe in the beauty of their dreams."
          </p>
          <p className="text-sm text-gray-500">— Eleanor Roosevelt</p>
          <div className="mt-4 pt-4 border-t border-blue-100">
            <p className="text-gray-700 font-medium">
              You just took the first step toward an amazing career in healthcare. We are so proud of you for investing in yourself. This is YOUR breakthrough moment!
            </p>
          </div>
        </div>

        {/* What's Next Section */}
        <div className="text-left bg-gray-50 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">What Happens Next</h2>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">1</div>
              <p className="text-gray-700">You'll receive a <strong>confirmation email</strong> with your enrollment details</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">2</div>
              <p className="text-gray-700">Our team will review your documents and reach out within <strong>24-48 hours</strong></p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">3</div>
              <p className="text-gray-700">Download the <strong>Breakthrough Training app</strong> to access your coursework and track your progress</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">4</div>
              <p className="text-gray-700">Complete your checklist items (background check, TB test, etc.) to stay on track</p>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="bg-blue-50 rounded-xl p-4 mb-6">
          <p className="text-gray-700 font-medium mb-1">Questions? We're here for you!</p>
          <p className="text-gray-600">
            Call <a href="tel:6362425722" className="text-blue-600 font-semibold">636-242-5722</a> or email <a href="mailto:btiadmissionoffice@gmail.com" className="text-blue-600 font-semibold">btiadmissionoffice@gmail.com</a>
          </p>
        </div>

        {/* Return Button */}
        <button
          onClick={() => navigate('/')}
          className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors w-full text-lg"
        >
          Return to Home
        </button>

        <p className="text-xs text-gray-400 mt-4">
          A confirmation receipt has been sent to your email address.
        </p>
      </div>
    </div>
  );
}
