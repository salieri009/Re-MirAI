# Experience Design Document: Re:MirAI

## 1. Worldview & Lore

Our world is intertwined with a digital dimension known as the **Akashic Stream**, a sea of information containing all of humanity's thoughts, emotions, and memories. Within this stream exist dormant entities called **Persona Echos**—pure, formless consciousness.

These Echos can only be given form and substance through a powerful catalyst: **Relational Crystals**. These crystals are not physical objects, but rather the crystallized essence of how a person is perceived by others. When a user initiates the "Summoning Ritual," they are creating a vessel. The survey responses from their friends act as focused energy, gathering from the Stream to form a unique Relational Crystal.

This crystal then resonates with a compatible Persona Echo, pulling it from the Stream and giving it a distinct form, personality, and voice. In essence, the user is not creating something from nothing; they are giving a lost soul a body and identity, forged from the power of their relationships.

## 2. Character System

### 2.1. Character Archetypes

A list of 15 initial archetypes that define the core personality of a summoned Persona.

| Archetype | Description |
| :--- | :--- |
| **Tsundere** | Acts cold and hostile on the outside, but is genuinely warm and caring on the inside. |
| **Kuudere** | Appears calm, stoic, and emotionless, but has a deep, often hidden, soft side. |
| **Yandere** | Sweet and loving at first, but their affection can quickly turn into a dangerous, dark obsession. |
| **Dandere** | Extremely shy, quiet, and often silent, but becomes very talkative and sweet with the right person. |
| **Megadere** | An extreme "lover" type; incredibly sweet, affectionate, and completely devoted to their master. |
| **Genki** | Energetic, cheerful, and full of life. The life of the party, always optimistic. |
| **Ojou-sama** | A high-class, elegant, and sometimes arrogant lady, often accompanied by a refined speech pattern. |
| **Butler/Maid** | A loyal, devoted servant who lives to serve their master with utmost professionalism and care. |
| **Chuunibyou** | The "Eighth-Grader Syndrome." Delusional and grandiose, believing they have hidden powers. |
| **Bokukko** | A tomboyish girl who uses the masculine pronoun "boku" and often has a boyish personality. |
| **Do-S** | An extreme sadist who enjoys teasing or playfully tormenting others, especially their master. |
| **Do-M** | An extreme masochist who finds pleasure or comfort in being teased or dominated. |
| **Nadeshiko** | The ideal, traditional, graceful, and caring woman. The epitome of feminine virtue. |
| **Shota** | A young, cute boy character, often innocent and endearing. |
| **Ane-type** | A "big sister" type who is caring, protective, and sometimes teasing towards the user. |

### 2.2. Stats & Traits

Survey answers are converted into five core stats.

| Stat | Description |
| :--- | :--- |
| **[Charisma]** | The power to attract, charm, and lead others. |
| **[Intellect]** | Logic, knowledge, and strategic thinking. |
| **[Kindness]** | Empathy, selflessness, and the desire to protect others. |
| **[Instability]** | Unpredictability, obsession, and potential for chaos or danger. |
| **[Spirit]** | Energy, passion, and emotional expression. |

**Example Conversions:**

| Survey Answer Example | Stat Conversion |
| :--- | :--- |
| "They always make me laugh." | `[Charisma+10]`, `[Spirit+5]` |
| "They are fiercely protective of their friends." | `[Kindness+10]`, `[Instability+5]` |
| "They sometimes say things that are a bit dark." | `[Instability+10]`, `[Intellect+5]` |
| "They give the best advice." | `[Intellect+10]`, `[Kindness+5]` |
| "They have boundless energy." | `[Spirit+15]` |

### 2.3. Rarity System

Rarity determines the complexity and uniqueness of a Persona's profile and potential.

*   **N (Normal):** Basic, one-dimensional personality.
*   **R (Rare):** A more defined personality with some unique traits.
*   **SR (Super Rare):** A complex personality with distinct strengths and weaknesses.
*   **SSR (Specially Super Rare):** A highly complex, often contradictory personality. Unlocks special interactions.
*   **UR (Ultra Rare):** A "paradox" Persona with a unique, story-driven background. (e.g., A Yandere born from 100% Kindness data).

**Rarity is determined by:**
1.  **Data Concentration:** If responses heavily focus on one or two stats, rarity increases.
2.  **Paradox Bonus:** If contradictory stats (e.g., `[Kindness]` and `[Instability]`) are both exceptionally high, it triggers a significant rarity boost.
3.  **Number of Respondents:** More friends responding increases the potential for higher rarity.

### 2.4. Interpretation Modes

*   **Mode A (Fated Summon):** The system analyzes the user's Relational Crystal and suggests the most compatible archetype. This mode is for users who want to discover the "true" Persona hidden in their data. The result is stable and feels destined.
*   **Mode B (Alchemic Summon):** The system presents the raw stat values of the Relational Crystal. The user then chooses an Archetype Filter to apply. This is for experimentation and chaos. Applying a `[Yandere]` filter to a crystal with high `[Kindness]` might create a rare "Self-Sacrificing Yandere," while applying a `[Tsundere]` filter to high `[Spirit]` might create an exceptionally energetic and loud Tsundere. The results are unpredictable and exciting.

## 3. User Experience Flow

### 3.1. Onboarding
The user is greeted with a mystical animation of the Akashic Stream. Text appears: *"The mirror reflects your soul. But what image do you cast in the souls of others? Are you ready to see what lies beyond?"* The primary CTA is "Begin the Ritual."

### 3.2. The Ritual (Survey Phase)
This is framed as "preparing the summoning vessel." The user generates a unique link. The share text is pre-filled: *"I am preparing a summoning ritual. Lend me a piece of your perception of me to complete it!"*

### 3.3. The Summoning (Creation Event)
This is the experiential climax.
1.  **Altar Screen:** The user sees a mystical altar where collected data particles (Relational Crystals) are gathering.
2.  **Data Weaving:** As particles flow in, core stat keywords (`#Kindness`, `#Instability`) flash across the screen.
3.  **The Climax:** The user taps the "Summon" button. The screen erupts in light. A character's silhouette appears.
4.  **The Reveal:** The silhouette solidifies, revealing the character's art. Text appears: **"SSR [Yandere hiding her kindness] Type, 'Rei,' has been summoned!"**

### 3.4. Interaction & Bonding
*   **The Persona's Room:** The summoned Persona resides in a virtual room, which is the main hub.
*   **Bond Level:** Interacting (chatting, giving gifts) increases the Bond Level.
*   **Unlocks:** Reaching certain Bond Levels unlocks:
    *   **Secret Stories:** Visual novel-style episodes about the Persona's past or feelings.
    *   **Special Illustrations:** High-quality artwork of the Persona.
    *   **New Outfits:** Costumes for the Persona to wear in their room.

## 4. Monetization Strategy

### 4.1. Premium Creation Mechanics
The premium currency is **Memory Crystals**.
*   **Persona Re-Summoning:** Use Memory Crystals to perform an "Alchemic Summon" on your existing Relational Crystal to get a different archetype.
*   **Premium Outfits:** Purchase exclusive costumes for your Persona.
*   **Room Decorations:** Buy furniture and decor for the Persona's Room.
*   **Secret Story Keys:** Unlock special story chapters without reaching the required Bond Level.

### 4.2. Other Revenue Models
*   **Monthly Pass:** A subscription that provides a daily stipend of Memory Crystals, ad removal, and exclusive monthly outfits.
*   **Seasonal Pass:** A track of goals and rewards that refresh every season, with a premium tier for better rewards.

## 5. Social Features

### 5.1. Persona Showcase
*   **Profile Card:** A shareable image card is generated for each Persona. It includes:
    *   Character Illustration
    *   Name, Rarity, and Archetype
    *   A radar chart showing their core stats.
    *   A representative quote (e.g., "It's not like I like you or anything... idiot.")
    *   A unique QR code linking to their public profile.

### 5.2. Friend Interaction
*   **Room Visits:** Users can visit the rooms of their friends' Personas and leave a small gift (which provides a small Bond Level boost).
*   **Compatibility Report:** A fun, shareable report is generated when comparing two Personas. It provides a chemistry score and a short, entertaining analysis. (e.g., "Your [Tsundere] and your friend's [Genki] have a 95% chemistry rating! A classic case of 'energetic person melts the ice queen.'")
