# Frontend Spec Phase 1: API Client & Mocking

This document describes the setup for the API client and the strategy for mocking API responses during Phase 1 development.

## 1. API Client (`api/client.ts`)
A centralized Axios instance will handle all HTTP communication.

-   **Configuration**:
    -   `baseURL`: Initialized from the `VITE_API_BASE_URL` environment variable.
    -   `headers`: Default headers like `'Content-Type': 'application/json'`.
-   **Request Interceptor**:
    -   **Purpose**: To automatically inject the authentication token into every request.
    -   **Logic**: Before a request is sent, it reads the `token` from the `authStore`. If the token exists, it adds an `Authorization: Bearer <token>` header.
-   **Response Interceptor**:
    -   **Purpose**: To handle global API errors gracefully.
    -   **Logic**:
        -   **Success (2xx)**: Passes the response data through.
        -   **Auth Error (401/403)**: If a request fails due to an invalid token, it should trigger the `authStore.logout()` action to clear the user's session and redirect to the login page.
        -   **Server Error (5xx)**: It should trigger a global notification via the `uiStore` to inform the user of a generic server error.

## 2. Endpoints (`api/endpoints/`)
API calls will be organized by resource to keep the codebase clean.

-   **Structure**: Each file corresponds to a resource (e.g., `auth.ts`, `personas.ts`).
-   **Implementation**: Each file exports functions that use the configured Axios client to make specific API calls (e.g., `loginWithGoogle(token)`, `generatePersona()`). These functions will be used by the Pinia stores.

## 3. Mocking Strategy (Phase 1)
To decouple the frontend from the backend during initial development, a mock adapter will be used to simulate API responses. This is controlled by the `VITE_MOCK_API` environment variable.

-   **File**: `api/mocks/index.ts`
-   **Activation**: In `main.ts`, this module will be initialized. It will check `import.meta.env.VITE_MOCK_API`. If `'true'`, it will attach a mock adapter (e.g., `axios-mock-adapter`) to the main Axios instance.
-   **Operation**:
    1.  The adapter intercepts outgoing requests from the Axios client.
    2.  It matches the request's method and URL (e.g., `onPost('/auth/google-login')`).
    3.  Upon a match, it returns a predefined mock response, simulating a real API call.
    4.  A realistic delay will be added to each mock response to simulate network latency.
-   **Mock Data**:
    -   **Location**: `api/mocks/data/`
    -   **Format**: Static JSON files (e.g., `user.json`, `persona.json`) that represent the data structures returned by the API.
-   **Benefit**: This approach is transparent to the application logic. Pinia stores will call `api.loginWithGoogle()` regardless of whether the mock server is active. The switch between mock and real API is controlled entirely by the environment variable, requiring no code changes in the business logic. This makes the transition to a live API seamless.
