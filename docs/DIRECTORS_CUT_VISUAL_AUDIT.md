# DIRECTOR'S CUT: VISUAL & CINEMATIC SYSTEM AUDIT (Phase 1)
**Date:** 2026-10-20  
**Branch:** `feat/directors-cut-visual-overhaul`  
**Baseline Commit:** `d425c47`

---

## 1. Executive Summary

A comprehensive architectural and layout audit of the MORROW codebase was conducted following user inspection of production screenshots. While the project achieved 100% test passing in previous sprints, critical visual defects, layout collision risks, scale inconsistencies, and audio balance issues were uncovered.

This audit establishes the root causes, documents the structural failure points across DOM/CSS hierarchies, establishes an authoritative character scale matrix, and defines the remediation blueprint for Phases 2 through 7.

---

## 2. DOM Hierarchy & Stacking Context Analysis

### 2.1 The Negative Margin / Overlap Defect
- **Location:** `src/styles.css` (lines 388–400) targeting `.storybook-reading`.
- **Finding:**
  ```css
  .storybook-reading {
    margin: -30px auto 0; /* ROOT CAUSE */
    position: relative;
    z-index: 5;
    width: 100%;
    max-width: 780px;
  }
  ```
- **Consequence:** On desktop and tablet viewports, `.storybook-reading` physically pulls up into `.storybook-stage`, clipping the lower section of interactive stages and obscuring crucial touch/click targets (such as Loom drawers, stage buttons, and character captions). On mobile (<480px), this negative margin causes typography collision with stage bottoms.
- **Remediation:** Remove negative margin entirely. Establish clear, non-colliding block flow where stage containers and dialogue containers stack naturally with responsive token-based gaps (`var(--space-md)`).

### 2.2 Dual / Fragmented Dialogue Layouts
- **Finding:**
  - `ShadowStage.tsx` and `WeatherStage.tsx` render custom absolute-positioned speech balloons within their SVG/DOM stages (`.stage-dialogue-bubble`, `.weather-dialogue-card`).
  - Meanwhile, `App.tsx` simultaneously renders `.storybook-reading` with standard storybook narrative text underneath.
  - In `ClockStage.tsx`, `FinaleStage.tsx`, and `EpilogueStage.tsx`, dialogue is delegated back to `App.tsx`.
- **Consequence:** Visual inconsistency. Speech bubbles overlap interactive puzzle canvases and stage elements on narrow viewports, while causing duplicate scroll contexts.
- **Remediation:** Introduce a unified `DialogueOverlay` primitive with a consistent, non-intrusive floating HUD or docked stage position that never overlaps puzzle interactions.

### 2.3 Nested Overflow & Scroll Containment
- **Location:** `TactileShadowStitcher.tsx` and `ShadowStage.tsx`.
- **Finding:** The interactive Loom / Stitcher is rendered inside a drawer (`.accessible-loom-drawer`) with a hardcoded `open` attribute and nested scrolling (`overflow-y: auto`), placed inside `.shadow-stage-workspace` which also scrolls.
- **Consequence:** "Scroll inside scroll" trap on mobile touch devices. When players try to drag the golden needle, touch gestures can inadvertently trigger container scrolling instead of thread drawing.
- **Remediation:** Ensure interactive puzzle viewports disable outer scroll capture during active pointer/touch tracking via `touch-action: none` and remove nested redundant scrolling.

---

## 3. Character Consistency & Scale Ratios

### 3.1 Authoritative Character Scale Matrix
To maintain stop-motion miniature realism, character silhouettes must follow strict relative heights:

| Character | Real World / Miniature Scale | Relative Height to Morrow | Role / Appearance | Current Problem |
| :--- | :--- | :--- | :--- | :--- |
| **Morrow** | 1.0 (Base, ~12cm doll) | 100% (Baseline) | Pear-shaped Stitchling, patched scarf, needle & thread | SVG fallback flashes before PNG sprite loads. |
| **Sir Clack** | 1.4 (~17cm doll) | 140% | Porcelain wind-up clockmaker, brass gears, cane | Correctly photographic, but misaligned ground plane. |
| **Pipkin** | 0.4 (~5cm doll) | 40% | Tiny blue knitted swift bird with stitched eyes | Conflated with Giant in Workshop due to montage cuts. |
| **Duck** | 0.8 (~10cm doll) | 80% | Wooden wheeled mallard pull-toy with brass joints | Floating above ground in Shadow Stage. |
| **Giant** | 8.0+ (Enormous human) | 800%+ (Cropped POV) | Human customer whose hands/torso dwarf the counter | Rendered as flat vector silhouette in Workshop Panel 4. |
| **The Unfinished One** | 1.3 (~15cm doll) | 130% | Weathered burlap & clockwork automaton | Scales inconsistently between Cathedral and Epilogue. |

### 3.2 Sprite Loading & Flash-of-Unstyled-SVG (FOUC)
- **Location:** `src/components/art/StopMotionActor.tsx`.
- **Root Cause:** When `imageLoaded` is false, the component renders the legacy vector SVG. When the network or cache takes 50–200ms to load `public/characters/*.png`, the user sees a jarring pop from a flat vector drawing to a photographic stop-motion sprite.
- **Remediation:** Preload all 6 character sprites at app initialization (`public/characters/*.png`). Render an elegant silhouette placeholder or maintain consistent bounding box aspect ratio with a soft fade-in transition rather than rendering raw vector geometry.

---

## 4. Workshop Narrative & Scale Clarity

### 4.1 The Giant vs. Pipkin Identity Separation
- **Finding in `WorkshopComic.tsx`:**
  - Panel 4 shows a dark vector silhouette labeled "The Visitor".
  - Beat 8 immediately shows Pipkin arriving with the chime.
  - Players frequently mistake Pipkin for the "Giant" or wonder where the giant went.
- **Remediation:**
  - Clearly establish the Giant as an **enormous human customer** towering over Morrow's workbench.
  - Implement low-angle camera framing where the counter, giant brass scissors, and spools are in the foreground, showing the giant's colossal hand placing a tiny broken pocket watch on the counter.
  - Pipkin arrives separately as a swift messenger bird delivering the letter via `prologue-07-pipkin-yes.mp4`.

---

## 5. Audio Architecture & Bell Direction

### 5.1 Shop Counter Bell Synthesis
- **Location:** `src/sound.ts` (`playCounterBell`).
- **Defect:** Uses two simple sine oscillators (520Hz and 1040Hz) with 0.65s linear decay. Sounds like a flat synthesizer bleep rather than a physical brass counter bell.
- **Remediation:**
  - Synthesis architecture:
    1. **Strike transient:** High-frequency metallic impulse (2400Hz bandpass noise burst, 8ms decay).
    2. **Brass body partials (Inharmonic chime):**
       - Fundamental: 587.33 Hz (D5)
       - Minor Third / Tierce: 700 Hz
       - Quint: 880 Hz
       - Octave / Nominal: 1174.66 Hz
       - Superoctave: 2093 Hz
    3. **Resonance ring-down:** Natural exponential decay over 1.8–2.2 seconds.
  - Ensure single-shot firing guard (debounce 300ms) to prevent double-triggering on rapid user clicks.

---

## 6. Puzzle Centerpiece Scaling

| Puzzle Component | Current Viewport / Container | Target Viewport / Container | Visual Impact |
| :--- | :--- | :--- | :--- |
| **TactileShadowStitcher** | Nested in 450px drawer with scroll | Full-width stage canvas (100% width, min 420px height) | Seams clearly identifiable (Trunk, Bough, Crown); needle path fully visible. |
| **ImpossibleClock** | 380x340 SVG in 350px container | 620x460 responsive SVG with 580px desktop height | Centerpiece clockwork mechanism; large readable cogs and spring. |
| **WeatherStage** | 1500+ lines inline SVG with banner card | Photographic canopy backdrop with integrated character platform | Grounded characters, no pasted flat look. |

---

## 7. Execution Roadmap (Phases 2–7)

- [x] **Phase 1:** Visual System Audit & Root Cause Diagnosis (`docs/DIRECTORS_CUT_VISUAL_AUDIT.md`)
- [ ] **Phase 2:** Cinematic Design System Primitives (`CinematicStage`, `DialogueOverlay`, `CharacterActor`, `StoryControls`)
- [ ] **Phase 3:** Workshop Re-direction (Giant scale, Pipkin video integration, comedic timing)
- [ ] **Phase 4:** Sound Overhaul (Acoustic brass counter bell synthesis & debouncing)
- [ ] **Phase 5:** Character Consistency & Preloading (Eliminate SVG pop, unified scale)
- [ ] **Phase 6:** Interactive Chapter Recomposition (Shadow Village, Weather Forest, Tomorrow Town)
- [ ] **Phase 7:** Multi-Viewport Visual QA & Verification
