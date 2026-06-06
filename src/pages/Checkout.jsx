import { useParams, useNavigate } from 'react-router-dom';
import { programs } from '../data/schoolData';
import { ArrowLeft } from 'lucide-react';

// Stripe Payment Links — one per program
// To update: create a new Payment Link in Stripe Dashboard and paste the URL here
const STRIPE_PAYMENT_LINKS = {
  'cna':          'https://buy.stripe.com/28EfZg0AEdPTfj6dLY6g800',
  'cna-hybrid':   'https://buy.stripe.com/14AfZg3MQ3bf3AocHU6g801',
  'cna-clinical': 'https://buy.stripe.com/eVqcN497a3bfdaYazM6g802',
};

export default function Checkout() {
  const { programId } = useParams();
  const navigate = useNavigate();

  const program = programs.find(p => p.id === programId);
  const paymentLink = STRIPE_PAYMENT_LINKS[programId];

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

  const handleEnroll = () => {
    if (paymentLink) {
      window.location.href = paymentLink;
    } else {
      // Fallback: contact us if no payment link configured
      window.location.href = 'mailto:btiadmissionoffice@gmail.com?subject=Enrollment%20Inquiry%20-%20' + encodeURIComponent(program.name);
    }
  };

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
          <p className="mt-2 text-blue-100">Secure checkout powered by Stripe</p>
        </div>
      </section>

      {/* Enrollment Section */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6">Enrollment Summary</h2>

            {/* Program Details */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
              <p className="text-lg font-bold text-gray-900 mb-2">{program.name}</p>
              <p className="text-sm text-gray-600 mb-4">{program.shortDescription}</p>
              <div className="flex items-center justify-between border-t border-blue-200 pt-4">
                <span className="font-semibold text-gray-700">Total Due Today</span>
                <span className="text-2xl font-bold text-blue-600">${program.price.toLocaleString()}</span>
              </div>
            </div>

            {/* What's included */}
            <div className="mb-8">
              <h3 className="font-semibold text-gray-800 mb-3">What's Included:</h3>
              <ul className="space-y-2">
                {program.features.slice(0, 4).map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <svg className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA Button */}
            <button
              onClick={handleEnroll}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg transition text-lg flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              {paymentLink ? `Proceed to Secure Payment — $${program.price.toLocaleString()}` : 'Contact Us to Enroll'}
            </button>

            <p className="text-center text-xs text-gray-500 mt-4">
              {paymentLink
                ? 'You will be redirected to Stripe\'s secure payment page to complete your enrollment.'
                : 'Click above to email us and we\'ll get you enrolled right away.'}
            </p>

            <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-500">
              <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              <span>Secure payment powered by Stripe</span>
            </div>
          </div>

          {/* Questions */}
          <div className="mt-6 text-center text-sm text-gray-600">
            <p>Questions? Call us at <a href="tel:3146495586" className="text-blue-600 font-semibold">314-649-5586</a> or email <a href="mailto:btiadmissionoffice@gmail.com" className="text-blue-600 font-semibold">btiadmissionoffice@gmail.com</a></p>
          </div>
        </div>
      </section>
    </div>
  );
}
