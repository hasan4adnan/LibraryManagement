'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { ThemeToggle } from './ThemeToggle';
import { LanguageSelector } from './LanguageSelector';

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, onToggle }) => {
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations('navigation');

  const menuItems = [
    { href: `/${locale}/search`, label: t('searchBooks'), icon: '🔍' },
    { href: `/${locale}/my-books`, label: t('myBooks'), icon: '📚' },
    { href: `/${locale}/librarian`, label: t('librarianDashboard'), icon: '👤' },
  ];

  const isActive = (href: string) => {
    return pathname?.includes(href);
  };

  return (
    <aside
      className={`
        fixed left-0 top-0 bottom-0 z-30
        bg-light-panel dark:bg-dark-panel
        border-r border-light-border dark:border-dark-border
        transition-all duration-200
        ${isCollapsed ? 'w-20' : 'w-64'}
      `}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-4 border-b border-light-border dark:border-dark-border">
          {!isCollapsed && (
            <h1 className="text-xl font-bold text-light-text dark:text-dark-text">
              Library
            </h1>
          )}
          <button
            onClick={onToggle}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-lg
                transition-colors
                ${
                  isActive(item.href)
                    ? 'bg-light-primary dark:bg-dark-primary text-white'
                    : 'text-light-text dark:text-dark-text hover:bg-gray-100 dark:hover:bg-gray-800'
                }
              `}
            >
              <span className="text-xl">{item.icon}</span>
              {!isCollapsed && <span className="font-medium">{item.label}</span>}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-light-border dark:border-dark-border space-y-3">
          <div className="flex items-center justify-between">
            {!isCollapsed && <span className="text-sm text-gray-600 dark:text-gray-400">Theme</span>}
            <ThemeToggle />
          </div>
          {!isCollapsed && (
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Language</span>
              <LanguageSelector />
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

