# MORROW — complete cinematic production pack
**Target:** real Google Veo/Gemini animated footage; NOT slideshow motion. This document is ready for Google AI Studio / Flow manual generation without enabling API billing. The website loads the resulting MP4 files automatically.

## Source of truth
Use the approved 2026-10-18 handmade felt ensemble and Morrow turnaround supplied by the user. The old SVG and the older exported SVG PNG are **not** canonical character design. Every clip must use the approved felt Morrow reference and scene-specific cast reference. Character lineup: Morrow, Sir Clack, Pipkin, Professor Primrose Perfect, Unfinished One, Shadow Village Duck, Frog Mayor. In the story, Professor Perfect is female in the approved ensemble image; retain her porcelain appearance.

## Master prefix — paste BEFORE each scene prompt
"Make a genuinely animated premium miniature handcrafted stop-motion fantasy film, 16:9 landscape, cinematic depth of field, expressive physical acting, real felt fibers, knitted patchwork, wooden props, porcelain and brass. Match the uploaded approved character reference exactly: do not change ears, faces, costumes, body proportions, forehead diamond, scarf or spool tail. Character motion must involve articulated bodies, independent ears, facial reactions, moving paws, physical prop interactions and coherent cause/effect, not a still photo with a zoom. Natural cinematic camera and consistent lighting. No words on screen, no subtitles, no logos, no jump cuts, no anatomy mutation, no character merging. Native environmental audio, no spoken dialogue unless requested. Approximate 8-second single coherent shot."

## Video filenames, prompts, integration points

### 01. `public/cinematics/morrow-waking.mp4` — opening AFTER "Open the story"
Reference: approved Morrow turnaround. Set: warm cluttered workshop, shelves, brass bell, glowing spool, golden morning light.
**Prompt:** "0–2 seconds: Morrow sleeps curled on a tiny quilt, belly breathing and one ear twitching. 2–4: brass bell rings; both button eyes blink awake; one ear perks and one flops. 4–6: he tries to stand, tangles in plum scarf, gently stumbles and knocks a spool off the bench. 6–8: golden thread rises from the spinning spool into a small star; he follows it with his eyes, reaches with mitten paw, then shyly looks at the viewer. A complete physical character performance. Quiet bell, scarf rustle, wood spool and magic chime." 
**Continuity:** next interactive beat is workshop and Sir Clack's bell. If this exact clip is already approved, use the user's real Gemini MP4, don't regenerate it.

### 02. `public/cinematics/morrow-shadows.mp4` — chapter 1 arrival
References: Morrow, duck, Unfinished One; world reference Shadow Village.
**Prompt:** "Midnight blue handmade village of crooked houses, lanterns and moonlit cobblestones. Morrow and Sir Clack arrive at a square where a little cream felt duck walks proudly. Its SHADOW is a towering tree that sways and spreads branches while the duck's body waddles. Duck stops, looks at tree shadow, turns to Morrow and indignantly flaps wings. Morrow tilts his head and reaches toward the moving shadow with a needle; in the distant background, the tiny Unfinished One catches a loose golden thread unnoticed. Visible continuous duck walking, shadow movement, character acting, physically moving cloth and lanterns. Moonlit whimsical comedy, gentle quacks and soft footfalls."

### 03. `public/cinematics/morrow-weather.mp4` — chapter 2 arrival
References: Morrow, Pipkin, Frog Mayor; world reference Weather Forest.
**Prompt:** "Vibrant felt-and-clay enchanted forest with giant flowers and a wooden weather loom. Raindrops fall UP from flower petals into the clouds. Frog Mayor in plum jacket and crooked top hat tries to catch upward rain in an upside-down umbrella; the umbrella flips and the frog stumbles backward, hat bouncing. Blue Pipkin swoops past and flutters wildly, messenger satchel swinging. Morrow walks toward the loom, touches a glowing spool, and looks up in astonishment as rain threads rise past his ears. Continuous true character and environment animation, physically coherent upward water, cloth and feathers, funny gentle sound effects."

### 04. `public/cinematics/morrow-clock.mp4` — chapter 3 arrival
References: Morrow, Unfinished One; world reference Tomorrow Town.
**Prompt:** "Purple twilight miniature town frozen between seconds: clock hands stuck, baker holding dough midair, fluttering paper suspended. Morrow steps into the enormous brass clock tower; his moving feet and scarf contrast with the frozen world. Three strange golden gears turn briefly, grind, then stop. He studies the mechanism, raises his needle and discovers a gear-shaped empty socket. Behind a pillar, the shy shadow creature silently cradles a glowing heart-shaped gear. Camera tracks Morrow's movement and pushes gently toward the missing socket; dust floats, mechanical clicks echo. No dialogue, no static poses."

### 05. `public/cinematics/morrow-finale.mp4` — before final interactive stitch
References: Morrow, Professor Primrose Perfect, Unfinished One.
**Prompt:** "Inside a gigantic brass clock tower at dusk. Tall elegant porcelain clockwork inspector Professor Primrose Perfect, wearing antique rose fitted inspector coat, has fine hairline cracks in porcelain face. She extends a rigid brass hand and stamps a crooked golden seam as incorrect. Morrow recoils; his plum scarf and floppy ear move naturally. A tiny navy unfinished felt-and-shadow creature emerges from the darkness, loose threads trailing, glowing eyes soft. Morrow recognizes its crooked golden knot, lowers his needle, and takes one hesitant step toward it. The shadow creature takes one hesitant step toward Morrow. Emotional physical acting and moving faces, no text, no forced happy ending yet; player completes final stitch interactively."

### 06. `public/cinematics/morrow-epilogue.mp4` — after final stitch
References: approved ensemble, prioritize Morrow and Unfinished One.
**Prompt:** "Golden sunrise floods the tiny workshop. A visibly crooked golden stitch joins Morrow's paw to the Unfinished One's hand, and threads ripple through the workshop as gears begin to turn. Sir Clack's brass latch curls into a proud smile; Pipkin excitedly flutters and scatters newspaper pages; Professor Perfect gently lowers her official stamp, smiles with tiny cracked porcelain face, and accepts an imperfect flower. Morrow laughs, ears wiggle and plum scarf sways. End on a warm shot of Morrow and the Unfinished One looking at each other. Physical animated ensemble reactions, subtle emotion, no written headlines or text."

### 07. `public/cinematics/morrow-world.mp4` — optional world-map transition
References: approved miniature world visual. **Prompt:** "Camera physically travels along a living golden thread from the workshop window out into a vast cloudscape of five floating handmade miniature islands. Windmill sails rotate, little lanterns flicker, weather shifts, and thread visibly stitches an irregular golden route between islands. One continuous sweeping cinematic fly-through, volumetric clouds and changing parallax, no still zoom, no labels."

### 08. `public/cinematics/morrow-perfect.mp4` — optional character introduction
Reference: approved Professor Perfect. **Prompt:** "Elegant tall porcelain clockwork inspector in antique rose coat emerges from a rotating brass mechanism in a giant clock tower. She takes three precise measured steps, inspects a crooked fabric flower with her brass fingers, hesitates when she notices a crack in her own porcelain wrist, then straightens and stamps a clipboard. Each action is clearly physically animated; nuanced face, cloth coat movement, audible ticking and stamp, no words on screen."

## Production protocol
1. Export/upload approved reference for each character separately, preferably front and three-quarter views. Do not use an ensemble lineup as the sole reference for a complex multi-character scene.
2. Generate ONE shot at a time with master prefix + shot prompt. Save original MP4, original audio, generation prompt, and any provenance metadata.
3. Inspect frame 0, 25%, 50%, 75%, final frame. Reject if anatomy, ears, scarf, tail or costume drifts, if character freezes while only camera moves, or if scene logic is wrong.
4. The React app expects exact filenames above in `public/cinematics/`. No runtime Gemini SDK/API key needed. MP4s are user-created and must be copied into the repository locally; GitHub's text-only editor cannot upload binary video.
5. Create posters `public/cinematics/morrow-<scene>.jpg` from a clean mid-frame (ffmpeg: `ffmpeg -ss 00:00:03 -i input.mp4 -frames:v 1 output.jpg`).
6. Compress for mobile while preserving audio (example: `ffmpeg -i input.mp4 -c:v libx264 -crf 24 -preset medium -pix_fmt yuv420p -movflags +faststart -c:a aac -b:a 128k output.mp4`). Keep original master files outside the public web bundle.
7. Do not claim any video is finished until the real Veo MP4 exists. If generation credits run out, leave the chapter fully playable using the cinematic fallback.

## Website/game acceptance
- Opening: player taps "Open the story" -> waking video -> workshop bell interaction.
- Chapter 1: shadow matching requires three meaningful repairs, repeat choices guarded, feedback.
- Chapter 2: Rain→Lilies, Wind→Windmill, Sun→Frog, wrong match rejected.
- Chapter 3: Shadow→Weather→Heart gear order; wrong order rejected.
- Finale: player makes deliberate crooked stitch; emotional story resolves.
- Epilogue: scrapbook/portfolio ONLY after completing the story.
- All cinematics have Skip, Replay after finish, mute/unmute, load failure fallback, reduced-motion bypass. Never block story if MP4 is absent.
- Mobile 320/375/430/768px and desktop; keyboard and touch; no horizontal overflow; test reset/reload and video errors.
- Ship with actual evidence: video screenshots, gameplay screenshots, browser console, build logs and deployed URL.

## Credits
Generated artwork and footage: Gemini / Veo with original user-directed characters; document exact model and generation date in `docs/ASSET_REGISTER.md`. No third-party character IP.
