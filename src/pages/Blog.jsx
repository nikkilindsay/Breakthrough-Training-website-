import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { newBlogPosts } from '../data/blogPosts';

const blogPosts = newBlogPosts;

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const categories = ['All', ...new Set(blogPosts.map(post => post.category))];
  
  const sortedPosts = [...blogPosts].sort((a, b) => new Date(b.date) - new Date(a.date));
  
  const filteredPosts = selectedCategory === 'All' 
    ? sortedPosts 
    : sortedPosts.filter(post => post.category === selectedCategory);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="w-full">
      {/* Header */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-16">
        <div className="container-custom">
          <h1 className="text-5xl font-bold mb-4">Blog & Resources</h1>
          <p className="text-xl text-blue-100">
            Stay informed with insights and tips for healthcare professionals
          </p>
        </div>
      </section>

      {/* Blog Content */}
      <section className="py-20">
        <div className="container-custom">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-3 mb-12">
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

          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.id}`}
                className="card group overflow-hidden hover:shadow-xl transition-all"
              >
                {/* Image Placeholder */}
                <div className="h-48 bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-4xl font-bold mb-4 group-hover:scale-105 transition-transform">
                  📰
                </div>

                {/* Content */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="inline-block px-3 py-1 bg-primary text-white text-xs font-semibold rounded-full">
                      {post.category}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold mb-2 text-dark group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>

                  <p className="text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>

                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4 pb-4 border-b">
                    <div className="flex items-center gap-1">
                      <Calendar size={16} />
                      {formatDate(post.date)}
                    </div>
                    <div className="flex items-center gap-1">
                      <User size={16} />
                      {post.author}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all">
                    Read More <ArrowRight size={18} />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">No posts found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom max-w-2xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4 text-dark">Stay Updated</h2>
            <p className="text-gray-600">Subscribe to our newsletter for the latest healthcare training insights and tips.</p>
          </div>

          <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
            <button type="submit" className="btn-primary">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
