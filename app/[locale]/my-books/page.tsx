'use client';

import React, { useMemo } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import LayoutWrapper from '../layout-wrapper';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card } from '@/components/ui/Card';
import { Table, TableHead, TableBody, TableRow, TableHeader, TableCell } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useBooks } from '@/contexts/BookContext';

export default function MyBooksPage() {
  const t = useTranslations('myBooks');
  const tNav = useTranslations('navigation');
  const tCommon = useTranslations('common');
  const tBooks = useTranslations('books');
  const locale = useLocale();
  const { borrowedBooks, reservedBooks, returnBook, cancelReservation } = useBooks();

  const statusVariants = {
    onTime: 'success' as const,
    returning: 'warning' as const,
    overdue: 'error' as const,
  };

  // Update status based on current date
  const updatedBorrowedBooks = useMemo(() => {
    return borrowedBooks.map((book) => {
      const daysUntilDue = Math.ceil((new Date(book.dueDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
      let status: 'onTime' | 'returning' | 'overdue' = 'onTime';
      if (daysUntilDue < 0) status = 'overdue';
      else if (daysUntilDue <= 7) status = 'returning';
      return { ...book, status };
    });
  }, [borrowedBooks]);

  const updatedReservedBooks = useMemo(() => {
    return reservedBooks.map((book) => {
      const daysUntilDue = Math.ceil((new Date(book.dueDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
      let status: 'onTime' | 'returning' | 'overdue' = 'onTime';
      if (daysUntilDue < 0) status = 'overdue';
      else if (daysUntilDue <= 3) status = 'returning';
      return { ...book, status };
    });
  }, [reservedBooks]);

  return (
    <LayoutWrapper>
      <PageHeader
        title={t('title')}
        breadcrumbs={[
          { label: tNav('dashboard'), href: `/${locale}/search` },
          { label: t('title') },
        ]}
      />

      <div className="space-y-8">
        <Card>
          <h2 className="text-2xl font-semibold mb-6 text-light-text dark:text-dark-text">
            {t('borrowedBooks')}
          </h2>

          {updatedBorrowedBooks.length === 0 ? (
            <div className="text-center py-12 text-gray-500 dark:text-gray-400">
              {t('noBorrowedBooks')}
            </div>
          ) : (
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeader>{tBooks('title')}</TableHeader>
                  <TableHeader>{tBooks('author')}</TableHeader>
                  <TableHeader>{t('borrowDate')}</TableHeader>
                  <TableHeader>{t('dueDate')}</TableHeader>
                  <TableHeader>{t('status')}</TableHeader>
                  <TableHeader>{tCommon('actions')}</TableHeader>
                </TableRow>
              </TableHead>
              <TableBody>
                {updatedBorrowedBooks.map((book) => (
                  <TableRow key={book.id}>
                    <TableCell className="font-medium">{book.title}</TableCell>
                    <TableCell>{book.author}</TableCell>
                    <TableCell>{book.borrowDate}</TableCell>
                    <TableCell>{book.dueDate}</TableCell>
                    <TableCell>
                      <Badge variant={statusVariants[book.status]}>
                        {t(book.status)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => returnBook(book.id)}
                      >
                        {tBooks('return')}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </Card>

        <Card>
          <h2 className="text-2xl font-semibold mb-6 text-light-text dark:text-dark-text">
            {t('reservedBooks')}
          </h2>

          {updatedReservedBooks.length === 0 ? (
            <div className="text-center py-12 text-gray-500 dark:text-gray-400">
              {t('noReservedBooks')}
            </div>
          ) : (
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeader>{tBooks('title')}</TableHeader>
                  <TableHeader>{tBooks('author')}</TableHeader>
                  <TableHeader>{t('reserveDate')}</TableHeader>
                  <TableHeader>{t('dueDate')}</TableHeader>
                  <TableHeader>{t('status')}</TableHeader>
                  <TableHeader>{tCommon('actions')}</TableHeader>
                </TableRow>
              </TableHead>
              <TableBody>
                {updatedReservedBooks.map((book) => (
                  <TableRow key={book.id}>
                    <TableCell className="font-medium">{book.title}</TableCell>
                    <TableCell>{book.author}</TableCell>
                    <TableCell>{book.reserveDate}</TableCell>
                    <TableCell>{book.dueDate}</TableCell>
                    <TableCell>
                      <Badge variant={statusVariants[book.status]}>
                        {t(book.status)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => cancelReservation(book.id)}
                      >
                        {t('cancelReservation')}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </Card>
      </div>
    </LayoutWrapper>
  );
}

