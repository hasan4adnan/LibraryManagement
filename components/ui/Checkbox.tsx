import React from 'react';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  className = '',
  ...props
}) => {
  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        className={`
          w-4 h-4 rounded border-light-border dark:border-dark-border
          bg-light-panel dark:bg-dark-panel
          text-light-primary dark:text-dark-primary
          focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary
          ${className}
        `}
        {...props}
      />
      {label && (
        <label className="ml-2 text-sm text-light-text dark:text-dark-text">
          {label}
        </label>
      )}
    </div>
  );
};

