# SoundCloud Clone

A SoundCloud-inspired music streaming application built with **Angular, TypeScript, and Nx**, focusing on scalable frontend architecture, reusable components, reactive state management, and music playback.

## About the Project

SoundCloud Clone is a personal engineering project that recreates the core user experience of a modern music streaming platform.

The application aims to support music discovery, track browsing, artist profiles, playlists, search, and persistent audio playback through the SoundCloud Widget API.

Beyond recreating the interface, the main objective is to understand how a production-style Angular application is designed, organized, and maintained.

The project takes architectural inspiration from [trungvose/angular-spotify](https://github.com/trungvose/angular-spotify), while independently implementing a SoundCloud-inspired experience.

**Current status:** Early development. The Nx workspace, initial application shell, and global navigation header have been implemented. Music discovery and playback features are planned.

## Tech Stack

| Technology | Responsibility |
|---|---|
| Angular | Component-based frontend application |
| TypeScript | Type-safe application logic |
| Nx | Monorepo organization, project boundaries, and build orchestration |
| Angular Router | Client-side routing and lazy loading |
| SCSS | Component and global styling |
| SoundCloud Widget API | Planned audio playback integration |
| Vitest | Unit testing |
| Playwright | End-to-end testing |
| GitHub Actions | Continuous integration |

## Architecture

The application follows a **feature-oriented Angular architecture**, with Nx used to support modularization as the project grows.

The architectural goal is to separate application composition, business features, reusable UI, data access, and shared utilities.

### High-Level Architecture

```text
                    SoundCloud Clone
                           |
                    Angular Application
                           |
          +----------------+----------------+
          |                |                |
      App Shell         Features       Shared Libraries
          |                |                |
       Header           Discover         UI Components
       Layout           Search           Models
       Routing          Library          Utilities
       Player           Artists
          |                |
          +--------+-------+
                   |
             Data Access Layer
                   |
          SoundCloud Widget API
             / Mock Data
```

The diagram represents the **target architecture**, not the complete current implementation.

### Architectural Layers

**1. Application Shell**

The application shell is responsible for the global structure shared across pages.

It includes the navigation header, main content area, routing outlet, and eventually a persistent music player.

The shell remains mounted while individual pages change, allowing shared application UI and playback state to persist across navigation.

**2. Feature Layer**

Each feature owns a specific area of application functionality.

Planned features include:

- **Discover:** Music recommendations and trending tracks.
- **Search:** Finding tracks, artists, and playlists.
- **Library:** User collections and liked tracks.
- **Artists:** Artist profiles and music catalogs.
- **Player:** Playback controls and track queue management.

Features will be developed incrementally and organized into dedicated Nx libraries where this provides meaningful separation.

**3. UI Layer**

Reusable, presentation-focused components such as track cards, playlist cards, artwork, buttons, and loading indicators.

These components should receive data through well-defined inputs and communicate user interactions through outputs rather than directly owning application-wide business state.

**4. Data Access Layer**

Responsible for isolating external integrations and data retrieval from presentation components.

Development begins with local mock data. Future integrations will include the SoundCloud Widget API for supported playback operations.

This separation makes it easier to replace mock implementations without rewriting feature UI.

**5. Shared Layer**

Contains reusable TypeScript types, interfaces, constants, and utilities that are not specific to one feature.

### Planned Nx Workspace Structure

```text
soundcloud-clone/
├── apps/
│   ├── soundcloud/             # Angular application entry point
│   └── soundcloud-e2e/         # End-to-end tests
│
├── libs/                       # Planned modular libraries
│   ├── shell/                  # Application shell and layout
│   ├── discover/
│   │   ├── feature/            # Discover page and orchestration
│   │   ├── ui/                 # Discover presentation components
│   │   └── data-access/        # Track data retrieval
│   ├── player/
│   │   ├── feature/            # Playback orchestration
│   │   ├── ui/                 # Player controls
│   │   └── data-access/        # Playback integration and state
│   └── shared/
│       ├── ui/                 # Reusable UI components
│       ├── models/             # Shared domain types
│       └── utils/              # Shared utilities
│
├── .github/workflows/          # CI workflows
├── nx.json
└── package.json
```

Libraries will be introduced as features are implemented rather than generated in advance.

### Component Communication and State

The architecture distinguishes between local UI state and shared application state.

- **Local state:** Component-specific interactions such as input values, dropdown visibility, and hover states.
- **Feature state:** Data and interactions owned by a particular feature.
- **Global playback state:** The active track, playback status, progress, and queue, shared between pages and the persistent player.

Angular Signals are being considered for reactive state management. The exact implementation will be selected as playback and cross-feature requirements become concrete.

### Navigation and Playback

Angular Router controls navigation between application pages.

The global player is planned to live outside the routed page content so that navigating from Discover to an artist or playlist does not recreate the player component.

SoundCloud Widget API integration is planned for playback, with an adapter layer separating the external SDK from application state and UI components.

## Current Implementation

- [x] Initialize Nx Angular workspace
- [x] Configure project tooling and GitHub Actions CI
- [x] Create global navigation header
- [x] Add navigation, search, and authentication UI placeholders
- [x] Establish root application layout
- [ ] Implement Discover page
- [ ] Build reusable track cards
- [ ] Add music search and artist pages
- [ ] Implement persistent playback
- [ ] Integrate SoundCloud Widget API
- [ ] Introduce feature-specific Nx libraries
- [ ] Implement shared playback state management
- [ ] Improve responsive design and accessibility

## Getting Started

**Prerequisites:** Node.js 22 and npm.

```bash
git clone https://github.com/atticus1602/soundcloud-clone.git
cd soundcloud-clone
npm ci
npx nx serve soundcloud
```

Open http://localhost:4200.

## Development Workflow

The project follows an incremental, feature-based development workflow:

1. Implement a focused feature in a dedicated Git branch.
2. Keep components small and responsibilities explicit.
3. Use Conventional Commits to document meaningful changes.
4. Validate changes through automated tooling and CI.
5. Review and merge changes through pull requests.
6. Update documentation as architectural decisions evolve.

## Roadmap

**Phase 1 — Application Foundation**

Global navigation, routing, Discover page, reusable music cards, and responsive layout.

**Phase 2 — Music Experience**

Track browsing, search, artist profiles, playlists, and playback controls.

**Phase 3 — Playback Architecture**

SoundCloud Widget integration, shared playback state, and a persistent player.

**Phase 4 — Engineering Improvements**

Nx library boundaries, performance optimization, accessibility, automated testing, and deployment.

## Acknowledgements

- [SoundCloud](https://soundcloud.com/) — Product and UI inspiration.
- [angular-spotify](https://github.com/trungvose/angular-spotify) — Angular application architecture inspiration.

This project is independently developed for educational and portfolio purposes and is not affiliated with or endorsed by SoundCloud.