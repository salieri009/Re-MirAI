# Frontend Spec Phase 1: Views (Pages)

This document details the structure and functionality of each main view in the application for the MVP.

## 1. `views/WelcomePage.vue` (`/`)
-   **Purpose**: The primary landing page for organic traffic.
-   **Content**:
    -   Clear value proposition: "Discover your AI persona, created by your friends."
    -   Engaging, anime-style visuals.
    -   A primary call-to-action (CTA) that links to the authentication page (`/auth`).
-   **Data**: None. This is a static page.

## 2. `views/auth/AuthPage.vue` (`/auth`)
-   **Purpose**: To handle user sign-in and registration.
-   **Content**:
    -   Displays the `auth/GoogleLoginButton` component.
    -   Brief text explaining that login is required to create a profile.
-   **Logic**: The `GoogleLoginButton` handles the entire authentication flow. Upon successful login, the `authStore` will have the user data, and the route guard will redirect to `/analysis`.

## 3. `views/analysis/AnalysisHub.vue` (`/analysis`)
-   **Purpose**: The user's dashboard for managing their profile analysis.
-   **Data**:
    -   Reads `analysisId`, `shareUrl`, and `responseCount` from `analysisStore`.
-   **States**:
    1.  **Initial State (`analysisId` is null)**:
        -   Shows a "Create My Profile Link" button.
        -   On click, it calls the `analysisStore.createAnalysis` action.
    2.  **Collecting State (`analysisId` exists)**:
        -   Displays the `analysis/ShareLinkCard` component with the `shareUrl`.
        -   Displays the `analysis/ResponseTracker` to show progress.
        -   Polls the `analysisStore.fetchAnalysisStatus` action periodically.
    3.  **Ready State (`status` is `ready_to_generate`)**:
        -   The `ResponseTracker` appears full.
        -   A "Reveal My Persona" button appears, which navigates to `/persona/reveal`.

## 4. `views/survey/SurveyPage.vue` (`/survey/:analysisId`)
-   **Purpose**: The public page for friends to submit feedback.
-   **Data**:
    -   On mount, it calls a dedicated `survey` API module (or mock) to fetch the questions and the creator's name using the `analysisId` from the route params.
-   **Content**:
    -   Displays the creator's name (e.g., "Help create a persona for [Creator Name]!").
    -   Renders a list of `survey/QuestionCard` components using `v-for`.
-   **Logic**:
    -   Collects all answers in local component state.
    -   On form submission, it calls an API module function to `POST /analyses/{analysisId}/responses`.
    -   After successful submission, it displays a thank you message and a strong CTA to create their own profile, linking to `/auth` to start the viral loop.

## 5. `views/reveal/PersonaReveal.vue` (`/persona/reveal`)
-   **Purpose**: To create a moment of excitement for the user.
-   **Logic**:
    -   On mount, it calls `personaStore.generatePersona()`.
    -   It observes `personaStore.generationStatus`.
    -   While `'generating'`, it displays a "gacha-style" animation (e.g., summoning, data processing visuals).
    -   When status changes to `'ready'`, the animation concludes, and it reveals the core persona traits (archetype, rarity, title).
    -   After a short delay, it automatically navigates the user to `/persona/chat`.

## 6. `views/persona/PersonaChat.vue` (`/persona/chat`)
-   **Purpose**: The main hub for interacting with the generated AI.
-   **Layout**: A two-column or mobile-stacked layout.
    -   **Left/Top**: Displays the `persona/PersonaHeader` component with the main persona details and placeholder avatar.
    -   **Right/Bottom**: The chat interface, composed of `chat/ChatWindow` (for history) and `chat/ChatInput` (for new messages).
-   **Data**:
    -   Reads `persona` and `chatHistory` from `personaStore`.
-   **Logic**:
    -   On mount, calls `personaStore.fetchPersona` and `personaStore.fetchChatHistory` if they are not already populated.
    -   The `ChatInput` component emits a `send` event, which triggers the `personaStore.sendMessage` action.
