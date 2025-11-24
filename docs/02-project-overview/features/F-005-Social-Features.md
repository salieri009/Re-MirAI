# F-005: Social Features

**Status:** Active  
**Priority:** P2 (Phase 2)

## 1. Overview
Social Features extend the solitary experience of chatting with a Persona into a community experience. This includes public profiles, compatibility matching between friends' Personas, and visiting friends' rooms.

## 2. Use Cases

### UC-01: Check Compatibility
**Actor:** User  
**Description:** User compares their Persona with a friend's Persona to see their "Chemistry".  
**Pre-conditions:** Both users have Personas.  
**Post-conditions:** A compatibility score (0-100) and analysis are displayed.

### UC-02: Visit Friend's Room
**Actor:** User  
**Description:** User visits the public profile/room of a friend's Persona.  
**Pre-conditions:** Friend's profile is Public.  
**Post-conditions:** User can see friend's Persona and leave a "Gift".

## 3. Functional Requirements (FR)

| ID | Requirement | Priority |
| :--- | :--- | :--- |
| **FR-005.1** | The system MUST calculate a Compatibility Score based on stat alignment and archetype interactions. | P2 |
| **FR-005.2** | The system MUST generate a text description of the relationship dynamic (e.g., "Opposites Attract"). | P2 |
| **FR-005.3** | The system MUST support Public/Private visibility settings for user profiles. | P2 |

## 4. Non-Functional Requirements (NFR)

| ID | Requirement | Metric |
| :--- | :--- | :--- |
| **NFR-005.1** | **Privacy:** Users MUST explicitly opt-in to make their profile public. | Privacy First |
| **NFR-005.2** | **Latency:** Compatibility checks MUST return results within 1 second. | < 1s |
