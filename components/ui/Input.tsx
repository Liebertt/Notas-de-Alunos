import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  forceInteger?: boolean;
}

export const Input: React.FC<InputProps> = ({ 
  label, 
  error, 
  className = '', 
  forceInteger = false,
  onKeyDown,
  ...props 
}) => {
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (forceInteger) {
      // Prevent entering decimals or 'e'
      if (['.', ',', 'e', 'E', '+', '-'].includes(e.key)) {
        e.preventDefault();
      }
    }
    if (onKeyDown) onKeyDown(e);
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-slate-700 mb-1.5">
        {label}
      </label>
      <input
        className={`
          block w-full px-3 py-2.5 
          bg-white border rounded-lg 
          text-slate-900 placeholder-slate-400 
          focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent
          transition duration-150 ease-in-out
          ${error ? 'border-red-300 focus:ring-red-500' : 'border-slate-300'}
          ${className}
        `}
        onKeyDown={handleKeyDown}
        {...props}
      />
      {error && (
        <p className="mt-1 text-xs text-red-600 animate-fadeIn">{error}</p>
      )}
    </div>
  );
};