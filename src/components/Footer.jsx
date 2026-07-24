import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';
import { schoolData } from '../data/schoolData';
import EmailSignupForm from './EmailSignupForm';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark text-white mt-20">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="font-bold text-lg mb-2">{schoolData.name}</h3>
            <p className="text-orange-300 font-semibold text-sm mb-3">
              A place to learn and grow
            </p>
            <p className="text-gray-300 text-sm">
              {schoolData.description}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-gray-300 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/programs" className="text-gray-300 hover:text-white transition-colors">Programs</Link></li>
              <li><Link to="/blog" className="text-gray-300 hover:text-white transition-colors">Blog</Link></li>
              <li><Link to="/events" className="text-gray-300 hover:text-white transition-colors">Events</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-bold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/gallery" className="text-gray-300 hover:text-white transition-colors">Gallery</Link></li>
              <li><Link to="/instructors" className="text-gray-300 hover:text-white transition-colors">Instructors</Link></li>
              <li><Link to="/request-info" className="text-gray-300 hover:text-white transition-colors">Request Info</Link></li>
              <li><Link to="/how-to-pay" className="text-gray-300 hover:text-white transition-colors">How to Pay</Link></li>
              <li><Link to="/scholarship" className="text-gray-300 hover:text-white transition-colors">Scholarship</Link></li>
              <li><Link to="/careers" className="text-gray-300 hover:text-white transition-colors">Careers</Link></li>
              <li><Link to="/class-schedule" className="text-gray-300 hover:text-white transition-colors">Class Schedule</Link></li>
              <li><Link to="/faq" className="text-gray-300 hover:text-white transition-colors">FAQ</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold mb-4">Contact Us</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <MapPin size={16} className="mt-1 flex-shrink-0" />
                <p className="text-gray-300">{schoolData.address}</p>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} />
                <a href={`tel:${schoolData.phone}`} className="text-gray-300 hover:text-white transition-colors">
                  {schoolData.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} />
                <a href={`mailto:${schoolData.email}`} className="text-gray-300 hover:text-white transition-colors">
                  {schoolData.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="border-t border-gray-700 pt-8 pb-8">
          <div className="max-w-xl mx-auto text-center mb-6">
            <h4 className="font-bold text-lg mb-2">Subscribe to BTI Updates</h4>
            <p className="text-gray-400 text-sm mb-4">Class schedules, job openings, and student resources — straight to your inbox.</p>
            <EmailSignupForm variant="footer" />
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <p>&copy; {currentYear} {schoolData.name}. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Accessibility</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
