# Changelog

All notable changes to the CRWLR project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2025-03-20

### Added
- Supabase integration for backend services
- Authentication context and provider
- React Router for navigation
- Environment variable validation

### Dependencies Added
- @supabase/supabase-js ^2.39.7
- react-router-dom ^6.22.3

## [1.0.0] - 2025-03-20

### Added
- Initial project setup with Vite, React, and TypeScript
- Tailwind CSS configuration and styling
- ESLint configuration for code quality
- Basic project structure and routing
- UI Components:
  - Avatar component with size variants and online status
  - Badge component with multiple variants
  - Button component with variants and sizes
  - Card component with header, content, and footer sections
  - FilterBar component for venue filtering
  - Navbar component with responsive design
- Feature Pages:
  - Discover page for venue exploration
  - Crawls page for managing bar crawls
  - Crawl detail page with itinerary view
  - Leaderboard page with achievements
- Mock data implementation for development
- Custom utility functions (cn for class names)
- Pattern styles for visual enhancement
- Git configuration and version control setup

### Dependencies
- React 18.3.1
- Vite 5.4.2
- TypeScript 5.5.3
- Tailwind CSS 3.4.1
- Lucide React 0.344.0