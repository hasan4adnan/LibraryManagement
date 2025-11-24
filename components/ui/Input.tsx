import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  className = '',
  ...props
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium mb-2 text-light-text dark:text-dark-text">
          {label}
        </label>
      )}
      <input
        className={`
          w-full px-4 py-2 rounded-xl border
          bg-light-panel dark:bg-dark-panel
          border-light-border dark:border-dark-border
          text-light-text dark:text-dark-text
          placeholder-gray-400 dark:placeholder-gray-500
          focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary
          focus:border-transparent transition-all duration-200
          ${error ? 'border-red-500 dark:border-red-500' : ''}
          ${className}
        `}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-500 dark:text-red-400">{error}</p>
      )}
    </div>
  );
};

