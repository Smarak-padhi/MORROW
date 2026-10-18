# Technical Requirements Document — Morrow v1.0

## Stack
Vite + React + TypeScript, CSS custom properties, SVG scene art, localStorage for progress. No backend in initial slice. Optional future Motion for scene transitions; Web Audio API only after user gesture. Static hosting on Vercel/Cloudflare Pages/GitHub Pages.

## Architecture
`src/main.tsx` mounts `App`; `src/App.tsx` owns navigation and state; `src/story.ts` holds typed chapters and narrative; `src/styles.css` is the single design-token source. Build isolated `WorldMap`, `Dialogue`, `StitchGame`, `AudioToggle` components as scope grows. Keep canonical story data separate from presentation.

## State model
`completed: string[]`, `activeChapter: string`, `easterEgg: boolean`, `muted: boolean`, `visits: number`. localStorage key `morrow-v1`; parse defensively, validate known chapter IDs, never store private user data. All scenes derive unlock state from completed chapters. Reset always available. Current prototype uses simplified progression; production must gate completion on each real puzzle.

## Input and accessibility
Pointer, touch, and keyboard activate the same semantic buttons. No hover-only discoveries. 44px touch targets, clear focus-visible, labeled controls, live region for story feedback, captions for sound-only information, skip animations, reduced motion, no audio until user gesture. Contrast AA for body text. No motion-driven nausea.

## Performance
First view lightweight: no runtime 3D; images lazy-load below fold; AVIF/WebP poster images with responsive srcset; compressed short videos as optional enhancements. Aim for 90+ Lighthouse on mobile where feasible; measure rather than claim. No blocking large media downloads. Preserve 60fps on mid-range Android by animating transform/opacity.

## Security and privacy
No external guestbook by default. Do not expose tokens in client code. Escape/sanitize any user-supplied text if guestbook is later introduced. Credits for external assets. No analytics cookies in MVP.

## QA
Run `npm run build`; browser smoke tests for chapter navigation, story advancement, puzzle outcomes, localStorage resume, reset, keyboard, mute, mobile viewport and reduced motion. Add automated Playwright tests when tooling is installed. Capture console warnings and layout overflow.

## Deployment
Static build to `dist/`. Push public repository with dated commits and deploy; test actual URL on mobile. Event submission deadline 2026-10-19 17:17 IST according to provided brief; confirm official site. Never describe an undeployed preview as submitted.
