import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Users, Award, Zap } from 'lucide-react';
import { programs, schoolData } from '../data/schoolData';
import enrollmentConfig from '../data/enrollmentConfig.json';
import heroImage from '../assets/hero-team-meeting.webp';
import MotivationalSidebar from '../components/MotivationalSidebar';

export default function Home() {
  const [enrollmentData, setEnrollmentData] = useState(enrollmentConfig);

  useEffect(() => {
    // Fetch enrollment data (can be replaced with API call later)
    setEnrollmentData(enrollmentConfig);
  }, []);

  const features = [
    {
      icon: Award,
      title: 'Industry-Recognized Certification',
      description: 'Our programs prepare you for state certification and professional success.'
    },
    {
      icon: Users,
      title: 'Expert Instructors',
      description: 'Learn from experienced healthcare professionals dedicated to your success.'
    },
    {
      icon: Zap,
      title: 'Flexible Learning',
      description: 'Choose from online, hybrid, or in-person options that fit your schedule.'
    }
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-screen md:h-[700px] flex items-center justify-center text-white overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Professional team meeting" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>
        </div>
        
        <div className="container-custom relative z-10 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-extrabold mb-4 leading-tight drop-shadow-lg">
              CNA Classes in St. Louis, MO
            </h1>
            <p className="text-2xl md:text-4xl font-bold mb-6 text-orange-400 drop-shadow-md">
              State-Approved CNA Certification Programs
            </p>
            <p className="text-xl md:text-2xl mb-8 text-gray-100 font-medium">
              Hybrid and self-paced CNA training designed to launch your healthcare career. Next hybrid class starts July 7!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/enroll" className="btn-secondary inline-flex items-center justify-center gap-2">
            Enroll Now <ArrowRight size={20} />
          </Link>
              <Link to="/contact" className="btn-outline inline-flex items-center justify-center gap-2 border-white text-white hover:bg-white hover:text-primary">
                Get More Info <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="section-title">Why Choose {schoolData.name}?</h2>
            <p className="section-subtitle">Excellence in healthcare education</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="card text-center">
                  <div className="flex justify-center mb-4">
                    <div className="p-4 bg-gradient-to-br from-primary to-secondary rounded-lg">
                      <Icon size={32} className="text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-dark">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="section-title">CNA Certification Programs in St. Louis</h2>
            <p className="section-subtitle">Affordable, state-approved CNA classes — hybrid and self-paced options available</p>
            <div className="mt-4 inline-block bg-orange-100 border border-orange-400 text-orange-800 px-6 py-3 rounded-lg font-semibold">
              📅 Next Hybrid Class Starts July 7, 2026 — Limited Seats Available!
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {programs.map((program) => (
              <div key={program.id} className="card overflow-hidden hover:shadow-xl transition-shadow">
                <div className={`h-40 bg-gradient-to-r ${program.color} flex items-center justify-center text-white text-4xl font-bold`}>
                  {program.name.split(' ')[0]}
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2 text-dark">{program.name}</h3>
                  <p className="text-gray-600 mb-4">{program.shortDescription}</p>
                  
                  <div className="space-y-2 mb-6 text-sm">
                    <div className="flex items-center gap-2">
                      <CheckCircle size={16} className="text-green-500" />
                      <span className="text-gray-700">{program.duration} duration</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle size={16} className="text-green-500" />
                      <span className="text-gray-700">${program.price}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle size={16} className="text-green-500" />
                      <span className="text-gray-700">{program.clinicalHours}</span>
                    </div>
                  </div>
                  
                  <Link
                    to={`/programs/${program.id}`}
                    className="btn-primary w-full text-center"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/programs" className="btn-secondary inline-flex items-center gap-2">
              View All Programs <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Motivational Sidebar Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="max-w-md mx-auto">
            <MotivationalSidebar />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container-custom text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Start Your CNA Career in St. Louis</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join our state-approved CNA certification program and launch your healthcare career. Next hybrid class starts July 7 — enroll today before seats fill up!
          </p>
          <Link to="/enroll" className="btn-secondary inline-flex items-center gap-2 bg-white text-primary hover:bg-gray-100">
            Enroll Now <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">Now Enrolling</div>
              <p className="text-gray-600">{enrollmentData.currentEnrollments} of {enrollmentData.maxCapacity} Students</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-secondary mb-2">5 Weeks</div>
              <p className="text-gray-600">To CNA Certification</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">100%</div>
              <p className="text-gray-600">Job Placement Support</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-secondary mb-2">28+</div>
              <p className="text-gray-600">Years Nursing Experience</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
