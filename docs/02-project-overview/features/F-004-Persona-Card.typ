#set document(
  title: "F-004: Persona Card - Technical Specification",
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
  #text(size: 32pt, weight: "bold")[F-004: Persona Card]
  #v(1cm)
  #text(size: 14pt, fill: gray)[Re:MirAI Platform - Core Feature Documentation]
  #v(2cm)
  
  #table(
    columns: (auto, auto),
    stroke: none,
    align: (right, left),
    [*Status:*], [Active],
    [*Priority:*], [P1 (Post-MVP)],
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

The Persona Card is a shareable visual asset that summarizes a Persona's key attributes in a highly aesthetic format. It is designed specifically for social media sharing (Instagram Stories, Twitter) to drive viral growth and user acquisition by showcasing the unique "Blonix Branch" visual identity.

#block(
  width: 100%,
  fill: prim.lighten(90%),
  stroke: (left: 3pt + prim),
  inset: 12pt,
  radius: 4pt,
)[
  #text(size: 10pt, weight: "bold", fill: prim)[🎯 Key Value Proposition]
  #v(0.5em)
  - *Viral Loop:* Users sharing cards attracts new users
  - *Visual Identity:* Establishes the brand's aesthetic
  - *Social Proof:* "Look at my result" drives curiosity
  - *Collectibility:* Encourages users to generate multiple personas
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
    #text(size: 10pt, weight: "bold", fill: succ)[📊 Virality]
    #v(0.5em)
    *Goal:* >20% Share Rate \
    *Measurement:* Shares / Generations
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
    *Goal:* Generation < 2s \
    *Measurement:* P95 Latency
  ]
)

= 1. Overview

The Persona Card generator takes the structured data of a Persona (Name, Archetype, Stats, Rarity) and renders it into a high-resolution image (PNG/JPG). This image includes a QR code or link back to the platform, serving as a direct acquisition channel.

= 2. Use Cases

== UC-01: Generate Persona Card
- **Actor:** User
- **Description:** User requests a shareable image of their Persona from the profile view.
- **Pre-conditions:** Persona exists.
- **Post-conditions:** A PNG/JPG image is generated and displayed to the user.

== UC-02: Share to Social Media
- **Actor:** User
- **Description:** User shares the generated card directly to a social platform (e.g., via Web Share API).
- **Pre-conditions:** Card is generated.
- **Post-conditions:** Image is posted to external platform with a link back to Re:MirAI.

= 3. Functional Requirements (FR)

#table(
  columns: (auto, 1fr, auto),
  inset: 10pt,
  align: (left, left, center),
  fill: (_, row) => if calc.odd(row) { gray.lighten(95%) } else { white },
  table.header(
    [*ID*], [*Requirement*], [*Priority*]
  ),
  [FR-004.1], [The system MUST generate a high-quality image (e.g., 1080x1080px) representing the Persona.], [P1],
  [FR-004.2], [The card MUST include: Name, Archetype, Rarity, Radar Chart of Stats, and a QR Code/Link.], [P1],
  [FR-004.3], [The system MUST provide a unique public URL for the Persona profile that the QR code points to.], [P1],
  [FR-004.4], [The system MUST support downloading the image to the user's device.], [P1],
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
  [NFR-004.1], [Performance], [**Speed:** Card generation MUST complete within 2 seconds to feel responsive. \ *Metric:* < 2s],
  [NFR-004.2], [Aesthetics], [**Branding:** The design MUST adhere to the "Blonix Branch" visual identity (Fuchsia/Blue gradients, glassmorphism). \ *Metric:* Visual Consistency],
  [NFR-004.3], [Compatibility], [**Format:** Generated images MUST be compatible with major social platforms (Instagram, Twitter, TikTok). \ *Metric:* PNG/JPG],
)

#pagebreak()

= 5. System Architecture

== Image Generation Pipeline

The system uses a headless browser approach to ensure pixel-perfect rendering of complex UI elements (gradients, charts) into a static image.

```
┌───────────────┐     ┌───────────────┐     ┌─────────────────┐
│ Client Req    │────▶│ Template Eng  │────▶│ Headless Chrome │
│ (Generate)    │     │ (HTML/CSS)    │     │ (Puppeteer)     │
└───────────────┘     └───────────────┘     └─────────────────┘
                                                     │
                                                     ▼
┌───────────────┐     ┌───────────────┐     ┌─────────────────┐
│ CDN (CloudFront)│◀──│ S3 Storage    │◀────│ Screenshot      │
│ (Public URL)  │     │ (Bucket)      │     │ (Buffer)        │
└───────────────┘     └───────────────┘     └─────────────────┘
```

= 6. API Specification

== Generate Card

*Endpoint:* `POST /v1/personas/{id}/card` \
*Auth:* Bearer Token

*Response (200 OK):*
```json
{
  "imageUrl": "https://cdn.remirai.app/cards/persona-123.png",
  "publicProfileUrl": "https://remirai.app/p/persona-123",
  "expiresAt": "2025-12-24T12:00:00Z"
}
```

= 7. Error Handling

#table(
  columns: (auto, auto, 1fr),
  align: (left, left, left),
  stroke: 0.5pt + gray,
  [*Code*], [*HTTP*], [*Description*],
  table.hline(),
  [`CARD_001`], [404], [Persona not found],
  [`CARD_002`], [500], [Image generation service timeout],
)
