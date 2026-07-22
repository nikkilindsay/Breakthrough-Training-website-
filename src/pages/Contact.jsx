import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { schoolData } from '../data/schoolData';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would send the form data to a server
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    }, 3000);
  };

  return (
    <div className="w-full">
      {/* Header */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-16">
        <div className="container-custom">
          <h1 className="text-5xl font-bold mb-4">Get In Touch</h1>
          <p className="text-xl text-blue-100">
            Have questions? We'd love to hear from you. Contact us today!
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-1">
              <div className="space-y-8">
                {/* Phone */}
                <div className="card">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                        <Phone size={24} />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-dark mb-2">Phone</h3>
                      <a
                        href={`tel:${schoolData.phone}`}
                        className="text-primary hover:text-secondary font-semibold"
                      >
                        {schoolData.phone}
                      </a>
                      <p className="text-sm text-gray-600 mt-1">Mon-Fri, 9am-5pm CST</p>
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="card">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-12 w-12 rounded-md bg-secondary text-white">
                        <Mail size={24} />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-dark mb-2">Email</h3>
                      <a
                        href={`mailto:${schoolData.email}`}
                        className="text-primary hover:text-secondary font-semibold break-all"
                      >
                        {schoolData.email}
                      </a>
                      <p className="text-sm text-gray-600 mt-1">We'll respond within 24 hours</p>
                    </div>
                  </div>
                </div>

                {/* Address */}
                <div className="card">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                        <MapPin size={24} />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-dark mb-2">Location</h3>
                      <p className="text-gray-600">{schoolData.address}</p>
                      <p className="text-sm text-gray-600 mt-2">St. Louis, Missouri</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="card">
                <h2 className="text-2xl font-bold mb-6 text-dark">Send us a Message</h2>

                {submitted && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-green-800 font-semibold">
                      ✓ Thank you for your message! We'll get back to you soon.
                    </p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-dark mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="John Doe"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-dark mb-2">
                        Email Address
                      </label>
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
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-dark mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="(555) 123-4567"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-dark mb-2">
                      Subject
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">Select a subject</option>
                      <option value="enrollment">Enrollment Inquiry</option>
                      <option value="program">Program Information</option>
                      <option value="payment">Payment Question</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-dark mb-2">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="5"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                      placeholder="Tell us how we can help..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="btn-primary w-full flex items-center justify-center gap-2"
                  >
                    <Send size={20} />
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <h2 className="text-3xl font-bold mb-8 text-dark text-center">Visit Us</h2>
          
          <div className="bg-white rounded-lg shadow-lg overflow-hidden h-96">
            <iframe
              title="Breakthrough Training Institute Location"
              src="https://www.google.com/maps?q=11862+Lackland+Rd,+St.+Louis,+MO+63146&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <p className="text-center text-gray-700 font-semibold mt-4">
            {schoolData.address} — Look for the Breakthrough Training Institute (BTI) suite sign
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container-custom max-w-3xl">
          <h2 className="text-3xl font-bold mb-12 text-dark text-center">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            {[
              {
                q: 'How do I get started?',
                a: 'Simply fill out the contact form above or call us directly. Our admissions team will guide you through the enrollment process.'
              },
              {
                q: 'What payment methods do you accept?',
                a: 'We accept all major credit cards, debit cards, and bank transfers through our secure Stripe payment system.'
              },
              {
                q: 'Can I defer my enrollment?',
                a: 'Yes! Contact our admissions office to discuss deferment options that work for your situation.'
              },
              {
                q: 'Do you offer refunds?',
                a: 'We have a refund policy for eligible students. Contact us for specific details and terms.'
              }
            ].map((item, index) => (
              <div key={index} className="card">
                <h3 className="font-bold text-lg mb-2 text-dark">{item.q}</h3>
                <p className="text-gray-600">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
