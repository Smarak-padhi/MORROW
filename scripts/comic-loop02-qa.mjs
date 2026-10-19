import { chromium } from 'playwright';
import path from 'path';
import fs from 'fs';

const ARTIFACT_DIR = 'C:/Users/smara/.gemini/antigravity/brain/8108cb18-00a2-48e4-a809-40432b736722';
const SCREENSHOT_DIR = path.join(ARTIFACT_DIR, 'comic_qa_screenshots');
fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });

async function runQA() {
  const report = {
    checks: [],
    panels: [],
    visualFindings: [],
  };

  const browser = await chromium.launch({ headless: true });

  // 1. Mobile iPhone Context
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
    recordVideo: {
      dir: path.join(ARTIFACT_DIR, 'comic_recordings'),
      size: { width: 390, height: 844 },
    },
  });

  const page = await context.newPage();
  console.log('Navigating to http://localhost:4173...');
  await page.goto('http://localhost:4173', { waitUntil: 'networkidle' });

  // Clear state for clean QA
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: 'networkidle' });
  await page.waitForTimeout(600);

  // Skip landing/intro
  const openBtn = page.locator('button:has-text("Open the story")');
  if (await openBtn.count() > 0) {
    await openBtn.first().click();
    await page.waitForTimeout(600);
  }
  const skipBtn = page.locator('button:has-text("Skip scene")');
  if (await skipBtn.count() > 0) {
    await skipBtn.first().click();
    await page.waitForTimeout(800);
  }

  await page.waitForSelector('.comic-workshop', { timeout: 5000 });
  console.log('Workshop Comic loaded!');

  // Check 1: Initial panel count before ringing bell
  const initialPanels = await page.locator('.comic-panel').count();
  report.checks.push({
    test: 'Initial Panel Count',
    expected: 1,
    actual: initialPanels,
    passed: initialPanels === 1,
  });
  console.log(`Initial panels before bell: ${initialPanels}`);

  // Capture Panel 1 (Establish)
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'panel_1_establish.png') });

  // Check 2: Ringing the bell reveals one new story beat (Panel 2: Bell)
  const bellBtn = page.locator('button:has-text("Ring the bell to wake the workshop")').first();
  await bellBtn.click();
  await page.waitForTimeout(1200);

  const afterBellPanels = await page.locator('.comic-panel').count();
  report.checks.push({
    test: 'Bell reveals panels',
    expected: 2,
    actual: afterBellPanels,
    passed: afterBellPanels === 2,
  });
  console.log(`Panels after ringing bell: ${afterBellPanels}`);
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'panel_2_bell.png') });

  // Check 3: Earlier panels remain visible as we step through all 9 panels
  let priorPanelCount = afterBellPanels;
  let allPreviousRetained = true;

  for (let step = 1; step <= 7; step++) {
    const nextBtn = page.locator('.comic-reading button:has-text("Turn the page")');
    if (await nextBtn.count() > 0) {
      await nextBtn.first().click();
      await page.waitForTimeout(800);
      const currentPanels = await page.locator('.comic-panel').count();
      if (currentPanels <= priorPanelCount) {
        allPreviousRetained = false;
      }
      priorPanelCount = currentPanels;
      console.log(`Step ${step}: now displaying ${currentPanels} panels`);
      await page.screenshot({ path: path.join(SCREENSHOT_DIR, `step_${step}_panels_${currentPanels}.png`) });
    }
  }

  const finalPanelCount = await page.locator('.comic-panel').count();
  report.checks.push({
    test: 'All 9 Comic Panels Revealed Sequentially',
    expected: 9,
    actual: finalPanelCount,
    passed: finalPanelCount === 9 && allPreviousRetained,
  });

  // Check 4: Inspect each of the 9 panels individually
  const panelElements = await page.locator('.comic-panel').all();
  for (let i = 0; i < panelElements.length; i++) {
    const el = panelElements[i];
    const caption = await el.locator('.comic-panel-caption').textContent();
    const balloonCount = await el.locator('.comic-balloon').count();
    let balloonText = '';
    if (balloonCount > 0) {
      balloonText = await el.locator('.comic-balloon').innerText();
    }
    const hasMorrowImg = await el.locator('.comic-morrow').count() > 0;
    const morrowSrc = hasMorrowImg ? await el.locator('.comic-morrow').getAttribute('src') : null;

    // Check sticky control collision with the panel
    const box = await el.boundingBox();
    const stickyBox = await page.locator('.comic-reading').boundingBox();
    const isObscuredBySticky = stickyBox && box ? (stickyBox.y < box.y + 40 && stickyBox.y + stickyBox.height > box.y) : false;

    report.panels.push({
      panelIndex: i + 1,
      caption: caption?.trim(),
      hasBalloon: balloonCount > 0,
      balloonText: balloonText.replace(/\n/g, ' '),
      hasMorrowImg,
      morrowSrc,
      boundingBox: box,
    });
  }

  // Check 5: Character consistency across panels
  const morrowSrcs = report.panels.filter(p => p.hasMorrowImg).map(p => p.morrowSrc);
  const uniformMorrow = morrowSrcs.every(src => src === '/characters/morrow.png');
  report.checks.push({
    test: 'Morrow Model Consistency',
    expected: 'All /characters/morrow.png',
    actual: morrowSrcs.join(', '),
    passed: uniformMorrow,
  });

  // Check 6: Chapter progression (Next chapter button appears when all 9 panels are revealed)
  const continueBtn = page.locator('button.chapter-continue:has-text("Step into the next chapter")');
  const continueVisible = await continueBtn.isVisible();
  report.checks.push({
    test: 'Chapter Progression Button Available',
    expected: true,
    actual: continueVisible,
    passed: continueVisible,
  });

  if (continueVisible) {
    await continueBtn.click();
    await page.waitForTimeout(1000);
    const chapter2 = await page.locator('.chapter-shadows').count() > 0;
    report.checks.push({
      test: 'Progression to Chapter 2 (Shadow Village)',
      expected: true,
      actual: chapter2,
      passed: chapter2,
    });
    console.log(`Advanced to Chapter 2: ${chapter2}`);
  }

  // Check 7: Save State persistence
  const savedState = await page.evaluate(() => localStorage.getItem('morrow-v2'));
  const parsedSave = savedState ? JSON.parse(savedState) : null;
  const saveHasWorkshopCompleted = parsedSave?.completed?.includes('workshop');
  report.checks.push({
    test: 'Save State Persistence (Workshop completed in morrow-v2)',
    expected: true,
    actual: saveHasWorkshopCompleted,
    passed: !!saveHasWorkshopCompleted,
  });

  // Check 8: Reloading preserves completed state
  await page.reload({ waitUntil: 'networkidle' });
  await page.waitForTimeout(600);
  const isStillChapter2 = await page.locator('.chapter-shadows').count() > 0;
  report.checks.push({
    test: 'Reload Preserves Active Chapter',
    expected: true,
    actual: isStillChapter2,
    passed: isStillChapter2,
  });

  // Check 9: Reduced Motion Test
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: 'networkidle' });
  await page.waitForTimeout(600);

  const openBtnReduced = page.locator('button:has-text("Open the story")');
  if (await openBtnReduced.count() > 0) {
    await openBtnReduced.first().click();
    await page.waitForTimeout(600);
  }
  const isWorkshopImmediate = await page.locator('.comic-workshop').count() > 0;
  report.checks.push({
    test: 'Reduced Motion Bypasses Cinematics Directly',
    expected: true,
    actual: isWorkshopImmediate,
    passed: isWorkshopImmediate,
  });

  // Close context to save video
  await page.close();
  await context.close();
  await browser.close();

  // Find and copy recording
  const recDir = path.join(ARTIFACT_DIR, 'comic_recordings');
  const files = fs.readdirSync(recDir).filter(f => f.endsWith('.webm'));
  if (files.length > 0) {
    const latest = path.join(recDir, files[files.length - 1]);
    const target = path.join(ARTIFACT_DIR, 'workshop_comic_scrollthrough.webm');
    fs.copyFileSync(latest, target);
    console.log('Mobile scroll-through saved to:', target);
  }

  // Write report
  fs.writeFileSync(path.join(ARTIFACT_DIR, 'comic_qa_report.json'), JSON.stringify(report, null, 2));
  console.log('Comic Loop 02 QA completed!');
  return report;
}

runQA().then(r => console.log('Summary:', JSON.stringify(r.checks, null, 2))).catch(e => console.error(e));
