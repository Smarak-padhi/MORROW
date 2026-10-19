# MORROW — COMIC / WEBTOON DIRECTION (LOCKED)

## Product definition
**Interactive vertical manga/comic, not a background-image slideshow, quotation-card app, or full-motion video reel.** A single chapter is a sequence of **different story beats in separate panels**. The reader scrolls downward to reveal them. The previous panels remain in the page; clicking does not swap an unrelated image of the same character.

## Workshop storyboard — required first proof
1. **Establishing panel:** wide miniature workbench, Morrow asleep, clocks and lantern. Short narration *Somewhere between a wish and a loose thread...*
2. **Close-up:** one ear twitches, a tiny bell glints. Sound-effect typography: *DING!*
3. **Reaction panel:** Morrow's eyes fly open, ears perk up, dramatic comic burst. **Morrow speech bubble attached to Morrow:** *AH! A GIANT!*
4. **Reverse-shot panel:** the scene reveals what Morrow sees: a visitor's looming silhouette/perspective from Morrow's point of view, not a different model of Morrow. No new inconsistent Morrow portrait.
5. **Two-character panel:** Sir Clack beside Morrow on the same workbench, with consistent scale and lighting. **Sir Clack bubble anchored to Sir Clack:** *That is a visitor, you walnut.*
6. **Comedy beat:** Morrow waves at the reader, *HELLO, POTENTIALLY POLITE GIANT!* Use an exaggerated but consistent pose; not a face-changing AI still.
7. **Pipkin arrival:** tiny BLUE BIRD journalist swoops in with news satchel and headline-style balloon *EMERGENCY! THE WORLD IS BROKEN!* Pipkin is NOT an owl.
8. **Punchline:** Sir Clack asks *Which part?*; Pipkin replies *YES.* Two distinct bubbles in one panel with a pause/reveal.
9. **Exit panel:** workshop door opens to Shadow Village, button/scroll cue to enter next chapter.

## Interaction contract
- **Scroll-first:** stacked responsive panels, each with a distinct composition, shot size, character action and speech balloon. Use panel borders, irregular gutters, dramatic splash panels, inset reaction closeups and occasional full-bleed imagery.
- **Tap to animate within a panel:** ring bell -> ear twitch/eyes open; tap bubble -> pop; tap panel -> small local reaction. A tap should NOT replace the entire stage image or all speech balloons.
- **Speech balloons:** anchored spatially to the speaker, tails point at the speaker, high contrast readable lettering. Off-panel narrator boxes only for narration. No separate oversized quote-card section below the image.
- **Panel reveal:** gentle scroll-triggered entrance with parallax/layer motion. Completed panels remain visible; no auto-scroll that steals control.
- **Continuity:** use approved consistent Morrow model, identical scarf, ears, diamond, spool tail. Never alternate unrelated AI generations as consecutive frames of the same action. Reuse a single character cutout or one cohesive composed panel with controlled facial/pose variants.
- **Responsive:** mobile 320–430px single vertical comic strip; desktop may arrange selected panels into 2-column comic spreads without changing reading order. Never crop speech balloons.
- **Reduced motion:** every panel and balloon visible and legible, all interactions work without animation.
- **Preserve:** existing waking MP4 as optional prelude, puzzle logic, localStorage, chapter map, audio controls and reset.

## DO NOT
- Do not build one fixed hero background with a changing portrait and a changing quote card.
- Do not switch to another unrelated Morrow face/pose merely because the speaker changes.
- Do not use random emojis or flat clip art in the comic.
- Do not generate a full AI video for each line.
- Do not claim approval based on overflow/build checks.

## Implementation strategy
Create data-driven `ComicPanel` / `SpeechBalloon` / `ComicChapter` React components with panel metadata (scene, speaker, dialogue, camera, action). Start with **Workshop only** and preserve existing gameplay fallback while implementing. Build one coherent panel illustration set with a shared art direction and stable model references. Each scene can have layered backgrounds, character sprites, text balloons, optional short animation, and a local interaction trigger. If required panel artwork is not available, mark it as an art blocker; do not disguise a repeated image as a new panel.

## Acceptance before expanding
- Deliver actual **Workshop comic** on phone: at least the 9 distinct beats above, visually consistent characters, genuine panel-to-panel storytelling and attached speech balloons.
- User taps bell, sees a reaction within the SAME panel, then scrolls to giant reaction and reverse shot; no whole-stage image swapping.
- Show mobile 375px scroll-through video and desktop screenshots; verify speech tails and reading order.
- Run production build, full-game regression, reduced-motion and keyboard/touch QA. Report outcomes truthfully.
- **User approval required before porting other chapters.**
