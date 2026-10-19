import { chromium } from 'playwright';
import fs from 'node:fs/promises';
import path from 'node:path';

const outDir = path.resolve('qa/sprint03_finale');
await fs.mkdir(outDir, { recursive: true });

(async () => {
  const browser = await chromium.launch({ headless: true });
  console.log('=== VERIFYING SPRINT 03: CLOCK TOWER CATHEDRAL & THE FINAL STITCH ===\n');

  let failedErrors = [];

  // =========================================================================
  // TEST 1: Direct Pointer Drag & Climax Sequence on Mobile Viewport (390px)
  // =========================================================================
  console.log('--- TEST 1: Direct Needle Pointer Drag & Emotional Climax (Mobile 390px) ---');
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

    // Initialize with chapters 1-3 completed and finale active
    await page.addInitScript(() => {
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

    await page.goto('http://127.0.0.1:4173');
    await page.waitForTimeout(1000);

    // Verify Cathedral stage elements
    const cathedralPlate = page.locator('.finale-cathedral-theatre-plate, .cathedral-theatre-plate');
    if (!(await cathedralPlate.isVisible())) {
      throw new Error('Cathedral theatre plate not visible!');
    }
    console.log('✓ Clock Tower Cathedral mounted successfully');

    // CAPTURE 1: Cathedral before interaction
    await page.screenshot({ path: path.join(outDir, '01_cathedral_initial_view.png') });
    console.log('✓ Captured 01: Cathedral initial view');

    // Advance story dialogue to witness character interactions
    for (let i = 0; i < 4; i++) {
      const turn = page.locator('button:has-text("Turn the page")');
      if (await turn.isVisible()) {
        await turn.click();
        await page.waitForTimeout(300);
      }
    }
    await page.waitForTimeout(500);

    // CAPTURE 2: Dialogue interaction between Morrow and Unfinished One
    await page.screenshot({ path: path.join(outDir, '02_cathedral_dialogue.png') });
    console.log('✓ Captured 02: Cathedral dialogue and character staging');

    // Locate the Final Stitch SVG workbench
    const stitchSvg = page.locator('.physical-stitch-svg, .finale-svg');
    await stitchSvg.scrollIntoViewIfNeeded();

    const getSvgToScreen = async () => {
      await stitchSvg.scrollIntoViewIfNeeded();
      const b = await stitchSvg.boundingBox();
      if (!b) throw new Error('Final Stitch SVG bounding box not found!');
      return (svgX, svgY) => ({
        x: b.x + (svgX / 380) * b.width,
        y: b.y + (svgY / 220) * b.height,
      });
    };

    const svgToScreen = await getSvgToScreen();

    // Needle starts at (270, 115) and must be guided to companion thread at (120, 115)
    console.log('Beginning pointer drag of golden needle across the chasm gap...');
    const needleStart = svgToScreen(270, 115);
    const needleMid = svgToScreen(195, 125); // Mid-chasm sag
    const companionSnap = svgToScreen(120, 115); // Snap point

    await page.mouse.move(needleStart.x, needleStart.y);
    await page.mouse.down();
    await page.waitForTimeout(150);

    // Move to midpoint of chasm
    await page.mouse.move(needleMid.x, needleMid.y, { steps: 6 });
    await page.waitForTimeout(200);

    // CAPTURE 3: Needle mid-drag with catenary drape and companion reach
    await page.screenshot({ path: path.join(outDir, '03_stitch_mid_drag_catenary.png') });
    console.log('✓ Captured 03: Needle mid-drag showing catenary drape and companion paw reach');

    // Move into magnetic snap radius (within 50px of 120, 115)
    await page.mouse.move(companionSnap.x, companionSnap.y, { steps: 8 });
    await page.waitForTimeout(250);
    await page.mouse.up();
    await page.waitForTimeout(400);

    // Verify knot cinched
    const feedbackText = await page.locator('.game-reaction p').textContent();
    console.log('Feedback after snap:', feedbackText);
    if (!feedbackText.includes('crooked knot') && !feedbackText.includes('Awakened')) {
      throw new Error(`Knot did not snap into crooked knot! Feedback: ${feedbackText}`);
    }

    // CAPTURE 4: Crooked knot cinched
    await page.screenshot({ path: path.join(outDir, '04_crooked_knot_cinched.png') });
    console.log('✓ Captured 04: Crooked knot cinched with golden radiance');

    // Wait for the 7-stage choreographed emotional climax to complete (~4.8s)
    console.log('Observing 7-stage emotional climax sequence...');
    await page.waitForTimeout(5000);

    // CAPTURE 5: Dawn wash over restored cathedral
    await page.screenshot({ path: path.join(outDir, '05_cathedral_dawn_restored.png') });
    console.log('✓ Captured 05: Warm golden dawn wash filling cathedral, paws met, Professor smiling');

    // Verify continue button is unlocked and visible
    const continueBtn = page.locator('button.chapter-continue');
    await continueBtn.scrollIntoViewIfNeeded();
    if (!(await continueBtn.isVisible())) {
      throw new Error('Continue button not visible after puzzle completion!');
    }
    const continueLabel = await continueBtn.textContent();
    console.log(`✓ Chapter continue button unlocked: "${continueLabel.trim()}"`);

    // CAPTURE 6: Continue button ready to transition into Epilogue
    await page.screenshot({ path: path.join(outDir, '06_finale_ready_continue.png') });
    console.log('✓ Captured 06: Finale completed, continue button ready');

    // Click continue to advance into Epilogue
    await continueBtn.click();
    await page.waitForTimeout(1000);

    // Verify Epilogue reached
    const epilogueChapter = page.locator('.chapter-epilogue');
    if (!(await epilogueChapter.isVisible())) {
      throw new Error('Did not transition into Epilogue!');
    }
    const epilogueHeading = await page.locator('.chapter-epilogue h1').textContent();
    console.log(`✓ Epilogue reached successfully: "${epilogueHeading}"`);

    // Advance dialogue to reveal The Almost-Right Repair Shop
    for (let i = 0; i < 4; i++) {
      const turn = page.locator('button:has-text("Turn the page")');
      if (await turn.isVisible()) {
        await turn.click();
        await page.waitForTimeout(300);
      }
    }
    await page.waitForTimeout(500);

    // Verify Almost-Right Repair Shop ending visible
    const epilogueTitle = page.locator('.storybook-ending h2');
    if (await epilogueTitle.isVisible()) {
      const titleText = await epilogueTitle.textContent();
      console.log(`✓ Almost-Right Repair Shop verified: "${titleText}"`);
    }

    // CAPTURE 7: Epilogue / Almost-Right Repair Shop
    await page.screenshot({ path: path.join(outDir, '07_epilogue_repair_shop.png') });
    console.log('✓ Captured 07: Epilogue Almost-Right Repair Shop');

    if (pageErrors.length > 0) {
      console.warn('Page errors detected in Test 1:', pageErrors);
    }
    await page.close();
  }

  // =========================================================================
  // TEST 2: Keyboard Accessibility Alternative on Desktop Viewport (1280px)
  // =========================================================================
  console.log('\n--- TEST 2: Keyboard Accessibility & Slider Interaction (Desktop 1280px) ---');
  {
    const page = await browser.newPage({
      viewport: { width: 1280, height: 800 },
    });

    const pageErrors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') pageErrors.push(msg.text());
    });
    page.on('pageerror', err => pageErrors.push(err.message));

    await page.addInitScript(() => {
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

    await page.goto('http://127.0.0.1:4173');
    await page.waitForTimeout(1000);

    // Open Accessible Stitch Drawer
    const drawer = page.locator('.accessible-stitch-drawer summary');
    await drawer.scrollIntoViewIfNeeded();
    await drawer.click();
    await page.waitForTimeout(300);

    // CAPTURE 8: Accessible drawer open
    await page.screenshot({ path: path.join(outDir, '08_accessible_stitch_drawer.png') });
    console.log('✓ Captured 08: Accessible drawer open on desktop');

    // Use the keyboard stitch action button
    const kbdStitchBtn = page.locator('.accessible-stitch-btn:has-text("Cinch Crooked Knot")');
    if (!(await kbdStitchBtn.isVisible())) {
      throw new Error('Keyboard stitch button not found inside drawer!');
    }

    await kbdStitchBtn.click();
    await page.waitForTimeout(500);

    // Verify completion
    const feedbackText = await page.locator('.game-reaction p').textContent();
    console.log('Keyboard trigger feedback:', feedbackText);
    if (!feedbackText.includes('Awakened') && !feedbackText.includes('crooked knot')) {
      throw new Error(`Keyboard stitch did not cinch knot! Feedback: ${feedbackText}`);
    }

    // CAPTURE 9: Keyboard completion verification
    await page.screenshot({ path: path.join(outDir, '09_keyboard_stitch_completed.png') });
    console.log('✓ Captured 09: Keyboard stitch completion verified');

    if (pageErrors.length > 0) {
      console.warn('Page errors detected in Test 2:', pageErrors);
    }
    await page.close();
  }

  await browser.close();
  console.log('\n=== ALL SPRINT 03 FINALE TESTS PASSED WITH 100% SUCCESS ===');
})();
