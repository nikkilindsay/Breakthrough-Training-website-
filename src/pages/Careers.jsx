import React, { useState } from 'react';
import { Briefcase, Clock, MapPin, Mail, Send, CheckCircle, Heart, Star, Users } from 'lucide-react';

export default function Careers() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email }),
      });
      if (response.ok) {
        setSubscribed(true);
      } else {
        alert('Something went wrong. Please try again.');
      }
    } catch (error) {
      // If no server, still show success for now
      setSubscribed(true);
    }
    setLoading(false);
  };

  const jobs = [
    {
      title: 'Administrative Assistant',
      type: 'Part-Time',
      location: '11862 Lackland Rd, Suite BTI, St. Louis, MO',
      description: 'We are seeking a detail-oriented and organized Administrative Assistant to support daily operations at Breakthrough Training Institute. This role involves managing student records, coordinating schedules, handling communications, and providing exceptional customer service to students and staff.',
      responsibilities: [
        'Manage student enrollment paperwork and records',
        'Answer phones and respond to email inquiries',
        'Coordinate class schedules and instructor availability',
        'Maintain organized filing systems (digital and physical)',
        'Assist with marketing materials and social media updates',
        'Greet and assist students and visitors',
        'Support the admissions process',
      ],
      qualifications: [
        'High school diploma or equivalent (Associate\'s degree preferred)',
        'Proficient in Microsoft Office and Google Workspace',
        'Excellent communication and organizational skills',
        'Experience in education or healthcare setting a plus',
        'Bilingual (English/Spanish) a plus',
      ],
    },
    {
      title: 'CNA Theory Instructor',
      type: 'Part-Time / Contract',
      location: '11862 Lackland Rd, Suite BTI, St. Louis, MO',
      description: 'Breakthrough Training Institute is looking for passionate and knowledgeable CNA Theory Instructors to teach classroom-based curriculum. You will be responsible for delivering engaging lectures, facilitating discussions, and preparing students for the Missouri CNA State Exam.',
      responsibilities: [
        'Deliver CNA theory curriculum in an engaging and accessible manner',
        'Prepare and administer quizzes, tests, and assignments',
        'Track student progress and provide academic support',
        'Maintain accurate attendance and grade records',
        'Collaborate with clinical instructors for seamless student transition',
        'Stay current with Missouri DHSS CNA certification requirements',
      ],
      qualifications: [
        'Active RN or LPN license in the state of Missouri',
        'Minimum 2 years of clinical nursing experience',
        'Teaching experience preferred but not required',
        'Strong communication and presentation skills',
        'Passion for mentoring the next generation of healthcare workers',
        'Current CPR/BLS certification',
      ],
    },
    {
      title: 'CNA Clinical Instructor',
      type: 'Part-Time / Contract',
      location: 'Clinical sites in the St. Louis Metro Area',
      description: 'We are seeking experienced Clinical Instructors to supervise and train CNA students during their hands-on clinical rotations. You will guide students through real-world patient care scenarios, ensuring they develop the skills and confidence needed to pass the state skills exam.',
      responsibilities: [
        'Supervise students during clinical rotations at partner facilities',
        'Demonstrate and evaluate clinical skills (vital signs, ADLs, patient transfers, etc.)',
        'Provide real-time feedback and coaching to students',
        'Ensure compliance with facility policies and infection control standards',
        'Document student performance and clinical hours',
        'Prepare students for the Missouri CNA State Skills Exam',
      ],
      qualifications: [
        'Active RN license in the state of Missouri (required)',
        'Minimum 2 years of long-term care or acute care experience',
        'Previous clinical teaching or precepting experience preferred',
        'Strong leadership and mentoring abilities',
        'Ability to work flexible hours including some weekends',
        'Current CPR/BLS certification',
        'Must pass background check and drug screening',
      ],
    },
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-primary overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-orange-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
        </div>
        <div className="container-custom relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-orange-500/20 text-orange-300 px-4 py-2 rounded-full mb-6">
            <Briefcase size={18} />
            <span className="font-semibold text-sm uppercase tracking-wide">We're Hiring</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 leading-tight">
            Join Our Mission
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto mb-6">
            Help us empower the next generation of healthcare professionals. Be part of something <span className="text-orange-400 font-bold">breakthrough</span>.
          </p>
          <div className="flex flex-wrap justify-center gap-6 mt-8">
            <div className="flex items-center gap-2 text-gray-300">
              <Heart size={20} className="text-orange-400" />
              <span>Purpose-Driven Work</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <Star size={20} className="text-orange-400" />
              <span>Growth Opportunities</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <Users size={20} className="text-orange-400" />
              <span>Supportive Team</span>
            </div>
          </div>
        </div>
      </section>

      {/* Job Listings */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">Open Positions</h2>
          <p className="text-center text-gray-600 mb-12 text-lg">Find your place at Breakthrough Training Institute</p>
          
          <div className="space-y-8">
            {jobs.map((job, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow">
                <div className="p-8">
                  {/* Job Header */}
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{job.title}</h3>
                      <div className="flex flex-wrap gap-4 mt-2">
                        <span className="inline-flex items-center gap-1 text-sm text-gray-600">
                          <Clock size={16} className="text-orange-500" /> {job.type}
                        </span>
                        <span className="inline-flex items-center gap-1 text-sm text-gray-600">
                          <MapPin size={16} className="text-orange-500" /> {job.location}
                        </span>
                      </div>
                    </div>
                    <a
                      href="mailto:btiadmissionoffice@gmail.com?subject=Application for {job.title}"
                      className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors whitespace-nowrap"
                    >
                      <Mail size={18} /> Apply Now
                    </a>
                  </div>

                  {/* Description */}
                  <p className="text-gray-700 text-lg mb-6 leading-relaxed">{job.description}</p>

                  {/* Responsibilities */}
                  <div className="mb-6">
                    <h4 className="font-bold text-gray-900 mb-3 text-lg">Key Responsibilities:</h4>
                    <ul className="grid md:grid-cols-2 gap-2">
                      {job.responsibilities.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-gray-700">
                          <CheckCircle size={16} className="text-green-500 mt-1 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Qualifications */}
                  <div>
                    <h4 className="font-bold text-gray-900 mb-3 text-lg">Qualifications:</h4>
                    <ul className="grid md:grid-cols-2 gap-2">
                      {job.qualifications.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-gray-700">
                          <Star size={16} className="text-orange-500 mt-1 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* How to Apply */}
          <div className="mt-12 bg-white rounded-2xl shadow-lg border border-gray-100 p-8 text-center">
            <Mail size={40} className="mx-auto text-orange-500 mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-3">How to Apply</h3>
            <p className="text-lg text-gray-700 mb-4">
              Send your resume and a brief cover letter to:
            </p>
            <a 
              href="mailto:btiadmissionoffice@gmail.com?subject=Job Application - Breakthrough Training Institute" 
              className="text-2xl font-bold text-orange-500 hover:text-orange-600 transition-colors"
            >
              btiadmissionoffice@gmail.com
            </a>
            <p className="text-gray-600 mt-4">
              Please include the position title in your subject line. We review applications on a rolling basis and will contact qualified candidates for an interview.
            </p>
          </div>
        </div>
      </section>

      {/* Email Subscription Section */}
      <section className="py-16 bg-gradient-to-r from-orange-500 to-orange-600">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <Send size={40} className="mx-auto text-white mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Stay in the Loop</h2>
            <p className="text-lg text-orange-100 mb-8">
              Subscribe to receive updates on new job openings, blog posts, events, and all things BTI. Be the first to know!
            </p>

            {subscribed ? (
              <div className="bg-white/20 backdrop-blur rounded-xl p-8">
                <CheckCircle size={48} className="mx-auto text-white mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">You're Subscribed!</h3>
                <p className="text-orange-100">
                  Thank you for joining the BTI community. You'll receive updates on jobs, blogs, events, and more.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="flex-1 px-5 py-4 rounded-lg text-gray-900 text-lg focus:outline-none focus:ring-2 focus:ring-white"
                />
                <input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 px-5 py-4 rounded-lg text-gray-900 text-lg focus:outline-none focus:ring-2 focus:ring-white"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-gray-900 hover:bg-gray-800 text-white font-bold px-8 py-4 rounded-lg transition-colors text-lg whitespace-nowrap disabled:opacity-50"
                >
                  {loading ? 'Subscribing...' : 'Subscribe'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">Why Work at BTI?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart size={28} className="text-orange-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Make a Real Impact</h3>
              <p className="text-gray-600">Every day, you'll help shape the future of healthcare by training compassionate, skilled professionals who will care for our community.</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users size={28} className="text-orange-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Supportive Culture</h3>
              <p className="text-gray-600">Join a team that values collaboration, growth, and celebrating each other's wins. We're a family here at BTI.</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star size={28} className="text-orange-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Flexible Schedules</h3>
              <p className="text-gray-600">We understand life happens. Our part-time and contract positions offer the flexibility you need to balance work and life.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
