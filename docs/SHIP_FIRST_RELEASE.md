# MORROW — Ship-first release plan (2026-10-19)

## Locked scope
MORROW is a **playable storybook**, not a video reel or a portfolio landing page. The approved, real `morrow-waking.mp4` is the sole mandatory cinematic for this release. Chapter transitions use existing animated React environments and dialogue. **No other Veo generation is a blocker.** The three inventions, three-step final stitch, epilogue and saved progress must work.

## Optional post-launch video slots
Only if user provides approved, continuity-checked real MP4s:
- Professor Primrose Perfect entrance: `public/cinematics/morrow-perfect.mp4`
- Final Stitch emotional resolution: `public/cinematics/morrow-finale.mp4`
Do **not** automatically load these files until they are reviewed, committed and explicitly wired to the correct story beats. Do not regenerate the duck/tree-shadow effect in Veo; preserve exact mechanics in the interactive Shadow Stitcher.

## Launch acceptance
1. Verify waking video loads on Android Chrome with user gesture, audio off by default, Skip, Replay, poster and reduced-motion bypass.
2. Play workshop -> Shadow Stitcher (three resident matches) -> Weather Loom (three correct pairings) -> Impossible Clock (correct order) -> three-step Final Stitch -> epilogue.
3. Confirm no premature portfolio or character-sheet marketing page.
4. Check mobile widths 320, 375, 430; tablet 768; desktop 1280, 1440. No horizontal overflow, clipped buttons, unscrollable puzzle, safe-area overlap, or keyboard trap.
5. Test missing opening video: story continues without blocking.
6. Test localStorage resume, Start Over, sound, keyboard and reduced motion.
7. Run `npm ci && npm run build`, `node scripts/mobile-qa.mjs`, and manual visual screenshot review. Document actual outcomes; CI build success alone is not browser QA.
8. Deploy preview, inspect the actual public URL on phone, then merge PR when approved.

## Antigravity handoff
Pull `feat/skills-discovery-and-bootstrap`. Run full QA and fix visual/story polish, not new features. Do not wait for more AI videos. Report public preview URL, screenshot evidence, build/test status, outstanding P0/P1 defects. Release as soon as acceptance criteria pass.

## Later enhancement
After release, add the two optional emotional cutscenes behind explicit asset-presence checks or a production manifest; maintain a complete no-video path.
