import React, { useState } from 'react';
import { Calendar, MapPin, Users, Clock } from 'lucide-react';
import { events } from '../data/schoolData';

export default function Events() {
  const [selectedType, setSelectedType] = useState('All');

  const eventTypes = ['All', ...new Set(events.map(e => e.type))];
  
  const filteredEvents = selectedType === 'All'
    ? events
    : events.filter(e => e.type === selectedType);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
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
          <h1 className="text-5xl font-bold mb-4">Events & Activities</h1>
          <p className="text-xl text-blue-100">
            Join us for workshops, orientations, and celebrations
          </p>
        </div>
      </section>

      {/* Events Content */}
      <section className="py-20">
        <div className="container-custom">
          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-3 mb-12">
            {eventTypes.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  selectedType === type
                    ? 'bg-primary text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Events List */}
          <div className="space-y-6">
            {filteredEvents.map((event) => (
              <div key={event.id} className="card hover:shadow-lg transition-shadow">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {/* Date */}
                  <div className="md:col-span-1">
                    <div className="bg-gradient-to-br from-primary to-secondary text-white rounded-lg p-4 text-center">
                      <div className="text-3xl font-bold">
                        {new Date(event.date).getDate()}
                      </div>
                      <div className="text-sm font-semibold">
                        {new Date(event.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                      </div>
                    </div>
                  </div>

                  {/* Event Details */}
                  <div className="md:col-span-3">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-dark mb-2">{event.title}</h3>
                        <span className="inline-block px-3 py-1 bg-secondary text-white text-xs font-semibold rounded-full">
                          {event.type}
                        </span>
                      </div>
                    </div>

                    <p className="text-gray-600 mb-4">{event.description}</p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Clock size={18} className="text-primary" />
                        {event.time}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin size={18} className="text-primary" />
                        {event.location}
                      </div>
                      <div className="flex items-center gap-2">
                        <Users size={18} className="text-primary" />
                        Capacity: {event.capacity}
                      </div>
                    </div>

                    <button className="mt-4 btn-primary">
                      Register Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredEvents.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">No events found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Calendar Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <h2 className="text-3xl font-bold mb-12 text-dark text-center">Upcoming Schedule</h2>
          
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-bold text-lg mb-4 text-dark">February 2024</h3>
                <div className="space-y-2">
                  {events
                    .filter(e => new Date(e.date).getMonth() === 1)
                    .map(e => (
                      <div key={e.id} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded">
                        <div className="w-10 h-10 bg-primary text-white rounded flex items-center justify-center font-bold text-sm">
                          {new Date(e.date).getDate()}
                        </div>
                        <div>
                          <p className="font-semibold text-dark">{e.title}</p>
                          <p className="text-xs text-gray-600">{e.time}</p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              <div>
                <h3 className="font-bold text-lg mb-4 text-dark">March 2024</h3>
                <div className="space-y-2">
                  {events
                    .filter(e => new Date(e.date).getMonth() === 2)
                    .map(e => (
                      <div key={e.id} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded">
                        <div className="w-10 h-10 bg-secondary text-white rounded flex items-center justify-center font-bold text-sm">
                          {new Date(e.date).getDate()}
                        </div>
                        <div>
                          <p className="font-semibold text-dark">{e.title}</p>
                          <p className="text-xs text-gray-600">{e.time}</p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
