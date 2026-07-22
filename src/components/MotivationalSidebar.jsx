import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap } from 'lucide-react';
import enrollmentConfig from '../data/enrollmentConfig.json';

export default function MotivationalSidebar() {
  const [enrollmentData, setEnrollmentData] = useState(enrollmentConfig);

  useEffect(() => {
    // Fetch enrollment data (can be replaced with API call later)
    setEnrollmentData(enrollmentConfig);
  }, []);
  return (
    <div className="bg-gradient-to-br from-primary via-teal-600 to-secondary text-white rounded-2xl p-8 shadow-2xl border-4 border-yellow-400">
      {/* Icon */}
      <div className="flex justify-center mb-4">
        <Zap size={48} className="text-yellow-300" />
      </div>

      {/* Main Heading */}
      <h3 className="text-3xl font-bold text-center mb-2">
        Be Our Very First Student!
      </h3>
      
      <p className="text-center text-yellow-100 font-semibold mb-4">
        Founding Cohort — Only {enrollmentData.maxCapacity - enrollmentData.currentEnrollments} Seats Available
      </p>

      <p className="text-center text-sm text-yellow-100 mb-6">
        We are officially launched and ready to train the next generation of healthcare champions. Don't just join a class—help us set the standard.
      </p>

      {/* Key Message */}
      <div className="bg-white bg-opacity-10 rounded-lg p-4 mb-6 backdrop-blur">
        <p className="text-center text-lg leading-relaxed">
          <strong>You'll Never Be Ready</strong> — The perfect time will never come. Great things happen during chaos. <strong>The season is now.</strong>
        </p>
      </div>

      {/* Key Points */}
      <div className="space-y-3 mb-8">
        <div className="flex items-start gap-3">
          <span className="text-yellow-300 font-bold text-xl mt-1">✓</span>
          <p className="text-sm">Stop making excuses and start your journey</p>
        </div>
        <div className="flex items-start gap-3">
          <span className="text-yellow-300 font-bold text-xl mt-1">✓</span>
          <p className="text-sm">Your future self will thank you</p>
        </div>
        <div className="flex items-start gap-3">
          <span className="text-yellow-300 font-bold text-xl mt-1">✓</span>
          <p className="text-sm">Start earning in just 4-6 weeks</p>
        </div>
        <div className="flex items-start gap-3">
          <span className="text-yellow-300 font-bold text-xl mt-1">✓</span>
          <p className="text-sm">Healthcare jobs are in demand NOW</p>
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="space-y-3">
        <Link
          to="/enroll"
          className="w-full bg-yellow-400 text-primary font-bold py-3 rounded-lg hover:bg-yellow-300 transition-all flex items-center justify-center gap-2 group"
        >
          Enroll Now - Limited Spots!
          <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
        </Link>
        
        <Link
          to="/blog/100"
          className="w-full bg-white text-primary font-bold py-3 rounded-lg hover:bg-gray-100 transition-all flex items-center justify-center gap-2 group"
        >
          Read Full Story
          <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Footer Message */}
      <p className="text-center text-xs text-yellow-100 mt-6 italic">
        "The time is now. Do not delay." - Shanekia Lindsay, Founder
      </p>

      {/* Enrollment Status */}
      <div className="mt-6 pt-6 border-t border-yellow-300 border-opacity-30 text-center text-xs text-yellow-100">
        <p>Inaugural Class • Limited to {enrollmentData.maxCapacity} students for personalized attention</p>
      </div>
    </div>
  );
}
