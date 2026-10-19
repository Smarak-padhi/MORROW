# MORROW 2.0 — DIRECTOR’S CUT EXPERIENCE AUDIT
**Sprint 01: Cinematic Foundations & Comprehensive Game Audit**
*Date: October 19, 2026 · Branch: `feat/directors-cut-cinematic-foundations` · Base: `e53d4f1`*

---

## 1. Executive Summary & Scope

MORROW was submitted as a functional hackathon proof-of-concept. The **Director’s Cut** mandate is to elevate the experience into a premier, handcrafted animated stop-motion storybook adventure that feels like a living miniature fantasy film rather than a conventional React web application.

An independent end-to-end audit was conducted across all six chapters on both **Mobile (390×844px, DPR 2, Touch-enabled)** and **Desktop (1280×800px)** viewports using automated Playwright test harnesses and visual inspection.

### Foundation Issues Resolved in Sprint 01
1. **`ComicVideoPanel.tsx` Unified Audio Control**: Video audio is now wired directly to the global application state (`isMuted: boolean`). Handled browser autoplay rejection policies gracefully (attempting unmuted playback when activated by user gesture, falling back to muted playback if blocked, without stalling or throwing errors).
2. **`WorkshopComic.tsx` Timing & Race Elimination**: Sir Clack’s cinematic panel (`prologue-03-clack-visitor.mp4`) now plays to completion *first*. Only after the video ends is an 800 ms comedic pause initiated, holding Morrow's enthusiastic greeting back until the pause completes. Redundant timer/click advancement race conditions were eliminated with ref guards.
3. **`App.tsx` Centralized Story Director**: Transitioned story flow into an explicit state machine (`AWAITING_START`, `CINEMATIC_PLAYING`, `DIALOGUE_AUTO_ADVANCING`, `AWAITING_PLAYER_ACTION`, `CINEMATIC_RESUMING`, `PAUSED`, `COMPLETE`). Replaced repeated manual "Turn the page" clicks in chapters 3, 4, and 5 with comfortable automated pacing, visible progress indicators, play/pause controls, and seamless transitions into tactile minigames.

---

## 2. Evidence-Backed Findings Ranked by Severity

### Severity 1: Critical Immersion & Visual Disconnects

#### Finding 1.1 — Severe Aesthetic Disparity Across Chapters (The "Two Games" Problem)
- **Category:** Weak Artwork / Flat Environments / Broken Cinematic Continuity
- **Locations:** Chapter 3 (`ClockStage.tsx`), Chapter 4 (`FinaleStage.tsx`), Chapter 5 (`EpilogueStage.tsx`)
- **Evidence:** `qa/directors_cut_audit/audit_mobile_clock.png`, `audit_mobile_finale.png`
- **Diagnosis:** While Chapter 0 (Workshop), Chapter 1 (Lost Shadows Village), and Chapter 2 (Upside-Down Forest) feature handcrafted stop-motion felt/fur models (Morrow, Sir Clack, Duck, Pipkin, Frog Mayor) against detailed painterly miniature environments, Chapter 3 and Chapter 4 abruptly regress to minimal flat 2D geometric vector SVG graphics:
  - Professor Primrose Perfect is rendered as a wireframe circle with stick spectacles on a flat purple polygon.
  - The Unfinished One is a flat navy blue oval with dot eyes.
  - The Tomorrow Town background is flat solid lavender with zero depth, shadows, or material texture.
- **Impact:** Shatters player immersion mid-adventure; feels unfinished and disjointed.
- **Required Remedy (Sprint 02/03):** Generate high-fidelity Google Flow stop-motion transparent sprites for Professor Perfect, The Unfinished One, and the Baker, and import photographic miniature backdrops for Tomorrow Town and the Clock Tower Cathedral.

#### Finding 1.2 — Abrupt Split Ground Plane in Chapter 2
- **Category:** Flat Environments / Bad Composition
- **Location:** `src/components/art/WeatherStage.tsx`
- **Evidence:** `qa/directors_cut_audit/audit_mobile_weather.png`, `audit_desktop_weather.png`
- **Diagnosis:** The Upside-Down Forest utilizes a rich miniature canopy image (`/environments/forest-canopy.webp`), but character sprites stand on a solid, untextured SVG rectangle (`#314D38`) with arbitrary oval shadows. This creates an unblended horizontal cut-off between the photorealistic moss background and the flat green floor.
- **Impact:** Undermines the stop-motion illusion and looks like characters pasted over mismatched layers.
- **Required Remedy:** Replace the flat green SVG floor with a textured miniature mossy cobblestone foreground layer with soft atmospheric depth blur and alpha-vignetted contact shadows.

#### Finding 1.3 — Mobile Header Control Collisions
- **Category:** Bad Mobile Composition
- **Location:** `src/components/art/WeatherStage.tsx` (`living-scene-heading`)
- **Evidence:** `qa/directors_cut_audit/audit_mobile_weather.png`
- **Diagnosis:** On 390px mobile viewports, the compact header attempts to display the chapter overline, title, scene index pill ("03 / 06"), reveal film launcher button, and dialogue auto toggle on a single row. The button text wraps into `Revea\nl Film`, and touch targets crowd the top-right header action bar.
- **Impact:** Degraded typography, clumsy touch targets, visual noise at the top of the viewport.
- **Required Remedy:** Consolidate scene meta-controls into an unobtrusive floating pill bar docked inside the stage viewport rather than competing with the narrative title.

---

### Severity 2: Pacing, Interaction, & Audio Friction

#### Finding 2.1 — Excessive Vertical Whitespace on First Mobile Viewport (Chapter 1)
- **Category:** Bad Mobile Composition / Awkward Pacing
- **Location:** `src/components/art/ShadowStage.tsx`
- **Evidence:** `qa/directors_cut_audit/audit_mobile_shadows.png`
- **Diagnosis:** In Chapter 1, the narrative title card ("Lost Shadows Village — A strange silence hangs over the cobblestones...") occupies 220px of vertical space before the stage appears. On a 844px height phone, the player must scroll past this card to see Duck’s feet and the cobblestone street.
- **Impact:** Violates the mobile-first principle where interactive game stages should dominate the primary viewport.
- **Required Remedy:** Adopt the compact cinematic header style proven in Chapter 2, keeping the interactive stage within the initial 80% of the mobile viewport.

#### Finding 2.2 — Absence of Continuous Ambient Environmental Soundscapes
- **Category:** Missing Sound / Atmosphere
- **Location:** `src/sound.ts`, all stage components
- **Diagnosis:** MORROW possesses procedural Web Audio synthesizers for discrete SFX (`chime`, `stitch`, `bell`, `gear`), but completely lacks subtle background ambient tone generation (e.g. gentle village night breeze, rustling pine needles, quiet ticking clockwork, or low resonant cathedral drone).
- **Impact:** Scenes feel sterile and silent during character pauses and dialogue reading.
- **Required Remedy:** Implement low-frequency, gentle procedural Web Audio ambient generators (filtered pink/brown noise, soft periodic clock ticking) gated by user-initiated audio activation and global mute state.

#### Finding 2.3 — Modal Popup Disconnect for Cinematics
- **Category:** Broken Cinematic Continuity
- **Location:** `src/components/art/ShadowStage.tsx`, `WeatherStage.tsx`
- **Diagnosis:** Triggering the "Reveal Film" or "Bloom Film" opens a full-screen overlay modal with a distinct dark backdrop. When the video finishes or is dismissed, the modal abruptly vanishes, revealing the static stage.
- **Impact:** Feels like watching an external video player rather than an organic cinematic camera move within the story.
- **Required Remedy:** Render cinematic clips directly in-scene using smooth crossfade transitions between the live interactive stage and the video layer.

---

### Severity 3: Micro-Interactions & Polish

#### Finding 3.1 — Drop Shadow Disconnect on Mobile Sprites
- **Category:** Character Staging
- **Locations:** `StopMotionActor.tsx`, `ShadowStage.tsx`
- **Diagnosis:** The transparent character WebP sprites (Duck, Morrow, Clack) use CSS `filter: drop-shadow(...)`. When characters rock or talk, their shadows float slightly above the perspective grid lines rather than anchoring to the cobblestone contact plane.
- **Required Remedy:** Render ground-contact elliptical shadows directly in the stage coordinate system under each character’s base coordinate.

#### Finding 3.2 — Epilogue Easter Egg Discoverability
- **Category:** Unsatisfying Interactions
- **Location:** `src/App.tsx` (`Ring Sir Clack's bell`)
- **Diagnosis:** Unlocking the secret developer note requires ringing the bell 5 times, but there is no progressive visual or acoustic feedback (pitch ramping or wobbling bell animation) signaling to the player that repeated rings do anything special.
- **Required Remedy:** Pitch-shift the bell frequency higher on successive taps and add a jiggling spring animation to reward exploration.

---

## 3. Sprint 01 Verification Matrix

| Test Suite / Inspection | Viewport | Target | Status | Evidence |
| :--- | :--- | :--- | :--- | :--- |
| **Audio Sync Test** | Mobile (390px) | `ComicVideoPanel.tsx` | **PASS** | Muted state synchronized dynamically with topbar toggle (`true` ➔ `false` ➔ `true`). |
| **Comedic Pause Timing** | Mobile (390px) | `WorkshopComic.tsx` | **PASS** | Clack video finishes playing first; 800ms timer pauses scene; Morrow greets only after pause. No race conditions. |
| **Story Director States** | Mobile (390px) | `App.tsx` | **PASS** | Transitions verified: `DIALOGUE_AUTO_ADVANCING` ➔ `PAUSED` ➔ `AWAITING_PLAYER_ACTION` ➔ `COMPLETE`. |
| **Horizontal Overflow** | 320px–1440px | All 6 Chapters | **PASS** | 0px overflow across 36 viewport/chapter combinations (`viewport_audit.mjs`). |
| **Playwright Full Suite** | Multi-device | All Inventions | **PASS** | All Loop 14 and regression tests passing with zero errors. |

---

## 4. Prioritized Action Plan for Sprint 02

1. **Chapter 3 (Tomorrow Town) Stop-Motion Overhaul**:
   - Generate Flow character sprites for Professor Primrose Perfect (porcelain doll aesthetic) and Baker.
   - Replace flat purple SVG background with handcrafted miniature clockwork town backdrop.
   - Connect physical Impossible Clock directly to the 2.5D environment.
2. **Chapter 4 (The Clock Tower / Finale) Atmosphere**:
   - Generate Flow character sprites for The Unfinished One (yarn-and-stitch companion).
   - Build cathedral clock interior with dramatic lighting and volumetric god rays.
3. **Environmental Audio Synthesis**:
   - Add procedural ambient generators in `src/sound.ts` for village wind, forest rain, and clock ticking.
