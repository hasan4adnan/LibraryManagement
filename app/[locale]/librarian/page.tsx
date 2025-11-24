'use client';

import React, { useState, useMemo } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import LayoutWrapper from '../layout-wrapper';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card } from '@/components/ui/Card';
import { Table, TableHead, TableBody, TableRow, TableHeader, TableCell } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import { useBooks } from '@/contexts/BookContext';

export default function LibrarianDashboardPage() {
  const t = useTranslations('librarian');
  const tNav = useTranslations('navigation');
  const tCommon = useTranslations('common');
  const locale = useLocale();
  const { requests, approveRequest, rejectRequest } = useBooks();
  const [filterType, setFilterType] = useState<'all' | 'borrow' | 'reserve'>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');

  const filteredRequests = useMemo(() => {
    return requests.filter((request) => {
      const matchesType = filterType === 'all' || request.type === filterType;
      const matchesStatus = filterStatus === 'all' || request.status === filterStatus;
      return matchesType && matchesStatus;
    });
  }, [requests, filterType, filterStatus]);

  const statusVariants = {
    pending: 'warning' as const,
    approved: 'success' as const,
    rejected: 'error' as const,
  };

  const handleApprove = (id: string) => {
    approveRequest(id);
  };

  const handleReject = (id: string) => {
    rejectRequest(id);
  };

  return (
    <LayoutWrapper>
      <PageHeader
        title={t('title')}
        breadcrumbs={[
          { label: tNav('dashboard'), href: `/${locale}/search` },
          { label: t('title') },
        ]}
        actions={
          <div className="flex gap-4">
            <Select
              options={[
                { value: 'all', label: 'All Types' },
                { value: 'borrow', label: t('borrowingRequests') },
                { value: 'reserve', label: t('reservationRequests') },
              ]}
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as any)}
              className="w-48"
            />
            <Select
              options={[
                { value: 'all', label: 'All Status' },
                { value: 'pending', label: t('pending') },
                { value: 'approved', label: t('approved') },
                { value: 'rejected', label: t('rejected') },
              ]}
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="w-48"
            />
          </div>
        }
      />

      <Card>
        {filteredRequests.length === 0 ? (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            {t('noRequests')}
          </div>
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableHeader>{t('member')}</TableHeader>
                <TableHeader>{t('book')}</TableHeader>
                <TableHeader>Type</TableHeader>
                <TableHeader>{t('requestDate')}</TableHeader>
                <TableHeader>Status</TableHeader>
                <TableHeader>{tCommon('actions')}</TableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRequests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{request.memberName}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {request.memberEmail}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{request.bookTitle}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {request.bookAuthor}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="info">
                      {request.type === 'borrow' ? t('borrowingRequests') : t('reservationRequests')}
                    </Badge>
                  </TableCell>
                  <TableCell>{request.requestDate}</TableCell>
                  <TableCell>
                    <Badge variant={statusVariants[request.status]}>
                      {t(request.status)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {request.status === 'pending' && (
                      <div className="flex gap-2">
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => handleApprove(request.id)}
                        >
                          {t('approve')}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleReject(request.id)}
                        >
                          {t('reject')}
                        </Button>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Card>
    </LayoutWrapper>
  );
}

