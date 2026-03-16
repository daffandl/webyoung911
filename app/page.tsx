'use client';

import Link from 'next/link';
import { Menu, X, Phone, MapPin, Clock, ChevronRight } from 'lucide-react';
import { useState } from 'react';

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="bg-black text-white">
      {/* Navigation */}
      <nav className="fixed w-full bg-black/95 backdrop-blur z-50 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <h1 className="text-xl font-bold tracking-tight">Y911</h1>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex gap-8 items-center">
              <a href="#services" className="text-sm text-gray-300 hover:text-white transition">
                Services
              </a>
              <a href="#fleet" className="text-sm text-gray-300 hover:text-white transition">
                Fleet
              </a>
              <a href="#testimonials" className="text-sm text-gray-300 hover:text-white transition">
                Testimonials
              </a>
              <a href="#contact" className="text-sm text-gray-300 hover:text-white transition">
                Contact
              </a>
            </div>

            {/* CTA Buttons */}
            <div className="hidden md:flex gap-4 items-center">
              <a
                href="#contact"
                className="text-sm text-gray-300 hover:text-white transition flex items-center gap-2"
              >
                <Phone size={16} />
                WhatsApp
              </a>
              <Link
                href="/booking"
                className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition"
              >
                Book Now
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden pb-4 border-t border-gray-800">
              <a
                href="#services"
                className="block py-2 text-sm text-gray-300 hover:text-white transition"
              >
                Services
              </a>
              <a
                href="#fleet"
                className="block py-2 text-sm text-gray-300 hover:text-white transition"
              >
                Fleet
              </a>
              <a
                href="#testimonials"
                className="block py-2 text-sm text-gray-300 hover:text-white transition"
              >
                Testimonials
              </a>
              <a
                href="#contact"
                className="block py-2 text-sm text-gray-300 hover:text-white transition"
              >
                Contact
              </a>
              <Link
                href="/booking"
                className="block mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition text-center"
              >
                Book Now
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="space-y-3">
                <p className="text-red-600 font-semibold text-sm uppercase tracking-wider">
                  Land Rover Specialist
                </p>
                <h1 className="text-5xl md:text-6xl font-bold leading-tight tracking-tighter">
                  Trusted. <br />
                  Precise. <br />
                  Passionate.
                </h1>
              </div>
              <p className="text-gray-400 text-lg leading-relaxed">
                Premium service for Land Rover vehicles in Indonesia. Expert technicians,
                genuine parts, and a commitment to excellence on every job.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link
                  href="/booking"
                  className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition inline-flex items-center justify-center gap-2"
                >
                  Book Service <ChevronRight size={18} />
                </Link>
                <Link
                  href="/booking/track"
                  className="px-8 py-3 border border-gray-600 hover:border-gray-400 text-white font-medium rounded-lg transition inline-flex items-center justify-center"
                >
                  Track Service
                </Link>
              </div>
            </div>

            {/* Hero Illustration */}
            <div className="hidden md:flex items-center justify-center">
              <div className="w-full h-96 bg-gradient-to-b from-gray-800 to-black rounded-xl border border-gray-700 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-6xl mb-4">🚙</p>
                  <p className="text-gray-400">Land Rover Defender</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Keunggulan (Advantages) Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Why Choose Us</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                icon: '🎯',
                title: 'LR Specialist',
                desc: 'Focused expertise in Land Rover vehicles since 2015',
              },
              {
                icon: '🏆',
                title: 'Certified Technicians',
                desc: 'Team with international certifications and experience',
              },
              {
                icon: '✓',
                title: 'Genuine Parts',
                desc: 'Only original and authentic Land Rover parts used',
              },
              {
                icon: '🛡️',
                title: 'Service Warranty',
                desc: '30-day warranty on all service work performed',
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-8 rounded-xl bg-gray-800/50 border border-gray-700 hover:border-gray-600 transition text-center space-y-4"
              >
                <div className="text-5xl">{item.icon}</div>
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">Our Services</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Complete Land Rover maintenance and repair solutions for all models
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Routine Service',
                desc: 'Regular maintenance, oil change, filters, fluid checks',
                icon: '🔧',
              },
              {
                title: 'Electronic Diagnosis',
                desc: 'Computer diagnostics and electrical system troubleshooting',
                icon: '⚡',
              },
              {
                title: 'Body & Paint',
                desc: 'Dent removal, painting, rust treatment, detailing',
                icon: '🎨',
              },
              {
                title: 'Engine Overhaul',
                desc: 'Complete engine rebuild, gasket replacement, tuning',
                icon: '⚙️',
              },
              {
                title: 'Suspension & 4x4',
                desc: 'Suspension repair, 4WD system maintenance, alignment',
                icon: '🏔️',
              },
              {
                title: 'Emergency Repair',
                desc: '24/7 emergency roadside assistance and towing',
                icon: '🚨',
              },
            ].map((service, idx) => (
              <div
                key={idx}
                className="p-8 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 hover:border-red-600 transition space-y-4"
              >
                <div className="text-4xl">{service.icon}</div>
                <h3 className="text-xl font-semibold">{service.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { number: '1', title: 'Booking', desc: 'Schedule service online or via WhatsApp' },
              { number: '2', title: 'Diagnosis', desc: 'Expert inspection and problem assessment' },
              { number: '3', title: 'Repair', desc: 'Professional technician work & parts replacement' },
              { number: '4', title: 'Pickup', desc: 'Quality check & vehicle handover to you' },
            ].map((step, idx) => (
              <div key={idx} className="relative">
                <div className="space-y-4 text-center">
                  <div className="w-16 h-16 rounded-full bg-red-600 mx-auto flex items-center justify-center text-2xl font-bold">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-semibold">{step.title}</h3>
                  <p className="text-gray-400 text-sm">{step.desc}</p>
                </div>
                {idx < 3 && (
                  <div className="hidden md:block absolute top-8 -right-4 text-gray-600">
                    →
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fleet We Service Section */}
      <section id="fleet" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">Models We Service</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Expert service for all Land Rover models
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Defender',
                icon: '🚜',
                desc: 'Classic to modern Defender models',
              },
              {
                name: 'Discovery',
                icon: '🚙',
                desc: 'Discovery 3, 4, 5 and Sport variants',
              },
              {
                name: 'Range Rover',
                icon: '👑',
                desc: 'Full Range, Sport, and Evoque models',
              },
              {
                name: 'Freelancer',
                icon: '🏜️',
                desc: 'Freelancer 1 & 2 service support',
              },
              {
                name: 'Range Rover Sport',
                icon: '⚡',
                desc: 'Sport & Velar high-performance service',
              },
              {
                name: 'Range Rover Velar',
                icon: '✨',
                desc: 'Modern luxury Land Rover maintenance',
              },
            ].map((model, idx) => (
              <div
                key={idx}
                className="p-8 rounded-xl bg-gradient-to-t from-gray-800 to-gray-900 border border-gray-700 hover:border-red-600 transition text-center space-y-4"
              >
                <div className="text-6xl">{model.icon}</div>
                <h3 className="text-2xl font-bold">{model.name}</h3>
                <p className="text-gray-400 text-sm">{model.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">What Customers Say</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Trust from Land Rover owners across Indonesia
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Budi Santoso',
                vehicle: 'Defender 110',
                text: 'Outstanding service! My Defender runs better than new. Highly recommended for serious Land Rover owners.',
                rating: 5,
              },
              {
                name: 'Siti Nurhaliza',
                vehicle: 'Discovery 5',
                text: 'Professional team, honest pricing, and genuine parts. They treat every vehicle like it\'s their own.',
                rating: 5,
              },
              {
                name: 'Ahmad Wijaya',
                vehicle: 'Range Rover Sport',
                text: 'The diagnostic work was thorough and transparent. Fixed issues I didn\'t even know about. Worth every rupiah!',
                rating: 5,
              },
            ].map((testimonial, idx) => (
              <div
                key={idx}
                className="p-8 rounded-xl bg-gray-800/50 border border-gray-700 space-y-4"
              >
                <div className="flex gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-500">
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-gray-200 italic leading-relaxed">{testimonial.text}</p>
                <div className="pt-4 border-t border-gray-700">
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-gray-400">{testimonial.vehicle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-2xl p-12 text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">
              Trust Your Land Rover to the Specialists
            </h2>
            <p className="text-red-100 text-lg leading-relaxed">
              Premium service, genuine parts, expert care. Schedule your service today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link
                href="/booking"
                className="px-8 py-3 bg-white hover:bg-gray-100 text-red-600 font-semibold rounded-lg transition inline-flex items-center justify-center gap-2"
              >
                Book Service Now <ChevronRight size={18} />
              </Link>
              <a
                href="https://wa.me/628123456789"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 border border-white hover:bg-white/10 text-white font-semibold rounded-lg transition inline-flex items-center justify-center gap-2"
              >
                <Phone size={18} /> WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 border-t border-gray-800 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="space-y-4">
              <h3 className="text-xl font-bold">Y911</h3>
              <p className="text-gray-400 text-sm">
                Land Rover Specialist Workshop. Premium service, genuine parts, trusted expertise.
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#services" className="hover:text-white transition">
                    Services
                  </a>
                </li>
                <li>
                  <a href="#fleet" className="hover:text-white transition">
                    Models
                  </a>
                </li>
                <li>
                  <a href="#testimonials" className="hover:text-white transition">
                    Testimonials
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold flex items-center gap-2">
                <Clock size={18} /> Hours
              </h4>
              <div className="text-sm text-gray-400 space-y-1">
                <p>Monday - Friday: 8:00 AM - 6:00 PM</p>
                <p>Saturday: 9:00 AM - 4:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold flex items-center gap-2">
                <MapPin size={18} /> Contact
              </h4>
              <div className="text-sm text-gray-400 space-y-3">
                <p>Jakarta, Indonesia</p>
                <a
                  href="https://wa.me/628123456789"
                  className="text-red-500 hover:text-red-400 transition inline-flex items-center gap-2"
                >
                  <Phone size={16} /> WhatsApp
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
              <p>&copy; 2024 Young 911 Autowerks. All rights reserved.</p>
              <p>
                30-Day Service Warranty • Genuine Parts Guarantee • Expert Technicians
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
