import React from 'react';
import AuthCard from '../components/common/AuthCard';
import RegisterForm from '../components/auth/RegisterForm';

function Register() {
  return (
    <div className="auth-page">
      {/* Structural layout card passing display header settings dynamically */}
      <AuthCard title="Create Account" subtitle="Start managing your shopping lists today">
        {/* Render our modular user form layout box nested inside the card wrapper */}
        <RegisterForm />
      </AuthCard>
    </div>
  );
}

export default Register;