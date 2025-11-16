# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Essential Commands

### Development
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality checks
- `npm run pretty` - Format code with Prettier

### Testing
No test framework is configured. Tests should be added if needed.

## Architecture Overview

This is a React + TypeScript + Vite application that displays marathon race results and statistics. The app is a single-page application with no routing, displaying different views through tabs.

### Core Data Flow
1. **Data Sources**: Static data files in `src/data/` contain race results, upcoming races, and bio content
2. **Statistics Calculation**: `App.tsx` calculates stats from marathon results on render
3. **Component Hierarchy**: App → StatsCard, Bio, TabView, UpcomingRaces, ResultsTable, Footer
4. **View Switching**: TabView component manages switching between table, chart, and map views

### Key Architecture Patterns
- **Type Safety**: Strong TypeScript typing with branded types for dates/durations
- **Data Centralization**: All race data centralized in `src/data/` files
- **Utility Functions**: Shared utilities in `src/utils/` for formatting, calculations
- **Component Composition**: Small, focused components with clear responsibilities

## Technology Stack

### Core
- **React 18** with functional components and hooks
- **TypeScript** with strict typing
- **Vite** for build tooling and dev server
- **Tailwind CSS** for styling

### UI Libraries
- **Chart.js** with react-chartjs-2 for time progression charts
- **Leaflet** with react-leaflet for interactive maps
- **Lucide React** for icons
- **country-flag-icons** for country flags

### Data Processing
- **date-fns** for date manipulation
- **lodash** for utility functions
- **i18n-iso-countries** for country code handling

## File Structure Patterns

### Data Files (`src/data/`)
- Export const arrays/objects with marathon results, upcoming races, bio content
- Use proper TypeScript interfaces from `src/types/marathon.ts`

### Components (`src/components/`)
- Functional components with TypeScript interfaces for props
- Export as named exports (not default)
- Use Tailwind classes for styling

### Utils (`src/utils/`)
- Pure functions for calculations and formatting
- Focused on single responsibilities (dates, pace, countries, etc.)

### Types (`src/types/`)
- Branded types for ISO date strings and durations
- Interface definitions for all data structures
- Special mark types for race annotations

## Code Conventions

### TypeScript
- Use branded types for strings that need validation (dates, durations)
- Define interfaces for all data structures
- Prefer type unions over enums for simple categorization

### React
- Functional components with hooks
- Props interfaces defined inline or in types file
- Use React.memo() for performance optimization where needed

### Styling
- Tailwind CSS classes exclusively
- Responsive design with mobile-first approach
- Consistent spacing and color schemes

## Development Guidelines

### Adding New Race Data
1. Update `src/data/marathonResults.ts` with new race entries
2. Ensure all Location coordinates are added to `src/data/locations.ts`
3. Follow the MarathonResult interface structure exactly

### Adding New Components
1. Create in `src/components/` with TypeScript interface for props
2. Follow existing naming conventions (PascalCase)
3. Use Tailwind for styling, maintain responsive design
4. Export as named export

### Data Processing
- Use utility functions in `src/utils/` for calculations
- Keep data transformation logic separate from components
- Prefer immutable operations when manipulating arrays/objects

## Environment Variables
- `VITE_SITE_TITLE` - Site title (configured in vite.config.ts)
- No other environment variables currently used