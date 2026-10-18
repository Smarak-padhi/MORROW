# MORROW — The Almost-Right Adventure

> **A tiny repairer. Three impossible problems. One wonderfully imperfect world.**

MORROW is a mobile-first interactive storybook and original-character portfolio for [Baby's First Website](https://hax.baby/baby-problem) (Track 2, 17–19 October 2026). The protagonist is an original baby **Stitchling** with an enchanted needle that stitches together shadows, weather, memories, and moments.

**Project status:** documentation/bootstrap, not yet a verified production build. This README describes intended behavior, not completed features.

## Story

Morrow runs an Almost-Right Repair Shop with Sir Clack, a sarcastic talking toolbox, and Pipkin, a dramatic courier bird. Three disasters lead them to **Professor Primrose Perfect**, a clockwork inspector who tries to erase all mistakes:

1. **The Shadow Scandal:** restore the village's shadows with the **Shadow Stitcher**.
2. **A Forecast of Absolute Nonsense:** fix upside-down rain with the **Weather Loom**.
3. **Tomorrow Has Been Cancelled:** restart the **Impossible Clock**.
4. **The First Unfinished Thing:** discover the mysterious shadow is Morrow's rejected first creation.
5. **Officially Imperfect:** make one unconventional final stitch and return to the transformed workshop.

The antagonist fears rejection because he was once discarded as an imperfect creation. The story is about belonging, imagination, funny failures and learning that mistakes can become beautiful. Dialogue uses running gags, dad jokes, comic newspaper headlines and emotionally grounded reveals.

## Experience and core requirements

- Original character introduction and five-point character sheet.
- Three playable inventions displayed as the character's portfolio.
- Scroll-driven illustrated chapters, interactive puzzles and a complete narrative.
- One shared **tap-first stitch mechanic** across the three puzzles, with optional drag interactions on desktop.
- Floating **2.5D illustrated progress map** (not free-roaming WebGL), chapter unlocks and local progress persistence.
- Responsive phone/tablet layout, touch and keyboard support, reduced motion, clear sound mute toggle.
- Hidden Easter egg, humorous failure reactions and replayable chapters.
- Optional AI-generated cinematic clips: compressed, skippable, poster-backed, with reduced-motion fallback.

## Design system — locked baseline

| Token | Color | Purpose |
|---|---|---|
| Cream | `#FFF8F1` | Background |
| Berry | `#A34063` | Accents |
| Ink | `#392F3B` | Text |
| Clay | `#C98F70` | Warm character tones |
| Sage | `#88A991` | Nature |
| Gold | `#E8C878` | Magic |
| Lilac | `#8E79A8` | Stitches |
| Night | `#25324A` | Night scenes |

**Fonts:** Fraunces for headings, Nunito for dialogue/body, Space Mono for counters and inspection stamps, Fredoka sparingly for comic accents. Art direction: original handmade paper-cut/illustrated Stitchling silhouettes, stitched borders, expressive 2D cutouts. No generic Disney-like fox character.

## Technical approach

**Planned:** Vite, React, TypeScript, CSS/SVG, targeted Motion animation, Web Audio API and versioned localStorage. Avoid unnecessary backends and heavy 3D dependencies. No guestbook until the complete core game passes mobile QA.

### Development

After the application scaffold is committed:

```bash
npm install
npm run dev
npm run build
```

Only run additional checks if their scripts exist in `package.json`. Test 320px, 375px and 430px mobile widths, keyboard/touch interactions, state restoration, mute, reduced motion and browser-console errors.

## Canonical documentation

| Document | Purpose |
|---|---|
| [AGENTS.md](AGENTS.md) | Mandatory agent instructions |
| [PRD](docs/PRD.md) | Requirements and scope |
| [TRD](docs/TRD.md) | Architecture and technical acceptance |
| [Design system](docs/DESIGN_SYSTEM.md) | Fonts, colors, characters, motion |
| [Story bible](docs/STORY_BIBLE.md) | Characters, canon, villain, finale |
| [Execution loops](docs/EXECUTION_LOOPS.md) | L00–L10 detailed work plan |
| [Loop log](docs/LOOP_LOG.md) | Actual evidence and status |
| [Scene matrix](docs/SCENE_MATRIX.md) | Scene/asset/interaction matrix |
| [Agent handoff](docs/AGENT_HANDOFF.md) | Agent coordination |
| [Traceability](docs/TRACEABILITY.md) | Requirements mapped to verification |
| [Asset register](docs/ASSET_REGISTER.md) | Attribution and provenance |
| [Skills adoption](docs/SKILLS_ADOPTION.md) | Reused skills and import status |

Read docs before changing story, design or mechanics. **User-approved scope → design system and story bible → PRD/TRD → loops → code**. Update documentation when an approved decision changes.

## Production loops

| Loop | Deliverable | Gate |
|---|---|---|
| L00 | Repo bootstrap, scripts, build verification | Required |
| L01 | Locked palette, fonts and original character design | Required |
| L02 | Dialogue, state and progress map | Required |
| L03 | Workshop and Shadow Stitcher | Required |
| L04 | Weather Loom | Required |
| L05 | Impossible Clock, villain and finale | Required |
| L06 | 2.5D map and animation polish | Scalable |
| L07 | Sounds, jokes, secrets and bonus quests | Scalable |
| L08 | Cinematic videos | Optional |
| L09 | Mobile, accessibility, performance and regression | Required |
| L10 | Deployment, credits, submission | Required |

**Every loop:** audit → design → implement → verify → document evidence → commit. Never mark untested features complete. Ship a fully playable mobile experience before optional polish.

## Git workflow

`main` is the release branch. Work on `bootstrap/*`, `feature/l0x-*`, and `fix/*` branches. Commit in reviewable units and record evidence in the loop log. Do not claim CI, deployment, or mobile QA has passed unless verified.

## Event and attribution

Public GitHub history during the sprint, a live deployed URL, original Track 2 character sheet and complete core requirements are mandatory. Code freeze: **19 October 2026, 17:17 IST**. Official rules: [hax.baby](https://hax.baby/baby-problem).

Record AI-generated art, audio/video, third-party sources and licenses in the asset register. No repository-wide open-source license is implied without an explicit LICENSE file.
