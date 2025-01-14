import React from 'react';
import { Users, Award, Globe, Heart, Clock, Shield } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About IGKC</h1>
            <p className="text-xl leading-relaxed">
              Transforming healthcare management through innovative technology and compassionate care since 2020.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-xl shadow-md">
              <h2 className="text-2xl font-bold mb-4 text-blue-600">Our Mission</h2>
              <p className="text-gray-600 leading-relaxed">
                To revolutionize healthcare management by providing innovative, user-friendly solutions that empower healthcare providers to deliver exceptional patient care while optimizing operational efficiency.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md">
              <h2 className="text-2xl font-bold mb-4 text-blue-600">Our Vision</h2>
              <p className="text-gray-600 leading-relaxed">
                To be the global leader in healthcare management systems, creating a world where quality healthcare is efficiently managed, easily accessible, and consistently delivered to all.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Core Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <Heart className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Patient-Centric</h3>
              <p className="text-gray-600">
                Putting patients first in every decision and feature we develop.
              </p>
            </div>
            <div className="text-center">
              <Shield className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Trust & Security</h3>
              <p className="text-gray-600">
                Maintaining the highest standards of data protection and privacy.
              </p>
            </div>
            <div className="text-center">
              <Globe className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Innovation</h3>
              <p className="text-gray-600">
                Continuously evolving our solutions to meet healthcare's changing needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Achievement Stats */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-gray-600">Healthcare Facilities</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">50K+</div>
              <div className="text-gray-600">Healthcare Providers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">1M+</div>
              <div className="text-gray-600">Patients Served</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">15+</div>
              <div className="text-gray-600">Countries</div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Leadership</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <img
                src="/api/placeholder/150/150"
                alt="CEO"
                className="w-32 h-32 rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold mb-1">Dr. Sarah Johnson</h3>
              <p className="text-gray-600 mb-2">Chief Executive Officer</p>
              <p className="text-sm text-gray-500">
                20+ years in Healthcare Technology
              </p>
            </div>
            <div className="text-center">
              <img
                src="/api/placeholder/150/150"
                alt="CTO"
                className="w-32 h-32 rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold mb-1">Michael Chen</h3>
              <p className="text-gray-600 mb-2">Chief Technology Officer</p>
              <p className="text-sm text-gray-500">
                15+ years in Software Development
              </p>
            </div>
            <div className="text-center">
              <img
                src="/api/placeholder/150/150"
                alt="COO"
                className="w-32 h-32 rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold mb-1">Dr. James Wilson</h3>
              <p className="text-gray-600 mb-2">Chief Operations Officer</p>
              <p className="text-sm text-gray-500">
                18+ years in Hospital Administration
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Healthcare Facility?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join hundreds of healthcare providers who have already modernized their operations with IGKC.
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition duration-300">
            Contact Us Today
          </button>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;