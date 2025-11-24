'use client';

import React from 'react';
import { Button } from './Button';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  position?: 'left' | 'right';
}

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  position = 'right',
}) => {
  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black bg-opacity-50 dark:bg-opacity-70"
        onClick={onClose}
      />
      <div
        className={`
          fixed top-0 ${position === 'right' ? 'right-0' : 'left-0'} bottom-0 z-50
          w-full max-w-md
          bg-light-panel dark:bg-dark-panel
          border-${position === 'right' ? 'l' : 'r'} border-light-border dark:border-dark-border
          shadow-xl
          flex flex-col
        `}
      >
        {title && (
          <div className="flex items-center justify-between p-6 border-b border-light-border dark:border-dark-border">
            <h2 className="text-xl font-semibold text-light-text dark:text-dark-text">
              {title}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}
        <div className="flex-1 overflow-y-auto p-6">{children}</div>
        {footer && (
          <div className="flex items-center justify-end gap-3 p-6 border-t border-light-border dark:border-dark-border">
            {footer}
          </div>
        )}
      </div>
    </>
  );
};

