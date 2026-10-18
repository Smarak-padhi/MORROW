# Production plan — sprint and gates

## Hard gates
G0 Design lock (tokens, fonts, silhouette, art prompts, mobile layout). G1 Working intro, map, first puzzle. G2 Three playable inventions, progression, finale. G3 Original scene art, sound and video enhancements. G4 Mobile QA, deploy, submit. Never advance from G1 to G3 while core interactions remain broken.

## Recommended time allocation (remaining sprint, adjust to real clock)
0–2h: repository + docs + first deploy + tokens; 2–6h: character art + intro + Shadow Stitcher; 6–10h: Weather Loom + Clock (reuse mechanics); 10–13h: finale + progress; 13–16h: mobile QA + accessibility + optional sound; last 2h: deployment, screenshots, submission. Prioritize actual available time over this illustrative budget.

## Asset order
1. Morrow silhouette and turnaround, six expressions. 2. Supporting cast pose sheet. 3. Workshop and three backgrounds with separate foreground/background layers. 4. Puzzle props and gears. 5. World-map islands. 6. Cinematic storyboards and optional AI videos. Avoid unrelated images per scene.

## Image generation style prompt
'Original baby Stitchling fantasy creature, NOT a fox or Disney/Pixar character; round pear-shaped tiny body, short blunt face, asymmetric folded petal ears, stitched forehead mark, oversized plum patchwork scarf, spool-like tail with loose thread, mitten paws, warm clay fabric/fur, tactile 2D paper-cut picture book illustration, watercolor texture, hand-inked imperfect outlines, cream background, character sheet consistent proportions, no vest, no green shirt, no photorealistic 3D.'

## AI video shots
V01 Wake-up: 4–6s, scarf lifts, ears rise, Morrow blinks; locked workshop background; silent poster fallback; no embedded text. V02 Perfect enters: 3–5s theatrical stamp. V03 Shadow reveal: 5–8s tender memory; avoid uncanny morphing. V04 Final stitch: 5–8s gold thread closes clock. Output mobile-safe crop and lightweight poster; compressed WebM+MP4; skip controls; user gesture for audio.

## QA matrix
320/375/430/768/1280px; mouse, keyboard, touch; reload after each chapter; reset; muted/unmuted; slow network; reduced motion; no-JS fallback explanatory page; broken media fallback; contrast and focus rings. Use Playwright where available. Do not claim tests passed unless run.

## Definition of done
Three actually working inventions, coherent complete story, stable saved progress, phone tested, at least one Easter egg, public GitHub commits during event, deployed URL, attribution and submission text.

## Cut list when behind
Guestbook → 3D model → AI videos → visitor counter → extra sparkle effects. Never cut responsiveness, core story, three inventions, or final QA.
