# Product Requirements Document — Morrow v1.0

## Problem & Goal
Deliver a complete mobile-first original-character interactive portfolio for Morrow. Visitors must learn who Morrow is within 15 seconds, discover three playable inventions, enjoy touch-friendly and keyboard interactions, and complete the story in 8–14 minutes without signing in.

---

## Character Sheet
- **Name**: Morrow
- **Species**: Stitchling (original fantasy creature born from a wish and loose thread)
- **Look**: Pear-shaped tiny body, mismatched folded ears, button-like eye markings, oversized patchwork scarf, spool tail, mitten paws
- **Personality**: Gentle, impulsive, curious, clumsy, comically overconfident
- **Profession**: Apprentice Impossible-Things Repairer
- **Creations**: Shadow Stitcher, Weather Loom, Impossible Clock
- **Origin**: Born inside the Almost-Right Repair Shop
- **Tagline**: *We make wonderful mistakes.*

---

## Required Scope & Acceptance
- [x] Character introduction with appearance, identity, personality, and original character sheet
- [x] Three distinct, **playable** invention showcases with labels and interactive feedback
- [x] Scroll/scene-driven origin story, each scene <= 150 words
- [x] Responsive click/touch interaction, audio synthesizer with mute switch, and secret Easter egg
- [x] Fully usable at 320, 375, 430, 768, and 1280px widths
- [x] Working mute toggle with default mute; zero autoplay audio
- [x] Functional public repository with verified feature commits and build outputs
- [x] Visible art attribution, asset register, and submission credits

---

## Player Journey
Workshop wake-up → floating map → Lost Shadows Village → Upside-Down Forest → Tomorrow Town → Clock Tower Finale → Workshop Epilogue. Chapter progress saved in `localStorage`. Returning visitors may resume or reset.

---

## Narrative Promises & Pacing
- **Humor**: Laugh early with dry puns from Sir Clack, literal misinterpretations by Morrow, and sensational headlines from Pipkin.
- **Mystery Clues**:
  1. The shadow quietly rescues a discarded thread in Chapter 1.
  2. The shadow protects a flower in Chapter 2; Morrow recognizes the knot.
  3. The shadow tries to fit the heart gear in Chapter 3 before the finale reveal.
- **Emotional Arc**: The Unfinished One is revealed as Morrow's first rejected creation who has helped all along. Morrow independently executes the final crooked stitch. Professor Perfect acknowledges the beauty of imperfection.

---

## Release Priorities & Cut List
- **P0 Mandatory**: 3 playable inventions, core narrative, mobile-first touch/keyboard controls, local storage progress, mute toggle.
- **P1 Polish**: Procedural Web Audio synthesizer, layered 2.5D floating map, disaster counter Easter egg.
- **P2 Optional**: Spline 3D vignette (bounded and non-blocking), AI video storyboard fallbacks. Defer P2 if schedule threatens core gameplay.
- **Out of Scope**: Mandatory audio/video, login, backend servers, third-party user chat, free-roaming 3D worlds.
