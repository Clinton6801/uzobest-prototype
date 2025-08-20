// src/pages/Register.jsx
import React, { useState, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card } from './comps/Reusable';

// A placeholder for a global alert system. You can replace this with your actual implementation.
const setAlert = (message, isSuccess) => {
  console.log(`Alert: ${isSuccess ? 'SUCCESS' : 'ERROR'} - ${message}`);
};

/**
 * React component for the user registration page.
 * @param {Object} props - The component's props.
 * @param {Function} props.onLogin - Function to set the logged-in user's data after registration.
 */
const Register = ({ onLogin }) => {
  const navigate = useNavigate();
  const BACKEND_URL = 'https://halfat-backend.onrender.com';

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: '',
  });
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const { email, password, firstName, lastName, phone } = formData;
    
    if (!agreedToTerms) {
      setAlert('You must agree to the Terms & Conditions.', false);
      setIsLoading(false);
      return;
    }

    const endpoint = `${BACKEND_URL}/api/auth/register`;
    const body = { email, password, firstName, lastName, phone };
    const successMessage = 'Registration successful! You can now log in.';

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
        navigate('/dashboard');
        setAlert(successMessage, true);
      } else {
        setAlert(data.message || `An error occurred.`, false);
      }
    } catch (error) {
      console.error('API call failed:', error);
      setAlert('Network error. Please try again later.', false);
    } finally {
      setIsLoading(false);
    }
  }, [formData, agreedToTerms, navigate, onLogin]);

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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 font-sans">
      {showTermsModal && <TermsModal />}
      <Card className="max-w-md">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-900">Create an Account</h2>
          <p className="text-gray-500">Join our community today!</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
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
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="tel"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 bg-gray-100 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              placeholder="e.g., +15551234567"
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
          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-6 py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-colors shadow-lg disabled:bg-gray-400"
          >
            {isLoading ? 'Registering...' : 'Register'}
          </button>
        </form>
        <div className="text-center mt-4 text-sm">
          <p className="text-gray-500">
            Already have an account?
            <Link to="/login" className="text-blue-600 ml-1 hover:text-blue-800 transition-colors font-medium">
              Sign In
            </Link>
          </p>
          <Link to="/" className="mt-2 text-sm text-gray-500 hover:text-gray-700 transition-colors">
            &larr; Back to Home
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default Register;
