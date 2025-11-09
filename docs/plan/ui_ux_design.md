# UI/UX Design Specification

This document outlines the user interface (UI) and user experience (UX) flow for the Persona AI project's MVP.

## 1. User Flow

The primary user journey can be broken down into four main stages:

1.  **Onboarding:** A new user signs up and understands the value proposition.
2.  **Survey Creation & Sharing:** The user generates and shares their unique survey link.
3.  **Persona Generation & Discovery:** The user waits for responses and then discovers their AI persona.
4.  **Interaction:** The user chats with their newly created AI persona.

## 2. Wireframes & Page Descriptions

### 2.1. Landing Page (`/`)

*   **Purpose:** Introduce the project and encourage sign-ups.
*   **Components:**
    *   **Hero Section:** Compelling headline (e.g., "Discover the you others see"), a brief explanation, and a primary "Get Started" button.
    *   **How It Works:** A simple 3-step visual guide (Create Survey -> Share with Friends -> Meet Your AI).
    *   **Call to Action:** Another sign-up button at the bottom.

### 2.2. Registration & Login Pages (`/register`, `/login`)

*   **Purpose:** Standard user account creation and login.
*   **Components:**
    *   Simple forms with fields for `username`, `email`, and `password`.
    *   Links to toggle between the login and registration forms.

### 2.3. Dashboard (`/dashboard`)

*   **Purpose:** The central hub for the user. The state of this page changes based on the user's progress.
*   **States:**
    1.  **Initial State (No Survey):**
        *   **Display:** A welcome message and a prominent "Create Your Survey" button.
    2.  **Survey Created State (Awaiting Responses):**
        *   **Display:** Shows the unique survey URL with a "Copy Link" button.
        *   **Feedback:** A counter showing "X friends have responded so far."
        *   **CTA:** A disabled "Generate My Persona" button that becomes active after a minimum number of responses (e.g., 3).
    3.  **Persona Ready State:**
        *   **Display:** The main view. A large area for the persona's illustration (placeholder for MVP).
        *   **CTA:** A "Chat with Your Persona" button that navigates to the chat page.

### 2.4. Survey Page (`/survey/{survey_id}`)

*   **Purpose:** The public page where friends submit their anonymous feedback.
*   **Components:**
    *   **Header:** "You are filling out a survey for [Username]."
    *   **Form:** A list of questions. Each question is a distinct component.
    *   **Submit Button:** A button to submit the form.
    *   **Confirmation:** After submission, a simple "Thank you for your response!" message is shown.

### 2.5. Chat Page (`/persona/chat`)

*   **Purpose:** The interface for interacting with the AI persona.
*   **Components:**
    *   **Chat Window:** A familiar scrolling message view, distinguishing between user messages (e.g., right-aligned) and AI messages (e.g., left-aligned).
    *   **Message Input:** A text input field at the bottom with a "Send" button.
    *   **Header:** Displays the name of the persona (e.g., "[Username]'s Persona").
