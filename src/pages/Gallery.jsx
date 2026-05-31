import React, { useState } from 'react';
import { X } from 'lucide-react';
import { galleryItems } from '../data/schoolData';

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedImage, setSelectedImage] = useState(null);

  const categories = ['All', ...new Set(galleryItems.map(item => item.category))];
  
  const filteredItems = selectedCategory === 'All'
    ? galleryItems
    : galleryItems.filter(item => item.category === selectedCategory);

  return (
    <div className="w-full">
      {/* Header */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-16">
        <div className="container-custom">
          <h1 className="text-5xl font-bold mb-4">Gallery & Engagement</h1>
          <p className="text-xl text-blue-100">
            Celebrate our students' achievements and school community
          </p>
        </div>
      </section>

      {/* Gallery Content */}
      <section className="py-20">
        <div className="container-custom">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-3 mb-12 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-primary text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedImage(item)}
                className="group relative overflow-hidden rounded-lg cursor-pointer h-64 bg-gray-200"
              >
                {/* Image Placeholder */}
                <div className="w-full h-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-6xl group-hover:scale-110 transition-transform duration-300">
                  📸
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-end">
                  <div className="w-full p-4 bg-gradient-to-t from-black to-transparent text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="font-bold text-lg">{item.title}</h3>
                    <p className="text-sm text-gray-300">{item.description}</p>
                  </div>
                </div>

                {/* Category Badge */}
                <div className="absolute top-3 right-3">
                  <span className="inline-block px-3 py-1 bg-secondary text-white text-xs font-semibold rounded-full">
                    {item.category}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">No items found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-white rounded-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-black bg-opacity-50 hover:bg-opacity-75 rounded-full text-white transition-all"
            >
              <X size={24} />
            </button>

            {/* Image */}
            <div className="bg-gradient-to-br from-primary to-secondary h-96 flex items-center justify-center text-white text-8xl">
              📸
            </div>

            {/* Details */}
            <div className="p-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="inline-block px-3 py-1 bg-secondary text-white text-sm font-semibold rounded-full">
                  {selectedImage.category}
                </span>
              </div>
              <h2 className="text-3xl font-bold mb-2 text-dark">{selectedImage.title}</h2>
              <p className="text-gray-600 text-lg">{selectedImage.description}</p>
            </div>
          </div>
        </div>
      )}

      {/* Stats Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <h2 className="text-3xl font-bold mb-12 text-dark text-center">Our Community</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="card text-center">
              <div className="text-5xl font-bold text-primary mb-2">500+</div>
              <p className="text-gray-600">Students Graduated</p>
            </div>
            <div className="card text-center">
              <div className="text-5xl font-bold text-secondary mb-2">95%</div>
              <p className="text-gray-600">Success Rate</p>
            </div>
            <div className="card text-center">
              <div className="text-5xl font-bold text-primary mb-2">100+</div>
              <p className="text-gray-600">Healthcare Partners</p>
            </div>
            <div className="card text-center">
              <div className="text-5xl font-bold text-secondary mb-2">10+</div>
              <p className="text-gray-600">Years of Excellence</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container-custom">
          <h2 className="text-3xl font-bold mb-12 text-dark text-center">Student Success Stories</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Maria Rodriguez',
                role: 'Certified Nursing Assistant',
                quote: 'The program was comprehensive and well-structured. I felt prepared for my career from day one!'
              },
              {
                name: 'James Thompson',
                role: 'Healthcare Professional',
                quote: 'Breakthrough Training Institute gave me the skills and confidence I needed to succeed in healthcare.'
              },
              {
                name: 'Sarah Johnson',
                role: 'Patient Care Specialist',
                quote: 'The instructors were knowledgeable and supportive. I highly recommend this program to anyone!'
              }
            ].map((testimonial, index) => (
              <div key={index} className="card">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400">★</span>
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">"{testimonial.quote}"</p>
                <div className="border-t pt-4">
                  <p className="font-bold text-dark">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
