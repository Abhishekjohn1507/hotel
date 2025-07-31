# Hotel Management Application

## Overview

This is a full-stack hotel management application built with React frontend and Express backend. The system allows users to browse rooms, order food, and manage bookings through a modern web interface. The application features a clean, responsive design using shadcn/ui components and includes functionality for room reservations and in-room dining services.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query (React Query) for server state
- **UI Framework**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **Build Tool**: Vite for development and production builds

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM (Production-ready)
- **Database Provider**: Neon PostgreSQL (serverless, production-ready)
- **Storage Layer**: DatabaseStorage class with full CRUD operations
- **API Design**: RESTful API endpoints with proper error handling

## Key Components

### Database Schema
The application uses four main entities:
- **Rooms**: Hotel room information (type, price, amenities, availability)
- **Food Items**: Restaurant menu items with categories and pricing
- **Room Bookings**: Guest reservations with contact details and dates
- **Food Orders**: In-room dining orders with item details and status

### Frontend Components
- **Navigation**: Tab-based navigation between rooms, food, and bookings
- **Room Browsing**: Filterable room listings with booking modal
- **Food Ordering**: Categorized menu with shopping cart functionality
- **Booking Management**: View and manage existing reservations and orders

### Storage Implementation
- **Interface-based Design**: IStorage interface allows for different storage backends
- **Production Database**: DatabaseStorage class with Neon PostgreSQL integration
- **Sample Data**: Neon database pre-populated with rooms and food items for testing

## Data Flow

1. **Client Requests**: React components use TanStack Query to fetch data
2. **API Layer**: Express routes handle HTTP requests and validate input
3. **Storage Layer**: Storage interface abstracts data persistence
4. **Response Handling**: Consistent JSON responses with proper error codes
5. **State Management**: React Query manages caching and synchronization

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: Serverless PostgreSQL driver for Neon
- **drizzle-orm**: Type-safe ORM for database operations
- **@tanstack/react-query**: Server state management
- **react-hook-form**: Form handling with validation
- **zod**: Schema validation for forms and API data

### UI Dependencies
- **@radix-ui/***: Accessible UI primitives for components
- **tailwindcss**: Utility-first CSS framework
- **lucide-react**: Icon library for UI elements
- **class-variance-authority**: Type-safe component variants

## Deployment Strategy

### Development
- **Vite Dev Server**: Hot module replacement for frontend development
- **Express Dev Server**: TypeScript execution with tsx for backend
- **Database**: Drizzle migrations for schema management

### Production Build
- **Frontend**: Vite builds static assets to `dist/public`
- **Backend**: esbuild bundles server code to `dist/index.js`
- **Database**: Drizzle push command for schema deployment
- **Environment**: Production server serves both API and static files

### Configuration
- **TypeScript**: Strict mode enabled with proper path mapping
- **Module System**: ESM modules throughout the application
- **Build Tools**: Optimized for both development speed and production performance

The application follows modern best practices with clear separation of concerns, type safety throughout, and a scalable architecture that can grow with business needs.