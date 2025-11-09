# Database Design Specification

This document details the database schema for the Persona AI project, using PostgreSQL.

## 1. Schema Overview

The schema is designed to store user information, surveys, responses, and the resulting AI personas.

## 2. Table Definitions

*   **`users`**
    *   **Description:** Stores user account information.
    *   **Columns:**
        *   `id` (UUID, PRIMARY KEY, default: `gen_random_uuid()`)
        *   `username` (VARCHAR(50), NOT NULL, UNIQUE)
        *   `email` (VARCHAR(255), NOT NULL, UNIQUE)
        *   `password_hash` (VARCHAR(255), NOT NULL)
        *   `created_at` (TIMESTAMPTZ, NOT NULL, default: `now()`)
    *   **Indexes:**
        *   `idx_users_email` on (`email`)

*   **`surveys`**
    *   **Description:** Represents a survey instance created by a user.
    *   **Columns:**
        *   `id` (UUID, PRIMARY KEY, default: `gen_random_uuid()`)
        *   `user_id` (UUID, NOT NULL, FOREIGN KEY references `users(id)` on delete cascade)
        *   `is_active` (BOOLEAN, NOT NULL, default: `true`)
        *   `created_at` (TIMESTAMPTZ, NOT NULL, default: `now()`)
    *   **Indexes:**
        *   `idx_surveys_user_id` on (`user_id`)

*   **`survey_responses`**
    *   **Description:** Stores each anonymous response submitted for a survey.
    *   **Columns:**
        *   `id` (UUID, PRIMARY KEY, default: `gen_random_uuid()`)
        *   `survey_id` (UUID, NOT NULL, FOREIGN KEY references `surveys(id)` on delete cascade)
        *   `responder_id` (VARCHAR(255), NOT NULL) - An anonymous fingerprint/session ID to prevent duplicate submissions.
        *   `answers` (JSONB, NOT NULL) - The actual answers to the survey questions.
        *   `submitted_at` (TIMESTAMPTZ, NOT NULL, default: `now()`)
    *   **Indexes:**
        *   `idx_survey_responses_survey_id` on (`survey_id`)

*   **`personas`**
    *   **Description:** Stores the generated AI persona for a user.
    *   **Columns:**
        *   `id` (UUID, PRIMARY KEY, default: `gen_random_uuid()`)
        *   `user_id` (UUID, NOT NULL, UNIQUE, FOREIGN KEY references `users(id)` on delete cascade)
        *   `persona_prompt` (TEXT, NOT NULL) - The master prompt for the LLM.
        *   `illustration_url` (VARCHAR(512))
        *   `status` (VARCHAR(20), NOT NULL, default: `'generating'`) -- e.g., 'generating', 'ready', 'failed'
        *   `created_at` (TIMESTAMPTZ, NOT NULL, default: `now()`)
        *   `updated_at` (TIMESTAMPTZ, NOT NULL, default: `now()`)
    *   **Indexes:**
        *   `idx_personas_user_id` on (`user_id`)

*   **`chat_history`**
    *   **Description:** Stores the conversation history between a user and their persona.
    *   **Columns:**
        *   `id` (BIGSERIAL, PRIMARY KEY)
        *   `persona_id` (UUID, NOT NULL, FOREIGN KEY references `personas(id)` on delete cascade)
        *   `sender` (VARCHAR(10), NOT NULL) -- 'user' or 'ai'
        *   `message` (TEXT, NOT NULL)
        *   `timestamp` (TIMESTAMPTZ, NOT NULL, default: `now()`)
    *   **Indexes:**
        *   `idx_chat_history_persona_id` on (`persona_id`)
