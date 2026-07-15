import React, { useState } from 'react';
import { Send, CheckCircle, Loader } from 'lucide-react';

export default function EmailSignupForm({ variant = 'hero' }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    setStatus('loading');
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), email: email.trim() }),
      });
      const data = await response.json();
      if (response.ok) {
        setStatus('success');
        setMessage(data.message || 'Subscribed successfully!');
        setName('');
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setStatus('error');
      setMessage('Network error. Please try again later.');
    }
  };

  if (status === 'success') {
    return (
      <div className={`flex items-center justify-center gap-3 py-4 ${variant === 'hero' ? 'text-white' : 'text-green-600'}`}>
        <CheckCircle size={24} />
        <span className="font-semibold text-lg">{message}</span>
      </div>
    );
  }

  const isHero = variant === 'hero';

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
      <input
        type="text"
        placeholder="Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className={`flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-300 ${
          isHero ? 'bg-white/95' : 'bg-white border border-gray-300'
        }`}
      />
      <input
        type="email"
        placeholder="Your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className={`flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-300 ${
          isHero ? 'bg-white/95' : 'bg-white border border-gray-300'
        }`}
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        className={`px-6 py-3 rounded-lg font-bold transition-colors flex items-center justify-center gap-2 ${
          isHero
            ? 'bg-gray-900 text-white hover:bg-gray-800'
            : 'bg-orange-500 text-white hover:bg-orange-600'
        } disabled:opacity-50`}
      >
        {status === 'loading' ? (
          <Loader size={18} className="animate-spin" />
        ) : (
          <Send size={18} />
        )}
        Subscribe
      </button>
      {status === 'error' && (
        <p className="text-red-200 text-sm mt-2 sm:mt-0">{message}</p>
      )}
    </form>
  );
}
