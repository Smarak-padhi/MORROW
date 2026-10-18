# Production Plan — Sprint & Quality Gates

## Hard Gates
- **G0**: Design lock (tokens, fonts, Stitchling silhouette, mobile layout, reduced-motion).
- **G1**: Working intro, floating map, and Shadow Stitcher invention.
- **G2**: Three playable inventions (Shadow Stitcher, Weather Loom, Impossible Clock), progression state, and Clock Tower finale.
- **G3**: Supporting cast cameos (Sir Clack, Pipkin, The Unfinished One), procedural audio synthesizer with mute toggle, disaster counter Easter egg.
- **G4**: Mobile QA across viewports (320px–1280px), keyboard accessibility, zero console errors, public commit history, and deployment.

---

## Sprint Execution Order
`L00 Bootstrap` → `L01 Design Lock & Inventions` → `L02 Audio Engine & Game Development Skills` → `L03 Shadow Stitcher Polish` → `L04 Weather Loom Polish` → `L05 Clock & Finale Integration` → `L06 2.5D Map (with optional Spline evaluation)` → `L07 Epilogue & Easter Eggs` → `L08 Optional Cinematics` → `L09 Quality Gate & Verification` → `L10 Public Deployment & Submission`.

---

## QA Matrix
- **Viewports**: 320px, 375px, 430px, 768px, 1280px.
- **Inputs**: Pointer, touch, and keyboard (`Tab` + `Enter`/`Space`).
- **Resilience**: Page refresh after each chapter, reset confirmation, muted/unmuted state preservation, offline font fallbacks, `prefers-reduced-motion` zero-duration overrides.
- **Verification Rule**: Use Playwright browser automation for evidence. Do not claim tests passed without recorded output in `docs/LOOP_LOG.md`.

---

## Definition of Done
Three actually working inventions, coherent complete story, stable saved progress, phone tested with min 44px touch targets, at least one Easter egg, public GitHub commits during event sprint, deployed URL, and complete asset attribution.

---

## Emergency Cut List
Spline 3D scenes → AI videos → external guestbook → extra particle effects.
**Never cut**: mobile responsiveness, core story, three inventions, or accessibility QA.
