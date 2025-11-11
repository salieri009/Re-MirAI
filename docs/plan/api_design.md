# API Design Specification (Subculture Ver.)

This document provides a detailed specification for the REST API of the Re:MirAI project, aligned with the Experience Design Document.

## 1. General Principles

*   All API endpoints are prefixed with `/api/v1`.
*   Authentication is handled via JWT Bearer tokens, obtained through social login.
*   Request and response bodies are in JSON format.
*   Standard HTTP status codes are used. Asynchronous operations will use `202 Accepted`.
*   Endpoint naming conventions reflect the project's lore (e.g., "Ritual," "Summon").

## 2. Endpoints

### 2.1. Authentication (`/auth`)

*   **`POST /auth/google-login`**
    *   **Description:** Authenticates a user via their Google ID token. Creates a new user on first login or logs in an existing user.
    *   **Request Body:**
        ```json
        {
          "token": "string (Google ID Token)"
        }
        ```
    *   **Response (200 OK):**
        ```json
        {
          "token": "string (Our app's JWT)",
          "user": {
            "id": "uuid",
            "displayName": "string",
            "email": "string",
            "profileImageUrl": "string",
            "memoryCrystals": 100
          }
        }
        ```

### 2.2. User Profile (`/users`)

*   **`GET /users/me`**
    *   **Description:** Retrieves the profile of the currently authenticated user.
    *   **Authentication:** Required.
    *   **Response (200 OK):** Returns the same user object as the login response.

### 2.3. The Ritual (Survey) (`/ritual`)

*   **`POST /ritual`**
    *   **Description:** Creates a new "Summoning Ritual" (survey) for the user.
    *   **Authentication:** Required.
    *   **Response (201 Created):**
        ```json
        {
          "ritualId": "uuid",
          "invitationUrl": "string (Full URL for friends)"
        }
        ```

*   **`GET /ritual/me`**
    *   **Description:** Gets the status of the user's current active ritual.
    *   **Authentication:** Required.
    *   **Response (200 OK):**
        ```json
        {
          "ritualId": "uuid",
          "invitationUrl": "string",
          "responsesCount": 2,
          "minimumResponses": 3,
          "isSummonable": false
        }
        ```

*   **`GET /ritual/{ritualId}`** (Public)
    *   **Description:** Fetches the questions for a specific ritual.
    *   **Response (200 OK):**
        ```json
        {
          "ritualId": "uuid",
          "creatorName": "string",
          "questions": [
            { "id": "q1", "text": "...", "type": "multiple-choice", "options": [...] }
          ]
        }
        ```

*   **`POST /ritual/{ritualId}/responses`** (Public)
    *   **Description:** Submits a "perception" (answers) for a ritual.
    *   **Request Body:**
        ```json
        {
          "answers": { "q1": "option_a", "q2": "Some text." }
        }
        ```
    *   **Response (201 Created):**
        ```json
        { "message": "Your perception has been sent to the vessel." }
        ```

### 2.4. Persona Summoning & Interaction (`/personas`)

*   **`POST /personas/summon`**
    *   **Description:** Begins the summoning process for the user's Persona. This triggers the asynchronous backend process.
    *   **Authentication:** Required.
    *   **Request Body:**
        ```json
        {
          "mode": "Fated" | "Alchemic",
          "archetypeFilter": "string (Required if mode is 'Alchemic', e.g., 'Yandere')"
        }
        ```
    *   **Response (202 Accepted):**
        ```json
        {
          "status": "summoning_initiated",
          "message": "The summoning has begun. Check status periodically."
        }
        ```

*   **`GET /personas/me`**
    *   **Description:** Retrieves the user's primary Persona. Used for polling the status after summoning and for fetching the main Persona data.
    *   **Authentication:** Required.
    *   **Response (200 OK):**
        ```json
        // When summoning is in progress
        { "status": "summoning" }

        // When ready
        {
          "id": "uuid",
          "name": "Rei",
          "status": "ready",
          "archetype": "Yandere",
          "rarity": "SSR",
          "title": "Yandere hiding her kindness",
          "illustrationUrl": "string (URL)",
          "stats": {
            "Charisma": 80,
            "Intellect": 75,
            "Kindness": 95,
            "Instability": 90,
            "Spirit": 60
          },
          "bondLevel": 1,
          "bondProgress": 0.0
        }
        ```

*   **`POST /personas/me/chat`**
    *   **Description:** Sends a message to the user's Persona and gets a response.
    *   **Authentication:** Required.
    *   **Request Body:** `{"message": "string"}`
    *   **Response (200 OK):** `{"reply": "string (AI's reply)"}`

*   **`GET /personas/me/chat`**
    *   **Description:** Retrieves the chat history for the user's Persona.
    *   **Authentication:** Required.
    *   **Query Params:** `?limit=20&offset=0` for pagination.
    *   **Response (200 OK):**
        ```json
        {
          "history": [
            { "sender": "user", "message": "Hello", "timestamp": "iso_string" },
            { "sender": "ai", "message": "Hi there!", "timestamp": "iso_string" }
          ]
        }
        ```

### 2.5. Social & Showcase (`/social`)

*   **`GET /social/profile/{userId}`** (Public)
    *   **Description:** Gets the public-facing profile card data for a specific user's Persona.
    *   **Response (200 OK):** A subset of the `GET /personas/me` response, containing only public information (name, archetype, rarity, illustration, stats).

*   **`GET /social/compatibility`**
    *   **Description:** Generates a compatibility report between the user's Persona and another user's Persona.
    *   **Authentication:** Required.
    *   **Query Params:** `?otherUserId=uuid`
    *   **Response (200 OK):**
        ```json
        {
          "chemistryScore": 95,
          "analysis": "A classic case of 'energetic person melts the ice queen.'"
        }
        ```
