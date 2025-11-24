#set document(
  title: "F-006: Gamification - Technical Specification",
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
  #text(size: 32pt, weight: "bold")[F-006: Gamification]
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

Gamification elements are designed to increase user retention and engagement by providing tangible goals and rewards. This includes a Quest System, Daily Login rewards, and the "Memory Crystal" currency system, which creates a sustainable economy within the platform.

#block(
  width: 100%,
  fill: prim.lighten(90%),
  stroke: (left: 3pt + prim),
  inset: 12pt,
  radius: 4pt,
)[
  #text(size: 10pt, weight: "bold", fill: prim)[🎯 Key Value Proposition]
  #v(0.5em)
  - *Retention:* Daily incentives to return to the app
  - *Progression:* Sense of achievement through leveling up
  - *Monetization:* Foundation for premium features and economy
  - *Guidance:* Quests guide users through key features
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
    #text(size: 10pt, weight: "bold", fill: succ)[📊 Retention]
    #v(0.5em)
    *Goal:* >40% D7 Retention \
    *Measurement:* Cohort Analysis
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
    *Goal:* >80% Quest Completion \
    *Measurement:* Completion Rate
  ]
)

= 1. Overview

The Gamification system introduces a layer of meta-game mechanics over the core experience. Users earn "Memory Crystals" (currency) by completing daily and weekly quests (e.g., "Chat for 5 mins", "Share a Card"). This currency can be used to unlock premium features, new archetypes, or cosmetic items.

= 2. Use Cases

== UC-01: Complete Quest
- **Actor:** User
- **Description:** User performs a specific action (e.g., "Share Card") and claims a reward.
- **Pre-conditions:** Quest is active and criteria are met.
- **Post-conditions:** User receives Memory Crystals; Quest is marked complete; Notification is shown.

== UC-02: Spend Currency
- **Actor:** User
- **Description:** User spends Memory Crystals to unlock premium items or features.
- **Pre-conditions:** User has sufficient balance.
- **Post-conditions:** Item is unlocked; balance is deducted; Transaction is logged.

= 3. Functional Requirements (FR)

#table(
  columns: (auto, 1fr, auto),
  inset: 10pt,
  align: (left, left, center),
  fill: (_, row) => if calc.odd(row) { gray.lighten(95%) } else { white },
  table.header(
    [*ID*], [*Requirement*], [*Priority*]
  ),
  [FR-006.1], [The system MUST track user progress against defined Quests (Daily, Weekly, Achievement).], [P2],
  [FR-006.2], [The system MUST maintain a secure ledger of user currency (Memory Crystals).], [P2],
  [FR-006.3], [The system MUST support daily login tracking and streak rewards (increasing rewards for consecutive days).], [P2],
  [FR-006.4], [The system MUST provide a "Shop" interface for spending currency.], [P2],
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
  [NFR-006.1], [Integrity], [**Security:** Currency transactions MUST be transactional and atomic to prevent fraud or duplication. \ *Metric:* ACID Compliance],
  [NFR-006.2], [Feedback], [**UX:** Users MUST receive immediate visual feedback (animations, toasts) upon quest completion. \ *Metric:* Instant Feedback],
  [NFR-006.3], [Balance], [**Economy:** The economy MUST be balanced to prevent inflation or devaluation of currency. \ *Metric:* Economic Stability],
)

#pagebreak()

= 5. Database Schema

== wallets Table

```sql
CREATE TABLE wallets (
    user_id UUID PRIMARY KEY REFERENCES users(id),
    balance INT DEFAULT 0 CHECK (balance >= 0),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

== transactions Table

```sql
CREATE TABLE transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    wallet_id UUID NOT NULL REFERENCES wallets(user_id),
    amount INT NOT NULL, -- Positive for credit, negative for debit
    type VARCHAR(20) NOT NULL, -- 'QUEST_REWARD', 'SHOP_PURCHASE'
    reference_id UUID, -- Quest ID or Item ID
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

== quests Table

```sql
CREATE TABLE quests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(100) NOT NULL,
    description TEXT,
    reward_amount INT NOT NULL,
    type VARCHAR(20) NOT NULL, -- 'DAILY', 'WEEKLY', 'ACHIEVEMENT'
    criteria JSONB NOT NULL -- e.g., {"action": "chat_message", "count": 5}
);
```

= 6. API Specification

== Claim Quest Reward

*Endpoint:* `POST /v1/quests/{questId}/claim` \
*Auth:* Bearer Token

*Response (200 OK):*
```json
{
  "success": true,
  "reward": 50,
  "newBalance": 150
}
```

= 7. Error Handling

#table(
  columns: (auto, auto, 1fr),
  align: (left, left, left),
  stroke: 0.5pt + gray,
  [*Code*], [*HTTP*], [*Description*],
  table.hline(),
  [`GAME_001`], [400], [Quest criteria not met],
  [`GAME_002`], [409], [Reward already claimed],
  [`GAME_003`], [402], [Insufficient funds (for purchases)],
)
