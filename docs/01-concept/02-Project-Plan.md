---
title: Re:MirAI Product Requirements Document (PRD)
description: Comprehensive product requirements, MVP scope, and functional specifications.
version: 2.0.0
last_updated: 2025-11-24
status: active
audience: product-team, developers, stakeholders
---

# Product Requirements Document: Re:MirAI

## 1. Overview

### 1.1. Product Vision
**Re:MirAI** is an AI-powered platform designed to help individuals discover their "external self" through the eyes of others. By collecting anonymous feedback from friends through a "Survey", the system synthesizes a unique AI Persona that embodies the user's public image.

### 1.2. Problem Statement
*   **Self-Perception Gap:** Individuals often lack an objective view of how they are perceived by their social circle.
*   **Feedback Friction:** Friends are often hesitant to provide honest, direct feedback due to social awkwardness or fear of offending.
*   **Static Tools:** Existing personality tests are self-reported and lack dynamic, interactive feedback.

### 1.3. Solution
A gamified, privacy-first platform where users collect anonymous feedback to "create" an AI persona. This persona acts as a mirror, allowing users to interact with their public image in a safe, engaging environment.

---

## 2. Objectives & Success Metrics

### 2.1. Business Objectives
*   **Viral Growth:** Leverage the "Survey" sharing mechanic to drive organic user acquisition.
*   **Engagement:** Create a daily habit loop through Persona chatting and bonding.
*   **Monetization:** Establish a foundation for premium features (skins, advanced models) in later phases.

### 2.2. Key Performance Indicators (KPIs)
*   **Acquisition:** 10,000 Registered Users in Phase 1.
*   **Activation:** >60% of created Surveys receiving ≥3 responses.
*   **Retention:** >40% Day-7 Retention Rate.
*   **Virality:** K-factor > 1.1 (Each user invites >1 friend).

---

## 3. User Personas

### 3.1. Primary: The Self-Explorer (Maya)
*   **Demographics:** 20-30s, Student or Young Professional.
*   **Motivation:** Genuine curiosity about self-improvement and social perception.
*   **Behavior:** Values deep insights, reads detailed reports, likely to chat extensively with the Persona.

### 3.2. Secondary: The Social Sharer (Alex)
*   **Demographics:** 15-25s, Social Media Active.
*   **Motivation:** Content creation, sharing aesthetic results, "flexing" unique Personas.
*   **Behavior:** Focuses on the visual "Persona Card" and compatibility features.

---

## 4. Scope & Features

### 4.1. Phase 1: MVP (Minimum Viable Product)
*Focus: Core Loop Validation (Survey -> Create Persona -> Chat)*

| Feature ID | Feature Name | Description | Priority |
| :--- | :--- | :--- | :--- |
| **FR-01** | **User Auth** | Google OAuth login/signup. | P0 |
| **FR-02** | **Survey Creation** | Generate unique, shareable survey links. | P0 |
| **FR-03** | **Anonymous Feedback** | Interface for friends to answer questions without login. | P0 |
| **FR-04** | **Threshold System** | Lock persona creation until 3 responses are collected. | P0 |
| **FR-05** | **Persona Synthesis** | AI analysis of responses to generate personality prompt. | P0 |
| **FR-06** | **Chat Interface** | Text-based chat with the generated Persona. | P0 |
| **FR-07** | **Basic Dashboard** | View progress, access chat, view basic stats. | P1 |

### 4.2. Phase 2: Engagement & Visuals (Post-MVP)
*Focus: Retention and Virality*

*   **AI Illustrations:** Generative art for Personas.
*   **Social Sharing:** Exportable "Persona Cards" for Instagram/Twitter.
*   **Compatibility Matching:** Compare two Personas for chemistry.
*   **Bond System:** Unlockable content based on chat frequency.

### 4.3. Out of Scope (Initial Roadmap)
*   Native Mobile App (Web-only for MVP).
*   Voice Interaction.
*   Real-time Multiplayer Rooms.
*   Paid Subscriptions.

---

## 5. Functional Requirements

### 5.1. The Survey
*   **Input:** User generates a link.
*   **Process:** Respondents answer 5-10 psychometric questions (e.g., "What is this person's role in a party?").
*   **Constraint:** Responses must be encrypted and anonymized. The user **never** sees individual answers.

### 5.2. Persona Synthesis Engine
*   **Input:** Aggregated survey data (Stats: Charisma, Kindness, etc.).
*   **Process:**
    1.  Calculate Stat Averages.
    2.  Determine Archetype (e.g., "The Protector").
    3.  Generate System Prompt for LLM (e.g., "You are a protective, slightly stern older sibling figure...").
*   **Output:** A persistent AI character profile.

### 5.3. Chat System
*   **Model:** OpenAI GPT-4o or GPT-3.5-Turbo.
*   **Context:** Must retain conversation history (up to N tokens) to maintain illusion of memory.
*   **Safety:** Moderation layer to prevent generation of harmful or explicit content.

---

## 6. Non-Functional Requirements

### 6.1. Performance
*   **Page Load:** < 1.5s (First Contentful Paint).
*   **Chat Latency:** < 2s per message.
*   **Persona Creation Time:** < 30s for initial generation.

### 6.2. Security & Privacy
*   **Anonymity:** Strict separation of Respondent ID from Response Data in the UI.
*   **Data Protection:** GDPR compliant handling of personal data.
*   **Auth:** Secure session management via JWT/NextAuth.

### 6.3. Design Philosophy (Blonix Branch)
*   **Theme:** Light Mode Default (Accessibility First).
*   **Palette:** Fuchsia (#d946ef) & Blue (#3b82f6).
*   **Typography:** Inter (UI) + Poppins (Headings).

---

## 7. Risks & Mitigation

| Risk | Impact | Mitigation Strategy |
| :--- | :--- | :--- |
| **Low Response Rate** | High | "Nudge" features, pre-written social share text, low friction for respondents (no login). |
| **Offensive Personas** | High | Strict system prompts, content moderation API, "Regenerate" option. |
| **API Costs** | Medium | Token usage limits per user, caching, use cheaper models for general chat. |
| **Privacy Trust** | High | Clear "Anonymous" badging, transparent privacy policy. |
