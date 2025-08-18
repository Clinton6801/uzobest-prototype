import React, { useState, useRef, useEffect, Component } from 'react';

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

  @keyframes slide-in-left {
    from {
      transform: translateX(-100%);
    }
    to {
      transform: translateX(0);
    }
  }

  .animate-slide-in-left {
    animation: slide-in-left 0.4s ease-out forwards;
  }

  @keyframes slide-out-left {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(-100%);
    }
  }

  .animate-slide-out-left {
    animation: slide-out-left 0.4s ease-out forwards;
  }

  @keyframes fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  .animate-fade-in {
    animation: fade-in 0.5s ease-in-out;
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
  AIRTEL: [
    { id: 'mtn-1gb', text: '1GB - ₦300 (7 days)' },
    { id: 'mtn-2gb', text: '2GB - ₦500 (14 days)' },
  ],
  NINEMOBILE: [
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
const AirtimeForm = ({ onSubmit, isLoading, onClose }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit('Airtime', { phoneNumber, amount });
  };

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-gray-800">Buy Airtime</h3>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="airtime-phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
          <input
            id="airtime-phone"
            type="tel"
            required
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="mt-1 block w-full px-4 py-2 bg-gray-100 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            placeholder="e.g., 08012345678"
          />
        </div>
        <div>
          <label htmlFor="airtime-amount" className="block text-sm font-medium text-gray-700">Amount</label>
          <input
            id="airtime-amount"
            type="number"
            required
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="mt-1 block w-full px-4 py-2 bg-gray-100 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            placeholder="Enter amount"
          />
        </div>
        <button type="submit" disabled={isLoading} className={`w-full px-6 py-3 mt-6 font-semibold rounded-xl transition-colors shadow-lg ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 text-white hover:bg-green-700'}`}>
          {isLoading ? 'Processing...' : 'Pay for Airtime'}
        </button>
      </form>
    </div>
  );
};

const DataForm = ({ onSubmit, isLoading, onClose }) => {
  const [provider, setProvider] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [planId, setPlanId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit('Data', { provider, phoneNumber, planId });
  };

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-gray-800">Buy Data</h3>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="data-provider" className="block text-sm font-medium text-gray-700">Network Provider</label>
          <select
            id="data-provider"
            required
            value={provider}
            onChange={(e) => setProvider(e.target.value)}
            className="mt-1 block w-full px-4 py-2 bg-gray-100 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors">
            <option value="">Select network</option>
            {Object.keys(dataPlans).map(p => (<option key={p} value={p}>{p}</option>))}
          </select>
        </div>
        <div>
          <label htmlFor="data-phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
          <input
            id="data-phone"
            type="tel"
            required
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="mt-1 block w-full px-4 py-2 bg-gray-100 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            placeholder="e.g., 08012345678" />
        </div>
        <div>
          <label htmlFor="data-plan" className="block text-sm font-medium text-gray-700">Select Plan</label>
          <select
            id="data-plan"
            required
            value={planId}
            onChange={(e) => setPlanId(e.target.value)}
            className="mt-1 block w-full px-4 py-2 bg-gray-100 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors">
            <option value="">Select data plan</option>
            {provider && dataPlans[provider] && dataPlans[provider].map(plan => (<option key={plan.id} value={plan.id}>{plan.text}</option>))}
          </select>
        </div>
        <button type="submit" disabled={isLoading} className={`w-full px-6 py-3 mt-6 font-semibold rounded-xl transition-colors shadow-lg ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 text-white hover:bg-green-700'}`}>
          {isLoading ? 'Processing...' : 'Pay for Data'}
        </button>
      </form>
    </div>
  );
};

const ElectricityForm = ({ onSubmit, isLoading, onClose }) => {
  const [company, setCompany] = useState('');
  const [meterNumber, setMeterNumber] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit('Electricity', { company, meterNumber, amount });
  };

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-gray-800">Pay for Electricity</h3>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="elec-company" className="block text-sm font-medium text-gray-700">Distribution Company</label>
          <select
            id="elec-company"
            required
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="mt-1 block w-full px-4 py-2 bg-gray-100 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors">
            <option value="">Select company</option>
            {electricityCompanies.map(c => (<option key={c} value={c}>{c}</option>))}
          </select>
        </div>
        <div>
          <label htmlFor="elec-meter" className="block text-sm font-medium text-gray-700">Meter Number</label>
          <input
            id="elec-meter"
            type="text"
            required
            value={meterNumber}
            onChange={(e) => setMeterNumber(e.target.value)}
            className="mt-1 block w-full px-4 py-2 bg-gray-100 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            placeholder="Enter meter number" />
        </div>
        <div>
          <label htmlFor="elec-amount" className="block text-sm font-medium text-gray-700">Amount</label>
          <input
            id="elec-amount"
            type="number"
            required
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="mt-1 block w-full px-4 py-2 bg-gray-100 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            placeholder="Enter amount" />
        </div>
        <button type="submit" disabled={isLoading} className={`w-full px-6 py-3 mt-6 font-semibold rounded-xl transition-colors shadow-lg ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 text-white hover:bg-green-700'}`}>
          {isLoading ? 'Processing...' : 'Pay for Electricity'}
        </button>
      </form>
    </div>
  );
};

const CableTvForm = ({ onSubmit, isLoading, onClose }) => {
  const [provider, setProvider] = useState('');
  const [smartcard, setSmartcard] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit('Cable TV', { provider, smartcard });
  };

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-gray-800">Upgrade your Cable</h3>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="cable-provider" className="block text-sm font-medium text-gray-700">Provider</label>
          <select
            id="cable-provider"
            required
            value={provider}
            onChange={(e) => setProvider(e.target.value)}
            className="mt-1 block w-full px-4 py-2 bg-gray-100 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors">
            <option value="">Select provider</option>
            {cableTvProviders.map(p => (<option key={p} value={p}>{p}</option>))}
          </select>
        </div>
        <div>
          <label htmlFor="cable-smartcard" className="block text-sm font-medium text-gray-700">Smartcard Number</label>
          <input
            id="cable-smartcard"
            type="text"
            required
            value={smartcard}
            onChange={(e) => setSmartcard(e.target.value)}
            className="mt-1 block w-full px-4 py-2 bg-gray-100 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            placeholder="Enter smartcard number" />
        </div>
        <button type="submit" disabled={isLoading} className={`w-full px-6 py-3 mt-6 font-semibold rounded-xl transition-colors shadow-lg ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 text-white hover:bg-green-700'}`}>
          {isLoading ? 'Processing...' : 'Pay for Cable TV'}
        </button>
      </form>
    </div>
  );
};

// Map of service names to their form components
const serviceForms = {
  Airtime: AirtimeForm,
  Data: DataForm,
  Electricity: ElectricityForm,
  'Cable TV': CableTvForm
};

// NEW Feedback Form Component
const FeedbackForm = ({ onSubmit, isLoading }) => {
  const [feedback, setFeedback] = useState('');

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    if (feedback.trim()) {
      onSubmit('Feedback', { feedback }); // Pass the feedback text to the parent onSubmit handler
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


// A simple component for the alert messages
const Alert = ({ message, isSuccess }) => {
  if (!message) return null;
  return (
    <div className={`p-4 rounded-lg text-sm font-medium ${isSuccess ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
      {message}
    </div>
  );
};

// Error Boundary Component to catch rendering errors
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error("Uncaught error in component:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="min-h-screen bg-gray-100 font-sans antialiased flex items-center justify-center p-4">
          <Card className="max-w-md text-center">
            <h2 className="text-xl font-bold text-red-600">Something went wrong.</h2>
            <p className="mt-2 text-sm text-gray-500">
              Please check the browser console for more details on the error.
            </p>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

// Main Auth Page Component (Login & Register)
const AuthPage = ({ setAppState, setLoggedInUser, setAlert }) => {
  // State to toggle between Login, Register, and now, Forgot Password views
  const [isLoginView, setIsLoginView] = useState(true);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [showNewPasswordForm, setShowNewPasswordForm] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    otp: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  
  // Use a constant for the backend URL
  const BACKEND_URL = 'https://halfat-backend.onrender.com';

  // Log state changes for debugging
  useEffect(() => {
    console.log('Component State Updated:', {
      isLoginView,
      showForgotPassword,
      showOtpInput,
      showNewPasswordForm
    });
  }, [isLoginView, showForgotPassword, showOtpInput, showNewPasswordForm]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    const { email } = formData;

    try {
      // API call to send an OTP
      const response = await fetch(`${BACKEND_URL}/api/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();

      if (response.ok) {
        setAlert({ message: 'An OTP has been sent to your email.', isSuccess: true });
        setShowForgotPassword(false);
        setShowOtpInput(true);
      } else {
        setAlert({ message: data.message || 'An error occurred. Please try again.', isSuccess: false });
      }
    } catch (error) {
      console.error('API call failed:', error);
      setAlert({ message: 'Network error. Please try again later.', isSuccess: false });
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    const { email, otp } = formData;

    try {
      // API call to verify the OTP
      const response = await fetch(`${BACKEND_URL}/api/auth/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });
      const data = await response.json();

      if (response.ok) {
        setAlert({ message: 'OTP verified successfully.', isSuccess: true });
        setShowOtpInput(false);
        setShowNewPasswordForm(true);
      } else {
        setAlert({ message: data.message || 'Invalid OTP. Please try again.', isSuccess: false });
      }
    } catch (error) {
      console.error('API call failed:', error);
      setAlert({ message: 'Network error. Please try again later.', isSuccess: false });
    }
  };

  const handleNewPasswordSubmit = async (e) => {
    e.preventDefault();
    const { email, newPassword, confirmPassword } = formData;

    if (newPassword !== confirmPassword) {
      setAlert({ message: 'Passwords do not match.', isSuccess: false });
      return;
    }

    try {
      // API call to set the new password
      const response = await fetch(`${BACKEND_URL}/auth/update-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, newPassword }),
      });
      const data = await response.json();

      if (response.ok) {
        setAlert({ message: 'Your password has been reset successfully. You can now log in.', isSuccess: true });
        setShowNewPasswordForm(false);
        setIsLoginView(true);
      } else {
        setAlert({ message: data.message || 'Failed to reset password. Please try again.', isSuccess: false });
      }
    } catch (error) {
      console.error('API call failed:', error);
      setAlert({ message: 'Network error. Please try again later.', isSuccess: false });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password, firstName, lastName } = formData;
    let endpoint = '';
    let body = {};
    let successMessage = '';

    // If it's the registration view, we must check if the user agreed to terms
    if (!isLoginView && !agreedToTerms) {
      setAlert({ message: 'You must agree to the Terms & Conditions.', isSuccess: false });
      return;
    }

    if (isLoginView) {
      endpoint = `${BACKEND_URL}/api/auth/login`;
      body = { username, password };
      successMessage = 'Login successful!';
    } else {
      endpoint = `${BACKEND_URL}/api/auth/register`;
      body = { username, email, password, firstName, lastName };
      successMessage = 'Registration successful! You can now log in.';
    }

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await response.json();

      if (response.ok) {
        // Assume the backend returns user data, including their username
        setLoggedInUser(data.user.username);
        setAppState('dashboard');
        setAlert({ message: successMessage, isSuccess: true });
      } else {
        setAlert({ message: data.message || `An error occurred.`, isSuccess: false });
      }
    } catch (error) {
      console.error('API call failed:', error);
      setAlert({ message: 'Network error. Please try again later.', isSuccess: false });
    }
  };

  // A standalone modal component for the Terms & Conditions
  const TermsModal = () => (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[80vh] overflow-y-auto p-6">
        <div className="flex justify-between items-center border-b pb-4 mb-4">
          <h3 className="text-2xl font-bold text-gray-900">Terms and Conditions</h3>
          <button
            onClick={() => setShowTermsModal(false)}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="text-gray-600 space-y-4 text-sm">
          <p>Welcome to our service. By creating an account, you agree to these Terms and Conditions. Please read them carefully. These terms constitute a legally binding agreement between you and [Your Company Name].</p>
          <p><strong>1. Account Registration:</strong> You must provide accurate and complete information. You are responsible for maintaining the confidentiality of your password and for all activities that occur under your account.</p>
          <p><strong>2. User Conduct:</strong> You agree not to use the service for any illegal or unauthorized purpose. You are solely responsible for your conduct and any data, text, files, information, usernames, images, graphics, photos, profiles, audio and video clips, sounds, musical works, works of authorship, applications, links and other content or materials (collectively, "Content") that you submit, post, or display on or via the service.</p>
          <p><strong>3. Intellectual Property Rights:</strong> All intellectual property rights in the service and its original content are the exclusive property of [Your Company Name]. Your use of the service does not grant you any ownership rights to the service or its content.</p>
          <p><strong>4. Termination:</strong> We may terminate or suspend your access to the service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.</p>
          <p><strong>5. Disclaimer of Warranties:</strong> The service is provided on an "as is" and "as available" basis. We make no warranties, expressed or implied, regarding the service.</p>
          <p><strong>6. Limitation of Liability:</strong> In no event shall [Your Company Name] be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the service.</p>
          <p><strong>7. Governing Law:</strong> These Terms shall be governed and construed in accordance with the laws of [Your Jurisdiction], without regard to its conflict of law provisions.</p>
          <p><strong>8. Changes to Terms:</strong> We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide at least 30 days' notice prior to any new terms taking effect. By continuing to access or use our service after those revisions become effective, you agree to be bound by the revised terms.</p>
          <p>By using our service, you acknowledge that you have read and understood these Terms and Conditions and agree to be bound by them.</p>
        </div>
      </div>
    </div>
  );

  // Function to determine the correct form title based on state
  const renderTitle = () => {
    if (showForgotPassword) return 'Forgot Password';
    if (showOtpInput) return 'Verify OTP';
    if (showNewPasswordForm) return 'Create a New Password';
    if (isLoginView) return 'Sign In';
    return 'Create an Account';
  };

  // Function to determine the correct form subtitle based on state
  const renderSubtitle = () => {
    if (showForgotPassword) return 'Enter your email to receive an OTP';
    if (showOtpInput) return 'Enter the OTP sent to your email';
    if (showNewPasswordForm) return 'Create and confirm your new password';
    if (isLoginView) return 'Enter your credentials';
    return 'Join our community today!';
  };

  const renderForm = () => {
    // Forgot Password - Step 1: Email Input
    if (showForgotPassword) {
      return (
        <form onSubmit={handleForgotPasswordSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 bg-gray-100 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              placeholder="Enter your email"
            />
          </div>
          <button
            type="submit"
            className="w-full px-6 py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-colors shadow-lg"
          >
            Send OTP
          </button>
          <button
            type="button"
            onClick={() => {
              setShowForgotPassword(false);
              setAlert(null); // Back to login view
              setIsLoginView(true);
            }}
            className="w-full mt-2 text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            &larr; Back to Login
          </button>
        </form>
      );
    }

    // Forgot Password - Step 2: OTP Input
    if (showOtpInput) {
      return (
        <form onSubmit={handleOtpSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Enter OTP</label>
            <input
              type="text"
              name="otp"
              required
              value={formData.otp}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 bg-gray-100 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              placeholder="e.g., 123456"
            />
          </div>
          <button
            type="submit"
            className="w-full px-6 py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-colors shadow-lg"
          >
            Verify OTP
          </button>
          <button
            type="button"
            onClick={() => {
              setShowOtpInput(false);
              setShowForgotPassword(true);
              setAlert(null);
            }}
            className="w-full mt-2 text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            &larr; Back to Email
          </button>
        </form>
      );
    }

    // Forgot Password - Step 3: New Password
    if (showNewPasswordForm) {
      return (
        <form onSubmit={handleNewPasswordSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">New Password</label>
            <input
              type="password"
              name="newPassword"
              required
              value={formData.newPassword}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 bg-gray-100 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 bg-gray-100 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            />
          </div>
          <button
            type="submit"
            className="w-full px-6 py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-colors shadow-lg"
          >
            Reset Password
          </button>
        </form>
      );
    }

    // Login/Register form (default view)
    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        {!isLoginView && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700">First Name</label>
              <input
                type="text"
                name="firstName"
                required
                value={formData.firstName}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 bg-gray-100 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                placeholder="e.g., John"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Last Name</label>
              <input
                type="text"
                name="lastName"
                required
                value={formData.lastName}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 bg-gray-100 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                placeholder="e.g., Doe"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email Address</label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 bg-gray-100 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                placeholder="e.g., john.doe@example.com"
              />
            </div>
          </>
        )}
        <div>
          <label className="block text-sm font-medium text-gray-700">Username</label>
          <input
            type="text"
            name="username"
            required
            value={formData.username}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 bg-gray-100 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            placeholder="Enter your username"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            required
            value={formData.password}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 bg-gray-100 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          />
        </div>

        {isLoginView && (
          <div className="flex justify-end text-sm">
            <button
              type="button"
              onClick={() => {
                setShowForgotPassword(true);
                setAlert(null); // Clear alert on view change
              }}
              className="text-blue-600 hover:text-blue-800 transition-colors font-medium"
            >
              Forgot password?
            </button>
          </div>
        )}

        {!isLoginView && (
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="agree-to-terms"
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
              className="rounded text-green-600 focus:ring-green-500"
            />
            <label htmlFor="agree-to-terms" className="text-sm text-gray-600">
              I agree to the
              <button
                type="button"
                onClick={() => setShowTermsModal(true)}
                className="text-green-600 ml-1 hover:underline font-medium"
              >
                Terms & Conditions
              </button>
            </label>
          </div>
        )}

        <button
          type="submit"
          className="w-full px-6 py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-colors shadow-lg"
        >
          {isLoginView ? 'Login' : 'Register'}
        </button>
      </form>
    );
  };


  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-100 font-sans antialiased flex items-center justify-center p-4">
        {/* Tailwind CSS for fonts and basic styles, though a full build would use a CDN link or a local build process */}
        <style>
          {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
          body { font-family: 'Inter', sans-serif; }
          .transition-colors { transition-property: color, background-color, border-color, text-decoration-color, fill, stroke; }
          .rounded-2xl { border-radius: 1rem; }
          `}
        </style>

        {/* Render the modal if showTermsModal is true */}
        {showTermsModal && <TermsModal />}

        <Card className="max-w-md">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-gray-900">{renderTitle()}</h2>
            <p className="text-gray-500">{renderSubtitle()}</p>
          </div>

          {renderForm()}

          {!showForgotPassword && !showOtpInput && !showNewPasswordForm && (
            <div className="text-center mt-4 text-sm">
              <p className="text-gray-500">
                {isLoginView ? "Don't have an account?" : "Already have an account?"}
                <button
                  onClick={() => {
                    setIsLoginView(!isLoginView);
                    setAlert(null); // Clear alert on view change
                  }}
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
          )}
        </Card>
      </div>
    </ErrorBoundary>
  );
};

// NEW: Side Menu Panel Component
const SideMenuPanel = ({ isOpen, onClose, onMenuItemClick }) => {
  const menuItems = [
    { name: 'Buy Data', service: 'Data' },
    { name: 'Buy Airtime', service: 'Airtime' },
    { name: 'Upgrade your cable', service: 'Cable TV' },
    { name: 'Pay for Electricity', service: 'Electricity' },
    { name: 'Fund Wallet', action: 'fund' },
    { name: 'Recent Transactions', action: 'transactions' },
  ];

  const panelClasses = `
    fixed top-0 left-0 h-full w-full max-w-xs bg-white shadow-2xl z-40 p-6 transition-transform duration-300 ease-in-out
    ${isOpen ? 'translate-x-0' : '-translate-x-full'}
  `;

  return (
    <div className={panelClasses}>
      <div className="flex justify-between items-center mb-6 border-b pb-4">
        <h3 className="text-2xl font-bold text-gray-900">Menu</h3>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors" aria-label="Close menu">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div className="flex flex-col space-y-4">
        {menuItems.map(item => (
          <button
            key={item.name}
            onClick={() => onMenuItemClick(item)}
            className="w-full text-left p-3 rounded-xl transition-colors bg-gray-100 hover:bg-indigo-50 text-gray-700 font-medium"
          >
            {item.name}
          </button>
        ))}
      </div>
    </div>
  );
};


// NEW: Fund Wallet Form
const FundWalletForm = ({ onSubmit, isLoading, onClose }) => {
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit('Fund Wallet', { amount, method });
  };

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-gray-800">Fund Your Wallet</h3>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="fund-amount" className="block text-sm font-medium text-gray-700">Amount to Fund</label>
          <input
            id="fund-amount"
            type="number"
            required
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="mt-1 block w-full px-4 py-2 bg-gray-100 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            placeholder="Enter amount"
          />
        </div>
        <div>
          <label htmlFor="fund-method" className="block text-sm font-medium text-gray-700">Payment Method</label>
          <select
            id="fund-method"
            required
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            className="mt-1 block w-full px-4 py-2 bg-gray-100 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors">
            <option value="">Select method</option>
            <option value="card">Credit/Debit Card</option>
            <option value="bank_transfer">Bank Transfer</option>
          </select>
        </div>
        <button type="submit" disabled={isLoading} className={`w-full px-6 py-3 mt-6 font-semibold rounded-xl transition-colors shadow-lg ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 text-white hover:bg-green-700'}`}>
          {isLoading ? 'Processing...' : 'Proceed to Payment'}
        </button>
      </form>
    </div>
  );
};

// Map of service names to their form components, now including the Fund Wallet form
const dashboardForms = {
  Airtime: AirtimeForm,
  Data: DataForm,
  Electricity: ElectricityForm,
  'Cable TV': CableTvForm,
  'Fund Wallet': FundWalletForm
};

// NEW: Profile Actions Component
const ProfileActions = ({
  loggedInUser,
  setLoggedInUser,
  setAppState,
  setAlert,
  onBackToDashboard,
  action,
  setAction,
  BACKEND_URL
}) => {
  const [newUsername, setNewUsername] = useState(loggedInUser);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [deleteUsername, setDeleteUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Function to handle the profile update API call
  const handleEditProfile = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${BACKEND_URL}/api/auth/profile`, {
        method: 'GET', // Or PUT/PATCH depending on your backend
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${loggedInUser.token}` // Assuming you have a token
        },
        body: JSON.stringify({ username: newUsername }),
      });
      const data = await response.json();

      if (response.ok) {
        setLoggedInUser(newUsername);
        setAlert({ message: 'Profile updated successfully!', isSuccess: true });
      } else {
        setAlert({ message: data.message || 'Failed to update profile.', isSuccess: false });
      }
    } catch (error) {
      console.error('Profile update failed:', error);
      setAlert({ message: 'Network error. Could not update profile.', isSuccess: false });
    } finally {
      setIsLoading(false);
      onBackToDashboard();
    }
  };

  // Function to handle the password change API call
  const handleChangePassword = async () => {
    setIsLoading(true);
    if (newPassword !== confirmNewPassword) {
      setAlert({ message: 'New passwords do not match!', isSuccess: false });
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`${BACKEND_URL}/auth/change-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${loggedInUser.token}`
        },
        body: JSON.stringify({ oldPassword, newPassword }),
      });
      const data = await response.json();

      if (response.ok) {
        setAlert({ message: 'Password changed successfully!', isSuccess: true });
        setOldPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
      } else {
        setAlert({ message: data.message || 'Failed to change password.', isSuccess: false });
      }
    } catch (error) {
      console.error('Password change failed:', error);
      setAlert({ message: 'Network error. Could not change password.', isSuccess: false });
    } finally {
      setIsLoading(false);
      onBackToDashboard();
    }
  };

  // Edit Profile Form
  const renderEditProfile = () => (
    <div className="animate-fade-in">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">Edit Profile</h3>
      <div className="space-y-4">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
          <input
            id="username"
            type="text"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            className="mt-1 block w-full px-4 py-2 bg-gray-100 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            placeholder="New Username"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Avatar</label>
          <div className="mt-1 p-4 bg-gray-100 border-2 border-gray-200 rounded-lg text-center text-gray-500">
            [Placeholder for Avatar Change]
          </div>
        </div>
        <button
          onClick={handleEditProfile}
          disabled={isLoading}
          className={`w-full px-6 py-3 mt-4 font-semibold rounded-xl transition-colors shadow-lg ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}
        >
          {isLoading ? 'Saving...' : 'Save Changes'}
        </button>
        <button
          onClick={onBackToDashboard}
          className="w-full mt-2 text-sm text-gray-500 hover:text-gray-700 transition-colors"
        >
          &larr; Back to Dashboard
        </button>
      </div>
    </div>
  );

  // Change Password Form
  const renderChangePassword = () => (
    <div className="animate-fade-in">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">Change Password</h3>
      <div className="space-y-4">
        <div>
          <label htmlFor="old-password" className="block text-sm font-medium text-gray-700">Old Password</label>
          <input
            id="old-password"
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className="mt-1 block w-full px-4 py-2 bg-gray-100 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          />
        </div>
        <div>
          <label htmlFor="new-password" className="block text-sm font-medium text-gray-700">New Password</label>
          <input
            id="new-password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="mt-1 block w-full px-4 py-2 bg-gray-100 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          />
        </div>
        <div>
          <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">Confirm New Password</label>
          <input
            id="confirm-password"
            type="password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            className="mt-1 block w-full px-4 py-2 bg-gray-100 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          />
        </div>
        <button
          onClick={handleChangePassword}
          disabled={isLoading}
          className={`w-full px-6 py-3 mt-4 font-semibold rounded-xl transition-colors shadow-lg ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}
        >
          {isLoading ? 'Changing...' : 'Change Password'}
        </button>
        <button
          onClick={onBackToDashboard}
          className="w-full mt-2 text-sm text-gray-500 hover:text-gray-700 transition-colors"
        >
          &larr; Back to Dashboard
        </button>
      </div>
    </div>
  );

  // Logout Confirmation Modal
  const renderLogoutConfirmation = () => (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50 p-4">
      <Card className="max-w-md text-center animate-fade-in-down">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Are you sure you want to log out?</h3>
        <p className="text-gray-500 mb-6">You will need to sign in again to access your account.</p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => {
              setAppState('homepage');
              setLoggedInUser(null);
              setAlert({ message: 'You have been logged out successfully!', isSuccess: true });
            }}
            className="px-6 py-2 bg-red-600 text-white rounded-full font-semibold hover:bg-red-700 transition-colors"
          >
            Yes, Logout
          </button>
          <button
            onClick={() => setAction(null)}
            className="px-6 py-2 bg-gray-200 text-gray-800 rounded-full font-semibold hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
        </div>
      </Card>
    </div>
  );

  // Delete Account Confirmation Modal
  const renderDeleteAccountConfirmation = () => (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50 p-4">
      <Card className="max-w-md text-center animate-fade-in-down">
        <h3 className="text-xl font-bold text-red-600 mb-4">Are you absolutely sure?</h3>
        <p className="text-gray-500 mb-4">
          This action is permanent and cannot be undone. To confirm, please type your username below.
        </p>
        <input
          type="text"
          value={deleteUsername}
          onChange={(e) => setDeleteUsername(e.target.value)}
          className="w-full px-4 py-2 mb-4 bg-gray-100 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors"
          placeholder="Enter your username"
        />
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => {
              if (deleteUsername === loggedInUser) {
                setAppState('homepage');
                setLoggedInUser(null);
                setAlert({ message: 'Your account has been deleted permanently.', isSuccess: true });
              } else {
                setAlert({ message: 'Incorrect username. Account not deleted.', isSuccess: false });
                setAction(null);
              }
            }}
            disabled={deleteUsername !== loggedInUser}
            className={`px-6 py-2 rounded-full font-semibold transition-colors ${
              deleteUsername !== loggedInUser
                ? 'bg-red-300 cursor-not-allowed'
                : 'bg-red-600 text-white hover:bg-red-700'
            }`}
          >
            Delete Account
          </button>
          <button
            onClick={() => setAction(null)}
            className="px-6 py-2 bg-gray-200 text-gray-800 rounded-full font-semibold hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
        </div>
      </Card>
    </div>
  );

  switch (action) {
    case 'editProfile':
      return renderEditProfile();
    case 'changePassword':
      return renderChangePassword();
    case 'confirmLogout':
      return renderLogoutConfirmation();
    case 'confirmDelete':
      return renderDeleteAccountConfirmation();
    default:
      return null;
  }
};


// Updated Dashboard Component with side menu and scroll-to-form functionality
const Dashboard = ({ setAppState, loggedInUser, setAlert }) => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeForm, setActiveForm] = useState(null); // State to track the currently active form
  const [currentProfileView, setCurrentProfileView] = useState(null); // 'editProfile', 'changePassword', 'confirmLogout', 'confirmDelete'

  // Create refs for each section that needs to be scrolled to
  const profileRef = useRef(null);
  const formRef = useRef(null); // A single ref for the form container
  const transactionsRef = useRef(null);
  
  // 👈 New constant for your backend API URL.
  // 👉 Update this URL with your actual API endpoint.
  const BACKEND_URL = 'https://your-api-domain.com/api/v1';

  const userBalance = '₦1,500.00'; // Mock user balance
  const username = loggedInUser || 'User'; // Use the logged-in user name or a generic "User"
  const firstLetter = username.charAt(0).toUpperCase();

  // Effect to handle clicks outside the profile menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close profile menu if click is outside of it
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
  }, [profileRef]);

  // Use an effect to scroll to the form when it becomes active
  useEffect(() => {
    if (activeForm && formRef.current) {
      // Use a slight delay to ensure the component has rendered and is visible
      setTimeout(() => {
        formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [activeForm]);

  // Universal Form Submission Handler for services and feedback
  const handleSubmit = async (service, formData) => {
    setIsLoading(true);

    // Map service names to their specific API paths
    const serviceEndpoints = {
      Airtime: 'api/purchase/airtime',
      Data: 'api/purchase/data',
      Electricity: 'api/purchase/electricity',
      'Cable TV': 'api/purchase/cabletv',
      Feedback: 'api/feedback',
      'Fund Wallet': 'api/wallet/fund'
    };
    
    // Construct the full API URL using the base URL and the service path
    const endpoint = `${BACKEND_URL}/${serviceEndpoints[service]}`;
    
    let successMessage = '';
    let errorMessage = '';

    // Set messages based on the service being used
    switch (service) {
      case 'Airtime':
        successMessage = 'Airtime transaction successful!';
        errorMessage = 'Failed to purchase airtime.';
        break;
      case 'Data':
        successMessage = 'Data transaction successful!';
        errorMessage = 'Failed to purchase data.';
        break;
      case 'Electricity':
        successMessage = 'Electricity payment successful!';
        errorMessage = 'Failed to pay for electricity.';
        break;
      case 'Cable TV':
        successMessage = 'Cable TV payment successful!';
        errorMessage = 'Failed to pay for cable TV.';
        break;
      case 'Feedback':
        successMessage = 'Thank you for your feedback! We appreciate your input.';
        errorMessage = 'Failed to submit feedback.';
        break;
      case 'Fund Wallet':
        successMessage = 'Wallet funding successful! We are verifying the payment...';
        errorMessage = 'Failed to fund wallet.';
        break;
      default:
        successMessage = 'Transaction successful!';
        errorMessage = 'An unknown error occurred.';
    }

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (response.ok) {
        setAlert({ message: successMessage, isSuccess: true });
        if (service === 'Fund Wallet') {
          // After a successful funding request, verify the payment
          // Note: This is a simplified sequential call. In a real app,
          // the verification would likely be a separate user action or webhook.
          const verifyResponse = await fetch(`${BACKEND_URL}api/wallet/verify`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ transactionId: data.transactionId }), // Assuming the fund API returns a transaction ID
          });
          const verifyData = await verifyResponse.json();
          if (verifyResponse.ok) {
            setAlert({ message: 'Payment verified successfully!', isSuccess: true });
          } else {
            setAlert({ message: verifyData.message || 'Payment verification failed.', isSuccess: false });
          }
        }
      } else {
        setAlert({ message: data.message || errorMessage, isSuccess: false });
      }

    } catch (error) {
      console.error('API call failed:', error);
      setAlert({ message: 'Network error. Please check your connection.', isSuccess: false });
    } finally {
      setIsLoading(false);
      // After a successful submission, you might want to close the form.
      setActiveForm(null);
    }
  };

  const handleProfileAction = (action) => {
    setIsProfileMenuOpen(false); // Close the dropdown menu
    setCurrentProfileView(action); // Set the new view
    setActiveForm(null); // Hide any open service forms
  };
  
  // New handler to toggle the form visibility and scroll
  const handleFormToggle = (serviceName) => {
    // If the same service is clicked, close the form, otherwise open the new one
    setActiveForm(prevForm => (prevForm === serviceName ? null : serviceName));
    setIsMobileMenuOpen(false); // Close the side panel
    setCurrentProfileView(null); // Hide any profile views
  };

  // Handler for mobile menu items
  const handleMobileMenuItemClick = (item) => {
    if (item.action === 'fund') {
      handleFormToggle('Fund Wallet');
    } else if (item.action === 'transactions') {
      transactionsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsMobileMenuOpen(false);
    } else if (item.service) {
      handleFormToggle(item.service);
    }
  };
  
  // Handler for service grid buttons on desktop/larger screens
  const handleServiceGridClick = (serviceName) => {
    handleFormToggle(serviceName);
  };
  
  const renderActiveForm = () => {
    const FormComponent = dashboardForms[activeForm];
    if (FormComponent) {
      return (
        <Card>
          <FormComponent onSubmit={handleSubmit} isLoading={isLoading} onClose={() => setActiveForm(null)} />
        </Card>
      );
    }
    return null; // Don't render anything if no form is active
  };

  const renderDashboardContent = () => {
    // If a profile action view is set, render that instead of the dashboard
    if (currentProfileView) {
      return (
        <div className="flex justify-center items-start lg:items-center py-8">
          <Card className="w-full max-w-lg">
            <ProfileActions
              loggedInUser={loggedInUser}
              setLoggedInUser={(username) => {
                setLoggedInUser(username);
                setCurrentProfileView(null); // Go back to dashboard after username change
              }}
              setAppState={setAppState}
              setAlert={setAlert}
              onBackToDashboard={() => setCurrentProfileView(null)}
              action={currentProfileView}
              setAction={setCurrentProfileView}
              BACKEND_URL={BACKEND_URL}
            />
          </Card>
        </div>
      );
    }

    // Otherwise, render the main dashboard content
    return (
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
                onClick={() => handleFormToggle('Fund Wallet')}
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
                    onClick={() => handleServiceGridClick(service.name)}
                    className={`group flex flex-col items-center justify-center p-6 rounded-2xl shadow-md transition-all transform hover:-translate-y-1 bg-gray-100 hover:bg-indigo-50`}
                  >
                    <div className="p-4 bg-white rounded-full group-hover:bg-indigo-100 transition-colors mb-4">
                      {service.icon}
                    </div>
                    <span className="text-lg font-semibold text-gray-700">{service.name}</span>
                  </button>
                ))}
              </div>
            </div>
            
            {/* Service Form Section */}
            <div ref={formRef} className="space-y-8">
              {renderActiveForm()}
            </div>
          </div>

          {/* Right-hand side column for History and Feedback */}
          <div className="lg:col-span-1 space-y-8">
            {/* Transaction History Section */}
            <div ref={transactionsRef}>
              <TransactionHistoryList history={transactionHistory} />
            </div>
            
            {/* Feedback Form Section */}
            <FeedbackForm onSubmit={handleSubmit} isLoading={isLoading} />
          </div>
        </div>
      </main>
    );
  };

  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      <style>{tailwindCSS}</style>
      
      {/* Side Menu Panel (visible on all screens but controlled by state) */}
      <SideMenuPanel
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onMenuItemClick={handleMobileMenuItemClick}
      />
      
      {/* Header */}
      <nav className="bg-white shadow-sm py-4 mb-8">
        <div className="container mx-auto px-4 flex justify-between items-center">
          {/* Mobile menu button and Brand */}
          <div className="flex items-center">
            {/* Mobile menu button, visible only on smaller screens */}
            <button
              id="mobile-menu-button"
              onClick={() => setIsMobileMenuOpen(true)} // Open side panel
              className="md:hidden p-2 mr-2 text-gray-700 hover:text-indigo-600 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h1 className="text-2xl font-bold text-indigo-600">AjalaGSM</h1>
          </div>
          
          <div className="flex items-center space-x-4 relative" ref={profileRef}>
            {/* Profile Button (Desktop & Mobile) */}
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
                  onClick={() => handleProfileAction('editProfile')}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Edit Profile
                </button>
                <button
                  onClick={() => handleProfileAction('changePassword')}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Change Password
                </button>
                <div className="border-t border-gray-200 mt-2 pt-2">
                  <button
                    onClick={() => handleProfileAction('confirmLogout')}
                    className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    Logout
                  </button>
                  <button
                    onClick={() => handleProfileAction('confirmDelete')}
                    className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    Delete Account
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      {renderDashboardContent()}

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
const HomePageContent = ({ setAppState, setAlert }) => {
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

      {/* No alert state here, it is now managed by the top-level App component */}
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
        return <HomePageContent setAppState={setAppState} setAlert={setGlobalAlert} />;
      case 'auth':
        return <AuthPage setAppState={setAppState} setLoggedInUser={setLoggedInUser} setAlert={setGlobalAlert} />;
      case 'dashboard':
        return <Dashboard setAppState={setAppState} loggedInUser={loggedInUser} setAlert={setGlobalAlert} />;
      default:
        return <HomePageContent setAppState={setAppState} setAlert={setGlobalAlert} />;
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