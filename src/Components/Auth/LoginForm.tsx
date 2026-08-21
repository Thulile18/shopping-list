import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { AppDispatch } from '../Store';
import { loginUser, clearError, selectAuthLoading, selectAuthError } from '../Store/authSlice';
import Input from '../Input';
import Button from '../Button';

function LoginForm() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const loading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLocalError('');

    if (email === '' || password === '') {
      setLocalError('Please fill in all fields');
      return;
    }

    const resultAction = await dispatch(loginUser({ email: email, password: password }));
    
    if (loginUser.fulfilled.match(resultAction)) {
      navigate('/');
    }
  }

  function handleCloseError() {
    dispatch(clearError());
    setLocalError('');
  }

  const displayError = error || localError || '';

  return (
    <div className="login-form-wrapper">
      
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
