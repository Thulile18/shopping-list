import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../store';
import {
  loginUser,
  registerUser,
  logout,
  clearError,
  selectUser,
  selectToken,
  selectAuthLoading,
  selectAuthError,
  selectIsAuthenticated,
} from '../store/slices/authSlice';

export function useAuth() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  
  // Read our authentication states from our selectors
  const user = useSelector(selectUser);
  const token = useSelector(selectToken);
  const loading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  // Simple handler function to sign in a user
  async function login(email: string, password: string) {
    const resultAction = await dispatch(loginUser({ email: email, password: password }));
    
    // Check if the login dispatch was successful using standard action matching
    if (loginUser.fulfilled.match(resultAction)) {
      navigate('/');
      return { success: true };
    } else {
      return { success: false, error: error };
    }
  }

  // Simple handler function to sign up a new account
  async function register(data: {
    name: string;
    surname: string;
    email: string;
    password: string;
    cellNumber: string;
  }) {
    const resultAction = await dispatch(registerUser(data));
    
    // Check if the signup dispatch was successful using standard action matching
    if (registerUser.fulfilled.match(resultAction)) {
      navigate('/');
      return { success: true };
    } else {
      return { success: false, error: error };
    }
  }

  // Simple handler function to sign out and clear states
  function logoutUser() {
    dispatch(logout());
    navigate('/login');
  }

  // Simple helper function to clear global error states
  function clearAuthError() {
    dispatch(clearError());
  }

  // Return all functions and states cleanly inside a standard return object
  return {
    user: user,
    token: token,
    loading: loading,
    error: error,
    isAuthenticated: isAuthenticated,
    login: login,
    register: register,
    logout: logoutUser,
    clearError: clearAuthError,
  };
}