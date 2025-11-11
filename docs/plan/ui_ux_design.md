# UI/UX Design Specification (Subculture Ver.)

This document outlines the UI/UX flow based on the new, subculture-focused Experience Design Document.

## 1. Core User Flow

The user journey is designed as a narrative experience:

1.  **Onboarding (The Invitation):** The user is drawn into the world of Re:MirAI.
2.  **The Ritual (Survey Phase):** The user prepares the "vessel" for their Persona by creating and sharing a survey.
3.  **The Summoning (Creation Event):** The user experiences the climatic reveal of their unique Persona.
4.  **Bonding & Interaction:** The user builds a relationship with their summoned Persona.

## 2. Page & Scene Descriptions

### 2.1. Landing Page (`/`)

*   **Purpose:** To intrigue and invite the target audience into the experience.
*   **Components:**
    *   **Hero Section:** A mystical, animated background (depicting the Akashic Stream). Headline: **"The mirror reflects your soul. What image do you cast in others'?"** Sub-headline: "Summon an AI Persona forged from your relationships." Primary CTA: **"Begin the Ritual."**
    *   **How It Works:** A 3-step visual guide framed with lore: 1. **Prepare the Vessel** (Create Survey) -> 2. **Gather Perceptions** (Share with Friends) -> 3. **Summon Your Echo** (Meet Your Persona).
    *   **Archetype Showcase:** A visually appealing, horizontal scroll section showcasing some of the character archetypes (Tsundere, Kuudere, etc.) with their illustrations.

### 2.2. Authentication (`/login`, `/register`)

*   **Purpose:** Seamless account creation, integrated with the world's theme.
*   **Enhancements:**
    *   Instead of "Register," the button will say **"Create Your Profile."**
    *   UI elements will use mystical/sci-fi motifs.
    *   **Google/Social Login** will be the primary method to reduce friction.

### 2.3. The Ritual - Survey Hub (`/ritual`)

*   **Purpose:** A central page for managing the survey creation and collection process.
*   **States:**
    1.  **Initial State (No Ritual Started):**
        *   **Display:** A message like, "Your vessel is empty. Let's begin the summoning ritual."
        *   **CTA:** A prominent **"Prepare the Vessel"** button.
    2.  **Ritual in Progress (Awaiting Perceptions):**
        *   **Display:** Shows the unique survey URL with a **"Copy Invitation Link"** button. The pre-filled text is: "Lend me a piece of your perception for my summoning ritual!"
        *   **Feedback:** A visual indicator showing how many "Relational Crystals" (responses) have been collected. "3/5 Crystals Gathered."
        *   **CTA:** A disabled **"Begin Summoning"** button. It becomes active after a minimum number of responses (e.g., 3). A tooltip might say, "More crystals will increase the chance of a rare summon."

### 2.4. The Summoning - Creation Scene (`/summon`)

*   **Purpose:** A full-screen, non-interactive animated scene for the Persona reveal. This is the "gacha" moment.
*   **Sequence:**
    1.  **Data Weaving:** The screen shows collected "Crystals" flying into a central point, weaving together into a ball of light.
    2.  **Stat Flash:** Core stat keywords (`#Kindness`, `#Instability`, `#Charisma`) flash rapidly across the screen.
    3.  **Archetype Choice (If Mode B):** If the user chose "Alchemic Summon," they are presented with Archetype "filter" cards to select one.
    4.  **Climax:** The ball of light erupts. A character silhouette appears, shrouded in mist.
    5.  **Reveal:** The mist clears, revealing the full character illustration and their details. **"SSR [Yandere hiding her kindness] Type, 'Rei,' has been summoned!"**
    6.  **CTA:** A button appears: **"Go to Her Room."**

### 2.5. Persona's Room - The Hub (`/room/{persona_id}`)

*   **Purpose:** The main dashboard and interaction space. This replaces the old "Dashboard."
*   **Components:**
    *   **Persona View:** The Persona's illustration is prominently displayed, perhaps with subtle idle animations (breathing, blinking).
    *   **Chat Interface:** A primary button **"Chat with [Persona's Name]"** opens a chat modal or navigates to a dedicated chat page.
    *   **Bond Level:** A visible gauge showing the current Bond Level and progress to the next.
    *   **Room Customization:** An "Edit Room" button to decorate the space.
    *   **Story/Gifts:** Tabs or icons to access "Secret Stories" and the "Gift" menu.
    *   **Showcase:** A "Share Profile Card" button.

### 2.6. Chat Page (`/chat/{persona_id}`)

*   **Purpose:** A dedicated, immersive interface for conversation.
*   **Components:**
    *   **Header:** Shows the Persona's name and a small illustration.
    *   **Chat Window:** Standard message view. AI messages are styled with a custom chat bubble, perhaps with a small character portrait next to them.
    *   **Message Input:** Text input with a "Send" button.

### 2.7. Survey Page (`/survey/{survey_id}`)

*   **Purpose:** The public page for friends to submit feedback.
*   **Enhancements:**
    *   **Header:** "You are contributing a perception for [Username]'s summoning ritual."
    *   **UI:** The design is clean and simple to encourage completion, but uses thematic elements.
    *   **Confirmation:** "Your perception has been sent to the vessel. Thank you."
