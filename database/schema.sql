-- =========================================
-- Library Borrowing and Reservation System
-- Database Schema
-- =========================================

CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(120) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('member','librarian','admin') NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE books (
    book_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    author VARCHAR(120) NOT NULL,
    category VARCHAR(100),
    status ENUM('available','borrowed','reserved') DEFAULT 'available',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE borrow_requests (
    borrow_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    book_id INT NOT NULL,
    request_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    status ENUM('pending','approved','rejected') DEFAULT 'pending',
    due_date DATE,
    approval_date DATETIME,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (book_id) REFERENCES books(book_id)
);

CREATE TABLE reservation_requests (
    reservation_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    book_id INT NOT NULL,
    request_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    status ENUM('pending','approved','rejected') DEFAULT 'pending',
    approval_date DATETIME,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (book_id) REFERENCES books(book_id)
);

CREATE TABLE borrow_history (
    history_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    book_id INT NOT NULL,
    borrowed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    returned_at DATETIME,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (book_id) REFERENCES books(book_id)
);

-- Dummy Data
INSERT INTO users (full_name, email, password, role)
VALUES 
('John Doe', 'john@example.com', 'hashedpass', 'member'),
('Librarian A', 'lib@example.com', 'hashedpass', 'librarian'),
('Admin A', 'admin@example.com', 'hashedpass', 'admin');

INSERT INTO books (title, author, category)
VALUES
('The Great Gatsby', 'F. Scott Fitzgerald', 'Novel'),
('1984', 'George Orwell', 'Dystopian'),
('To Kill a Mockingbird', 'Harper Lee', 'Classic');
