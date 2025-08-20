import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

// This is the complete, corrected code for your AuthPage component.
// It contains all the JSX and logic for the authentication views.
// You can save this in your project as src/pages/AuthPage.jsx.

// A simple ErrorBoundary component to prevent the app from crashing.
// In a real application, you would log the error to a service like Sentry.
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
          <div className="bg-white p-8 rounded-2xl shadow-xl text-center">
            <h2 className="text-2xl font-bold text-red-600 mb-2">Something went wrong.</h2>
            <p className="text-gray-600">Please try refreshing the page or contact support.</p>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// A simple Card component to wrap the auth forms, as used in the original code.
const Card = ({ children, className = '' }) => (
  <div className={`bg-white rounded-2xl shadow-xl p-8 w-full ${className}`}>
    {children}
  </div>
);

/**
 * Main component for the authentication views (Login, Register, Forgot Password).
 * @param {Object} props - The component's props.
 * @param {Function} props.onLogin - Function to set the logged-in user's data. (This is the corrected prop name)
 * @param {Function} [props.setAlert] - Function to set a global alert message.
 */
const AuthPage = ({ onLogin, setAlert = () => {} }) => {
  // ✅ Initialize the useNavigate hook directly inside the component
  const navigate = useNavigate();

  // State to toggle between Login, Register, and now, Forgot Password views
  const [isLoginView, setIsLoginView] = useState(true);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [showNewPasswordForm, setShowNewPasswordForm] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: '',
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
      const response = await fetch(`${BACKEND_URL}/api/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();

      if (response.ok) {
        setAlert('An OTP has been sent to your email.', true);
        setShowForgotPassword(false);
        setShowOtpInput(true);
      } else {
        setAlert(data.message || 'An error occurred. Please try again.', false);
      }
    } catch (error) {
      console.error('API call failed:', error);
      setAlert('Network error. Please try again later.', false);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    const { email, otp } = formData;

    try {
      const response = await fetch(`${BACKEND_URL}/api/auth/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });
      const data = await response.json();

      if (response.ok) {
        setAlert('OTP verified successfully.', true);
        setShowOtpInput(false);
        setShowNewPasswordForm(true);
      } else {
        setAlert(data.message || 'Invalid OTP. Please try again.', false);
      }
    } catch (error) {
      console.error('API call failed:', error);
      setAlert('Network error. Please try again later.', false);
    }
  };

  const handleNewPasswordSubmit = async (e) => {
    e.preventDefault();
    const { email, newPassword, confirmPassword } = formData;

    if (newPassword !== confirmPassword) {
      setAlert('Passwords do not match.', false);
      return;
    }

    try {
      const response = await fetch(`${BACKEND_URL}/auth/update-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, newPassword }),
      });
      const data = await response.json();

      if (response.ok) {
        setAlert('Your password has been reset successfully. You can now log in.', true);
        setShowNewPasswordForm(false);
        setIsLoginView(true);
      } else {
        setAlert(data.message || 'Failed to reset password. Please try again.', false);
      }
    } catch (error) {
      console.error('API call failed:', error);
      setAlert('Network error. Please try again later.', false);
    }
  };

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    const { email, password, firstName, lastName, phone } = formData;
    let endpoint = '';
    let body = {};
    let successMessage = '';

    if (!isLoginView && !agreedToTerms) {
      setAlert('You must agree to the Terms & Conditions.', false);
      return;
    }

    if (isLoginView) {
      endpoint = `${BACKEND_URL}/api/auth/login`;
      body = { email, password };
      successMessage = 'Login successful!';
    } else {
      endpoint = `${BACKEND_URL}/api/auth/register`;
      // We are now sending all registration fields including phone number
      body = { email, password, firstName, lastName, phone };
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
        // Assume the backend returns user data, including their first name
        onLogin(data.user.firstName);
        // ✅ Replaced setAppState('dashboard') with navigate('/dashboard')
        navigate('/dashboard');
        setAlert(successMessage, true);
      } else {
        setAlert(data.message || `An error occurred.`, false);
      }
    } catch (error) {
      console.error('API call failed:', error);
      setAlert('Network error. Please try again later.', false);
    }
  }, [formData, isLoginView, agreedToTerms, navigate, onLogin, setAlert]);

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
          <p><strong>2. User Conduct:</strong> You agree not to use the service for any illegal or unauthorized purpose. You are solely responsible for your conduct and any data, text, files, information, firstNames, images, graphics, photos, profiles, audio and video clips, sounds, musical works, works of authorship, applications, links and other content or materials (collectively, "Content") that you submit, post, or display on or via the service.</p>
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

  const renderTitle = () => {
    if (showForgotPassword) return 'Forgot Password';
    if (showOtpInput) return 'Verify OTP';
    if (showNewPasswordForm) return 'Create a New Password';
    if (isLoginView) return 'Sign In';
    return 'Create an Account';
  };

  const renderSubtitle = () => {
    if (showForgotPassword) return 'Enter your email to receive an OTP';
    if (showOtpInput) return 'Enter the OTP sent to your email';
    if (showNewPasswordForm) return 'Create and confirm your new password';
    if (isLoginView) return 'Enter your credentials';
    return 'Join our community today!';
  };

  const renderForm = useCallback(() => {
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
              setAlert(null);
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
            {/* New Phone Number Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input
                type="tel" // Use 'tel' for better mobile keyboard support
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 bg-gray-100 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                placeholder="e.g., +15551234567"
              />
            </div>
          </>
        )}
        {isLoginView && (
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
        )}
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
                setAlert(null);
                setIsLoginView(true);
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
  }, [formData, isLoginView, agreedToTerms, handleForgotPasswordSubmit, handleOtpSubmit, handleNewPasswordSubmit, handleSubmit, setAlert, setShowForgotPassword, setShowOtpInput, setShowNewPasswordForm, setShowTermsModal, handleChange]);

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-100 font-sans antialiased flex items-center justify-center p-4">
        <style>
          {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
          body { font-family: 'Inter', sans-serif; }
          .transition-colors { transition-property: color, background-color, border-color, text-decoration-color, fill, stroke; }
          .rounded-2xl { border-radius: 1rem; }
          `}
        </style>

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
                    setAlert(null);
                  }}
                  className="text-blue-600 ml-1 hover:text-blue-800 transition-colors font-medium"
                >
                  {isLoginView ? 'Sign Up' : 'Sign In'}
                </button>
              </p>
              <button
                // ✅ Replaced setAppState('homepage') with navigate('/')
                onClick={() => navigate('/')}
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

export default AuthPage;
