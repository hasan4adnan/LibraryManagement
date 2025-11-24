'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Card } from '../ui/Card';
import { Select } from '../ui/Select';
import { Checkbox } from '../ui/Checkbox';
import { Button } from '../ui/Button';

interface FilterPanelProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  selectedAvailability: string;
  onAvailabilityChange: (availability: string) => void;
  onClear: () => void;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
  categories,
  selectedCategory,
  onCategoryChange,
  selectedAvailability,
  onAvailabilityChange,
  onClear,
}) => {
  const t = useTranslations('filters');
  const tCommon = useTranslations('common');

  const categoryOptions = [
    { value: 'all', label: t('allCategories') },
    ...categories.map((cat) => ({ value: cat, label: t(cat.toLowerCase()) })),
  ];

  const tBooks = useTranslations('books');
  
  const availabilityOptions = [
    { value: 'all', label: t('allAvailability') },
    { value: 'available', label: tBooks('available') },
    { value: 'borrowed', label: tBooks('borrowed') },
    { value: 'reserved', label: tBooks('reserved') },
  ];

  return (
    <Card className="sticky top-4 shadow-lg">
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-bold mb-6 text-light-text dark:text-dark-text border-b border-light-border dark:border-dark-border pb-3">
            {tCommon('filter')}
          </h3>
        </div>

        <div>
          <Select
            label={t('category')}
            options={categoryOptions}
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
          />
        </div>

        <div>
          <Select
            label={t('availability')}
            options={availabilityOptions}
            value={selectedAvailability}
            onChange={(e) => onAvailabilityChange(e.target.value)}
          />
        </div>

        <Button variant="outline" onClick={onClear} className="w-full">
          {tCommon('clear')}
        </Button>
      </div>
    </Card>
  );
};

