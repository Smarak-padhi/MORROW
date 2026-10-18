# MORROW Design System v1.0 — locked baseline

## Colors
- Cream #FFF8F1 background
- Berry #A34063 primary interactive accent
- Ink #392F3B primary text
- Clay #C98F70 character warmth
- Sage #88A991 nature
- Gold #E8C878 magic/highlights
- Lilac #8E79A8 thread/secondary accents
- Night #25324A night scenes

CSS variables should use semantic names rather than raw hex inside components. Ensure WCAG contrast for text; berry is not a universal small-text color without testing.

## Typography
- Fraunces: editorial chapter and story titles.
- Nunito: dialogue, body and controls.
- Space Mono: counters, inspection stamps and technical labels.
- Fredoka: rare comic emphasis only.
Self-host or reliably load licensed webfonts, with robust local fallback stacks. Avoid layout shifts.

## Visual grammar
Handmade storybook: textured paper, stitched seams, asymmetrical cutouts, dimensional illustrated scenery, layered parallax, warm lighting. Morrow is a baby Stitchling, not an anthropomorphic Disney-style fox. Distinct silhouette: small pear-shaped body, asymmetric ears, thread-shaped tail, oversized scarf, glowing stitch markings.

## Motion
Use opacity/transform, brief exaggerated character reactions, layered scroll depth, stitched line reveals. Provide reduced-motion alternatives. Never hide content behind animations. All essential information accessible without video or hover.

## Asset process
Create and approve a character sheet first: front/side/three-quarter, neutral/happy/surprised/sad, silhouette test, color swatches, transparent export. Every generated asset must match it. Track prompt, source, license, export and usage in ASSET_REGISTER.
