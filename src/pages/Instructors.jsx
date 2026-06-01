import React from 'react';
import { Mail, Award, Users } from 'lucide-react';
import { instructors } from '../data/schoolData';

export default function Instructors() {
  return (
    <div className="w-full">
      {/* Header */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-16">
        <div className="container-custom">
          <h1 className="text-5xl font-bold mb-4">Our Instructors</h1>
          <p className="text-xl text-blue-100">
            Learn from experienced healthcare professionals
          </p>
        </div>
      </section>

      {/* Instructors Grid */}
      <section className="py-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {instructors.map((instructor) => (
              <div key={instructor.id} className="card overflow-hidden hover:shadow-xl transition-shadow">
                {/* Avatar Image */}
                <div className="h-64 bg-gradient-to-br from-primary to-secondary flex items-center justify-center overflow-hidden mb-6">
                  {instructor.image ? (
                    <img src={instructor.image} alt={instructor.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-white text-8xl">👤</span>
                  )}
                </div>

                {/* Content */}
                <div>
                  <h2 className="text-2xl font-bold mb-1 text-dark">{instructor.name}</h2>
                  <p className="text-secondary font-semibold mb-4">{instructor.title}</p>

                  <p className="text-gray-600 mb-6">{instructor.bio}</p>

                  {/* Credentials */}
                  <div className="mb-6">
                    <h3 className="font-bold text-dark mb-3 flex items-center gap-2">
                      <Award size={18} className="text-primary" />
                      Credentials
                    </h3>
                    <ul className="space-y-2">
                      {instructor.credentials.map((credential, index) => (
                        <li key={index} className="flex items-start gap-2 text-gray-600">
                          <span className="text-primary mt-1">✓</span>
                          {credential}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Contact */}
                  <a
                    href={`mailto:${instructor.email}`}
                    className="btn-primary w-full text-center flex items-center justify-center gap-2"
                  >
                    <Mail size={18} />
                    Contact Instructor
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Teaching Philosophy */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom max-w-3xl">
          <h2 className="text-3xl font-bold mb-8 text-dark text-center">Our Teaching Philosophy</h2>
          
          <div className="space-y-6">
            <div className="card">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                    <Users size={24} />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-dark mb-2">Student-Centered Learning</h3>
                  <p className="text-gray-600">
                    We believe in personalized instruction that adapts to each student's learning style and pace. Every student receives individual attention and support.
                  </p>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-secondary text-white">
                    <Award size={24} />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-dark mb-2">Real-World Experience</h3>
                  <p className="text-gray-600">
                    Our instructors bring years of hands-on healthcare experience to the classroom. You'll learn practical skills and best practices from professionals who live and breathe healthcare.
                  </p>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                    <Users size={24} />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-dark mb-2">Supportive Community</h3>
                  <p className="text-gray-600">
                    We foster a collaborative learning environment where students support each other. Your success is our success, and we're committed to helping you achieve your goals.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
