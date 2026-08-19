import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './Store';
import { logout } from '../Components/Store/authSlice';

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Extract user details and tokens from our central state engine
  const { user, token } = useSelector(function (state: RootState) {
    return state.auth;
  });

  // Explicit handler function to terminate sessions and redirect
  function handleLogout() {
    dispatch(logout());
    navigate('/login');
  }

  // If there is no token present, do not show the navbar at all
  if (!token) {
    return null;
  }

  // Safely extract the first letter of the user's name for our avatar layout
  let userInitial = '';
  if (user && user.name) {
    userInitial = user.name[0].toUpperCase();
  }

  return (
    <nav className="navbar">
      <div className="container nav-inner">
        
        {/* Main Application Logo Branding Text Layout */}
        <Link to="/" className="brand">
          🛒 <span>Shopping List</span>
        </Link>
        
        {/* Navigation Destination Link Links Block */}
        <div className="nav-links">
          
          {/* Home navigation point highlighting checks */}
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
            Home
          </Link>
          
          {/* Profile navigation point highlighting checks */}
          <Link to="/profile" className={location.pathname === '/profile' ? 'active' : ''}>
            Profile
          </Link>
          
          {/* Profile badge information panel blocks */}
          {user ? (
            <span className="user-badge">
              <span className="avatar">{userInitial}</span>
              {user.name}
            </span>
          ) : null}
          
          {/* Standard explicit logout trigger option element */}
          <button onClick={handleLogout} className="btn btn-danger btn-sm">
            Logout
          </button>
          
        </div>
      </div>
    </nav>
  );
}

export default Navbar;