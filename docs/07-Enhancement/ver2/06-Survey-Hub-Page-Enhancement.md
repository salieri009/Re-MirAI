# Survey Hub Page Enhancement (v2)

**Version:** 2.0.0
**Last Updated:** 2025-11-27
**Status:** 📝 Planning (Design Phase)
**Route:** `/dashboard/surveys` (formerly `/dashboard/ritual`)
**Component:** `SurveyHubPage` (Page level)
**Design Systems:** Tailwind Custom Config (Space Grotesk, Custom Colors)

> [!IMPORTANT]
> **Renaming Notice:** This page was formerly known as "Ritual Hub". In Version 2, it is unified under the name **"Survey Hub"** to more clearly communicate its purpose: managing surveys and tracking responses.

---

## 🔴 UX/UI Expert Review (Design Rationale)

### Critical Issues Addressed by ver2 Design

#### 1. Terminology Clarity
**Previous State:** "Ritual Hub" was thematic but vague. Users didn't immediately know it was for managing surveys.
**ver2 Solution:**
- **Explicit Naming:** "Survey Hub" clearly indicates the function: a central place to manage all your surveys.
- **Action-Oriented:** Focuses on "Manage," "Track," and "Share."

#### 2. Management Efficiency
**Previous State:** Mixed metaphors (Echoes vs Responses), unclear purpose.
**ver2 Solution:**
- **Unified Dashboard:** A clean list or grid view of active surveys with status badges.
- **Quick Actions:** One-click copy link, view results, share, and delete surveys.

#### 3. Progress Visibility
**Previous State:** Users had to navigate to each survey to see progress.
**ver2 Solution:**
- **At-a-Glance Metrics:** Each survey card shows response count, completion status, and share count.
- **Smart Sorting:** Automatically prioritizes surveys that need attention (low response count, expiring soon).

---

## Current Implementation Status

### ⏳ Pending Implementation
- **Renaming:** Update route from `/dashboard/ritual` to `/dashboard/surveys`.
- **Component Update:** Rename `RitualHubPage` to `SurveyHubPage`.
- **UI Refresh:** Apply the ver2 "Digital Mirror" aesthetic (Dark/Glassmorphism) to the management table/grid.
- **HTML Reference Needed:** Awaiting design reference for the Survey Hub list/grid layout.

---

## Design Compliance

This design adheres to key feature requirements:

### ✅ F-001: Survey System
- **Management:** Users can view all created surveys in one place.
- **Tracking:** Real-time response counts for each survey.
- **Sharing:** Quick access to sharing links for each survey.
- **Lifecycle:** Create, monitor, and delete surveys.

### ✅ F-005: Social Features
- **Virality:** Easy access to social sharing tools for each survey.
- **Progress Motivation:** Visual indicators encourage users to share more.

---

## Design Philosophy (ver2)

**Core Concept:** **"The Control Center"** — The command bridge from which users orchestrate their multiple digital reflections.

**Visual Identity:**
- **Palette:** Consistent with Dashboard and Survey Page (`background-dark` #141118, `surface-dark` #1d1724).
- **Typography:** `Space Grotesk` for headers, clear sans-serif for data.
- **Layout:** Card-based grid for multiple surveys, with clear status indicators.

---

## Executive Summary

The Survey Hub is the central management console for the user's data collection efforts. By renaming it from "Ritual Hub," we reduce cognitive load and align the terminology with the user's mental model of "creating and managing surveys." 

The page will feature a modern, dark-themed card grid of active surveys, providing instant access to:
- Response progress (X/3 minimum)
- Share count and links
- Time since creation
- Quick actions (Copy Link, View Results, Share, Delete)

This consolidation ensures users can monitor all their surveys without navigating through multiple pages.

---

## Comparison: Survey Hub vs Survey Page

To clarify the distinction:

| Feature | **Survey Hub** | **Survey Page** |
|---------|----------------|-----------------|
| **Purpose** | Manage existing surveys | Create new surveys |
| **Route** | `/dashboard/surveys` | `/surveys/create` |
| **Primary Action** | View progress, share links | Fill form, generate link |
| **User Intent** | "How's my survey doing?" | "I want to create a survey" |
| **Key Metrics** | Response count, share count | Survey configuration |

---

## Implementation Plan

### 1. Component Breakdown
- `atoms/SurveyCard.tsx`: Individual survey card with metrics
- `atoms/StatusBadge.tsx`: "Collecting" / "Ready" / "Expired" status
- `molecules/SurveyActions.tsx`: Copy, Share, Delete buttons
- `organisms/SurveyGrid.tsx`: Grid layout of survey cards
- `pages/SurveyHubPage.tsx`: Main page container

### 2. Tailwind Configuration
- **Colors:** Reuse `background-dark`, `surface-dark`, `primary`, `secondary` from other ver2 pages.
- **Grid:** Responsive grid (1 col mobile, 2 cols tablet, 3 cols desktop).

### 3. Asset Integration
- **Icons:** Material Symbols for actions (copy, share, delete, etc.)
- **Empty State:** Illustration for "No surveys yet" state.

### 4. Animation Specifications (Dashboard Focus)

**Framework**: Next.js 14+, React 18+, TypeScript, GSAP 3.x

**Animation Philosophy**: Organize information clearly. Guide user attention to surveys needing action.

#### 4.1 Card Grid Entrance (Stagger)

```typescript
'use client';

const { data: surveys } = useQuery({
  queryKey: ['surveys'],
  queryFn: () => surveyApi.getAll()
});

useEffect(() => {
  if (surveys && !reducedMotion) {
    gsap.from('.survey-card', {
      opacity: 0,
      y: 20,
      duration: 0.4,
      stagger: 0.08, // 80ms between cards
      ease: 'power2.out'
    });
  }
}, [surveys, reducedMotion]);
```

#### 4.2 Copy Link Success

```typescript
const handleCopyLink = async (surveyId: string) => {
  const url = `${window.location.origin}/s/${surveyId}`;
  await navigator.clipboard.writeText(url);
  
  const button = copyButtonRefs.current[surveyId];
  if (button && !reducedMotion) {
    gsap.timeline()
      .to(button, { scale: 0.9, duration: 0.1 })
      .to(button, { 
        scale: 1.1, 
        backgroundColor: '#00c9a7',
        duration: 0.2,
        ease: 'back.out(1.7)'
      })
      .to(button, { scale: 1, duration: 0.2 });
  }
  
  toast.success('Link copied!');
};
```

#### 4.3 Delete Confirmation

```typescript
const handleDelete = async (surveyId: string) => {
  const card = cardRefs.current[surveyId];
  
  if (card && !reducedMotion) {
    gsap.to(card, {
      opacity: 0,
      x: -20,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: async () => {
        await surveyApi.delete(surveyId);
        queryClient.invalidateQueries(['surveys']);
      }
    });
  } else {
    await surveyApi.delete(surveyId);
    queryClient.invalidateQueries(['surveys']);
  }
};
```

#### 4.4 Progress Bar Animation

```typescript
<div className="progress-bar">
  <motion.div
    className="progress-fill"
    initial={{ width: 0 }}
    animate={{ width: `${(responses / 3) * 100}%` }}
    transition={{ duration: 0.8, ease: 'easeOut' }}
  />
</div>
```

#### 4.5 Checklist

- ⚠️ Card grid stagger (RECOMMENDED)
- ⚠️ Copy link success animation (RECOMMENDED)
- ⚠️ Delete slide-out animation (RECOMMENDED)
- ⚠️ Progress bar growth animation (RECOMMENDED)
- ✅ Reduced motion support
- ✅ TanStack Query for data

**Focus**: Dashboard clarity with subtle, informative animations
