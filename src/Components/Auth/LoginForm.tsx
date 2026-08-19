import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { AppDispatch } from '../../store';
import { loginUser, clearError, selectAuthLoading, selectAuthError } from '../../store/slices/authSlice';
import Input from '../common/Input';
import Button from '../common/Button';

function LoginForm() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  
  // Read state parameters from selectors
  const loading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);

  // Set up simple individual variables for each text box input
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState('');

  // Runs when user hits the submission action trigger
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLocalError('');

    // Explicit validation check for empty string inputs
    if (email === '' || password === '') {
      setLocalError('Please fill in all fields');
      return;
    }

    // Process our dispatch configuration payload
    const resultAction = await dispatch(loginUser({ email: email, password: password }));
    
    // Evaluate if transactions executed flawlessly
    if (loginUser.fulfilled.match(resultAction)) {
      navigate('/');
    }
  }

  // Clear all tracking logs simultaneously
  function handleCloseError() {
    dispatch(clearError());
    setLocalError('');
  }

  // Figure out what alert messages require mapping display outputs
  const displayError = error || localError || '';

  return (
    <div className="login-form-wrapper">
      
      {/* Show alert banner box modal layer if error parameters drop */}
      {displayError !== '' ? (
        <div className="auth-error">
          <span>{displayError}</span>
          <button type="button" onClick={handleCloseError}>✕</button>
        </div>
      ) : null}
      
      <form onSubmit={handleSubmit}>
        <Input
          label="Email Address"
          type="email"
          value={email}
          onChange={function (e) { setEmail(e.target.value); }}
          placeholder="you@example.com"
          required
        />
        
        <Input
          label="Password"
          type="password"
          value={password}
          onChange={function (e) { setPassword(e.target.value); }}
          placeholder="Enter your password"
          required
        />
        
        <Button type="submit" variant="primary" block size="lg" disabled={loading}>
          {loading === true ? 'Signing in...' : 'Sign In'}
        </Button>
      </form>
      
      <div className="divider">or</div>
      
      <p style={{ textAlign: 'center', color: '#718096' }}>
        Don't have an account?{' '}
        <Link to="/register" className="auth-link">
          Create one
        </Link>
      </p>
      
    </div>
  );
}

export default LoginForm;