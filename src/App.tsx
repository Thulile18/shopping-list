import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './store';

// Import our components
import Navbar from './components/common/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Profile from './pages/Profile';

function App() {
  // Check if the user is logged in by looking for the token inside our Redux store
  const { token } = useSelector(function (state: RootState) {
    return state.auth;
  });
  
  const isLoggedIn = Boolean(token);

  return (
    <div className="app-container">
      <Navbar />
      
      <Routes>
        {/* Public Routes: If logged in, send them home automatically */}
        <Route
          path="/login"
          element={isLoggedIn === true ? <Navigate to="/" replace /> : <Login />}
        />
        <Route
          path="/register"
          element={isLoggedIn === true ? <Navigate to="/" replace /> : <Register />}
        />

        {/* Private Routes: If NOT logged in, redirect them back to the login screen */}
        <Route
          path="/"
          element={isLoggedIn === true ? <Home /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/profile"
          element={isLoggedIn === true ? <Profile /> : <Navigate to="/login" replace />}
        />

        {/* Catch-all: Send any broken web links back to the home page */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
