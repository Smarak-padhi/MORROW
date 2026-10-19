# MORROW — Flow Asset Intake (Reviewed)

Source: User-supplied Google Flow export `Oct 19 - 02_00.zip` (66 entries: 44 JPEGs, 22 MP4s).
THIS IS A STAGING PACKAGE, NOT AN AUTOMATIC OVERWRITE OF THE WEBSITE.

Extract ALL five ZIP parts into the SAME repository root, preserving `MORROW_ASSET_INTAKE/`.
Then run the post-master integration instructions (`POST_MASTER_INTEGRATION.md`).

- `characters/NEEDS_BACKGROUND_REMOVAL/`: 18 selected source JPEGs. These are NOT transparently cut-out sprites. Many have a baked checkerboard. Never put directly into public/characters or merely rename .jpg to .png. Produce verified alpha PNGs and align pose canvases first.
- `environments/originals/`: three approved full-color flat images.
- `environments/prepared-webp/`: converted high-quality WebP full plates; these are NOT separate transparent layers.
- `cinematics/approved/`: five clips already mapped to agreed game slots.
- `cinematics/review-only/`: more videos of value, but not blindly assigned to game beats.
- `review-only/`: alternate or rejected images; preserve for inspection; some Morrow generations have unexpected hats or wings.

Known missing / not verified from requested manifest:
- `clack-worried.png`: no canonical matching pose selected.
- `duck-happy.png`: no canonical matching pose selected.
- `clock-02-restart.mp4`: missing; second freeze clip is NOT proof of restart.
- `workshop-table.webp`, `shadows-sky.webp`, `shadows-cobblestones.webp`, `forest-sky.webp`, `forest-moss-ground.webp`: no true separate layer files; three flat photos cannot magically be treated as isolated layers.
- Additional chapter-specific film art may exist in already-running code, but was not inspected here.

There are 22 MP4 entries in the input but only 20 unique exact video streams. The two redundant copies were removed from these packages. All 44 JPEG files are preserved across approved/raw/review categories, plus three prepared WebP environment files.

Some clips have titles that do not match their visible footage. Especially the named `Shadow_slides_across_village...` visually shows Professor/interior, so it is deliberately review-only, not a Shadow Village completion film.

Every artifact remains byte-for-byte original except the three additionally converted WebP environment files. Consult `FLOW_ASSET_AUDIT.json` for hashes, full original filenames, and exact destinations.
