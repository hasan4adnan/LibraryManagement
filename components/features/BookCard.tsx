'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  isbn: string;
  availability: 'available' | 'borrowed' | 'reserved';
  cover?: string;
}

interface BookCardProps {
  book: Book;
  onViewDetails: (book: Book) => void;
  onBorrow?: (book: Book) => void;
  onReserve?: (book: Book) => void;
}

export const BookCard: React.FC<BookCardProps> = ({
  book,
  onViewDetails,
  onBorrow,
  onReserve,
}) => {
  const t = useTranslations('books');
  const [imageError, setImageError] = useState(false);

  const availabilityVariants = {
    available: 'success' as const,
    borrowed: 'warning' as const,
    reserved: 'info' as const,
  };

  return (
    <Card className="hover:shadow-2xl hover:scale-[1.02] transition-all duration-200 cursor-pointer group border-2 border-transparent hover:border-light-primary dark:hover:border-dark-primary" onClick={() => onViewDetails(book)}>
      <div className="flex flex-col h-full">
        <div className="aspect-[3/4] bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-xl mb-4 flex items-center justify-center overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow">
          {book.cover && !imageError ? (
            <img 
              src={book.cover} 
              alt={book.title} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={() => setImageError(true)}
            />
          ) : (
            <span className="text-6xl">📚</span>
          )}
        </div>

        <div className="flex-1 flex flex-col">
          <h3 className="text-lg font-bold mb-2 text-light-text dark:text-dark-text line-clamp-2 group-hover:text-light-primary dark:group-hover:text-dark-primary transition-colors">
            {book.title}
          </h3>
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {book.author}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500 mb-4">
            {book.category}
          </p>

          <div className="mt-auto space-y-3">
            <div className="flex items-center justify-between">
              <Badge variant={availabilityVariants[book.availability]}>
                {t(book.availability)}
              </Badge>
            </div>

            <div className="flex gap-2">
              {book.availability === 'available' && onBorrow && (
                <Button
                  variant="primary"
                  size="sm"
                  className="flex-1 font-semibold shadow-md hover:shadow-lg"
                  onClick={(e) => {
                    e.stopPropagation();
                    onBorrow(book);
                  }}
                >
                  {t('borrow')}
                </Button>
              )}
              {onReserve && (
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 font-semibold hover:bg-gray-50 dark:hover:bg-gray-800"
                  onClick={(e) => {
                    e.stopPropagation();
                    onReserve(book);
                  }}
                >
                  {t('reserve')}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

