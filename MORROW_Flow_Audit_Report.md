# MORROW — Google Flow Export Audit (19 Oct 2026)

## Source and checks
- Source: `Oct 19 - 02_00.zip`.
- Inventoried **66** original entries: **44 JPEG photos** and **22 MP4 videos**.
- Compared SHA-256 hashes to the older media uploaded in this conversation, including the seven latest cinematic MP4s. All seven previously supplied cinematics occur in this export.
- Two duplicate video entries detected and omitted from output: second Frog Mayor leaf-umbrella file; second Sir Clack workbench-speaking file.
- Output preserves **20 unique original MP4s**, every one checked with ffprobe (all playable, 19 clips 8 seconds and one about 10 seconds, 1280×720, audio present).
- All 44 original JPEGs are retained in selected/raw, alternate or rejected collections, and three high-quality WebP versions of the environment plates were additionally prepared.
- Five ZIP packages were checksum validated and each is **less than 20,000,000 bytes**.

## Verified visual issues and safety precautions
- JPEGs cannot encode actual transparent alpha; checkerboard imagery in several photos is baked into the image. **18 canonical source sprite candidates** are stored in `NEEDS_BACKGROUND_REMOVAL` and must receive proper alpha extraction/alignment prior to use under `public/characters`.
- Four Morrow alternates show character-design drift (two top hats; two wings). These are in `review-only/rejected-character-drift` and **must not** replace canonical Morrow poses.
- The movie called `Shadow_slides_across_village_cob...` visually contains a Professor/interior door scene; it is quarantined as `MISLABELED` for manual review rather than placed in the shadow-chapter cinematic slot.
- Two clock films depict freeze/clock events; the alternative was **not** verified as a restart. `clock-02-restart.mp4` remains missing.
- Frog umbrella alternate shots exist and were preserved as review-only alongside one approved clip.
- The three environments are single flattened photographs and cannot be truthfully labeled as separate sky/midground/foreground alpha plates.

## Missing from the requested asset manifest
- Sprites: `clack-worried.png`, `duck-happy.png`.
- Film: `clock-02-restart.mp4`.
- Independent background layers: `workshop-table.webp`, `shadows-sky.webp`, `shadows-cobblestones.webp`, `forest-sky.webp`, `forest-moss-ground.webp`.
- Stage props remain to be inspected in the actual repository; this is a Flow export review, not a repository build/playtest.

## Packs (all safely under the upload cap)

| ZIP | Size (decimal MB) | Contents |
|---|---:|---|
| `MORROW_Flow_01_Artwork.zip` | 11.35 | 44 original JPGs; 18 selected character source images; 3 environment WebPs; rejection/review labels; `README.md`, `POST_MASTER_INTEGRATION.md`, `FLOW_ASSET_AUDIT.json` |
| `MORROW_Flow_02A_Prologue.zip` | 17.86 | Seven unique workshop/prologue videos for optional review |
| `MORROW_Flow_02B_Prologue_Shadow.zip` | 12.03 | Five unique workshop/shadow-related videos, including the misnamed interior clip for review |
| `MORROW_Flow_03_Weather.zip` | 17.69 | Five unique weather videos; three mapped/approved and two additional review alternatives |
| `MORROW_Flow_04_Clock_Finale.zip` | 11.70 | Clock freeze, finale knot; alternate clock clip set aside as NOT restart |

## How to use *after* the current master-agent run

1. Do not interrupt the current master run. After it finishes, upload/extract the five ZIPs to the MORROW repository root, keeping their nested `MORROW_ASSET_INTAKE/` directory.
2. These packs intentionally do **not** directly overwrite `public/`, React files, or existing assets.
3. Ask Antigravity to follow `MORROW_ASSET_INTAKE/POST_MASTER_INTEGRATION.md` and review `FLOW_ASSET_AUDIT.json`. It should compare incoming assets to any changes made during the master run before installing.
4. Generate real RGBA PNG characters by background removal; only stage images with checked transparency. Do not import checkerboard JPGs directly as actors.
5. Independently verify playback, mapping, responsive rendering, accessibility, puzzle save-state, actual screenshots, and logs. Missing art should be reported, not faked.
