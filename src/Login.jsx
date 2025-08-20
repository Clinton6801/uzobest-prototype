// src/pages/Login.jsx
import React, { useState, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card } from './comps/Reusable';

// A placeholder for a global alert system. You can replace this with your actual implementation.
const setAlert = (message, isSuccess) => {
  console.log(`Alert: ${isSuccess ? 'SUCCESS' : 'ERROR'} - ${message}`);
};

/**
 * React component for the Login and Forgot Password pages.
 * @param {Object} props - The component's props.
 * @param {Function} props.onLogin - Function to set the logged-in user's data.
 */
const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const BACKEND_URL = 'https://halfat-backend.onrender.com';

  // State to manage form inputs and view
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    otp: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [showNewPasswordForm, setShowNewPasswordForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleForgotPasswordSubmit = useCallback(async (e) => {
    e.preventDefault();
    setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  }, [formData]);

  const handleOtpSubmit = useCallback(async (e) => {
    e.preventDefault();
    setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  }, [formData]);

  const handleNewPasswordSubmit = useCallback(async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const { email, newPassword, confirmPassword } = formData;

    if (newPassword !== confirmPassword) {
      setAlert('Passwords do not match.', false);
      setIsLoading(false);
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
        setShowForgotPassword(false);
        setFormData({ ...formData, newPassword: '', confirmPassword: '' });
      } else {
        setAlert(data.message || 'Failed to reset password. Please try again.', false);
      }
    } catch (error) {
      console.error('API call failed:', error);
      setAlert('Network error. Please try again later.', false);
    } finally {
      setIsLoading(false);
    }
  }, [formData]);

  const handleLoginSubmit = useCallback(async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const { email, password } = formData;
    const endpoint = `${BACKEND_URL}/api/auth/login`;

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (response.ok) {
        onLogin(data.user.firstName);
        navigate('/dashboard');
        setAlert('Login successful!', true);
      } else {
        setAlert(data.message || `An error occurred.`, false);
      }
    } catch (error) {
      console.error('API call failed:', error);
      setAlert('Network error. Please try again later.', false);
    } finally {
      setIsLoading(false);
    }
  }, [formData, navigate, onLogin]);

  const renderTitle = () => {
    if (showForgotPassword) return 'Forgot Password';
    if (showOtpInput) return 'Verify OTP';
    if (showNewPasswordForm) return 'Create a New Password';
    return 'Sign In';
  };

  const renderSubtitle = () => {
    if (showForgotPassword) return 'Enter your email to receive an OTP';
    if (showOtpInput) return 'Enter the OTP sent to your email';
    if (showNewPasswordForm) return 'Create and confirm your new password';
    return 'Enter your credentials';
  };

  const renderForm = () => {
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
            disabled={isLoading}
            className="w-full px-6 py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-colors shadow-lg disabled:bg-gray-400"
          >
            {isLoading ? 'Sending...' : 'Send OTP'}
          </button>
          <button
            type="button"
            onClick={() => setShowForgotPassword(false)}
            className="w-full mt-2 text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            &larr; Back to Login
          </button>
        </form>
      );
    }

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
            disabled={isLoading}
            className="w-full px-6 py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-colors shadow-lg disabled:bg-gray-400"
          >
            {isLoading ? 'Verifying...' : 'Verify OTP'}
          </button>
          <button
            type="button"
            onClick={() => setShowOtpInput(false) || setShowForgotPassword(true)}
            className="w-full mt-2 text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            &larr; Back to Email
          </button>
        </form>
      );
    }

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
            disabled={isLoading}
            className="w-full px-6 py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-colors shadow-lg disabled:bg-gray-400"
          >
            {isLoading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>
      );
    }

    // Default Login Form
    return (
      <form onSubmit={handleLoginSubmit} className="space-y-4">
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
        <div className="flex justify-end text-sm">
          <button
            type="button"
            onClick={() => setShowForgotPassword(true)}
            className="text-blue-600 hover:text-blue-800 transition-colors font-medium"
          >
            Forgot password?
          </button>
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full px-6 py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-colors shadow-lg disabled:bg-gray-400"
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 font-sans">
      <Card className="max-w-md">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-900">{renderTitle()}</h2>
          <p className="text-gray-500">{renderSubtitle()}</p>
        </div>

        {renderForm()}

        {!showForgotPassword && !showOtpInput && !showNewPasswordForm && (
          <div className="text-center mt-4 text-sm">
            <p className="text-gray-500">
              Don't have an account?
              <Link to="/register" className="text-blue-600 ml-1 hover:text-blue-800 transition-colors font-medium">
                Sign Up
              </Link>
            </p>
            <Link to="/" className="mt-2 text-sm text-gray-500 hover:text-gray-700 transition-colors">
              &larr; Back to Home
            </Link>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Login;
