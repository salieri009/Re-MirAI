# Frontend Architecture: Persona AI

This document details the frontend architecture for the Persona AI project, emphasizing a modular, scalable, and maintainable codebase using Vue 3.

## 1. Core Principles

-   **Component-Based:** Build the UI from small, reusable components, following Atomic Design principles for a clear and organized structure.
-   **State Management:** Centralize and manage application state with a clear, predictable pattern to avoid inconsistencies.
-   **Type Safety:** Utilize TypeScript throughout the codebase to enhance code quality, improve maintainability, and reduce runtime errors.
-   **Performance:** Optimize for a fast initial load and a smooth, responsive user experience through techniques like lazy loading and code splitting.

## 2. Technology Stack

-   **Framework:** Vue 3 (with Composition API and `<script setup>`)
-   **Language:** TypeScript
-   **Build Tool:** Vite
-   **State Management:** Pinia
-   **Routing:** Vue Router
-   **Styling:** Tailwind CSS
-   **API Communication:** Axios (or a similar library)

## 3. Directory Structure

The project will follow a feature-driven, modular directory structure:

```
/src
├── api/         # API client, request/response types
├── assets/      # Static assets (images, fonts)
├── components/  # Reusable UI components
│   ├── base/    # Atomic components (BaseButton, BaseInput)
│   └── domain/  # Feature-specific components (ChatWindow)
├── composables/ # Reusable Composition API functions (e.g., useAuth)
├── layouts/     # Page layout components (DefaultLayout)
├── router/      # Vue Router configuration, lazy-loaded routes
├── stores/      # Pinia state management stores (auth, persona)
├── styles/      # Global styles, Tailwind configuration
├── types/       # Global TypeScript types and interfaces
└── views/       # Top-level page components (WelcomePage, PersonaChat)
```

## 4. State Management (Pinia)

State will be decoupled from components and managed in dedicated Pinia stores. This allows for better separation of concerns and easier testing.

-   **`authStore`**: Manages user authentication state, tokens, and user profile data.
-   **`analysisStore`**: Handles the state for creating, sharing, and tracking an analysis survey.
-   **`personaStore`**: Manages the state of the user's persona, including its data, generation status, and chat history.
-   **`uiStore`**: Manages global UI state, such as loading indicators, notifications, and modal visibility.

## 5. Routing (Vue Router)

-   **Lazy Loading:** All view components will be lazy-loaded using dynamic imports to reduce the initial bundle size and improve load times.
-   **Route Guards:** Navigation guards will be used to protect routes that require authentication (e.g., `/dashboard`) and to redirect users based on their auth status.

## 6. API Communication

-   A dedicated API client module will be created (e.g., `/api/client.ts`).
-   This client will be a configured instance of Axios, with interceptors for:
    -   **Request Interceptor:** Automatically attaching the JWT Bearer token to the `Authorization` header of outgoing requests.
    -   **Response Interceptor:** Handling global API errors (e.g., 401 Unauthorized for token expiry, 5xx for server errors) and normalizing the response data.
-   TypeScript interfaces for API payloads will be defined in `/api/types.ts` to ensure type safety when interacting with the backend.

## 7. Scalability

-   The modular directory structure and component-based architecture make it easy to add new features without disrupting existing code.
-   The use of Pinia and composables allows for business logic to be decoupled from the UI, making it more reusable and testable.
-   Code splitting via lazy-loaded routes ensures the application remains performant as it grows.
