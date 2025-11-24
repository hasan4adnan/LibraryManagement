'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Drawer } from '../ui/Drawer';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Input } from '../ui/Input';

interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  isbn: string;
  availability: 'available' | 'borrowed' | 'reserved';
  cover?: string;
  summary?: string;
  publishedYear?: number;
  publisher?: string;
  pages?: number;
}

interface BookDetailsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  book: Book | null;
  onBorrow?: (book: Book) => void;
  onReserve?: (book: Book) => void;
}

export const BookDetailsDrawer: React.FC<BookDetailsDrawerProps> = ({
  isOpen,
  onClose,
  book,
  onBorrow,
  onReserve,
}) => {
  const t = useTranslations('books');
  const tCommon = useTranslations('common');
  const [imageError, setImageError] = useState(false);

  if (!book) return null;

  const availabilityVariants = {
    available: 'success' as const,
    borrowed: 'warning' as const,
    reserved: 'info' as const,
  };

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title={t('details')}
      footer={
        <div className="flex gap-3">
          <Button variant="outline" onClick={onClose}>
            {tCommon('close')}
          </Button>
          {book.availability === 'available' && onBorrow && (
            <Button variant="primary" onClick={() => onBorrow(book)}>
              {t('borrow')}
            </Button>
          )}
          {onReserve && (
            <Button variant="primary" onClick={() => onReserve(book)}>
              {t('reserve')}
            </Button>
          )}
        </div>
      }
    >
      <div className="space-y-6">
        <div className="flex gap-6">
          <div className="w-40 h-60 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
            {book.cover && !imageError ? (
              <img 
                src={book.cover} 
                alt={book.title} 
                className="w-full h-full object-cover rounded-xl"
                onError={() => setImageError(true)}
              />
            ) : (
              <span className="text-7xl">📚</span>
            )}
          </div>
          <div className="flex-1">
            <h2 className="text-3xl font-bold mb-3 text-light-text dark:text-dark-text">
              {book.title}
            </h2>
            <p className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
              {book.author}
            </p>
            <Badge variant={availabilityVariants[book.availability]} className="mb-6 text-sm px-3 py-1">
              {t(book.availability)}
            </Badge>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-700 dark:text-gray-300">{t('category')}:</span>
                <span className="text-gray-600 dark:text-gray-400">{book.category}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-700 dark:text-gray-300">{t('isbn')}:</span>
                <span className="text-gray-600 dark:text-gray-400">{book.isbn}</span>
              </div>
              {book.publishedYear && (
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-700 dark:text-gray-300">{t('publishedYear')}:</span>
                  <span className="text-gray-600 dark:text-gray-400">{book.publishedYear}</span>
                </div>
              )}
              {book.publisher && (
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-700 dark:text-gray-300">{t('publisher')}:</span>
                  <span className="text-gray-600 dark:text-gray-400">{book.publisher}</span>
                </div>
              )}
              {book.pages && (
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-700 dark:text-gray-300">{t('pages')}:</span>
                  <span className="text-gray-600 dark:text-gray-400">{book.pages}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {book.summary && (
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-3 text-light-text dark:text-dark-text">
              {t('summary')}
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {book.summary}
            </p>
          </div>
        )}
      </div>
    </Drawer>
  );
};

