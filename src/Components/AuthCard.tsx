import React from 'react';

// Simple interface to layout our component parameter definitions
interface AuthCardProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

function AuthCard({ title, subtitle, children }: AuthCardProps) {
  return (
    <div className="auth-card">
      {/* Dynamic Title Header */}
      <h2>{title}</h2>
      
      {/* Dynamic Subtitle Description Text */}
      <p className="subtitle">{subtitle}</p>
      
      {/* Render form fields or inputs nested inside the card */}
      {children}
    </div>
  );
}

export default AuthCard;