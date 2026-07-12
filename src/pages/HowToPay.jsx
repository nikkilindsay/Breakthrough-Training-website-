import React from 'react';
import { CreditCard, DollarSign, Heart, Clock, CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HowToPay() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">How to Pay for Classes</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            We believe finances should never stand between you and your healthcare career. 
            Explore our flexible payment options below.
          </p>
        </div>
      </section>

      {/* Payment Methods */}
      <section className="py-16 max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">Accepted Payment Methods</h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          We accept multiple forms of payment to make enrollment as easy as possible.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {/* Credit/Debit Card */}
          <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-shadow border border-gray-100">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CreditCard className="text-blue-600" size={32} />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Credit & Debit Cards</h3>
            <p className="text-gray-600 text-sm">Visa, Mastercard, American Express, Discover</p>
          </div>

          {/* Cash */}
          <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-shadow border border-gray-100">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <DollarSign className="text-green-600" size={32} />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Cash</h3>
            <p className="text-gray-600 text-sm">Accepted in person at our office by appointment</p>
          </div>

          {/* Venmo */}
          <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-shadow border border-gray-100">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="text-purple-600" width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.5 2.25c.75 1.23 1.08 2.5 1.08 4.1 0 5.1-4.35 11.72-7.88 16.4H6.15L3.42 3.62l5.73-.52 1.6 12.83c1.5-2.45 3.35-6.3 3.35-8.93 0-1.5-.26-2.53-.65-3.35l5.05-1.4z"/>
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Venmo</h3>
            <p className="text-gray-600 text-sm">Send payment via Venmo — details provided at enrollment</p>
          </div>

          {/* Zelle */}
          <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-shadow border border-gray-100">
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="text-indigo-600" width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13.559 24h-2.841a.483.483 0 0 1-.483-.483v-5.074H4.81a.483.483 0 0 1-.369-.793l9.18-10.873V12.5h5.57a.483.483 0 0 1 .37.793l-9.18 10.873v-.166H13.559z"/>
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Zelle</h3>
            <p className="text-gray-600 text-sm">Instant bank transfer via Zelle — details provided at enrollment</p>
          </div>
        </div>
      </section>

      {/* Payment Plans */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">Payment Plans Available</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Can't pay all at once? No problem. We partner with trusted buy-now-pay-later services 
            so you can start your training today and pay over time.
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
              <p className="text-4xl font-bold text-blue-600 mb-4">$475</p>
              <p className="text-gray-600 mb-4">100% online theory. Complete within 4 months at your own pace.</p>
              <Link to="/enroll" className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-800">
                Enroll Now <ArrowRight size={16} />
              </Link>
            </div>

            <div className="bg-white rounded-xl shadow-md p-8 border-t-4 border-purple-500 relative">
              <span className="absolute -top-3 right-4 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">MOST POPULAR</span>
              <h3 className="text-xl font-bold text-gray-900 mb-2">CNA Hybrid Program</h3>
              <p className="text-4xl font-bold text-purple-600 mb-4">$1,175</p>
              <p className="text-gray-600 mb-4">5-week in-person + online. Next class starts July 7!</p>
              <Link to="/enroll" className="inline-flex items-center gap-2 text-purple-600 font-semibold hover:text-purple-800">
                Enroll Now <ArrowRight size={16} />
              </Link>
            </div>

            <div className="bg-white rounded-xl shadow-md p-8 border-t-4 border-green-500">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Clinical Experience Only</h3>
              <p className="text-4xl font-bold text-green-600 mb-4">$915</p>
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
                    <span className="text-gray-700"><strong>Number Awarded:</strong> 2 per year</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle size={20} className="text-orange-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700"><strong>Deadline:</strong> October 31, 2026</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle size={20} className="text-orange-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700"><strong>Open To:</strong> Anyone planning to enroll in a BTI program</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Eligibility & How to Apply</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">1</span>
                    <span className="text-gray-700">Must be enrolling in a BTI CNA program</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">2</span>
                    <span className="text-gray-700">St. Louis area resident</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">3</span>
                    <span className="text-gray-700">Demonstrate financial need or personal hardship</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">4</span>
                    <span className="text-gray-700">Submit a short essay (250–500 words): <em>"Why I want to become a CNA and how this scholarship would impact my life"</em></span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">5</span>
                    <span className="text-gray-700">Provide 3 references (2 professional or academic, 1 personal) with name, relationship, phone number, and email</span>
                  </li>
                </ul>

                <div className="mt-6 bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <p className="text-gray-800 font-semibold mb-1">Submit your application to:</p>
                  <a href="mailto:btiadmissionoffice@gmail.com?subject=Warren Collins Jr. Scholarship Application" 
                     className="text-orange-600 font-bold hover:text-orange-800 text-lg">
                    btiadmissionoffice@gmail.com
                  </a>
                  <p className="text-gray-600 text-sm mt-1">Subject line: "Warren Collins Jr. Scholarship Application"</p>
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
            Don't let finances hold you back. Contact us today to discuss your payment options.
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
