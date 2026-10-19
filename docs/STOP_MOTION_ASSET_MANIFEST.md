# MORROW — Stop-Motion Asset Manifest & Production Inventory

**Document Version:** 1.0.0 (Loop 12.7)  
**Standard:** Handcrafted Miniature Stop-Motion & 2.5D Puppet Rigging  
**Artistic Baseline:** 7 Approved Google Flow Character Designs (`production-references/ensemble-approved.png`)

---

## 1. Directory Structure

All game assets are strictly organized into designated public runtime directories:

```
public/
├── characters/        # Transparent PNG/WebP character puppet cutouts
├── environments/      # 2.5D multiplane environment background & foreground plates
├── props/             # Physical interactive inventions, apparatus, and story props
└── cinematics/        # 16:9 Google Flow MP4 video clips and poster frames
```

---

## 2. Character Sprite Asset Inventory

Each character requires transparent cutouts with alpha channels (min 1024×1024px source, rendered at responsive CSS bounds). Sprites represent physical tactile felt, carved wood, porcelain, or brass materials.

| Character | Role / Archetype | Required Sprite Keys | Asset Path Pattern | Status |
|---|---|---|---|---|
| **Morrow** | Apprentice Stitchling | `idle`, `talking`, `surprised`, `happy`, `worried`, `action` | `/characters/morrow-{state}.png` | **Model Sheet & Cutouts Active** (`morrow-idle.png`, `morrow-talking.png`, `morrow-action.png`, `morrow-happy.png`) |
| **Sir Clack** | Grumpy Toolbox Mentor | `idle`, `talking`, `surprised`, `happy`, `worried`, `action` | `/characters/clack-{state}.png` | **Cutouts Active** (`clack-idle.png`, `clack-talking.png`) |
| **Pipkin** | News Delivery Bird | `idle`, `talking`, `surprised`, `happy`, `worried`, `action` | `/characters/pipkin-{state}.png` | **Cutouts Active** (`pipkin-idle.png`, `pipkin-talking.png`, `pipkin-surprised.png`) |
| **Frog Mayor** | Mayor of Upside-Down Forest | `idle`, `talking`, `surprised`, `happy`, `worried`, `action` | `/characters/frog-{state}.png` | **Cutouts Active** (`frog-idle.png`, `frog-talking.png`, `frog-happy.png`) |
| **Village Duck** | Shadow Village Resident | `idle`, `talking`, `surprised`, `happy`, `worried`, `action` | `/characters/duck-{state}.png` | **Cutouts Active** (`duck-idle.png`, `duck-talking.png`) |
| **Professor Perfect** | Clock Tower Perfectionist | `idle`, `talking`, `surprised`, `happy`, `worried`, `action` | `/characters/professor-{state}.png` | **Cutouts Active** (`professor-idle.png`, `professor-talking.png`, smiling/surprised delight state) |
| **Baker** | Tomorrow Town Baker | `idle`, `talking`, `happy` | `/characters/baker-{state}.png` | **Illustrated Paper-Craft Stop-Motion Fallback** (Accurately documented: awaiting photographic cutout in future intake; StopMotionActor serves handcrafted illustrated paper-craft puppet with flour-dusted linen apron and wooden bread peel, zero 404 network attempts) |
| **The Unfinished One** | Shadow Silhouette Co-protagonist | `idle`, `talking`, `surprised`, `happy`, `worried`, `action` | `/characters/unfinished-{state}.png` | **Cutouts Active** (`unfinished-idle.png`, `unfinished-action.png`) |

---

## 3. Environment Multiplane Plates

Multiplane plates are split into Background (far horizon), Midground (walkable surfaces & set architecture), and Foreground (framing elements & practical lighting).

| Chapter | Environment ID | Layer | Description | Path | Status |
|---|---|---|---|---|---|
| **Prologue** | `workshop-bench` | Far BG | Workbench wall with hanging tools, thread reels | `/environments/workshop-bg.webp` | Integrated in comic |
| **Prologue** | `workshop-bench` | Mid | Wood-grain workbench table surface | `/environments/workshop-table.webp` | Integrated in comic |
| **Prologue** | `workshop-bench` | FG | Brass lamp glow & scissor silhouette | `/environments/workshop-fg.webp` | Integrated in comic |
| **Chapter 1** | `shadow-village` | Multiplane | Twilight village square with cobbled streets | `/environments/shadows-sky.webp` | In-Engine 2.5D Living Scene |
| **Chapter 2** | `weather-forest` | Multiplane | Inverted forest canopy, rain, moss knolls | `/environments/forest-sky.webp` | In-Engine 2.5D Living Scene |
| **Chapter 3** | `tomorrow-town` | Set Plate | Tabletop miniature Victorian clockwork city, giant brass gears, crooked shops | `/environments/tomorrow-town.webp` | **Active 1080p Film Set Plate** |
| Chapter | Environment ID | Layer | Description | Path | Status |
|---|---|---|---|---|---|
| **Prologue** | `workshop-bench` | Far BG | Workbench wall with hanging tools, thread reels | `/environments/workshop-bg.webp` | Integrated in comic |
| **Prologue** | `workshop-bench` | Mid | Wood-grain workbench table surface | `/environments/workshop-table.webp` | Integrated in comic |
| **Prologue** | `workshop-bench` | FG | Brass lamp glow & scissor silhouette | `/environments/workshop-fg.webp` | Integrated in comic |
| **Chapter 1** | `shadow-village` | Multiplane | Twilight village square with cobbled streets | `/environments/shadows-sky.webp` | In-Engine 2.5D Living Scene |
| **Chapter 2** | `weather-forest` | Multiplane | Inverted forest canopy, rain, moss knolls | `/environments/forest-sky.webp` | In-Engine 2.5D Living Scene |
| **Chapter 3** | `tomorrow-town` | Set Plate | Tabletop miniature Victorian clockwork city, giant brass gears, crooked shops | `/environments/tomorrow-town.webp` | **Active 1080p Film Set Plate** |
| **Chapter 4** | `finale-cathedral` | Multiplane | Inside the monumental Clock Tower Cathedral mechanism with Gothic moonlit clock face, stained-glass rose window, rotating brass gears, hanging thread spools, floating dust particles, and dynamic golden dawn wash | Procedural In-Engine Stop-Motion Theatre Plate | **Active In-Engine Cathedral (Sprint 03)** |
| **Epilogue** | `scrapbook-desk` | Surface | Handmade linen desk pad with stitched album | `/environments/scrapbook-desk.webp` | In-Engine 2.5D Living Scene |

---

## 4. Props & Interactive Inventions

Physical props engineered for tactile pointer/touch interactions:

| Prop ID | Description | Specifications | Path | Status |
|---|---|---|---|---|
| `prop-weather-loom` | Carved brass Weather Loom apparatus | Polished brass filigree, 3 spool spindles, brass guide eyelets | `/props/weather-loom.webp` | Procedural SVG In-Engine |
| `prop-spool-rain` | Glass spool wound with indigo-blue water thread | Glows with cool water aura | `/props/spool-rain.webp` | Procedural SVG In-Engine |
| `prop-spool-wind` | Brass spool wound with lavender breeze thread | Glows with spiral draft aura | `/props/spool-wind.webp` | Procedural SVG In-Engine |
| `prop-spool-sun` | Gold spool wound with golden sunbeam thread | Glows with solar bright aura | `/props/spool-sun.webp` | Procedural SVG In-Engine |
| `prop-frog-umbrella` | Inverted leaf umbrella bucket with cane handle | Sloshing water pool, drops spilling | `/props/frog-umbrella.webp` | Procedural SVG In-Engine |
| `prop-thirsty-lilies` | Stone water basin with parched buds $\to$ blooming water lilies | Concentric blue ripple rings | `/props/thirsty-lilies.webp` | Procedural SVG In-Engine |
| `prop-frozen-windmill` | Wooden sails on brass axletree | Static $\to$ rotating with wind | `/props/windmill-sails.webp` | Procedural SVG In-Engine |
| `prop-impossible-clock` | Physical Miniature Impossible Clock | 3 direct physical manipulations: brass cog pointer drag & mesh, weather dial direct circular rotation with magnetic lock to 180° South, crooked heart mainspring elastic tension pull & escapement seating. 8-stage timed transformation sequence. Dual accessible drawer. | In-Engine Physical Mechanism | **Fully Playable In-Engine (Sprint 02.1)** |
| `prop-final-stitch` | Tactile Final Stitch Mechanism | 1 coherent tactile pointer/touch drag mechanic: guiding golden needle across the chasm gap with catenary drape, companion reach, magnetic snap at uneven ends, cinching the signature crooked knot. 7-stage timed choreographed emotional climax. Dual-mode keyboard accessibility drawer. | In-Engine Tactile Canvas | **Fully Playable In-Engine (Sprint 03)** |
| `prop-golden-needle` | Morrow's polished brass needle with trailing thread | Used as pointer drag cursor | `/props/brass-needle.webp` | Procedural SVG In-Engine |

---

## 5. Google Flow Cinematic Videos (`public/cinematics/`)

All cinematic video slots are 16:9 full-frame stop-motion clips generated via Google Flow / Gemini. When an MP4 file is physically present in `public/cinematics/`, the application automatically plays the video; otherwise, it seamlessly displays the handcrafted in-engine animated stop-motion fallback.

| Shot ID | File Name | Narrative Beat | Duration | Video Present? | Fallback Mode |
|---|---|---|---|---|---|
| `PROLOGUE-01` | `morrow-waking.mp4` | Morrow wakes up tangled in yarn | 4s | **YES (3.6 MB)** | Stop-motion poster |
| `PROLOGUE-02` | `prologue-02-giant.mp4` | Giant boot shakes the workshop | 3s | **YES (2.2 MB)** | Stop-motion poster |
| `PROLOGUE-03` | `prologue-03-clack-visitor.mp4` | Sir Clack knocks with indignation | 3s | **YES (2.6 MB)** | Stop-motion poster |
| `PROLOGUE-04` | `prologue-04-morrow-hello.mp4` | Morrow waves hello sheepishly | 2s | **YES (1.9 MB)** | Stop-motion poster |
| `PROLOGUE-05` | `prologue-05-pipkin-emergency.mp4` | Pipkin crashes in with headline | 3s | **YES (3.0 MB)** | Stop-motion poster |
| `PROLOGUE-06` | `prologue-06-clack-which-part.mp4` | Sir Clack asks which part is broken | 3s | **YES (2.5 MB)** | Stop-motion poster |
| `PROLOGUE-07` | `prologue-07-pipkin-yes.mp4` | Pipkin shouts "ALL OF IT!" | 2s | **YES (2.2 MB)** | Stop-motion poster |
| `PROLOGUE-08A`| `prologue-08-door-original.mp4` | Door opens to impossible world | 4s | **YES (3.5 MB)** | Stop-motion poster |
| `PROLOGUE-08B`| `prologue-08-door-shadow.mp4` | Shadow Village vista reveal | 3s | **YES (2.4 MB)** | Stop-motion poster |
| `SHADOWS-01`  | `shadows-01-duck.mp4` | Duck discovers its oak tree shadow | 3s | **YES (2.6 MB)** | In-Engine Stop-Motion Modal |
| `WEATHER-01`  | `weather-01-canopy.mp4` | Upside-Down Forest inverted canopy reveal | 4s | *Designated Slot* | In-Engine 2.5D SVG Scene |
| `WEATHER-02`  | `weather-02-umbrella.mp4` | Frog Mayor umbrella bucket disaster | 3s | *Designated Slot* | In-Engine Stop-Motion Modal |
| `WEATHER-03`  | `weather-03-pipkin.mp4` | Pipkin inverted news dispatch | 3s | *Designated Slot* | In-Scene Anchored Dialogue |
| `WEATHER-04`  | `weather-04-loom.mp4` | Carved brass Weather Loom discovery | 4s | *Designated Slot* | Tactile Weaving Canvas |
| `WEATHER-05`  | `weather-05-bloom.mp4` | Restored weather payoff & blooming lilies | 4s | *Designated Slot* | Persistent SVG Transformation |
| `CLOCK-01`    | `clock-01-freeze.mp4` | Professor Perfect's frozen pendulum & clockwork city | 4s | **YES (4.8 MB, Poster Active)** | Integrated in ClockStage |
| `CLOCK-02`    | `clock-02-restart.mp4`| Impossible clock ticking payoff | 4s | *Designated Slot* | In-Engine Clock Payoff |
| `FINALE-01`   | `finale-01-knot.mp4` | Crooked knot narrative resolution | 5s | *Designated Slot* | In-Engine Finale Stage |

---

## 6. Zero-Fabrication Integrity Statement

In strict accordance with project non-negotiables:
- No placeholder assets or mismatched web clipart are ever disguised as finished stop-motion art.
- If a sprite or video file is not yet generated, the system renders its corresponding handcrafted in-engine stop-motion SVG model.
- Transparent sprite layering and video player channels are verified and hot-swappable as Google Flow assets are delivered.
