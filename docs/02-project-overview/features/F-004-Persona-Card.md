# F-004: Persona Card

**Status:** Active  
**Priority:** P1 (Post-MVP)

## 1. Overview
The Persona Card is a shareable visual asset that summarizes a Persona's key attributes. It is designed for social media sharing (Instagram, Twitter) to drive viral growth and user acquisition.

## 2. Use Cases

### UC-01: Generate Persona Card
**Actor:** User  
**Description:** User requests a shareable image of their Persona.  
**Pre-conditions:** Persona exists.  
**Post-conditions:** A PNG/JPG image is generated and displayed.

### UC-02: Share to Social Media
**Actor:** User  
**Description:** User shares the generated card directly to a social platform.  
**Pre-conditions:** Card is generated.  
**Post-conditions:** Image is posted to external platform with a link back to Re:MirAI.

## 3. Functional Requirements (FR)

| ID | Requirement | Priority |
| :--- | :--- | :--- |
| **FR-004.1** | The system MUST generate a high-quality image (e.g., 1080x1080px) representing the Persona. | P1 |
| **FR-004.2** | The card MUST include: Name, Archetype, Rarity, Radar Chart of Stats, and a QR Code. | P1 |
| **FR-004.3** | The system MUST provide a unique public URL for the Persona profile. | P1 |

## 4. Non-Functional Requirements (NFR)

| ID | Requirement | Metric |
| :--- | :--- | :--- |
| **NFR-004.1** | **Performance:** Card generation MUST complete within 2 seconds. | < 2s |
| **NFR-004.2** | **Aesthetics:** The design MUST adhere to the "Blonix Branch" visual identity (Fuchsia/Blue). | Visual Consistency |
