# API Specification (v1): Persona AI

This document specifies the REST API for the Persona AI application.

## 1. General Conventions

-   **Base URL:** `/api/v1`
-   **Authentication:** All endpoints, unless marked `(Public)`, require an `Authorization: Bearer <JWT>` header. The JWT is obtained via the Google Login endpoint.
-   **Data Format:** All request and response bodies are in `application/json` format.
-   **Error Responses:** Errors will be returned with a standard JSON object:
    ```json
    {
      "error": {
        "code": "error_code",
        "message": "A human-readable error message."
      }
    }
    ```

---

## 2. Auth

### `POST /auth/google-login`

Exchanges a Google ID Token for a session JWT. If the user does not exist, a new user account is created.

-   **Request Body:**
    -   `token` (string, required): The Google ID Token.
-   **Success Response (200 OK):**
    -   `jwt` (string): The session JWT.
    -   `user` (object): The user's profile information.

---

## 3. Analyses (Surveys)

### `POST /analyses`

Creates a new, active "Profile Analysis" for the authenticated user.

-   **Authentication:** Required.
-   **Success Response (201 Created):**
    -   `analysisId` (string): The unique ID for the new analysis.
    -   `shareUrl` (string): The full URL to be shared with friends.

### `GET /analyses/me`

Gets the status of the authenticated user's active analysis.

-   **Authentication:** Required.
-   **Success Response (200 OK):**
    -   `analysisId` (string): The ID of the active analysis.
    -   `responseCount` (integer): The number of friends who have responded.
    -   `status` (string): e.g., 'collecting', 'ready_to_generate'.

### `GET /analyses/{analysisId}`

**(Public)** Fetches the questions for a specific analysis, to be displayed to a friend.

-   **Success Response (200 OK):**
    -   `analysisId` (string)
    -   `creatorName` (string): The display name of the user who created the survey.
    -   `questions` (array of objects): The list of questions.

### `POST /analyses/{analysisId}/responses`

**(Public)** Submits a friend's answers to an analysis.

-   **Request Body:**
    -   `answers` (object): A key-value map of question IDs to answers.
-   **Success Response (201 Created):**
    -   Confirms that the response was successfully recorded.

---

## 4. Personas

### `POST /personas/generate`

Initiates the asynchronous generation of the user's Persona from their completed analysis.

-   **Authentication:** Required.
-   **Success Response (202 Accepted):**
    -   An empty body, indicating the process has started. The client must poll `GET /personas/me` for status.

### `GET /personas/me`

Retrieves the primary Persona for the authenticated user. Used for polling generation status and displaying the final Persona.

-   **Authentication:** Required.
-   **Success Response (200 OK):**
    -   `persona` (object): The full persona data, including `name`, `archetype`, `rarity`, `stats`, and `avatar_url`.
    -   `generation_status` (string): 'generating', 'ready', or 'failed'.

### `POST /personas/me/chat`

Sends a message to the user's Persona.

-   **Authentication:** Required.
-   **Request Body:**
    -   `message` (string, required): The user's message text.
-   **Success Response (200 OK):**
    -   `reply` (string): The AI's response message.

### `GET /personas/me/chat`

Retrieves the chat history for the user's Persona. Supports pagination.

-   **Authentication:** Required.
-   **Query Parameters:**
    -   `limit` (integer, optional, default: 20): Number of messages to return.
    -   `before` (integer, optional): A cursor (message ID) to fetch messages before it.
-   **Success Response (200 OK):**
    -   `messages` (array of objects): The list of chat messages.
    -   `next_cursor` (integer | null): The cursor for the next page.

---

## 5. Social

### `GET /social/profiles/{userId}`

**(Public)** Gets another user's public-facing Persona card.

-   **Success Response (200 OK):**
    -   A simplified Persona object with public-safe information (`name`, `archetype`, `rarity`, `title`, `avatar_url`).

### `GET /social/chemistry`

Generates a "chemistry report" between the authenticated user's Persona and another user's Persona.

-   **Authentication:** Required.
-   **Query Parameters:**
    -   `targetUserId` (string, required): The ID of the other user.
-   **Success Response (200 OK):**
    -   `score` (integer): The chemistry score.
    -   `summary` (string): A brief, fun summary of the relationship dynamic.
