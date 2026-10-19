# Verified Google Flow Asset Intake & Integration Inventory

## 1. Executive Summary

This inventory documents the verification, preparation, and integration of the 5 Google Flow asset packages into **MORROW: The Almost-Right Adventure**.

All incoming assets were audited against the story bible and canonical character designs. Studio gray backgrounds and checkerboards were cleanly extracted into genuine transparent 32-bit RGBA PNG sprites using `rembg` (u2net model). Approved environmental plates and verified stop-motion cinematic videos have been installed into the application with zero layout regressions.

---

## 2. Character Sprite Cutouts (`public/characters/`)

All character sprites feature complete alpha channel transparency (0–255 alpha) and are rendered via the image-based `StopMotionActor` component with stepped stop-motion keyframe animations. Handcrafted SVG vectors serve as instant zero-layout-shift fallbacks.

| Character | Pose / State | Source File | Status | Notes |
|---|---|---|---|---|
| **Morrow** | `idle` | `morrow-idle.source.jpg` | **Approved & Active** | Peach felt body, plum scarf, button eyes, forehead diamond. |
| **Morrow** | `talking` | `morrow-talking.source.jpg` | **Approved & Active** | Expressive mouth opening, ears perked. |
| **Morrow** | `happy` | `morrow-happy.source.jpg` | **Approved & Active** | Cheerful posture with brass needle raised. |
| **Morrow** | `action` | `morrow-action.source.jpg` | **Approved & Active** | Leaning forward in active stitching posture. |
| **Sir Clack** | `idle` | `clack-idle.source.jpg` | **Approved & Active** | Antique wooden toolbox mentor with brass latches & grumpy brows. |
| **Sir Clack** | `talking` | `clack-talking.source.jpg` | **Approved & Active** | Latch mouth open, articulated wooden legs. |
| **Pipkin** | `idle` | `pipkin-idle.source.jpg` | **Approved & Active** | Blue felt courier bird, leather satchel, alert posture. |
| **Pipkin** | `surprised` | `pipkin-surprised.source.jpg` | **Approved & Active** | Wings flared, beak open, perched upside down or on Clack's handle. |
| **Pipkin** | `talking` | `pipkin-talking.png` | **Approved & Reconciled** | Reconciled from canonical blue felt bird design. |
| **Village Duck** | `idle` | `duck-idle.source.jpg` | **Approved & Active** | Fluffy cream duckling with mint knit scarf. |
| **Village Duck** | `talking` | `duck-talking.source.jpg` | **Approved & Active** | Beak open, flipper gesturing towards his stolen shadow. |
| **Frog Mayor** | `idle` | `frog-idle.source.jpg` | **Approved & Active** | Olive green textured skin, top hat, plum waistcoat, walking cane. |
| **Frog Mayor** | `talking` | `frog-talking.source.jpg` | **Approved & Active** | Gesturing with cane, mouth open discussing reversed rain. |
| **Frog Mayor** | `happy` | `frog-happy.source.jpg` | **Approved & Active** | Celebrating solved upside-down forest weather. |
| **Professor Perfect** | `idle` | `professor-idle.source.jpg` | **Approved & Active** | Porcelain face with gold kintsugi crack, spectacles, lavender gown. |
| **Professor Perfect** | `talking` | `professor-talking.source.jpg` | **Approved & Active** | Stern expression holding regulation stamp. |
| **The Unfinished One** | `idle` | `unfinished-idle.source.jpg` | **Approved & Active** | Deep navy felt creature, asymmetric floppy ears, crooked gold chest knot. |
| **The Unfinished One** | `action` | `unfinished-action.source.jpg` | **Approved & Active** | Arm extended reaching across the mechanism chasm. |

### Quarantined / Corrected Character Variations
- **`pipkin-talking.source.jpg` (Quarantined in Intake)**: Mislabeled source image depicted a peach felt rabbit (Morrow) holding out a paw rather than Pipkin. Quarantined to prevent breaking Pipkin's canonical blue felt bird appearance; `public/characters/pipkin-talking.png` was safely reconciled using Pipkin's approved blue bird model.

---

## 3. Environment Plates (`public/environments/`)

All plates prepared as high-performance modern WebP images:

| Environment | File Path | Resolution | Size | Role |
|---|---|---|---|---|
| **Workshop Interior** | `public/environments/workshop-bg.webp` | 1920×1080 | 258.7 KB | Available as master plate for Chapter 0 Prologue. |
| **Lost Shadows Village** | `public/environments/shadows-cottages.webp` | 1920×1080 | 270.6 KB | Integrated as cottage backdrop layer in Chapter 1 2.5D stage. |
| **Upside-Down Forest** | `public/environments/forest-canopy.webp` | 1920×1080 | 270.8 KB | Integrated as forest sky/canopy backdrop in Chapter 2 2.5D stage. |

---

## 4. Cinematic Stop-Motion Videos (`public/cinematics/`)

All approved Flow MP4 cinematics are integrated with synchronized captions, speaker tags, accessible controls, and custom video posters:

| Story Beat | Video File | Status | Runtime Role |
|---|---|---|---|
| **Prologue: Giant POV** | `public/cinematics/prologue-02-giant.mp4` | **Active** | Panel 4 inline comic video player in Workshop. |
| **Chapter 1: Duck Shadow Reveal** | `public/cinematics/shadows-01-duck.mp4` | **Active** | Chapter 1 inline cinematic modal reveal. |
| **Chapter 2: Inverted Weather Reveal** | `public/cinematics/weather-02-umbrella.mp4` | **Active** | Chapter 2 inverted rain and umbrella reveal modal. |
| **Chapter 2: Weather Loom Weaving** | `public/cinematics/weather-04-loom.mp4` | **Active** | Chapter 2 midpoint loom animation. |
| **Chapter 2: Forest Bloom Payoff** | `public/cinematics/weather-05-bloom.mp4` | **Active** | Chapter 2 puzzle completion celebration payoff. |
| **Chapter 3: Clock Freeze Reveal** | `public/cinematics/clock-01-freeze.mp4` | **Active** | Chapter 3 frozen clock mechanism reveal modal. |
| **Chapter 4: The Crooked Knot Finale** | `public/cinematics/finale-01-knot.mp4` | **Active** | Chapter 4 story climax reveal film. |

### Documented Missing Asset & Authoritative Procedural Fallback
- **`clock-02-restart.mp4`**: Not provided in Flow intake packages. In strict accordance with directive rule #5 (*"Do not substitute a clock-freeze clip for the missing restart video"*), no substitute clip has been assigned. The application's bespoke in-engine procedural SVG clockwork animation with rotating brass cogs and resonant pendulum chimes serves as the authoritative, verified representation of the restarting mechanism.

---

## 5. Verification & QA Status

- **Automated Viewport Audit**: Passed across 320px, 360px, 375px, 430px, 768px, 1280px, 1440px with **0 horizontal overflow**.
- **Player Journey Audit**: Passed end-to-end traversal through all 6 chapters, video modals, tactile inventions, and epilogue save persistence.
- **Visual Inspection**: Verified via `view_file` on captured screenshots (`chapter1_shadows_clack_verified.png`, `chapter2_weather_clack_verified.png`).
