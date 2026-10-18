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

## L06 — Floating 2.5D map
Layer illustrated islands, clouds, depth, stitched path, location previews, progress animations and locked/fog states. Keep portrait mobile controls and static fallback. Exit: readable navigation and stable 60fps-targeted interactions on representative devices.

## L07 — Personality and bonus
Add Sir Clack disaster log, Pipkin newspaper, dialogue variants, sound/mute, Easter egg, sparkle trail and visitor-memory polish. Each enhancement must have a mobile fallback and cannot block progression. Exit: features verified, mute respected and no accessibility regressions.

## L08 — Optional cinematic pipeline
Storyboard wake, villain entrance and finale; lock characters; generate short clips; compress, provide posters, skip and reduced-motion fallback. Video cannot be a dependency of gameplay. Exit: clips are consistent, licensed, lightweight and nonblocking. Cut entirely if schedule threatens core.

## L09 — Quality gate
Test 320/375/430px phones and desktop, keyboard, touch, landscape, no sound, slow network, refresh, save migration, reduced motion and replay. Run typecheck/build, inspect console, measure performance and fix critical bugs. Exit: no blocking issue or horizontal overflow.

## L10 — Release and submission
Confirm repository commit history, live URL, story write-up, character sheet, asset credits, mobile demo, README, screenshots and submission requirements. Freeze risky features. Exit: independently verified live deployed experience and submitted links.

## Emergency cut policy
Keep L00–L05 and L09–L10. Reduce L06 to static map, L07 to mute + one Easter egg, omit L08. Prefer a complete story over broken Tier 3.
