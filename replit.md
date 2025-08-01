# Overview

This is a modern e-commerce web application built as a full-stack solution with a React frontend and Express.js backend. The application provides a complete online shopping experience with product browsing, cart management, and checkout functionality. It's designed with a premium "LUXE" brand aesthetic and includes comprehensive features like product categorization, size selection, responsive design, advanced search functionality, user authentication, and a secure admin dashboard.

# User Preferences

Preferred communication style: Simple, everyday language.

# Recent Changes (August 1, 2025)

## Latest Updates - Database Integration & Security Enhancements
- Successfully migrated from in-memory storage to PostgreSQL database
- Added comprehensive admin authentication with password protection (password: luxe-admin-2025)
- Fixed nested anchor tag issues in product cards to eliminate console warnings
- Enhanced navigation with improved current page highlighting using border indicators
- Added 3 new product categories: Accessories, Outerwear, and Activewear
- Expanded product catalog to 33+ items across 6 categories
- Created database seeding system for initial data population
- Implemented proper TypeScript error handling for database operations
- Fixed navigation highlighting logic for query-based routes

## Security Improvements
- Admin dashboard now requires password authentication
- Session-based admin authentication with browser storage
- Database credentials properly secured using environment variables
- Removed all hardcoded data in favor of database-driven content

## Product Catalog Enhancement
- Expanded inventory from 10 to 24 products with proper distribution across all categories
- Added 5 additional Men's Wear items (Oxford shirt, chinos, leather jacket, polo shirt)
- Added 5 additional Women's Wear items (maxi dress, cashmere sweater, high-waist jeans, wrap blouse, midi skirt)
- Added 5 additional Footwear items (high heels, canvas sneakers, ankle boots, dress shoes, sandals)
- All products include proper sizing, descriptions, and high-quality images

## Search Functionality
- Implemented responsive search modal with real-time product filtering
- Search works across product names and descriptions
- Mobile-responsive search button with appropriate icon sizing
- Results show product images, names, and prices with direct navigation to product pages

## User Authentication
- Created comprehensive auth modal with sign-in and sign-up tabs
- Responsive forms with proper validation and loading states
- Icons and professional styling consistent with brand aesthetic
- Mobile-responsive auth button in navigation

## Admin Dashboard
- Built secretive admin panel accessible at `/admin-dashboard-luxe-secret`
- Overview tab with key metrics (total products, featured products, average price, categories)
- Products management tab with full CRUD operations
- Add/edit product forms with all necessary fields
- Product listing with edit/delete actions and proper categorization
- Responsive design with professional admin interface

## Homepage Enhancements
- Added features section highlighting shipping, returns, and warranty
- Customer reviews section with testimonials and star ratings
- Newsletter signup with professional styling and call-to-action
- Enhanced sale banner with badges and better visual hierarchy
- All sections are mobile-responsive with proper spacing and typography

## Navigation Improvements
- Fixed nested anchor tag issues causing console warnings
- Implemented active page highlighting for better user experience
- Made search and auth buttons responsive with appropriate sizing
- Improved mobile navigation with proper touch targets

## Technical Fixes
- Resolved TypeScript errors in storage and routes files
- Fixed product page query to use proper API endpoint
- Added proper error handling for invalid product identifiers
- Implemented missing delete functionality in storage layer

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

- **Primary Database**: PostgreSQL with Neon Database as the hosted provider (now active and configured)
- **ORM**: Drizzle ORM chosen for type-safe database operations and excellent TypeScript integration
- **Schema Design**: Relational database with tables for users, categories, products, cart items, and orders
- **Migrations**: Drizzle-kit handles database schema migrations with `npm run db:push`
- **Data Seeding**: Automated seeding system populates initial categories and products
- **Storage Layer**: DatabaseStorage class implements all CRUD operations with proper error handling

## Key Features

- **Product Management**: Comprehensive catalog with 33+ products across 6 categories (Men's Wear, Women's Wear, Footwear, Accessories, Outerwear, Activewear)
- **Advanced Search**: Real-time product search with modal interface and instant results
- **User Authentication**: Complete sign-in/sign-up system with responsive forms and validation
- **Secure Admin Dashboard**: Password-protected admin panel (/admin-dashboard-luxe-secret) with full product management, analytics, and CRUD operations
- **Shopping Cart**: Persistent cart state with size selection and quantity management
- **Enhanced Homepage**: Features section, customer reviews, newsletter signup, and promotional banners
- **Responsive Design**: Mobile-optimized interface with responsive navigation and search functionality
- **Smart Page Highlighting**: Navigation automatically highlights current page with visual borders for better UX
- **Database Integration**: Full PostgreSQL integration with proper data persistence and seeding
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