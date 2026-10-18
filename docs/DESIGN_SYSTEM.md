# Design system — LOCKED v1.0

## Brand
**Morrow: The Almost-Right Adventure**. Tagline: *We make wonderful mistakes.* Visual metaphor: paper cutouts sewn together by luminous thread. Not a Disney/Pixar-style fox. Morrow is a distinct **Stitchling**: pear-shaped tiny body, asymmetrical folded ears, short round face, button-like eye markings, oversized patchwork scarf, spool-tail, mitten paws, stitch-shaped forehead mark. Never green shirt, brown vest, detective outfit, or naturalistic orange fox muzzle.

## Colors
| Token | Hex | Use |
|---|---|---|
| cream | `#FFF8F1` | main paper background |
| berry | `#A34063` | CTA, thread, accent |
| ink | `#392F3B` | primary text |
| clay | `#C98F70` | character warm tone |
| sage | `#88A991` | forest, success |
| gold | `#E8C878` | discovery |
| lilac | `#8E79A8` | mystery |
| night | `#25324A` | dark scene |
| paper-border | `#E7D4D4` | soft outline |

Use CSS variables only; no arbitrary color values in components except SVG illustrations. Contrast-check small text and interactive controls. Night mode tokens must be verified separately.

## Typography
Fraunces 600/700 for headlines, Nunito 400/600/800 for UI and dialogue, Space Mono 400/700 for counters/stamps. Fredoka 600 is an optional comic accent. Google Fonts are progressive enhancement; fallback serif/system-ui/monospace must work offline. Scale: display clamp(2.2rem, 6vw, 5rem); H2 clamp(1.65rem,3vw,2.6rem); body 1rem with 1.6 line height. No body text below 14px.

## Spacing and layout
4px spacing scale; 12/20/32px radii; maximum reading width 70ch; shell max-width 1160px; breakpoint 760px; mobile horizontal padding 16px. Minimum touch target 44×44px. Never require hover, drag or audio to progress. Keep the main scene visible before the first scroll.

## Illustration / motion
Layered hand-drawn 2D with paper texture, warm ink outlines, slight asymmetry, tiny stars and visible stitches. Character pose sheet first; maintain exact silhouette across scenes. Motion: 180–350ms UI, 450–900ms story reveals, gentle idle 3–5s. Respect prefers-reduced-motion. Avoid long scroll-jacking, autoplay sound, and infinite heavy canvas loops. SVG/CSS parallax preferred over WebGL.

## Video
Optional 4–8 second cinematics with poster images, `preload=none`, muted by default, `playsinline`, skip button, and equivalent CSS/story fallback. Produce only after art direction and character sheet are locked. Maintain a consistent seed/reference sheet across all generations. No borrowed character likeness.

## Asset credits
Every external and AI-generated asset must be logged in `docs/ASSET_REGISTER.md` with provenance, rights, and prompt/model if applicable. Add visible credits in footer.
