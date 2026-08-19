import React from 'react';

// Simple interface to layout our component parameter definitions
interface InputProps {
  label?: string;
  error?: string;
  id?: string;
  name?: string;
  type?: string;
  placeholder?: string;
  value?: string;
  min?: string;
  required?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  style?: React.CSSProperties;
}

function Input({ label, error, id, name, type = 'text', placeholder, value, min, required, onChange, disabled, style }: InputProps) {
  
  // Figure out the element ID to tie labels to inputs cleanly
  const inputId = id || name || 'input-field';

  // Build out our style class strings step-by-step
  let inputClasses = 'form-control';
  if (error) {
    inputClasses = inputClasses + ' error';
  }

  return (
    <div className="form-group">
      {/* Show the descriptive text label only if it was supplied */}
      {label ? <label htmlFor={inputId}>{label}</label> : null}
      
      <input
        id={inputId}
        name={name}
        type={type}
        className={inputClasses}
        placeholder={placeholder}
        value={value}
        min={min}
        required={required}
        onChange={onChange}
        disabled={disabled}
        style={style}
      />
      
      {/* Show the alert text layer beneath the line item if validation drops */}
      {error ? <div className="error-text">{error}</div> : null}
    </div>
  );
}

export default Input;
