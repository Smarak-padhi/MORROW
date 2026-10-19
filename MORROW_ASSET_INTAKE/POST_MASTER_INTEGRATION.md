# MORROW — After Master Prompt: Media Intake Integration

The master execution may already have modified source files and public assets. **Reinspect the current Git working tree first.** Do not reset, force checkout, replace newer work, or assume these staged files are already implemented.

1. Locate the actual root and unpack all five `MORROW_Flow_*` ZIP parts there; their only payload is in `MORROW_ASSET_INTAKE/`, so extraction should not overwrite the app.
2. Read `MORROW_ASSET_INTAKE/FLOW_ASSET_AUDIT.json` and `README.md`. Compare each approved clip and stage image against current public assets; do not overwrite higher-quality art or previously integrated videos without evidence.
3. Install five approved clips into `public/cinematics/`: weather-02-umbrella.mp4, weather-04-loom.mp4, weather-05-bloom.mp4, clock-01-freeze.mp4, finale-01-knot.mp4. Verify file paths, duration, playback, skip/replay, correct beat, mobile autoplay policy and failure fallback. Preserve video streams unless reencoding is technically required.
4. Install three flat, high-quality WebP plates as appropriate: workshop-bg.webp, shadows-cottages.webp, forest-canopy.webp. They are single flat photos, not sky/midground/ground cutouts; retain interactive actors/props above them.
5. For 18 selected character .source.jpg files, detect/segment baked checkerboard or studio backgrounds, preserve fine felt fibers, and export REAL RGBA PNG files matching `public/characters/<name>.png`. Check alpha values programmatically and visually on dark/light backdrops. Keep actor scale, baseline, and silhouette coherent across states. Do not substitute visibly wrong hat/wing versions of Morrow. No image should show checkerboard squares inside a real game scene.
6. Treat review-only clips and alternate photos as optional candidates requiring story and character continuity inspection, especially misnamed shadow clip. Do NOT map alternate clock freeze video to clock-02-restart.mp4.
7. Missing must stay missing and documented: clack-worried, duck-happy, clock-02-restart, true individual environment planes.
8. Run npm build, actual browser playthrough, screenshots at mobile 390px and desktop 1280px, inspect console and network responses, ensure real story state persists and no actor has floating feet or cut-off props.
9. Capture evidence and report assets installed, any missing alpha conversions, before/after screenshots, all test results, conflicts, remaining blockers. Do not claim 'all done' based on build alone.

This is a new follow-up pass AFTER the ongoing master prompt; avoid disrupting that run. Do not fabricate unavailable media.
