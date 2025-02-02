import React from 'react';

const ServiceCard = ({ title, description, icon }: { title: string; description: string; icon: React.ReactNode }) => (
  <div className="bg-white p-6 rounded-lg shadow-md transition-transform hover:scale-105">
    <div className="text-blue-600 mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-blue-800 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const ServiceSection = ({ title, description }: { title: string; description: string }) => (
  <div className="text-center max-w-4xl mx-auto mb-12">
    <h2 className="text-3xl font-bold text-blue-900 mb-4">{title}</h2>
    <p className="text-gray-700">{description}</p>
  </div>
);

const ServicesPage = () => {
  const services = [
    {
      title: "Emergency Care",
      description: "24/7 emergency medical services with state-of-the-art facilities and experienced healthcare professionals.",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      title: "Primary Care",
      description: "Comprehensive primary healthcare services including regular check-ups, vaccinations, and preventive care.",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      )
    },
    {
      title: "Specialized Treatment",
      description: "Advanced specialized treatments across multiple disciplines including cardiology, neurology, and oncology.",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      title: "Laboratory Services",
      description: "Modern diagnostic laboratory offering a wide range of tests with quick and accurate results.",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      )
    },
    {
      title: "Surgical Services",
      description: "State-of-the-art surgical facilities with experienced surgeons performing both routine and complex procedures.",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
        </svg>
      )
    },
    {
      title: "Rehabilitation",
      description: "Comprehensive rehabilitation services including physical therapy, occupational therapy, and speech therapy.",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="bg-blue-900 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Our Medical Services
          </h1>
          <p className="text-xl text-center text-blue-100">
            Providing comprehensive healthcare solutions with cutting-edge technology
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <ServiceSection 
          title="Comprehensive Healthcare Solutions"
          description="At IGKC Hospital, we offer a wide range of medical services delivered by experienced healthcare professionals using state-of-the-art technology. Our focus is on providing patient-centered care with the highest standards of quality and safety."
        />

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              description={service.description}
              icon={service.icon}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-xl text-gray-700 mb-6">
            Need medical assistance? Our team is here to help you 24/7.
          </p>
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
            Book an Appointment
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;