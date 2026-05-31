import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { programs } from '../data/schoolData';
import { ArrowRight, CheckCircle, Phone, Mail, MapPin } from 'lucide-react';

export default function Enroll() {
  const navigate = useNavigate();
  const [selectedProgram, setSelectedProgram] = useState('cna-self-paced');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    experience: '',
    agreeToContact: true,
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate form submission (in production, send to backend)
      console.log('Form submitted:', { ...formData, program: selectedProgram });
      
      // Show success message
      setSubmitted(true);
      
      // Redirect to checkout after 2 seconds
      setTimeout(() => {
        const program = programs.find(p => p.id === selectedProgram);
        if (program) {
          navigate(`/checkout/${selectedProgram}`, {
            state: { formData }
          });
        }
      }, 2000);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };

  const selectedProgramData = programs.find(p => p.id === selectedProgram);

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full text-center">
          <div className="text-6xl mb-4">✓</div>
          <h1 className="text-3xl font-bold text-green-600 mb-2">Thank You!</h1>
          <p className="text-gray-600 mb-6">
            We've received your enrollment request. Redirecting to payment...
          </p>
          <div className="animate-spin inline-block w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-16">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Start Your CNA Journey Today</h1>
          <p className="text-xl text-blue-100 max-w-2xl">
            Join hundreds of successful students. Quick enrollment, flexible learning, affordable pricing.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Form Section */}
            <div className="lg:col-span-2">
              <div className="card">
                <h2 className="text-3xl font-bold mb-8 text-dark">Enrollment Form</h2>

                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Program Selection */}
                  <div>
                    <h3 className="font-bold text-lg text-dark mb-4">Select Your Program</h3>
                    <div className="space-y-3">
                      {programs.map(program => (
                        <label key={program.id} className="flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all hover:border-primary" style={{borderColor: selectedProgram === program.id ? '#0066cc' : '#e5e7eb'}}>
                          <input
                            type="radio"
                            name="program"
                            value={program.id}
                            checked={selectedProgram === program.id}
                            onChange={(e) => setSelectedProgram(e.target.value)}
                            className="w-4 h-4 text-primary"
                          />
                          <div className="ml-4 flex-1">
                            <p className="font-semibold text-dark">{program.name}</p>
                            <p className="text-sm text-gray-600">{program.duration} • ${program.price}</p>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Personal Information */}
                  <div>
                    <h3 className="font-bold text-lg text-dark mb-4">Personal Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-dark mb-2">
                          First Name *
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          required
                          placeholder="John"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-dark mb-2">
                          Last Name *
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          required
                          placeholder="Doe"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div>
                    <h3 className="font-bold text-lg text-dark mb-4">Contact Information</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-dark mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          placeholder="john@example.com"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-dark mb-2">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                          placeholder="(555) 123-4567"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Experience */}
                  <div>
                    <h3 className="font-bold text-lg text-dark mb-4">Healthcare Experience</h3>
                    <div className="space-y-3">
                      {[
                        { value: 'none', label: 'No healthcare experience' },
                        { value: 'some', label: 'Some healthcare experience (less than 1 year)' },
                        { value: 'experienced', label: 'Experienced (1+ years)' }
                      ].map(option => (
                        <label key={option.value} className="flex items-center">
                          <input
                            type="radio"
                            name="experience"
                            value={option.value}
                            checked={formData.experience === option.value}
                            onChange={handleInputChange}
                            className="w-4 h-4 text-primary"
                          />
                          <span className="ml-3 text-gray-700">{option.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Consent */}
                  <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                    <input
                      type="checkbox"
                      id="agreeToContact"
                      name="agreeToContact"
                      checked={formData.agreeToContact}
                      onChange={handleInputChange}
                      className="mt-1 w-4 h-4 text-primary"
                    />
                    <label htmlFor="agreeToContact" className="text-sm text-gray-700">
                      I agree to be contacted by Breakthrough Training Institute about my enrollment and program updates.
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed py-3 text-lg"
                  >
                    {loading ? 'Processing...' : 'Continue to Payment'}
                    <ArrowRight size={20} />
                  </button>

                  <p className="text-xs text-gray-500 text-center">
                    Your information is secure and will only be used for enrollment purposes.
                  </p>
                </form>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Program Summary */}
              {selectedProgramData && (
                <div className="card bg-gradient-to-br from-blue-50 to-blue-100">
                  <h3 className="font-bold text-lg text-dark mb-4">Program Summary</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-600">Program</p>
                      <p className="font-semibold text-dark">{selectedProgramData.name}</p>
                    </div>

                    <div className="border-t pt-4">
                      <p className="text-sm text-gray-600">Duration</p>
                      <p className="font-semibold text-dark">{selectedProgramData.duration}</p>
                    </div>

                    <div className="border-t pt-4">
                      <p className="text-sm text-gray-600">Total Hours</p>
                      <p className="font-semibold text-dark">{selectedProgramData.hours}</p>
                    </div>

                    <div className="border-t pt-4 bg-white p-3 rounded-lg">
                      <p className="text-sm text-gray-600">Total Price</p>
                      <p className="text-3xl font-bold text-primary">${selectedProgramData.price}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Why Choose Us */}
              <div className="card">
                <h3 className="font-bold text-lg text-dark mb-4">Why Choose Us?</h3>
                <div className="space-y-3">
                  {[
                    'Industry-recognized certification',
                    'Expert healthcare instructors',
                    'Flexible self-paced learning',
                    'Affordable pricing',
                    '95% pass rate',
                    'Job placement support'
                  ].map((benefit, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <CheckCircle size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Info */}
              <div className="card bg-gradient-to-br from-primary to-secondary text-white">
                <h3 className="font-bold text-lg mb-4">Need Help?</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Phone size={20} className="flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm opacity-90">Call us</p>
                      <p className="font-semibold">314-649-5586</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail size={20} className="flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm opacity-90">Email us</p>
                      <p className="font-semibold">btiadmissionoffice@gmail.com</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-12 text-dark">Frequently Asked Questions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                q: 'How long does the CNA program take?',
                a: 'Our self-paced CNA program can be completed in as little as 4 weeks or at your own pace up to 6 months.'
              },
              {
                q: 'What\'s the pass rate?',
                a: 'We have a 95% pass rate on the state certification exam. Our comprehensive training prepares you thoroughly.'
              },
              {
                q: 'Do you offer payment plans?',
                a: 'Yes! We offer flexible payment options. Contact us for details on payment plans.'
              },
              {
                q: 'Is the program online or in-person?',
                a: 'We offer self-paced online learning with optional in-person clinical experience components.'
              },
              {
                q: 'What if I don\'t pass the exam?',
                a: 'We offer retake support and additional study materials at no extra cost.'
              },
              {
                q: 'Can I get a refund?',
                a: 'Yes, we offer a 7-day money-back guarantee if you\'re not satisfied with the program.'
              }
            ].map((faq, idx) => (
              <div key={idx} className="card">
                <h3 className="font-bold text-dark mb-2">{faq.q}</h3>
                <p className="text-gray-600 text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
