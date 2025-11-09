# API Design Specification

This document provides a detailed specification for the REST API of the Persona AI project.

## 1. General Principles

*   All API endpoints are prefixed with `/api/v1`.
*   Authentication is handled via JWT Bearer tokens in the `Authorization` header for protected endpoints.
*   Request and response bodies are in JSON format.
*   Standard HTTP status codes are used (e.g., `200 OK`, `201 Created`, `400 Bad Request`, `401 Unauthorized`, `404 Not Found`).

## 2. Endpoints

### 2.1. Authentication (`/auth`)

*   **`POST /auth/register`**
    *   **Description:** Registers a new user.
    *   **Request Body:**
        ```json
        {
          "username": "string",
          "email": "string (email format)",
          "password": "string (min 8 chars)"
        }
        ```
    *   **Response (201 Created):**
        ```json
        {
          "user_id": "uuid",
          "token": "string (jwt)"
        }
        ```

*   **`POST /auth/login`**
    *   **Description:** Logs in an existing user.
    *   **Request Body:**
        ```json
        {
          "email": "string",
          "password": "string"
        }
        ```
    *   **Response (200 OK):**
        ```json
        {
          "user_id": "uuid",
          "token": "string (jwt)"
        }
        ```

### 2.2. Users (`/users`)

*   **`GET /users/me`**
    *   **Description:** Retrieves the profile of the currently authenticated user.
    *   **Authentication:** Required.
    *   **Response (200 OK):**
        ```json
        {
          "id": "uuid",
          "username": "string",
          "email": "string"
        }
        ```

### 2.3. Surveys (`/surveys`)

*   **`POST /surveys`**
    *   **Description:** Generates a new, unique survey for the authenticated user.
    *   **Authentication:** Required.
    *   **Response (201 Created):**
        ```json
        {
          "survey_id": "uuid",
          "survey_url": "string (full URL)"
        }
        ```

*   **`GET /surveys/{survey_id}`**
    *   **Description:** Fetches the questions for a specific survey. This is a public endpoint for friends to access.
    *   **Response (200 OK):**
        ```json
        {
          "survey_id": "uuid",
          "questions": [
            { "id": "q1", "text": "...", "type": "multiple-choice", "options": [...] },
            { "id": "q2", "text": "...", "type": "text" }
          ]
        }
        ```

*   **`POST /surveys/{survey_id}/responses`**
    *   **Description:** Submits a set of answers for a survey.
    *   **Request Body:**
        ```json
        {
          "answers": {
            "q1": "option_a",
            "q2": "Some text answer."
          }
        }
        ```
    *   **Response (201 Created):**
        ```json
        {
          "status": "success",
          "message": "Response submitted successfully."
        }
        ```

### 2.4. Personas (`/personas`)

*   **`GET /personas/me`**
    *   **Description:** Retrieves the authenticated user's generated AI persona. If the persona has not been generated yet, it triggers the synthesis process. The initial response may indicate that the persona is being generated.
    *   **Authentication:** Required.
    *   **Response (200 OK):**
        ```json
        {
          "persona_id": "uuid",
          "status": "ready | generating",
          "persona_prompt": "string (The full prompt for the LLM)",
          "illustration_url": "string (URL)",
          "chat_history": [
            { "sender": "user", "message": "Hello" },
            { "sender": "ai", "message": "Hi there!" }
          ]
        }
        ```

*   **`POST /personas/me/chat`**
    *   **Description:** Sends a message to the user's persona and gets a response.
    *   **Authentication:** Required.
    *   **Request Body:**
        ```json
        {
          "message": "string"
        }
        ```
    *   **Response (200 OK):**
        ```json
        {
          "response": "string (AI's reply)"
        }
        ```
