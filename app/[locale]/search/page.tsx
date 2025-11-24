'use client';

import React, { useState, useMemo } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import LayoutWrapper from '../layout-wrapper';
import { PageHeader } from '@/components/layout/PageHeader';
import { SearchBar } from '@/components/features/SearchBar';
import { FilterPanel } from '@/components/features/FilterPanel';
import { BookCard } from '@/components/features/BookCard';
import { BookDetailsDrawer } from '@/components/features/BookDetailsDrawer';
import { useBooks, Book } from '@/contexts/BookContext';

const categories = ['Fiction', 'Non-Fiction', 'Science', 'History', 'Biography', 'Technology', 'Literature'];

export default function SearchBooksPage() {
  const t = useTranslations('books');
  const tNav = useTranslations('navigation');
  const locale = useLocale();
  const { books, borrowBook, reserveBook } = useBooks();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedAvailability, setSelectedAvailability] = useState('all');
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      const matchesSearch =
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = selectedCategory === 'all' || book.category === selectedCategory;
      const matchesAvailability = selectedAvailability === 'all' || book.availability === selectedAvailability;

      return matchesSearch && matchesCategory && matchesAvailability;
    });
  }, [books, searchQuery, selectedCategory, selectedAvailability]);

  const handleViewDetails = (book: Book) => {
    setSelectedBook(book);
    setIsDrawerOpen(true);
  };

  const handleBorrow = (book: Book) => {
    borrowBook(book.id);
    setSuccessMessage(t('borrowSuccess'));
    setIsDrawerOpen(false);
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  const handleReserve = (book: Book) => {
    reserveBook(book.id);
    setSuccessMessage(t('reserveSuccess'));
    setIsDrawerOpen(false);
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  return (
    <LayoutWrapper>
      <PageHeader
        title={tNav('searchBooks')}
        breadcrumbs={[
          { label: tNav('dashboard'), href: `/${locale}/search` },
          { label: tNav('searchBooks') },
        ]}
      />

      {successMessage && (
        <div className="mb-6 p-4 bg-green-100 dark:bg-green-900 border border-green-400 dark:border-green-700 text-green-700 dark:text-green-300 rounded-lg">
          {successMessage}
        </div>
      )}

      <div className="flex gap-6">
        <div className="w-64 flex-shrink-0">
          <FilterPanel
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            selectedAvailability={selectedAvailability}
            onAvailabilityChange={setSelectedAvailability}
            onClear={() => {
              setSelectedCategory('all');
              setSelectedAvailability('all');
              setSearchQuery('');
            }}
          />
        </div>

        <div className="flex-1 space-y-6">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
          />

          {filteredBooks.length === 0 ? (
            <div className="text-center py-12 text-gray-500 dark:text-gray-400">
              {t('noBooksFound')}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredBooks.map((book) => (
                <BookCard
                  key={book.id}
                  book={book}
                  onViewDetails={handleViewDetails}
                  onBorrow={handleBorrow}
                  onReserve={handleReserve}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <BookDetailsDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        book={selectedBook}
        onBorrow={handleBorrow}
        onReserve={handleReserve}
      />
    </LayoutWrapper>
  );
}

