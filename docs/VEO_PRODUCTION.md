# Veo 3.1 production — real moving cinematics

Use the official Google Gemini SDK to produce **actual character animation**, not slideshow/zoomed stills. The generator runs locally under Antigravity, never in the browser.

## Before running
1. Confirm your Gemini API project has Veo access, remaining quota, and acceptable billing. Google Flow access/subscription is not necessarily API access.
2. Export the canonical original character from `src/components/art/Morrow.tsx` as `assets/morrow-reference.png`. Do not use a generic moodboard character as the reference. Maintain its asymmetrical ears, plum scarf, spool tail and diamond mark.
3. Install: `python -m pip install google-genai`
4. Configure `GEMINI_API_KEY` locally through a secure environment variable. **Never commit or paste credentials**.
5. Run ONE approved request: `python scripts/veo.py waking assets/morrow-reference.png --approve-cost`
6. Other scenes: `world`, `perfect`, `finale`; supply reference art when a character is present. Outputs: `public/cinematics/morrow-<scene>.mp4`.
7. The script saves the operation name in `public/cinematics/<scene>.operation.json`. On timeout, resume/poll existing operation; **do not resubmit blindly**.

## Motion acceptance tests
- Eyes blink, chest breathes, ears twitch independently, limbs and scarf move, character interacts with bell and spool.
- No camera-only motion, slideshow, morphing identity, extra limbs, text artifacts or impossible cuts.
- Review first/middle/end frames and audio; capture screenshots with Playwright/ffmpeg.
- Compress and posterize for mobile, provide Skip, onEnded, error fallback, muted by default and reduced-motion bypass.
- The opening video plays **after user presses Start Adventure**, before prologue. It must never block the story if loading fails.
- Generate offline; React serves static video only. Never expose the API key in client code.

## Status
Pipeline committed, **video generation NOT yet executed**: requires local Veo API authorization and a canonical character reference PNG. Do not claim finished MP4 until checked.

Official reference: https://ai.google.dev/gemini-api/docs/veo
