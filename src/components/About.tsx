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
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAjPYTJfCz6VFPAWDiM9eD9ebYgvtPSjaqVjMmdXkNWAO5eR3wuCieMmY&s"
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
                src="data:image/jpeg;base64,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"
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
                src="data:image/jpeg;base64,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"
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