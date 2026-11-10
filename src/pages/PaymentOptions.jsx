import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, CreditCard, CalendarDays, ShieldCheck, Phone } from 'lucide-react';
import { programs, schoolData } from '../data/schoolData';

// Derived from schoolData so a price change in one place updates every page.
const plans = Object.fromEntries(
  programs.map((p) => [
    p.id,
    {
      count: p.installmentCount || 0,
      installments: p.installmentCount
        ? `${p.installmentCount} payments of $${p.installmentAmount.toLocaleString()}`
        : '',
    },
  ])
);

export default function PaymentOptions() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-6xl mx-auto px-4 text-center">
          <span className="inline-block bg-orange-500 text-white text-sm font-bold px-4 py-1 rounded-full mb-5">
            TUITION &amp; PAYMENT OPTIONS
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">One Price. Two Ways to Pay.</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Pay your tuition in full at enrollment, or spread it across a few scheduled payments.
            The total is exactly the same either way &mdash; no interest, no credit check, no registration fee.
          </p>
        </div>
      </section>

      {/* Two paths explained */}
      <section className="py-14 bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 grid md:grid-cols-2 gap-6">
          <div className="rounded-xl border-2 border-blue-200 bg-blue-50 p-6">
            <div className="flex items-center gap-3 mb-3">
              <span className="bg-blue-600 text-white rounded-full p-2"><CreditCard size={20} /></span>
              <h2 className="text-xl font-bold text-gray-900">Option 1 &mdash; Pay in full</h2>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">
              One payment at enrollment and your seat is confirmed. Nothing further is owed, nothing
              is scheduled, and your certificate is not held for a balance. This is the simplest and
              fastest way to enroll.
            </p>
          </div>
          <div className="rounded-xl border-2 border-orange-200 bg-orange-50 p-6">
            <div className="flex items-center gap-3 mb-3">
              <span className="bg-orange-500 text-white rounded-full p-2"><CalendarDays size={20} /></span>
              <h2 className="text-xl font-bold text-gray-900">Option 2 &mdash; BTI payment plan</h2>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">
              A down payment reserves your seat, then a fixed number of payments while you train.
              No credit check, no interest, no outside lender. The remaining balance must be cleared
              before your certificate of completion is issued.
            </p>
          </div>
        </div>
      </section>

      {/* Per program */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-3">Pick Your Program</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Same tuition on both paths. Choose whichever fits how you want to handle it.
          </p>

          <div className="grid md:grid-cols-3 gap-6 items-stretch">
            {programs.map((program) => {
              const plan = plans[program.id];
              return (
                <div key={program.id} className="bg-white rounded-xl shadow-md p-7 flex flex-col border-t-4 border-blue-600">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{program.name}</h3>
                  <p className="text-xs text-gray-500 mb-5">{program.duration} &middot; state-approved</p>

                  <div className="mb-5">
                    <p className="text-4xl font-bold text-blue-700">${program.price.toLocaleString()}</p>
                    <p className="text-sm text-gray-600 mt-1">Total tuition</p>
                  </div>

                  <div className="rounded-lg bg-blue-50 border border-blue-200 px-4 py-3 mb-3">
                    <p className="text-xs font-bold uppercase tracking-wide text-blue-700 mb-1">Pay in full</p>
                    <p className="text-sm font-bold text-gray-900">${program.price.toLocaleString()} once, at enrollment</p>
                    <p className="text-xs text-gray-600 mt-1">Seat confirmed. Nothing scheduled.</p>
                  </div>

                  {plan.count > 0 ? (
                    <div className="rounded-lg bg-orange-50 border border-orange-200 px-4 py-3 mb-6">
                      <p className="text-xs font-bold uppercase tracking-wide text-orange-700 mb-1">Or the payment plan</p>
                      <p className="text-sm font-bold text-gray-900">
                        ${program.downPayment} down + {plan.installments}
                      </p>
                      <p className="text-xs text-gray-600 mt-1">
                        Balance ${(program.price - program.downPayment).toLocaleString()}, same total, no interest.
                      </p>
                    </div>
                  ) : (
                    <div className="rounded-lg bg-gray-50 border border-gray-200 px-4 py-3 mb-6">
                      <p className="text-xs font-bold uppercase tracking-wide text-gray-500 mb-1">Full payment only</p>
                      <p className="text-sm text-gray-700">This program is paid in full at enrollment. No down payment, no payment plan.</p>
                    </div>
                  )}

                  <div className="mt-auto">
                    <Link
                      to="/enroll"
                      className="inline-flex items-center justify-center gap-2 w-full bg-blue-900 hover:bg-blue-800 text-white font-bold py-3 px-5 rounded-lg transition-colors"
                    >
                      Enroll in {program.name.replace(' Program', '').replace(' Experience Only', '')}
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Same price proof */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">The Math, in Full</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-blue-900 text-white">
                  <th className="text-left p-3 font-semibold">Program</th>
                  <th className="text-right p-3 font-semibold">Tuition</th>
                  <th className="text-right p-3 font-semibold">Down</th>
                  <th className="text-right p-3 font-semibold">Payments</th>
                  <th className="text-right p-3 font-semibold">Adds up to</th>
                </tr>
              </thead>
              <tbody>
                {programs.map((p) => {
                  const plan = plans[p.id];
                  return (
                    <tr key={p.id} className="border-b border-gray-200">
                      <td className="p-3 font-semibold text-gray-900">{p.name}</td>
                      <td className="p-3 text-right text-gray-800">${p.price.toLocaleString()}</td>
                      <td className="p-3 text-right text-gray-800">{plan.count > 0 ? `$${p.downPayment}` : '—'}</td>
                      <td className="p-3 text-right text-gray-800">
                        {plan.count > 0
                          ? `${plan.count} \u00d7 $${((p.price - p.downPayment) / plan.count).toLocaleString(undefined, { maximumFractionDigits: 2 })}`
                          : '—'}
                      </td>
                      <td className="p-3 text-right font-bold text-green-700">${p.price.toLocaleString()}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-600 mt-4 text-center">
            Down payment plus installments equals the published tuition on every program. No interest,
            no finance charge, no registration fee.
          </p>
        </div>
      </section>

      {/* What's included / not included */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <CheckCircle className="text-green-600" size={20} /> Included in tuition
            </h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>All 175 clock hours &mdash; 75 theory and 100 supervised clinical</li>
              <li>Instruction by a DHSS-approved Registered Nurse</li>
              <li>Skills lab, equipment and LMS access</li>
              <li>Clinical placement coordination with partner facilities</li>
              <li>Resume and job-placement assistance</li>
            </ul>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <ShieldCheck className="text-blue-700" size={20} /> Paid separately
            </h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>State certification exam fee &mdash; paid directly to the testing vendor</li>
              <li>Background check, if required by a clinical site</li>
              <li>Uniform and badge</li>
              <li>Textbook, if you choose to purchase rather than rent</li>
            </ul>
            <p className="text-xs text-gray-500 mt-4">
              These are third-party costs and are not part of tuition on either payment path.
            </p>
          </div>
        </div>
      </section>

      {/* Third party optional */}
      <section className="py-14 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Outside financing is optional</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm">
            Some students prefer to finance through Klarna, Affirm or Afterpay instead of paying BTI directly.
            Those services run their own application and set their own terms. You do not need them to enroll &mdash;
            the BTI payment plan above requires no credit check and adds no interest.
          </p>
        </div>
      </section>

      {/* Refund note */}
      <section className="py-12 bg-blue-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-2">If your plans change</h2>
          <p className="text-sm text-gray-700 max-w-2xl mx-auto">
            You have three business days from signing to cancel for a full refund. After that, refunds follow a
            clock-hour schedule based on how much of the program you have completed.
          </p>
          <Link to="/refund-policy" className="inline-flex items-center gap-2 text-blue-800 font-semibold mt-4 hover:underline">
            Read the full cancellation and refund policy <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-blue-900 text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">Questions about tuition?</h2>
          <p className="text-blue-100 mb-8">
            Call and we will walk through both options with you &mdash; pay in full or a payment plan &mdash;
            and tell you which one fits your situation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/enroll" className="inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full transition-colors">
              Enroll Now <ArrowRight size={18} />
            </Link>
            <a href={`tel:${schoolData.phone}`} className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-8 rounded-full border border-white/30 transition-colors">
              <Phone size={18} /> {schoolData.phone}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
