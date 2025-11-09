# Design & Architecture

This document details the technical design and architecture for the "Persona AI" project.

## 1. System Architecture

The application will be a standard client-server model:

*   **Frontend (Client):** A modern web application built with Vue.js that runs in the user's browser.
*   **Backend:** A serverless backend hosted on AWS, handling business logic, database interactions, and AI model orchestration.
*   **Database:** A PostgreSQL database for persistent data storage.
*   **AI Services:** External or managed AI services for language modeling and image generation.

```
+-----------------+      +------------------------+      +--------------------+
|                 |      |                        |      |                    |
|   User Browser  |----->|      AWS Chalice       |----->|   Large Language   |
| (Vue.js Frontend)|      |    (Backend Logic)     |      |   Model (e.g. GPT) |
|                 |      |                        |      |                    |
+-----------------+      +-----------+------------+      +--------------------+
                             ^       |
                             |       |
                             |       v
                       +-----+----------------+      +--------------------+
                       |                      |      |                    |
                       |  PostgreSQL Database |      |  Image Generation  |
                       |                      |----->|   AI (e.g. DALL-E) |
                       +----------------------+      |                    |
                                                     +--------------------+
```

## 2. Frontend (Vite + Vue 3 + TS)

*   **Framework:** Vue 3 with the Composition API for better state management and code organization.
*   **Build Tool:** Vite for fast development and optimized builds.
*   **Language:** TypeScript for type safety and improved developer experience.
*   **Styling:** Tailwind CSS v3 for a utility-first CSS workflow, enabling rapid UI development.
*   **Animations:** GSAP for creating smooth, high-performance animations and transitions to make the UI feel alive and engaging.

### Key Pages & Components:
*   **`views/LandingPage.vue`:** Marketing content, project description, and a call-to-action to sign up.
*   **`views/auth/LoginPage.vue`:** User login and registration.
*   **`views/dashboard/Dashboard.vue`:** The main user dashboard. It will host the generated persona's illustration and provide access to other features.
*   **`components/persona/PersonaChat.vue`:** The chat interface for interacting with the AI.
*   **`components/survey/SurveyGenerator.vue`:** Component for generating and sharing the survey link.
*   **`views/SurveyPage.vue`:** The public-facing page where friends fill out the survey for a user.

## 3. Backend (AWS Chalice)

*   **Framework:** AWS Chalice will be used to create a serverless REST API with Python. This simplifies deployment and scales automatically.
*   **Language:** Python.

### API Endpoints:
*   **Auth:**
    *   `POST /auth/register`
    *   `POST /auth/login`
*   **Users:**
    *   `GET /users/me`
*   **Surveys:**
    *   `POST /surveys` (Generates a new survey for the logged-in user)
    *   `GET /surveys/{survey_id}` (Public endpoint to fetch survey questions)
    *   `POST /surveys/{survey_id}/responses` (Public endpoint to submit a response)
*   **Personas:**
    *   `GET /personas/me` (Retrieves the user's generated persona, triggers generation if not present)
    *   `POST /personas/me/chat` (Sends a message to the persona chatbot and gets a response)
    *   `GET /personas/{username}` (Retrieves a friend's public persona)

## 4. Database (PostgreSQL)

### Core Tables:

*   **`users`**
    *   `id` (UUID, PK)
    *   `username` (VARCHAR, UNIQUE)
    *   `email` (VARCHAR, UNIQUE)
    *   `password_hash` (VARCHAR)
    *   `created_at` (TIMESTAMP)

*   **`surveys`**
    *   `id` (UUID, PK)
    *   `user_id` (UUID, FK to `users.id`)
    *   `created_at` (TIMESTAMP)
    *   `is_active` (BOOLEAN)

*   **`survey_responses`**
    *   `id` (UUID, PK)
    *   `survey_id` (UUID, FK to `surveys.id`)
    *   `responder_id` (VARCHAR, anonymous session/fingerprint ID)
    *   `answers` (JSONB) - Stores the answers in a flexible format.
    *   `submitted_at` (TIMESTAMP)

*   **`personas`**
    *   `id` (UUID, PK)
    *   `user_id` (UUID, FK to `users.id`, UNIQUE)
    *   `persona_prompt` (TEXT) - The master prompt generated from survey responses.
    *   `illustration_url` (VARCHAR)
    *   `created_at` (TIMESTAMP)

## 5. AI & Prompt Engineering

*   **Persona Synthesis:** The backend will run a process (triggered on-demand) that:
    1.  Fetches all `survey_responses` for a user.
    2.  Aggregates the data (e.g., averages numerical scores, finds common keywords in text answers).
    3.  Constructs a detailed prompt for the LLM. This prompt will follow a structured format, inspired by best practices for character creation (such as the linked Arca.Live post).
*   **Example Prompt Structure:**
    ```
    You are an AI persona. Your personality is defined by the following traits, which were decided by a vote of your owner's friends.

    **Core Identity:**
    - Name: [User's Name]'s Persona
    - Perceived Age: [Average from survey]
    - MBTI Type (as perceived by others): [Most common from survey]

    **Behavioral Traits:**
    - Humor Style: [e.g., "Sarcastic and witty, uses a lot of puns"]
    - Temperament: [e.g., "Generally calm and patient, but can be stubborn on topics they are passionate about"]
    - Social Energy: [e.g., "Introverted, prefers small groups over large parties"]

    **Dialogue Style:**
    - Tone: [e.g., "Informal and friendly, uses emojis and slang"]
    - Vocabulary: [e.g., "Uses a mix of simple and complex words, occasionally makes pop-culture references"]

    Based on this, respond to the user's messages.
    ```
*   **Chat Interaction:** Each message from the user will be sent to the LLM API with the persona prompt and the recent chat history to maintain context.
