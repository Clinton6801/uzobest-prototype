import React from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';

/**
 * A reusable modal component for displaying custom alerts and confirmations.
 *
 * @param {object} props The component props.
 * @param {string} props.title The title of the alert.
 * @param {string} props.message The main message to display.
 * @param {'success' | 'error'} props.type The type of alert, which determines the icon and colors.
 * @param {() => void} props.onClose A function to call when the alert is closed.
 * @param {() => void} [props.onConfirm] An optional function to call for a confirmation action.
 */
const CustomAlert = ({ title, message, type, onClose, onConfirm }) => {
  // Determine which icon and title color to use based on the alert type
  const icon = type === 'success' ? <CheckCircle size={48} className="text-green-500" /> : <AlertCircle size={48} className="text-red-500" />;
  const titleColor = type === 'success' ? 'text-green-600' : 'text-red-600';

  // Do not render the component if there is no message
  if (!message) return null;

  return (
    // The main modal overlay
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4 animate-fade-in">
      {/* The alert card itself */}
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-sm">
        <div className="flex flex-col items-center text-center">
          {/* Icon based on the alert type */}
          <div className="mb-4">{icon}</div>

          {/* Title and message */}
          <h3 className={`text-2xl font-bold mb-2 ${titleColor}`}>{title}</h3>
          <p className="text-gray-600 mb-6">{message}</p>

          {/* Action buttons */}
          <div className="flex space-x-4">
            {/* The "Confirm" button is only shown if an onConfirm function is provided */}
            {onConfirm && (
              <button
                onClick={onConfirm}
                className={`px-6 py-3 rounded-full font-semibold transition-colors
                  ${type === 'success' ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-red-600 text-white hover:bg-red-700'}`}
              >
                Confirm
              </button>
            )}
            <button
              onClick={onClose}
              className="px-6 py-3 rounded-full font-semibold bg-gray-200 text-gray-800 hover:bg-gray-300 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
      <style>{`
        /* Add a simple fade-in animation for the modal */
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default CustomAlert;
