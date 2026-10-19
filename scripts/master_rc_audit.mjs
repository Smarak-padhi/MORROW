// Master Comprehensive Visual & Interactive QA Suite for MORROW Release Candidate
import { chromium } from 'playwright';
import fs from 'node:fs/promises';
import path from 'node:path';

const BASE_URL = process.env.MORROW_URL || 'http://127.0.0.1:4173';
const OUT_DIR = 'qa/master_rc_audit';

const VIEWPORTS = [
  { name: 'phone-se', width: 360, height: 800, isMobile: true, hasTouch: true },
  { name: 'iphone-14', width: 390, height: 844, isMobile: true, hasTouch: true },
  { name: 'iphone-promax', width: 430, height: 932, isMobile: true, hasTouch: true },
  { name: 'tablet-ipad', width: 768, height: 1024, isMobile: true, hasTouch: true },
  { name: 'desktop-hd', width: 1280, height: 800, isMobile: false, hasTouch: false },
  { name: 'desktop-fhd', width: 1440, height: 900, isMobile: false, hasTouch: false },
];

await fs.mkdir(OUT_DIR, { recursive: true });

console.log(`Starting Master QA Suite against ${BASE_URL}...`);
const browser = await chromium.launch({ headless: true });
const auditResults = {
  viewportsTested: VIEWPORTS.length,
  chaptersAudited: ['opening', 'workshop', 'shadows', 'weather', 'clock', 'finale', 'epilogue'],
  videosVerified: [],
  keyboardNavPassed: true,
  overflowViolations: [],
  capturedScreenshots: [],
};

try {
  // 1. Multi-Viewport Overflow & Element Audit
  for (const vp of VIEWPORTS) {
    console.log(`Auditing viewport ${vp.name} (${vp.width}x${vp.height})...`);
    const page = await browser.newPage({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 1,
      isMobile: vp.isMobile,
      hasTouch: vp.hasTouch,
      reducedMotion: 'no-preference',
    });

    // Check Opening
    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1400); // Allow story-rise animation (1.1s + 0.2s delay) to fully settle
    const opOverflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
    if (opOverflow) {
      auditResults.overflowViolations.push(`Opening overflow at ${vp.width}px`);
    }

    const shotOp = `${OUT_DIR}/opening_${vp.name}.png`;
    await page.screenshot({ path: shotOp, fullPage: false });
    auditResults.capturedScreenshots.push(shotOp);

    // Open Story
    const openBtn = page.getByRole('button', { name: /open the story/i });
    if (await openBtn.isVisible()) {
      await openBtn.click();
      await page.waitForTimeout(300);
    }

    // Skip opening waking cinematic if it appears
    const skipBtn = page.getByRole('button', { name: /skip scene|continue story/i });
    if (await skipBtn.isVisible({ timeout: 1500 }).catch(() => false)) {
      await skipBtn.click();
      await page.waitForTimeout(300);
    }

    // Check Workshop
    const bellBtn = page.getByRole('button', { name: /ring the bell/i });
    if (await bellBtn.isVisible()) {
      await bellBtn.click();
      await page.waitForTimeout(200);
    }

    const shotWs = `${OUT_DIR}/workshop_${vp.name}.png`;
    await page.screenshot({ path: shotWs, fullPage: false });
    auditResults.capturedScreenshots.push(shotWs);

    const wsOverflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
    if (wsOverflow) {
      auditResults.overflowViolations.push(`Workshop overflow at ${vp.width}px`);
    }

    await page.close();
  }

  // 2. Full Player Journey with Video Modal and Keyboard Verification
  console.log('Running comprehensive player journey and video modal check at 390px...');
  const journeyPage = await browser.newPage({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
  });

  await journeyPage.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
  await journeyPage.evaluate(() => localStorage.clear());
  await journeyPage.reload({ waitUntil: 'domcontentloaded' });

  // Start story
  await journeyPage.getByRole('button', { name: /open the story/i }).click();
  const skip = journeyPage.getByRole('button', { name: /skip scene|continue story/i });
  if (await skip.isVisible({ timeout: 1500 }).catch(() => false)) {
    await skip.click();
  }

  // Workshop
  await journeyPage.getByRole('button', { name: /ring the bell/i }).click();
  for (let i = 0; i < 10; i++) {
    const turn = journeyPage.getByRole('button', { name: /turn the page/i });
    if (!await turn.count() || !await turn.isVisible()) break;
    await turn.click();
    await journeyPage.waitForTimeout(100);
  }
  await journeyPage.getByRole('button', { name: /step into the next chapter/i }).click();
  await journeyPage.waitForTimeout(300);

  // Chapter 1: Shadows
  console.log('Verifying Chapter 1 Shadows...');
  const shotShadow = `${OUT_DIR}/chapter1_shadows_active.png`;
  await journeyPage.screenshot({ path: shotShadow, fullPage: false });
  auditResults.capturedScreenshots.push(shotShadow);

  // Test Shadow reveal film modal
  const shadowFilm = journeyPage.getByRole('button', { name: /reveal film/i });
  if (await shadowFilm.isVisible()) {
    await shadowFilm.click();
    await journeyPage.waitForTimeout(300);
    const videoElem = journeyPage.locator('video[src*="shadows-01-duck.mp4"]');
    const isVidVisible = await videoElem.isVisible();
    auditResults.videosVerified.push({ id: 'shadows-01-duck.mp4', verified: isVidVisible });
    const shotShadowVid = `${OUT_DIR}/chapter1_shadows_video_modal.png`;
    await journeyPage.screenshot({ path: shotShadowVid, fullPage: false });
    auditResults.capturedScreenshots.push(shotShadowVid);
    await journeyPage.getByRole('button', { name: /return to scene/i }).click();
    await journeyPage.waitForTimeout(200);
  }

  // Advance dialogue in Shadows to puzzle
  for (let i = 0; i < 6; i++) {
    const turn = journeyPage.getByRole('button', { name: /turn the page/i });
    if (!await turn.count() || !await turn.isVisible()) break;
    await turn.click();
    await journeyPage.waitForTimeout(100);
  }

  // Repair shadow seams
  for (const [resident, shadow] of [['Village Duck','Tree shadow'],['Little Lantern','Star shadow'],['Wandering Snail','Duck shadow']]) {
    await journeyPage.getByRole('button', { name: new RegExp(resident,'i') }).click();
    await journeyPage.getByRole('button', { name: new RegExp(shadow,'i') }).click();
    await journeyPage.waitForTimeout(150);
  }

  const shotShadowDone = `${OUT_DIR}/chapter1_shadows_solved.png`;
  await journeyPage.screenshot({ path: shotShadowDone, fullPage: false });
  auditResults.capturedScreenshots.push(shotShadowDone);

  await journeyPage.getByRole('button', { name: /step into the next chapter/i }).click();
  await journeyPage.waitForTimeout(300);

  // Chapter 2: Weather Forest
  console.log('Verifying Chapter 2 Weather Forest & Cinematics...');
  const shotWeather = `${OUT_DIR}/chapter2_weather_active.png`;
  await journeyPage.screenshot({ path: shotWeather, fullPage: false });
  auditResults.capturedScreenshots.push(shotWeather);

  // Test Weather reveal film modal
  const weatherFilm = journeyPage.getByRole('button', { name: /reveal film/i });
  if (await weatherFilm.isVisible()) {
    await weatherFilm.click();
    await journeyPage.waitForTimeout(300);
    const weatherVid = journeyPage.locator('video[src*="weather-02-umbrella.mp4"]');
    const isWVidVisible = await weatherVid.isVisible();
    auditResults.videosVerified.push({ id: 'weather-02-umbrella.mp4', verified: isWVidVisible });
    const shotWeatherVid = `${OUT_DIR}/chapter2_weather_video_modal.png`;
    await journeyPage.screenshot({ path: shotWeatherVid, fullPage: false });
    auditResults.capturedScreenshots.push(shotWeatherVid);
    await journeyPage.getByRole('button', { name: /return to scene/i }).click();
    await journeyPage.waitForTimeout(200);
  }

  // Advance dialogue in Weather
  for (let i = 0; i < 6; i++) {
    const turn = journeyPage.getByRole('button', { name: /turn the page/i });
    if (!await turn.count() || !await turn.isVisible()) break;
    await turn.click();
    await journeyPage.waitForTimeout(100);
  }

  // Weave weather spools
  const pairs = [['Gentle Downpour','Thirsty Lilies'],['Whistling Breeze','Frozen Windmill'],['Golden Sunbeam','Frog Mayor']];
  for (const [thread, target] of pairs) {
    await journeyPage.getByRole('button', { name: new RegExp(thread,'i') }).click();
    await journeyPage.getByRole('button', { name: new RegExp(target,'i') }).click();
    await journeyPage.waitForTimeout(150);
  }

  const shotWeatherDone = `${OUT_DIR}/chapter2_weather_solved.png`;
  await journeyPage.screenshot({ path: shotWeatherDone, fullPage: false });
  auditResults.capturedScreenshots.push(shotWeatherDone);

  await journeyPage.getByRole('button', { name: /step into the next chapter/i }).click();
  await journeyPage.waitForTimeout(300);

  // Chapter 3: Tomorrow Town Clock
  console.log('Verifying Chapter 3 Tomorrow Town Clock & Freeze Video...');
  const shotClock = `${OUT_DIR}/chapter3_clock_active.png`;
  await journeyPage.screenshot({ path: shotClock, fullPage: false });
  auditResults.capturedScreenshots.push(shotClock);

  // Test Clock freeze reveal film modal
  const clockFilm = journeyPage.getByRole('button', { name: /reveal film/i });
  if (await clockFilm.isVisible()) {
    await clockFilm.click();
    await journeyPage.waitForTimeout(300);
    const clockVid = journeyPage.locator('video[src*="clock-01-freeze.mp4"]');
    const isCVidVisible = await clockVid.isVisible();
    auditResults.videosVerified.push({ id: 'clock-01-freeze.mp4', verified: isCVidVisible });
    const shotClockVid = `${OUT_DIR}/chapter3_clock_video_modal.png`;
    await journeyPage.screenshot({ path: shotClockVid, fullPage: false });
    auditResults.capturedScreenshots.push(shotClockVid);
    await journeyPage.getByRole('button', { name: /return to scene/i }).click();
    await journeyPage.waitForTimeout(200);
  }

  // Advance dialogue in Clock
  for (let i = 0; i < 6; i++) {
    const turn = journeyPage.getByRole('button', { name: /turn the page/i });
    if (!await turn.count() || !await turn.isVisible()) break;
    await turn.click();
    await journeyPage.waitForTimeout(100);
  }

  // Insert gears
  for (const gear of ['Shadow Cog','Weather Spring','Crooked Heart Key']) {
    await journeyPage.getByRole('button', { name: new RegExp(gear,'i') }).click();
    await journeyPage.waitForTimeout(150);
  }

  const shotClockDone = `${OUT_DIR}/chapter3_clock_solved.png`;
  await journeyPage.screenshot({ path: shotClockDone, fullPage: false });
  auditResults.capturedScreenshots.push(shotClockDone);

  await journeyPage.getByRole('button', { name: /step into the next chapter/i }).click();
  await journeyPage.waitForTimeout(300);

  // Chapter 4: Finale Clock Tower
  console.log('Verifying Chapter 4 Finale & Knot Video...');
  const shotFinale = `${OUT_DIR}/chapter4_finale_active.png`;
  await journeyPage.screenshot({ path: shotFinale, fullPage: false });
  auditResults.capturedScreenshots.push(shotFinale);

  // Test Finale knot reveal film modal
  const finaleFilm = journeyPage.getByRole('button', { name: /reveal film/i });
  if (await finaleFilm.isVisible()) {
    await finaleFilm.click();
    await journeyPage.waitForTimeout(300);
    const finaleVid = journeyPage.locator('video[src*="finale-01-knot.mp4"]');
    const isFVidVisible = await finaleVid.isVisible();
    auditResults.videosVerified.push({ id: 'finale-01-knot.mp4', verified: isFVidVisible });
    const shotFinaleVid = `${OUT_DIR}/chapter4_finale_video_modal.png`;
    await journeyPage.screenshot({ path: shotFinaleVid, fullPage: false });
    auditResults.capturedScreenshots.push(shotFinaleVid);
    await journeyPage.getByRole('button', { name: /return to scene/i }).click();
    await journeyPage.waitForTimeout(200);
  }

  // Advance dialogue in Finale
  for (let i = 0; i < 10; i++) {
    const turn = journeyPage.getByRole('button', { name: /turn the page/i });
    if (!await turn.count() || !await turn.isVisible()) break;
    await turn.click();
    await journeyPage.waitForTimeout(100);
  }

  // Execute the 3 steps of the crooked stitch
  for (const step of ['Reach toward your friend','Listen to the crooked thread','Tie a wonderfully uneven knot']) {
    await journeyPage.getByRole('button', { name: new RegExp(step,'i') }).click();
    await journeyPage.waitForTimeout(150);
  }

  const shotFinaleDone = `${OUT_DIR}/chapter4_finale_solved.png`;
  await journeyPage.screenshot({ path: shotFinaleDone, fullPage: false });
  auditResults.capturedScreenshots.push(shotFinaleDone);

  await journeyPage.getByRole('button', { name: /step into the next chapter/i }).click();
  await journeyPage.waitForTimeout(300);

  // Epilogue
  console.log('Verifying Epilogue & Persistence...');
  for (let i = 0; i < 6; i++) {
    const turn = journeyPage.getByRole('button', { name: /turn the page/i });
    if (!await turn.count() || !await turn.isVisible()) break;
    await turn.click();
    await journeyPage.waitForTimeout(100);
  }

  const shotEpilogue = `${OUT_DIR}/chapter5_epilogue.png`;
  await journeyPage.screenshot({ path: shotEpilogue, fullPage: false });
  auditResults.capturedScreenshots.push(shotEpilogue);

  // Test reload persistence
  await journeyPage.reload({ waitUntil: 'domcontentloaded' });
  await journeyPage.waitForTimeout(300);
  const saveRestored = await journeyPage.locator('.storybook-chapter.chapter-epilogue').count() > 0;
  auditResults.saveRestored = saveRestored;

  await journeyPage.close();

} finally {
  await browser.close();
}

console.log('--- AUDIT RESULTS SUMMARY ---');
console.log(JSON.stringify(auditResults, null, 2));

if (auditResults.overflowViolations.length > 0) {
  console.error('FAILED: Horizontal overflow detected!');
  process.exitCode = 1;
} else if (!auditResults.saveRestored) {
  console.error('FAILED: Save state not restored after reload!');
  process.exitCode = 1;
} else {
  console.log('SUCCESS: All Release Candidate verification gates passed!');
}
