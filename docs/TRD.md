# Technical Requirements

## Planned architecture
Vite + React + TypeScript; CSS variables and SVG for visuals; optional Motion; Web Audio API for user-initiated sounds; localStorage for versioned progress. No backend required for the initial release.

## Optional Spline 3D integration — approved for evaluation
[Spline](https://spline.design/) may be used for two **bounded decorative/interactive scenes**: the floating chapter-island diorama and the repair workshop. It is not the game engine. React owns navigation, puzzles, dialogue, chapter unlocks and persistence. Prefer a lazy-loaded Spline runtime/component, only when the relevant scene is visible or user opens it. Store scene URLs in a central configuration and maintain a 2D SVG/CSS equivalent. Do not require WebGL to complete any objective.

### Scene contracts
- Map: five islands, stitched route, locked/unlocked/completed states. React state is authoritative; Spline click events may request chapter selection but must not bypass unlock rules.
- Workshop: tap bell or props to trigger React dialogue; scene loading failure renders a poster with ordinary HTML controls.
- No unbounded free camera, mandatory pointer hover, autoplay audio or long startup loading.
- Pause/disable expensive rendering when offscreen where feasible; respect prefers-reduced-motion and low-performance devices.
- Do not embed third-party project secrets or private scene identifiers; document scene ownership and credits.
- Gate the feature behind `ENABLE_SPLINE_SCENES` (or equivalent config) so fallback works without a Spline scene.

### Acceptance and performance
Verify 320/375/430px widths; no canvas traps keyboard or scroll; HTML accessible controls remain present. Test loading failure, WebGL disabled, reduced motion, slow network, device memory pressure and scene switching. Compare bundle and load cost before enabling by default. If mobile responsiveness or core gameplay regresses, ship 2D fallback instead.

## Domain model
Chapter {id, scenes, objectives, unlocks}; Puzzle {source,target,outcome}; GameProgress {schemaVersion, currentChapter, completedObjectives, discoveredSecrets, soundMuted}; Dialogue {speaker,text,expression,trigger}.

## Rules
Central state machine controls chapter transitions; persist only durable state; support save migration and reset; use one puzzle resolver for all inventions; input by tap and keyboard, optional drag; lazy-load large assets; poster and skip for video; reduced motion.

## Validation
Build/typecheck, representative 320/375/430px viewport tests, touch and keyboard walkthrough, no horizontal overflow, refresh persistence, muted sound, slow-network fallback, console inspection and credits verification. No success claim without recorded evidence.
