import React from 'react';

interface AuthCardProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}
function AuthCard({ title, subtitle, children }: AuthCardProps) {
  return (
    <div className="auth-card">
      
      <div className="auth-icon"> 🛒 </div>

      <h2>{title}</h2>
      
      <p className="subtitle">{subtitle}</p>
    
      {children}
    </div>
  );
}
export default AuthCard;
