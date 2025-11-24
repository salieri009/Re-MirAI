#set document(
  title: "F-001: Survey System - Technical Specification",
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
  #text(size: 32pt, weight: "bold")[F-001: Survey System]
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

The Survey System is the foundational data collection mechanism of the Re:MirAI platform. It enables users to create personalized surveys ("Rituals") and share them with friends to collect anonymous feedback, which serves as the input for AI-powered Persona synthesis.

#block(
  width: 100%,
  fill: prim.lighten(90%),
  stroke: (left: 3pt + prim),
  inset: 12pt,
  radius: 4pt,
)[
  #text(size: 10pt, weight: "bold", fill: prim)[🎯 Key Value Proposition]
  #v(0.5em)
  - *Viral Growth Engine:* Each survey naturally spreads through friend networks
  - *Privacy-First:* Complete anonymity for respondents builds trust
  - *Low Friction:* No account required for respondents
  - *Gamified Experience:* Progress tracking and threshold mechanics
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
    #text(size: 10pt, weight: "bold", fill: succ)[📊 Activation]
    #v(0.5em)
    *Goal:* >60% of surveys receive ≥3 responses \
    *Measurement:* Survey completion rate
  ],
  
  block(
    width: 100%,
    fill: sec.lighten(90%),
    stroke: (left: 3pt + sec),
    inset: 12pt,
    radius: 4pt,
  )[
    #text(size: 10pt, weight: "bold", fill: sec)[🚀 Virality]
    #v(0.5em)
    *Goal:* K-factor > 1.1 \
    *Measurement:* Average invites per user
  ],
)

#pagebreak()

= System Architecture

== High-Level Flow

```
┌────────┐     ┌────────────────┐     ┌─────────────┐     ┌──────────────────┐
│  User  │────▶│ Create Survey  │────▶│ Share Link  │────▶│ Collect Responses│
└────────┘     └────────────────┘     └─────────────┘     └──────────────────┘
                                                                      │
                                                                      ▼
     ┌────────────────┐     ┌─────────────────┐     ┌──────────────────────┐
     │ Unlock Persona │◀────│ Threshold Check │◀────│   ≥3 Responses?      │
     └────────────────┘     │   (≥3 required) │     └──────────────────────┘
                            └─────────────────┘
```

== Data Flow Architecture

```
┌─────────────┐      ┌──────────────┐      ┌─────────────────┐
│   Frontend  │─────▶│  API Gateway │─────▶│  Survey Service │
│   (Next.js) │      │              │      │   (Node.js)     │
└─────────────┘      └──────────────┘      └─────────────────┘
                              │                      │
                              ▼                      ▼
                     ┌──────────────┐      ┌─────────────────┐
                     │ Auth Service │      │   Database      │
                     │   (NextAuth) │      │  (PostgreSQL)   │
                     └──────────────┘      └─────────────────┘
```

#pagebreak()

= Use Cases

== UC-01: Create Survey

*Actor:* Authenticated User \
*Description:* User generates a unique survey link to share with friends \
*Pre-conditions:* User is logged in via Google OAuth \
*Post-conditions:* Unique Survey ID and shareable URL are generated \
*Priority:* P0 (MVP Critical)

=== Detailed Flow

#block(
  width: 100%,
  fill: prim.lighten(90%),
  stroke: (left: 3pt + prim),
  inset: 12pt,
  radius: 4pt,
)[
  #text(size: 10pt, weight: "bold", fill: prim)[📝 Step-by-Step Process]
  #v(0.5em)
  + User clicks "Create Survey" button on dashboard
  + System validates user authentication
  + System generates UUID for survey
  + System creates survey record in database with status: `ACTIVE`
  + System returns shareable URL: `https://remirai.app/s/{uuid}`
  + User sees success message with copy-to-clipboard functionality
]

=== API Specification

```http
POST /v1/surveys
Authorization: Bearer {accessToken}

Response (201 Created):
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "url": "https://remirai.app/s/550e8400-e29b-41d4-a716-446655440000",
  "status": "ACTIVE",
  "createdAt": "2025-11-24T12:00:00Z",
  "expiresAt": "2025-12-24T12:00:00Z"
}
```

#pagebreak()

== UC-02: Submit Anonymous Feedback

*Actor:* Friend (Respondent) \
*Description:* Friend answers survey questions anonymously \
*Pre-conditions:* Valid survey URL received \
*Post-conditions:* Response encrypted, stored, and progress updated \
*Priority:* P0 (MVP Critical)

=== Anonymity Safeguards

#block(
  width: 100%,
  fill: dang.lighten(90%),
  stroke: (left: 3pt + dang),
  inset: 12pt,
  radius: 4pt,
)[
  #text(size: 10pt, weight: "bold", fill: dang)[🔒 Privacy Protection Mechanisms]
  #v(0.5em)
  *Database Level:*
  - Responses stored without user-identifiable metadata
  - IP addresses hashed with salt (not plaintext)
  - No cross-reference between respondent and response
  
  *Application Level:*
  - Owner only sees aggregated statistics
  - Individual responses never exposed in UI
  - Fingerprinting for duplicate prevention only (24h TTL)
  
  *Compliance:*
  - GDPR Article 4(1) - Not considered personal data
  - No tracking cookies for respondents
]

#pagebreak()

= Functional Requirements

== Core Requirements (P0)

#grid(
  columns: (auto, 1fr),
  column-gutter: 10pt,
  row-gutter: 8pt,
  
  box(fill: dang, inset: 4pt, radius: 3pt)[#text(size: 8pt, fill: white, weight: "bold")[P0]],
  [#text(weight: "bold", fill: prim)[FR-001.1] The system *MUST* generate a unique, shareable URL for each survey using UUID v4.],
  
  box(fill: dang, inset: 4pt, radius: 3pt)[#text(size: 8pt, fill: white, weight: "bold")[P0]],
  [#text(weight: "bold", fill: prim)[FR-001.2] The system *MUST* present a fixed set of 10-15 personality questions covering: Charisma, Intellect, Kindness, Energy.],
  
  box(fill: dang, inset: 4pt, radius: 3pt)[#text(size: 8pt, fill: white, weight: "bold")[P0]],
  [#text(weight: "bold", fill: prim)[FR-001.3] The system *MUST* allow respondents to submit answers without creating an account.],
  
  box(fill: dang, inset: 4pt, radius: 3pt)[#text(size: 8pt, fill: white, weight: "bold")[P0]],
  [#text(weight: "bold", fill: prim)[FR-001.4] The system *MUST* enforce a minimum threshold of 3 responses before unlocking Persona creation.],
)

== Enhanced Features (P1)

#grid(
  columns: (auto, 1fr),
  column-gutter: 10pt,
  row-gutter: 8pt,
  
  box(fill: warn, inset: 4pt, radius: 3pt)[#text(size: 8pt, fill: white, weight: "bold")[P1]],
  [#text(weight: "bold", fill: prim)[FR-001.5] The system *SHOULD* support "Practice Mode" where users answer their own survey.],
  
  box(fill: warn, inset: 4pt, radius: 3pt)[#text(size: 8pt, fill: white, weight: "bold")[P1]],
  [#text(weight: "bold", fill: prim)[FR-001.6] The system *SHOULD* provide real-time progress tracking.],
)

#pagebreak()

= Non-Functional Requirements

== Performance

#table(
  columns: (auto, 1fr, auto, auto),
  align: (left, left, center, center),
  stroke: 0.5pt + gray,
  [*ID*], [*Requirement*], [*Target*], [*Priority*],
  table.hline(),
  [NFR-001.1], [Survey link generation latency], [< 1s], [P0],
  [NFR-001.2], [Response submission latency], [< 500ms], [P0],
  [NFR-001.3], [Concurrent respondents support], [1000 CCU], [P0],
  [NFR-001.4], [Database query response time], [< 100ms], [P1],
)

== Security & Privacy

#block(
  width: 100%,
  fill: dang.lighten(90%),
  stroke: (left: 3pt + dang),
  inset: 12pt,
  radius: 4pt,
)[
  #text(size: 10pt, weight: "bold", fill: dang)[🛡️ Critical Security Requirements]
  #v(0.5em)
  *NFR-001.5:* Responses MUST NOT be traceable to specific respondent
  - Implementation: IP hashing with per-survey salt
  - Storage: Hash in separate `anonymity_checks` table (24h TTL)
  
  *NFR-001.6:* All response data MUST be encrypted at rest
  - Implementation: PostgreSQL `pgcrypto` extension
  - Algorithm: AES-256-GCM
  
  *NFR-001.7:* Duplicate submissions prevented without compromising anonymity
  - Implementation: Browser fingerprinting + IP hash
  - Cooldown: 24 hours
]

#pagebreak()

= Database Schema

== surveys Table

```sql
CREATE TABLE surveys (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    expires_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() + INTERVAL '30 days',
    
    INDEX idx_user_id (user_id),
    INDEX idx_status (status),
    INDEX idx_created_at (created_at)
);
```

== survey_responses Table

```sql
CREATE TABLE survey_responses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    survey_id UUID NOT NULL REFERENCES surveys(id) ON DELETE CASCADE,
    answers JSONB NOT NULL, -- Encrypted answer data
    fingerprint_hash VARCHAR(64) NOT NULL,
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    INDEX idx_survey_id (survey_id),
    INDEX idx_submitted_at (submitted_at)
);
```

== anonymity_checks Table

```sql
CREATE TABLE anonymity_checks (
    survey_id UUID NOT NULL REFERENCES surveys(id) ON DELETE CASCADE,
    ip_hash VARCHAR(64) NOT NULL,
    fingerprint_hash VARCHAR(64) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    expires_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() + INTERVAL '24 hours',
    
    PRIMARY KEY (survey_id, ip_hash, fingerprint_hash),
    INDEX idx_expires_at (expires_at)
);
```

#pagebreak()

= Question Bank

== Personality Dimensions

#table(
  columns: (auto, 1fr, auto),
  align: (left, left, center),
  stroke: 0.5pt + gray,
  [*Dimension*], [*Sample Question*], [*Scale*],
  table.hline(),
  [Charisma], [How comfortable is this person in social gatherings?], [1-5],
  [Charisma], [Does this person naturally take leadership roles?], [1-5],
  [Intellect], [How analytical is this person's thinking?], [1-5],
  [Intellect], [Does this person enjoy deep discussions?], [1-5],
  [Kindness], [How often does this person help others?], [1-5],
  [Kindness], [How empathetic is this person?], [1-5],
  [Energy], [How much energy does this person bring?], [0-100],
  [Honesty], [How direct is this person with feedback?], [1-5],
)

== Open-Ended Questions

#block(
  width: 100%,
  fill: prim.lighten(90%),
  stroke: (left: 3pt + prim),
  inset: 12pt,
  radius: 4pt,
)[
  #text(size: 10pt, weight: "bold", fill: prim)[💬 Qualitative Data Collection]
  #v(0.5em)
  1. Describe this person in 3 words
  2. What role does this person typically play in a group?
  3. If this person were a fictional character, who would they be?
  4. What is this person's biggest strength?
  5. What is one thing this person could improve?
]

#pagebreak()

= Error Handling

== Error Codes

#table(
  columns: (auto, auto, 1fr),
  align: (left, left, left),
  stroke: 0.5pt + gray,
  [*Code*], [*HTTP*], [*Description*],
  table.hline(),
  [`SURVEY_001`], [404], [Survey not found or expired],
  [`SURVEY_002`], [403], [Survey access denied (not owner)],
  [`SURVEY_003`], [429], [Duplicate submission detected],
  [`SURVEY_004`], [400], [Invalid survey data],
  [`SURVEY_005`], [422], [Survey already completed],
)

#pagebreak()

= Appendix

== Related Documents

- Core Features Overview
- F-002: Persona Synthesis
- F-003: Chat Interface
- API Specification
- Database Schema

== Glossary

#table(
  columns: (auto, 1fr),
  align: (left, left),
  stroke: 0.5pt + gray,
  [*Term*], [*Definition*],
  table.hline(),
  [Survey], [A unique questionnaire created by user],
  [Ritual], [User-facing term for Survey],
  [Respondent], [Anonymous friend answering questions],
  [Threshold], [Minimum 3 responses required],
  [Practice Mode], [User answers own survey],
  [Proto-Persona], [Lower-rarity Persona from self-response],
  [Fingerprint], [Browser identifier for duplicate prevention],
)

== Revision History

#table(
  columns: (auto, auto, auto, 1fr),
  align: (center, left, left, left),
  stroke: 0.5pt + gray,
  [*Version*], [*Date*], [*Author*], [*Changes*],
  table.hline(),
  [1.0.0], [2025-11-24], [Re:MirAI Team], [Initial specification],
)

#pagebreak()

= Implementation Guide

== Directory Structure

```bash
src/
├── components/features/survey/
│   ├── SurveyWizard.tsx       # Main container
│   ├── QuestionCard.tsx       # Individual question UI
│   ├── ProgressBar.tsx        # Progress indicator
│   └── SurveyLanding.tsx      # Entry point
├── lib/api/
│   └── survey.ts              # API client methods
├── server/services/
│   └── SurveyService.ts       # Business logic
└── types/
    └── survey.ts              # TypeScript interfaces
```

== Frontend Architecture (Atomic Design)

=== Atoms
- *ProgressBar:* Visualizes latency and progress (Implements `NFR-001.2`).
- *RadioButton:* Standard input for Likert scale questions.
- *NextButton:* Triggers navigation and validation.

=== Molecules
- *QuestionCard:* Composes Question text + Options (Implements `FR-001.2` Question Set).
- *FeedbackToast:* Displays success/error messages (Implements `NFR-001.2` Feedback).

=== Organisms
- *SurveyWizard:* Orchestrates the entire `UC-01` flow, managing state and transitions.

== Backend Architecture

=== Validation (Zod)

```typescript
export const CreateSurveySchema = z.object({
  userId: z.string().uuid(),
});

export const SubmitResponseSchema = z.object({
  surveyId: z.string().uuid(),
  answers: z.record(z.string(), z.number().min(1).max(5)),
  fingerprint: z.string().min(10),
});
```

=== Service Methods

*SurveyService:*
- `createSurvey(userId)`: Returns `Survey` (Implements `FR-001.1`).
- `submitResponse(surveyId, answers, ipHash)`: Validates and stores (Implements `UC-02`).
- `getSurveyStats(surveyId)`: Returns aggregated data.

#pagebreak()

= Test Plan

== Unit Tests

=== Backend (SurveyService)
- *test_generate_unique_id:* Verify `SurveyService` creates UUID v4 (Verifies `FR-001.1`).
- *test_anonymous_submission:* Check `SurveyService` accepts payload without `userId` (Verifies `FR-001.3`).
- *test_threshold_logic:* Verify `is_unlocked` becomes true only after 3 responses (Verifies `FR-001.4`).

=== Frontend (Components)
- *test_question_set_integrity:* Ensure `QuestionCard` renders exactly 10-15 questions (Verifies `FR-001.2`).
- *test_progress_bar_accuracy:* Verify bar updates correctly on step change (Verifies `FR-001.6`).

== Integration Tests

=== UC-01: Create Survey
- *test_survey_lifecycle_happy_path:*
  1. User creates survey (Expect `201 Created`).
  2. Respondent submits answers (Expect `200 OK`).
  3. Check `FR-001.4` threshold progress (Expect `1/3`).

=== UC-02: Submit Feedback
- *test_duplicate_prevention:*
  1. Respondent submits twice with same fingerprint.
  2. Expect `429 Too Many Requests` (Verifies `NFR-001.7`).
- *test_performance_sla:*
  1. Simulate 100 concurrent submissions.
  2. Verify p95 latency < 500ms (Verifies `NFR-001.2`).


#align(center)[
  #v(2cm)
  #text(size: 10pt, fill: gray)[End of Document]
]
