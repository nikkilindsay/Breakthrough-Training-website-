import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { CheckCircle, Clock, DollarSign, Users, Award, ArrowRight, Calendar } from 'lucide-react';
import { programs } from '../data/schoolData';

export default function ProgramDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const program = programs.find(p => p.id === id);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    experience: '',
  });

  if (!program) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Program not found</h1>
          <Link to="/programs" className="btn-primary">Back to Programs</Link>
        </div>
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Navigate to checkout with program ID
    navigate(`/checkout/${program.id}`, { state: { formData } });
  };

  return (
    <div className="w-full">
      {/* Header */}
      <section className={`bg-gradient-to-r ${program.color} text-white py-16`}>
        <div className="container-custom">
          <Link to="/programs" className="text-blue-100 hover:text-white mb-4 inline-block">
            ← Back to Programs
          </Link>
          <h1 className="text-5xl font-bold mb-4">{program.name}</h1>
          <p className="text-xl text-blue-100">{program.fullDescription}</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Column - Program Details */}
            <div className="lg:col-span-2">
              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4 mb-12">
                <div className="card text-center">
                  <Clock size={32} className="mx-auto mb-2 text-primary" />
                  <p className="text-sm text-gray-600 mb-1">Duration</p>
                  <p className="font-bold text-lg">{program.duration}</p>
                </div>
                <div className="card text-center">
                  <DollarSign size={32} className="mx-auto mb-2 text-secondary" />
                  <p className="text-sm text-gray-600 mb-1">Investment</p>
                  <p className="font-bold text-lg">${program.price}</p>
                </div>
                <div className="card text-center">
                  <Award size={32} className="mx-auto mb-2 text-primary" />
                  <p className="text-sm text-gray-600 mb-1">Clinical Hours</p>
                  <p className="font-bold text-lg">{program.clinicalHours}</p>
                </div>
              </div>

              {/* Program Features */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold mb-6 text-dark">What You'll Learn</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {program.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle size={24} className="text-green-500 flex-shrink-0 mt-1" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Class Schedule Link - Hybrid Program */}
              {program.id === 'cna-hybrid' && (
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 mb-12">
                  <div className="flex items-center gap-3 mb-3">
                    <Calendar size={24} className="text-orange-500" />
                    <h3 className="text-xl font-bold text-gray-900">Upcoming Cohort Dates</h3>
                  </div>
                  <p className="text-gray-700 mb-4">New cohorts start every 4th Tuesday. Next cohort: <strong>July 28, 2026</strong>. Seats are limited!</p>
                  <Link to="/class-schedule" className="inline-flex items-center gap-2 bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors">
                    View Full Class Schedule <ArrowRight size={18} />
                  </Link>
                </div>
              )}

              {/* Program Details */}
              <div className="bg-gray-50 rounded-lg p-8 mb-12">
                <h2 className="text-2xl font-bold mb-6 text-dark">Program Details</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-bold text-dark mb-2">Access Duration</h3>
                    <p className="text-gray-600">{program.access}</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-dark mb-2">Clinical Hours</h3>
                    <p className="text-gray-600">{program.clinicalHours} of supervised clinical practice</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-dark mb-2">State Exam</h3>
                    <p className="text-gray-600">{program.stateTest}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Enrollment Form */}
            <div className="lg:col-span-1">
              <div className="card sticky top-20">
                <h2 className="text-2xl font-bold mb-6 text-dark">Enroll Today</h2>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-dark mb-2">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="John"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-dark mb-2">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Doe"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-dark mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-dark mb-2">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="(555) 123-4567"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-dark mb-2">Healthcare Experience</label>
                    <select
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">Select...</option>
                      <option value="none">No experience</option>
                      <option value="some">Some experience</option>
                      <option value="extensive">Extensive experience</option>
                    </select>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg my-6">
                    <p className="text-sm text-gray-600 mb-2">Program Investment</p>
                    <p className="text-3xl font-bold text-primary">${program.price}</p>
                  </div>

                  <button
                    type="submit"
                    className="btn-primary w-full flex items-center justify-center gap-2"
                  >
                    Continue to Payment <ArrowRight size={20} />
                  </button>

                  <p className="text-xs text-gray-500 text-center">
                    Secure payment powered by Stripe
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
