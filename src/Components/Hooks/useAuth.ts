import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../Store';
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
} from '../Store/authSlice';

export function useAuth() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const token = useSelector(selectToken);
  const loading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  async function login(email: string, password: string) {
    const resultAction = await dispatch(loginUser({ email: email, password: password }));
    
    if (loginUser.fulfilled.match(resultAction)) {
      navigate('/');
      return { success: true };
    } else {
      return { success: false, error: error };
    }
  }

  async function register(data: {
    name: string;
    surname: string;
    email: string;
    password: string;
    cellNumber: string;
  }) {
    const resultAction = await dispatch(registerUser(data));
    
    if (registerUser.fulfilled.match(resultAction)) {
      navigate('/');
      return { success: true };
    } else {
      return { success: false, error: error };
    }
  }

    function logoutUser() {
    dispatch(logout());
    navigate('/');
  }

  function clearAuthError() {
    dispatch(clearError());
  }

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
