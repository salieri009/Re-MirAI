# Frontend Spec Phase 1: State Management (Pinia)

This document specifies the structure and functionality of the Pinia stores responsible for managing the application's state.

## 1. General Principles
- **Single Source of Truth**: Components should read state from Pinia stores, not manage complex local state.
- **Actions for Mutations**: All state changes must occur through store actions.
- **Decoupled Logic**: Business logic (especially API calls) is encapsulated within store actions, keeping components lean.

## 2. Store Definitions

### `stores/auth.ts` (`authStore`)
Manages user authentication and profile data.

-   **State**:
    -   `user: User | null` - Holds the authenticated user's profile.
    -   `token: string | null` - Stores the JWT.
-   **Getters**:
    -   `isAuthenticated: boolean` - Computed property, true if `token` and `user` exist.
-   **Actions**:
    -   `login(googleToken: string): Promise<void>`:
        -   **Real**: Sends the token to `POST /auth/google-login`, stores the returned JWT and user profile.
        -   **Phase 1 Mock**: Ignores `googleToken`. Sets a mock `user` object and a dummy `token` in the state. Simulates a network delay.
    -   `logout(): void`: Clears `user` and `token`, and redirects to the login page.
    -   `initialize(): Promise<void>`: Action called on app startup to check for a token in local storage and fetch the user profile if it exists.

### `stores/analysis.ts` (`analysisStore`)
Manages the creation and status of a user's Profile Analysis survey.

-   **State**:
    -   `analysisId: string | null`
    -   `shareUrl: string | null`
    -   `responseCount: number`
    -   `status: 'idle' | 'collecting' | 'ready_to_generate'`
-   **Actions**:
    -   `createAnalysis(): Promise<void>`:
        -   **Real**: Calls `POST /analyses`. Stores the returned `analysisId` and `shareUrl`. Sets status to `'collecting'`.
        -   **Phase 1 Mock**: Generates a fake UUID for `analysisId` and a dummy localhost URL for `shareUrl`.
    -   `fetchAnalysisStatus(): Promise<void>`:
        -   **Real**: Calls `GET /analyses/me` and updates the `responseCount` and `status`.
        -   **Phase 1 Mock**: Simulates responses by incrementally increasing `responseCount`. After a threshold (e.g., 3 responses), it sets `status` to `'ready_to_generate'`.

### `stores/persona.ts` (`personaStore`)
Manages the user's generated Persona, including generation status and chat.

-   **State**:
    -   `persona: Persona | null` - Holds the complete Persona object.
    -   `generationStatus: 'idle' | 'generating' | 'ready' | 'failed'`
    -   `chatHistory: Message[]`
-   **Actions**:
    -   `generatePersona(): Promise<void>`:
        -   **Real**: Calls `POST /personas/generate`. Sets `generationStatus` to `'generating'`.
        -   **Phase 1 Mock**: Sets `generationStatus` to `'generating'`, waits for a few seconds (simulating processing), then sets it to `'ready'` and populates `persona` with mock data.
    -   `fetchPersona(): Promise<void>`:
        -   **Real**: Polls `GET /personas/me` to check `generation_status` and retrieve the final `persona` data.
        -   **Phase 1 Mock**: Returns the mock `persona` data directly if `generationStatus` is `'ready'`.
    -   `sendMessage(message: string): Promise<void>`:
        -   **Real**: Calls `POST /personas/me/chat`, appends the user's message and the AI's `reply` to `chatHistory`.
        -   **Phase 1 Mock**: Adds the user's message to `chatHistory`. After a short delay, adds a predefined, canned response to `chatHistory`.
    -   `fetchChatHistory(): Promise<void>`:
        -   **Real**: Calls `GET /personas/me/chat` to load previous messages.
        -   **Phase 1 Mock**: Populates `chatHistory` with a few mock messages.

### `stores/ui.ts` (`uiStore`)
Manages global UI state.

-   **State**:
    -   `isLoading: boolean` - For global loading indicators.
    -   `notification: { message: string, type: 'success' | 'error' } | null`
-   **Actions**:
    -   `setLoading(status: boolean)`: Sets the `isLoading` state.
    -   `showNotification(config: { message: string, type: 'success' | 'error' })`: Sets the `notification` object.
    -   `clearNotification()`: Clears the `notification`.
