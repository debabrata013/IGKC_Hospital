import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Video, Users, LineChart, Shield, Clock, Award, Phone ,BarChart, Headphones , Play, CheckCircle} from 'lucide-react';



const Home: React.FC = () => {
  const features = [
    {
      icon: Award,
      title: "Industry Leading",
      description: "Recognized as a top healthcare management solution provider with over 10 years of excellence.",
    },
    {
      icon: Clock,
      title: "Time Efficient",
      description: "Reduce administrative work by up to 60% with our intelligent automation systems.",
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description: "Enterprise-grade security with 99.9% uptime guarantee and full HIPAA compliance.",
    },
    {
      icon: Users,
      title: "Collaborative Care",
      description: "Enable seamless communication between healthcare providers and patients.",
    },
    {
      icon: BarChart,
      title: "Data Analytics",
      description: "Make informed decisions with comprehensive reporting and analytics tools.",
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description: "Round-the-clock technical support and dedicated customer success team.",
    }
  ];
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20 h-[70vh]">
  <div className="container mx-auto px-4 h-full flex justify-center items-center">
    <div className="text-center">
      <h1 className="text-5xl md:text-6xl font-bold mb-6">Welcome to IGKC</h1>
      <p className="text-xl md:text-2xl mb-8">
        Transform your healthcare facility with our intelligent hospital management system.
        <br />
        Designed to streamline operations, improve patient care, and optimize workflow, our system offers a
        comprehensive solution for hospitals of all sizes. 
      </p>
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
        <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition duration-300">
          Get Started 
        </button>
        <button className="bg-transparent border-2 border-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition duration-300">
          Book Demo
        </button>
      </div>
    </div>
  </div>
</section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold text-blue-600">500+</p>
              <p className="text-gray-600">Hospitals</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-blue-600">50k+</p>
              <p className="text-gray-600">Healthcare Providers</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-blue-600">1M+</p>
              <p className="text-gray-600">Patients Served</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-blue-600">98%</p>
              <p className="text-gray-600">Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Comprehensive Healthcare Solutions</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300">
              <Calendar className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Smart Scheduling</h3>
              <p className="text-gray-600">Intelligent appointment management with automated reminders and conflict resolution.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300">
              <Video className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Telemedicine Suite</h3>
              <p className="text-gray-600">Secure video consultations with integrated health monitoring and documentation.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300">
              <Users className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Patient Management</h3>
              <p className="text-gray-600">Comprehensive patient records with history tracking and treatment planning.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300">
              <LineChart className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Analytics Dashboard</h3>
              <p className="text-gray-600">Real-time insights and reporting for informed decision-making.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300">
              <Shield className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Security & Compliance</h3>
              <p className="text-gray-600">HIPAA-compliant data protection with advanced encryption.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300">
              <Clock className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">24/7 Support</h3>
              <p className="text-gray-600">Round-the-clock technical assistance and training resources.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl font-bold mb-6 text-gray-900">
            Why Choose IGKC?
          </h2>
          <p className="text-xl text-gray-600">
            Transform your healthcare practice with our comprehensive management solution
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex items-start space-x-4">
                <div className="bg-blue-50 p-3 rounded-lg group-hover:bg-blue-100 transition-colors duration-300">
                  <feature.icon className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

      {/* CTA Section */}
      <section className="relative py-24 bg-gradient-to-br from-gray-50 to-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute -right-10 -top-10 w-64 h-64 rounded-full bg-blue-600"></div>
        <div className="absolute -left-10 -bottom-10 w-64 h-64 rounded-full bg-blue-600"></div>
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-16 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold mb-2 text-gray-900">500+</div>
            <div className="text-gray-600">Healthcare Providers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-2 text-gray-900">98%</div>
            <div className="text-gray-600">Customer Satisfaction</div>
          </div>
          <div className="text-center md:col-span-1 col-span-2">
            <div className="text-3xl font-bold mb-2 text-gray-900">60%</div>
            <div className="text-gray-600">Time Saved</div>
          </div>
        </div>

        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-gray-900">
            Ready to Transform Your Healthcare Facility?
          </h2>
          <p className="text-xl mb-12 text-gray-600">
            Join hundreds of healthcare providers who have already modernized their operations with IGKC.
            Start your journey today.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-6 mb-12">
            <button className="group bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl flex items-center justify-center">
              Start Free Trial
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
            <button className="group bg-white border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl flex items-center justify-center">
              <Phone className="mr-2 w-5 h-5" />
              Contact Sales
            </button>
          </div>

          {/* Trust Indicators */}
          
        </div>

        {/* Demo Video Button */}
        <div className="text-center mt-12">
          <button className="inline-flex items-center text-sm text-gray-600 hover:text-blue-600 transition-colors duration-300">
            <Play className="w-4 h-4 mr-2" />
            Watch demo video (2 min)
          </button>
        </div>
      </div>
    </section>

    </div>
  );
};

export default Home;

