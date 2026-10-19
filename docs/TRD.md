# Technical Requirements Document — Morrow v1.0

## Stack & Architecture
- **Core Stack**: Vite + React 19 + TypeScript, CSS custom properties, procedural SVG scene art, Web Audio API, and versioned `localStorage`.
- **Hosting**: Static build targeting Vercel, Cloudflare Pages, or GitHub Pages. Zero mandatory server backend in MVP.
- **Component Decomposition**:
  - `src/App.tsx`: Central state machine and chapter routing.
  - `src/sound.ts`: Procedural Web Audio synthesizer (zero external mp3 downloads, default muted, user gesture required).
  - `src/story.ts`: Canonical chapter data, dialogue scripts, and character quotes.
  - `src/styles.css`: Canonical design tokens, responsive breakpoints, accessible focus outlines, and `prefers-reduced-motion` zero-duration fallbacks.
  - `src/components/art/`: Procedural 2D SVG character silhouettes (`Morrow.tsx`, `SupportingCast.tsx`).
  - `src/components/inventions/`: Modular, playable invention components (`ShadowStitcher`, `WeatherLoom`, `ImpossibleClock`, `FinaleStitch`).

---

## State Model
```typescript
interface GameProgress {
  schemaVersion: number;
  completed: ChapterId[];
  active: ChapterId;
  muted: boolean;
  easter: boolean;
  visits: number;
}
```
- **Storage Key**: `morrow-v1` in `localStorage`.
- **Defensive Parsing**: Validates known chapter IDs, handles parse exceptions, defaults to `workshop` on corruption.
- **Persistence & Reset**: Progress is saved on every state mutation; reset confirms with user and clears progress safely.
- **Audio State**: `muted` is true by default and preserved across reloads.

---

## Optional Spline 3D Integration — Approved for Evaluation
[Spline](https://spline.design/) may be evaluated strictly as an optional visual enhancement for the floating world map and workshop scenes.
- **Strict Boundary**: Spline is **never the game engine**. React state remains 100% authoritative for progression, chapter unlocks, dialogue, and puzzle resolution.
- **Zero WebGL Dependency**: Core gameplay and puzzle objectives must never require WebGL.
- **Unconditional 2D Fallback**: If WebGL is unavailable, Spline scripts fail or are blocked, or `prefers-reduced-motion` is active, the game renders the procedural 2D SVG map and scene artwork.
- **Mobile Guardrails**: Offscreen scenes must pause rendering; no canvas traps keyboard focus or touches.

---

## Input & Accessibility
- **Touch-First**: Minimum 44×44px touch targets on all interactive elements.
- **Keyboard Usability**: Every button, dialogue advance, puzzle choice, and mode toggle is accessible via keyboard `Tab` + `Enter`/`Space` with a 3px berry focus ring (`--berry`).
- **Live Regions**: Storybook dialogue container utilizes `aria-live="polite"` for screen readers.
- **Reduced Motion**: Enforced globally via `@media (prefers-reduced-motion: reduce)` with immediate 0.01ms animation/transition durations.

---

## Performance & Quality Assurance
- **Lightweight First View**: Bundle < 300kB gzipped.
- **No Heavy Blocking Downloads**: Procedural Web Audio synthesizes tones via native browser oscillators.
- **Multi-Device Matrix**: Verified at 320px, 375px, 430px, 768px, and 1280px viewports without horizontal overflow.
- **Evidence-Backed Verification**: Every loop completion requires actual Playwright / browser testing and build logs recorded in `docs/LOOP_LOG.md`.
