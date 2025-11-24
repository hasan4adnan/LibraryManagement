'use client';

import React from 'react';
import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { locales, Locale } from '@/i18n';

export const LanguageSelector: React.FC = () => {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: string) => {
    const segments = pathname.split('/');
    if (segments[1] && locales.includes(segments[1] as Locale)) {
      segments[1] = newLocale;
    } else {
      segments.splice(1, 0, newLocale);
    }
    router.push(segments.join('/'));
  };

  return (
    <div className="flex items-center gap-2">
      {locales.map((loc) => (
        <button
          key={loc}
          onClick={() => switchLocale(loc)}
          className={`
            px-3 py-1.5 rounded-lg text-sm font-medium
            transition-colors
            ${
              locale === loc
                ? 'bg-light-primary dark:bg-dark-primary text-white'
                : 'bg-light-panel dark:bg-dark-panel text-light-text dark:text-dark-text hover:bg-gray-50 dark:hover:bg-gray-800'
            }
          `}
        >
          {loc.toUpperCase()}
        </button>
      ))}
    </div>
  );
};

