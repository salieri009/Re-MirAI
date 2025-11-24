#set document(
  title: "F-005: Social Features - Technical Specification",
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
  #text(size: 32pt, weight: "bold")[F-005: Social Features]
  #v(1cm)
  #text(size: 14pt, fill: gray)[Re:MirAI Platform - Core Feature Documentation]
  #v(2cm)
  
  #table(
    columns: (auto, auto),
    stroke: none,
    align: (right, left),
    [*Status:*], [Active],
    [*Priority:*], [P2 (Phase 2)],
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

Social Features extend the solitary experience of chatting with a Persona into a community experience. This includes public profiles, compatibility matching between friends' Personas, and visiting friends' rooms, fostering a network effect within the platform.

#block(
  width: 100%,
  fill: prim.lighten(90%),
  stroke: (left: 3pt + prim),
  inset: 12pt,
  radius: 4pt,
)[
  #text(size: 10pt, weight: "bold", fill: prim)[🎯 Key Value Proposition]
  #v(0.5em)
  - *Network Effect:* Encourages users to invite friends
  - *Discovery:* Find interesting personas and people
  - *Engagement:* Compare results and see how you match
  - *Community:* Build a space for shared experiences
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
    #text(size: 10pt, weight: "bold", fill: succ)[📊 Connectivity]
    #v(0.5em)
    *Goal:* >50% users with connections \
    *Measurement:* Connections / User
  ],
  
  block(
    width: 100%,
    fill: sec.lighten(90%),
    stroke: (left: 3pt + sec),
    inset: 12pt,
    radius: 4pt,
  )[
    #text(size: 10pt, weight: "bold", fill: sec)[⚡ Engagement]
    #v(0.5em)
    *Goal:* >30% Profile Visit Rate \
    *Measurement:* Visits / DAU
  ]
)

= 1. Overview

The Social module allows users to interact with each other through their Personas. The core feature is "Compatibility Matching," which analyzes two Personas to determine their relationship dynamic. Additionally, users can visit "Rooms" (public profiles) to see others' Personas and leave interactions.

= 2. Use Cases

== UC-01: Check Compatibility
- **Actor:** User
- **Description:** User compares their Persona with a friend's Persona to see their "Chemistry".
- **Pre-conditions:** Both users have Personas; Friend's ID is known.
- **Post-conditions:** A compatibility score (0-100) and detailed analysis are displayed.

== UC-02: Visit Friend's Room
- **Actor:** User
- **Description:** User visits the public profile/room of a friend's Persona.
- **Pre-conditions:** Friend's profile is set to Public.
- **Post-conditions:** User can see friend's Persona, stats, and leave a "Gift" or "Like".

= 3. Functional Requirements (FR)

#table(
  columns: (auto, 1fr, auto),
  inset: 10pt,
  align: (left, left, center),
  fill: (_, row) => if calc.odd(row) { gray.lighten(95%) } else { white },
  table.header(
    [*ID*], [*Requirement*], [*Priority*]
  ),
  [FR-005.1], [The system MUST calculate a Compatibility Score based on stat alignment and archetype interactions (e.g., Myers-Briggs logic).], [P2],
  [FR-005.2], [The system MUST generate a text description of the relationship dynamic (e.g., "Opposites Attract", "Chaotic Duo").], [P2],
  [FR-005.3], [The system MUST support Public/Private visibility settings for user profiles to ensure privacy.], [P2],
  [FR-005.4], [The system MUST allow users to "Follow" or "Friend" other users.], [P2],
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
  [NFR-005.1], [Privacy], [**Consent:** Users MUST explicitly opt-in to make their profile public. Default is Private. \ *Metric:* Privacy First],
  [NFR-005.2], [Latency], [**Speed:** Compatibility checks MUST return results within 1 second. \ *Metric:* < 1s],
  [NFR-005.3], [Scalability], [**Graph:** The social graph MUST support efficient querying of connections. \ *Metric:* O(log n) lookup],
)

#pagebreak()

= 5. Database Schema

== user_relations Table

```sql
CREATE TABLE user_relations (
    follower_id UUID NOT NULL REFERENCES users(id),
    following_id UUID NOT NULL REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    PRIMARY KEY (follower_id, following_id),
    CHECK (follower_id != following_id)
);
```

== compatibility_scores Table

```sql
CREATE TABLE compatibility_scores (
    persona_a_id UUID NOT NULL REFERENCES personas(id),
    persona_b_id UUID NOT NULL REFERENCES personas(id),
    score INT NOT NULL CHECK (score BETWEEN 0 AND 100),
    analysis_text TEXT,
    calculated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    PRIMARY KEY (persona_a_id, persona_b_id)
);
```

= 6. Compatibility Algorithm

The compatibility score is calculated using a weighted vector distance of personality dimensions:

$ "Score" = 100 - (w_1 |C_a - C_b| + w_2 |I_a - I_b| + ... ) $

Where:
- $C$: Charisma, $I$: Intellect, etc.
- $w$: Weights determined by Archetype rules (e.g., "Opposites Attract" logic might invert the penalty for certain stats).

= 7. API Specification

== Check Compatibility

*Endpoint:* `GET /v1/social/compatibility` \
*Query Params:* `targetPersonaId={uuid}`

*Response (200 OK):*
```json
{
  "score": 85,
  "label": "Soulmates",
  "description": "Your high energy complements their calm nature perfectly."
}
```

= 8. Error Handling

#table(
  columns: (auto, auto, 1fr),
  align: (left, left, left),
  stroke: 0.5pt + gray,
  [*Code*], [*HTTP*], [*Description*],
  table.hline(),
  [`SOCIAL_001`], [404], [Target persona not found],
  [`SOCIAL_002`], [403], [Target profile is private],
)
