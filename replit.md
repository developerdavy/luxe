# Overview

This is a modern e-commerce web application built as a full-stack solution with a React frontend and Express.js backend. The application provides a complete online shopping experience with product browsing, cart management, and checkout functionality. It's designed with a premium "LUXE" brand aesthetic and includes features like product categorization, size selection, and responsive design.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture

The frontend is built using React with TypeScript and follows a component-based architecture:

- **React Router**: Uses Wouter for lightweight client-side routing
- **State Management**: Combines React Query for server state and Zustand for client-side state (shopping cart)
- **UI Framework**: Implements shadcn/ui components with Radix UI primitives for accessibility
- **Styling**: Uses Tailwind CSS with custom CSS variables for theming and brand colors
- **Build Tool**: Vite for fast development and optimized production builds

## Backend Architecture

The backend follows a REST API pattern with Express.js:

- **Framework**: Express.js with TypeScript for type safety
- **Database Layer**: Drizzle ORM with PostgreSQL for data persistence
- **API Design**: RESTful endpoints for products, categories, cart, and orders
- **Session Management**: Uses connect-pg-simple for PostgreSQL-backed sessions
- **Error Handling**: Centralized error handling middleware with proper HTTP status codes

## Data Storage Solutions

- **Primary Database**: PostgreSQL with Neon Database as the hosted provider
- **ORM**: Drizzle ORM chosen for type-safe database operations and excellent TypeScript integration
- **Schema Design**: Relational database with tables for users, categories, products, cart items, and orders
- **Migrations**: Drizzle-kit handles database schema migrations

## Key Features

- **Product Management**: Categories, product filtering, featured products, and detailed product pages
- **Shopping Cart**: Persistent cart state with size selection and quantity management
- **User Interface**: Modern, responsive design with mobile-first approach
- **Performance**: Optimized with React Query for efficient data fetching and caching

## Development Architecture

- **Monorepo Structure**: Shared schema and types between frontend and backend
- **Path Aliases**: Configured for clean imports (@/ for client, @shared for shared code)
- **Development Server**: Vite dev server with HMR for fast development cycles
- **Type Safety**: Full TypeScript coverage across the entire application

# External Dependencies

## Database & ORM
- **@neondatabase/serverless**: Neon Database PostgreSQL driver for serverless environments
- **drizzle-orm**: Modern TypeScript ORM for type-safe database operations
- **drizzle-kit**: CLI tool for database migrations and schema management

## Frontend Libraries
- **@tanstack/react-query**: Server state management and data fetching
- **zustand**: Lightweight state management for client-side state
- **wouter**: Minimalist React router
- **@radix-ui/***: Headless UI components for accessibility
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Type-safe variant management for components

## Backend Libraries
- **express**: Web application framework for Node.js
- **connect-pg-simple**: PostgreSQL session store for Express sessions
- **zod**: TypeScript-first schema validation
- **@hookform/resolvers**: Form validation resolvers for React Hook Form

## Development Tools
- **vite**: Fast build tool and development server
- **typescript**: Type checking and compilation
- **eslint**: Code linting and formatting
- **@replit/vite-plugin-runtime-error-modal**: Development error overlay for Replit environment