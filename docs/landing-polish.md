# Landing Audit + Plan (Implemented)

## Summary
The landing was refactored into a single data-driven flow focused on one main conversion path (`Join group`) and one secondary lead magnet (`Get checklist`). The new structure uses a consistent "Integration Pass / friendly bureaucracy" narrative and adds a mini-courses upsell that feeds directly into the final application form.

## What Changed and Why

### 1) Visual Storytelling
- Introduced a coherent narrative across the page with 3 distinct hero moments:
  - Hero + Integration Pass card.
  - Friendly bureaucracy checkpoints section.
  - Groups scarcity section.
- Added a visually distinct dark upsell section for mini-courses to break rhythm and improve memorability.
- Unified section styles with reusable surface variants instead of repeating identical white cards.

### 2) Unified Scarcity System
- Implemented one shared component: `ScarcityStamp`.
- Reused in:
  - `TopUrgencyBar`.
  - `IntegrationPassCard` in hero.
  - Every group card in `GroupsSection`.
- Scarcity now includes a stamp-style element + seat meter, not only text pills.

### 3) Mini-Courses Upsell
- Added prominent `MiniCoursesCarousel` with 3 required mini-courses:
  - "Німецька у лікаря / в лікарні"
  - "Німецька для Jobcenter і Behörden"
  - "Німецька для роботи та співбесіди"
- Added `MiniCourseModal` mini-landing with:
  - outcomes,
  - what's inside,
  - honest "who it's not for" block,
  - add/remove action.
- Add-on state is persisted via URL (`addons`) + localStorage and auto-populates `FinalApplicationForm`.

### 4) Funnel Clarity
- Removed repeated competing end-game sections and sticky duplicate CTA pressure.
- Consolidated the conversion end into one final block:
  - secondary checklist card,
  - primary final application form.
- Maintained clear CTA hierarchy throughout sections.

### 5) Purposeful Motion
- Added animation tokens in `animation-tokens.ts`.
- Implemented required motion behavior:
  - top urgency bar subtle slide-in,
  - one-time scan-line on Integration Pass card,
  - one-time stamp animation in scarcity,
  - staggered reveals for card groups,
  - mini-courses section float-in,
  - hover micro-interactions for cards/buttons.
- Added reduced-motion fallback using both Framer's `useReducedMotion` and CSS `prefers-reduced-motion`.

### 6) Data-Driven Refactor
- Introduced `content/landing.ts` as source of truth for locale-specific sections and mini-course business model.
- Page composition now renders from that model through dedicated components.

### 7) SEO and Technical Quality
- FAQ JSON-LD is preserved and regenerated per locale.
- `document.documentElement.lang` updates with locale switch (`uk`/`ru`).
- Founder photo rendered through `next/image` using raster source.

## Files Added
- `content/landing.ts`
- `app/components/landing/TopUrgencyBar.tsx`
- `app/components/landing/ScarcityStamp.tsx`
- `app/components/landing/IntegrationPassCard.tsx`
- `app/components/landing/MiniCoursesCarousel.tsx`
- `app/components/landing/MiniCourseModal.tsx`
- `app/components/landing/FinalApplicationForm.tsx`
- `app/components/landing/LeadChecklistCard.tsx`
- `app/components/landing/StoryMomentsSection.tsx`
- `app/components/landing/GroupsSection.tsx`
- `app/components/landing/animation-tokens.ts`
- `docs/landing-polish.md`

## Files Updated
- `app/page.tsx`
- `app/globals.css`

