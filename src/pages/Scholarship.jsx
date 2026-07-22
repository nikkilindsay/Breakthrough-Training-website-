import React from 'react';
import { Heart, Award, Calendar, Users, FileText, CheckCircle, ArrowRight, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Scholarship() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-6xl mx-auto px-4 text-center">
          <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Award size={40} className="text-yellow-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">The Warren Collins Jr. Scholarship</h1>
          <p className="text-2xl text-yellow-300 font-semibold mb-4">Full Tuition CNA Training — 2 Scholarships Awarded Annually</p>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            A testament to redemption, second chances, and the power of investing in others.
          </p>
        </div>
      </section>

      {/* The Story */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="text-orange-600" size={32} />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">The Story Behind the Scholarship</h2>
          </div>
          <blockquote className="text-lg text-gray-700 italic leading-relaxed border-l-4 border-orange-400 pl-6 mb-6">
            "Named in honor of Warren Collins Jr., this scholarship represents a mother's belief that good can
            follow those we love, no matter the circumstances. It is a testament to redemption, second chances,
            and the power of investing in others."
          </blockquote>
          <p className="text-gray-700 text-lg leading-relaxed">
            At Breakthrough Training Institute, we believe education is the great equalizer — and that everyone
            deserves a breakthrough. Each year, two students who demonstrate financial need or personal hardship
            receive full tuition for our Self-Paced CNA Program, opening the door to a stable, meaningful career
            in healthcare.
          </p>
        </div>
      </section>

      {/* Details Grid */}
      <section className="py-16 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <div className="bg-white rounded-xl shadow-md p-6 text-center">
              <Award className="text-orange-500 mx-auto mb-3" size={32} />
              <h3 className="font-bold text-gray-900 mb-1">Award</h3>
              <p className="text-gray-600 text-sm">Full tuition for the Self-Paced CNA Program ($475 value)</p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6 text-center">
              <Users className="text-orange-500 mx-auto mb-3" size={32} />
              <h3 className="font-bold text-gray-900 mb-1">Awarded</h3>
              <p className="text-gray-600 text-sm">2 scholarships per year</p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6 text-center">
              <Calendar className="text-orange-500 mx-auto mb-3" size={32} />
              <h3 className="font-bold text-gray-900 mb-1">Deadline</h3>
              <p className="text-gray-600 text-sm">October 31, 2026</p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6 text-center">
              <CheckCircle className="text-orange-500 mx-auto mb-3" size={32} />
              <h3 className="font-bold text-gray-900 mb-1">Open To</h3>
              <p className="text-gray-600 text-sm">Anyone planning to enroll in a BTI program</p>
            </div>
          </div>

          {/* Eligibility & How to Apply */}
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <FileText className="text-orange-500" size={28} />
              Eligibility & How to Apply
            </h2>
            <ol className="space-y-4 mb-8">
              <li className="flex items-start gap-4">
                <span className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">1</span>
                <p className="text-gray-700 text-lg">Must be enrolling in a BTI CNA program</p>
              </li>
              <li className="flex items-start gap-4">
                <span className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">2</span>
                <p className="text-gray-700 text-lg">St. Louis area resident</p>
              </li>
              <li className="flex items-start gap-4">
                <span className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">3</span>
                <p className="text-gray-700 text-lg">Demonstrate financial need or personal hardship</p>
              </li>
              <li className="flex items-start gap-4">
                <span className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">4</span>
                <p className="text-gray-700 text-lg">Submit a short essay (250–500 words): <em>"Why I want to become a CNA and how this scholarship would impact my life"</em></p>
              </li>
              <li className="flex items-start gap-4">
                <span className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">5</span>
                <p className="text-gray-700 text-lg">Provide 3 references (2 professional or academic, 1 personal) with name, relationship, phone number, and email</p>
              </li>
            </ol>

            <div className="bg-blue-50 rounded-xl p-6 text-center">
              <Mail className="text-blue-600 mx-auto mb-3" size={32} />
              <p className="text-gray-800 font-semibold text-lg mb-2">Submit your application to:</p>
              <a
                href="mailto:admissions@btieducation.com?subject=Warren Collins Jr. Scholarship Application"
                className="text-blue-600 font-bold text-xl hover:text-blue-800"
              >
                admissions@btieducation.com
              </a>
              <p className="text-gray-600 text-sm mt-2">Subject line: "Warren Collins Jr. Scholarship Application"</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-900 to-blue-700 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Your Breakthrough Starts Here</h2>
          <p className="text-xl text-blue-100 mb-8">
            Even if you don't win the scholarship, don't stop there — explore all the ways your training could be funded.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/how-to-pay" className="bg-yellow-400 hover:bg-yellow-300 text-blue-900 font-bold py-3 px-8 rounded-full transition-colors inline-flex items-center justify-center gap-2">
              See All Funding Options <ArrowRight size={18} />
            </Link>
            <Link to="/enroll" className="bg-white hover:bg-gray-100 text-blue-900 font-bold py-3 px-8 rounded-full transition-colors inline-flex items-center justify-center gap-2">
              Enroll Now <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
