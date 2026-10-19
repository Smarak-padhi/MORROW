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

## Chapter 02: Living 2.5D Upside-Down Forest & Cinematic Video Slots

All cinematic shots specify their narrative intent, start/end frames, camera composition, and guaranteed in-engine stop-motion procedural fallbacks. Video generation is tracked honestly without claiming ungenerated media files are present.

| Video Slot ID | Target File / Fallback Path | Starting Visual Composition | Ending Visual Composition | Narrative Content & Camera | Fallback Mechanism | Status |
|---|---|---|---|---|---|---|
| `WEATHER-01` | `/cinematics/weather-01-canopy-pan.mp4` | Inverted moss roots anchoring into turquoise sky | Slow tilt down to inverted forest canopy with rising raindrops | Establishing shot of upside-down gravity; raindrops rising from ground to clouds | In-engine 2.5D SVG parallax layer (`WeatherStage.tsx` `.living-inverted-canopy-layer`) | **Designated Slot** (Procedural Fallback Active) |
| `WEATHER-02` | `/cinematics/weather-02-umbrella.mp4` | Frog Mayor on moss log with inverted leaf umbrella | Umbrella collects rising rain until it overflows into Mayor's coat | Character acting: Frog Mayor croaks indignantly as umbrella acts like a bucket | Handcrafted stop-motion SVG (`SceneFrogMayor` + modal in `WeatherStage.tsx`) | **Active Bridge Slot** (Procedural Fallback Active) |
| `WEATHER-03` | `/cinematics/weather-03-pipkin-dispatch.mp4` | Pipkin fluttering upside-down against drafts | Pipkin lands on twig unfurling "Daily Panic" headline | Comical news dispatch: "LOCAL CLOUD REFUSES GRAVITY" | In-scene character animation with anchored dialogue balloon | **Designated Slot** (Procedural Fallback Active) |
| `WEATHER-04` | `/cinematics/weather-04-loom-reveal.mp4` | Wide view of ancient carved brass weather loom | Close push-in on 3 tangled spools (Rain, Wind, Sun) | Dramatic reveal of the Weather Loom apparatus with humming brass guides | Interactive TactileWeatherLoom canvas overlay (`TactileWeatherLoom.tsx`) | **Designated Slot** (In-Engine Loom Active) |
| `WEATHER-05` | `/cinematics/weather-05-sky-restored.mp4` | Three woven glowing threads cinching to destinations | Forest canopy blooms; rain curves downward; windmill spins | Payoff celebration: Lilies bloom, windmill turns, warm sunbeams bathe Mayor | In-engine transformation SVG layers + payoff reflection banner | **Designated Slot** (Procedural Fallback Active) |

## Chapter 02 Interactive Inventions

| Asset Identifier | Asset Description | Source & Author | Rights / License | Status & Implementation |
|---|---|---|---|---|
| `inv-tactile-weather-loom` | 3-spool tactile pointer/touch weather loom with brass eyelets, trailing colored threads, blooming lilies, turning windmill, and warming sunbeams | Project-created React/SVG component (`src/components/inventions/TactileWeatherLoom.tsx`) | Original Work / MIT | **Playable v2.0** — Pointer/touch drag-to-weave + WCAG AA keyboard accessible alternative + resident inspection buttons. |
| `stage-living-weather-forest` | Living 2.5D upside-down forest scene with rising rain, inverted trees, persistent character row (Morrow, Sir Clack, Pipkin, Frog Mayor), dynamic camera attention, and seamless payoff | Project-created React component (`src/components/art/WeatherStage.tsx`) | Original Work / MIT | **Production v2.0** — Replaces cards with persistent interactive environment and inline cinematic player. |

