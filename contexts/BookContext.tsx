'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';

export interface Book {
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

export interface BorrowedBook extends Book {
  borrowDate: string;
  dueDate: string;
  status: 'onTime' | 'returning' | 'overdue';
}

export interface ReservedBook extends Book {
  reserveDate: string;
  dueDate: string;
  status: 'onTime' | 'returning' | 'overdue';
}

export interface Request {
  id: string;
  type: 'borrow' | 'reserve';
  memberName: string;
  memberEmail: string;
  bookId: string;
  bookTitle: string;
  bookAuthor: string;
  requestDate: string;
  status: 'pending' | 'approved' | 'rejected';
}

interface BookContextType {
  books: Book[];
  borrowedBooks: BorrowedBook[];
  reservedBooks: ReservedBook[];
  requests: Request[];
  borrowBook: (bookId: string) => void;
  reserveBook: (bookId: string) => void;
  returnBook: (bookId: string) => void;
  cancelReservation: (bookId: string) => void;
  approveRequest: (requestId: string) => void;
  rejectRequest: (requestId: string) => void;
  updateBookAvailability: (bookId: string, availability: Book['availability']) => void;
}

const BookContext = createContext<BookContextType | undefined>(undefined);

export const useBooks = () => {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error('useBooks must be used within BookProvider');
  }
  return context;
};

const initialBooks: Book[] = [
  {
    id: '1',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    category: 'Fiction',
    isbn: '978-0-7432-7356-5',
    availability: 'available',
    cover: 'https://covers.openlibrary.org/b/isbn/9780743273565-L.jpg',
    summary: 'A classic American novel set in the Jazz Age, following the mysterious millionaire Jay Gatsby and his obsession with Daisy Buchanan.',
    publishedYear: 1925,
    publisher: 'Scribner',
    pages: 180,
  },
  {
    id: '2',
    title: 'Sapiens: A Brief History of Humankind',
    author: 'Yuval Noah Harari',
    category: 'Non-Fiction',
    isbn: '978-0-06-231609-7',
    availability: 'available',
    cover: 'https://covers.openlibrary.org/b/isbn/9780062316097-L.jpg',
    summary: 'An exploration of how Homo sapiens conquered the world through cognitive, agricultural, and scientific revolutions.',
    publishedYear: 2011,
    publisher: 'Harper',
    pages: 443,
  },
  {
    id: '3',
    title: '1984',
    author: 'George Orwell',
    category: 'Fiction',
    isbn: '978-0-452-28423-4',
    availability: 'available',
    cover: 'https://covers.openlibrary.org/b/isbn/9780452284234-L.jpg',
    summary: 'A dystopian social science fiction novel about totalitarian surveillance and thought control.',
    publishedYear: 1949,
    publisher: 'Secker & Warburg',
    pages: 328,
  },
  {
    id: '4',
    title: 'The Selfish Gene',
    author: 'Richard Dawkins',
    category: 'Science',
    isbn: '978-0-19-857519-1',
    availability: 'available',
    cover: 'https://covers.openlibrary.org/b/isbn/9780198575191-L.jpg',
    summary: 'A groundbreaking book on evolution and genetics, explaining how genes are the fundamental unit of selection.',
    publishedYear: 1976,
    publisher: 'Oxford University Press',
    pages: 224,
  },
  {
    id: '5',
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    category: 'Fiction',
    isbn: '978-0-06-112008-4',
    availability: 'available',
    cover: 'https://covers.openlibrary.org/b/isbn/9780061120084-L.jpg',
    summary: 'A gripping tale of racial injustice and childhood innocence in the American South.',
    publishedYear: 1960,
    publisher: 'J.B. Lippincott & Co.',
    pages: 281,
  },
  {
    id: '6',
    title: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
    category: 'Fiction',
    isbn: '978-0-316-76948-0',
    availability: 'available',
    cover: 'https://covers.openlibrary.org/b/isbn/9780316769480-L.jpg',
    summary: 'The story of Holden Caulfield and his journey through New York City after being expelled from prep school.',
    publishedYear: 1951,
    publisher: 'Little, Brown and Company',
    pages: 234,
  },
  {
    id: '7',
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    category: 'Literature',
    isbn: '978-0-14-143951-8',
    availability: 'available',
    cover: 'https://covers.openlibrary.org/b/isbn/9780141439518-L.jpg',
    summary: 'A romantic novel about Elizabeth Bennet and Mr. Darcy in 19th century England.',
    publishedYear: 1813,
    publisher: 'T. Egerton',
    pages: 432,
  },
  {
    id: '8',
    title: 'The Lord of the Rings',
    author: 'J.R.R. Tolkien',
    category: 'Fiction',
    isbn: '978-0-544-00014-8',
    availability: 'available',
    cover: 'https://covers.openlibrary.org/b/isbn/9780544000148-L.jpg',
    summary: 'An epic fantasy trilogy about the quest to destroy the One Ring and save Middle-earth.',
    publishedYear: 1954,
    publisher: 'Allen & Unwin',
    pages: 1178,
  },
  {
    id: '9',
    title: 'The Hitchhiker\'s Guide to the Galaxy',
    author: 'Douglas Adams',
    category: 'Fiction',
    isbn: '978-0-345-39180-3',
    availability: 'available',
    cover: 'https://covers.openlibrary.org/b/isbn/9780345391803-L.jpg',
    summary: 'A comedic science fiction series following Arthur Dent after Earth is destroyed.',
    publishedYear: 1979,
    publisher: 'Pan Books',
    pages: 224,
  },
  {
    id: '10',
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    category: 'Fiction',
    isbn: '978-0-06-112241-5',
    availability: 'available',
    cover: 'https://covers.openlibrary.org/b/isbn/9780061122415-L.jpg',
    summary: 'A philosophical novel about a young Andalusian shepherd on a journey to find treasure.',
    publishedYear: 1988,
    publisher: 'HarperCollins',
    pages: 163,
  },
  {
    id: '11',
    title: 'The Kite Runner',
    author: 'Khaled Hosseini',
    category: 'Fiction',
    isbn: '978-1-59448-000-3',
    availability: 'available',
    cover: 'https://covers.openlibrary.org/b/isbn/9781594480003-L.jpg',
    summary: 'A powerful story of friendship, betrayal, and redemption set in Afghanistan.',
    publishedYear: 2003,
    publisher: 'Riverhead Books',
    pages: 371,
  },
  {
    id: '12',
    title: 'The Da Vinci Code',
    author: 'Dan Brown',
    category: 'Fiction',
    isbn: '978-0-385-50420-5',
    availability: 'available',
    cover: 'https://covers.openlibrary.org/b/isbn/9780385504205-L.jpg',
    summary: 'A mystery thriller following symbologist Robert Langdon as he investigates a murder in the Louvre.',
    publishedYear: 2003,
    publisher: 'Doubleday',
    pages: 454,
  },
  {
    id: '13',
    title: 'The Book Thief',
    author: 'Markus Zusak',
    category: 'Fiction',
    isbn: '978-0-375-84220-7',
    availability: 'available',
    cover: 'https://covers.openlibrary.org/b/isbn/9780375842207-L.jpg',
    summary: 'A story narrated by Death about a young girl in Nazi Germany who steals books.',
    publishedYear: 2005,
    publisher: 'Knopf',
    pages: 552,
  },
  {
    id: '14',
    title: 'The Girl with the Dragon Tattoo',
    author: 'Stieg Larsson',
    category: 'Fiction',
    isbn: '978-0-307-26975-1',
    availability: 'available',
    cover: 'https://covers.openlibrary.org/b/isbn/9780307269751-L.jpg',
    summary: 'A journalist and a hacker investigate a decades-old disappearance.',
    publishedYear: 2005,
    publisher: 'Norstedts Förlag',
    pages: 465,
  },
];

export const BookProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [books, setBooks] = useState<Book[]>(initialBooks);
  const [borrowedBooks, setBorrowedBooks] = useState<BorrowedBook[]>([]);
  const [reservedBooks, setReservedBooks] = useState<ReservedBook[]>([]);
  const [requests, setRequests] = useState<Request[]>([]);

  const updateBookAvailability = useCallback((bookId: string, availability: Book['availability']) => {
    setBooks((prev) =>
      prev.map((book) => (book.id === bookId ? { ...book, availability } : book))
    );
  }, []);

  const borrowBook = useCallback((bookId: string) => {
    const book = books.find((b) => b.id === bookId);
    if (!book || book.availability !== 'available') return;

    const borrowDate = new Date().toISOString().split('T')[0];
    const dueDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    const daysUntilDue = Math.ceil((new Date(dueDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    
    let status: 'onTime' | 'returning' | 'overdue' = 'onTime';
    if (daysUntilDue < 0) status = 'overdue';
    else if (daysUntilDue <= 7) status = 'returning';

    const borrowedBook: BorrowedBook = {
      ...book,
      availability: 'borrowed',
      borrowDate,
      dueDate,
      status,
    };

    setBorrowedBooks((prev) => [...prev, borrowedBook]);
    updateBookAvailability(bookId, 'borrowed');

    // Create a request for librarian
    const newRequest: Request = {
      id: `req-${Date.now()}`,
      type: 'borrow',
      memberName: 'Current User',
      memberEmail: 'user@example.com',
      bookId: book.id,
      bookTitle: book.title,
      bookAuthor: book.author,
      requestDate: borrowDate,
      status: 'pending',
    };
    setRequests((prev) => [...prev, newRequest]);
  }, [books, updateBookAvailability]);

  const reserveBook = useCallback((bookId: string) => {
    const book = books.find((b) => b.id === bookId);
    if (!book) return;

    const reserveDate = new Date().toISOString().split('T')[0];
    const dueDate = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    const daysUntilDue = Math.ceil((new Date(dueDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    
    let status: 'onTime' | 'returning' | 'overdue' = 'onTime';
    if (daysUntilDue < 0) status = 'overdue';
    else if (daysUntilDue <= 3) status = 'returning';

    const reservedBook: ReservedBook = {
      ...book,
      availability: 'reserved',
      reserveDate,
      dueDate,
      status,
    };

    setReservedBooks((prev) => [...prev, reservedBook]);
    updateBookAvailability(bookId, 'reserved');

    // Create a request for librarian
    const newRequest: Request = {
      id: `req-${Date.now()}`,
      type: 'reserve',
      memberName: 'Current User',
      memberEmail: 'user@example.com',
      bookId: book.id,
      bookTitle: book.title,
      bookAuthor: book.author,
      requestDate: reserveDate,
      status: 'pending',
    };
    setRequests((prev) => [...prev, newRequest]);
  }, [books, updateBookAvailability]);

  const returnBook = useCallback((bookId: string) => {
    setBorrowedBooks((prev) => prev.filter((b) => b.id !== bookId));
    updateBookAvailability(bookId, 'available');
  }, [updateBookAvailability]);

  const cancelReservation = useCallback((bookId: string) => {
    setReservedBooks((prev) => prev.filter((b) => b.id !== bookId));
    setRequests((prev) => prev.filter((r) => r.bookId !== bookId && r.status === 'pending'));
    updateBookAvailability(bookId, 'available');
  }, [updateBookAvailability]);

  const approveRequest = useCallback((requestId: string) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === requestId ? { ...r, status: 'approved' } : r))
    );
  }, []);

  const rejectRequest = useCallback((requestId: string) => {
    const request = requests.find((r) => r.id === requestId);
    if (request) {
      setRequests((prev) =>
        prev.map((r) => (r.id === requestId ? { ...r, status: 'rejected' } : r))
      );
      updateBookAvailability(request.bookId, 'available');
    }
  }, [requests, updateBookAvailability]);

  return (
    <BookContext.Provider
      value={{
        books,
        borrowedBooks,
        reservedBooks,
        requests,
        borrowBook,
        reserveBook,
        returnBook,
        cancelReservation,
        approveRequest,
        rejectRequest,
        updateBookAvailability,
      }}
    >
      {children}
    </BookContext.Provider>
  );
};

