# Asset Register — MORROW: The Almost-Right Adventure

In compliance with Track 2 rules and MORROW's production criteria, all artistic, procedural, and visual assets are logged with their provenance, license, dimensions, and technical implementation.

No third-party character IP (fox, Disney, Nintendo, etc.) is used. MORROW is an original fantasy Stitchling creature created uniquely for this project.

| Asset Identifier | Asset Description | Source & Author | Rights / License | Status & Implementation |
|---|---|---|---|---|
| `art-morrow-svg` | Original character illustration (Stitchling: pear shape, asymmetric ears, button eye shine, oversized plum patchwork scarf, spool tail) | Project-created procedural SVG (`src/components/art/Morrow.tsx`) | Original Work / MIT | **LOCKED v1.0** — 6 dynamic facial expressions (`curious`, `happy`, `determined`, `surprised`, `sheepish`, `focused`). Zero third-party IP likeness. |
| `art-sir-clack` | Grumpy antique wooden toolbox with brass hinges, handle, and keyhole mustache | Project-created procedural SVG (`src/components/art/SupportingCast.tsx`) | Original Work / MIT | **LOCKED v1.0** — Featured in Prologue and Workshop scene. |
| `art-pipkin` | Dramatic messenger bird with delivery satchel and wide eyes | Project-created procedural SVG (`src/components/art/SupportingCast.tsx`) | Original Work / MIT | **LOCKED v1.0** — Featured in Chapter 2 Weather scene. |
| `art-unfinished-one` | Shadow creature with crooked golden stitch knot | Project-created procedural SVG (`src/components/art/SupportingCast.tsx`) | Original Work / MIT | **LOCKED v1.0** — Mystery clue and Finale co-protagonist. |
| `inv-shadow-stitcher` | Shadow Stitcher puzzle table and interactive duck SVG | Project-created procedural SVG (`src/components/inventions/ShadowStitcher.tsx`) | Original Work / MIT | **Playable v1.0** — Real-time shadow preview and stitch effect. |
| `inv-weather-loom` | Sky weather thread spools and weaving target controls | Project-created React component (`src/components/inventions/WeatherLoom.tsx`) | Original Work / MIT | **Playable v1.0** — Dual-step thread selector and weaving action. |
| `inv-impossible-clock` | Dial with rotating hands and 3 interlocking irregular gears | Project-created SVG (`src/components/inventions/ImpossibleClock.tsx`) | Original Work / MIT | **Playable v1.0** — Interactive gear fitting and tick animation. |
| `inv-finale-stitch` | Crooked golden knot joining two hands | Project-created SVG (`src/components/inventions/FinaleStitch.tsx`) | Original Work / MIT | **Playable v1.0** — Finale narrative resolution stitch. |
| `favicon-brand-mark` | Golden stitched star inside paper medallion | Project-created SVG (`public/favicon.svg`) | Original Work / MIT | **Production** |
| `web-fonts` | Fraunces, Nunito, Space Mono typography | Google Fonts | Open Font License (OFL) | **Imported** via `<link rel="stylesheet">` with offline system-ui fallbacks. |
| `audio-procedural` | Procedural Web Audio API synthesizer (sine/square/triangle oscillators) | Project-created code (`src/sound.ts`) | Original Work / MIT | **Active** — User-gesture enabled, default muted, 5 distinct SFX, 0 external audio files needed. |
