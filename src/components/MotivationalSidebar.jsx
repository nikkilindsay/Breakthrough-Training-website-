import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap } from 'lucide-react';

export default function MotivationalSidebar() {
  return (
    <div className="bg-gradient-to-br from-primary via-teal-600 to-secondary text-white rounded-2xl p-8 shadow-2xl border-4 border-yellow-400">
      {/* Icon */}
      <div className="flex justify-center mb-4">
        <Zap size={48} className="text-yellow-300" />
      </div>

      {/* Main Heading */}
      <h3 className="text-3xl font-bold text-center mb-2">
        You'll Never Be Ready
      </h3>
      
      <p className="text-center text-yellow-100 font-semibold mb-6">
        Stop waiting. Start now.
      </p>

      {/* Key Message */}
      <div className="bg-white bg-opacity-10 rounded-lg p-4 mb-6 backdrop-blur">
        <p className="text-center text-lg leading-relaxed">
          The perfect time will never come. Great things happen during chaos. <strong>The season is now.</strong>
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
          to="/blog/100"
          className="w-full bg-yellow-400 text-primary font-bold py-3 rounded-lg hover:bg-yellow-300 transition-all flex items-center justify-center gap-2 group"
        >
          Read Full Story
          <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
        </Link>
        
        <Link
          to="/enroll"
          className="w-full bg-white text-primary font-bold py-3 rounded-lg hover:bg-gray-100 transition-all flex items-center justify-center gap-2 group"
        >
          Enroll Now
          <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Footer Message */}
      <p className="text-center text-xs text-yellow-100 mt-6 italic">
        "The time is now. Do not delay." - Shanekia Lindsay
      </p>
    </div>
  );
}
