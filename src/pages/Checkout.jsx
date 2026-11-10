import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { programs } from '../data/schoolData';
import { PAYMENT_LINKS } from '../data/paymentLinks';
import { ArrowLeft, CheckCircle } from 'lucide-react';

const money = (n) => `$${Number(n).toLocaleString('en-US')}`;

export default function Checkout() {
  const { programId } = useParams();
  const navigate = useNavigate();
  const [method, setMethod] = useState('plan'); // 'full' | 'plan'

  const program = programs.find((p) => p.id === programId);

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

  const links = PAYMENT_LINKS[programId] || {};
  const down = program.downPayment || 0;
  const count = program.installmentCount || 0;
  const amount = program.installmentAmount || 0;
  const hasPlan = down > 0 && count > 0 && amount > 0;
  const planTotal = hasPlan ? down + count * amount : 0;
  const fullAvailable = Boolean(links.full);
  const planAvailable = Boolean(links.deposit) && hasPlan;
  const planOffered = hasPlan;

  // Fall back to whichever option actually has a live link.
  const active = method === 'full' && fullAvailable ? 'full' : planAvailable ? 'plan' : 'full';
  const activeLink = active === 'full' ? links.full : links.deposit;
  const dueToday = active === 'full' ? program.price : down;
  const balance = active === 'full' ? 0 : program.price - down;

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
          <p className="mt-2 text-blue-100">Choose how you want to pay — secure checkout powered by Stripe</p>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="bg-white rounded-lg shadow-lg p-8">

            {/* Program + tuition */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
              <p className="text-lg font-bold text-gray-900 mb-1">{program.name}</p>
              <p className="text-sm text-gray-600 mb-4">{program.shortDescription}</p>
              <div className="flex items-center justify-between border-t border-blue-200 pt-4">
                <span className="font-semibold text-gray-700">Tuition</span>
                <span className="text-3xl font-bold text-blue-700">{money(program.price)}</span>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                No registration fee. No credit check. No interest.
              </p>
            </div>

            {/* Method selector */}
            <h2 className="text-2xl font-bold mb-4">How would you like to pay?</h2>
            <div className="space-y-4 mb-8">

              {/* Pay in full */}
              <button
                type="button"
                onClick={() => fullAvailable && setMethod('full')}
                disabled={!fullAvailable}
                className={`w-full text-left border-2 rounded-lg p-5 transition ${
                  active === 'full' && fullAvailable
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300'
                } ${!fullAvailable ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-bold text-lg text-gray-900">Pay in Full</p>
                    <p className="text-sm text-gray-600 mt-1">
                      One payment of {money(program.price)} — nothing else owed. Done today.
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-xl font-bold text-blue-700">{money(program.price)}</p>
                    <p className="text-xs text-gray-500">today</p>
                  </div>
                </div>
                {!fullAvailable && (
                  <p className="text-xs text-amber-700 mt-3">
                    Online full payment is not set up yet — call 636-242-5722 and we will take it by phone.
                  </p>
                )}
              </button>

              {/* Payment plan — only when this program actually offers one */}
              {planOffered && (
                <button
                  type="button"
                  onClick={() => planAvailable && setMethod('plan')}
                  disabled={!planAvailable}
                  className={`w-full text-left border-2 rounded-lg p-5 transition ${
                    active === 'plan' && planAvailable
                      ? 'border-orange-500 bg-orange-50'
                      : 'border-gray-200 hover:border-orange-300'
                  } ${!planAvailable ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-bold text-lg text-gray-900">
                        Payment Plan <span className="text-sm font-semibold text-orange-600">— most popular</span>
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        {money(down)} down today, then {count} monthly payments of {money(amount)}.
                        Same total of {money(planTotal)}. No interest, no credit check.
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-xl font-bold text-orange-600">{money(down)}</p>
                      <p className="text-xs text-gray-500">today</p>
                    </div>
                  </div>
                  {!planAvailable && (
                    <p className="text-xs text-amber-700 mt-3">
                      Online enrollment for the {money(down)} down payment is not live yet — call 636-242-5722 and we will set you up.
                    </p>
                  )}
                </button>
              )}

              {!planOffered && (
                <div className="w-full border-2 border-gray-200 bg-gray-50 rounded-lg p-5">
                  <p className="font-bold text-gray-900">Full payment only on this program</p>
                  <p className="text-sm text-gray-600 mt-1">
                    {program.name} requires the full {money(program.price)} at enrollment. No down payment and no
                    payment plan are offered — call{' '}
                    <a href="tel:6362425722" className="font-semibold text-blue-700">636-242-5722</a> with questions.
                  </p>
                </div>
              )}
            </div>

            {/* Schedule for the chosen method */}
            <div className="border border-gray-200 rounded-lg overflow-hidden mb-8">
              <div className="bg-gray-50 px-5 py-3 border-b border-gray-200">
                <p className="font-semibold text-gray-800">
                  {active === 'full' ? 'Your payment' : 'Your payment schedule'}
                </p>
              </div>
              <table className="w-full text-sm">
                <tbody>
                  {active === 'full' ? (
                    <tr className="border-b border-gray-100">
                      <td className="px-5 py-3 text-gray-700">Tuition paid in full today</td>
                      <td className="px-5 py-3 text-right font-bold text-gray-900">{money(program.price)}</td>
                    </tr>
                  ) : (
                    <>
                      <tr className="border-b border-gray-100 bg-orange-50">
                        <td className="px-5 py-3 text-gray-800 font-semibold">Down payment — today</td>
                        <td className="px-5 py-3 text-right font-bold text-orange-700">{money(down)}</td>
                      </tr>
                      {Array.from({ length: count }).map((_, i) => (
                        <tr key={i} className="border-b border-gray-100">
                          <td className="px-5 py-3 text-gray-700">
                            Payment {i + 1} <span className="text-gray-400">— month {i + 1}</span>
                          </td>
                          <td className="px-5 py-3 text-right text-gray-900">{money(amount)}</td>
                        </tr>
                      ))}
                    </>
                  )}
                  <tr className="bg-gray-50">
                    <td className="px-5 py-3 font-bold text-gray-900">Total tuition</td>
                    <td className="px-5 py-3 text-right font-bold text-gray-900">
                      {money(active === 'full' ? program.price : planTotal)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* CTA */}
            {activeLink ? (
              <button
                onClick={() => { window.location.href = activeLink; }}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg transition text-lg flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                {active === 'full'
                  ? `Pay ${money(program.price)} in Full — Secure Payment`
                  : `Pay ${money(down)} Today — Start Payment Plan`}
              </button>
            ) : (
              <a
                href="tel:6362425722"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg transition text-lg flex items-center justify-center gap-2"
              >
                Call 636-242-5722 to Enroll
              </a>
            )}

            <div className="mt-4 bg-gray-50 border border-gray-200 rounded-lg p-4 text-xs text-gray-700">
              <p className="font-bold text-gray-900 mb-1">What Stripe will charge</p>
              <p>
                {active === 'full'
                  ? `${money(program.price)} — one time, today. Nothing further is owed.`
                  : `${money(down)} — one time, today. Your ${count} payments of ${money(amount)} are invoiced by BTI, not charged by Stripe.`}
              </p>
            </div>

            <p className="text-center text-xs text-gray-500 mt-4">
              {active === 'full'
                ? `You will be redirected to Stripe to pay the full ${money(program.price)} tuition today.`
                : `You will be redirected to Stripe to pay the ${money(down)} down payment today. The remaining ${money(balance)} is billed directly by BTI in ${count} monthly payments of ${money(amount)} — we invoice you, nothing is auto-charged.`}
            </p>

            <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-500">
              <CheckCircle size={16} className="text-green-600" />
              <span>Secure payment powered by Stripe</span>
            </div>
          </div>

          <div className="mt-6 text-center text-sm text-gray-600">
            <p>
              Questions about payment? Call{' '}
              <a href="tel:6362425722" className="text-blue-600 font-semibold">636-242-5722</a> or email{' '}
              <a href="mailto:admissions@btieducation.com" className="text-blue-600 font-semibold">admissions@btieducation.com</a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
