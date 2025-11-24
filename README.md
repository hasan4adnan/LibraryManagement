# Library Borrowing & Reservation System

## Project Description

The Library Borrowing & Reservation System is a modern, full-stack web application designed to streamline library operations and enhance user experience. The system provides a comprehensive solution for managing book borrowing, reservations, and library workflows.

### Key Features

- **User Authentication**: Secure login system with role-based access control (Member, Librarian, Admin)
- **Book Discovery**: Advanced search and filtering capabilities to help users find books by title, author, or category
- **Borrowing Management**: Complete workflow for book borrowing requests with approval system
- **Reservation System**: Allow users to reserve books that are currently unavailable
- **Librarian Dashboard**: Comprehensive back-office interface for managing requests, approvals, and user activities
- **Multi-language Support**: Full internationalization with English and Turkish language support
- **Theme Support**: Light and dark mode with smooth transitions
- **Responsive Design**: Fully responsive interface that works seamlessly across all devices
- **Borrowing History**: Track and view complete borrowing history for both members and librarians

### System Capabilities

- **For Members**: Search books, submit borrowing requests, make reservations, view personal borrowing history, and manage their account
- **For Librarians**: Approve/reject borrowing and reservation requests, manage book inventory, view member activities, and access comprehensive reporting
- **For Administrators**: Full system access with user management capabilities

## Team Members & Roles

### Mert Temiz – 220706003
- **Role**: Database Architect & System Quality Lead
- **Responsibilities**:
  - Database Design & Data Architecture (EPIC 1)
  - Reservation Management System (EPIC 4)
  - System Quality, Security & Compliance (EPIC 7)
  - Performance and Usability Requirements

### Hasan Muayad Adnan Alsaedi – 220706802
- **Role**: Frontend Developer & Feature Lead
- **Responsibilities**:
  - Book Discovery & Catalog Management (EPIC 3)
  - Borrowing Management System (EPIC 4)
  - Frontend UI/UX implementation
  - Component architecture and design system

### Erden Dinç – 220706045
- **Role**: System Analyst & Backend Developer
- **Responsibilities**:
  - Requirements & System Analysis (EPIC 2)
  - Librarian Back-Office & Approval Workflow (EPIC 6)
  - System Quality, Security & Compliance (EPIC 7)
  - Workflow analysis and system design

## Sprint Summary

### LM Sprint 1 (November 24-25, 2025)
**Status**: Completed  
**Work Items**: 3

- **LM-16**: Story 5 - Workflow Analysis (Assigned to: ED, Status: IN PROGRESS)
- **LM-38**: Story 1 - Performance Requirements (Assigned to: MT, Status: IN PROGRESS)
- **LM-37**: Story 2 - Security Requirements (Assigned to: MT, Status: IN PROGRESS)

**Focus Areas**:
- Initial system requirements gathering
- Workflow analysis and documentation
- Performance and security requirements definition

### LM Sprint 2
**Status**: Planned  
**Work Items**: 0

**Planned Activities**:
- Implementation of core features
- Database schema finalization
- Frontend component development

### Backlog Items
**Total**: 6 work items

Key backlog items include:
- Automatic Status Update (Reservation Flow)
- Librarian Approval workflows
- Member Borrowing & Reservation History
- Usability Requirements

## Used Technologies

### Frontend
- **Next.js 14** - React framework with App Router for server-side rendering and routing
- **React 18** - Modern UI library for building interactive user interfaces
- **TypeScript** - Type-safe JavaScript for better code quality and maintainability
- **Tailwind CSS** - Utility-first CSS framework for rapid UI development
- **next-intl** - Internationalization library for multi-language support

### Development Tools
- **Node.js** - JavaScript runtime environment
- **npm** - Package manager
- **ESLint** - Code linting and quality assurance
- **PostCSS** - CSS processing tool
- **Autoprefixer** - Automatic vendor prefixing for CSS

### Database
- **MySQL** - Relational database management system
- Database schema includes:
  - Users table (with role-based access)
  - Books table (with status tracking)
  - Borrow requests table
  - Reservation requests table
  - Borrow history table

### Design & Architecture
- **Scandinavian/Swiss Minimalism** - Clean, uncluttered design philosophy
- **Component-based Architecture** - Modular, reusable UI components
- **Responsive Design** - Mobile-first approach
- **Dark Mode Support** - Complete theme system with localStorage persistence

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- MySQL database server (for backend integration)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd LibraryManagement
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables (if needed):
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Run database migrations:
```bash
# Execute database/schema.sql in your MySQL database
```

### Development

Start the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

Create a production build:
```bash
npm run build
```

### Start Production Server

Run the production server:
```bash
npm start
```

## Project Structure

```
LibraryManagement/
├── app/
│   ├── [locale]/              # Internationalized routes
│   │   ├── login/             # Login page
│   │   ├── search/            # Search books page
│   │   ├── my-books/          # My books page
│   │   └── librarian/         # Librarian dashboard
│   ├── globals.css            # Global styles
│   └── layout.tsx             # Root layout
├── components/
│   ├── ui/                    # Core UI components (Button, Input, Card, etc.)
│   ├── layout/                # Layout components (Sidebar, Navbar, etc.)
│   └── features/              # Feature components (BookCard, SearchBar, etc.)
├── contexts/
│   └── BookContext.tsx        # Book state management
├── hooks/
│   └── useTheme.ts            # Theme management hook
├── messages/
│   ├── en.json                # English translations
│   └── tr.json                # Turkish translations
├── database/
│   └── schema.sql             # Database schema
├── i18n.ts                    # Internationalization configuration
├── middleware.ts              # Next.js middleware
└── [config files]             # TypeScript, Tailwind, etc.
```

## Pages & Features

1. **Login Page** (`/login`)
   - Email/password authentication
   - Theme toggle (light/dark mode)
   - Language selector (EN/TR)
   - Role-based redirect

2. **Search Books** (`/search`)
   - Global search functionality
   - Category and availability filters
   - Book grid layout with cards
   - Book details drawer
   - Borrow/Reserve actions

3. **My Books** (`/my-books`)
   - Borrowed books table with status
   - Reserved books table
   - Due date indicators
   - Return/Cancel actions
   - Borrowing history

4. **Librarian Dashboard** (`/librarian`)
   - Request management table
   - Filter by request type and status
   - Approve/Reject actions
   - Member and book information
   - Activity tracking

## Design System

### Color Palette

**Light Theme:**
- Background: `#F8F9FB`
- Panel: `#FFFFFF`
- Border: `#E5E7EB`
- Text: `#111827`
- Primary: `#3B5AFF`

**Dark Theme:**
- Background: `#0E1117`
- Panel: `#161B22`
- Border: `#2D333B`
- Text: `#E5E7EB`
- Primary: `#3B82F6`

### Design Principles

- **Minimalism**: Clean, uncluttered interfaces
- **Consistency**: Uniform spacing, typography, and component styles
- **Accessibility**: High contrast ratios and semantic HTML
- **Responsiveness**: Mobile-first design approach
- **Professional**: Premium SaaS dashboard aesthetic

## License

MIT License

---

**Project Contributors:**
- Mert Temiz – 220706003
- Hasan Muayad Adnan Alsaedi – 220706802
- Erden Dinç – 220706045
