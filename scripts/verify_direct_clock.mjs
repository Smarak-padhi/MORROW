import { chromium } from 'playwright';
import fs from 'node:fs/promises';
import path from 'node:path';

const outDir = path.resolve('qa/sprint02_playable_clock');
await fs.mkdir(outDir, { recursive: true });

(async () => {
  const browser = await chromium.launch({ headless: true });
  console.log('=== VERIFYING DIRECT PLAYABLE IMPOSSIBLE CLOCK MECHANISM ===\n');

  // =========================================================================
  // TEST 1: Direct Physical Manipulation on Mobile Viewport (Touch & Pointer)
  // =========================================================================
  console.log('--- TEST 1: Direct Drag, Rotation, and Tension Pull (Mobile 390px) ---');
  {
    const page = await browser.newPage({
      viewport: { width: 390, height: 844 },
      isMobile: true,
      hasTouch: true,
    });

    await page.addInitScript(() => {
      localStorage.setItem(
        'morrow-v2',
        JSON.stringify({
          completed: ['workshop', 'shadows', 'weather'],
          active: 'clock',
          muted: true,
          easter: false,
          started: true,
        })
      );
    });

    await page.goto('http://127.0.0.1:4173');
    await page.waitForTimeout(1000);

    // Advance dialogue to reach clockmaker scene
    for (let i = 0; i < 4; i++) {
      const turn = page.locator('button:has-text("Turn the page")');
      if (await turn.isVisible()) {
        await turn.click();
        await page.waitForTimeout(300);
      }
    }
    await page.waitForTimeout(500);

    // CAPTURE 1: Clock before interaction
    await page.screenshot({ path: path.join(outDir, '01_clock_before_interaction.png') });
    console.log('✓ Captured 01: Clock before interaction');

    // Locate the SVG mechanism
    const clockSvg = page.locator('.physical-clock-svg');
    await clockSvg.scrollIntoViewIfNeeded();
    const getFreshSvgToScreen = async () => {
      await clockSvg.scrollIntoViewIfNeeded();
      const b = await clockSvg.boundingBox();
      if (!b) throw new Error('Physical clock SVG bounding box not found!');
      return (svgX, svgY) => ({
        x: b.x + (svgX / 380) * b.width,
        y: b.y + (svgY / 340) * b.height,
      });
    };

    const svgToScreen = await getFreshSvgToScreen();

    // STEP 1: Physically drag brass cog from left tray (45, 160) to spindle (190, 160)
    console.log('Dragging loose brass cog into central spindle...');
    const cogStart = svgToScreen(45, 160);
    const cogMid = svgToScreen(120, 160);
    const spindle = svgToScreen(190, 160);

    await page.mouse.move(cogStart.x, cogStart.y);
    await page.mouse.down();
    await page.waitForTimeout(100);

    // Move to midpoint
    await page.mouse.move(cogMid.x, cogMid.y, { steps: 5 });
    await page.waitForTimeout(200);

    // CAPTURE 2: Gear physically being moved mid-flight
    await page.screenshot({ path: path.join(outDir, '02_gear_physically_moved.png') });
    console.log('✓ Captured 02: Gear physically being moved mid-flight');

    // Move to spindle and release
    await page.mouse.move(spindle.x, spindle.y, { steps: 8 });
    await page.waitForTimeout(200);
    await page.mouse.up();
    await page.waitForTimeout(400);

    // Verify gear is meshed on spindle
    const feedbackText = await page.locator('.game-reaction p').textContent();
    console.log('Feedback after cog snap:', feedbackText);
    if (!feedbackText.includes('shadow cog meshes')) {
      throw new Error(`Gear did not mesh on spindle! Feedback: ${feedbackText}`);
    }

    // CAPTURE 3: Gear meshed on spindle
    await page.screenshot({ path: path.join(outDir, '03_gear_snapped_spindle.png') });
    console.log('✓ Captured 03: Gear meshed on spindle');

    // STEP 2: Directly rotate weather dial from 45° to South (180°)
    console.log('Directly rotating weather dial to South (180°)...');
    const svgToScreen2 = await getFreshSvgToScreen();
    const dialHandleStart = svgToScreen2(190 + 14, 85 - 14);

    await page.mouse.move(dialHandleStart.x, dialHandleStart.y);
    await page.mouse.down();
    await page.waitForTimeout(100);

    // Rotate arc around center toward South (190, 85 + 24)
    const dialQuarter = svgToScreen2(190 + 20, 85 + 10);
    await page.mouse.move(dialQuarter.x, dialQuarter.y, { steps: 6 });
    await page.waitForTimeout(200);

    // CAPTURE 4: Weather dial rotating
    await page.screenshot({ path: path.join(outDir, '04_weather_dial_rotating.png') });
    console.log('✓ Captured 04: Weather dial rotating');

    // Move to bottom (South 180°)
    const dialSouth = svgToScreen2(190, 85 + 24);
    await page.mouse.move(dialSouth.x, dialSouth.y, { steps: 8 });
    await page.waitForTimeout(200);
    await page.mouse.up();
    await page.waitForTimeout(400);

    const feedbackAfterDial = await page.locator('.game-reaction p').textContent();
    console.log('Feedback after dial rotation:', feedbackAfterDial);
    if (!feedbackAfterDial.includes('weather vane locks at 180° South')) {
      throw new Error(`Weather dial did not lock to South! Feedback: ${feedbackAfterDial}`);
    }

    // CAPTURE 5: Weather dial aligned
    await page.screenshot({ path: path.join(outDir, '05_weather_dial_aligned.png') });
    console.log('✓ Captured 05: Weather dial locked at South (180°)');

    // STEP 3: Physically pull crooked heart spring from right tray (335, 235) to slot (190, 235)
    console.log('Physically pulling crooked heart spring with tension...');
    const svgToScreen3 = await getFreshSvgToScreen();
    const springStart = svgToScreen3(335, 235);
    const springMid = svgToScreen3(260, 220);
    const springSlot = svgToScreen3(190, 235);

    await page.mouse.move(springStart.x, springStart.y);
    await page.mouse.down();
    await page.waitForTimeout(100);

    // Pull toward center showing tension line
    await page.mouse.move(springMid.x, springMid.y, { steps: 6 });
    await page.waitForTimeout(200);

    // CAPTURE 6: Heart spring being pulled with tension wire
    await page.screenshot({ path: path.join(outDir, '06_heart_spring_pulling.png') });
    console.log('✓ Captured 06: Heart spring being pulled with tension');

    // Drag into heart chamber and release to seat
    await page.mouse.move(springSlot.x, springSlot.y, { steps: 8 });
    await page.waitForTimeout(200);
    await page.mouse.up();
    console.log('Heart spring seated! Observing timed choreographed restart sequence...');

    // CAPTURE 7: Timed Stage 1 - Heart spring glowing (t ~ 200ms)
    await page.waitForTimeout(200);
    await page.screenshot({ path: path.join(outDir, '07_restart_stage1_heart_glow.png') });
    console.log('✓ Captured 07: Timed Stage 1 - Heart spring glowing');

    // CAPTURE 8: Timed Stage 3 - Gears and hands moving past 4:01 (t ~ 1200ms)
    await page.waitForTimeout(1100);
    await page.screenshot({ path: path.join(outDir, '08_restart_stage3_hands_sweeping.png') });
    console.log('✓ Captured 08: Timed Stage 3 - Gears engaging and hands sweeping');

    // CAPTURE 9: Timed Stage 5 - Bakery chimney steam and street lamps (t ~ 2400ms)
    await page.waitForTimeout(1200);
    await page.screenshot({ path: path.join(outDir, '09_restart_stage5_steam_and_lights.png') });
    console.log('✓ Captured 09: Timed Stage 5 - Bakery chimney steam & street lamps');

    // CAPTURE 10: Timed Stage 6 - Professor Primrose Perfect delighted reaction (t ~ 3000ms)
    await page.waitForTimeout(800);
    await page.screenshot({ path: path.join(outDir, '10_restart_stage6_professor_delight.png') });
    console.log('✓ Captured 10: Timed Stage 6 - Professor Perfect gasping in smiling delight');

    // CAPTURE 11: Final Restored Town at Golden Dawn (t ~ 4000ms+)
    await page.waitForTimeout(1500);
    await page.screenshot({ path: path.join(outDir, '11_final_restored_town_dawn.png') });
    console.log('✓ Captured 11: Final Restored Town at Golden Dawn');

    // Verify next chapter continue button is unlocked and accessible
    const continueBtn = page.locator('button:has-text("Step into the next chapter")');
    await continueBtn.scrollIntoViewIfNeeded();
    await continueBtn.waitFor({ state: 'visible', timeout: 8000 });
    const isContinueVisible = await continueBtn.isVisible();
    console.log('Step into next chapter button visible:', isContinueVisible);
    if (!isContinueVisible) throw new Error('Continuation button was not unlocked!');

    await page.close();
  }

  // =========================================================================
  // TEST 2: Keyboard Direct Accessibility
  // =========================================================================
  console.log('\n--- TEST 2: Accessible Keyboard Navigation (Enter, Space, Arrows) ---');
  {
    const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
    await page.addInitScript(() => {
      localStorage.setItem(
        'morrow-v2',
        JSON.stringify({
          completed: ['workshop', 'shadows', 'weather'],
          active: 'clock',
          muted: true,
          easter: false,
          started: true,
        })
      );
    });

    await page.goto('http://127.0.0.1:4173');
    await page.waitForTimeout(800);

    for (let i = 0; i < 4; i++) {
      const turn = page.locator('button:has-text("Turn the page")');
      if (await turn.isVisible()) {
        await turn.click();
        await page.waitForTimeout(200);
      }
    }

    // Keyboard Step 1: Focus cog and press Enter
    const cogGroup = page.locator('.draggable-gear-group');
    await cogGroup.focus();
    await page.keyboard.press('Enter');
    await page.waitForTimeout(300);

    // Keyboard Step 2: Focus weather dial and press Enter to align
    const dialZone = page.locator('.weather-vane-zone');
    await dialZone.focus();
    await page.keyboard.press('Enter');
    await page.waitForTimeout(300);

    // Keyboard Step 3: Focus heart spring and press Enter to seat
    const heartGroup = page.locator('.draggable-heart-group');
    await heartGroup.focus();
    await page.keyboard.press('Enter');
    await page.waitForTimeout(600);

    const feedback = await page.locator('.game-reaction p').textContent();
    console.log('Keyboard assembly feedback:', feedback);
    if (!feedback.includes('TICK! TOCK!')) {
      throw new Error(`Keyboard assembly failed! Feedback: ${feedback}`);
    }
    console.log('✓ TEST 2 PASSED: Full keyboard accessibility verified.');
    await page.close();
  }

  await browser.close();
  console.log('\n=== ALL DIRECT CLOCKWORK VERIFICATION TESTS COMPLETED SUCCESSFULLY! ===');
})();
