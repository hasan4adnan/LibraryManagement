import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
}

export const Select: React.FC<SelectProps> = ({
  label,
  error,
  options,
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
      <select
        className={`
          w-full px-4 py-2 rounded-xl border
          bg-light-panel dark:bg-dark-panel
          border-light-border dark:border-dark-border
          text-light-text dark:text-dark-text
          focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary
          focus:border-transparent transition-all duration-200
          cursor-pointer hover:border-light-primary dark:hover:border-dark-primary
          ${error ? 'border-red-500 dark:border-red-500' : ''}
          ${className}
        `}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="mt-1 text-sm text-red-500 dark:text-red-400">{error}</p>
      )}
    </div>
  );
};

