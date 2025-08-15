import React, { useState, useRef, useEffect } from 'react';

// Tailwind CSS keyframes for animations
const tailwindCSS = `
  @keyframes fade-in-down {
    0% {
      opacity: 0;
      transform: translateY(-10px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
  .animate-fade-in-down {
    animation: fade-in-down 0.5s ease-out forwards;
  }
`;

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
      <style>{tailwindCSS}</style>
      <div className="bg-white rounded-3xl p-8 shadow-2xl text-center max-w-sm animate-fade-in-down">
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

// --- Form Components for different services ---
const AirtimeForm = ({ onSubmit, isLoading }) => (
  <form onSubmit={onSubmit} className="space-y-4">
    <div>
      <label className="block text-sm font-medium text-gray-700">Phone Number</label>
      <input type="tel" required className="mt-1 block w-full px-4 py-2 bg-gray-100 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors" placeholder="e.g., 08012345678" />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700">Amount</label>
      <input type="number" required className="mt-1 block w-full px-4 py-2 bg-gray-100 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors" placeholder="Enter amount" />
    </div>
    <button type="submit" disabled={isLoading} className={`w-full px-6 py-3 mt-6 font-semibold rounded-xl transition-colors shadow-lg ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 text-white hover:bg-green-700'}`}>
      {isLoading ? 'Processing...' : 'Pay for Airtime'}
    </button>
  </form>
);

const DataForm = ({ onSubmit, isLoading }) => (
  <form onSubmit={onSubmit} className="space-y-4">
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
    <button type="submit" disabled={isLoading} className={`w-full px-6 py-3 mt-6 font-semibold rounded-xl transition-colors shadow-lg ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 text-white hover:bg-green-700'}`}>
      {isLoading ? 'Processing...' : 'Pay for Data'}
    </button>
  </form>
);

const ElectricityForm = ({ onSubmit, isLoading }) => (
  <form onSubmit={onSubmit} className="space-y-4">
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
    <button type="submit" disabled={isLoading} className={`w-full px-6 py-3 mt-6 font-semibold rounded-xl transition-colors shadow-lg ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 text-white hover:bg-green-700'}`}>
      {isLoading ? 'Processing...' : 'Pay for Electricity'}
    </button>
  </form>
);

const CableTvForm = ({ onSubmit, isLoading }) => (
  <form onSubmit={onSubmit} className="space-y-4">
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
    <button type="submit" disabled={isLoading} className={`w-full px-6 py-3 mt-6 font-semibold rounded-xl transition-colors shadow-lg ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 text-white hover:bg-green-700'}`}>
      {isLoading ? 'Processing...' : 'Pay for Cable TV'}
    </button>
  </form>
);

// Map of service names to their form components
const serviceForms = {
  Airtime: AirtimeForm,
  Data: DataForm,
  Electricity: ElectricityForm,
  'Cable TV': CableTvForm
};

// --- NEW Feedback Form Component ---
const FeedbackForm = ({ onSubmit, isLoading }) => {
  const [feedback, setFeedback] = useState('');

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    if (feedback.trim()) {
      onSubmit(e, feedback); // Pass the feedback text to the parent onSubmit handler
      setFeedback(''); // Clear the form after submission
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-lg">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">Feedback & Suggestions</h3>
      <p className="text-gray-500 mb-4">
        We value your opinion! Please let us know your thoughts.
      </p>
      <form onSubmit={handleFeedbackSubmit} className="space-y-4">
        <div>
          <label htmlFor="feedback" className="block text-sm font-medium text-gray-700">
            Your message
          </label>
          <textarea
            id="feedback"
            rows="4"
            required
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="mt-1 block w-full px-4 py-2 bg-gray-100 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            placeholder="Type your feedback, questions, or suggestions here..."
          ></textarea>
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full px-6 py-3 font-semibold rounded-xl transition-colors shadow-lg ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}
        >
          {isLoading ? 'Submitting...' : 'Submit Feedback'}
        </button>
      </form>
    </div>
  );
};


// Transaction history list component
const TransactionHistoryList = ({ history }) => (
  <div className="bg-white rounded-3xl p-6 shadow-lg">
    <h3 className="text-2xl font-bold text-gray-800 mb-6">Recent Transactions</h3>
    <div className="space-y-4">
      {history.map(transaction => (
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
);


// Auth Page Component (Login & Register)
const AuthPage = ({ setAppState, setLoggedInUser }) => {
  const [isLoginView, setIsLoginView] = useState(true);
  const [username, setUsername] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // For both login and registration, we set the username.
    // In a real app, you would validate credentials here.
    setLoggedInUser(username);
    setAppState('dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans antialiased flex items-center justify-center p-4">
      <style>{tailwindCSS}</style>
      <Card className="max-w-md">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-900">
            {isLoginView ? 'Sign In' : 'Create an Account'}
          </h2>
          <p className="text-gray-500">
            {isLoginView ? 'Enter your credentials' : 'Join our community today!'}
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full px-4 py-2 bg-gray-100 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              placeholder="Enter your username"
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
const Dashboard = ({ setAppState, loggedInUser, setAlert }) => {
  const [selectedService, setSelectedService] = useState(null);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Create a ref for the dropdown container
  const profileRef = useRef(null);

  const userBalance = '₦1,500.00'; // Mock user balance
  const username = loggedInUser || 'User'; // Use the logged-in user name or a generic "User"
  const firstLetter = username.charAt(0).toUpperCase();

  // Effect to handle clicks outside the profile dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the click occurred outside the profile menu container
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileMenuOpen(false);
      }
    };
    // Add the event listener to the document
    document.addEventListener("mousedown", handleClickOutside);
    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profileRef]); // Re-run effect if ref changes (it won't, but good practice)


  // Universal Form Submission Handler for services and feedback
  const handleSubmit = (e, feedbackMessage = null) => {
    e.preventDefault();
    setIsLoading(true);
    let message = '';
    let isSuccess = true;

    if (feedbackMessage) {
      // Handle feedback submission
      message = 'Thank you for your feedback! We appreciate your input.';
    } else {
      // Handle service payment submission
      message = `Transaction successful for ${selectedService}!`;
    }

    // Simulate a network request delay
    setTimeout(() => {
      setIsLoading(false);
      setAlert({
        message: message,
        isSuccess: isSuccess,
      });
    }, 1500);
  };

  const handleProfileAction = (action) => {
    setAlert({
      message: `"${action}" feature is coming soon!`,
      isSuccess: true,
    });
    setIsProfileMenuOpen(false);
  };

  const DynamicServiceForm = serviceForms[selectedService];

  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      <style>{tailwindCSS}</style>
      {/* Header */}
      <nav className="bg-white shadow-sm py-4 mb-8">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-indigo-600">AjalaGSM</h1>
          <div className="flex items-center space-x-4 relative" ref={profileRef}>
            {/* Profile Button */}
            <button
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-transform transform hover:scale-110"
              aria-label="User Profile Menu"
            >
              {firstLetter}
            </button>
            {/* Profile Dropdown Menu */}
            {isProfileMenuOpen && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-2 z-10 animate-fade-in-down">
                <button
                  onClick={() => handleProfileAction('Edit Profile')}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Edit Profile
                </button>
                <button
                  onClick={() => handleProfileAction('Change Password')}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Change Password
                </button>
                <div className="border-t border-gray-200 mt-2 pt-2">
                  <button
                    onClick={() => setAppState('homepage')}
                    className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="container mx-auto px-4 py-8">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-6">Welcome back, {username}!</h2>
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
                {DynamicServiceForm ? (
                  <DynamicServiceForm onSubmit={handleSubmit} isLoading={isLoading} />
                ) : (
                  <p className="text-center text-gray-500">Service form not found.</p>
                )}
              </div>
            )}
          </div>

          {/* Right-hand side column for History and Feedback */}
          <div className="lg:col-span-1 space-y-8">
            {/* Transaction History Section */}
            <TransactionHistoryList history={transactionHistory} />
            
            {/* Feedback Form Section */}
            <FeedbackForm onSubmit={handleSubmit} isLoading={isLoading} />
          </div>
        </div>
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


// Home Page with Service Selection & Form
const HomePageContent = ({ setAppState }) => {
  const [alert, setAlert] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
      <style>{tailwindCSS}</style>
      {/* Header */}
      <nav className="bg-white shadow-sm py-4 mb-8">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-indigo-600">AjalaGSM</h1>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href="#"
              onClick={() => setAppState('auth')}
              className="px-4 py-2 bg-indigo-600 text-white rounded-full text-sm font-semibold hover:bg-indigo-700 transition-colors"
            >
              Sign In
            </a>
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
            <a
              href="#"
              onClick={() => setAppState('auth')}
              className="block w-full text-center px-4 py-2 bg-indigo-600 text-white rounded-full font-semibold hover:bg-indigo-700 transition-colors"
            >
              Sign In
            </a>
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

      {alert && <CustomAlert message={alert.message} isSuccess={alert.isSuccess} onClose={() => setAlert(null)} />}
    </div>
  );
};


// Main application component to handle top-level routing
const App = () => {
  const [appState, setAppState] = useState('homepage'); // 'homepage', 'auth', 'dashboard'
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [globalAlert, setGlobalAlert] = useState(null);

  // Main render logic based on the current app state
  const renderAppContent = () => {
    switch (appState) {
      case 'homepage':
        return <HomePageContent setAppState={setAppState} />;
      case 'auth':
        return <AuthPage setAppState={setAppState} setLoggedInUser={setLoggedInUser} />;
      case 'dashboard':
        return <Dashboard setAppState={setAppState} loggedInUser={loggedInUser} setAlert={setGlobalAlert} />;
      default:
        return <HomePageContent setAppState={setAppState} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans antialiased">
      <style>{tailwindCSS}</style>
      {renderAppContent()}
      {globalAlert && <CustomAlert message={globalAlert.message} isSuccess={globalAlert.isSuccess} onClose={() => setGlobalAlert(null)} />}
    </div>
  );
};

export default App;
