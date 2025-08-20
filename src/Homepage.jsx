import React, { useState } from 'react';
import { Phone, Airplay, Zap, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // ✅ Corrected import

const HomePageContent = ({ setCustomAlert }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate(); // ✅ Correct hook initialization

  // Mock services data for the homepage
  const services = [
    { name: 'Airtime', icon: <Phone className="w-8 h-8 text-indigo-500 group-hover:text-indigo-600 transition-colors" /> },
    { name: 'Data', icon: <Airplay className="w-8 h-8 text-indigo-500 group-hover:text-indigo-600 transition-colors" /> },
    { name: 'Electricity', icon: <Zap className="w-8 h-8 text-indigo-500 group-hover:text-indigo-600 transition-colors" /> },
    { name: 'Cable TV', icon: <Airplay className="w-8 h-8 text-indigo-500 group-hover:text-indigo-600 transition-colors" /> },
  ];

  // Handle service selection from the homepage
  const handleServiceSelect = () => {
    setCustomAlert({
      title: 'Action Required',
      message: 'You must sign in to access this service.',
      type: 'error',
    });
  };

  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      {/* Header */}
      <nav className="bg-white shadow-sm py-4 mb-8">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-indigo-600">AjalaGSM</h1>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={() => navigate('/login')} // ✅ Correct usage
              className="px-4 py-2 bg-indigo-600 text-white rounded-full text-sm font-semibold hover:bg-indigo-700 transition-colors"
            >
              Sign In
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-700 hover:text-indigo-600 transition-colors"
          >
            {isMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu Content */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 mx-4">
            <button
              onClick={() => navigate('/login')} // ✅ Correct usage
              className="block w-full text-center px-4 py-2 bg-indigo-600 text-white rounded-full font-semibold hover:bg-indigo-700 transition-colors"
            >
              Sign In
            </button>
          </div>
        )}
      </nav>

      {/* Main Content Area */}
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center py-12 md:py-20 bg-indigo-50 rounded-2xl shadow-inner mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">
              Pay Your Bills
            </span>
            <br /> With Ease
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Secure, simple, and fast payments for all your daily needs.
          </p>
        </section>

        {/* Services Grid */}
        <section className="text-center mb-12">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Our Services</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {services.map(service => (
              <button
                key={service.name}
                onClick={handleServiceSelect}
                className="group flex flex-col items-center justify-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-transform transform hover:-translate-y-2 hover:bg-indigo-50"
              >
                <div className="p-4 bg-indigo-100 rounded-full group-hover:bg-indigo-200 transition-colors mb-4">
                  {service.icon}
                </div>
                <span className="text-lg font-semibold text-gray-700 group-hover:text-indigo-600">{service.name}</span>
              </button>
            ))}
          </div>
        </section>

        {/* How It Works Section */}
        <section className="text-center mb-12">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">How It Works</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: 1, title: 'Choose a Service', desc: 'Select from our list of services like Data, Airtime, or Cable TV.' },
              { step: 2, title: 'Enter Details', desc: 'Input your phone number or account details and the amount.' },
              { step: 3, title: 'Complete Transaction', desc: 'Confirm your payment and receive your service instantly.' }
            ].map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
                <span className="text-4xl font-extrabold text-indigo-600">{item.step}.</span>
                <h4 className="text-xl font-bold mt-4 mb-2 text-gray-800">{item.title}</h4>
                <p className="text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white py-8 mt-12 text-center text-gray-500">
        <div className="container mx-auto px-4">
          <p>© 2024 AjalaGSM. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePageContent;