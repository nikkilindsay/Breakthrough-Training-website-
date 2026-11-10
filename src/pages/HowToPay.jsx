import React, { useState } from 'react';
import { CreditCard, DollarSign, Heart, Clock, CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HowToPay() {
  const [showAll, setShowAll] = useState(false);
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">How to Pay for Classes</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Tuition is the same whether you pay it once or spread it across a few payments.
            Most students pay in full at enrollment &mdash; one payment, seat confirmed, nothing left to track.
            A BTI payment plan is there if you would rather split it up.
          </p>
        </div>
      </section>

      {/* Funding Options */}
      <section className="py-16 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <span className="inline-block bg-green-600 text-white text-sm font-bold px-4 py-1 rounded-full mb-4">NEW — FUNDING OPTIONS</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How to Pay for Your CNA Training</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Most of our students may qualify to have their CNA training paid for. We'll help you apply for every single one.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
              <h3 className="text-xl font-bold text-gray-900 mb-2">💰 Tuition Reimbursement (Federal OBRA '87 Law)</h3>
              <p className="text-gray-700 mb-2">Here's the best-kept secret in healthcare: if you're hired by a Medicaid/Medicare-certified nursing facility within <strong>12 months</strong> of passing your CNA exam, federal law requires the facility to <strong>reimburse your training and testing costs</strong>.</p>
              <p className="text-green-700 font-semibold">Translation: Train now. Get hired. Get your tuition back.</p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
              <h3 className="text-xl font-bold text-gray-900 mb-2">🏛️ WIOA / Missouri Job Centers</h3>
              <p className="text-gray-700 mb-2">If you're unemployed, underemployed, or a young adult, the Workforce Innovation & Opportunity Act may cover your tuition through your local Missouri Job Center.</p>
              <p className="text-blue-700 font-semibold">Visit your nearest Job Center and ask about training funds for CNA programs.</p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-500">
              <h3 className="text-xl font-bold text-gray-900 mb-2">🌐 SLATE — St. Louis City Residents</h3>
              <p className="text-gray-700 mb-2">Live in the City of St. Louis? SLATE (the city's workforce agency) offers eligible residents up to <strong>$10,000</strong> in training assistance for tuition, books, and supplies.</p>
              <p className="text-purple-700 font-semibold">That's more than 8x our self-paced tuition. Yes, really.</p>
            </div>

            {showAll && (
              <>
              <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-orange-500">
              <h3 className="text-xl font-bold text-gray-900 mb-2">🍽️ SkillUP — SNAP Recipients</h3>
              <p className="text-gray-700 mb-2">Receive SNAP (food stamp) benefits? Missouri's SkillUP program can pay for short-term training, books, supplies, uniforms — even help with transportation.</p>
              <p className="text-orange-700 font-semibold">Ask us how to connect with a SkillUP provider near you.</p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-teal-500">
              <h3 className="text-xl font-bold text-gray-900 mb-2">🎓 Missouri Fast Track Grant</h3>
              <p className="text-gray-700 mb-2">25 or older (or out of school 2+ years), earning under $40,000 single / $80,000 joint, and no bachelor's degree? The Fast Track Workforce Incentive Grant may cover your tuition and fees.</p>
              <p className="text-teal-700 font-semibold">Healthcare is a designated high-need field — CNAs count.</p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-red-500">
              <h3 className="text-xl font-bold text-gray-900 mb-2">✈️ MyCAA — Military Spouses</h3>
              <p className="text-gray-700 mb-2">Military spouses (of E1–E6, W1–W2, O1–O3 service members) can receive up to <strong>$4,000</strong> for portable career training through MyCAA. CNA is a perfect portable career for every duty station.</p>
              <p className="text-red-700 font-semibold">Scott AFB families — we're 25 minutes away!</p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-indigo-500">
              <h3 className="text-xl font-bold text-gray-900 mb-2">🏥 Employer Sponsorship</h3>
              <p className="text-gray-700 mb-2">Some nursing homes, assisted living communities, and home health agencies will sponsor your training in exchange for joining their team after certification.</p>
              <p className="text-indigo-700 font-semibold">Already have an employer in mind? Have them call us — we offer partnership rates.</p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-amber-500">
              <h3 className="text-xl font-bold text-gray-900 mb-2">♿ Vocational Rehabilitation</h3>
              <p className="text-gray-700 mb-2">Missouri Vocational Rehabilitation helps people with disabilities pay for job training. If you have a documented disability, VR may cover your full training costs.</p>
              <p className="text-amber-700 font-semibold">Contact your local VR office or ask us for guidance.</p>
            </div>
          </>
            )}

          </div>
          <div className="text-center mt-8">
            <button
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-2 text-green-700 font-bold hover:text-green-800 transition-colors"
            >
              {showAll ? 'Show fewer funding options' : 'See all 8 funding options'} <ArrowRight size={18} />
            </button>
          </div>

          <div className="text-center mt-10">
            <p className="text-gray-700 text-lg mb-4 font-semibold">Not sure which one fits you? That's literally our job.</p>
            <Link to="/contact" className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full transition-colors">
              Ask Us About Funding <ArrowRight size={18} />
            </Link>
            <p className="text-gray-500 text-xs mt-6 max-w-2xl mx-auto">
              Funding availability, eligibility, and amounts are determined by each program's administering agency and are subject to change. Reimbursement under OBRA '87 applies when hired by a Medicaid/Medicare-certified nursing facility within 12 months of certification, per federal and Missouri guidelines.
            </p>
          </div>
        </div>
      </section>

      {/* Payment Methods */}
      <section className="py-16 max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">Accepted Payment Methods</h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          We accept multiple forms of payment to make enrollment as easy as possible.
        </p>

        <div className="max-w-3xl mx-auto mb-16">
          <p className="text-center text-lg font-semibold text-gray-800 bg-white rounded-xl shadow-sm border border-gray-100 py-5 px-6">
            We accept cards, cash, Venmo and Zelle.
          </p>
        </div>
      </section>

      {/* BTI In-House Payment Plans */}
      <section className="py-16 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <span className="inline-block bg-orange-500 text-white text-sm font-bold px-4 py-1 rounded-full mb-4">BTI PAYMENT PLAN</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Pay in Full, or Spread It Out &mdash; Same Price Either Way</h2>
            <p className="text-lg text-blue-100 max-w-3xl mx-auto">
              Every program has one published tuition price. Pay it in full at enrollment and you are finished &mdash; no installments, nothing to track, no registration fee added on.
              If you would rather split it, each program also offers a BTI payment plan: a down payment plus a few fixed installments while you train, with no credit check, no interest
              and no outside lender. The total is identical on both paths.
            </p>
                <p className="text-sm text-gray-700 mt-3">
                  Changed your plans? Read the <Link to="/refund-policy" className="text-teal-700 underline font-semibold">cancellation, withdrawal and refund policy</Link> before you pay &mdash; three business days to cancel for a full refund, then a clock-hour based schedule.
                </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur rounded-xl p-6 border border-white/20">
              <h3 className="text-xl font-bold mb-1">Self-Paced CNA</h3>
              <p className="text-3xl font-bold text-white mb-1">$475</p>
              <p className="text-blue-200 text-sm mb-3">Pay in full at enrollment</p>
              <p className="text-blue-100 text-sm border-t border-white/20 pt-3"><span className="font-bold text-orange-300">Or a payment plan:</span> $75 down, then 4 payments of $100.</p>
            </div>
            <div className="bg-white rounded-xl p-6 text-gray-900 border-4 border-orange-500 relative">
              <span className="absolute -top-3 right-4 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">MOST POPULAR</span>
              <h3 className="text-xl font-bold mb-1">CNA Hybrid Program</h3>
              <p className="text-3xl font-bold text-gray-900 mb-1">$1,175</p>
              <p className="text-gray-600 text-sm mb-3">Pay in full at enrollment &middot; 5 weeks</p>
              <p className="text-gray-700 text-sm border-t border-gray-200 pt-3"><span className="font-bold text-orange-600">Or a payment plan:</span> $125 down, then 3 payments of $350 (balance $1,050).</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl p-6 border border-white/20">
              <h3 className="text-xl font-bold mb-1">Clinical Experience Only</h3>
              <p className="text-3xl font-bold text-white mb-1">$915</p>
              <p className="text-blue-200 text-sm mb-3">Pay in full at enrollment</p>
              <p className="text-blue-100 text-sm border-t border-white/20 pt-3">Full tuition at enrollment. No down payment and no payment plan on this program.</p>
            </div>
          </div>
          <div className="text-center mt-8">
            <p className="text-blue-100 text-sm max-w-2xl mx-auto">
              Your down payment reserves your seat, and there is no registration fee to lose if plans change. The balance must be paid in full
              before your certificate of completion is issued. Plan terms are set at enrollment - call
              <a href="tel:6362425722" className="font-bold underline"> 636-242-5722 </a> or ask admissions.
            </p>
          </div>
        </div>
      </section>

      {/* Payment Plans */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">Other Ways to Spread the Cost - Klarna, Affirm &amp; Afterpay</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Entirely optional. If you would rather finance through an outside lender than pay BTI directly,
            these services run their own application and set their own terms.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Klarna */}
            <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl p-8 border border-pink-200">
              <h3 className="text-2xl font-bold text-pink-700 mb-3">Klarna</h3>
              <p className="text-gray-700 mb-4">Split your tuition into 4 interest-free payments over 6 weeks.</p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-gray-700">
                  <CheckCircle size={16} className="text-pink-600" />
                  <span>4 interest-free payments</span>
                </li>
                <li className="flex items-center gap-2 text-gray-700">
                  <CheckCircle size={16} className="text-pink-600" />
                  <span>No hard credit check</span>
                </li>
                <li className="flex items-center gap-2 text-gray-700">
                  <CheckCircle size={16} className="text-pink-600" />
                  <span>Pay every 2 weeks</span>
                </li>
              </ul>
            </div>

            {/* Affirm */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-8 border border-blue-200">
              <h3 className="text-2xl font-bold text-blue-700 mb-3">Affirm</h3>
              <p className="text-gray-700 mb-4">Choose a monthly payment plan that fits your budget — 3 to 12 months.</p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-gray-700">
                  <CheckCircle size={16} className="text-blue-600" />
                  <span>Flexible monthly payments</span>
                </li>
                <li className="flex items-center gap-2 text-gray-700">
                  <CheckCircle size={16} className="text-blue-600" />
                  <span>Know your total upfront</span>
                </li>
                <li className="flex items-center gap-2 text-gray-700">
                  <CheckCircle size={16} className="text-blue-600" />
                  <span>No hidden fees</span>
                </li>
              </ul>
            </div>

            {/* Afterpay */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-8 border border-green-200">
              <h3 className="text-2xl font-bold text-green-700 mb-3">Afterpay</h3>
              <p className="text-gray-700 mb-4">Pay in 4 installments, every 2 weeks. Start your classes immediately.</p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-gray-700">
                  <CheckCircle size={16} className="text-green-600" />
                  <span>4 easy payments</span>
                </li>
                <li className="flex items-center gap-2 text-gray-700">
                  <CheckCircle size={16} className="text-green-600" />
                  <span>Interest-free</span>
                </li>
                <li className="flex items-center gap-2 text-gray-700">
                  <CheckCircle size={16} className="text-green-600" />
                  <span>Instant approval</span>
                </li>
              </ul>
            </div>
          </div>

          <p className="text-center text-gray-500 mt-8 text-sm">
            * Payment plan availability may vary. Contact us for details on which options are available for your program.
          </p>
        </div>
      </section>

      {/* Program Pricing */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">Program Tuition</h2>
          <p className="text-center text-gray-600 mb-12">Here's what each program costs — all materials and state test prep included.</p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-md p-8 border-t-4 border-blue-500">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Self-Paced CNA</h3>
              <p className="text-4xl font-bold text-blue-600 mb-1">$475</p>
              <p className="text-sm font-bold text-orange-600 mb-3">or $75 down + 4 payments of $100</p>
              <p className="text-gray-600 mb-4">100% online theory. Complete within 4 months at your own pace.</p>
              <Link to="/enroll" className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-800">
                Enroll Now <ArrowRight size={16} />
              </Link>
            </div>

            <div className="bg-white rounded-xl shadow-md p-8 border-t-4 border-purple-500 relative">
              <span className="absolute -top-3 right-4 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">MOST POPULAR</span>
              <h3 className="text-xl font-bold text-gray-900 mb-2">CNA Hybrid Program</h3>
              <p className="text-4xl font-bold text-purple-600 mb-1">$1,175</p>
              <p className="text-sm font-bold text-orange-600 mb-3">or $125 down + 3 payments of $350</p>
              <p className="text-gray-600 mb-4">5-week in-person + online. Next class starts October 20, 2026!</p>
              <Link to="/enroll" className="inline-flex items-center gap-2 text-purple-600 font-semibold hover:text-purple-800">
                Enroll Now <ArrowRight size={16} />
              </Link>
            </div>

            <div className="bg-white rounded-xl shadow-md p-8 border-t-4 border-green-500">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Clinical Experience Only</h3>
              <p className="text-4xl font-bold text-green-600 mb-1">$915</p>
              <p className="text-sm font-bold text-gray-500 mb-3">Full tuition at enrollment &mdash; no payment plan</p>
              <p className="text-gray-600 mb-4">Already completed theory? Finish your clinicals and get certified.</p>
              <Link to="/enroll" className="inline-flex items-center gap-2 text-green-600 font-semibold hover:text-green-800">
                Enroll Now <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Warren Collins Jr. Scholarship */}
      <section className="py-16 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-10">
            <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="text-orange-600" size={40} />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Warren Collins Jr. Scholarship</h2>
            <p className="text-lg text-gray-700 italic max-w-2xl mx-auto">
              "Named in honor of Warren Collins Jr., this scholarship represents a mother's belief that good can follow
              those we love, no matter the circumstances. It is a testament to redemption, second chances, and the
              power of investing in others."
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Scholarship Details</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle size={20} className="text-orange-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700"><strong>Award:</strong> Full tuition for the Self-Paced CNA Program ($475 value)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle size={20} className="text-orange-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700"><strong>Number Awarded:</strong> 3 per year</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle size={20} className="text-orange-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700"><strong>Nominations:</strong> Rolling &mdash; accepted year-round, no deadline</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle size={20} className="text-orange-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700"><strong>Open To:</strong> Anyone planning to enroll in a BTI program</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">How It Works</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">1</span>
                    <span className="text-gray-700">A church, ministry, or church outreach recommends someone from its congregation</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">2</span>
                    <span className="text-gray-700">The recommendation is one email: name, phone number, and a few sentences on why</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">3</span>
                    <span className="text-gray-700">We contact the nominee within five business days to confirm program fit</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">4</span>
                    <span className="text-gray-700">Our selection committee awards three scholarships each calendar year</span>
                  </li>
                </ul>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link to="/scholarship" className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-5 py-2.5 rounded-lg">
                    Scholarship details
                  </Link>
                  <a href="mailto:admissions@btieducation.com?subject=Scholarship%20Nomination" className="inline-flex items-center gap-2 border-2 border-orange-500 text-orange-600 font-bold px-5 py-2.5 rounded-lg hover:bg-orange-50">
                    Nominate someone
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-blue-900 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Healthcare Career?</h2>
          <p className="text-blue-200 text-lg mb-8">
            Questions about tuition, paying in full, or a payment plan? Call us and we will go through both options with you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/enroll" className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full transition-colors">
              Enroll Now
            </Link>
            <a href="tel:6362425722" className="bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-8 rounded-full border border-white/30 transition-colors">
              Call 636-242-5722
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
