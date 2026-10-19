# MORROW Execution Loops — Release Plan

Each loop must repeat **audit → design → implement → verify → document → commit** until its exit criteria pass. Do not skip mobile tests. No claim of completion without evidence in LOOP_LOG.md.

## L00 — Bootstrap and baseline
Inventory repository; import verified starter source; reconcile dependencies; add .gitignore, typecheck/build scripts, minimal CI and project metadata. Verify npm install, build and page load. Exit: clean build, known scripts documented, working preview, first commit.

## L01 — Design and original character lock
Define semantic color tokens, fonts, spacing, component states and responsive scales. Produce Morrow's original silhouette, expression sheet and pose library; review resemblance risks. Produce Sir Clack, Pipkin, Perfect and Unfinished One designs. Exit: approved visual bible, responsive UI sample and asset manifest.

## L02 — Shared engine
Implement chapter data schema, dialogue engine, state machine, versioned persistence, replay and chapter map. Tap-first stitching engine must accept source/target and return reactions. Test keyboard/touch, invalid combinations, reload and backward navigation. Exit: reusable engine with unit tests and working mobile demo.

## L03 — Prologue and Shadow Stitcher
Build waking scene with skip/poster fallback, workshop intro, five-point character sheet, comic dialogue, shadow puzzle with three wins and humorous optional outcomes. Add first mystery clue and chapter completion. Exit: entire chapter completable at 320px and keyboard-only.

## L04 — Weather Loom
Reuse stitching engine for rain/wind/flower/bell interactions; build layered forest scene, character reactions, Perfect's escalation, clue and chapter unlock. Exit: three weather objectives and persistent completion, no regression to chapter 1.

## L05 — Impossible Clock and finale
Build clock puzzle combining prior skills, Perfect's conflict, Unfinished One reveal, last stitch and epilogue workshop with three inventions. Test narrative coherence and replay. Exit: start-to-finish playable experience with no dead ends.

## L06 — Floating 2.5D map with optional Spline diorama
First build a complete functional 2D SVG/CSS map with five chapter nodes, fog/locked states, stitched route, replay and mobile-friendly controls. Then evaluate Spline for a lightweight 3D island diorama and optional workshop scene. Integrate Spline as a lazy-loaded enhancement; React remains the source of truth. Ensure fallback when WebGL is unsupported, Spline is blocked, network is slow, or reduced motion is requested. Test 320/375/430px, touch and keyboard navigation, map-to-chapter transitions, memory, bundle cost and offscreen behavior. Exit: working map on all tested devices; Spline only enabled if it improves the experience without harming gameplay.

## L07 — Personality and bonus
Add Sir Clack disaster log, Pipkin newspaper, dialogue variants, sound/mute, Easter egg, sparkle trail and visitor-memory polish. Each enhancement must have a mobile fallback and cannot block progression. Exit: features verified, mute respected and no accessibility regressions.

## L08 — Optional cinematic pipeline
Storyboard wake, villain entrance and finale; lock characters; generate short clips; compress, provide posters, skip and reduced-motion fallback. Video cannot be a dependency of gameplay. Exit: clips are consistent, licensed, lightweight and nonblocking. Cut entirely if schedule threatens core.

## L09 — Quality gate
Test 320/375/430px phones and desktop, keyboard, touch, landscape, no sound, slow network, refresh, save migration, reduced motion and replay. Test WebGL disabled, Spline scene failure, 2D map fallback, scene unload and memory pressure if Spline is enabled. Run typecheck/build, inspect console, measure performance and fix critical bugs. Exit: no blocking issue or horizontal overflow.

## L10 — Cinematic 2.5D Architecture & Shadow Village Integration
Adopt the ~4,000 Google Flow credit allocation across four accounts to build MORROW as an interactive 2.5D cinematic adventure. Implement the 7-beat narrative loop for each chapter (2.5D Establishing Scene → Sequential Dialogue → Cinematic Reveal Video → Return to Stage → Tactile Invention Minigame → Cinematic Success Payoff → Transition). Build the progressive playback engine with graceful fallbacks (posters, in-engine stages, keyboard controls, reduced-motion bypass). Fully integrate Chapter 1 (Lost Shadows Village) with `shadows-01-duck.mp4`, ground-projected tree shadow, Duck/Lantern/Snail minigame, and celebratory payoff. Exit: clean mobile execution, zero gameplay blocking, and evidence in LOOP_LOG.md.

## L11 — Full 6-Chapter Cinematic Rollout & Multi-Account Generation
Execute the 48-shot cinematic shot list (`docs/CINEMATIC_EXPANSION_PLAN.md`) across accounts A–D. Progressively ingest approved stop-motion clips for Weather Forest, Tomorrow Town, Clock Tower Finale, and the Epilogue. Preserve mobile responsiveness (320px–1440px), min 44px touch targets, default muted Web Audio, and zero horizontal overflow. Exit: complete six-chapter cinematic storybook verified with automated Playwright matrix and visual screenshots.

## Emergency cut policy
Keep L00–L05 and L09–L10. If Flow credits expire or generations fail, seamlessly fall back to the built-in 2.5D SVG/CSS stages and posters without interrupting progression. Prefer a complete, playable, beautifully crafted story over broken video players.
