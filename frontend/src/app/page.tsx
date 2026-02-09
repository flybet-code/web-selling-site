'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // This would come from context or state management

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Navigation */}
      <nav className="bg-white shadow-sm py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="text-xl font-bold text-blue-600">TechSolutions</div>
          <div className="flex space-x-4">
            {!isLoggedIn ? (
              <>
                <Link href="/auth/login" className="px-4 py-2 text-gray-600 hover:text-blue-600 transition-colors">
                  Sign In
                </Link>
                <Link href="/auth/register" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                  Sign Up
                </Link>
              </>
            ) : (
              <Link href="/dashboard" className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
                Dashboard
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
            Your Vision, Our <span className="text-blue-600">Expertise</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
            We build stunning web applications, mobile apps, and tech solutions tailored to your business needs.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            {!isLoggedIn ? (
              <>
                <Link 
                  href="/auth/register" 
                  className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Get Started
                </Link>
                <Link 
                  href="#services" 
                  className="px-8 py-3 bg-white text-blue-600 border border-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors"
                >
                  Learn More
                </Link>
              </>
            ) : (
              <Link 
                href="/dashboard" 
                className="px-8 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
              >
                Go to Dashboard
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="text-blue-600 text-4xl mb-4">💻</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Web Applications</h3>
              <p className="text-gray-600">
                Custom web solutions built with modern technologies like React, Next.js, and Node.js.
              </p>
            </div>
            <div className="bg-gray-50 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="text-blue-600 text-4xl mb-4">📱</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Mobile Apps</h3>
              <p className="text-gray-600">
                Native and cross-platform mobile applications for iOS and Android.
              </p>
            </div>
            <div className="bg-gray-50 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="text-blue-600 text-4xl mb-4">⚙️</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Tech Consulting</h3>
              <p className="text-gray-600">
                Expert advice on technology stack, architecture, and digital transformation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Simple Pricing</h2>
          <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm p-8">
            <div className="text-center">
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">Custom Solutions</h3>
              <p className="text-gray-600 mb-6">
                Every project is unique. Contact us for a personalized quote based on your specific requirements.
              </p>
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Request a Quote
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Ready to Start?</h2>
            <p className="text-gray-600 mb-8">
              Reach out to us and let's discuss how we can bring your ideas to life.
            </p>
            <div className="space-y-4">
              <div className="text-gray-800 font-medium">contact@techsolutions.com</div>
              <div className="flex justify-center space-x-6">
                <a href="#" className="text-blue-600 hover:text-blue-800">Twitter</a>
                <a href="#" className="text-blue-600 hover:text-blue-800">LinkedIn</a>
                <a href="#" className="text-blue-600 hover:text-blue-800">GitHub</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} TechSolutions. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}