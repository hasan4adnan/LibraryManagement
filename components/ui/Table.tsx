import React from 'react';

interface TableProps {
  children: React.ReactNode;
  className?: string;
}

export const Table: React.FC<TableProps> = ({ children, className = '' }) => {
  return (
    <div className="overflow-x-auto rounded-lg border border-light-border dark:border-dark-border">
      <table className={`min-w-full divide-y divide-light-border dark:divide-dark-border ${className}`}>
        {children}
      </table>
    </div>
  );
};

export const TableHead: React.FC<TableProps> = ({ children, className = '' }) => {
  return (
    <thead className={`bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 ${className}`}>
      {children}
    </thead>
  );
};

export const TableBody: React.FC<TableProps> = ({ children, className = '' }) => {
  return (
    <tbody className={`bg-light-panel dark:bg-dark-panel divide-y divide-light-border dark:divide-dark-border ${className}`}>
      {children}
    </tbody>
  );
};

export const TableRow: React.FC<TableProps> = ({ children, className = '' }) => {
  return (
    <tr className={`hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${className}`}>
      {children}
    </tr>
  );
};

export const TableHeader: React.FC<TableProps> = ({ children, className = '' }) => {
  return (
    <th
      className={`
        px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider
        ${className}
      `}
    >
      {children}
    </th>
  );
};

export const TableCell: React.FC<TableProps> = ({ children, className = '' }) => {
  return (
    <td className={`px-6 py-4 whitespace-nowrap text-sm text-light-text dark:text-dark-text ${className}`}>
      {children}
    </td>
  );
};

