# MORROW — Interactive storybook motion pass

## What changed
- **Page turns:** each dialogue advance remounts a keyed dialogue panel with a perspective page-open transition; Morrow reacts with a small tilt, squash, bounce and recovery.
- **Chapter arrivals:** a soft circular reveal opens the scene. Six small atmospheric lights/petals float in the environment with chapter-specific color.
- **Scroll storytelling:** IntersectionObserver reveals reading and puzzle panels as they enter the viewport. Where supported, CSS view-timeline parallax moves sky and landscape at different speeds.
- **Puzzle feedback:** repaired residents and completed finale steps receive a short golden pulse.
- **Mobile:** fewer atmospheric particles, shorter transitions, transforms rather than layout animations. All content remains in the normal document flow.
- **Accessibility:** reduced-motion turns off all decorative movement. Without IntersectionObserver, panels remain visible. No scroll animation is required to progress.

## QA gates — DO NOT CALL THIS FINISHED UNTIL MANUALLY CHECKED
1. Pull branch and run `npm ci && npm run build`.
2. In browser with normal motion: opening -> chapter 1. Click Turn the page repeatedly. Confirm each click has a visible character reaction and text transition **without obscuring text**.
3. Scroll slowly on phone: scenery should shift subtly where supported; reading and interaction should reveal without remaining invisible.
4. Switch to reduced motion: **all content visible**, no scene animation, and full gameplay still works.
5. Play all four puzzles; confirm repaired residents and final stitch animate, and no input is delayed.
6. Test 320, 375, 430, 768, 1280 and 1440 widths; no horizontal overflow, no unscrollable puzzle, no layout shifts that displace tap targets.
7. Test Safari iOS, Chrome Android if possible. CSS view-timeline is progressive enhancement; no dependency on support.
8. Run `scripts/mobile-qa.mjs` and `scripts/viewport_audit.mjs`; visually inspect actual screenshots and videos. Report failures with evidence.

## Next artistic pass
Motion alone cannot turn placeholder landscapes into stop-motion sets. The next visual-quality pass should replace generic sky/cloud/hill backgrounds with chapter-specific handcrafted environment art (approved reference style) and replace remaining SVG supporting cast with approved images. Avoid claiming this motion patch achieves final cinematic art direction.
