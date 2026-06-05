import { useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { programs } from '../data/schoolData';
import { ArrowLeft, Copy, Check } from 'lucide-react';

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

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
      setError('Please fill in all required fields');
      return;
    }

    setError(null);
    setSubmitted(true);
  };

  const copyPaymentLink = () => {
    const paymentLink = `https://buy.stripe.com/test_cNA8xZ0Zy1Hy1Ek8ww`;
    navigator.clipboard.writeText(paymentLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (submitted) {
    return (
      <div className="w-full">
        {/* Header */}
        <section className="bg-gradient-to-r from-primary to-secondary text-white py-12">
          <div className="container mx-auto px-4">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 mb-4 hover:opacity-80 transition"
            >
              <ArrowLeft size={20} />
              Back
            </button>
            <h1 className="text-4xl font-bold">Enrollment Confirmed!</h1>
          </div>
        </section>

        {/* Success Content */}
        <section className="py-16 bg-gradient-to-b from-green-50 to-white">
          <div className="container mx-auto px-4 max-w-2xl">
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              {/* Success Icon */}
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-10 h-10 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>

              <h2 className="text-3xl font-bold text-green-600 mb-4">Payment Successful!</h2>

              {/* Student Info */}
              <div className="bg-gray-50 rounded-lg p-6 mb-6 text-left">
                <h3 className="font-semibold text-lg mb-4">Enrollment Details</h3>
                <div className="space-y-2 text-sm">
                  <p><span className="font-semibold">Student:</span> {formData.firstName} {formData.lastName}</p>
                  <p><span className="font-semibold">Email:</span> {formData.email}</p>
                  <p><span className="font-semibold">Phone:</span> {formData.phone}</p>
                  <p><span className="font-semibold">Program:</span> {program.name}</p>
                  <p><span className="font-semibold">Amount:</span> ${program.price}</p>
                </div>
              </div>

              {/* Payment Instructions */}
              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-6 text-left rounded">
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zm-11-1a1 1 0 11-2 0 1 1 0 012 0z" clipRule="evenodd" />
                  </svg>
                  Next Step: Complete Payment
                </h3>
                <p className="text-gray-700 mb-4">
                  Click the button below to securely complete your payment via Stripe. Your enrollment is reserved!
                </p>
              </div>

              {/* Payment Buttons */}
              <div className="space-y-3 mb-6">
                <a
                  href="https://buy.stripe.com/test_cNA8xZ0Zy1Hy1Ek8ww"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition w-full"
                >
                  Pay ${program.price} Now
                </a>

                <button
                  onClick={copyPaymentLink}
                  className="flex items-center justify-center gap-2 w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-lg transition"
                >
                  {copied ? (
                    <>
                      <Check size={20} />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy size={20} />
                      Copy Payment Link
                    </>
                  )}
                </button>
              </div>

              {/* Confirmation Message */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <p className="text-green-800 text-sm">
                  ✓ A confirmation email has been sent to <strong>{formData.email}</strong>
                </p>
              </div>

              {/* Next Steps */}
              <div className="bg-gray-50 rounded-lg p-6 text-left mb-6">
                <h3 className="font-semibold text-lg mb-3">What Happens Next?</h3>
                <ol className="space-y-2 text-sm text-gray-700">
                  <li className="flex gap-3">
                    <span className="font-bold text-blue-600">1.</span>
                    <span>Complete payment using the button above</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-blue-600">2.</span>
                    <span>You'll receive a payment confirmation email</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-blue-600">3.</span>
                    <span>We'll contact you within 24 hours with class details</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-blue-600">4.</span>
                    <span>Start your CNA journey and earn in 4-6 weeks!</span>
                  </li>
                </ol>
              </div>

              {/* Support */}
              <div className="text-center text-sm text-gray-600 mb-6">
                <p>Questions? Contact us at <a href="mailto:btiadmissionoffice@gmail.com" className="text-blue-600 hover:underline">btiadmissionoffice@gmail.com</a></p>
                <p>or call <a href="tel:314-649-5586" className="text-blue-600 hover:underline">314-649-5586</a></p>
              </div>

              {/* Return Home Button */}
              <button
                onClick={() => navigate('/')}
                className="bg-gray-800 hover:bg-gray-900 text-white font-semibold py-3 px-8 rounded-lg transition w-full"
              >
                Return to Home
              </button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Header */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-12">
        <div className="container mx-auto px-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 mb-4 hover:opacity-80 transition"
          >
            <ArrowLeft size={20} />
            Back
          </button>
          <h1 className="text-4xl font-bold">Complete Your Enrollment</h1>
        </div>
      </section>

      {/* Checkout Form */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow p-6 sticky top-6">
                <h2 className="text-xl font-bold mb-6">Order Summary</h2>
                <div className="space-y-4 mb-6">
                  <div>
                    <h3 className="font-semibold text-lg">{program.name}</h3>
                    <p className="text-gray-600 text-sm">{program.description}</p>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Program Fee:</span>
                      <span className="font-semibold">${program.price}</span>
                    </div>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between text-lg">
                      <span className="font-bold">Total:</span>
                      <span className="font-bold text-primary text-2xl">${program.price}</span>
                    </div>
                  </div>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded p-3 text-sm text-blue-800">
                  ✓ Your payment information is secure and encrypted
                </div>
              </div>
            </div>

            {/* Enrollment Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow p-8">
                <h2 className="text-2xl font-bold mb-6">Student Information</h2>

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded mb-6">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2">First Name *</label>
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
                      <label className="block text-sm font-semibold mb-2">Last Name *</label>
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

                  <div>
                    <label className="block text-sm font-semibold mb-2">Email Address *</label>
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

                  <div>
                    <label className="block text-sm font-semibold mb-2">Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="(314) 555-0000"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>

                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="terms"
                      required
                      className="mt-1"
                    />
                    <label htmlFor="terms" className="text-sm text-gray-700">
                      I agree to the <a href="/terms" className="text-blue-600 hover:underline">terms and conditions</a> and <a href="/privacy" className="text-blue-600 hover:underline">privacy policy</a>
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 px-6 rounded-lg transition"
                  >
                    Continue to Payment
                  </button>
                </form>

                <p className="text-center text-sm text-gray-600 mt-4">
                  Secure payment powered by Stripe
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
