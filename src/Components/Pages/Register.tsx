import React from 'react';
import AuthCard from '../AuthCard';
import RegisterForm from '../Auth/RegistrationForm';

function Register() {
  return (
    <div className="auth-page">

      <AuthCard title="Create Account" subtitle="Start managing your shopping lists today">
       
        <RegisterForm />
      </AuthCard>
    </div>
  );
}

export default Register;
