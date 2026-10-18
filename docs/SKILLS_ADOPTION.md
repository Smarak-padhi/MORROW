# Skills Adoption Inventory — MORROW: The Almost-Right Adventure

## Overview

In accordance with Phase 1–3 of the Antigravity Skill Discovery & Integration mission, local skills across accessible project trees (Algoryxz, Multi-agent, o-travelz, and Antigravity builtins) were audited, filtered for relevance, license, and architectural compatibility, and imported into `.agents/skills/`.

---

## Discovered vs. Imported Skills Inventory

| Skill Name | Source Project & Path | Purpose | Compatibility with MORROW (React 19 / TS / Vite / CSS / SVG) | Integration Status & Reason |
|---|---|---|---|---|
| **gravitas** | `Desktop/Multi-agent/.agents/skills/gravitas` | Engineering reliability runtime, 6 invariants, verification-before-claiming, scoped changes. | 100% compatible. Language/framework agnostic. | **Imported** (`.agents/skills/gravitas`). Enforces evidence-backed work and Loop progression. |
| **impeccable** | `Desktop/Multi-agent/.agent/skills/impeccable` | Craft quality, responsive auditing, aesthetic critique, a11y, layout refinement. | 100% compatible with React/Vite/CSS. | **Imported** (`.agents/skills/impeccable`). Drives visual polish and accessibility audits. |
| **animate** | `Desktop/Algoryxz 001/docs/001/skills/animate` (from Ember & Root) | Motion quality principles, GPU composite-only transforms, easing curves, strict `prefers-reduced-motion` compliance. | 100% compatible with vanilla CSS / SVG animations. | **Imported & Adapted** (`.agents/skills/animate`). Sets timing budgets (180–350ms UI, 450–900ms story). |
| **ui-ux-pro-max** | `Desktop/o-travelz/.agents/skills/ui-ux-pro-max` | Comprehensive UI/UX design intelligence database (palettes, typography, WCAG checks, touch-target rules). | 100% compatible with React 19 web & mobile. | **Imported** (`.agents/skills/ui-ux-pro-max`). Used for tactile storybook palette and a11y cross-referencing. |
| **design-system** | `Desktop/o-travelz/.agents/skills/design-system` | 3-layer token architecture (primitive → semantic → component), token validation scripts. | 100% compatible with CSS custom properties. | **Imported** (`.agents/skills/design-system`). Aligns with `docs/DESIGN_SYSTEM.md` token lock. |
| **ui-styling** | `Desktop/o-travelz/.agents/skills/ui-styling` | Component specs, accessible primitives, styling patterns. | Compatible. Provides reference patterns for accessible dialogs and buttons. | **Imported** (`.agents/skills/ui-styling`). Used as reference for accessible controls. |
| **playwright-cli** | System / Node | Browser automation, mobile viewport smoke testing. | Native integration. | **Used via Playwright MCP & CLI** for G4 / QA matrix. |
| **gsd-\*** | Global `.agents/skills/gsd-*` | GSD (Get Stuff Done) multi-phase project workflows. | Global skills available via runtime. | **Retained in global runtime** to avoid polluting project repository. |

---

## Evaluation Criteria & Compatibility Matrix

1. **Original Character & Story Bible Protection**:
   - Skills must obey MORROW non-negotiables: Morrow is a unique **Stitchling** (pear-shaped, button-eye markings, asymmetric folded ears, oversized scarf, spool tail, mitten paws). No generic fox designs or external IP.
2. **Design Tokens & Accessibility**:
   - `docs/DESIGN_SYSTEM.md` is canonical. No arbitrary hex codes.
   - All interactive controls >= 44x44px.
   - Reduced-motion unconditionally respected.
3. **Execution Integrity**:
   - `gravitas` invariants: No claiming done without runtime evidence. No exact retries without diagnosis.

---

## Skill Usage Matrix for Agents

| Agent Role | Primary Skills to Invoke | Key Responsibilities |
|---|---|---|
| **Lead / Architecture** | `gravitas` | Scoped reconnaissance, invariant enforcement, verification loops |
| **Art Director** | `ui-ux-pro-max`, `design-system` | Color palette compliance, paper texture feel, silhouette consistency |
| **Narrative Designer** | `impeccable` (`clarify`, `delight`) | Dialogue pacing (<=150 words/scene), mystery clue timing, jokes |
| **Gameplay Engineer** | `gravitas`, `design-system` | Stitching engine, 3 inventions, local progression state |
| **Motion Engineer** | `animate` | Easing curves, GPU transform-only animations, reduced-motion bypass |
| **QA Agent** | `impeccable` (`audit`), Playwright | 320/375/430/768/1280px testing, keyboard navigation, zero console errors |
