import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Clock, DollarSign } from 'lucide-react';
import { programs } from '../data/schoolData';

export default function Programs() {
  return (
    <div className="w-full">
      {/* Header */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-16">
        <div className="container-custom">
          <h1 className="text-5xl font-bold mb-4">CNA Classes in St. Louis, MO</h1>
          <p className="text-xl text-blue-100">
            State-approved CNA certification programs — hybrid and self-paced options available. Serving St. Louis, Maryland Heights, and surrounding Missouri communities.
          </p>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="py-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 gap-12">
            {programs.map((program) => (
              <div key={program.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                  {/* Image/Color Block */}
                  <div className={`h-64 md:h-auto bg-gradient-to-br ${program.color} flex items-center justify-center`}>
                    <div className="text-white text-center">
                      <div className="text-6xl font-bold mb-2 opacity-20">{program.name.split(' ')[0]}</div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8 md:col-span-2">
                    <h2 className="text-3xl font-bold mb-2 text-dark">{program.name}</h2>
                    <p className="text-gray-600 mb-6">{program.fullDescription}</p>

                    {/* Features */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                      {program.features.slice(0, 4).map((feature, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <CheckCircle size={20} className="text-green-500 flex-shrink-0 mt-1" />
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Details */}
                    <div className="grid grid-cols-3 gap-4 mb-8 pb-8 border-b">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Clock size={18} className="text-primary" />
                          <span className="text-sm text-gray-600">Duration</span>
                        </div>
                        <p className="font-bold text-dark">{program.duration}</p>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <DollarSign size={18} className="text-primary" />
                          <span className="text-sm text-gray-600">Price</span>
                        </div>
                        <p className="font-bold text-dark">${program.price}</p>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <CheckCircle size={18} className="text-primary" />
                          <span className="text-sm text-gray-600">Clinical Hours</span>
                        </div>
                        <p className="font-bold text-dark">{program.clinicalHours}</p>
                      </div>
                    </div>

                    {/* CTA */}
                    <Link
                      to={`/programs/${program.id}`}
                      className="btn-primary inline-block"
                    >
                      View Details & Enroll
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <h2 className="section-title text-center mb-12">Frequently Asked Questions</h2>
          
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                q: 'What are the prerequisites for enrollment?',
                a: 'Most programs require a high school diploma or GED. Specific prerequisites vary by program. Contact us for details.'
              },
              {
                q: 'Can I take the program online?',
                a: 'Yes! We offer online, hybrid, and in-person options depending on the program. Choose what works best for you.'
              },
              {
                q: 'How long does it take to complete the program?',
                a: 'Program duration varies from 5 weeks to 14 weeks depending on the option you choose. See program details for specifics.'
              },
              {
                q: 'Is financial aid available?',
                a: 'We accept various payment methods and offer flexible payment plans. Contact our admissions office for more information.'
              },
              {
                q: 'What happens after I complete the program?',
                a: 'Upon completion, you\'ll be prepared for state certification exams. We provide exam preparation and job placement assistance.'
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
