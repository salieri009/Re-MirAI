# Database Design Specification (Subculture Ver.)

This document details the database schema for the Re:MirAI project, using PostgreSQL, aligned with the latest design documents.

## 1. Schema Overview

The schema is designed to store user information (via Google login), rituals (surveys), responses, and the detailed properties of the summoned AI Personas.

## 2. Table Definitions

*   **`users`**
    *   **Description:** Stores user account information, authenticated via Google.
    *   **Columns:**
        *   `id` (UUID, PRIMARY KEY, default: `gen_random_uuid()`)
        *   `google_id` (VARCHAR(255), NOT NULL, UNIQUE)
        *   `email` (VARCHAR(255), NOT NULL, UNIQUE)
        *   `display_name` (VARCHAR(255), NOT NULL)
        *   `profile_image_url` (VARCHAR(512))
        *   `memory_crystals` (INTEGER, NOT NULL, default: 100)
        *   `created_at` (TIMESTAMPTZ, NOT NULL, default: `now()`)
    *   **Indexes:**
        *   `idx_users_google_id` on (`google_id`)

*   **`rituals`**
    *   **Description:** Represents a "Summoning Ritual" (survey) instance created by a user.
    *   **Columns:**
        *   `id` (UUID, PRIMARY KEY, default: `gen_random_uuid()`)
        *   `user_id` (UUID, NOT NULL, FOREIGN KEY references `users(id)` on delete cascade)
        *   `is_active` (BOOLEAN, NOT NULL, default: `true`)
        *   `created_at` (TIMESTAMPTZ, NOT NULL, default: `now()`)
    *   **Indexes:**
        *   `idx_rituals_user_id` on (`user_id`)

*   **`ritual_responses`**
    *   **Description:** Stores each "perception" (response) submitted for a ritual.
    *   **Columns:**
        *   `id` (UUID, PRIMARY KEY, default: `gen_random_uuid()`)
        *   `ritual_id` (UUID, NOT NULL, FOREIGN KEY references `rituals(id)` on delete cascade)
        *   `responder_id` (VARCHAR(255), NOT NULL) - An anonymous fingerprint/session ID to prevent duplicate submissions.
        *   `answers` (JSONB, NOT NULL) - The actual answers to the survey questions.
        *   `submitted_at` (TIMESTAMPTZ, NOT NULL, default: `now()`)
    *   **Indexes:**
        *   `idx_ritual_responses_ritual_id` on (`ritual_id`)

*   **`personas`**
    *   **Description:** Stores the generated AI Persona for a user.
    *   **Columns:**
        *   `id` (UUID, PRIMARY KEY, default: `gen_random_uuid()`)
        *   `user_id` (UUID, NOT NULL, UNIQUE, FOREIGN KEY references `users(id)` on delete cascade)
        *   `name` (VARCHAR(100), NOT NULL)
        *   `archetype` (VARCHAR(50), NOT NULL)
        *   `rarity` (VARCHAR(10), NOT NULL)
        *   `title` (VARCHAR(255))
        *   `status` (VARCHAR(20), NOT NULL, default: `'summoning'`) -- e.g., 'summoning', 'ready', 'failed'
        *   `stats` (JSONB, NOT NULL)
        *   `illustration_url` (VARCHAR(512))
        *   `bond_level` (INTEGER, NOT NULL, default: 1)
        *   `bond_progress` (FLOAT, NOT NULL, default: 0.0)
        *   `created_at` (TIMESTAMPTZ, NOT NULL, default: `now()`)
        *   `updated_at` (TIMESTAMPTZ, NOT NULL, default: `now()`)
    *   **Indexes:**
        *   `idx_personas_user_id` on (`user_id`)

*   **`chat_history`**
    *   **Description:** Stores the conversation history between a user and their Persona.
    *   **Columns:**
        *   `id` (BIGSERIAL, PRIMARY KEY)
        *   `persona_id` (UUID, NOT NULL, FOREIGN KEY references `personas(id)` on delete cascade)
        *   `sender` (VARCHAR(10), NOT NULL) -- 'user' or 'ai'
        *   `message` (TEXT, NOT NULL)
        *   `timestamp` (TIMESTAMPTZ, NOT NULL, default: `now()`)
    *   **Indexes:**
        *   `idx_chat_history_persona_id_timestamp` on (`persona_id`, `timestamp` DESC)
