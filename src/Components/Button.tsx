import React from 'react';

// Simple interface to layout our component parameter definitions
interface ButtonProps {
  variant?: string;
  size?: string;
  block?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

function Button({ variant = 'primary', size = 'md', block = false, children, onClick, disabled, type }: ButtonProps) {
  
  // Start building our button CSS classes step-by-step
  let classes = 'btn';
  
  // Append the visual flavor class style name
  classes = classes + ' btn-' + variant;
  
  // Check and append custom sizing properties if necessary
  if (size === 'sm') {
    classes = classes + ' btn-sm';
  } else if (size === 'lg') {
    classes = classes + ' btn-lg';
  }
  
  // Append block layout class formatting rules if activated
  if (block === true) {
    classes = classes + ' btn-block';
  }

  return (
    <button 
      type={type}
      className={classes} 
      onClick={onClick} 
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;