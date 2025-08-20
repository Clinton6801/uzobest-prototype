// App.js
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// ✅ Import the separated Login and Register components
import Login from './Login';
import Register from './Register';
import DashboardPage from './Dashboard';
import HomePageContent from './Homepage';

// A custom Alert component to display pop-up messages.
const Alert = ({ message, isSuccess, onClose }) => {
  if (!message) return null;

  return (
    <div className={`fixed bottom-4 left-1/2 -translate-x-1/2 
      px-6 py-3 rounded-full shadow-lg text-white font-semibold 
      animate-fade-in flex items-center space-x-4 
      ${isSuccess ? 'bg-green-500' : 'bg-red-500'}`}
    >
      <span>{message}</span>
      <button onClick={onClose} className="font-bold text-lg">×</button>
    </div>
  );
};

export default function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [alert, setAlert] = useState(null);

  // Function to set the logged-in user and state
  const handleLogin = (firstName) => {
    setLoggedInUser(firstName);
  };

  // Function to display an alert message that fades away
  const handleSetAlert = (message, isSuccess = false) => {
    setAlert({ message, isSuccess });
    setTimeout(() => setAlert(null), 3000);
  };

  // Function to handle user logout
  const handleLogout = () => {
    setLoggedInUser(null);
  };

  return (
    <BrowserRouter>
      {/* Styles for the page and animations */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        .font-sans {
          font-family: 'Inter', sans-serif;
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
      `}</style>
      
      {/* Centralized alert component */}
      <Alert
        message={alert?.message}
        isSuccess={alert?.isSuccess}
        onClose={() => setAlert(null)}
      />

      {/* React Router setup for navigating between pages */}
      <Routes>
        <Route 
          path="/" 
          element={<HomePageContent setAlert={handleSetAlert} />} 
        />
        {/* ✅ New routes for the separate Login and Register components */}
        <Route 
          path="/login" 
          element={<Login setAlert={handleSetAlert} onLogin={handleLogin} />} 
        />
        <Route 
          path="/register" 
          element={<Register setAlert={handleSetAlert} onLogin={handleLogin} />} 
        />
        <Route 
          path="/dashboard" 
          element={<DashboardPage setAlert={handleSetAlert} loggedInUser={loggedInUser} onLogout={handleLogout} />} 
        />
      </Routes>
    </BrowserRouter>
  );
}
