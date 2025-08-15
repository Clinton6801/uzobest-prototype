import React, { useState } from 'react';

// --- Reusable Components ---

// Reusable card container for consistent styling
const Card = ({ children, className = '' }) => (
  <div className={`bg-white p-6 sm:p-10 rounded-2xl shadow-2xl w-full max-w-lg transition-all duration-500 ease-in-out ${className}`}>
    {children}
  </div>
);

// Reusable custom alert modal component
const CustomAlert = ({ message, isSuccess, onClose }) => {
  const icon = isSuccess
    ? (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ) : (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-red-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    );

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl p-8 shadow-2xl text-center max-w-sm">
        <div className="flex flex-col items-center">
          <h3 className="text-xl font-bold text-gray-800 mb-2">{isSuccess ? 'Success!' : 'Error'}</h3>
          {icon}
          <p className="text-lg text-gray-600 mb-4">{message}</p>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Data for Services ---
const services = [
  { name: 'Data', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg> },
  { name: 'Airtime', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg> },
  { name: 'Cable TV', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14m-1 5l-2.403 1.201A1 1 0 0110 20.264v-6.528a1 1 0 01.597-.894L14 12m-3-7l2.403-1.201A1 1 0 0114 3.736v6.528a1 1 0 01-.597.894L11 12M5 14V8a1 1 0 011-1h1a1 1 0 011 1v6a1 1 0 01-1 1H6a1 1 0 01-1-1z" /></svg> },
  { name: 'Electricity', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg> },
];

const dataPlans = {
  MTN: [
    { id: 'mtn-1gb', text: '1GB - ₦300 (7 days)' },
    { id: 'mtn-2gb', text: '2GB - ₦500 (14 days)' },
  ],
  GLO: [
    { id: 'glo-1gb', text: '1.2GB - ₦300 (7 days)' },
    { id: 'glo-3gb', text: '3.5GB - ₦1,000 (30 days)' },
  ],
};

const electricityCompanies = ['EKEDC', 'IKEDC', 'PHEDC', 'AEDC'];

const cableTvProviders = ['DSTV', 'GOTV', 'STARTIMES'];

const transactionHistory = [
  { id: 1, service: 'Data', date: '2024-05-20', amount: '₦300', status: 'Completed' },
  { id: 2, service: 'Airtime', date: '2024-05-19', amount: '₦100', status: 'Completed' },
  { id: 3, service: 'Cable TV', date: '2024-05-18', amount: '₦2,500', status: 'Completed' },
  { id: 4, service: 'Electricity', date: '2024-05-17', amount: '₦5,000', status: 'Pending' },
];


// --- Page Components ---

// Auth Page Component (Login & Register)
const AuthPage = ({ setAppState }) => {
  const [isLoginView, setIsLoginView] = useState(true);

  return (
    <div className="min-h-screen bg-gray-100 font-sans antialiased flex items-center justify-center p-4">
      <Card className="max-w-md">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-900">
            {isLoginView ? 'Sign In' : 'Create an Account'}
          </h2>
          <p className="text-gray-500">
            {isLoginView ? 'Enter your credentials' : 'Join our community today!'}
          </p>
        </div>
        
        <form onSubmit={(e) => { e.preventDefault(); setAppState('dashboard'); }} className="space-y-4">
          {!isLoginView && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Username</label>
              <input
                type="text"
                required
                className="mt-1 block w-full px-4 py-2 bg-gray-100 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              required
              className="mt-1 block w-full px-4 py-2 bg-gray-100 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              required
              className="mt-1 block w-full px-4 py-2 bg-gray-100 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            />
          </div>
          <button
            type="submit"
            className="w-full px-6 py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-colors shadow-lg"
          >
            {isLoginView ? 'Login' : 'Register'}
          </button>
        </form>

        <div className="text-center mt-4 text-sm">
          <p className="text-gray-500">
            {isLoginView ? "Don't have an account?" : "Already have an account?"}
            <button
              onClick={() => setIsLoginView(!isLoginView)}
              className="text-blue-600 ml-1 hover:text-blue-800 transition-colors font-medium"
            >
              {isLoginView ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
          <button
            onClick={() => setAppState('homepage')}
            className="mt-2 text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            &larr; Back to Home
          </button>
        </div>
      </Card>
    </div>
  );
};


// Updated Dashboard Component with service selection, forms, and transaction history
const Dashboard = ({ setAppState }) => {
  const [selectedService, setSelectedService] = useState(null);
  const [alert, setAlert] = useState(null);
  const userBalance = '₦1,500.00'; // Mock user balance

  // Form Submission Handler
  const handleSubmit = (e) => {
    e.preventDefault();
    setAlert({
      message: `Transaction successful for ${selectedService}!`,
      isSuccess: true,
    });
  };

  // Render Form based on selected service
  const renderForm = () => {
    // Return null to hide the form if no service is selected
    if (!selectedService) {
      return null;
    }

    // Common form elements
    const formContent = (
      <>
        <div className="space-y-4">
          {selectedService === 'Airtime' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                <input
                  type="tel"
                  required
                  className="mt-1 block w-full px-4 py-2 bg-gray-100 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                  placeholder="e.g., 08012345678"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Amount</label>
                <input
                  type="number"
                  required
                  className="mt-1 block w-full px-4 py-2 bg-gray-100 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                  placeholder="Enter amount"
                />
              </div>
            </>
          )}

          {selectedService === 'Data' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700">Network Provider</label>
                <select
                  required
                  className="mt-1 block w-full px-4 py-2 bg-gray-100 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                >
                  <option value="">Select network</option>
                  {Object.keys(dataPlans).map(provider => (
                    <option key={provider} value={provider}>{provider}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                <input
                  type="tel"
                  required
                  className="mt-1 block w-full px-4 py-2 bg-gray-100 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                  placeholder="e.g., 08012345678"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Select Plan</label>
                <select
                  required
                  className="mt-1 block w-full px-4 py-2 bg-gray-100 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                >
                  <option value="">Select data plan</option>
                  {Object.entries(dataPlans).flatMap(([provider, plans]) =>
                    plans.map(plan => (
                      <option key={plan.id} value={plan.id}>
                        {provider} - {plan.text}
                      </option>
                    ))
                  )}
                </select>
              </div>
            </>
          )}

          {selectedService === 'Electricity' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700">Distribution Company</label>
                <select
                  required
                  className="mt-1 block w-full px-4 py-2 bg-gray-100 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                >
                  <option value="">Select company</option>
                  {electricityCompanies.map(company => (
                    <option key={company} value={company}>{company}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Meter Number</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full px-4 py-2 bg-gray-100 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                  placeholder="Enter meter number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Amount</label>
                <input
                  type="number"
                  required
                  className="mt-1 block w-full px-4 py-2 bg-gray-100 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                  placeholder="Enter amount"
                />
              </div>
            </>
          )}

          {selectedService === 'Cable TV' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700">Provider</label>
                <select
                  required
                  className="mt-1 block w-full px-4 py-2 bg-gray-100 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                >
                  <option value="">Select provider</option>
                  {cableTvProviders.map(provider => (
                    <option key={provider} value={provider}>{provider}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Smartcard Number</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full px-4 py-2 bg-gray-100 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                  placeholder="Enter smartcard number"
                />
              </div>
            </>
          )}
        </div>
        <button
          type="submit"
          className="w-full px-6 py-3 mt-6 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-colors shadow-lg"
        >
          Pay for {selectedService}
        </button>
      </>
    );

    return (
      <Card className="max-w-md">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-900">
            {selectedService} Payment
          </h2>
          <p className="text-gray-500">
            Fill in the details to complete your transaction.
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          {formContent}
        </form>
      </Card>
    );
  };

  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      {/* Header */}
      <nav className="bg-white shadow-sm py-4 mb-8">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-indigo-600">UzoBestGSM</h1>
          <button
            onClick={() => setAppState('homepage')}
            className="px-4 py-2 bg-red-600 text-white rounded-full text-sm font-semibold hover:bg-red-700 transition-colors"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Dashboard Section */}
          <div className="lg:col-span-2 space-y-8">
            {/* Balance Card */}
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl p-8 text-white shadow-lg">
              <h3 className="text-xl font-medium">Available Balance</h3>
              <p className="text-5xl font-extrabold mt-2">{userBalance}</p>
              <p className="text-sm mt-4 opacity-80">Fund your wallet to make payments with ease.</p>
              <button
                onClick={() => setAlert({ message: "Funds added successfully!", isSuccess: true })}
                className="mt-4 px-6 py-3 bg-white text-indigo-600 rounded-full font-semibold hover:bg-gray-100 transition-colors"
              >
                Fund Wallet
              </button>
            </div>

            {/* Services Grid */}
            <div className="bg-white rounded-3xl p-6 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Services</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {services.map(service => (
                  <button
                    key={service.name}
                    onClick={() => setSelectedService(service.name)}
                    className={`group flex flex-col items-center justify-center p-6 rounded-2xl shadow-md transition-all transform hover:-translate-y-1 ${selectedService === service.name ? 'bg-indigo-100 shadow-xl' : 'bg-gray-100 hover:bg-indigo-50'}`}
                  >
                    <div className="p-4 bg-white rounded-full group-hover:bg-indigo-100 transition-colors mb-4">
                      {service.icon}
                    </div>
                    <span className="text-lg font-semibold text-gray-700">{service.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Dynamic Form Section */}
            {selectedService && (
              <div className="bg-white rounded-3xl p-6 shadow-lg">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {selectedService} Payment
                  </h2>
                  <p className="text-gray-500">
                    Fill in the details to complete your transaction.
                  </p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Render form content based on selected service */}
                  {selectedService === 'Airtime' && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                        <input type="tel" required className="mt-1 block w-full px-4 py-2 bg-gray-100 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors" placeholder="e.g., 08012345678" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Amount</label>
                        <input type="number" required className="mt-1 block w-full px-4 py-2 bg-gray-100 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors" placeholder="Enter amount" />
                      </div>
                    </>
                  )}
                  {selectedService === 'Data' && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Network Provider</label>
                        <select required className="mt-1 block w-full px-4 py-2 bg-gray-100 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors">
                          <option value="">Select network</option>
                          {Object.keys(dataPlans).map(provider => (<option key={provider} value={provider}>{provider}</option>))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                        <input type="tel" required className="mt-1 block w-full px-4 py-2 bg-gray-100 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors" placeholder="e.g., 08012345678" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Select Plan</label>
                        <select required className="mt-1 block w-full px-4 py-2 bg-gray-100 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors">
                          <option value="">Select data plan</option>
                          {Object.entries(dataPlans).flatMap(([provider, plans]) => plans.map(plan => (<option key={plan.id} value={plan.id}>{provider} - {plan.text}</option>)))}
                        </select>
                      </div>
                    </>
                  )}
                  {selectedService === 'Electricity' && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Distribution Company</label>
                        <select required className="mt-1 block w-full px-4 py-2 bg-gray-100 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors">
                          <option value="">Select company</option>
                          {electricityCompanies.map(company => (<option key={company} value={company}>{company}</option>))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Meter Number</label>
                        <input type="text" required className="mt-1 block w-full px-4 py-2 bg-gray-100 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors" placeholder="Enter meter number" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Amount</label>
                        <input type="number" required className="mt-1 block w-full px-4 py-2 bg-gray-100 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors" placeholder="Enter amount" />
                      </div>
                    </>
                  )}
                  {selectedService === 'Cable TV' && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Provider</label>
                        <select required className="mt-1 block w-full px-4 py-2 bg-gray-100 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors">
                          <option value="">Select provider</option>
                          {cableTvProviders.map(provider => (<option key={provider} value={provider}>{provider}</option>))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Smartcard Number</label>
                        <input type="text" required className="mt-1 block w-full px-4 py-2 bg-gray-100 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors" placeholder="Enter smartcard number" />
                      </div>
                    </>
                  )}
                  <button type="submit" className="w-full px-6 py-3 mt-6 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-colors shadow-lg">
                    Pay for {selectedService}
                  </button>
                </form>
              </div>
            )}
          </div>

          {/* Transaction History Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl p-6 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Recent Transactions</h3>
              <div className="space-y-4">
                {transactionHistory.map(transaction => (
                  <div key={transaction.id} className="flex items-center justify-between p-4 rounded-xl bg-gray-50 border border-gray-100">
                    <div>
                      <h4 className="font-semibold text-gray-800">{transaction.service}</h4>
                      <p className="text-sm text-gray-500">{transaction.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900">{transaction.amount}</p>
                      <span className={`text-xs font-semibold px-2 py-1 rounded-full ${transaction.status === 'Completed' ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'}`}>
                        {transaction.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white py-8 mt-12 text-center text-gray-500">
        <div className="container mx-auto px-4">
          <p>© 2024 UzoBestGSM. All rights reserved.</p>
        </div>
      </footer>

      {/* Alert Component */}
      {alert && <CustomAlert message={alert.message} isSuccess={alert.isSuccess} onClose={() => setAlert(null)} />}
    </div>
  );
};


// Home Page with Service Selection & Form
const HomePageContent = ({ setAppState }) => {
  const [alert, setAlert] = useState(null);

  // Handle service selection from the homepage
  const handleServiceSelect = () => {
    // Show alert instead of navigating to form
    setAlert({
      message: 'You must sign in to access this service.',
      isSuccess: false,
    });
  };

  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      {/* Header */}
      <nav className="bg-white shadow-sm py-4 mb-8">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-indigo-600">UzoBestGSM</h1>
          <a
            href="#"
            onClick={() => setAppState('auth')}
            className="px-4 py-2 bg-indigo-600 text-white rounded-full text-sm font-semibold hover:bg-indigo-700 transition-colors hidden md:block"
          >
            Sign In
          </a>
        </div>
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
          <p>© 2024 UzoBestGSM. All rights reserved.</p>
        </div>
      </footer>

      {alert && <CustomAlert message={alert.message} isSuccess={alert.isSuccess} onClose={() => setAlert(null)} />}
    </div>
  );
};


// Main application component to handle top-level routing
const App = () => {
  // State to manage which top-level page is currently displayed
  const [appState, setAppState] = useState('homepage'); // 'homepage', 'auth', 'dashboard'

  // Main render logic based on the current app state
  const renderAppContent = () => {
    switch (appState) {
      case 'homepage':
        return <HomePageContent setAppState={setAppState} />;
      case 'auth':
        return <AuthPage setAppState={setAppState} />;
      case 'dashboard':
        return <Dashboard setAppState={setAppState} />;
      default:
        return <HomePageContent setAppState={setAppState} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans antialiased">
      {renderAppContent()}
    </div>
  );
};

export default App;
