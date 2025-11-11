# UI/UX Design Specification (v2 - Enhanced Engagement)

This document outlines the revised UI/UX flow, incorporating solutions for critical engagement flaws in both the "Summoner" and "Contributor" user journeys.

## 1. Core User Flow (Revised)

The user journey is enhanced with feedback loops and immediate engagement points:

1.  **Onboarding (The Invitation):** The user is drawn into the world of Re:MirAI.
2.  **The Ritual (Survey Phase):** The user prepares the "vessel." **Crucially, they can now perform a "Practice Summon" while waiting for friends.**
3.  **The Summoning (Creation Event):** The user experiences the climatic reveal of their unique Persona.
4.  **Bonding & Interaction:** The user builds a relationship with their summoned Persona, **guided by a "First Steps" quest system.**
5.  **(New) The Viral Loop:** Friends ("Contributors") who complete the survey are shown the result and are encouraged to become "Summoners" themselves.

## 2. Page & Scene Descriptions

### 2.1. Landing Page (`/`)
*(No changes to this section, remains as is)*
*   **Purpose:** To intrigue and invite the target audience into the experience.
*   **Components:**
    *   **Hero Section:** A mystical, animated background (depicting the Akashic Stream). Headline: **"The mirror reflects your soul. What image do you cast in others'?"** Sub-headline: "Summon an AI Persona forged from your relationships." Primary CTA: **"Begin the Ritual."**
    *   **How It Works:** A 3-step visual guide framed with lore: 1. **Prepare the Vessel** (Create Survey) -> 2. **Gather Perceptions** (Share with Friends) -> 3. **Summon Your Echo** (Meet Your Persona).
    *   **Archetype Showcase:** A visually appealing, horizontal scroll section showcasing some of the character archetypes (Tsundere, Kuudere, etc.) with their illustrations.

### 2.2. Authentication (`/login`)
*(No changes to this section, remains as is)*
*   **Purpose:** Seamless account creation, integrated with the world's theme.
*   **Enhancements:**
    *   Instead of "Register," the button will say **"Create Your Profile."**
    *   UI elements will use mystical/sci-fi motifs.
    *   **Google/Social Login** will be the primary method to reduce friction.

### 2.3. The Ritual - Survey Hub (`/ritual`)

*   **Purpose:** A central page for managing the survey creation and collection process, now with immediate engagement.
*   **States & Components:**
    1.  **Initial State (No Ritual Started):**
        *   **Display:** "Your vessel is empty. Let's begin the summoning ritual."
        *   **CTA:** A prominent **"Prepare the Vessel"** button.
    2.  **Ritual in Progress (Awaiting Perceptions):**
        *   **Primary Action:** Shows the unique survey URL with a **"Copy Invitation Link"** button. The pre-filled text is: "Lend me a piece of your perception for my summoning ritual!"
        *   **Feedback:** A visual indicator showing "3/5 Crystals Gathered."
        *   **Main CTA:** A disabled **"Begin Summoning"** button. Becomes active after a minimum number of responses.
        *   **[NEW] Engagement Hook (Solves Cold Start):**
            *   A new section appears: **"Impatient? Perform a Practice Summon."**
            *   This leads to a short, self-reflection survey (3-5 questions).
            *   Completing it instantly summons a low-rarity (N or R) "Proto-Persona," giving the user a taste of the core loop and a reason to keep waiting for the "real" summon.

### 2.4. The Summoning - Creation Scene (`/summon`)
*(No changes to this section, remains as is)*
*   **Purpose:** A full-screen, non-interactive animated scene for the Persona reveal. This is the "gacha" moment.
*   **Sequence:**
    1.  **Data Weaving:** The screen shows collected "Crystals" flying into a central point, weaving together into a ball of light.
    2.  **Stat Flash:** Core stat keywords (`#Kindness`, `#Instability`, `#Charisma`) flash rapidly across the screen.
    3.  **Archetype Choice (If Mode B):** If the user chose "Alchemic Summon," they are presented with Archetype "filter" cards to select one.
    4.  **Climax:** The ball of light erupts. A character silhouette appears, shrouded in mist.
    5.  **Reveal:** The mist clears, revealing the full character illustration and their details. **"SSR [Yandere hiding her kindness] Type, 'Rei,' has been summoned!"**
    6.  **CTA:** A button appears: **"Go to Her Room."**

### 2.5. Persona's Room - The Hub (`/room/{persona_id}`)

*   **Purpose:** The main dashboard and interaction space, now with guided goals.
*   **Components:**
    *   **Persona View:** The Persona's illustration is prominently displayed, perhaps with subtle idle animations.
    *   **Chat Interface:** A primary button **"Chat with [Persona's Name]"**.
    *   **Bond Level:** A visible gauge showing Bond Level and progress.
    *   **[NEW] "First Steps" Quest System (Solves Post-Summoning Void):**
        *   A small, non-intrusive UI element shows a list of initial quests.
        *   **Example Quests:**
            *   "Break the Ice: Say 'hello' to your Persona." (Reward: 10 Memory Crystals)
            *   "Show Them Off: Share your new Persona's Profile Card." (Reward: 20 Memory Crystals)
            *   "First Gift: Give your Persona a welcome gift." (Reward: A simple room decoration)
        *   This system guides the user's first actions and provides immediate, rewarding feedback.
    *   **Showcase:** A "Share Profile Card" button.

### 2.6. Chat Page (`/chat/{persona_id}`)
*(No changes to this section, remains as is)*
*   **Purpose:** A dedicated, immersive interface for conversation.
*   **Components:**
    *   **Header:** Shows the Persona's name and a small illustration.
    *   **Chat Window:** Standard message view. AI messages are styled with a custom chat bubble.
    *   **Message Input:** Text input with a "Send" button.

### 2.7. Survey Page (`/survey/{survey_id}`) (Heavily Revised)

*   **Purpose:** A gamified, rewarding micro-experience for friends ("Contributors") to maximize completion and drive viral growth.
*   **Flow & Components:**
    1.  **The Hook (Motivation):**
        *   **Header:** "You are contributing a perception for [Username]'s summoning ritual."
        *   **Teaser:** A prominent message: **"Complete the ritual to see the result!"**
    2.  **The "Pick-a-Card" Game (Gamification):**
        *   Instead of a list of questions, the user is presented with one question at a time.
        *   For each question, they choose between 2-3 visually appealing cards.
        *   **Example:** For "How do they act in a crisis?", the user sees two cards: one depicting a "Calm Strategist" and another a "Passionate Berserker."
    3.  **The Viral Loop (Conversion):**
        *   **Confirmation:** After submitting, the user is NOT shown a simple "Thank you."
        *   Instead, they are taken to a new **Result Teaser Page**.

### 2.8. (New) Result Teaser Page (`/ritual/{ritualId}/result`)

*   **Purpose:** To reward the Contributor and convert them into a new Summoner.
*   **Components:**
    *   **The Reward:** Displays the final, summoned Persona's public Profile Card (illustration, name, archetype, rarity).
    *   **The Hook:** A large, compelling CTA: **"You've helped summon their Persona. Now, it's your turn. Begin your own summoning ritual."**
    *   This button links directly to the landing page, completing the viral loop.
