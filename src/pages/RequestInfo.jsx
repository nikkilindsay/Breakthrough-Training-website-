import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, CheckCircle, ShieldCheck, Clock, BriefcaseBusiness, GraduationCap, Send } from 'lucide-react';
import { schoolData } from '../data/schoolData';

export default function RequestInfo() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    zip: '',
    program: '',
    startTimeframe: '',
  });
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMsg('');
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, source: 'Request Info page' }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setStatus('success');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setStatus('error');
        setErrorMsg(data.error || 'Something went wrong. Please call us at ' + schoolData.phone);
      }
    } catch (err) {
      setStatus('error');
      setErrorMsg('Connection problem. Please call us at ' + schoolData.phone);
    }
  };

  if (status === 'success') {
    return (
      <div className="w-full">
        <section className="bg-gradient-to-r from-primary to-secondary text-white py-24">
          <div className="container-custom max-w-2xl text-center">
            <CheckCircle size={72} className="mx-auto mb-6 text-green-300" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">You're In, {formData.firstName}! 🎉</h1>
            <p className="text-2xl text-blue-100 mb-8">
              Our admissions team will call you shortly at {formData.phone}. Keep your phone close!
            </p>
            <div className="bg-white/10 rounded-xl p-6 text-left text-lg space-y-3 mb-8">
              <p className="font-bold text-xl">While you wait, you can:</p>
              <p>📞 Call us right now: <a href={`tel:${schoolData.phone}`} className="underline font-bold">{schoolData.phone}</a></p>
              <p>🚀 Skip the line and <Link to="/enroll" className="underline font-bold">enroll today</Link></p>
              <p>💰 See all the <Link to="/how-to-pay" className="underline font-bold">ways to pay $0</Link></p>
            </div>
            <Link to="/" className="inline-block bg-white text-primary font-bold text-lg px-8 py-4 rounded-lg hover:bg-blue-50 transition-colors">
              Back to Home
            </Link>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Hero + Form */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-14">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left: value pitch */}
            <div>
              <p className="inline-block bg-yellow-400 text-gray-900 font-bold text-base px-4 py-1 rounded-full mb-4">
                Next Class Starts July 28 — Only 25 Seats
              </p>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Start Your CNA Career in as Little as 5 Weeks
              </h1>
              <p className="text-2xl text-blue-100 mb-8">
                Tell us how to reach you and our admissions team will call you — usually within the hour.
              </p>

              <div className="space-y-5 text-lg">
                <div className="flex items-start gap-4">
                  <BriefcaseBusiness size={28} className="flex-shrink-0 text-yellow-300 mt-1" />
                  <p><strong>Guaranteed job offer</strong> for every graduate — pass the state exam and start as a CNA, or start earning as a home health aide while you prepare</p>
                </div>
                <div className="flex items-start gap-4">
                  <Clock size={28} className="flex-shrink-0 text-yellow-300 mt-1" />
                  <p><strong>Mostly online from home</strong> — hybrid classes meet in person just the first 2 days; self-paced is 100% online classroom on your schedule</p>
                </div>
                <div className="flex items-start gap-4">
                  <GraduationCap size={28} className="flex-shrink-0 text-yellow-300 mt-1" />
                  <p><strong>Lowest tuition in the metro</strong> — programs from $475, payment plans, scholarships, and free-tuition programs like SkillUP &amp; WIOA</p>
                </div>
                <div className="flex items-start gap-4">
                  <ShieldCheck size={28} className="flex-shrink-0 text-yellow-300 mt-1" />
                  <p><strong>State-licensed school</strong> — Missouri Certificate #78357-00, founded by a registered nurse with 28+ years of experience</p>
                </div>
              </div>

              <div className="mt-8 bg-white/10 rounded-xl p-5 text-lg">
                <p className="font-bold mb-1">Prefer to talk right now?</p>
                <a href={`tel:${schoolData.phone}`} className="flex items-center gap-2 text-2xl font-bold underline">
                  <Phone size={24} /> {schoolData.phone}
                </a>
              </div>
            </div>

            {/* Right: the form */}
            <div className="bg-white rounded-2xl shadow-2xl p-8 text-gray-900">
              <h2 className="text-3xl font-bold mb-2 text-dark">Request Info</h2>
              <p className="text-lg text-gray-700 mb-6">Takes 30 seconds. We'll call you with everything you need.</p>

              {status === 'error' && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-800 font-semibold text-lg">{errorMsg}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-base font-bold text-dark mb-2">First Name *</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      autoComplete="given-name"
                      className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="First name"
                    />
                  </div>
                  <div>
                    <label className="block text-base font-bold text-dark mb-2">Last Name *</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      autoComplete="family-name"
                      className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Last name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-base font-bold text-dark mb-2">Phone *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    autoComplete="tel"
                    className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="(314) 555-1234"
                  />
                </div>

                <div>
                  <label className="block text-base font-bold text-dark mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete="email"
                    className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="you@example.com"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-base font-bold text-dark mb-2">ZIP Code</label>
                    <input
                      type="text"
                      name="zip"
                      value={formData.zip}
                      onChange={handleChange}
                      inputMode="numeric"
                      autoComplete="postal-code"
                      className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="63146"
                    />
                  </div>
                  <div>
                    <label className="block text-base font-bold text-dark mb-2">Program</label>
                    <select
                      name="program"
                      value={formData.program}
                      onChange={handleChange}
                      className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white"
                    >
                      <option value="">Not sure yet</option>
                      <option value="Self-Paced CNA ($475)">Self-Paced CNA ($475)</option>
                      <option value="Hybrid CNA ($1,175)">Hybrid CNA ($1,175)</option>
                      <option value="Clinical Experience Only">Clinical Experience Only</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-base font-bold text-dark mb-2">When do you want to start?</label>
                  <select
                    name="startTimeframe"
                    value={formData.startTimeframe}
                    onChange={handleChange}
                    className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white"
                  >
                    <option value="">Select one</option>
                    <option value="ASAP — July 28 class">ASAP — the July 28 class!</option>
                    <option value="Next 1-2 months">In the next 1–2 months</option>
                    <option value="Later this year">Later this year</option>
                    <option value="Just exploring">Just exploring for now</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full bg-primary hover:bg-secondary text-white font-bold text-xl py-4 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  <Send size={22} />
                  {status === 'submitting' ? 'Sending…' : 'Request Info →'}
                </button>

                <p className="text-sm text-gray-500 leading-relaxed">
                  By submitting, you agree that Breakthrough Training Institute may contact you by phone, text, or email about our programs. Message rates may apply. We never sell your information. See our <Link to="/privacy-policy" className="underline">Privacy Policy</Link>.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="py-12 bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold text-primary mb-1">$475</p>
              <p className="text-lg text-gray-700 font-semibold">Lowest paid CNA tuition in the St. Louis metro</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-primary mb-1">100%</p>
              <p className="text-lg text-gray-700 font-semibold">Of graduates receive a guaranteed job offer*</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-primary mb-1">5 weeks</p>
              <p className="text-lg text-gray-700 font-semibold">Fastest path from enrollment to certification</p>
            </div>
          </div>
          <p className="text-center text-sm text-gray-500 mt-8">
            *Job offers through our affiliated employers, Breakthrough Healthcare LLC and Daybreak Adult Day Care, contingent on successful completion of training and standard background screening. Graduates hired by a Medicaid/Medicare-certified facility within 12 months of certification may be entitled to tuition reimbursement under federal law (OBRA '87).
          </p>
        </div>
      </section>
    </div>
  );
}
