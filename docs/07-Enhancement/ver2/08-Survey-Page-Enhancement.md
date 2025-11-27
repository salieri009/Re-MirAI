# Survey Page Enhancement Plan (ver2)

**Version:** 2.0.0
**Last Updated:** 2025-11-27
**Status:** 📝 Planning (Design Phase)
**Route:** `/surveys/create` (or `/discovery/new`)
**Component:** `CreateSurveyPage` (Page level)
**Design Systems:** Tailwind Custom Config (Space Grotesk, Custom Colors)

> [!IMPORTANT]
> **Version 2 Design:** This document outlines the **Version 2** enhancement plan. It supersedes previous versions and uses a specific HTML reference implementation as the source of truth for visual design and structure.

---

## 🔴 UX/UI Expert Review (Design Rationale)

### Critical Issues Addressed by ver2 Design

#### 1. Visual Hierarchy & Focus
**Previous State:** Generic form layouts, potentially overwhelming.
**ver2 Solution:**
- **Split Layout:** Clearly separates the "Input" (Form) from the "Outcome" (Link Preview).
- **Surface Distinction:** Uses `bg-surface-dark/50` for the form and a gradient border for the preview area to distinguish context.

#### 2. User Guidance
**Previous State:** Lack of context on what happens next.
**ver2 Solution:**
- **Visual Preview:** The right-hand column explicitly shows "Your Link Will Appear Here," managing user expectations.
- **Clear Actions:** The "Generate Link" button is prominent and uses the `secondary` color (#00C9A7) to signify a positive action.

#### 3. Brand Consistency
**Previous State:** Disconnected from the "Sacred/Mystical" theme.
**ver2 Solution:**
- **Atmosphere:** Retains the radial gradient background (Purple/Green) to maintain the "Digital Mirror" vibe even in utility pages.
- **Typography:** Consistent use of `Space Grotesk`.

---

## Current Implementation Status

### ✅ Design Ready (Reference Implementation)
- **HTML Structure:** Complete layout for the "Create New Discovery Link" page.
- **Styling:** Tailwind CSS configuration defined (Colors, Fonts, Gradients).
- **Assets:** SVG Icons (Logo, Link) and Material Symbols identified.

### ⏳ Pending Implementation
- **React Component Migration:** Converting the static HTML to Next.js/React components.
- **State Management:** Handling form inputs (Survey Name, Template, AI Toggle).
- **Logic Integration:** Wiring the "Generate Link" button to the backend API (`POST /api/surveys`).

---

## Design Compliance

This design adheres to key feature requirements:

### ✅ F-001: Survey System
- **Survey Creation:** Provides fields for naming and template selection.
- **Configuration:** Includes "Advanced Settings" for features like AI Follow-up.
- **Feedback Loop:** Visual placeholder confirms that a link will be the output.

---

## Design Philosophy (ver2)

**Core Concept:** **"The Architect's Canvas"** — Where the user constructs the mirror for others to look into.

**Visual Identity:**
- **Palette:** `background-dark` (#141118) base with `surface-dark` (#1d1724) panels.
- **Accents:** `secondary` (#00C9A7) for primary actions (Creation/Generation), `primary` (#845EC2) for brand elements.
- **Texture:** Subtle grid patterns (`bg-grid-white/5`) in the preview area to suggest a "blueprint" or "digital construct."

---

## Executive Summary

The Version 2 Survey Page Enhancement focuses on streamlining the "Discovery Link" creation process. By adopting a two-column layout that visually separates input from output, the design reduces cognitive load and clarifies the user journey. The aesthetic remains consistent with the "Digital Mirror" brand, utilizing dark themes, gradients, and glass-like surfaces to make even administrative tasks feel immersive.

---

## Reference Implementation (Target Design)

The following HTML structure is the **definitive source of truth** for the ver2 visual design.

```html
<!DOCTYPE html>

<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Re:MirAI - Create New Discovery Link</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com" rel="preconnect"/>
<link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<style>
        .material-symbols-outlined {
            font-variation-settings:
            'FILL' 0,
            'wght' 400,
            'GRAD' 0,
            'opsz' 24
        }
    </style>
<script id="tailwind-config">
      tailwind.config = {
        darkMode: "class",
        theme: {
          extend: {
            colors: {
              "primary": "#845EC2",
              "secondary": "#00C9A7",
              "highlight": "#C197FF",
              "success": "#005B44",
              "background-light": "#f7f6f8",
              "background-dark": "#141118",
              "surface-dark": "#1d1724"
            },
            fontFamily: {
              "display": ["Space Grotesk", "sans-serif"]
            },
            borderRadius: {"DEFAULT": "0.5rem", "lg": "0.75rem", "xl": "1rem", "full": "9999px"},
          },
        },
      }
    </script>
</head>
<body class="font-display bg-background-dark text-white">
<div class="relative flex h-auto min-h-screen w-full flex-col bg-background-dark group/design-root overflow-x-hidden" style="background-image: radial-gradient(circle at top left, rgba(132, 94, 194, 0.1), transparent 30%), radial-gradient(circle at bottom right, rgba(0, 201, 167, 0.1), transparent 30%);">
<div class="layout-container flex h-full grow flex-col">
<div class="px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40 flex flex-1 justify-center py-5">
<div class="layout-content-container flex flex-col w-full max-w-7xl flex-1">
<header class="flex items-center justify-between whitespace-nowrap border-b border-solid border-white/10 px-4 md:px-10 py-4 mb-10">
<div class="flex items-center gap-4 text-white">
<div class="size-6 text-primary">
<svg fill="none" viewbox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_6_543)">
<path d="M42.1739 20.1739L27.8261 5.82609C29.1366 7.13663 28.3989 10.1876 26.2002 13.7654C24.8538 15.9564 22.9595 18.3449 20.6522 20.6522C18.3449 22.9595 15.9564 24.8538 13.7654 26.2002C10.1876 28.3989 7.13663 29.1366 5.82609 27.8261L20.1739 42.1739C21.4845 43.4845 24.5355 42.7467 28.1133 40.548C30.3042 39.2016 32.6927 37.3073 35 35C37.3073 32.6927 39.2016 30.3042 40.548 28.1133C42.7467 24.5355 43.4845 21.4845 42.1739 20.1739Z" fill="currentColor"></path>
<path clip-rule="evenodd" d="M7.24189 26.4066C7.31369 26.4411 7.64204 26.5637 8.52504 26.3738C9.59462 26.1438 11.0343 25.5311 12.7183 24.4963C14.7583 23.2426 17.0256 21.4503 19.238 19.238C21.4503 17.0256 23.2426 14.7583 24.4963 12.7183C25.5311 11.0343 26.1438 9.59463 26.3738 8.52504C26.5637 7.64204 26.4411 7.31369 26.4066 7.24189C26.345 7.21246 26.143 7.14535 25.6664 7.1918C24.9745 7.25925 23.9954 7.5498 22.7699 8.14278C20.3369 9.32007 17.3369 11.4915 14.4142 14.4142C11.4915 17.3369 9.32007 20.3369 8.14278 22.7699C7.5498 23.9954 7.25925 24.9745 7.1918 25.6664C7.14534 26.143 7.21246 26.345 7.24189 26.4066ZM29.9001 10.7285C29.4519 12.0322 28.7617 13.4172 27.9042 14.8126C26.465 17.1544 24.4686 19.6641 22.0664 22.0664C19.6641 24.4686 17.1544 26.465 14.8126 27.9042C13.4172 28.7617 12.0322 29.4519 10.7285 29.9001L21.5754 40.747C21.6001 40.7606 21.8995 40.931 22.8729 40.7217C23.9424 40.4916 25.3821 39.879 27.0661 38.8441C29.1062 37.5904 31.3734 35.7982 33.5858 33.5858C35.7982 31.3734 37.5904 29.1062 38.8441 27.0661C39.879 25.3821 40.4916 23.9425 40.7216 22.8729C40.931 21.8995 40.7606 21.6001 40.747 21.5754L29.9001 10.7285ZM29.2403 4.41187L43.5881 18.7597C44.9757 20.1473 44.9743 22.1235 44.6322 23.7139C44.2714 25.3919 43.4158 27.2666 42.252 29.1604C40.8128 31.5022 38.8165 34.012 36.4142 36.4142C34.012 38.8165 31.5022 40.8128 29.1604 42.252C27.2666 43.4158 25.3919 44.2714 23.7139 44.6322C22.1235 44.9743 20.1473 44.9757 18.7597 43.5881L4.41187 29.2403C3.29027 28.1187 3.08209 26.5973 3.21067 25.2783C3.34099 23.9415 3.8369 22.4852 4.54214 21.0277C5.96129 18.0948 8.43335 14.7382 11.5858 11.5858C14.7382 8.43335 18.0948 5.9613 21.0277 4.54214C22.4852 3.8369 23.9415 3.34099 25.2783 3.21067C26.5973 3.08209 28.1187 3.29028 29.2403 4.41187Z" fill="currentColor" fill-rule="evenodd"></path>
</g>
<defs><clippath id="clip0_6_543"><rect fill="white" height="48" width="48"></rect></clippath></defs>
</svg>
</div>
<h2 class="text-white text-xl font-bold leading-tight tracking-[-0.015em]">Re:MirAI</h2>
</div>
<div class="hidden md:flex flex-1 justify-end gap-8">
<div class="flex items-center gap-9">
<a class="text-white/70 hover:text-white text-sm font-medium leading-normal transition-colors" href="#">Dashboard</a>
<a class="text-secondary text-sm font-medium leading-normal relative" href="#">Surveys<span class="absolute -bottom-1 left-0 w-full h-0.5 bg-secondary"></span></a>
<a class="text-white/70 hover:text-white text-sm font-medium leading-normal transition-colors" href="#">Profile</a>
</div>
</div>
</header>
<main class="flex flex-col flex-grow">
<div class="flex flex-wrap justify-between gap-3 p-4 mb-6">
<h1 class="text-white text-4xl lg:text-5xl font-bold leading-tight tracking-tighter min-w-72">Create a New Discovery Link</h1>
</div>
<div class="grid grid-cols-1 lg:grid-cols-5 gap-8 px-4">
<!-- Left: Form -->
<div class="lg:col-span-3 bg-surface-dark/50 border border-white/10 rounded-xl p-6 sm:p-8 flex flex-col gap-8">
<h3 class="text-white text-xl font-bold leading-tight tracking-[-0.015em]">Survey Details</h3>
<div class="flex flex-col gap-6">
<label class="flex flex-col w-full">
<p class="text-white/90 text-base font-medium leading-normal pb-2">Name this survey</p>
<input class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-2 focus:ring-highlight/50 border border-white/20 bg-[#211c27] focus:border-highlight h-14 placeholder:text-white/40 p-4 text-base font-normal leading-normal transition-all" placeholder="e.g., 'Team Synergy Check-in'" value=""/>
</label>
<label class="flex flex-col w-full">
<p class="text-white/90 text-base font-medium leading-normal pb-2">Choose a question template</p>
<select class="form-select appearance-none w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-2 focus:ring-highlight/50 border border-white/20 bg-[#211c27] focus:border-highlight h-14 bg-no-repeat bg-right-4 placeholder:text-white/40 px-4 py-3 text-base font-normal leading-normal transition-all" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuD4QU5h4xbW2zMLLIqAS7-fSjNoSB5ZAWBqXN8H1-0s9xfUE-wdxhRGKj2_DcGZxZGDJskUrJuT65tXnAXgUlXBIZ416mEMuqvzNWF6tkn_7inzxTkhT24YIIJI5qlDHcyeMnKsIMbpg8_PHA4oQi-VqHxCfCRIyjdgiXLTU00kZER9PsD1FZi3GiJ7gZuMBTrVR2GVpmbmvAIlkocIxMF8awYDx_MLCFN3XfvnXG1Rcp25U_a5khhQFk_QtkN7e7_2QGPQTlSL03c");'>
<option class="bg-[#211c27]" selected="">Select a template</option>
<option class="bg-[#211c27]" value="one">Team Morale Survey</option>
<option class="bg-[#211c27]" value="two">Customer Feedback V1</option>
<option class="bg-[#211c27]" value="three">Product-Market Fit Analysis</option>
</select>
</label>
</div>
<div class="border-t border-white/10 pt-8 flex flex-col gap-4">
<h4 class="text-white/90 text-base font-medium leading-normal">Advanced Settings</h4>
<div class="flex items-center justify-between p-4 bg-[#211c27] border border-white/20 rounded-lg">
<span class="text-white">Enable AI Follow-up Questions</span>
<label class="relative inline-flex items-center cursor-pointer">
<input checked="" class="sr-only peer" type="checkbox" value=""/>
<div class="w-11 h-6 bg-white/30 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary"></div>
</label>
</div>
</div>
<div class="mt-4">
<button class="flex w-full items-center justify-center gap-2 rounded-lg bg-secondary px-8 py-4 text-center text-base font-bold text-black shadow-lg shadow-secondary/20 transition-all hover:bg-secondary/90 hover:shadow-secondary/30">
<span>Generate Link</span>
<span class="material-symbols-outlined text-xl">arrow_forward</span>
</button>
</div>
</div>
<!-- Right: Link Display -->
<div class="lg:col-span-2 bg-gradient-to-br from-primary/30 to-secondary/30 p-1 rounded-xl shadow-2xl shadow-primary/10">
<div class="relative flex flex-col items-center justify-center bg-surface-dark h-full w-full rounded-lg text-center p-8 overflow-hidden">
<div class="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(to_bottom,white,transparent)]"></div>
<div class="relative z-10 flex flex-col items-center justify-center gap-6">
<div class="p-4 bg-primary/20 rounded-full">
<div class="p-3 bg-primary/40 rounded-full">
<span class="material-symbols-outlined text-4xl text-highlight">link</span>
</div>
</div>
<div class="flex flex-col gap-2">
<h4 class="text-xl font-bold text-white">Your Link Will Appear Here</h4>
<p class="text-sm text-white/60 max-w-xs">Complete the survey details to generate a unique discovery link.</p>
</div>
</div>
</div>
</div>
</div>
</main>
</div>
</div>
</div>
</div>
</body></html>
```

---

## Purpose-Driven UX Design

### Detailed UX/UI Analysis (ver2)

### Strengths
- **Contextual Clarity:** The "Active" state on the "Surveys" nav item (underline) helps users know exactly where they are.
- **Visual Feedback:** The toggle switch for AI settings provides clear on/off status with color changes (`peer-checked:bg-secondary`).
- **Aesthetic Integration:** The form inputs use a dark background (`bg-[#211c27]`) that blends seamlessly with the page, avoiding the "jarring white box" effect.

### Enhancement Goals
- **Dynamic Preview:** When the user types the survey name, update the "Your Link Will Appear Here" text to show a mock URL (e.g., `re-mir.ai/s/team-synergy`).
- **Template Details:** When a template is selected, show a small tooltip or summary of what that template includes.

---

## Implementation Plan

### 1. Component Breakdown
- `atoms/Input.tsx`: Reusable dark-themed input fields.
- `atoms/Toggle.tsx`: The AI settings switch.
- `molecules/NavHeader.tsx`: The top navigation bar.
- `organisms/CreateSurveyForm.tsx`: The left-column form logic.
- `organisms/LinkPreview.tsx`: The right-column visual feedback.

### 2. Tailwind Configuration
- **Colors:** Add `surface-dark` (#1d1724) and `highlight` (#C197FF) to `tailwind.config.js`.
- **Utilities:** Ensure `bg-grid-white/5` (background pattern) is available or added via plugin/custom CSS.

### 3. Asset Integration
- **Icons:** `arrow_forward`, `link` (Material Symbols).
- **Background:** Radial gradient CSS class or inline style.

### 4. Animation Specifications (Form UX Focus)

**Framework**: Next.js 14+, React 18+, TypeScript, GSAP 3.x

**Animation Philosophy**: Build confidence through immediate visual feedback. Reduce form anxiety with clear success indicators.

#### 4.1 Link Preview Live Update

**Trigger**: User types in survey name input

```typescript
'use client';

const [surveyName, setSurveyName] = useState('');
const [previewUrl, setPreviewUrl] = useState('');
const linkPreviewRef = useRef<HTMLDivElement>(null);

const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const value = e.target.value;
  setSurveyName(value);
  
  // Generate slug
  const slug = value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  const url = slug ? `remirai.app/s/${slug}` : '';
  
  setPreviewUrl(url);
  
  // Animate link preview appearance
  if (url && !reducedMotion && linkPreviewRef.current) {
    gsap.from(linkPreviewRef.current, {
      opacity: 0,
      y: -10,
      duration: 0.3,
      ease: 'power2.out'
    });
  }
};
```

**Visual Effect**: URL materializes as user types (reduces uncertainty)

#### 4.2 Copy Link Success Animation

**Trigger**: User clicks "Copy Link" button

```typescript
const copyButtonRef = useRef<HTMLButtonElement>(null);

const handleCopyLink = async () => {
  await navigator.clipboard.writeText(previewUrl);
  
  // Success feedback
  if (copyButtonRef.current && !reducedMotion) {
    gsap.timeline()
      .to(copyButtonRef.current, {
        scale: 0.9,
        duration: 0.1
      })
      .to(copyButtonRef.current, {
        scale: 1.1,
        backgroundColor: '#00c9a7', // Success color
        duration: 0.2,
        ease: 'back.out(1.7)'
      })
      .to(copyButtonRef.current, {
        scale: 1,
        duration: 0.2
      });
  }
  
  // Visual checkmark
  setShowCheckmark(true);
  setTimeout(() => setShowCheckmark(false), 2000);
  
  toast.success('Link copied!');
  announce('Survey link copied to clipboard', 'polite');
};
```

#### 4.3 Form Validation Feedback

**Input Error State**:
```typescript
{errors.surveyName && (
  <motion.p
    className="error-message"
    initial={{ opacity: 0, y: -5 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0 }}
  >
    {errors.surveyName}
  </motion.p>
)}
```

**Success Animation** (on submit):
```typescript
const handleSubmit = async () => {
  // ... validation
  
  if (!reducedMotion && formRef.current) {
    gsap.to(formRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.3,
      onComplete: () => {
        router.push(`/dashboard/surveys/${newSurveyId}`);
      }
    });
  } else {
    router.push(`/dashboard/surveys/${newSurveyId}`);
  }
};
```

#### 4.4 Template Selection Animation

**Card Selection**:
```typescript
const templateRefs = useRef<Record<string, HTMLDivElement>>({});

const handleTemplateSelect = (templateId: string) => {
  Object.values(templateRefs.current).forEach(card => {
    gsap.to(card, {
      scale: 1,
      borderColor: 'transparent',
      duration: 0.2
    });
  });
  
  const selectedCard = templateRefs.current[templateId];
  if (selectedCard && !reducedMotion) {
    gsap.to(selectedCard, {
      scale: 1.05,
      borderColor: '#00c9a7',
      duration: 0.3,
      ease: 'back.out(1.7)'
    });
  }
  
  setSelectedTemplate(templateId);
};
```

#### 4.5 Checklist

- ⚠️ Live URL preview (RECOMMENDED)
- ⚠️ Copy success animation (RECOMMENDED)
- ⚠️ Form validation feedback (RECOMMENDED)
- ⚠️ Template selection (RECOMMENDED)
- ✅ Reduced motion support
- ✅ Screen reader announcements

**Focus**: Micro-interactions that build user confidence during form filling
