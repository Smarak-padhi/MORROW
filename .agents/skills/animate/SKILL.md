---
name: animate
description: Motion quality principles — GPU-accelerated transforms, exit/entrance timing, accessible reduced-motion. Adapted for MORROW: The Almost-Right Adventure (React, TypeScript, CSS custom properties, SVG scene art).
attribution:
  source: Algoryxz 001 (originating from Ember & Root)
  license: Internal / MIT
---

> **MORROW BINDING CONSTRAINTS**
> - Stack: React 19 + TypeScript + Vite. All motion is CSS custom properties, keyframes, transitions, and SVG state transforms.
> - Motion timings: 180–350ms for UI controls; 450–900ms for story/stitch reveals; gentle idle breathing 3–5s.
> - Zero mandatory external animation dependencies.
> - `prefers-reduced-motion: reduce` must produce an immediate or static fallback — enforced globally.
> - This skill governs timing philosophy, easing curve quality, and accessibility only.
> - `docs/DESIGN_SYSTEM.md` and `docs/TRD.md` always override this skill.

# Animate Skill — MORROW Edition

This skill provides motion design standards, responsive transition timing, and reduced-motion compliance for MORROW.

---

## Motion Quality Principles

1. **Exits faster than entrances**:
   - Exit animations should be ~70–75% of entrance duration (e.g. enter 200–250ms, exit 150ms).
   - Departing dialogs and tooltips should clear out immediately.

2. **Only animate transform and opacity**:
   - Stick to `transform` (translate, scale, rotate) and `opacity`.
   - These properties are composite-only and GPU-accelerated; avoid animating `height`, `width`, `top`, or `margin` which trigger layout recalculation and mobile frame drops.

3. **Appropriate durations**:
   - UI micro-interactions (button presses, hover states, toggles): **180–300ms**.
   - Narrative scene reveals and puzzle feedback: **450–900ms**.
   - Ambient idle loops (character breathing, floating gear hover): **3–5s**.

4. **Easing & Curves**:
   - Use warm, tactile easing curves reflecting storybook paper cutouts:
   ```css
   :root {
     --ease-out-quint: cubic-bezier(0.23, 1, 0.32, 1);
     --ease-in-out-cubic: cubic-bezier(0.645, 0.045, 0.355, 1);
     --ease-out-cubic: cubic-bezier(0.33, 1, 0.68, 1);
     --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
   }
   ```
   - Entering story elements: `ease-out` (decelerate into view).
   - Exiting elements: `ease-in` (accelerate out of view).
   - Moving dials and puzzle pieces: `ease-in-out` or slight spring.

5. **Animation must support comprehension**:
   - Motion communicates state transitions, cause-and-effect (needle stitching thread, gear turning).
   - Interaction must never wait for decorative animation. Controls remain responsive immediately.

6. **Honor `prefers-reduced-motion` unconditionally**:
   - Every animation must have an immediate or subtle fade fallback:
   ```css
   @media (prefers-reduced-motion: reduce) {
     *, *::before, *::after {
       animation-duration: 0.01ms !important;
       animation-iteration-count: 1 !important;
       transition-duration: 0.01ms !important;
       scroll-behavior: auto !important;
     }
   }
   ```

---

## MORROW Choreography Guidelines

In MORROW, the progression and interactive sequences follow this choreography:

1. **User interacts with puzzle component** (e.g., joins shadow, sets weather loom, rotates clock gear).
2. **Control enters pending/stitching state** (tactile needle/thread animation 200–350ms).
3. **Puzzle verification succeeds** (golden thread flash 300–500ms).
4. **Dialogue / narrative react** (Morrow or Sir Clack comment appears smoothly).
5. **Chapter advance unlocked** (forward button pulses gently).
