# Frontend Spec Phase 1: Routing

This document defines the application's routing configuration, including route definitions, lazy loading, and navigation guards for the MVP.

## 1. Configuration (`router/index.ts`)
-   **History Mode**: `createWebHistory` will be used for clean, server-friendly URLs.
-   **Lazy Loading**: All view/page components must be lazy-loaded using dynamic `import()` statements. This is critical for performance, as it splits the code into smaller chunks and loads them on demand.

## 2. Route Definitions (MVP)

| Path                      | Component (`views/`)           | Name               | `meta: { requiresAuth: boolean }` | Description                                                                         |
| ------------------------- | ------------------------------ | ------------------ | --------------------------------- | ----------------------------------------------------------------------------------- |
| `/`                       | `WelcomePage.vue`              | `welcome`          | `false`                           | The main landing page for new users who did not arrive via a survey link.           |
| `/auth`                   | `auth/AuthPage.vue`            | `auth`             | `false`                           | Handles the Google Social Login flow. Redirects if already authenticated.         |
| `/analysis`               | `analysis/AnalysisHub.vue`     | `analysis-hub`     | `true`                            | User's main dashboard to create a share link and track friend responses.            |
| `/survey/:analysisId`     | `survey/SurveyPage.vue`        | `survey`           | `false`                           | The public page where friends answer questions about the user.                      |
| `/persona/reveal`         | `reveal/PersonaReveal.vue`     | `persona-reveal`   | `true`                            | The "gacha-style" animation page that unveils the generated AI Persona.             |
| `/persona/chat`           | `persona/PersonaChat.vue`      | `persona-chat`     | `true`                            | The main interface for viewing the Persona's details and chatting with it.        |
| `/*` (Catch-all)          | `NotFoundPage.vue`             | `not-found`        | `false`                           | A 404 page for any undefined routes.                                                |

## 3. Navigation Guards
A global `router.beforeEach` navigation guard will be implemented in `router/index.ts` to handle authentication.

-   **Logic**:
    1.  On every route change, the guard checks the `authStore` for the user's authentication status.
    2.  It inspects the target route's `meta.requiresAuth` field.
    3.  **If `to.meta.requiresAuth` is `true` and the user is NOT authenticated**:
        -   Redirect the user to the `auth` route (`/auth`).
        -   Store the intended destination to redirect back after a successful login.
    4.  **If `to.path` is `/auth` and the user IS authenticated**:
        -   Redirect the user to their dashboard (`/analysis`), preventing them from seeing the login page again.
    5.  Otherwise, allow navigation to proceed.
