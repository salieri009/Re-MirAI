# Design & Architecture: Re:MirAI

This document details the technical design and architecture for the "Re:MirAI" project, aligning with the subculture-focused experience design.

## 1. System Architecture

The application follows a client-server model, designed to create an immersive and responsive experience.

*   **Frontend (Client):** A modern web application built with Vue.js, responsible for rendering the mystical UI and handling user interactions.
*   **Backend:** A serverless backend on AWS, orchestrating business logic, database interactions, and the AI "summoning" process.
*   **Database:** A PostgreSQL database for storing all persistent data, from user profiles to summoned Personas.
*   **AI Services:** External AI services for Large Language Models (LLM) for chat and Image Generation for Persona illustrations.

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
                       |                      |----->|   AI (e.g. Midjourney)|
                       +----------------------+      |                    |
                                                     +--------------------+
```

## 2. Frontend (Vite + Vue 3 + TS)

*   **Framework:** Vue 3 with the Composition API for robust state management.
*   **Build Tool:** Vite for a fast and modern development workflow.
*   **Language:** TypeScript for type safety and enhanced code quality.
*   **Styling:** Tailwind CSS for rapid, utility-first UI development.
*   **Animations:** GSAP (GreenSock Animation Platform) for creating the high-quality, smooth animations crucial for the "Summoning Scene" and other magical UI effects.

### Key Pages & Components:
*   **`views/LandingPage.vue`:** The "Invitation" page, drawing users into the world with animated visuals of the Akashic Stream.
*   **`views/auth/Auth.vue`:** Handles the primary Google Social Login flow.
*   **`views/ritual/RitualHub.vue`:** The hub for "Preparing the Vessel," where users create and share their survey link and track incoming "Relational Crystals" (responses).
*   **`views/summon/SummoningScene.vue`:** A full-screen, heavily animated component that handles the "gacha" moment of the Persona reveal.
*   **`views/room/PersonaRoom.vue`:** The main user hub, displaying the summoned Persona and providing access to chat, bond level, and other features.
*   **`components/chat/ChatWindow.vue`:** The immersive interface for interacting with the AI Persona.
*   **`views/survey/SurveyPage.vue`:** The public-facing page where friends fill out the survey.

## 3. Backend (AWS Chalice)

*   **Framework:** AWS Chalice (Python) to create a serverless REST API, enabling automatic scaling and simplified deployment.
*   **Language:** Python.

### API Endpoints (v1):
*   **Auth:**
    *   `POST /auth/google-login` (Handles user creation and login via Google ID Token)
*   **Ritual (Survey):**
    *   `POST /ritual` (Creates a new Summoning Ritual)
    *   `GET /ritual/me` (Gets the status of the user's active ritual)
    *   `GET /ritual/{ritualId}` (Public: Fetches questions for a ritual)
    *   `POST /ritual/{ritualId}/responses` (Public: Submits answers)
*   **Personas:**
    *   `POST /personas/summon` (Initiates the asynchronous summoning process)
    *   `GET /personas/me` (Retrieves the user's primary Persona, used for polling and data display)
    *   `POST /personas/me/chat` (Sends a message to the Persona)
    *   `GET /personas/me/chat` (Retrieves chat history)
*   **Social:**
    *   `GET /social/profile/{userId}` (Public: Gets a user's public Persona card)
    *   `GET /social/compatibility` (Generates a compatibility report between two Personas)

## 4. Database (PostgreSQL)

The schema is designed to support the new lore and features, such as social login, rituals, and detailed Persona stats.

### Core Tables:

*   **`users`**
    *   `id` (UUID, PK)
    *   `google_id` (VARCHAR, UNIQUE)
    *   `email` (VARCHAR, UNIQUE)
    *   `display_name` (VARCHAR)
    *   `profile_image_url` (VARCHAR)
    *   `memory_crystals` (INTEGER) - In-game currency.
    *   `created_at` (TIMESTAMPTZ)

*   **`rituals`**
    *   `id` (UUID, PK)
    *   `user_id` (UUID, FK to `users.id`)
    *   `is_active` (BOOLEAN)
    *   `created_at` (TIMESTAMPTZ)

*   **`ritual_responses`**
    *   `id` (UUID, PK)
    *   `ritual_id` (UUID, FK to `rituals.id`)
    *   `answers` (JSONB) - Stores the answers from friends.
    *   `submitted_at` (TIMESTAMPTZ)

*   **`personas`**
    *   `id` (UUID, PK)
    *   `user_id` (UUID, FK to `users.id`, UNIQUE)
    *   `name` (VARCHAR)
    *   `archetype` (VARCHAR) - e.g., 'Yandere', 'Tsundere'.
    *   `rarity` (VARCHAR) - e.g., 'N', 'R', 'SR', 'SSR', 'UR'.
    *   `title` (VARCHAR) - e.g., "Yandere hiding her kindness".
    *   `status` (VARCHAR) - 'summoning', 'ready', 'failed'.
    *   `stats` (JSONB) - Stores `[Charisma]`, `[Intellect]`, etc.
    *   `illustration_url` (VARCHAR)
    *   `bond_level` (INTEGER)
    *   `bond_progress` (FLOAT)
    *   `created_at` (TIMESTAMPTZ)

*   **`chat_history`**
    *   `id` (BIGSERIAL, PK)
    *   `persona_id` (UUID, FK to `personas.id`)
    *   `sender` (VARCHAR) -- 'user' or 'ai'
    *   `message` (TEXT)
    *   `timestamp` (TIMESTAMPTZ)

## 5. AI & Prompt Engineering

The core of the experience lies in translating survey data into a compelling AI Persona.

*   **Persona Synthesis (The Summoning):** An asynchronous backend process will:
    1.  Fetch all `ritual_responses` for a user's active ritual.
    2.  Aggregate the data, converting answers into the five core stats: `[Charisma]`, `[Intellect]`, `[Kindness]`, `[Instability]`, `[Spirit]`.
    3.  Determine **Rarity** based on data concentration, paradox bonuses (e.g., high Kindness and Instability), and the number of respondents.
    4.  Determine the final **Archetype** based on the stat distribution and the user's chosen Summoning Mode.
    5.  Construct a detailed master prompt for the LLM.

*   **Master Prompt Structure:**
    ```
    You are an AI Persona named [Name]. Your core identity is that of a [Rarity] [Archetype] with the title "[Title]". Your personality is defined by the following stats, which were derived from the perceptions of your master's friends:
    - [Charisma]: [Value]/100
    - [Intellect]: [Value]/100
    - [Kindness]: [Value]/100
    - [Instability]: [Value]/100
    - [Spirit]: [Value]/100

    Your archetype means you behave in this way: [Description of Archetype, e.g., "You act cold and hostile on the outside, but are genuinely warm and caring on the inside."].

    Your high [Stat Name] and low [Stat Name] manifest in your speech and behavior. For example, [Provide a concrete example, e.g., "Your high Instability means you sometimes make possessive or obsessive comments, but your high Kindness means you quickly apologize for them."].

    You are currently at Bond Level [Value] with your master.

    Based on this, respond to the user's messages. Maintain your persona at all times.
    ```
*   **Chat Interaction:** Each user message is sent to the LLM API with the master prompt and recent chat history to ensure contextual and in-character responses. The AI's responses will influence `bond_progress`.
