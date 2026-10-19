import assert from 'node:assert';
import fs from 'node:fs';

console.log('--- Verifying TactileShadowStitcher Component ---');

// 1. Check file existence
const filePath = 'src/components/inventions/TactileShadowStitcher.tsx';
assert(fs.existsSync(filePath), `File ${filePath} must exist.`);
const content = fs.readFileSync(filePath, 'utf-8');

// 2. Check essential exports
assert(content.includes('export const TactileShadowStitcher'), 'Must export TactileShadowStitcher');
assert(content.includes('export default TactileShadowStitcher'), 'Must default export TactileShadowStitcher');
assert(content.includes('export const SEAMS'), 'Must export SEAMS');
assert(content.includes('export interface TactileShadowStitcherProps'), 'Must export TactileShadowStitcherProps');

// 3. Check Seam requirements
assert(content.includes('Trunk Anchor Seam'), 'Must include Trunk Anchor Seam');
assert(content.includes('Branch Fray Seam'), 'Must include Branch Fray Seam');
assert(content.includes('Canopy Crown Seam'), 'Must include Canopy Crown Seam');

// 4. Check props requirement
assert(content.includes('onSeamComplete?: (seamIndex: number) => void'), 'Must support onSeamComplete prop');
assert(content.includes('onSuccess: () => void'), 'Must support onSuccess prop');
assert(content.includes('playChime: () => void'), 'Must support playChime prop');
assert(content.includes('initialSeamsRepaired?: number[]'), 'Must support initialSeamsRepaired prop');

// 5. Check Touch & Pointer Events
assert(content.includes('onPointerDown='), 'Must handle pointerdown');
assert(content.includes('onPointerMove='), 'Must handle pointermove');
assert(content.includes('onPointerUp='), 'Must handle pointerup');
assert(content.includes('onPointerCancel='), 'Must handle pointercancel');
assert(content.includes('touchmove'), 'Must handle touchmove event');

// 6. Check Keyboard accessibility
assert(content.includes('role="application"'), 'Must have role="application"');
assert(content.includes('aria-label="Tactile shadow stitcher: guide thread through 3 seams"'), 'Must have correct aria-label');
assert(content.includes('Stitch with Keyboard'), 'Must have keyboard helper button');
assert(content.includes('onKeyDown='), 'Must have keyboard navigation');
assert(content.includes('role="tablist"'), 'Must have tablist for seams');

// 7. Check Visuals & Character requirements
assert(content.includes('#1a1420'), 'Must use tree shadow silhouette color #1a1420');
assert(content.includes('#E8C878'), 'Must use golden thread color #E8C878');
assert(content.includes('#F7D560'), 'Must use bright golden thread color #F7D560');
assert(content.includes('#C98F70'), 'Must use Morrow peach felt paw color #C98F70');
assert(content.includes('Morrow’s needle'), 'Must reference Morrow’s needle');
assert(content.includes('prefers-reduced-motion'), 'Must support reduced motion');

console.log('✓ All 7 architectural requirements and contract invariants PASSED!');
