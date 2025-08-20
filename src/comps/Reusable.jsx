// src/components/common-components.jsx
import React from 'react';

/**
 * A simple Card component to wrap the auth forms.
 * @param {Object} props - The component's props.
 * @param {React.ReactNode} props.children - The content to be wrapped.
 * @param {string} [props.className] - Optional CSS classes for the card.
 */
export const Card = ({ children, className = '' }) => (
  <div className={`bg-white rounded-2xl shadow-xl p-8 w-full ${className}`}>
    {children}
  </div>
);

/**
 * A simple ErrorBoundary component to prevent the app from crashing.
 * In a real application, you would log the error to a service like Sentry.
 */
export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
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
