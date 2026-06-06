import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { programs } from '../data/schoolData';
import { ArrowLeft, Copy, Check } from 'lucide-react';

export default function Checkout() {
  const { programId } = useParams();
  const navigate = useNavigate();

  const program = programs.find(p => p.id === programId);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
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

  const getPaymentLink = () => {
    const links = {
      'cna': 'https://pay.bluevine.com/p/de56ed140f56413eb76ac6dfb291801e',
      'cna-hybrid': 'https://pay.bluevine.com/p/f07c4fffca8d453cb03fd7d9105ec1e6',
      'cna-clinical': 'https://pay.bluevine.com/p/9a9db32df43d4cebab2457eb8e6faee1'
    };
    return links[programId] || links['cna'];
  };

  const copyPaymentLink = () => {
    const paymentLink = getPaymentLink();
    navigator.clipboard.writeText(paymentLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Success Page
  if (submitted) {
    return (
      <div className="w-full min-h-screen bg-gradient-to-b from-green-50 to-white">
        {/* Header */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-12">
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
        <section className="py-16">
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
                <h3 className="font-semibold text-lg mb-3">Next Step: Complete Payment</h3>
                <p className="text-gray-700 mb-4">
                  Click the button below to securely complete your payment. Your enrollment is reserved!
                </p>
              </div>

              {/* Payment Buttons */}
              <div className="space-y-3 mb-6">
                <a
                  href={getPaymentLink()}
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
                    <span>Start your CNA journey!</span>
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

  // Enrollment Form Page
  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-12">
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

      {/* Form Section */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6">Student Information</h2>

            {/* Order Summary */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-700">
                <span className="font-semibold">Program:</span> {program.name}
              </p>
              <p className="text-sm text-gray-700 mt-2">
                <span className="font-semibold">Price:</span> ${program.price}
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded mb-6">
                {error}
              </div>
            )}

            {/* Form */}
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition"
              >
                Continue to Payment
              </button>
            </form>

            <p className="text-center text-sm text-gray-600 mt-4">
              Secure payment powered by Stripe
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
// Cache buster: 1780750238
