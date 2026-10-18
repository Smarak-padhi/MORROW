# Design system — LOCKED v1.0

## Brand
**Morrow: The Almost-Right Adventure**. Tagline: *We make wonderful mistakes.* Visual metaphor: paper cutouts sewn together by luminous thread. Not a Disney/Pixar-style fox. Morrow is a distinct **Stitchling**: pear-shaped tiny body, asymmetrical folded ears, short round face, button-like eye markings, oversized patchwork scarf, spool-tail, mitten paws, stitch-shaped forehead mark. Never green shirt, brown vest, detective outfit, or naturalistic orange fox muzzle.

---

## Colors
| Token | Hex | Semantic Use |
|---|---|---|
| `--cream` | `#FFF8F1` | Main paper background |
| `--berry` | `#A34063` | Primary interactive CTA, magic thread, accent |
| `--ink` | `#392F3B` | Primary text and inked linework |
| `--clay` | `#C98F70` | Character warmth and fabric body tones |
| `--sage` | `#88A991` | Forest scenery, nature, success states |
| `--gold` | `#E8C878` | Discovery, magic stitches, highlights |
| `--lilac` | `#8E79A8` | Shadow Village, mystery, secondary threads |
| `--night` | `#25324A` | Dark mood / night scene background |
| `--line` | `#E7D4D4` | Soft paper border outlines |

*Rule:* Use CSS variables only; no arbitrary hex values in components except procedural SVG illustrations. Contrast-check small text and interactive controls (WCAG AA). Night mode tokens are verified separately.

---

## Typography
- **Fraunces (600/700)**: Editorial chapter titles and headline displays. Scale: clamp(2.2rem, 6vw, 5rem).
- **Nunito (400/600/700/800)**: UI controls, dialogue balloons, and body copy. Minimum 14px for accessibility.
- **Space Mono (400/700)**: Disaster counters, inspection stamps, technical labels, and timestamps.
- **Fredoka (600)**: Rare comic accents and emphasis.
*Offline Resiliency:* Google Fonts are progressive enhancement; fallback serif/system-ui/monospace stacks work offline without layout shift.

---

## Spacing and Layout
- 4px spacing scale; 12/20/26px radii; maximum reading width 70ch; shell max-width 1160px; breakpoint 760px; mobile horizontal padding 16px.
- **Minimum touch target**: 44×44px for every button, toggle, and choice card.
- Never require hover, drag, or audio to progress through any puzzle or story chapter. Keep the main scene visible before the first scroll.

---

## Illustration & Motion
- Layered hand-drawn 2D paper texture with warm ink outlines, subtle paper shadows, tiny stars, and visible stitches.
- Character silhouette and color swatches locked in `src/components/art/Morrow.tsx`.
- **Motion Timing**: 180–350ms UI micro-interactions, 450–900ms story reveals, gentle idle breathing 3–5s.
- **Reduced Motion**: Unconditionally respected via `prefers-reduced-motion: reduce` fallback.

---

## Asset Credits
Every external, procedural, and AI-generated asset must be logged in `docs/ASSET_REGISTER.md` with provenance, rights, and implementation details.
