MORROW — CINEMATIC COMIC VIDEO PACK — 2026-10-19

Copy the public/cinematics/ directory into the Vite app's public/cinematics/.
Files are 1280x720 MP4 with audio, intended for inline manga panels.

PROLOGUE COMIC ORDER
01 prologue-01-waking.mp4 (if present) — asleep workshop / opening
02 prologue-02-giant.mp4 — Morrow wakes and sees giant
03 prologue-03-clack-visitor.mp4 — "That is a visitor, you walnut."
04 prologue-04-morrow-hello.mp4 — "Hello, potentially polite giant!"
05 prologue-05-pipkin-emergency.mp4 — breaking news
06 prologue-06-clack-which-part.mp4 — "Which part?"
07 prologue-07-pipkin-yes.mp4 — "Yes."
08 prologue-08-door-shadow.mp4 — preferred door transition with ground tree shadow
   prologue-08-door-original.mp4 — alternative without the shadow

CHAPTER 1
shadows-01-duck.mp4 — duck complains about mismatched shadow

IMPORTANT REVIEW NOTES
- The shadow-door version visibly includes an UNPLANNED ELDERLY HUMAN sitting at the left workbench. This must NOT be interpreted as an established story character. If unacceptable, use the original doorway and render the tree shadow in CSS/SVG in Chapter 1.
- Duck clip has no conspicuous impossible tree shadow. Render a SINGLE tree-shaped shadow attached to the duck's feet using web overlay; do not overlay a second normal duck shadow.
- Voice/audio not fully audited. Check exact lines and timing before production.
- The previous comic already has nine panels. These are cinematic ASSETS, not instructions to replace all nine panels or make a full-screen player.
- Preserve continuous scroll, chronological panels, user-triggered playback (mobile autoplay restrictions), skip controls, prefers-reduced-motion, and captions/speech balloons in HTML overlay OUTSIDE video bounds.
- At narrow mobile widths, object-fit:contain and aspect-ratio:16/9; never crop faces or speech balloons.
- Do not automatically loop each 8s clip; replay only when requested.
- Verify actual iOS Safari and Android Chrome, not only desktop emulation.
- Do not claim deployed or QA-passed until tests actually run.
