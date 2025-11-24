# F-001: Survey System

**Status:** Active  
**Priority:** P0 (MVP)

## 1. Overview
The Survey System is the core data collection mechanism of Re:MirAI. It allows users to create personalized surveys ("Surveys") and share them with friends to collect anonymous feedback, which serves as the foundation for Persona synthesis.

## 2. Use Cases

### UC-01: Create Survey
**Actor:** User  
**Description:** A user generates a unique survey link to share with friends.  
**Pre-conditions:** User is logged in.  
**Post-conditions:** A unique Survey ID and URL are generated.

### UC-02: Submit Anonymous Feedback
**Actor:** Friend (Respondent)  
**Description:** A friend answers survey questions anonymously.  
**Pre-conditions:** Friend has a valid Survey URL.  
**Post-conditions:** Responses are encrypted and stored; progress bar updates for the User.

### UC-03: Practice Mode
**Actor:** User  
**Description:** A user answers questions themselves to generate a "Proto-Persona" immediately.  
**Pre-conditions:** User is logged in.  
**Post-conditions:** A lower-rarity Persona is generated.

## 3. Functional Requirements (FR)

| ID | Requirement | Priority |
| :--- | :--- | :--- |
| **FR-001.1** | The system MUST generate a unique, shareable URL for each Survey. | P0 |
| **FR-001.2** | The system MUST present a fixed set of 10-15 personality questions. | P0 |
| **FR-001.3** | The system MUST allow respondents to submit answers without creating an account. | P0 |
| **FR-001.4** | The system MUST enforce a minimum threshold of 3 responses before unlocking Persona creation. | P0 |
| **FR-001.5** | The system MUST support "Practice Mode" where the user answers their own survey. | P1 |

## 4. Non-Functional Requirements (NFR)

| ID | Requirement | Metric |
| :--- | :--- | :--- |
| **NFR-001.1** | **Anonymity:** Responses MUST NOT be traceable to a specific respondent IP or device by the User. | Zero PII leakage |
| **NFR-001.2** | **Performance:** Survey link generation MUST complete within 1 second. | < 1s |
| **NFR-001.3** | **Scalability:** The system MUST support 1000 concurrent respondents. | 1000 CCU |
