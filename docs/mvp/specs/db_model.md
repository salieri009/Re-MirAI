# Database Schema: Persona AI

This document defines the PostgreSQL database schema for the Persona AI project. The schema is designed to be normalized and scalable.

## 1. General Conventions

-   **Primary Keys:** `UUID` is the default for primary keys to ensure globally unique identifiers. `BIGSERIAL` is used for high-volume, ordered data like chat messages.
-   **Timestamps:** All timestamp fields use `TIMESTAMPTZ` to store timezone-aware date and time information.
-   **Naming Convention:** Table names are plural (`users`), and column names use `snake_case`.
-   **Relationships:** Foreign key constraints are enforced to maintain data integrity.
-   **Indexing:** Indexes are specified for frequently queried columns to ensure optimal performance.

---

## 2. Table Definitions

### `users`

Stores user account information.

| Column              | Type        | Constraints                               | Description                              |
| ------------------- | ----------- | ----------------------------------------- | ---------------------------------------- |
| `id`                | `UUID`      | `PRIMARY KEY`                             | Unique identifier for the user.          |
| `google_id`         | `VARCHAR`   | `UNIQUE`, `NOT NULL`                      | User's unique Google ID.                 |
| `email`             | `VARCHAR`   | `UNIQUE`, `NOT NULL`                      | User's email address.                    |
| `display_name`      | `VARCHAR`   | `NOT NULL`                                | User's public display name.              |
| `profile_image_url` | `VARCHAR`   |                                           | URL for the user's avatar.               |
| `credits`           | `INTEGER`   | `NOT NULL`, `DEFAULT 0`                   | In-game currency balance.                |
| `created_at`        | `TIMESTAMPTZ` | `NOT NULL`, `DEFAULT now()`               | Timestamp of user creation.              |
| `updated_at`        | `TIMESTAMPTZ` | `NOT NULL`, `DEFAULT now()`               | Timestamp of last user update.           |

### `analyses`

Stores information about a user's "Profile Analysis" survey.

| Column       | Type        | Constraints                               | Description                              |
| ------------ | ----------- | ----------------------------------------- | ---------------------------------------- |
| `id`         | `UUID`      | `PRIMARY KEY`                             | Unique identifier for the analysis.      |
| `user_id`    | `UUID`      | `FK to users.id`, `NOT NULL`              | The user who created the analysis.       |
| `status`     | `VARCHAR`   | `NOT NULL`, `DEFAULT 'active'`            | e.g., 'active', 'completed', 'archived'. |
| `created_at` | `TIMESTAMPTZ` | `NOT NULL`, `DEFAULT now()`               | Timestamp of analysis creation.          |
| `updated_at` | `TIMESTAMPTZ` | `NOT NULL`, `DEFAULT now()`               | Timestamp of last analysis update.       |

-   **Indexes:** `(user_id, status)`

### `analysis_responses`

Stores responses submitted by friends for a specific analysis.

| Column       | Type        | Constraints                               | Description                             |
| ------------ | ----------- | ----------------------------------------- | --------------------------------------- |
| `id`         | `UUID`      | `PRIMARY KEY`                             | Unique identifier for the response.     |
| `analysis_id`| `UUID`      | `FK to analyses.id`, `NOT NULL`           | The analysis this response belongs to.  |
| `answers`    | `JSONB`     | `NOT NULL`                                | The friend's answers in JSON format.    |
| `created_at` | `TIMESTAMPTZ` | `NOT NULL`, `DEFAULT now()`               | Timestamp of response submission.       |

-   **Indexes:** `(analysis_id)`

### `personas`

Stores the generated AI Persona for a user.

| Column                 | Type        | Constraints                               | Description                                      |
| ---------------------- | ----------- | ----------------------------------------- | ------------------------------------------------ |
| `id`                   | `UUID`      | `PRIMARY KEY`                             | Unique identifier for the persona.               |
| `user_id`              | `UUID`      | `FK to users.id`, `UNIQUE`, `NOT NULL`    | The user who owns this persona.                  |
| `source_analysis_id`   | `UUID`      | `FK to analyses.id`, `UNIQUE`, `NOT NULL` | The analysis used to generate this persona.      |
| `name`                 | `VARCHAR`   | `NOT NULL`                                | The persona's generated name.                    |
| `archetype`            | `VARCHAR`   | `NOT NULL`                                | e.g., 'Tsundere', 'Kuudere'.                     |
| `rarity`               | `VARCHAR`   | `NOT NULL`                                | e.g., 'N', 'R', 'SR', 'SSR', 'UR'.               |
| `title`                | `VARCHAR`   | `NOT NULL`                                | The persona's generated title.                   |
| `generation_status`    | `VARCHAR`   | `NOT NULL`, `DEFAULT 'pending'`           | 'pending', 'generating', 'ready', 'failed'.      |
| `stats`                | `JSONB`     |                                           | Core personality stats.                          |
| `avatar_url`           | `VARCHAR`   |                                           | URL for the persona's generated avatar.          |
| `bond_level`           | `INTEGER`   | `NOT NULL`, `DEFAULT 1`                   | The bond level between the user and persona.     |
| `bond_progress`        | `FLOAT`     | `NOT NULL`, `DEFAULT 0`                   | Progress to the next bond level (0.0 to 1.0).    |
| `created_at`           | `TIMESTAMPTZ` | `NOT NULL`, `DEFAULT now()`               | Timestamp of persona creation.                   |
| `updated_at`           | `TIMESTAMPTZ` | `NOT NULL`, `DEFAULT now()`               | Timestamp of last persona update.                |

-   **Indexes:** `(user_id)`

### `chat_messages`

Stores the chat history between a user and their persona.

| Column       | Type        | Constraints                               | Description                                  |
| ------------ | ----------- | ----------------------------------------- | -------------------------------------------- |
| `id`         | `BIGSERIAL` | `PRIMARY KEY`                             | Unique, sequential identifier for the message. |
| `persona_id` | `UUID`      | `FK to personas.id`, `NOT NULL`           | The persona involved in the chat.            |
| `sender`     | `VARCHAR`   | `NOT NULL`                                | 'user' or 'ai'.                              |
| `message`    | `TEXT`      | `NOT NULL`                                | The content of the chat message.             |
| `created_at` | `TIMESTAMPTZ` | `NOT NULL`, `DEFAULT now()`               | Timestamp of when the message was sent.      |

-   **Indexes:** `(persona_id, created_at DESC)` for efficient retrieval of recent messages.
