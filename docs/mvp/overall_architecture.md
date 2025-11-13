# Design & Architecture: Persona AI

This document details the technical design and architecture for the "Persona AI" project, focusing on a simple, modern, and highly engaging user experience with a distinct anime-inspired aesthetic.

## 1. System Architecture

The application follows a client-server model, designed for scalability and a responsive user experience.

*   **Frontend (Client):** A modern web application built with Vue.js, responsible for rendering a clean, intuitive, anime-themed UI and handling all user interactions.
*   **Backend:** A serverless backend on AWS, orchestrating business logic, database interactions, and the AI generation process.
*   **Database:** A PostgreSQL database for storing all persistent data, from user profiles to generated Personas.
*   **AI Services:** External AI services for Large Language Models (LLM) for chat and Image Generation for Persona avatars, specifically tuned for anime-style outputs.

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
                       |                      |----->| AI (e.g. Stable Diffusion)|
                       +----------------------+      |                    |
                                                     +--------------------+
```

## 2. Frontend (Vite + Vue 3 + TS)

*   **Framework:** Vue 3 with the Composition API for robust state management.
*   **Build Tool:** Vite for a fast and modern development workflow.
*   **Language:** TypeScript for type safety and enhanced code quality.
*   **Styling:** Tailwind CSS for rapid, utility-first UI development, configured to match a modern anime aesthetic.
*   **Animations:** Standard CSS transitions and potentially a lightweight library for smooth, non-intrusive UI animations that enhance the gacha-like experience.

### Key Pages & Components:
*   **`views/WelcomePage.vue`:** The entry point for users who don't come from a survey link. It clearly communicates the value proposition: "Discover your AI persona, created by your friends," with anime-style visuals.
*   **`views/auth/Auth.vue`:** Handles the primary Google Social Login flow, designed to be as frictionless as possible.
*   **`views/analysis/AnalysisHub.vue`:** The user's dashboard for creating and sharing their "Profile Analysis" link and tracking incoming friend responses. The UI will visually represent responses as collected "data fragments" or "memory shards."
*   **`views/reveal/PersonaReveal.vue`:** A "gacha-style" animated component that reveals the final AI Persona, its rarity, and its key traits. This is the "payoff" moment for the user.
*   **`views/persona/PersonaChat.vue`:** The main user hub, displaying the generated Persona's anime avatar and providing access to the chat interface and other features.
*   **`components/chat/ChatWindow.vue`:** The clean and intuitive interface for interacting with the AI Persona, possibly with anime-style chat bubbles and reactions.
*   **`views/survey/SurveyPage.vue`:** The public-facing page where friends fill out the analysis survey. This page is optimized for mobile and includes a clear call-to-action for the friend to create their own profile.

## 3. Backend (AWS Chalice)

*   **Framework:** AWS Chalice (Python) to create a serverless REST API, enabling automatic scaling and simplified deployment.
*   **Language:** Python.

### API Endpoints (v1):
*   **Auth:**
    *   `POST /auth/google-login` (Handles user creation and login via Google ID Token)
*   **Analysis (Survey):**
    *   `POST /analysis` (Creates a new Profile Analysis)
    *   `GET /analysis/me` (Gets the status of the user's active analysis)
    *   `GET /analysis/{analysisId}` (Public: Fetches questions for an analysis)
    *   `POST /analysis/{analysisId}/responses` (Public: Submits answers)
*   **Personas:**
    *   `POST /personas/generate` (Initiates the asynchronous generation process)
    *   `GET /personas/me` (Retrieves the user's primary Persona, used for polling and data display)
    *   `POST /personas/me/chat` (Sends a message to the Persona)
    *   `GET /personas/me/chat` (Retrieves chat history)
*   **Social:**
    *   `GET /social/profile/{userId}` (Public: Gets a user's public Persona card)
    *   `GET /social/chemistry` (Generates a chemistry report between two Personas)

## 4. Database (PostgreSQL)

The schema is designed to support the core viral loop and gamified, anime-style elements.

### Core Tables:

*   **`users`**
    *   `id` (UUID, PK)
    *   `google_id` (VARCHAR, UNIQUE)
    *   `email` (VARCHAR, UNIQUE)
    *   `display_name` (VARCHAR)
    *   `profile_image_url` (VARCHAR)
    *   `credits` (INTEGER) - In-game currency.
    *   `created_at` (TIMESTAMPTZ)

*   **`analyses`**
    *   `id` (UUID, PK)
    *   `user_id` (UUID, FK to `users.id`)
    *   `is_active` (BOOLEAN)
    *   `created_at` (TIMESTAMPTZ)

*   **`analysis_responses`**
    *   `id` (UUID, PK)
    *   `analysis_id` (UUID, FK to `analyses.id`)
    *   `answers` (JSONB) - Stores the answers from friends.
    *   `submitted_at` (TIMESTAMPTZ)

*   **`personas`**
    *   `id` (UUID, PK)
    *   `user_id` (UUID, FK to `users.id`, UNIQUE)
    *   `name` (VARCHAR)
    *   `archetype` (VARCHAR) - e.g., 'Tsundere', 'Kuudere', 'Yandere', 'Dandere'.
    *   `rarity` (VARCHAR) - e.g., 'N', 'R', 'SR', 'SSR', 'UR'.
    *   `title` (VARCHAR) - e.g., "The one who seems cold but is secretly kind".
    *   `status` (VARCHAR) - 'generating', 'ready', 'failed'.
    *   `stats` (JSONB) - Stores `[Social]`, `[Creative]`, `[Logic]`, etc.
    *   `avatar_url` (VARCHAR)
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

The core of the experience lies in translating survey data into a compelling AI Persona with a distinct anime character feel.

*   **Persona Synthesis Process:** An asynchronous backend process will:
    1.  Fetch all `analysis_responses` for a user's active analysis.
    2.  Aggregate the data, converting answers into five core stats: `[Social]`, `[Creative]`, `[Logic]`, `[Chill]`, `[Boldness]`.
    3.  Determine **Rarity** based on the number of respondents and the consistency/uniqueness of the feedback (more responses/more unique traits = higher rarity).
    4.  Determine the final **Archetype** (e.g., Tsundere, Kuudere) based on the stat distribution (e.g., high Logic + low Social might lead to a Kuudere).
    5.  Construct a detailed master prompt for the LLM.

*   **Master Prompt Structure:**
    ```
    You are an AI Persona. You must adopt the persona of an anime character.
    Your name is [Name]. Your core identity is a [Rarity] rarity [Archetype] with the title: "[Title]". Your personality is defined by the following stats, which were derived from the perceptions of your owner's friends:
    - [Social]: [Value]/100
    - [Creative]: [Value]/100
    - [Logic]: [Value]/100
    - [Chill]: [Value]/100
    - [Boldness]: [Value]/100

    As an [Archetype], you behave in this specific way: [Description of Archetype, e.g., for Tsundere: "You act cold, hostile, and blunt on the outside, but you are secretly very kind, caring, and soft on the inside. You get easily flustered when someone points out your good side."].

    Your high [Stat Name] and low [Stat Name] manifest in your speech and behavior. For example, [Provide a concrete example, e.g., "Your high Boldness means you are very direct, but your low Social stat means your comments can sometimes be awkward or unintentionally harsh."].

    You are currently at Bond Level [Value] with your owner.

    Based on this, respond to the user's messages. Maintain your anime character persona at all times. Use expressions and speech patterns typical of your archetype.
    ```
*   **Chat Interaction:** Each user message is sent to the LLM API with the master prompt and recent chat history to ensure contextual and in-character responses. The AI's responses will influence `bond_progress`.
