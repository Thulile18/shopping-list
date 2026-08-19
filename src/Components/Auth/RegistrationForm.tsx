import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { AppDispatch } from '../../store';
import { registerUser, clearError, selectAuthLoading, selectAuthError } from '../../store/slices/authSlice';
import Input from '../common/Input';
import Button from '../common/Button';

function RegisterForm() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  
  // Read state parameters from selectors
  const loading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);

  // Set up simple individual variables for each text box input field
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [cellNumber, setCellNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [localError, setLocalError] = useState('');

  // Runs when user hits the submission action trigger button
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLocalError('');

    // Explicit validation check for empty string inputs
    if (name === '' || surname === '' || email === '' || cellNumber === '' || password === '' || confirmPassword === '') {
      setLocalError('Please fill in all fields');
      return;
    }
    
    // Validation check to make sure both passwords match exactly
    if (password !== confirmPassword) {
      setLocalError('Passwords do not match');
      return;
    }
    
    // Validation check to make sure password length meets criteria
    if (password.length < 6) {
      setLocalError('Password must be at least 6 characters');
      return;
    }

    // Process our dispatch registration action payload configuration
    const resultAction = await dispatch(registerUser({ 
      name: name, 
      surname: surname, 
      email: email, 
      password: password, 
      cellNumber: cellNumber 
    }));
    
    // Evaluate if transactions executed flawlessly using standard Redux matchers
    if (registerUser.fulfilled.match(resultAction)) {
      navigate('/');
    }
  }

  // Clear all error tracking logs simultaneously
  function handleCloseError() {
    dispatch(clearError());
    setLocalError('');
  }

  // Figure out what alert messages require mapping display outputs
  const displayError = error || localError || '';

  return (
    <div className="register-form-wrapper">
      
      {/* Show alert banner box layer if error parameters exist */}
      {displayError !== '' ? (
        <div className="auth-error">
          <span>{displayError}</span>
          <button type="button" onClick={handleCloseError}>✕</button>
        </div>
      ) : null}
      
      <form onSubmit={handleSubmit}>
        {/* First Name & Surname Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem' }}>
          <Input
            label="First Name"
            value={name}
            onChange={function (e) { setName(e.target.value); }}
            placeholder="John"
            required
          />
          <Input
            label="Surname"
            value={surname}
            onChange={function (e) { setSurname(e.target.value); }}
            placeholder="Doe"
            required
          />
        </div>
        
        <Input
          label="Email Address"
          type="email"
          value={email}
          onChange={function (e) { setEmail(e.target.value); }}
          placeholder="you@example.com"
          required
        />
        
        <Input
          label="Cell Number"
          value={cellNumber}
          onChange={function (e) { setCellNumber(e.target.value); }}
          placeholder="+27 82 123 4567"
          required
        />
        
        <Input
          label="Password"
          type="password"
          value={password}
          onChange={function (e) { setPassword(e.target.value); }}
          placeholder="Min 6 characters"
          required
        />
        
        <Input
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={function (e) { setConfirmPassword(e.target.value); }}
          placeholder="Confirm your password"
          required
        />
        
        <Button type="submit" variant="primary" block size="lg" disabled={loading}>
          {loading === true ? 'Creating account...' : 'Create Account'}
        </Button>
      </form>
      
      <div className="divider">or</div>
      
      <p style={{ textAlign: 'center', color: '#718096' }}>
        Already have an account?{' '}
        <Link to="/login" className="auth-link">
          Sign in
        </Link>
      </p>
      
    </div>
  );
}

export default RegisterForm;