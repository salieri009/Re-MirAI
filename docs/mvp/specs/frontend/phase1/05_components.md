# Frontend Spec Phase 1: Component Library

This document specifies the reusable Vue components for the project, divided into `base` (atomic) and `domain` (feature-specific) categories.

## 1. Base Components (`/src/components/base`)
These are generic, style-agnostic UI building blocks.

-   **`BaseButton.vue`**
    -   **Description**: The standard button element.
    -   **Props**:
        -   `variant: 'primary' | 'secondary' | 'danger'`
        -   `size: 'sm' | 'md' | 'lg'`
        -   `disabled: boolean`
        -   `loading: boolean` (shows a spinner)
    -   **Events**: `@click`
    -   **Slots**: `default` (for button text/icon)

-   **`BaseCard.vue`**
    -   **Description**: A styled container for content sections.
    -   **Props**: None.
    -   **Slots**: `default`

-   **`BaseInput.vue`**
    -   **Description**: A styled wrapper for `<input>` and `<textarea>`.
    -   **Props**:
        -   `modelValue: string | number`
        -   `type: 'text' | 'email' | 'textarea'`
        -   `placeholder: string`
        -   `error: string | null` (displays an error message)
    -   **Events**: `@update:modelValue`

-   **`BaseModal.vue`**
    -   **Description**: A modal dialog overlay.
    -   **Props**:
        -   `modelValue: boolean` (controls visibility)
    -   **Events**: `@update:modelValue`
    -   **Slots**: `header`, `body`, `footer`

-   **`BaseSpinner.vue`**
    -   **Description**: A simple loading animation.
    -   **Props**: `size: 'sm' | 'md' | 'lg'`

-   **`BaseNotification.vue`**
    -   **Description**: A toast-like notification.
    -   **Props**: `message: string`, `type: 'success' | 'error'`

## 2. Domain Components (`/src/components/domain`)
These components are specific to a feature or data type of the application.

-   **`auth/GoogleLoginButton.vue`**
    -   **Description**: A button specifically for initiating the Google login flow.
    -   **Composition**: Uses `BaseButton`.
    -   **Logic**: Contains the logic to interact with the Google Auth library and call the `authStore.login` action.

-   **`analysis/ShareLinkCard.vue`**
    -   **Description**: Displays the generated analysis URL for the user to copy and share.
    -   **Composition**: Uses `BaseCard`, `BaseInput` (read-only), and `BaseButton` (for copy action).
    -   **Props**: `url: string`

-   **`analysis/ResponseTracker.vue`**
    -   **Description**: Visually shows the progress of survey responses.
    -   **Props**: `current: number`, `required: number`
    -   **UI**: Could be a progress bar or a collection of "memory shard" icons that fill up.

-   **`persona/PersonaHeader.vue`**
    -   **Description**: Displays the main Persona details (avatar placeholder, name, archetype, rarity).
    -   **Props**: `persona: Persona`

-   **`chat/ChatWindow.vue`**
    -   **Description**: The container for the entire chat history.
    -   **Composition**: Uses a `v-for` to render `chat/ChatMessage` components.
    -   **Props**: `messages: Message[]`

-   **`chat/ChatMessage.vue`**
    -   **Description**: Renders a single chat bubble, styled differently for the user and the AI.
    -   **Props**: `message: Message` (containing text and sender type)

-   **`chat/ChatInput.vue`**
    -   **Description**: The input form for sending a new message.
    -   **Composition**: Uses `BaseInput` and `BaseButton`.
    -   **Events**: `@send(message: string)`

-   **`survey/QuestionCard.vue`**
    -   **Description**: Displays a single question and input for the friend to answer.
    -   **Composition**: Uses `BaseCard` and an appropriate input type (e.g., radio buttons, text area).
    -   **Props**: `question: Question`
    -   **Events**: `@answer({ questionId: string, value: any })`
