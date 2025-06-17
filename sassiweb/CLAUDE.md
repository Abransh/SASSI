# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
- `npm run dev` - Start development server on localhost:3000
- `npm run build` - Build the application for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint for code quality checks

### Database
- `npm run prisma:generate` - Generate Prisma client after schema changes
- `npm run prisma:migrate` - Run database migrations in development
- `npm run prisma:seed` - Seed the database with initial data

## Architecture Overview

This is a Next.js 15 application for the Students' Association of Indians in Milan (SASSI) community platform.

### Tech Stack
- **Framework**: Next.js 15 with App Router
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js with credentials provider
- **UI**: React with Tailwind CSS and Radix UI components
- **Payments**: Stripe integration
- **File Uploads**: Uploadcare integration
- **Rich Text**: TinyMCE editor

### Core Features
- **User Management**: Registration, authentication, profile management with role-based access (USER/ADMIN)
- **Events System**: Event creation, registration with phone number validation, payment processing, verification codes, and gallery management
- **Resource Center**: Document/file sharing with categorization and access tracking
- **Cricket Module**: Complete cricket match management with scorekeeping and statistics
- **Membership System**: Regular and exclusive membership with payment verification
- **Admin Panel**: Content management, user administration, and application processing

### Key Directory Structure
- `app/` - Next.js App Router pages and API routes
- `components/` - Reusable React components with shadcn/ui integration
- `lib/` - Utility functions, database client, and service layers
- `prisma/` - Database schema, migrations, and seed scripts
- `public/` - Static assets including TinyMCE editor files

### Database Architecture
The Prisma schema defines comprehensive models for:
- User management with profiles and role-based permissions
- Event system with registrations and payment tracking
- Resource management with categories and view analytics
- Cricket system with matches, teams, players, and detailed scoring
- Payment processing through Stripe with multiple payment types

### Authentication & Authorization
- Custom credentials-based authentication via NextAuth.js
- Middleware-protected routes for admin panels and authenticated content
- Role-based access control with USER/ADMIN roles and super admin privileges
- Session management with JWT tokens (30-day expiry)

### Payment Integration
Stripe handles multiple payment scenarios:
- Event registration fees
- Team application processing
- Exclusive membership purchases
- Payment status tracking and webhook processing

### File Management
- Uploadcare integration for image/file uploads
- TinyMCE for rich text editing with local asset hosting
- Secure file access with authentication requirements
- Resource download tracking and analytics

### Security Features
- Comprehensive Content Security Policy headers
- Request validation and sanitization
- Protected routes with authentication middleware
- CSRF protection and secure cookie handling

## Development Notes

- Database uses foreign key relations (not Prisma's default referential actions)
- TinyMCE files are self-hosted in `public/tinymce/` for CSP compliance
- Middleware handles authentication for `/admin`, `/resources`, and `/join/team` routes
- All database operations use the centralized Prisma client in `lib/prisma.ts`
- Authentication logic is centralized in `lib/auth.ts` with session validation helpers
- Event registration requires users to have phone numbers in their profiles
- Each event registration generates a unique 6-digit verification code sent via email
- Admin registrations page displays verification codes for event check-in management
- Email system includes verification codes with professional styling and clear display