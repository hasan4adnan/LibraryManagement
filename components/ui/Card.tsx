import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  padding = 'md',
}) => {
  const paddings = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  return (
    <div
      className={`
        rounded-xl border
        bg-light-panel dark:bg-dark-panel
        border-light-border dark:border-dark-border
        shadow-sm hover:shadow-md transition-shadow
        ${paddings[padding]}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

