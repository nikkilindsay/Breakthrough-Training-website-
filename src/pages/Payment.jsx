import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Copy, Check, ArrowLeft } from 'lucide-react';

export default function Payment() {
  const [searchParams] = useSearchParams();
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const programId = searchParams.get('program') || 'cna';
  
  const programs = {
    'cna': {
      name: 'CNA Flexible (Self-Paced)',
      price: 475,
      link: 'https://pay.bluevine.com/p/de56ed140f56413eb76ac6dfb291801e'
    },
    'cna-hybrid': {
      name: 'CNA Hybrid',
      price: 1175,
      link: 'https://pay.bluevine.com/p/f07c4fffca8d453cb03fd7d9105ec1e6'
    },
    'cna-clinical': {
      name: 'CNA Clinical Experience Only',
      price: 915,
      link: 'https://pay.bluevine.com/p/9a9db32df43d4cebab2457eb8e6faee1'
    }
  };

  const program = programs[programId] || programs['cna'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.firstName && formData.lastName && formData.email && formData.phone) {
      setSubmitted(true);
    }
  };

  const copyPaymentLink = () => {
    navigator.clipboard.writeText(program.link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-12">
          <div className="container mx-auto px-4">
            <a href="/" className="text-white hover:opacity-80 mb-4 inline-block">← Back to Home</a>
            <h1 className="text-4xl font-bold">Enrollment Confirmed!</h1>
          </div>
        </div>

        <div className="py-16">
          <div className="container mx-auto px-4 max-w-2xl">
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-10 h-10 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>

              <h2 className="text-3xl font-bold text-green-600 mb-6">You're All Set!</h2>

              <div className="bg-gray-50 rounded-lg p-6 mb-6 text-left">
                <h3 className="font-semibold text-lg mb-4">Enrollment Details</h3>
                <div className="space-y-2 text-sm">
                  <p><span className="font-semibold">Name:</span> {formData.firstName} {formData.lastName}</p>
                  <p><span className="font-semibold">Email:</span> {formData.email}</p>
                  <p><span className="font-semibold">Phone:</span> {formData.phone}</p>
                  <p><span className="font-semibold">Program:</span> {program.name}</p>
                  <p><span className="font-semibold">Amount:</span> ${program.price}</p>
                </div>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-6 text-left rounded">
                <h3 className="font-semibold text-lg mb-3">Next Step: Complete Payment</h3>
                <p className="text-gray-700 mb-4">
                  Click the button below to securely complete your payment on Stripe.
                </p>
              </div>

              <div className="space-y-3 mb-6">
                <a
                  href={program.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition w-full text-center"
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

              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <p className="text-green-800 text-sm">
                  ✓ A confirmation email has been sent to <strong>{formData.email}</strong>
                </p>
              </div>

              <a href="/" className="block bg-gray-800 hover:bg-gray-900 text-white font-semibold py-3 px-8 rounded-lg transition w-full text-center">
                Return to Home
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-12">
        <div className="container mx-auto px-4">
          <a href="/" className="text-white hover:opacity-80 mb-4 inline-block flex items-center gap-2">
            <ArrowLeft size={20} />
            Back
          </a>
          <h1 className="text-4xl font-bold">Enroll Now</h1>
        </div>
      </div>

      <div className="py-12">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6">Student Information</h2>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-700">
                <span className="font-semibold">Program:</span> {program.name}
              </p>
              <p className="text-sm text-gray-700 mt-2">
                <span className="font-semibold">Price:</span> ${program.price}
              </p>
            </div>

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
                  placeholder="(636) 555-0000"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
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
      </div>
    </div>
  );
}
