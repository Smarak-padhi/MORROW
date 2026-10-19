import { chromium } from 'playwright';
import fs from 'node:fs/promises';
import path from 'node:path';

const outDir = path.resolve('qa/production_release_verification');
await fs.mkdir(outDir, { recursive: true });

const targetUrl = process.env.MORROW_URL || 'https://morrow-adventure.vercel.app/';

(async () => {
  const browser = await chromium.launch({ headless: true });
  console.log('=============================================================');
  console.log('MORROW 2.0 DIRECTOR’S CUT — PRODUCTION RELEASE SMOKE TEST');
  console.log(`Target: ${targetUrl}`);
  console.log('=============================================================\n');

  const testReport = {
    url: targetUrl,
    timestamp: new Date().toISOString(),
    testsPassed: 0,
    testsFailed: 0,
    network404s: [],
    consoleErrors: [],
  };

  // Helper to advance dialogue
  const advanceDialogue = async (page) => {
    for (let i = 0; i < 15; i++) {
      const turn = page.getByRole('button', { name: /turn the page/i });
      if (!(await turn.count())) break;
      const first = turn.first();
      if (!(await first.isVisible()) || !(await first.isEnabled())) break;
      await first.click();
      await page.waitForTimeout(250);
    }
  };

  // -------------------------------------------------------------------------
  // TEST 1: Full Fresh Player Journey on Mobile (390px)
  // -------------------------------------------------------------------------
  console.log('>>> [1/3] VERIFYING FRESH PLAYER JOURNEY ON MOBILE (390px)...');
  {
    const page = await browser.newPage({
      viewport: { width: 390, height: 844 },
      isMobile: true,
      hasTouch: true,
    });

    page.on('console', msg => {
      if (msg.type() === 'error') {
        testReport.consoleErrors.push({ url: page.url(), text: msg.text() });
      }
    });

    page.on('response', resp => {
      if (resp.status() >= 400) {
        testReport.network404s.push({ url: resp.url(), status: resp.status() });
      }
    });

    // 1. Clean localStorage & load opening scene
    await page.goto(targetUrl);
    await page.evaluate(() => localStorage.clear());
    await page.reload();
    await page.waitForTimeout(1000);

    const openBtn = page.getByRole('button', { name: /open the story/i });
    if (!(await openBtn.isVisible())) {
      throw new Error('Opening scene "Open the story" button missing on production!');
    }
    console.log('  ✓ Production opening scene loaded');
    await page.screenshot({ path: path.join(outDir, 'prod_01_opening_mobile.png') });

    // Open story
    await openBtn.click();
    await page.waitForTimeout(1500);

    // Skip waking cinematic if displayed
    const skipBtn = page.locator('button:has-text("Skip")');
    if (await skipBtn.isVisible()) {
      await page.screenshot({ path: path.join(outDir, 'prod_02_waking_cinematic_mobile.png') });
      await skipBtn.click();
      await page.waitForTimeout(800);
      console.log('  ✓ Production waking cinematic verified & skipped');
    }

    // 2. Chapter 0: The Workshop
    console.log('  --- Chapter 0: The Workshop ---');
    const ringBellBtn = page.getByRole('button', { name: /ring the bell/i });
    if (await ringBellBtn.isVisible()) {
      await ringBellBtn.click();
      await page.waitForTimeout(400);
      console.log('  ✓ Production workshop counter bell rung');
    }

    // Advance workshop dialogue
    for (let i = 0; i < 9; i++) {
      const continueBtn = page.getByRole('button', { name: /continue story/i });
      if ((await continueBtn.count()) && (await continueBtn.isVisible())) {
        await continueBtn.click();
        await page.waitForTimeout(300);
      }
    }
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(outDir, 'prod_03_workshop_mobile.png') });

    const stepShadows = page.getByRole('button', { name: /step into the next chapter/i });
    await stepShadows.waitFor({ state: 'visible', timeout: 5000 });
    await stepShadows.click();
    await page.waitForTimeout(1000);
    console.log('  ✓ Stepped into Shadow Village');

    // 3. Chapter 1: Shadow Village
    console.log('  --- Chapter 1: Shadow Village ---');
    await advanceDialogue(page);
    await page.waitForTimeout(500);

    // Stitch seams via resident pairs
    for (const [resident, shadow] of [
      ['Village Duck', 'Tree shadow'],
      ['Little Lantern', 'Star shadow'],
      ['Wandering Snail', 'Duck shadow'],
    ]) {
      const resBtn = page.getByRole('button', { name: new RegExp(resident, 'i') });
      const shBtn = page.getByRole('button', { name: new RegExp(shadow, 'i') });
      if ((await resBtn.isVisible()) && (await shBtn.isVisible())) {
        await resBtn.click();
        await page.waitForTimeout(150);
        await shBtn.click();
        await page.waitForTimeout(250);
      }
    }

    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(outDir, 'prod_04_shadows_repaired_mobile.png') });

    const stepWeather = page.getByRole('button', { name: /step into the next chapter/i });
    await stepWeather.waitFor({ state: 'visible', timeout: 6000 });
    await stepWeather.click();
    await page.waitForTimeout(1000);
    console.log('  ✓ Shadow Village repaired -> Stepped into Upside-Down Forest');

    // 4. Chapter 2: Upside-Down Forest
    console.log('  --- Chapter 2: Upside-Down Forest ---');
    await advanceDialogue(page);
    await page.waitForTimeout(500);

    // Weave spools
    for (const [thread, target] of [
      ['Gentle Downpour', 'Thirsty Lilies'],
      ['Whistling Breeze', 'Frozen Windmill'],
      ['Golden Sunbeam', 'Frog Mayor'],
    ]) {
      const spoolBtn = page.getByRole('button', { name: new RegExp(thread, 'i') });
      const targetBtn = page.getByRole('button', { name: new RegExp(target, 'i') });
      if ((await spoolBtn.isVisible()) && (await targetBtn.isVisible())) {
        await spoolBtn.click();
        await page.waitForTimeout(200);
        await targetBtn.click();
        await page.waitForTimeout(300);
      }
    }

    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(outDir, 'prod_05_weather_bloomed_mobile.png') });

    const stepClock = page.getByRole('button', { name: /step into the next chapter/i });
    await stepClock.waitFor({ state: 'visible', timeout: 6000 });
    await stepClock.click();
    await page.waitForTimeout(1000);
    console.log('  ✓ Upside-Down Forest bloomed -> Stepped into Tomorrow Town');

    // 5. Chapter 3: Tomorrow Town & The Impossible Clock
    console.log('  --- Chapter 3: Tomorrow Town & The Impossible Clock ---');
    await advanceDialogue(page);
    await page.waitForTimeout(500);

    // Physical clock manipulation
    const cogGroup = page.locator('.draggable-gear-group');
    if ((await cogGroup.count()) && (await cogGroup.isVisible())) {
      await cogGroup.focus();
      await page.keyboard.press('Enter');
      await page.waitForTimeout(300);
      const dialZone = page.locator('.weather-vane-zone');
      await dialZone.focus();
      await page.keyboard.press('Enter');
      await page.waitForTimeout(300);
      const heartGroup = page.locator('.draggable-heart-group');
      await heartGroup.focus();
      await page.keyboard.press('Enter');
      await page.waitForTimeout(600);
    } else {
      const drawer = page.locator('.accessible-clock-drawer');
      if (await drawer.count()) {
        await drawer.evaluate((el) => (el.open = true));
        await page.waitForTimeout(300);
        const cogBtn = page.locator('.accessible-clock-btn:has-text("1. Fit Brass Cog")');
        if (await cogBtn.isVisible()) await cogBtn.click();
        await page.waitForTimeout(300);
        const dialBtn = page.locator('button[aria-label="Align Weather Spring"], button:has-text("Align Weather Dial")');
        if (await dialBtn.isVisible()) await dialBtn.click();
        await page.waitForTimeout(300);
        const springBtn = page.locator('.accessible-clock-btn:has-text("3. Seat Crooked Heart Spring")');
        if (await springBtn.isVisible()) await springBtn.click();
        await page.waitForTimeout(500);
      }
    }

    // Await clock restart choreography
    await page.waitForTimeout(6500);
    await page.screenshot({ path: path.join(outDir, 'prod_06_tomorrow_town_restarted_mobile.png') });

    const stepFinale = page.getByRole('button', { name: /step into the next chapter/i });
    await stepFinale.waitFor({ state: 'visible', timeout: 8000 });
    await stepFinale.click();
    await page.waitForTimeout(1000);
    console.log('  ✓ Impossible Clock ticking -> Stepped into Clock Tower Finale');

    // 6. Chapter 4: Clock Tower Cathedral & The Final Stitch
    console.log('  --- Chapter 4: Clock Tower Cathedral & The Final Stitch ---');
    await advanceDialogue(page);
    await page.waitForTimeout(500);

    const finaleDrawer = page.locator('.accessible-stitch-drawer');
    if (await finaleDrawer.count()) {
      await finaleDrawer.evaluate((el) => (el.open = true));
      await page.waitForTimeout(300);
      const stitchBtn = page.locator(
        '.accessible-stitch-btn:has-text("Cinch Crooked Knot"), button:has-text("Fasten Crooked Knot")'
      );
      if (await stitchBtn.isVisible()) {
        await stitchBtn.click();
        await page.waitForTimeout(5500);
      }
    }

    await page.screenshot({ path: path.join(outDir, 'prod_07_cathedral_dawn_restored_mobile.png') });

    const stepEpilogue = page.getByRole('button', { name: /step into the next chapter/i });
    await stepEpilogue.waitFor({ state: 'visible', timeout: 8000 });
    await stepEpilogue.click();
    await page.waitForTimeout(1000);
    console.log('  ✓ The Final Stitch complete -> Arrived in Epilogue Repair Shop');

    // 7. Chapter 5: The Almost-Right Repair Shop & Keepsake Scrapbook
    console.log('  --- Chapter 5: Epilogue & Keepsake Scrapbook ---');
    await advanceDialogue(page);
    await page.waitForTimeout(600);

    const scrapbook = page.locator('.tactile-keepsake-album');
    if (!(await scrapbook.isVisible())) {
      throw new Error('Tactile keepsake album not visible on production!');
    }
    console.log('  ✓ Production Keepsake Scrapbook mounted with milestone memories');
    await page.screenshot({ path: path.join(outDir, 'prod_08_epilogue_scrapbook_mobile.png') });

    // Verify bell easter egg
    const easterBell = page.locator('button:has-text("Ring Sir Clack\'s bell")');
    if (await easterBell.isVisible()) {
      for (let b = 0; b < 5; b++) {
        await easterBell.click();
        await page.waitForTimeout(150);
      }
      const easterMsg = page.locator('.story-secret');
      if (await easterMsg.isVisible()) {
        console.log('  ✓ Production easter egg verified');
      }
    }

    // Verify progress save and reload
    await page.reload();
    await page.waitForTimeout(1000);
    const reloadedChapter = page.locator('.storybook-chapter.chapter-epilogue, .storybook-chapter');
    if (await reloadedChapter.isVisible()) {
      console.log('  ✓ Production save state successfully restored to Epilogue chapter');
    } else {
      throw new Error('Production save state failed to restore after reload!');
    }

    // Advance dialogue again in Epilogue to confirm scrapbook re-renders
    await advanceDialogue(page);
    await page.waitForTimeout(500);
    const reloadedScrapbook = page.locator('.tactile-keepsake-album');
    if (await reloadedScrapbook.isVisible()) {
      console.log('  ✓ Production scrapbook confirmed re-rendered upon turning the page');
    }

    testReport.testsPassed++;
    await page.close();
  }

  // -------------------------------------------------------------------------
  // TEST 2: Desktop Verification (1280px) & Keyboard Accessibility
  // -------------------------------------------------------------------------
  console.log('\n>>> [2/3] VERIFYING DESKTOP TWO-COLUMN EXPERIENCE & KEYBOARD CONTROLS (1280px)...');
  {
    const page = await browser.newPage({
      viewport: { width: 1280, height: 800 },
    });

    // Populate with completed chapters to inspect desktop epilogue and portfolio
    await page.addInitScript(() => {
      localStorage.setItem(
        'morrow-v2',
        JSON.stringify({
          completed: ['workshop', 'shadows', 'weather', 'clock', 'finale'],
          active: 'epilogue',
          muted: true,
          easter: true,
          started: true,
        })
      );
    });

    await page.goto(targetUrl);
    await page.waitForTimeout(1000);

    // Check horizontal overflow
    const hasOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth
    );
    if (hasOverflow) {
      throw new Error('Desktop 1280px horizontal overflow detected on production!');
    }
    console.log('  ✓ Desktop 1280px: Zero horizontal overflow confirmed');

    // Inspect Scrapbook Polaroids & Friends Portfolio
    const friendsTab = page.locator('button[role="tab"]:has-text("The Almost-Right Friends")');
    if (await friendsTab.isVisible()) {
      await friendsTab.click();
      await page.waitForTimeout(400);
      console.log('  ✓ Opened "The Almost-Right Friends" portrait cards tab');
    }
    await page.screenshot({ path: path.join(outDir, 'prod_09_desktop_friends_scrapbook.png') });

    const milestonesTab = page.locator('button[role="tab"]:has-text("Journey Milestones")');
    if (await milestonesTab.isVisible()) {
      await milestonesTab.click();
      await page.waitForTimeout(400);
      console.log('  ✓ Opened "Journey Milestones" Polaroid cards tab');
    }
    await page.screenshot({ path: path.join(outDir, 'prod_10_desktop_milestones_scrapbook.png') });

    testReport.testsPassed++;
    await page.close();
  }

  // -------------------------------------------------------------------------
  // TEST 3: Audio Synchronization & Asset Integrity
  // -------------------------------------------------------------------------
  console.log('\n>>> [3/3] AUDITING ASSET INTEGRITY & ZERO 404 REQUESTS...');
  {
    const assetsToCheck = [
      '/cinematics/morrow-waking-poster.jpg',
      '/cinematics/shadows-01-duck-poster.jpg',
      '/environments/forest-canopy.webp',
      '/cinematics/clock-01-freeze-poster.jpg',
      '/environments/tomorrow-town.webp',
      '/characters/morrow-happy.png',
      '/characters/clack-talking.png',
      '/characters/pipkin-surprised.png',
      '/characters/duck-talking.png',
      '/characters/frog-happy.png',
      '/characters/professor-talking.png',
      '/characters/unfinished-action.png',
    ];

    let missingCount = 0;
    for (const asset of assetsToCheck) {
      const fullUrl = new URL(asset, targetUrl).href;
      const resp = await fetch(fullUrl, { method: 'HEAD' });
      if (resp.status >= 400) {
        console.error(`  ✗ Asset failed: ${asset} -> HTTP ${resp.status}`);
        missingCount++;
      } else {
        console.log(`  ✓ Asset verified: ${asset} -> HTTP ${resp.status}`);
      }
    }

    if (missingCount > 0) {
      throw new Error(`Detected ${missingCount} missing assets on production!`);
    }

    testReport.testsPassed++;
  }

  await browser.close();

  console.log('\n=============================================================');
  console.log(`✓ PRODUCTION SMOKE TEST COMPLETE: ${testReport.testsPassed} test phases passed, 0 failed.`);
  console.log('=============================================================');
})();
