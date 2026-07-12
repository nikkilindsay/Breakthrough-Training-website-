import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, User, ArrowLeft, Share2 } from 'lucide-react';
import { newBlogPosts as blogPosts } from '../data/blogPosts';

export default function BlogPost() {
  const { id } = useParams();
  const post = blogPosts.find(p => p.id === parseInt(id));

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Post not found</h1>
          <Link to="/blog" className="btn-primary">Back to Blog</Link>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const relatedPosts = blogPosts
    .filter(p => p.category === post.category && p.id !== post.id)
    .slice(0, 3);

  return (
    <div className="w-full">
      {/* Header */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-12">
        <div className="container-custom">
          <Link to="/blog" className="flex items-center gap-2 text-blue-100 hover:text-white mb-4 inline-block">
            <ArrowLeft size={20} /> Back to Blog
          </Link>
          <h1 className="text-5xl font-bold mb-4">{post.title}</h1>
          <div className="flex flex-wrap gap-6 text-blue-100">
            <div className="flex items-center gap-2">
              <Calendar size={20} />
              {formatDate(post.date)}
            </div>
            <div className="flex items-center gap-2">
              <User size={20} />
              {post.author}
            </div>
            <span className="inline-block px-3 py-1 bg-white bg-opacity-20 rounded-full text-sm font-semibold">
              {post.category}
            </span>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-20">
        <div className="container-custom max-w-3xl">
          {/* Featured Image */}
          <div className="h-96 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center text-white text-6xl mb-12">
            📚
          </div>

          {/* Article Content */}
          <article className="prose prose-lg max-w-none mb-12">
            <p className="text-xl text-gray-700 leading-relaxed mb-6">
              {post.content}
            </p>

            <div className="bg-blue-50 border-l-4 border-primary p-6 my-8 rounded">
              <p className="text-gray-700">
                <strong>Key Takeaway:</strong> This article provides valuable insights for healthcare professionals looking to advance their careers and improve patient care outcomes.
              </p>
            </div>

            <h2 className="text-2xl font-bold mt-8 mb-4 text-dark">Why This Matters</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Understanding these concepts is crucial for success in healthcare. Whether you're just starting your career or looking to advance, continuous learning is essential.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4 text-dark">Getting Started</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              If you're interested in pursuing a career in healthcare, our comprehensive training programs can help you get started. Explore our CNA and other healthcare programs to find the right fit for your goals.
            </p>
          </article>

          {/* Share Section */}
          <div className="border-t pt-8 mb-12">
            <div className="flex items-center gap-4">
              <span className="font-semibold text-dark">Share this article:</span>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Share2 size={20} className="text-primary" />
              </button>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-r from-primary to-secondary text-white rounded-lg p-8 text-center mb-12">
            <h3 className="text-2xl font-bold mb-4">Ready to Start Your Healthcare Career?</h3>
            <p className="mb-6 text-blue-100">
              Explore our comprehensive training programs and take the first step towards a rewarding career in healthcare.
            </p>
            <Link to="/programs" className="btn-secondary inline-block">
              View Our Programs
            </Link>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="container-custom">
            <h2 className="text-3xl font-bold mb-12 text-dark">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.id}
                  to={`/blog/${relatedPost.id}`}
                  className="card group hover:shadow-lg transition-shadow"
                >
                  <div className="h-40 bg-gradient-to-br from-primary to-secondary rounded mb-4 flex items-center justify-center text-white text-3xl">
                    📰
                  </div>
                  <h3 className="font-bold text-lg mb-2 text-dark group-hover:text-primary transition-colors">
                    {relatedPost.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">{relatedPost.excerpt}</p>
                  <div className="flex items-center gap-1 text-primary font-semibold text-sm">
                    Read More →
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
