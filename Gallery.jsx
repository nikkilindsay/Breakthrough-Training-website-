import React, { useState } from 'react';
import { X } from 'lucide-react';
import { galleryItems } from '../data/schoolData';

const classroomVideos = [
  {
    src: '/videos/classroom-instruction.mp4',
    poster: '/videos/posters/classroom-instruction.jpg',
    title: 'Theory Class in Session',
    description: 'Instructor-led review of the state exam process: the 80% knowledge exam, the proctored skills check, and how students schedule 1:1 prep sessions.'
  },
  {
    src: '/videos/tb-test-qa.mp4',
    poster: '/videos/posters/tb-test-qa.jpg',
    title: 'Clinical Readiness Briefing',
    description: 'Instructor answers a real student question about TB screening options (skin test vs. chest X-ray vs. IGRA blood test) and reviews the clinical hour requirements.'
  }
];

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
                {/* Photo */}
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-6xl group-hover:scale-110 transition-transform duration-300">
                    📸
                  </div>
                )}

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
            {selectedImage.image ? (
              <img
                src={selectedImage.image}
                alt={selectedImage.title}
                className="w-full h-96 object-cover"
              />
            ) : (
              <div className="bg-gradient-to-br from-primary to-secondary h-96 flex items-center justify-center text-white text-8xl">
                📸
              </div>
            )}

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

      
      {/* Classroom Video */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <h2 className="text-3xl font-bold mb-4 text-dark text-center">Inside the Classroom</h2>
          <p className="text-gray-600 text-lg text-center max-w-2xl mx-auto mb-12">
            Real footage from a BTI cohort: instructor-led theory instruction and the clinical
            readiness briefing every student completes before their first shift.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {classroomVideos.map((video) => (
              <figure key={video.src} className="card overflow-hidden p-0">
                <video
                  className="w-full aspect-[9/16] object-cover bg-black"
                  controls
                  preload="metadata"
                  playsInline
                  poster={video.poster}
                >
                  <source src={video.src} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <figcaption className="p-5">
                  <h3 className="font-bold text-dark mb-1">{video.title}</h3>
                  <p className="text-sm text-gray-600">{video.description}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Program Facts */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <h2 className="text-3xl font-bold mb-12 text-dark text-center">Program at a Glance</h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="card text-center">
              <div className="text-5xl font-bold text-primary mb-2">175</div>
              <p className="text-gray-600">Total Clock Hours</p>
            </div>
            <div className="card text-center">
              <div className="text-5xl font-bold text-secondary mb-2">100</div>
              <p className="text-gray-600">Supervised Clinical Hours</p>
            </div>
            <div className="card text-center">
              <div className="text-5xl font-bold text-primary mb-2">5</div>
              <p className="text-gray-600">Weeks &mdash; Hybrid Track</p>
            </div>
            <div className="card text-center">
              <div className="text-5xl font-bold text-secondary mb-2">3</div>
              <p className="text-gray-600">Program Options</p>
            </div>
          </div>
        </div>
      </section>

      {/* Student Stories */}
      <section className="py-20">
        <div className="container-custom">
          <h2 className="text-3xl font-bold mb-6 text-dark text-center">Student Stories</h2>
          <div className="max-w-3xl mx-auto card text-center">
            <p className="text-gray-700 text-lg mb-4">
              Our first cohort is in training right now. We publish a student&apos;s name and words only
              with that student&apos;s written permission, and only after they have completed the
              program &mdash; so this space stays empty until our graduates say yes.
            </p>
            <p className="text-gray-600">
              Are you a BTI graduate and want to share your experience? Email{' '}
              <a href="mailto:admissions@btieducation.com" className="text-primary font-semibold">
                admissions@btieducation.com
              </a>.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
