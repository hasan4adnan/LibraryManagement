'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '../ui/Button';
import { ThemeToggle } from './ThemeToggle';
import { LanguageSelector } from './LanguageSelector';

export const Navbar: React.FC = () => {
  const t = useTranslations();

  return (
    <nav className="
      h-16 border-b border-light-border dark:border-dark-border
      bg-light-panel dark:bg-dark-panel
      flex items-center justify-between px-6
    ">
      <div className="flex items-center gap-4">
        <h2 className="text-lg font-semibold text-light-text dark:text-dark-text">
          Library Management System
        </h2>
      </div>

      <div className="flex items-center gap-4">
        <ThemeToggle />
        <LanguageSelector />
        <Button variant="outline" size="sm">
          {t('common.logout')}
        </Button>
      </div>
    </nav>
  );
};

