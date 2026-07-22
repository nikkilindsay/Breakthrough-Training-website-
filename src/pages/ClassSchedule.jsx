import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, Users, ArrowRight, CheckCircle } from 'lucide-react';

const cohortDates = [
  { date: 'July 28, 2026', status: 'enrolling', spotsLeft: 'Limited Seats' },
  { date: 'August 25, 2026', status: 'upcoming', spotsLeft: 'Open' },
  { date: 'September 22, 2026', status: 'upcoming', spotsLeft: 'Open' },
  { date: 'October 20, 2026', status: 'upcoming', spotsLeft: 'Open' },
  { date: 'November 17, 2026', status: 'upcoming', spotsLeft: 'Open' },
  { date: 'December 15, 2026', status: 'upcoming', spotsLeft: 'Open' },
  { date: 'January 12, 2027', status: 'upcoming', spotsLeft: 'Open' },
  { date: 'February 9, 2027', status: 'upcoming', spotsLeft: 'Open' },
];

export default function ClassSchedule() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-900 via-purple-800 to-blue-900 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-6xl mx-auto px-4 text-center">
          <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Calendar size={36} className="text-orange-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Class Schedule</h1>
          <p className="text-xl text-purple-100 max-w-3xl mx-auto">
            CNA Hybrid Program cohorts start every 4th Tuesday. Find your start date and enroll today.
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">How the Hybrid Program Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-orange-600 font-bold text-lg">1</span>
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Days 1 & 2</h3>
            <p className="text-gray-600 text-sm">In-person classroom instruction at our St. Louis facility to kick off your cohort</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-blue-600 font-bold text-lg">2</span>
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Online Theory</h3>
            <p className="text-gray-600 text-sm">Complete remaining theory classes online at your pace through our student app</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-green-600 font-bold text-lg">3</span>
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Clinical Hours</h3>
            <p className="text-gray-600 text-sm">100+ hours of supervised clinical practice at local healthcare facilities</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-purple-600 font-bold text-lg">4</span>
            </div>
            <h3 className="font-bold text-gray-900 mb-2">State Exam</h3>
            <p className="text-gray-600 text-sm">Take and pass the Missouri CNA state certification exam</p>
          </div>
        </div>

        {/* Schedule Table */}
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Upcoming Cohort Start Dates</h2>
        <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
          New cohorts begin every 4th Tuesday. Each cohort starts with 2 days of in-person instruction, 
          then transitions to online learning. Enroll early — seats are limited!
        </p>

        <div className="max-w-3xl mx-auto">
          {cohortDates.map((cohort, idx) => (
            <div 
              key={idx} 
              className={`flex flex-col md:flex-row items-start md:items-center justify-between p-6 mb-4 rounded-xl border ${
                cohort.status === 'enrolling' 
                  ? 'bg-orange-50 border-orange-200 shadow-md' 
                  : 'bg-white border-gray-200'
              }`}
            >
              <div className="flex items-center gap-4 mb-3 md:mb-0">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  cohort.status === 'enrolling' ? 'bg-orange-500' : 'bg-gray-200'
                }`}>
                  <Calendar size={18} className={cohort.status === 'enrolling' ? 'text-white' : 'text-gray-500'} />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-900">{cohort.date}</h3>
                  <p className="text-sm text-gray-500">Tuesday Start Date</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  cohort.status === 'enrolling' 
                    ? 'bg-orange-500 text-white' 
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {cohort.status === 'enrolling' ? '🔥 Now Enrolling' : cohort.spotsLeft}
                </span>
                <Link 
                  to="/enroll" 
                  className={`px-4 py-2 rounded-lg font-semibold text-sm transition-colors ${
                    cohort.status === 'enrolling'
                      ? 'bg-orange-500 text-white hover:bg-orange-600'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Enroll Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Program Details */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Program Details</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Clock size={20} className="text-orange-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Duration</h4>
                    <p className="text-gray-600">5 weeks total (2 days in-person + online + clinicals)</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin size={20} className="text-orange-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Location</h4>
                    <p className="text-gray-600">11862 Lackland Rd, Suite BTI, St. Louis, MO 63146</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users size={20} className="text-orange-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Class Size</h4>
                    <p className="text-gray-600">Small cohorts for personalized attention</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">What's Included</h2>
              <div className="space-y-3">
                {[
                  'In-person orientation & instruction (first 2 days)',
                  'Online theory coursework via student app',
                  '100+ hours supervised clinical practice',
                  'State exam preparation & review',
                  'All study materials and textbook access',
                  'Job placement assistance',
                  'Priority hiring through Breakthrough Healthcare'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <CheckCircle size={18} className="text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-orange-500 to-orange-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Your CNA Career?</h2>
          <p className="text-orange-100 text-lg mb-8">
            Enroll in our next cohort and be on your way to certification in just 5 weeks.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/enroll" className="bg-white text-orange-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors inline-flex items-center justify-center gap-2">
              Enroll Now <ArrowRight size={18} />
            </Link>
            <Link to="/contact" className="border-2 border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-white/10 transition-colors inline-flex items-center justify-center gap-2">
              Contact Us
            </Link>
          </div>
          <p className="text-orange-100 text-sm mt-6">
            Questions? Call us at <a href="tel:636-242-5722" className="text-white font-semibold underline">636-242-5722</a> or email <a href="mailto:admissions@btieducation.com" className="text-white font-semibold underline">admissions@btieducation.com</a>
          </p>
        </div>
      </section>
    </div>
  );
}
