#set document(
  title: "F-002: Persona Synthesis - Technical Specification",
  author: "Re:MirAI Team",
)

#set page(
  paper: "a4",
  margin: (x: 2cm, y: 2.5cm),
  numbering: "1",
  header: align(right)[
    #text(size: 9pt, fill: gray)[Re:MirAI Technical Specification]
  ],
)

#set text(font: "Arial", size: 11pt, lang: "en")
#set heading(numbering: "1.1")

// Colors
#let prim = rgb("#d946ef")
#let sec = rgb("#3b82f6")
#let succ = rgb("#10b981")
#let warn = rgb("#f59e0b")
#let dang = rgb("#ef4444")
#let gray = rgb("#6b7280")

// Title page
#align(center)[
  #v(2cm)
  #text(size: 24pt, weight: "bold", fill: prim)[Feature Specification]
  #v(0.5cm)
  #text(size: 32pt, weight: "bold")[F-002: Persona Synthesis]
  #v(1cm)
  #text(size: 14pt, fill: gray)[Re:MirAI Platform - Core Feature Documentation]
  #v(2cm)
  
  #table(
    columns: (auto, auto),
    stroke: none,
    align: (right, left),
    [*Status:*], [Active],
    [*Priority:*], [P0 (MVP)],
    [*Version:*], [1.0.0],
    [*Last Updated:*], [2025-11-24],
  )
  
  #v(3cm)
  #line(length: 50%, stroke: 1pt + gray)
]

#pagebreak()

#outline(title: [Table of Contents], indent: auto)

#pagebreak()

= Executive Summary

Persona Synthesis is the AI-driven core of Re:MirAI that transforms aggregated survey responses into a unique, consistent personality profile. It leverages Large Language Models (LLMs) to analyze quantitative and qualitative data, generating a character with specific traits, archetypes, and dialogue styles that reflect how others see the user.

#block(
  width: 100%,
  fill: prim.lighten(90%),
  stroke: (left: 3pt + prim),
  inset: 12pt,
  radius: 4pt,
)[
  #text(size: 10pt, weight: "bold", fill: prim)[🎯 Key Value Proposition]
  #v(0.5em)
  - *Deep Personalization:* Creates a unique digital mirror based on real feedback
  - *Emotional Connection:* Transforms raw data into a relatable character
  - *AI Magic:* Demonstrates the power of generative AI in a personal context
  - *Replayability:* Different feedback combinations yield different personas
]

== Success Metrics

#grid(
  columns: (1fr, 1fr),
  column-gutter: 15pt,
  row-gutter: 10pt,
  
  block(
    width: 100%,
    fill: succ.lighten(90%),
    stroke: (left: 3pt + succ),
    inset: 12pt,
    radius: 4pt,
  )[
    #text(size: 10pt, weight: "bold", fill: succ)[📊 Quality]
    #v(0.5em)
    *Goal:* >90% User Satisfaction \
    *Measurement:* Post-synthesis rating
  ],
  
  block(
    width: 100%,
    fill: sec.lighten(90%),
    stroke: (left: 3pt + sec),
    inset: 12pt,
    radius: 4pt,
  )[
    #text(size: 10pt, weight: "bold", fill: sec)[⚡ Performance]
    #v(0.5em)
    *Goal:* Generation < 60s \
    *Measurement:* P95 Latency
  ]
)

= 1. Overview

The Persona Synthesis engine is responsible for taking the raw input from the Survey System (F-001) and converting it into a structured Persona profile. This involves statistical aggregation of scores and semantic analysis of text responses to determine the Persona's Archetype (e.g., "The Guardian", "The Jester"), core stats, and unique quirks.

= 2. Use Cases

== UC-01: Create Persona (Fated Mode)
- **Actor:** User
- **Description:** User triggers the synthesis process using the default "Fated" mode, accepting the AI's unbiased interpretation of the data.
- **Pre-conditions:** Survey has received the minimum required responses (e.g., ≥3).
- **Post-conditions:** A new Persona is created with an AI-determined archetype and stats.

== UC-02: Create Persona (Alchemic Mode)
- **Actor:** User (Premium)
- **Description:** User triggers synthesis while applying a specific Archetype Filter (e.g., "Tsundere", "Heroic") to influence the outcome.
- **Pre-conditions:** Survey has ≥3 responses; User has Premium status or required items.
- **Post-conditions:** A new Persona is created, biased towards the selected archetype.

= 3. Functional Requirements (FR)

#table(
  columns: (auto, 1fr, auto),
  inset: 10pt,
  align: (left, left, center),
  fill: (_, row) => if calc.odd(row) { gray.lighten(95%) } else { white },
  table.header(
    [*ID*], [*Requirement*], [*Priority*]
  ),
  [FR-002.1], [The system MUST aggregate numerical scores from survey responses to calculate core stats (Charisma, Intellect, Empathy, etc.).], [P0],
  [FR-002.2], [The system MUST use an LLM (e.g., GPT-4) to analyze text responses and extract key personality traits and recurring themes.], [P0],
  [FR-002.3], [The system MUST assign one of the defined Archetypes (e.g., Yandere, Kuudere, Genki) based on the analyzed data.], [P0],
  [FR-002.4], [The system MUST generate a unique System Prompt for the Persona that enforces its personality, tone, and knowledge base.], [P0],
  [FR-002.5], [The system MUST support "Alchemic Mode" to allow user influence over the generation process via modifiers.], [P2],
)

= 4. Non-Functional Requirements (NFR)

#table(
  columns: (auto, auto, 1fr),
  inset: 10pt,
  align: (left, left, left),
  fill: (_, row) => if calc.odd(row) { gray.lighten(95%) } else { white },
  table.header(
    [*ID*], [*Category*], [*Requirement & Metric*]
  ),
  [NFR-002.1], [Performance], [**Latency:** Persona generation MUST complete within 60 seconds to prevent user drop-off. \ *Metric:* < 60s],
  [NFR-002.2], [Reliability], [**Success Rate:** The generation process MUST have a success rate of >99%. Failures should be gracefully handled with retries. \ *Metric:* > 99%],
  [NFR-002.3], [Consistency], [**Determinism:** Re-running synthesis on the exact same data (in Fated Mode) SHOULD produce semantically similar results. \ *Metric:* Deterministic-ish],
)

#pagebreak()

= 5. System Architecture

== Synthesis Pipeline

```
┌───────────────┐     ┌───────────────┐     ┌─────────────────┐
│ Survey Data   │────▶│ Aggregator    │────▶│ Prompt Builder  │
│ (Responses)   │     │ (Stats Calc)  │     │ (Context Gen)   │
└───────────────┘     └───────────────┘     └─────────────────┘
                                                     │
                                                     ▼
┌───────────────┐     ┌───────────────┐     ┌─────────────────┐
│ Persona DB    │◀────│ Parser &      │◀────│ LLM Service     │
│ (Structured)  │     │ Validator     │     │ (GPT-4o)        │
└───────────────┘     └───────────────┘     └─────────────────┘
```

== LLM Integration Strategy

The synthesis process uses a multi-step prompting strategy:

1.  **Analysis Phase:** The LLM analyzes open-ended responses to extract keywords, sentiment, and recurring themes.
2.  **Archetype Selection:** Based on aggregated stats and analysis, the LLM selects the best-fitting Archetype from a predefined list (or uses the user's selection in Alchemic Mode).
3.  **Character Generation:** The LLM generates the Persona's name, backstory, speaking style, and system prompt.

= 6. Database Schema

== personas Table

```sql
CREATE TABLE personas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    survey_id UUID NOT NULL REFERENCES surveys(id),
    name VARCHAR(100) NOT NULL,
    archetype VARCHAR(50) NOT NULL,
    rarity VARCHAR(20) DEFAULT 'COMMON',
    
    -- Core Stats (0-100)
    stat_charisma INT DEFAULT 0,
    stat_intellect INT DEFAULT 0,
    stat_kindness INT DEFAULT 0,
    stat_energy INT DEFAULT 0,
    
    -- AI Configuration
    system_prompt TEXT NOT NULL,
    greeting_message TEXT,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

== persona_traits Table

```sql
CREATE TABLE persona_traits (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    persona_id UUID NOT NULL REFERENCES personas(id) ON DELETE CASCADE,
    trait_name VARCHAR(50) NOT NULL,
    trait_value INT DEFAULT 0, -- Strength of trait
    description TEXT
);
```

= 7. API Specification

== Generate Persona

*Endpoint:* `POST /v1/personas/synthesize` \
*Auth:* Bearer Token (User)

*Request Body:*
```json
{
  "surveyId": "550e8400-e29b-41d4-a716-446655440000",
  "mode": "FATED", // or "ALCHEMIC"
  "modifiers": {
    "archetype": "TSUNDERE" // Optional, only for ALCHEMIC
  }
}
```

*Response (200 OK):*
```json
{
  "id": "770e8400-e29b-41d4-a716-446655441111",
  "name": "Luna",
  "archetype": "The Mystic",
  "stats": {
    "charisma": 85,
    "intellect": 92,
    "kindness": 70,
    "energy": 45
  },
  "greeting": "Oh, it's you. The stars foretold your arrival."
}
```

= 8. Error Handling

#table(
  columns: (auto, auto, 1fr),
  align: (left, left, left),
  stroke: 0.5pt + gray,
  [*Code*], [*HTTP*], [*Description*],
  table.hline(),
  [`PERSONA_001`], [400], [Insufficient survey responses (Threshold not met)],
  [`PERSONA_002`], [402], [Premium required for Alchemic Mode],
  [`PERSONA_003`], [500], [LLM Generation Failed (Retryable)],
)
