#set document(
  title: "F-003: AI Chat Interface - Technical Specification",
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
  #text(size: 32pt, weight: "bold")[F-003: AI Chat Interface]
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

The AI Chat Interface is the primary engagement layer where users interact with their created Persona. It provides a real-time, immersive conversational experience that reflects the synthesized personality, maintaining context, emotional continuity, and evolving the relationship over time.

#block(
  width: 100%,
  fill: prim.lighten(90%),
  stroke: (left: 3pt + prim),
  inset: 12pt,
  radius: 4pt,
)[
  #text(size: 10pt, weight: "bold", fill: prim)[🎯 Key Value Proposition]
  #v(0.5em)
  - *Immersive Interaction:* Chat with a reflection of yourself or a friend
  - *Emotional Continuity:* The AI remembers past conversations and context
  - *Relationship Growth:* "Bond Level" increases with interaction, unlocking new dialogues
  - *Safe Environment:* Moderated and private space for self-reflection
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
    #text(size: 10pt, weight: "bold", fill: succ)[📊 Engagement]
    #v(0.5em)
    *Goal:* Avg Session > 5 mins \
    *Measurement:* Session Duration
  ],
  
  block(
    width: 100%,
    fill: sec.lighten(90%),
    stroke: (left: 3pt + sec),
    inset: 12pt,
    radius: 4pt,
  )[
    #text(size: 10pt, weight: "bold", fill: sec)[⚡ Responsiveness]
    #v(0.5em)
    *Goal:* Response < 3s \
    *Measurement:* P95 Latency
  ]
)

= 1. Overview

The Chat Interface is a WebSocket-based real-time messaging system. It connects the user to the LLM backend, which is context-aware of the specific Persona's system prompt, history, and current state. It supports standard chat features like history scrolling, typing indicators, and rich text formatting.

= 2. Use Cases

== UC-01: Chat with Persona
- **Actor:** User
- **Description:** User sends a text message to their Persona and receives a reply.
- **Pre-conditions:** User has a created Persona.
- **Post-conditions:** Message is saved to history; AI response is generated and displayed; Bond Level progress increases.

== UC-02: View Chat History
- **Actor:** User
- **Description:** User scrolls up to see previous conversations.
- **Pre-conditions:** Chat history exists.
- **Post-conditions:** Previous messages are loaded from the database.

= 3. Functional Requirements (FR)

#table(
  columns: (auto, 1fr, auto),
  inset: 10pt,
  align: (left, left, center),
  fill: (_, row) => if calc.odd(row) { gray.lighten(95%) } else { white },
  table.header(
    [*ID*], [*Requirement*], [*Priority*]
  ),
  [FR-003.1], [The system MUST provide a real-time text chat interface with typing indicators.], [P0],
  [FR-003.2], [The AI MUST respond in a manner consistent with its assigned Archetype, Stats, and System Prompt.], [P0],
  [FR-003.3], [The system MUST maintain conversation context (memory) for at least the last 10 turns to ensure continuity.], [P0],
  [FR-003.4], [The system MUST track and update "Bond Level" based on interaction frequency and quality.], [P1],
  [FR-003.5], [The system MUST filter harmful or explicit content (Moderation) to ensure safety.], [P0],
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
  [NFR-003.1], [Latency], [**Response Time:** AI response time MUST be under 3 seconds for 95% of requests to maintain flow. \ *Metric:* < 3s],
  [NFR-003.2], [Availability], [**Uptime:** The chat service MUST be available 99.9% of the time. \ *Metric:* 99.9% Uptime],
  [NFR-003.3], [Scalability], [**Concurrency:** The system MUST handle 500 concurrent chat sessions without degradation. \ *Metric:* 500 Concurrent],
)

#pagebreak()

= 5. System Architecture

== Real-Time Architecture

```
┌───────────────┐      ┌───────────────┐      ┌─────────────────┐
│ Client App    │◀────▶│ WS Gateway    │◀────▶│ Chat Service    │
│ (WebSocket)   │      │ (Socket.io)   │      │ (Node.js)       │
└───────────────┘      └───────────────┘      └─────────────────┘
                                                       │
                                                       ▼
┌───────────────┐      ┌───────────────┐      ┌─────────────────┐
│ Vector DB     │◀────▶│ LLM Service   │◀────▶│ SQL Database    │
│ (Context)     │      │ (Inference)   │      │ (History)       │
└───────────────┘      └───────────────┘      └─────────────────┘
```

== Context Management

To maintain conversation continuity while managing token costs, the system uses a hybrid context window:

1.  **System Prompt:** Fixed instructions defining the Persona's core identity (always included).
2.  **Short-Term Memory:** The last 10-20 turns of conversation (sliding window).
3.  **Long-Term Memory (RAG):** Relevant past details retrieved from Vector DB based on semantic similarity to the current user message.

= 6. Database Schema

== chat_sessions Table

```sql
CREATE TABLE chat_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id),
    persona_id UUID NOT NULL REFERENCES personas(id),
    bond_level INT DEFAULT 0,
    last_interaction_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    UNIQUE(user_id, persona_id)
);
```

== messages Table

```sql
CREATE TABLE messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID NOT NULL REFERENCES chat_sessions(id) ON DELETE CASCADE,
    sender_type VARCHAR(10) NOT NULL CHECK (sender_type IN ('USER', 'AI')),
    content TEXT NOT NULL,
    embedding VECTOR(1536), -- For RAG
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    INDEX idx_session_created (session_id, created_at DESC)
);
```

= 7. API Specification

== Send Message (WebSocket)

*Event:* `chat:message`

*Payload:*
```json
{
  "sessionId": "session-uuid",
  "content": "Hello, how are you today?"
}
```

*Response Event:* `chat:response`
```json
{
  "id": "msg-uuid",
  "content": "I am doing well, thank you for asking!",
  "timestamp": "2025-11-24T12:01:00Z"
}
```

== Get History (REST)

*Endpoint:* `GET /v1/chats/{sessionId}/history` \
*Query Params:* `limit=50`, `before={timestamp}`

*Response (200 OK):*
```json
{
  "messages": [
    {
      "id": "msg-1",
      "sender": "USER",
      "content": "Hi",
      "createdAt": "..."
    },
    {
      "id": "msg-2",
      "sender": "AI",
      "content": "Hello!",
      "createdAt": "..."
    }
  ]
}
```

= 8. Error Handling

#table(
  columns: (auto, auto, 1fr),
  align: (left, left, left),
  stroke: 0.5pt + gray,
  [*Code*], [*HTTP*], [*Description*],
  table.hline(),
  [`CHAT_001`], [403], [User does not own this chat session],
  [`CHAT_002`], [429], [Rate limit exceeded (too many messages)],
  [`CHAT_003`], [400], [Message content violates safety policy],
)

#pagebreak()

= Implementation Guide

== Directory Structure

```bash
src/
├── components/features/chat/
│   ├── ChatWindow.tsx         # Main chat container
│   ├── MessageBubble.tsx      # Individual message
│   ├── ChatInput.tsx          # Text input area
│   └── TypingIndicator.tsx    # "Persona is typing..."
├── lib/socket/
│   └── chat-socket.ts         # WebSocket client
└── server/socket/
    └── chat-handler.ts        # WebSocket event handlers
```

== Frontend Architecture (Atomic Design)

=== Atoms
- *Avatar:* Circular user/persona image.
- *SendIcon:* SVG icon for submit action.
- *TypingDot:* Animated dot for typing indicator (Implements `FR-003.1`).

=== Molecules
- *MessageBubble:* Composes Text + Avatar + Timestamp (Renders `FR-003.1` Text).
- *ChatInput:* Textarea + SendButton (Implements `FR-003.1`).

=== Organisms
- *ChatWindow:* Manages message list, scrolling, and connection state (Maintains `FR-003.3` Context).

== Backend Architecture

=== RAG Pipeline

1.  *Embed:* Convert user message to vector (OpenAI embedding).
2.  *Search:* Query `messages` table for similar vectors (cosine similarity).
3.  *Context:* Append top 3 relevant past messages to System Prompt.
4.  *Generate:* Call LLM with augmented context.

=== Validation (Zod)

```typescript
export const ChatMessageSchema = z.object({
  sessionId: z.string().uuid(),
  content: z.string().min(1).max(1000),
});
```

#pagebreak()

= Test Plan

== Unit Tests

=== Backend (ChatSocket)
- *test_connection_handling:* Verify socket accepts valid auth token (Verifies `NFR-003.2`).
- *test_context_window:* Verify last 10 messages are retained in memory (Verifies `FR-003.3`).
- *test_moderation_filter:* Ensure harmful content is flagged and rejected (Verifies `FR-003.5`).

=== Frontend (Components)
- *test_typing_indicator:* Verify indicator appears on `chat:typing` event (Verifies `FR-003.1`).
- *test_auto_scroll:* Verify chat window scrolls to bottom on new message (Verifies `FR-003.1`).

== Integration Tests

=== UC-01: Chat Flow
- *test_realtime_chat_flow:*
  1. User sends message "Hello".
  2. Verify `chat:response` received within 3s (Verifies `NFR-003.1`).
  3. Verify response style matches Archetype (Verifies `FR-003.2`).
- *test_bond_level_increase:*
  1. Send 5 messages.
  2. Verify `bond_level` increments in database (Verifies `FR-003.4`).

=== UC-02: History
- *test_history_pagination:*
  1. Request history with `limit=50`.
  2. Verify 50 messages returned in correct order (Verifies `UC-02`).
