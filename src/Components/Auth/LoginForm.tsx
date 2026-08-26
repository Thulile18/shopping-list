import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../Hooks/useAuth';
import Input from '../Input';
import Button from '../Button';

function LoginForm() {
  const { login, loading, error, clearError } = useAuth();
  const [localError, setLocalError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const location = useLocation();

  useEffect(() => {
    setEmail('');
    setPassword('');
    setLocalError('');
  }, [location]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLocalError('');

    if (email === '' || password === '') {
      setLocalError('Please fill in all fields');
      return;
    }
 
    const result = await login(email, password);

    if (result && result.success === true) {
      setEmail('');
      setPassword('');
    }
  }

  function handleCloseError() {
    clearError();
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
      
      <form onSubmit={handleSubmit} autoComplete="new-password">
        <Input
          id="login-email"
          label="Email Address"
          type="text"
          value={email}
          onChange={function (e) { setEmail(e.target.value); }}
          placeholder="you@example.com"
          required
        />
        
        <Input
          id="login-password"
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
      
      <div className="divider"> or </div>
      
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



