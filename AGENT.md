# Internal Dashboard Agent Instructions

This project follows a 3-layer architecture to ensure consistency, reliability, and ease of maintenance for business insights.

## The 3-Layer Architecture

### Layer 1: Directive (Strategy & Logic)
- **Location**: `internal-dashboard/directives/`
- **Content**: Markdown SOPs that define business logic, UI standards, and data processing rules.
- **Role**: These are the "brains" of the operation. Before changing logic, consult or update the relevant directive.

### Layer 2: Orchestration (Decision Making)
- **Location**: `internal-dashboard/src/`
- **Role**: The React application itself acts as the orchestrator for the user interface, routing data between the UI components and the storage layer.
- **Agent Role**: As the AI agent, you use these instructions to intelligently implement features, handle errors, and ensure the UI remains premium and functional.

### Layer 3: Execution (Data & Persistence)
- **Location**: `internal-dashboard/src/services/` and `internal-dashboard/execution/`
- **Role**: Deterministic logic for data storage (`localStorage`), calculations, and exports.
- **Scripts**: Any heavy data processing or utility scripts should live in `execution/`.

## Operating Principles

1. **Local-First Reliability**: All data must persist in `localStorage` with robust error handling.
2. **Elite Aesthetics**: Every UI change must adhere to the "Tech Innovation" standard (Electric Blue, Neon Cyan, high-fidelity claymorphism, cinematic reveal animations).
3. **Self-Annealing Progress**: If a dashboard widget fails, log the error locally, attempt to recover, and notify the user with actionable insights.
4. **Declarative State**: Prefer hooks and services over ad-hoc state management to keep components lean.

## File Organization

- `internal-dashboard/src/components/` - Atomic UI elements (Cards, Buttons, Charts).
- `internal-dashboard/src/pages/` - Composed views (Dashboard, Login).
- `internal-dashboard/src/services/` - Data access layer (`storageService.js`).
- `internal-dashboard/directives/` - Documentation of business rules and UX patterns.
- `internal-dashboard/execution/` - Utility scripts for data migration or bulk processing.

## Key Logic Flows

- **Data Loading**: `Dashboard.jsx` -> `hooks/` -> `analyticsService.js` -> `storageService.js` -> `localStorage`.
- **UI Styling**: `styles.css` (The Global Design System).
