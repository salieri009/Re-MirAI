# Frontend Spec Phase 1: Directory Structure

This document outlines the standard directory structure for the project. The structure is designed to be modular, scalable, and easy to navigate.

```
/src
├── api/          # API client, types, and mocking
│   ├── client.ts   # Axios instance configuration and interceptors
│   ├── endpoints/  # Grouped API calls by feature (e.g., auth.ts)
│   ├── mocks/      # Mock API implementation for Phase 1
│   │   ├── data/     # Static JSON mock data
│   │   └── index.ts  # Logic to conditionally provide mock responses
│   └── types.ts    # TypeScript interfaces for API payloads
│
├── assets/       # Static assets (images, fonts, etc.)
│
├── components/   # Reusable Vue components
│   ├── base/       # Atomic, generic components (BaseButton, BaseInput)
│   ├── domain/     # Components tied to a specific feature (PersonaCard)
│   └── icons/      # SVG icon components
│
├── composables/  # Reusable Composition API functions (e.g., useAuth)
│
├── layouts/      # Page layout components (DefaultLayout, AuthLayout)
│
├── router/       # Vue Router configuration
│   └── index.ts    # Route definitions, guards, and lazy loading
│
├── stores/       # Pinia state management stores
│   ├── auth.ts     # Handles user session, profile
│   ├── analysis.ts # Handles survey creation and response tracking
│   ├── persona.ts  # Handles persona data and chat state
│   └── ui.ts       # Handles global UI state (modals, notifications)
│
├── styles/       # Global styles and Tailwind CSS configuration
│   └── main.css    # Imports Tailwind layers and defines global styles
│
├── types/        # Global TypeScript types and interfaces (non-API)
│
├── utils/        # Shared utility functions (e.g., formatters, validators)
│
└── views/        # Top-level page components, mapped to routes
```
