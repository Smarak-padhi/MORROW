# MORROW — The Almost-Right Adventure

> **A tiny repairer. Three impossible problems. One wonderfully imperfect world.**

MORROW is a mobile-first interactive storybook and original-character portfolio for [Baby's First Website](https://hax.baby/baby-problem) (Track 2, 17–19 October 2026). The protagonist is an original baby **Stitchling** with an enchanted needle that stitches together shadows, weather, memories, and moments.

**Project status:** Working application build with locked design tokens, original SVG character expressions, supporting cast, 3 playable invention mechanics, interactive chapter map, procedural audio engine, and local storage state persistence.

---

## Story

Morrow runs an Almost-Right Repair Shop with Sir Clack, a sarcastic talking toolbox, and Pipkin, a dramatic courier bird. Three disasters lead them to **Professor Primrose Perfect**, a clockwork inspector who tries to erase all mistakes:

1. **The Shadow Scandal:** restore the village's shadows with the **Shadow Stitcher**.
2. **A Forecast of Absolute Nonsense:** fix upside-down rain with the **Weather Loom**.
3. **Tomorrow Has Been Cancelled:** restart the **Impossible Clock**.
4. **The First Unfinished Thing:** discover the mysterious shadow is Morrow's rejected first creation.
5. **Officially Imperfect:** make one unconventional final stitch and return to the transformed workshop.

The antagonist fears rejection because he was once discarded as an imperfect creation. The story is about belonging, imagination, funny failures, and learning that mistakes can become beautiful.

---

## Experience and Core Requirements

- **Original character introduction** and five-point character sheet (pear-shaped Stitchling fantasy creature, NOT a Disney-like fox).
- **Three playable inventions** displayed as the character's portfolio:
  - *Shadow Stitcher*: join experimental shadows to the duck with instant visual and narrative feedback.
  - *Weather Loom*: choose sky-thread spools (downpour, breeze, sunbeam) and weave them to earthly targets.
  - *Impossible Clock*: fit three irregular gears (shadow cog, weather spring, crooked heart key) to restart time.
- **Scroll-driven illustrated chapters**, interactive dialogue, and a complete narrative arc.
- **Floating 2.5D illustrated progress map**, chapter unlocks, and local progress persistence in `localStorage`.
- **Procedural Web Audio synthesizer** with five custom sound effects (`chime`, `stitch`, `bell`, `gear`, `tock`), default muted, user-gesture enabled, and mute toggle.
- **Mobile-first touch controls** (minimum 44×44px hit areas) and full keyboard accessibility.
- **Unconditional `prefers-reduced-motion` zero-duration fallback**.
- **Easter egg**: Ring the workshop bell to uncover the secret 4th stitch (the website itself).
- **Optional Spline 3D Scene**: Approved strictly as an optional visual vignette for the map/workshop, with instant 2D fallback.

---

## Design System — Locked Baseline

| Token | Color | Purpose |
|---|---|---|
| Cream | `#FFF8F1` | Paper background |
| Berry | `#A34063` | CTAs, thread, accents |
| Ink | `#392F3B` | Primary text |
| Clay | `#C98F70` | Warm character body tones |
| Sage | `#88A991` | Nature, success |
| Gold | `#E8C878` | Discovery, magic stitches |
| Lilac | `#8E79A8` | Shadow, mystery |
| Night | `#25324A` | Dark scene mode |

**Fonts:** Fraunces for display headings, Nunito for UI/dialogue, Space Mono for counters and stamps.

---

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run production build
npm run build

# Preview production build
npm run preview
```

---

## Canonical Documentation

| Document | Purpose |
|---|---|
| [AGENTS.md](AGENTS.md) | Mandatory agent instructions & imported skill rules |
| [PRD](docs/PRD.md) | Requirements, player journey, and acceptance criteria |
| [TRD](docs/TRD.md) | Architecture, state model, accessibility, and tech stack |
| [Design system](docs/DESIGN_SYSTEM.md) | Colors, typography, character silhouette, motion |
| [Story bible](docs/STORY_BIBLE.md) | Characters, canon, dialogue, mystery clues, finale |
| [Execution loops](docs/EXECUTION_LOOPS.md) | L00–L10 detailed sprint execution plan |
| [Loop log](docs/LOOP_LOG.md) | Verifiable test evidence, loop completions, and history |
| [Scene matrix](docs/SCENE_MATRIX.md) | Scene/asset/interaction breakdown |
| [Agent handoff](docs/AGENT_HANDOFF.md) | Agent coordination & status handoff |
| [Traceability](docs/TRACEABILITY.md) | Requirements mapped to verification |
| [Asset register](docs/ASSET_REGISTER.md) | Attribution, licenses, and provenance |
| [Skills adoption](docs/SKILLS_ADOPTION.md) | Reused skills, security audits, and import status |
| [Production](docs/PRODUCTION.md) | Sprint gates G0–G4, QA matrix, definition of done |
