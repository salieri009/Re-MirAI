---
title: Re:MirAI Project Plan
description: Project goals, target audience, core features, and roadmap
version: 1.0.0
last_updated: 2025-11-18
status: active
audience: all
---

# Project Plan: Re:MirAI

## 1. Project Overview

This document outlines the project plan for "Re:MirAI," a web application designed to create a unique AI chatbot persona for a user, based on collective feedback from their friends. The core idea is to answer the question, "How do others see me?" by generating an interactive AI that reflects an "objective" view of the user's personality. 

**Design Philosophy (Blonix Branch Priority):**
*   **Light Theme First:** Clean, bright interface optimized for daytime use and accessibility
*   **Modern Aesthetics:** Fuchsia/Pink primary colors with Blue secondary for a fresh, contemporary feel
*   **User-Centric:** Prioritizes ease of use, clarity, and professional appeal over immersive gaming aesthetics
*   **Accessibility:** High contrast, readable typography (Inter + Poppins), and WCAG-compliant design
*   **Broad Appeal:** Welcoming to users of all backgrounds, not requiring subculture knowledge

The platform will also include social and entertainment features to drive engagement.

## 2. Goals

*   **Primary Goal:** To create an engaging and shareable experience where users can discover and interact with an AI representation of their public persona.
*   **Secondary Goals:**
    *   Achieve viral growth through social sharing of personas and compatibility results.
    *   Establish a platform for unique AI-driven social interactions.
    *   Explore viable monetization strategies through premium features.

## 3. Target Audience (Blonix Branch Priority)

*   **Primary:** General users (all ages) seeking self-discovery through AI-powered personality insights. The platform prioritizes:
    *   **Accessibility:** Light theme with high contrast for optimal readability
    *   **User-friendliness:** Clean, modern interface that doesn't require gaming or subculture knowledge
    *   **Professional appeal:** Suitable for both personal use and professional self-reflection
    *   **Broad appeal:** Accessible to users who prefer bright, welcoming interfaces over dark, immersive themes
*   **Secondary:** 
    *   Teenagers and young adults (10s-20s) active on social media and interested in personality trends (MBTI, horoscopes, etc.)
    *   Writers, creators, and role-players looking for tools to build and define characters

## 4. Core Features

### 4.1. Persona Creation Flow
1.  **User Account:** Users sign up for an account.
2.  **Survey Generation:** The user generates a unique survey link. This survey contains questions designed to capture different facets of their personality (e.g., "How do they act in a crisis?", "What's their sense of humor like?").
3.  **Social Sharing:** The user shares this link with their friends.
4.  **Feedback Collection:** Friends anonymously fill out the survey.
5.  **Persona Synthesis:** The system aggregates the survey responses and synthesizes them into a detailed persona profile. This profile will be used as the foundational prompt for the AI model.
6.  **AI Chatbot Generation:** An AI chatbot is created based on the synthesized persona, with which the user can interact.

### 4.2. Interaction & Visualization
*   **Chat Interface:** A dedicated chat screen where the user can talk to their generated AI persona.
*   **Persona Illustration:** An AI-generated character illustration representing the persona. This could be a simple avatar or a more detailed character portrait.
*   **Gender Toggle:** A feature to see a gender-swapped version of the persona's illustration and potentially its communication style.

### 4.3. Social & Gamification
*   **Persona Compatibility:** Users can see a "compatibility score" between their persona and a friend's persona. This would be presented in an entertaining, shareable format.
*   **Public/Private Profiles:** Users can choose to keep their persona private or share it with friends on the platform.

## 5. Monetization Strategy

The service will be free to use, with revenue generated through premium features:

*   **"Premium Persona" Package:**
    *   Advanced, more detailed character illustration.
    *   Access to more sophisticated personality analysis and reports.
    *   Unlock special interaction modes with the chatbot (e.g., "counselor mode," "debate mode").
*   **"Friend Persona" Access:** A time-limited pass (e.g., "1-week rental") allowing a user to interact with a friend's public persona chatbot.
*   **Compatibility Reports:** While a basic score is free, a detailed compatibility report explaining the dynamics between two personas could be a paid feature.
*   **Ad-Free Experience:** A subscription option to remove in-app advertisements.

## 6. Minimum Viable Product (MVP) Scope

The goal of the MVP is to validate the core concept with minimal development effort.

*   **Features:**
    *   User registration.
    *   Simple, non-customizable survey generation and sharing.
    *   Collection of survey responses.
    *   Basic persona synthesis (e.g., averaging scores, concatenating text responses into a prompt).
    *   A functional chat interface to talk to the generated persona.
*   **Omissions for MVP:**
    *   No AI-generated illustrations.
    *   No gender toggle.
    *   No compatibility features.
    *   No monetization features.

## 7. Future Enhancements

*   **Relationship Context:** Allow survey-takers to specify their relationship to the user (e.g., family, coworker, close friend). This would allow the creation of context-specific personas (e.g., "How my coworkers see me").
*   **Advanced Illustration:** Partner with an image generation AI service to create high-quality, customizable character art.
*   **Group Personas:** Create a "group persona" based on feedback from a whole team or circle of friends.
*   **Gamified Scenarios:** Place the AI persona in randomly generated scenarios (e.g., "How would your persona handle a sudden project deadline?") and let the user guide the outcome, with a scoring/feedback system.
*   **Integration with Other Platforms:** Allow exporting personas for use in other applications (e.g., VRChat, character AI platforms).
