# MORROW — Story-First UX and QA Review

Review date: 2026-10-18
Branch: feat/skills-discovery-and-bootstrap
Review basis: direct inspection of GitHub source. **No browser or build run by this reviewer** (remote source inspection only). Existing Antigravity smoke-test claims predate this rebuild.

## Product diagnosis (before changes)
**P0 — Experience identity:** Hero marketing copy, persistent header navigation, progress bar, two-column illustration/story panel, disaster counter and character-sheet cards presented a portfolio/dashboard rather than an immersive adventure. The story could be advanced as disconnected lines, looping back to the start.

**P0 — Puzzle logic:** Weather Loom ignored selected spool and completed on any target. Shadow Stitcher completed after one shadow. Clock completed after arbitrary toggles and invoked onSuccess inside a React state updater.

**P1 — Mobile map:** Absolutely positioned islands could overlap at 320–375px; small-screen controls and chapter selection needed a layout audit.

**P1 — Narrative stakes:** The final reveal was mostly text; Morrow's apology, Perfect's past, and Unfinished One's agency need staged visual storytelling.

**P1 — Motion:** Bobbing mascot, ticking hand and minor transitions did not constitute scene-directed animation. Scenes reused the same environment.

**P1 — Accessibility/QA:** Prior smoke test covered one happy path at 375px, not all edge cases or keyboard/reduced-motion/slow network. Prior build verification is not proof of the new changes.

## Changes made in this story-first pass
1. Replaced opening portfolio hero with an immersive illustrated opening and an explicit 'Open the story' action.
2. Story chapters now occupy full-width illustrated scenes, followed by sequential, non-looping dialogue and a gated chapter interaction.
3. The workshop requires ringing a bell before its opening dialogue progresses.
4. Moved character sheet and three invention replay cards into the epilogue; no portfolio sections appear before story completion.
5. Replaced absolute island map with a responsive grid; map is an optional in-story navigation view.
6. Added scene-specific environments, layered sky, drifting clouds, character entrances and page-transition motion; reduced-motion fallback remains.
7. Weather Loom now requires correct weather/target matching for all three repairs; incorrect pairings give feedback.
8. Shadow Stitcher requires all three shadow experiments before chapter completion.
9. Impossible Clock requires fitting the gears in story order and avoids effects inside a state updater.
10. Preserved local progress, sound toggle, character SVGs, and finale stitch.

## Manual QA matrix — MUST RUN after pulling these commits
| Priority | Test | Expected | Status |
|---|---|---|---|
| P0 | Fresh browser opens MORROW | Story opening, no character sheet, no dashboard | NOT RUN |
| P0 | Open story, ring bell, advance all dialogue | Workshop gates correctly; no looping | NOT RUN |
| P0 | Shadow Stitcher one option only | Chapter stays locked | NOT RUN |
| P0 | Shadow Stitcher all three options | Chapter unlocks | NOT RUN |
| P0 | Weather wrong spool-target pair | No completion | NOT RUN |
| P0 | Weather all correct pairings | Chapter unlocks | NOT RUN |
| P0 | Clock wrong gear order | No progress | NOT RUN |
| P0 | Clock correct gear order | Chapter unlocks | NOT RUN |
| P0 | Finale and epilogue | Emotional ending; portfolio appears only afterward | NOT RUN |
| P0 | Production build `npm ci && npm run build` | Exit code 0 | NOT RUN |
| P0 | 320/375/430px mobile | No horizontal overflow, controls usable | NOT RUN |
| P0 | Keyboard-only playthrough | Every objective completable | NOT RUN |
| P1 | Reload mid-chapter | Completed chapters persist; active scene reopens | NOT RUN |
| P1 | Reduced motion | No forced motion, content readable | NOT RUN |
| P1 | Muted by default and toggle | No unwanted audio | NOT RUN |
| P1 | Return to completed chapter | Replay and return without progression lock | NOT RUN |
| P1 | Browser console | No errors or warnings | NOT RUN |
| P1 | Map with six nodes | No overlap at 320px | NOT RUN |
| P2 | WebGL unavailable | Core game works without Spline | NOT RUN |

## Known follow-ups
- **P0:** Build and run a fresh Playwright test on this exact commit. Do not reuse previous QA evidence.
- **P1:** Add story-specific environmental artwork (workshop props, shadow village, weather forest, clock tower), deeper motion staging and a character-driven reveal sequence. Current art direction is a functional first pass, not final cinematic polish.
- **P1:** Reconcile documentation branches and review story-first hierarchy in PRD.
- **P1:** Add per-scene dialogue speaker portraits and explicit voice labels rather than plain text prefixes.
- **P2:** Only then evaluate Spline map/workshop and cinematic video; never block core play.

## Release criterion
A reviewer unfamiliar with MORROW must be able to enter the story, complete all three inventions, understand the reveal, reach the epilogue, and *only then* discover Morrow's portfolio. The experience should be legible at 320px, usable without audio or motion, and remain functional without WebGL.
