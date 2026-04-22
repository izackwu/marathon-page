# AGENTS.md

Instructions for AI coding agents working in this repository.

## Essential Commands

- `npm run dev` — start dev server with HMR
- `npm run build` — production build (also type-checks)
- `npm run lint` — ESLint
- `npm run pretty` — Prettier (write mode)

No test framework is configured.

## Architecture

React 18 + TypeScript + Vite SPA displaying marathon race results and statistics. Single page, no router — views switch via tabs.

### Data flow

Static data (`src/data/`) → `App.tsx` computes stats → components render views.

- `marathonResults.ts` — race results array
- `upcomingRaces.ts` — upcoming races array
- `locations.ts` — coordinate data for map pins
- `bioContent.ts` — bio/about text

### Views (managed by `TabView`)

| View | Component | Library |
|------|-----------|---------|
| Table | `ResultsTable` | — |
| Chart | `TimeChart` | Chart.js + react-chartjs-2 |
| Map | `MapView` | D3 + topojson-client |

### Types (`src/types/marathon.ts`)

Branded types: `ISODateString`, `DurationString` (string & tagged). All data structures use typed interfaces (`MarathonResult`, `UpcomingRace`, `MarathonStats`, `Location`, `SpecialMark`).

### Styling

Tailwind CSS with custom color tokens defined in `tailwind.config.js`. Components read these tokens directly (e.g., `MapView` imports the config for D3 color values).

## Adding Race Data

1. Add entry to `src/data/marathonResults.ts` following the `MarathonResult` interface
2. Add location coordinates to `src/data/locations.ts` if new venue
3. For upcoming races, update `src/data/upcomingRaces.ts`
