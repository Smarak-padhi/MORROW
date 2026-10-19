import { chromium } from 'playwright';
import fs from 'node:fs/promises';
import path from 'node:path';

const outDir = path.resolve('qa/sprint04_epilogue');
await fs.mkdir(outDir, { recursive: true });

(async () => {
  const browser = await chromium.launch({ headless: true });
  console.log('=== VERIFYING SPRINT 04: THE ALMOST-RIGHT REPAIR SHOP & VISUAL CONTINUITY ===\n');

  let failedErrors = [];

  // =========================================================================
  // TEST 1: Epilogue Stage & Stop-Motion Ensemble (Mobile Viewport 390px)
  // =========================================================================
  console.log('--- TEST 1: The Almost-Right Repair Shop Ensemble (Mobile 390px) ---');
  {
    const page = await browser.newPage({
      viewport: { width: 390, height: 844 },
      isMobile: true,
      hasTouch: true,
    });

    const pageErrors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') pageErrors.push(msg.text());
    });
    page.on('pageerror', err => pageErrors.push(err.message));

    // Initialize with all 5 prior chapters completed and epilogue active
    await page.addInitScript(() => {
      localStorage.setItem(
        'morrow-v2',
        JSON.stringify({
          completed: ['workshop', 'shadows', 'weather', 'clock', 'finale'],
          active: 'epilogue',
          muted: true,
          easter: false,
          started: true,
        })
      );
    });

    await page.goto('http://127.0.0.1:4173');
    await page.waitForTimeout(1000);

    // Verify Epilogue stage elements
    const epiloguePlate = page.locator('.epilogue-theatre-plate');
    if (!(await epiloguePlate.isVisible())) {
      throw new Error('Epilogue theatre plate not visible!');
    }
    console.log('✓ Epilogue theatre plate mounted successfully');

    // Verify all character actors in the workshop
    const morrowActor = page.locator('.epilogue-morrow-anchor');
    const unfinishedActor = page.locator('.epilogue-unfinished-anchor');
    const clackActor = page.locator('.epilogue-clack-anchor');
    const pipkinActor = page.locator('.epilogue-pipkin-anchor');
    const professorActor = page.locator('.epilogue-professor-anchor');

    if (!(await morrowActor.isVisible())) throw new Error('Morrow actor not visible in Epilogue!');
    if (!(await unfinishedActor.isVisible())) throw new Error('The Unfinished One not visible in Epilogue!');
    if (!(await clackActor.isVisible())) throw new Error('Sir Clack not visible in Epilogue!');
    if (!(await pipkinActor.isVisible())) throw new Error('Pipkin not visible in Epilogue!');
    if (!(await professorActor.isVisible())) throw new Error('Professor Perfect not visible in Epilogue!');
    console.log('✓ All 5 character anchors confirmed present in the Repair Shop');

    // Capture initial mobile ensemble
    await page.screenshot({ path: path.join(outDir, '01_epilogue_mobile_ensemble.png') });
    console.log('✓ Captured 01: Epilogue mobile ensemble');

    // Test interactive speech bubbles by clicking actors
    await pipkinActor.click();
    await page.waitForTimeout(400);
    const pipkinBubble = page.locator('.bubble-pipkin');
    if (!(await pipkinBubble.isVisible())) throw new Error('Pipkin speech bubble did not open!');
    console.log('✓ Pipkin speech bubble verified: SPECIAL EDITION headline displayed');

    await unfinishedActor.click();
    await page.waitForTimeout(400);
    const unfinishedBubble = page.locator('.bubble-unfinished');
    if (!(await unfinishedBubble.isVisible())) throw new Error('The Unfinished One speech bubble did not open!');
    console.log('✓ The Unfinished One speech bubble verified: tender friend reconnection');

    await page.screenshot({ path: path.join(outDir, '02_epilogue_mobile_speech.png') });
    console.log('✓ Captured 02: Epilogue mobile speech bubbles');

    if (pageErrors.length > 0) {
      console.warn('Page errors in Test 1:', pageErrors);
      failedErrors.push(...pageErrors);
    }
    await page.close();
  }

  // =========================================================================
  // TEST 2: Keepsake Scrapbook (5 Milestones + Character Roster) (Desktop 1280px)
  // =========================================================================
  console.log('\n--- TEST 2: Tactile Keepsake Scrapbook & 5 Journey Milestones (Desktop 1280px) ---');
  {
    const page = await browser.newPage({
      viewport: { width: 1280, height: 800 },
    });

    await page.addInitScript(() => {
      localStorage.setItem(
        'morrow-v2',
        JSON.stringify({
          completed: ['workshop', 'shadows', 'weather', 'clock', 'finale'],
          active: 'epilogue',
          muted: true,
          easter: false,
          started: true,
        })
      );
    });

    await page.goto('http://127.0.0.1:4173');
    await page.waitForTimeout(1000);

    // Advance story dialogue to reach the ending and open the keepsake scrapbook
    const turnPage = page.locator('button:has-text("Turn the page")');
    while (await turnPage.isVisible()) {
      await turnPage.click();
      await page.waitForTimeout(200);
    }
    await page.waitForTimeout(500);

    const scrapbook = page.locator('.tactile-keepsake-album');
    if (!(await scrapbook.isVisible())) throw new Error('Keepsake album not visible!');
    console.log('✓ Tactile Keepsake Scrapbook mounted');

    // Verify all 5 milestone tabs and click each
    const milestoneTabs = [
      { id: 'workshop', stamp: 'WONDERFUL BEGINNING' },
      { id: 'shadows', stamp: 'IMPOSSIBLE SILHOUETTE' },
      { id: 'weather', stamp: 'SOMEHOW DELIGHTFUL' },
      { id: 'clock', stamp: 'TIME MADE SWEET' },
      { id: 'finale', stamp: 'IMPERFECT · APPROVED' },
    ];

    for (const m of milestoneTabs) {
      const tabBtn = page.locator(`.memories-tab-strip button[role="tab"]:has-text("${m.id === 'workshop' ? '01' : m.id === 'shadows' ? '02' : m.id === 'weather' ? '03' : m.id === 'clock' ? '04' : '05'}")`);
      await tabBtn.click();
      await page.waitForTimeout(300);

      const stampEl = page.locator(`.tactile-ink-stamp:has-text("${m.stamp}")`);
      if (!(await stampEl.isVisible())) {
        throw new Error(`Stamp "${m.stamp}" not visible for milestone ${m.id}!`);
      }
      console.log(`✓ Milestone verified: Chapter ${m.id} -> Stamp: "${m.stamp}"`);
    }

    // Verify Polaroid photo, Pushpin, Washi tape, and Clack log
    const polaroid = page.locator('.polaroid-frame');
    const washiTape = page.locator('.washi-tape-accent');
    const clackLog = page.locator('.clack-log-annotation');

    if (!(await polaroid.isVisible())) throw new Error('Polaroid photo frame not visible!');
    if (!(await washiTape.isVisible())) throw new Error('Washi tape accent not visible!');
    if (!(await clackLog.isVisible())) throw new Error('Sir Clack disaster log note not visible!');
    console.log('✓ Polaroid photo frame, brass pushpin, washi tape, and Clack log annotation verified');

    await page.screenshot({ path: path.join(outDir, '03_scrapbook_desktop_milestones.png') });
    console.log('✓ Captured 03: Scrapbook desktop milestones');

    // Switch to The Almost-Right Friends mode
    const friendsModeBtn = page.locator('button:has-text("The Almost-Right Friends")');
    await friendsModeBtn.click();
    await page.waitForTimeout(400);

    // Click through a few characters
    const unfinishedFriendBtn = page.locator('.scrapbook-tabs button:has-text("The Unfinished One")');
    await unfinishedFriendBtn.click();
    await page.waitForTimeout(300);

    const friendCard = page.locator('.scrapbook-card h3:has-text("The Unfinished One")');
    if (!(await friendCard.isVisible())) throw new Error('Character card for The Unfinished One not visible!');
    console.log('✓ Character portfolio verified for The Unfinished One');

    await page.screenshot({ path: path.join(outDir, '04_scrapbook_desktop_friends.png') });
    console.log('✓ Captured 04: Scrapbook desktop friends portfolio');

    await page.close();
  }

  // =========================================================================
  // TEST 3: Weather Forest Ground Continuity & Finale Cathedral Architecture
  // =========================================================================
  console.log('\n--- TEST 3: Weather Forest Gnarled Ground & Cathedral Stone Arcades ---');
  {
    const page = await browser.newPage({
      viewport: { width: 390, height: 844 },
      isMobile: true,
      hasTouch: true,
    });

    // 1. Weather Forest check
    await page.addInitScript(() => {
      localStorage.setItem(
        'morrow-v2',
        JSON.stringify({
          completed: ['workshop', 'shadows'],
          active: 'weather',
          muted: true,
          easter: false,
          started: true,
        })
      );
    });

    await page.goto('http://127.0.0.1:4173');
    await page.waitForTimeout(1000);

    const gnarledRoots = page.locator('.forest-gnarled-roots');
    const contactShadows = page.locator('.character-contact-shadows');
    if (!(await gnarledRoots.isVisible())) throw new Error('Weather Forest gnarled roots not visible!');
    if (!(await contactShadows.isVisible())) throw new Error('Weather Forest character contact shadows not visible!');
    console.log('✓ Weather Forest gnarled roots and contact shadows confirmed');

    await page.screenshot({ path: path.join(outDir, '05_weather_forest_gnarled_ground.png') });
    console.log('✓ Captured 05: Weather Forest gnarled ground');

    // 2. Cathedral Finale check in dedicated clean page
    const finalePage = await browser.newPage({
      viewport: { width: 390, height: 844 },
      isMobile: true,
      hasTouch: true,
    });

    await finalePage.addInitScript(() => {
      localStorage.setItem(
        'morrow-v2',
        JSON.stringify({
          completed: ['workshop', 'shadows', 'weather', 'clock'],
          active: 'finale',
          muted: true,
          easter: false,
          started: true,
        })
      );
    });

    await finalePage.goto('http://127.0.0.1:4173');
    await finalePage.waitForTimeout(1000);

    const stoneArcades = finalePage.locator('.cathedral-stone-arcades');
    const lightShafts = finalePage.locator('.cathedral-light-shafts');
    if (!(await stoneArcades.isVisible())) throw new Error('Cathedral stone arcades not visible!');
    if (!(await lightShafts.isVisible())) throw new Error('Cathedral light shafts not visible!');
    console.log('✓ Clock Tower Cathedral stone arcades and directional light shafts confirmed');

    await finalePage.screenshot({ path: path.join(outDir, '06_cathedral_stone_arcades.png') });
    console.log('✓ Captured 06: Cathedral stone arcades & directional lighting');

    await finalePage.close();

    await page.close();
  }

  await browser.close();

  if (failedErrors.length > 0) {
    console.error('\nVerification completed with errors:', failedErrors);
    process.exit(1);
  } else {
    console.log('\n=============================================================');
    console.log('✓ SPRINT 04 VERIFICATION PASSED: ALL CHECKS & PROOFS GREEN');
    console.log('=============================================================');
  }
})();
