import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation, Routes, Route } from 'react-router-dom';
import { CreditCard, Phone, Airplay, Zap, Globe, Menu, X, User, Lock, LogOut, Trash2, ChevronDown } from 'lucide-react';

// --- Reusable Components and Forms for Dashboard ---

/**
 * A simple, reusable Card component with rounded corners and shadow.
 * @param {object} props - The component props.
 * @param {React.ReactNode} props.children - The content to be displayed inside the card.
 * @param {string} props.className - Additional CSS classes for styling.
 */
const Card = ({ children, className = '' }) => (
  <div className={`bg-white rounded-3xl p-8 shadow-lg ${className}`}>
    {children}
  </div>
);

/**
 * Simple alert component to show messages.
 * @param {object} props - The component props.
 * @param {string} props.message - The message to display.
 * @param {boolean} props.isSuccess - Determines the color and icon of the alert.
 */
const Alert = ({ message, isSuccess }) => {
  if (!message) return null;
  return (
    <div className={`fixed bottom-4 left-1/2 -translate-x-1/2 px-6 py-3 rounded-full shadow-lg text-white font-semibold animate-fade-in ${isSuccess ? 'bg-green-500' : 'bg-red-500'}`}>
      {message}
    </div>
  );
};

/**
 * Mock component for the side menu panel.
 * @param {object} props - The component props.
 * @param {boolean} props.isOpen - Whether the menu is open.
 * @param {function} props.onClose - Function to close the menu.
 * @param {function} props.onMenuItemClick - Function to handle menu item clicks.
 */
const SideMenuPanel = ({ isOpen, onClose, onMenuItemClick }) => {
  const menuItems = [
    { name: 'Dashboard', icon: <Airplay />, path: '' },
    { name: 'Fund Wallet', icon: <CreditCard />, path: 'services/fund-wallet' },
    { name: 'Transactions', icon: <Globe />, path: 'transactions' },
    { name: 'Airtime', icon: <Phone />, path: 'services/airtime' },
    { name: 'Data', icon: <Airplay />, path: 'services/data' },
    { name: 'Electricity', icon: <Zap />, path: 'services/electricity' },
    { name: 'Cable TV', icon: <Globe />, path: 'services/cable-tv' },
  ];

  return (
    <div className={`fixed inset-y-0 left-0 w-64 bg-white shadow-xl z-50 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}>
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="text-xl font-bold text-indigo-600">Menu</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
          <X size={24} />
        </button>
      </div>
      <nav className="p-4 space-y-2">
        {menuItems.map(item => (
          <button
            key={item.name}
            onClick={() => {
              onMenuItemClick(item.path);
            }}
            className="w-full text-left flex items-center p-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
          >
            {item.icon && React.cloneElement(item.icon, { className: 'w-6 h-6 mr-3 text-indigo-500' })}
            <span>{item.name}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

/**
 * A component to handle various profile-related views.
 * @param {object} props - The component props.
 * @param {string} props.action - The specific profile action to display (e.g., 'editProfile').
 * @param {function} props.onBackToDashboard - Function to navigate back to the main dashboard.
 */
const ProfileActions = ({ action, onBackToDashboard }) => {
  const actionDetails = {
    editProfile: { title: 'Edit Profile', icon: <User /> },
    changePassword: { title: 'Change Password', icon: <Lock /> },
    confirmLogout: { title: 'Confirm Logout', icon: <LogOut /> },
    confirmDelete: { title: 'Delete Account', icon: <Trash2 /> }
  };

  const { title, icon } = actionDetails[action];
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold text-gray-800 flex items-center">
          {icon && React.cloneElement(icon, { className: 'mr-2' })}
          {title}
        </h3>
        <button onClick={onBackToDashboard} className="text-indigo-600 hover:text-indigo-800 transition-colors">
          <X size={24} />
        </button>
      </div>
      <p className="text-gray-600">This is a mock component for handling {action.replace('confirm', '')}.</p>
      <div className="flex space-x-4 pt-4">
        {(action === 'confirmLogout' || action === 'confirmDelete') && (
          <button className="px-6 py-3 bg-red-500 text-white rounded-full font-semibold">Confirm Action</button>
        )}
        <button onClick={onBackToDashboard} className="px-6 py-3 bg-gray-200 text-gray-800 rounded-full font-semibold">Cancel</button>
      </div>
    </div>
  );
};

/**
 * Displays a list of mock transaction history.
 */
const TransactionHistoryList = () => {
  const mockHistory = [
    { id: 1, service: 'Airtime', amount: '₦100', date: '2024-07-28' },
    { id: 2, service: 'Data', amount: '₦500', date: '2024-07-27' },
    { id: 3, service: 'Electricity', amount: '₦2000', date: '2024-07-26' },
  ];
  return (
    <Card>
      <h3 className="text-2xl font-bold text-gray-800 mb-4">Transaction History</h3>
      {mockHistory.length > 0 ? (
        <ul className="space-y-4">
          {mockHistory.map(transaction => (
            <li key={transaction.id} className="flex justify-between items-center bg-gray-50 p-4 rounded-xl">
              <div>
                <p className="font-semibold text-gray-700">{transaction.service}</p>
                <p className="text-sm text-gray-500">{transaction.date}</p>
              </div>
              <span className="text-lg font-bold text-indigo-600">{transaction.amount}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No transactions found.</p>
      )}
    </Card>
  );
};

/**
 * A form for submitting user feedback.
 * @param {object} props - The component props.
 * @param {function} props.onSubmit - Function to handle form submission.
 * @param {boolean} props.isLoading - Loading state.
 */
const FeedbackForm = ({ onSubmit, isLoading }) => {
  const [feedback, setFeedback] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    if (feedback.trim()) {
      onSubmit('Feedback', { message: feedback });
      setFeedback('');
    }
  };
  return (
    <Card>
      <h3 className="text-2xl font-bold text-gray-800 mb-4">Give Us Feedback</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          className="w-full p-3 rounded-lg border border-gray-300 focus:ring focus:ring-indigo-200 focus:border-indigo-500 transition-colors"
          placeholder="Your feedback helps us improve..."
          rows="4"
          required
        ></textarea>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full px-6 py-3 bg-indigo-600 text-white rounded-full font-semibold hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Submitting...' : 'Submit Feedback'}
        </button>
      </form>
    </Card>
  );
};

/**
 * A generic template for service forms (Airtime, Data, etc.).
 * @param {object} props - The component props.
 * @param {string} props.service - The name of the service.
 * @param {function} props.onSubmit - Function to handle form submission.
 * @param {boolean} props.isLoading - Loading state.
 * @param {function} props.onClose - Function to close the form view.
 */
const FormTemplate = ({ service, onSubmit, isLoading, onClose }) => {
  const [value, setValue] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(service, { value, amount });
  };
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold text-gray-800">{service} Form</h3>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-800 transition-colors">
          <X size={24} />
        </button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Value</label>
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-300 focus:ring focus:ring-indigo-200 focus:border-indigo-500 transition-colors"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Amount (₦)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-300 focus:ring focus:ring-indigo-200 focus:border-indigo-500 transition-colors"
            required
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full px-6 py-3 bg-indigo-600 text-white rounded-full font-semibold hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Processing...' : `Pay for ${service}`}
        </button>
      </form>
    </div>
  );
};

// Map service names to their corresponding form components
const dashboardForms = {
  'Airtime': (props) => <FormTemplate service="Airtime" {...props} />,
  'Data': (props) => <FormTemplate service="Data" {...props} />,
  'Electricity': (props) => <FormTemplate service="Electricity" {...props} />,
  'Cable TV': (props) => <FormTemplate service="Cable TV" {...props} />,
  'Fund Wallet': (props) => <FormTemplate service="Fund Wallet" {...props} />,
};

// --- The Dashboard Component Itself ---

const DashboardContent = ({ loggedInUser, alert, setAlert, isLoading, setIsLoading }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const services = [
    { name: 'Airtime', icon: <Phone />, path: 'airtime' },
    { name: 'Data', icon: <Airplay />, path: 'data' },
    { name: 'Electricity', icon: <Zap />, path: 'electricity' },
    { name: 'Cable TV', icon: <Globe />, path: 'cable-tv' },
  ];
  
  const userBalance = '₦1,500.00';
  const firstName = loggedInUser || 'User';
  
  const handleSubmit = async (service, formData) => {
    setIsLoading(true);
    // Mock backend logic - replace with actual API calls
    await new Promise(resolve => setTimeout(resolve, 1000));
    setAlert({ message: `Transaction for ${service} successful!`, isSuccess: true });
    setIsLoading(false);
    navigate('../'); // Navigate back to the dashboard home
  };

  const handleServiceGridClick = (path) => {
    navigate(`services/${path}`);
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <Routes>
        <Route path="/" element={
          <>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-6">Welcome back, {firstName}!</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl p-8 text-white shadow-lg">
                  <h3 className="text-xl font-medium">Available Balance</h3>
                  <p className="text-5xl font-extrabold mt-2">{userBalance}</p>
                  <p className="text-sm mt-4 opacity-80">Fund your wallet to make payments with ease.</p>
                  <button
                    onClick={() => navigate('services/fund-wallet')}
                    className="mt-4 px-6 py-3 bg-white text-indigo-600 rounded-full font-semibold hover:bg-gray-100 transition-colors"
                  >
                    Fund Wallet
                  </button>
                </div>
                <div className="bg-white rounded-3xl p-6 shadow-lg">
                  <h3 className="text-2xl font-bold text-gray-800 mb-6">Services</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {services.map(service => (
                      <button
                        key={service.name}
                        onClick={() => handleServiceGridClick(service.path)}
                        className={`group flex flex-col items-center justify-center p-6 rounded-2xl shadow-md transition-all transform hover:-translate-y-1 bg-gray-100 hover:bg-indigo-50`}
                      >
                        <div className="p-4 bg-white rounded-full group-hover:bg-indigo-100 transition-colors mb-4">{React.cloneElement(service.icon, { className: 'w-8 h-8 text-indigo-500 group-hover:text-indigo-600 transition-colors' })}</div>
                        <span className="text-lg font-semibold text-gray-700">{service.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
                {location.pathname === '/' && (
                  <FeedbackForm onSubmit={handleSubmit} isLoading={isLoading} />
                )}
              </div>
              <div className="lg:col-span-1 space-y-8">
                <TransactionHistoryList />
              </div>
            </div>
          </>
        } />
        {/* Routes for service forms */}
        <Route path="services/:serviceName" element={
          <div className="flex justify-center items-start lg:items-center py-8">
            <Card className="w-full max-w-lg">
              <FormTemplate
                service={location.pathname.split('/').pop().replace('-', ' ')}
                onSubmit={handleSubmit}
                isLoading={isLoading}
                onClose={() => navigate('../')}
              />
            </Card>
          </div>
        } />
        {/* Routes for profile actions */}
        <Route path="profile/:action" element={
          <div className="flex justify-center items-start lg:items-center py-8">
            <Card className="w-full max-w-lg">
              <ProfileActions
                action={location.pathname.split('/').pop()}
                onBackToDashboard={() => navigate('../')}
              />
            </Card>
          </div>
        } />
      </Routes>
    </main>
  );
};

const Dashboard = ({ loggedInUser, setAppState }) => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState({ message: '', isSuccess: false });
  const navigate = useNavigate();
  const profileRef = useRef(null);

  const firstLetter = (loggedInUser || 'User').charAt(0).toUpperCase();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleMobileMenuItemClick = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };
  
  const handleProfileAction = (action) => {
    setIsProfileMenuOpen(false);
    navigate(`profile/${action}`);
  };

  const handleLogout = () => {
    // You'll need to update this to handle your logout logic
    console.log("Logging out...");
    if (setAppState) {
      setAppState('auth');
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        .font-sans { font-family: 'Inter', sans-serif; }
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
        @keyframes fade-in-down {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-down { animation: fade-in-down 0.2s ease-out forwards; }
      `}</style>
      <script src="https://cdn.tailwindcss.com"></script>
      <SideMenuPanel isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} onMenuItemClick={handleMobileMenuItemClick} />
      <nav className="bg-white shadow-sm py-4 mb-8">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center">
            <button id="mobile-menu-button" onClick={() => setIsMobileMenuOpen(true)} className="md:hidden p-2 mr-2 text-gray-700 hover:text-indigo-600 transition-colors"><Menu size={24} /></button>
            <h1 className="text-2xl font-bold text-indigo-600">AjalaGSM</h1>
          </div>
          <div className="flex items-center space-x-4 relative" ref={profileRef}>
            <button onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)} className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-transform transform hover:scale-110" aria-label="User Profile Menu">{firstLetter}</button>
            {isProfileMenuOpen && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-2 z-10 animate-fade-in-down">
                <button onClick={() => handleProfileAction('edit-profile')} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors flex items-center"><User size={20} className="mr-2"/>Edit Profile</button>
                <button onClick={() => handleProfileAction('change-password')} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors flex items-center"><Lock size={20} className="mr-2"/>Change Password</button>
                <div className="border-t border-gray-200 mt-2 pt-2">
                  <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center"><LogOut size={20} className="mr-2"/>Logout</button>
                  <button onClick={() => handleProfileAction('delete-account')} className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center"><Trash2 size={20} className="mr-2"/>Delete Account</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
      <DashboardContent
        loggedInUser={loggedInUser}
        alert={alert}
        setAlert={setAlert}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
      <Alert message={alert.message} isSuccess={alert.isSuccess} />
      <footer className="bg-white py-8 mt-12 text-center text-gray-500">
        <div className="container mx-auto px-4"><p>© 2024 AjalaGSM. All rights reserved.</p></div>
      </footer>
    </div>
  );
};

export default Dashboard;
