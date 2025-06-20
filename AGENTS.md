# Code Pointers
This document provides quick pointers to navigate the `marathon-page` codebase.

## Agent Scaffold Prompt
The following prompt was used to bootstrap this project via Bolt (from `.bolt/prompt`):
```text
For all designs I ask you to make, have them be beautiful, not cookie cutter. Make webpages that are fully featured and worthy for production.

By default, this template supports JSX syntax with Tailwind CSS classes, React hooks, and Lucide React for icons. Do not install other packages for UI themes, icons, etc unless absolutely necessary or I request them.

Use icons from lucide-react for logos.

Use stock photos from unsplash where appropriate, only valid URLs you know exist. Do not download the images, only link to them in image tags.
```

## Bolt Template Configuration
This project was scaffolded using Bolt’s `bolt-vite-react-ts` template (as specified in `.bolt/config.json`).

## Project Structure
```text
AGENTS.md              # Code pointers (this file)
index.html             # Main HTML template
package.json           # Project metadata & scripts
postcss.config.js      # PostCSS configuration
tailwind.config.js     # Tailwind CSS configuration
tsconfig.app.json      # TypeScript config for app
tsconfig.node.json     # TypeScript config for Node (config & tooling)
vite.config.ts         # Vite build configuration
src/                   # Application source code
public/                # Static assets (favicon, etc.)
dist/                  # Production build output (generated)
```

## Entry Points
- **index.html**: HTML template that loads the React app and Leaflet CSS.
- **src/main.tsx**: Mounts the root React component (`<App/>`) into the DOM.

## Main Application
- **src/App.tsx**: Root React component that ties together data, stats, and UI.

## Components (`src/components`)
- **Bio.tsx**: Biography section.
- **StatsCard.tsx**: Overview of marathon stats.
- **TabView.tsx**: Tabs for switching between table, chart, and map.
- **ResultsTable.tsx**: Tabular display of past race results.
- **TimeChart.tsx**: Chart visualization of finish times using Chart.js.
- **MapView.tsx**: Interactive map using React-Leaflet.
- **UpcomingRaces.tsx**: List of upcoming races.
- **Footer.tsx**: Application footer.

## Data (`src/data`)
- **bioContent.ts**: Static content and title for the bio section.
- **marathonResults.ts**: Hard-coded past marathon results.
- **upcomingRaces.ts**: Information about planned future races.
- **locations.ts**: Geographic data (coordinates) for races.

## Types (`src/types`)
- **marathon.ts**: TypeScript interfaces for race results and stats.

## Utilities (`src/utils`)
- **dateUtils.ts**: Formatting/parsing dates.
- **paceUtils.ts**: Calculating pace from time and distance.
- **countryUtils.ts**: Country code/name/flag utilities.
- **specialMarkUtils.ts**: Formatting of any special race annotations.
- **weatherUtils.ts**: Helpers to parse/format race-day weather data.

## Styling & Build Config
- **tailwind.config.js** / **postcss.config.js**: Tailwind CSS and PostCSS setup.
- **eslint.config.js**: ESLint rules and plugins.
- **tsconfig.app.json** / **tsconfig.node.json**: TypeScript compiler options.
- **vite.config.ts**: Vite build and environment variable definitions.

## Scripts & Dependencies
- **package.json**: `scripts` for `dev`, `build`, `lint`, `preview` and dependencies.

## Static & Generated Assets
- **public/**: Static assets served as-is (e.g., `favicon.svg`).
- **dist/**: Production build output (run `npm run build` to regenerate).