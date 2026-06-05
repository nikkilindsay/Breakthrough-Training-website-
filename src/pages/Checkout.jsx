import React, { useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { programs } from '../data/schoolData';
import { ArrowLeft } from 'lucide-react';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export default function Checkout() {
  const { programId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const passedFormData = location.state?.formData || {};

  const program = programs.find(p => p.id === programId);

  const [formData, setFormData] = useState({
    firstName: passedFormData.firstName || '',
    lastName: passedFormData.lastName || '',
    email: passedFormData.email || '',
    phone: passedFormData.phone || '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!program) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Program not found</h1>
          <button onClick={() => navigate('/programs')} className="btn-primary">
            Back to Programs
          </button>
        </div>
      </div>
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckout = async (e) => {
    e.preventDefault();

    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
      setError('Please fill in all required fields');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const stripe = await stripePromise;

      // Create checkout session
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          programId: program.id,
          programName: program.name,
          programPrice: program.price,
          studentInfo: formData,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create checkout session');
      }

      const { sessionId } = await response.json();

      // Redirect to Stripe Checkout
      const result = await stripe.redirectToCheckout({ sessionId });

      if (result.error) {
        setError(result.error.message);
      }
    } catch (err) {
      console.error('Checkout error:', err);
      setError(err.message || 'Failed to process checkout');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      {/* Header */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-12">
        <div className="container-custom">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-blue-100 hover:text-white mb-4 inline-block"
          >
            <ArrowLeft size={20} /> Back
          </button>
          <h1 className="text-4xl font-bold">Complete Your Enrollment</h1>
        </div>
      </section>

      {/* Checkout Content */}
      <section className="py-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="card sticky top-20">
                <h2 className="text-2xl font-bold mb-6 text-dark">Order Summary</h2>

                <div className="space-y-4 mb-6 pb-6 border-b">
                  <div>
                    <h3 className="font-bold text-dark">{program.name}</h3>
                    <p className="text-sm text-gray-600">{program.duration} program</p>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Program Fee:</span>
                      <span className="font-semibold">${program.price}</span>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-dark">Total:</span>
                    <span className="text-3xl font-bold text-primary">${program.price}</span>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-xs text-gray-600 flex items-start gap-2">
                    🔒 Your payment information is secure and encrypted.
                  </p>
                </div>
              </div>
            </div>

            {/* Payment Form */}
            <div className="lg:col-span-2">
              <div className="card">
                <h2 className="text-2xl font-bold mb-6 text-dark">Student Information</h2>

                {error && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-800">{error}</p>
                  </div>
                )}

                <form onSubmit={handleCheckout} className="space-y-6">
                  {/* Student Information */}
                  <div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-dark mb-2">
                          First Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          placeholder="John"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-dark mb-2">
                          Last Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          placeholder="Doe"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                          required
                        />
                      </div>
                    </div>

                    <div className="mt-4">
                      <label className="block text-sm font-medium text-dark mb-2">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="john@example.com"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                      />
                    </div>

                    <div className="mt-4">
                      <label className="block text-sm font-medium text-dark mb-2">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="(555) 123-4567"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full btn-primary py-3 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-lg font-semibold"
                  >
                    {loading ? 'Processing...' : `Pay $${program.price} with Stripe`}
                  </button>

                  <p className="text-xs text-center text-gray-500">
                    Secure payment powered by Stripe. You'll be redirected to complete your payment.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
// Force rebuild Thu Jun  4 22:16:49 EDT 2026
