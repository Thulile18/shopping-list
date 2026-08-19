import React from 'react';
import AuthCard from '../components/common/AuthCard';
import LoginForm from '../components/Auth/LoginForm';

function Login() {
  return (
    <div className="auth-page">
      {/* Structural layout card passing display header settings dynamically */}
      <AuthCard title="Welcome Back" subtitle="Sign in to your shopping list account">
        {/* Render our modular user form layout box nested inside the card wrapper */}
        <LoginForm />
      </AuthCard>
    </div>
  );
}

export default Login;