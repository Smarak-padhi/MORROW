# AGENTS.md — operating instructions for coding/design agents

## Read order
`docs/DESIGN_SYSTEM.md` → `docs/PRD.md` → `docs/TRD.md` → `docs/STORY_BIBLE.md` → `docs/PRODUCTION.md` → `docs/SKILLS_ADOPTION.md`.

## Non-negotiables
1. **Design tokens before UI.** No ad hoc hex colors, typography or spacing. Update tokens first and explain changes.
2. **Original character only.** No Disney-like fox, green shirt, brown vest, or recognizable existing-IP character design. Morrow is a pear-shaped Stitchling fantasy creature with a button-eye marking, patchwork scarf, and thread tail.
3. **Mobile-first, keyboard accessible, touch-first.** No hover-only or drag-only puzzles. Min 44px touch targets.
4. **Core gameplay first.** Keep 3 inventions and the story ending functional before adding Tier 3, guestbook or AI videos.
5. **Architectural separation.** Separate narrative data (`src/story.ts`), state (`src/App.tsx`), art assets (`src/components/art`), and interaction logic. Reuse the stitch engine across challenges.
6. **Respect reduced motion.** Video and audio must be optional and skippable. Never autoplay audible sound.
7. **Accurate representation.** Never fake global hit counters or live guestbooks. Label local-only demos accurately.
8. **Narrative density.** Keep each scene <=150 words. Preserve mystery clue chronology and character voice.
9. **Evidence-backed completion.** Run build/tests after changes. Report actual pass/fail and unimplemented features without exaggeration.
10. **Safety and privacy.** Never modify remote repos, deployments, credentials, or submit hackathon entries without explicit repository/project selection and user authorization.

---

## Imported Skill Integration Instructions

The following verified skills reside in `.agents/skills/` and must be consulted according to task scope:

### 1. `gravitas` (`.agents/skills/gravitas/SKILL.md`)
- **When to use:** On all non-trivial code modifications, refactorings, bug fixes, and loop completions.
- **Mandatory rules:** Enforce the 6 invariants: ground before mutating, stay in declared scope, completion requires evidence, never exact-retry without diagnosis, satisfy the acceptance contract, and report unverifiable items honestly.

### 2. `impeccable` (`.agents/skills/impeccable/SKILL.md`)
- **When to use:** When evaluating, critiquing, or refining UI components, layouts, typography, and responsive edge cases.
- **Commands:** Run `audit` for a11y/responsiveness; `clarify` for UX microcopy; `polish` for final visual touches.

### 3. `animate` (`.agents/skills/animate/SKILL.md`)
- **When to use:** When adding or tuning CSS animations, transitions, or SVG keyframes.
- **Mandatory rules:** Animate only `transform` and `opacity`. UI micro-interactions must stay between 180–300ms; story reveals 450–900ms. Enforce `prefers-reduced-motion` zero-duration fallback.

### 4. `ui-ux-pro-max` (`.agents/skills/ui-ux-pro-max/SKILL.md`)
- **When to use:** When designing or reviewing color contrast, accessible touch targets, and storybook layout balance.
- **Mandatory rules:** Cross-check WCAG AA contrast against paper background (`#FFF8F1`) and dark night mode (`#25324A`).

### 5. `design-system` (`.agents/skills/design-system/SKILL.md`)
- **When to use:** When adding tokens or structuring component CSS variables.
- **Mandatory rules:** Follow the 3-layer architecture: Primitive → Semantic → Component tokens. Never insert hardcoded hex colors into UI components.

---

## Agent roles (may be executed sequentially by one builder)
- **Art director:** character consistency, palette, fonts, art register. (Skills: `ui-ux-pro-max`, `design-system`)
- **Narrative designer:** story, jokes, emotional pacing, under-150-word scenes. (Skills: `impeccable`)
- **Gameplay engineer:** shared stitch logic, progression, puzzle outcomes. (Skills: `gravitas`, `design-system`)
- **Motion engineer:** transitions, scene layers, reduced-motion fallback. (Skills: `animate`)
- **QA agent:** phone, keyboard, performance, broken buttons, regression. (Skills: `impeccable`, Playwright)

## Change protocol
Before any major change: cite the relevant requirement, identify affected files, update tests/log, then implement smallest working slice. Keep commits scoped. Prefer working build over ambitious placeholder UI.
