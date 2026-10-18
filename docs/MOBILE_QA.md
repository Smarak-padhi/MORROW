# Mobile + gameplay QA (run before deployment)

Target devices: 320×800, 375×812, 430×932, 768×1024, 1280×800. **Also test a physical Android Chrome and iOS Safari if available**; desktop emulation is not sufficient for iOS autoplay and browser toolbar behavior.

## Local commands
```bash
npm ci
npm run build
npm run dev
# in a separate terminal, install Playwright without changing package.json or lock:
npm install --no-save playwright
npx playwright install chromium
node scripts/mobile-qa.mjs
```
Screenshots go to `qa/screenshots`. Never commit large screenshots to the production build unless deliberately required for evidence.

## Critical manual acceptance
- Tap Open the story -> waking video appears only if its MP4 is present; if not, fallback is visible and Continue the adventure works. Test Skip, Replay, mute/unmute, end and error. Test low-power mobile and reduced-motion.
- In every chapter, check scrollWidth <= clientWidth. No sideways scrolling, cropped characters, overlapping chapter controls, tiny buttons, or text clipped by safe areas.
- All seven approved felt character images should load; inspect Network 404s. Never silently fall back to the rejected SVG.
- Shadow Stitcher requires three unique options; duplicates do not progress.
- Weather Loom wrong Sun→Lilies does not progress; Rain→Lilies, Wind→Windmill, Sun→Frog does.
- Impossible Clock rejects Heart first; Shadow→Weather→Heart succeeds.
- Finale crooked stitch leads to epilogue; portfolio must NOT be visible before epilogue.
- Reload at each chapter, reset, keyboard tab/enter, screen reader names, sound-off by default, reduced motion.
- Cinematic videos are not game gates: missing files must not prevent chapter progression.
- Run and document `npm run build` output, browser errors and screenshot evidence.

## File drop-in
Extract `MORROW_VEO_STARTER.zip` from earlier chat, and **copy the CONTENTS of MORROW_DROP_IN into the repo root**, not the folder itself. Required paths: `public/cinematics/morrow-waking.mp4`, `public/cinematics/morrow-waking.jpg`, `public/characters/morrow.png`. Add new Gemini MP4s as `public/cinematics/morrow-shadows.mp4`, `morrow-weather.mp4`, `morrow-clock.mp4`, `morrow-finale.mp4`, `morrow-epilogue.mp4`.

## Status
Browser tests are **scripted but not yet executed** here. Antigravity must run and report actual pass/fail, not claim green based on code review.
