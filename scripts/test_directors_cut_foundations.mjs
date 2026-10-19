import { chromium } from 'playwright';
import fs from 'node:fs/promises';
import path from 'node:path';

const outDir = path.resolve('qa/directors_cut_audit');
await fs.mkdir(outDir, { recursive: true });

(async () => {
  const browser = await chromium.launch({ headless: true });
  console.log('=== RUNNING MORROW 2.0 DIRECTOR’S CUT FOUNDATION TESTS ===\n');

  // TEST 1: Global Audio Synchronization & Autoplay Rejection Handling
  console.log('--- TEST 1: Audio Synchronization in ComicVideoPanel ---');
  {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
    await page.addInitScript(() => {
      localStorage.setItem('morrow-v2', JSON.stringify({
        completed: [],
        active: 'workshop',
        muted: true,
        easter: false,
        started: true
      }));
    });
    await page.goto('http://127.0.0.1:4173');
    await page.waitForTimeout(600);

    // Initial state in topbar should be "Enable sound" (muted)
    const topMuteBtn = page.locator('header.story-topbar button[aria-label*="sound"]');
    const initialAria = await topMuteBtn.getAttribute('aria-label');
    console.log('Initial topbar sound aria-label (should be "Enable sound"):', initialAria);

    // Ring bell to display workshop panels
    const bellBtn = page.locator('button:has-text("Ring the bell")');
    if (await bellBtn.isVisible()) {
      await bellBtn.click();
      await page.waitForTimeout(500);
    }

    // Advance to panel with video (beat 1 -> panel 2 "reaction")
    await page.click('button:has-text("Continue story")');
    await page.waitForTimeout(600);

    // Verify video element exists and reflects muted state
    const video = page.locator('.comic-panel-video').first();
    const isMuted = await video.evaluate((el) => el.muted);
    console.log('Video element muted property when global is muted:', isMuted);
    if (!isMuted) throw new Error('Video was not muted when global sound was muted!');

    // Toggle global sound via topbar to UNMUTE
    await topMuteBtn.click();
    await page.waitForTimeout(300);

    const isMutedAfterUnmute = await video.evaluate((el) => el.muted);
    console.log('Video element muted property after unmuting globally:', isMutedAfterUnmute);
    if (isMutedAfterUnmute) throw new Error('Video did not unmute when global sound was unmuted!');

    // Re-mute globally
    await topMuteBtn.click();
    await page.waitForTimeout(300);
    const isMutedAfterReMute = await video.evaluate((el) => el.muted);
    console.log('Video element muted property after re-muting globally:', isMutedAfterReMute);
    if (!isMutedAfterReMute) throw new Error('Video did not re-mute when global sound was muted!');

    await page.screenshot({ path: path.join(outDir, '01_audio_sync_verified.png') });
    console.log('✓ TEST 1 PASSED: ComicVideoPanel strictly synchronizes with global audio state.\n');
    await page.close();
  }

  // TEST 2: Sir Clack Comic Panel Timing & Comedic Pause Race Condition
  console.log('--- TEST 2: Sir Clack Panel Video -> 800ms Pause -> Morrow Response ---');
  {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
    await page.addInitScript(() => {
      localStorage.setItem('morrow-v2', JSON.stringify({
        completed: [],
        active: 'workshop',
        muted: true,
        easter: false,
        started: true
      }));
    });
    await page.goto('http://127.0.0.1:4173');
    await page.waitForTimeout(800);

    // Ring bell if not awake
    const bellBtn = page.locator('button:has-text("Ring the bell")');
    if (await bellBtn.isVisible()) {
      await bellBtn.click();
      await page.waitForTimeout(500);
    }

    // Advance to Beat 3 (where Clack's panel is mounted)
    // Beat 0: panels 0,1. Next -> Beat 1: panel 2. Next -> Beat 2: panel 3. Next -> Beat 3: panel 4 (Clack).
    for (let i = 0; i < 3; i++) {
      const continueBtn = page.locator('button:has-text("Continue story")');
      if (await continueBtn.isVisible()) {
        await continueBtn.click();
        await page.waitForTimeout(400);
      }
    }

    // Now we are on Beat 3: Panel 4 ("clack")
    const clackPanel = page.locator('.comic-panel--clack');
    if (!await clackPanel.isVisible()) throw new Error('Clack panel is not visible at Beat 3!');
    console.log('Clack panel is mounted at Beat 3.');

    // Verify Morrow response panel (Panel 5, "hello") is NOT yet visible
    const helloPanel = page.locator('.comic-panel--hello');
    const isHelloVisibleBeforeVideoEnds = await helloPanel.isVisible();
    console.log('Morrow "HELLO" panel visible while Clack video is active:', isHelloVisibleBeforeVideoEnds);
    if (isHelloVisibleBeforeVideoEnds) throw new Error('Race condition! Morrow panel appeared before Clack video ended.');

    // Wait 1.5 seconds and verify it still hasn't jumped prematurely
    await page.waitForTimeout(1500);
    const isStillWaiting = !await helloPanel.isVisible();
    console.log('Morrow panel correctly held back while Clack panel plays:', isStillWaiting);
    if (!isStillWaiting) throw new Error('Timer jumped prematurely without waiting for video!');

    // Simulate Clack video ending
    const clackVideo = clackPanel.locator('video');
    await clackVideo.evaluate((v) => {
      v.dispatchEvent(new Event('ended'));
    });
    console.log('Dispatched onEnded on Clack video. Verifying 800ms comedic pause window...');

    // Immediately check: Morrow panel should STILL not be visible during the 800ms pause!
    const isHelloVisibleImmediately = await helloPanel.isVisible();
    console.log('Morrow panel visible immediately upon video ended (during 800ms pause):', isHelloVisibleImmediately);
    if (isHelloVisibleImmediately) throw new Error('800ms comedic pause was skipped!');

    // Wait for the 800ms comedic pause to expire (+250ms buffer)
    await page.waitForTimeout(1050);
    const isHelloVisibleAfterPause = await helloPanel.isVisible();
    console.log('Morrow panel visible after 800ms comedic pause has elapsed:', isHelloVisibleAfterPause);
    if (!isHelloVisibleAfterPause) throw new Error('Morrow response did not appear after 800ms comedic pause!');

    await page.screenshot({ path: path.join(outDir, '02_workshop_comedic_pause_verified.png') });
    console.log('✓ TEST 2 PASSED: Clack video plays first, 800ms pause holds, then Morrow greets.\n');
    await page.close();
  }

  // TEST 3: Story Director State Machine & Dialogue Auto-Advancement
  console.log('--- TEST 3: Centralized Story Director in Tomorrow Town ---');
  {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
    await page.addInitScript(() => {
      localStorage.setItem('morrow-v2', JSON.stringify({
        completed: ['workshop', 'shadows', 'weather'],
        active: 'clock',
        muted: true,
        easter: false,
        started: true
      }));
    });
    await page.goto('http://127.0.0.1:4173');
    await page.waitForTimeout(800);

    // Verify initial director state on Tomorrow Town arrival
    const mainEl = page.locator('main.chapter-clock');
    const initialState = await mainEl.getAttribute('data-director-state');
    console.log('Director state on chapter arrival:', initialState);
    if (initialState !== 'DIALOGUE_AUTO_ADVANCING' && initialState !== 'PAUSED') {
      throw new Error(`Unexpected director state: ${initialState}`);
    }

    // Verify pause toggle button exists and works
    const pauseToggle = page.locator('.story-director-toggle-btn');
    if (!await pauseToggle.isVisible()) throw new Error('Story director pause/play toggle missing!');

    await pauseToggle.click();
    await page.waitForTimeout(200);
    const pausedState = await mainEl.getAttribute('data-director-state');
    console.log('Director state after clicking pause:', pausedState);
    if (pausedState !== 'PAUSED') throw new Error(`Director state should be PAUSED, got ${pausedState}`);

    // Resume
    await pauseToggle.click();
    await page.waitForTimeout(200);
    const resumedState = await mainEl.getAttribute('data-director-state');
    console.log('Director state after resuming:', resumedState);
    if (resumedState !== 'DIALOGUE_AUTO_ADVANCING') throw new Error(`Director state should be DIALOGUE_AUTO_ADVANCING, got ${resumedState}`);

    // Verify progress bar is present
    const progressBar = page.locator('.story-director-progress-bar');
    const isProgressVisible = await progressBar.isVisible();
    console.log('Story director progress bar visible:', isProgressVisible);
    if (!isProgressVisible) throw new Error('Progress bar track not visible!');

    // Advance dialogue lines to reach the physical mechanism
    for (let i = 0; i < 4; i++) {
      const pageTurn = page.locator('button:has-text("Turn the page")');
      if (await pageTurn.isVisible()) {
        await pageTurn.click();
        await page.waitForTimeout(250);
      }
    }

    // Once all dialogue is turned, director state should be AWAITING_PLAYER_ACTION
    const actionState = await mainEl.getAttribute('data-director-state');
    console.log('Director state after dialogue completes:', actionState);
    if (actionState !== 'AWAITING_PLAYER_ACTION') throw new Error(`Expected AWAITING_PLAYER_ACTION, got ${actionState}`);

    // Solve ImpossibleClock
    await page.click('button:has-text("Fit Brass Cog on Spindle")');
    await page.waitForTimeout(250);
    const rotateBtn = page.locator('button:has-text("Rotate ↷ +45°")');
    while (await rotateBtn.isVisible()) {
      await rotateBtn.click();
      await page.waitForTimeout(200);
    }
    await page.click('button:has-text("Insert Heart Spring")');
    await page.waitForTimeout(500);

    // After puzzle completes, director state should be COMPLETE
    const completeState = await mainEl.getAttribute('data-director-state');
    console.log('Director state after puzzle solved:', completeState);
    if (completeState !== 'COMPLETE') throw new Error(`Expected COMPLETE, got ${completeState}`);

    // Next chapter button is unlocked
    const continueBtn = page.locator('button:has-text("Step into the next chapter")');
    const isContinueVisible = await continueBtn.isVisible();
    console.log('Step into next chapter button visible:', isContinueVisible);
    if (!isContinueVisible) throw new Error('Step into next chapter button not unlocked!');

    await page.screenshot({ path: path.join(outDir, '03_director_state_complete.png') });
    console.log('✓ TEST 3 PASSED: Story Director transitions cleanly across all states.\n');
    await page.close();
  }

  // TEST 4: Full Multi-Viewport Playthrough Screenshot Capture for Experience Audit
  console.log('--- TEST 4: Comprehensive Audit Capture (Mobile 390px & Desktop 1280px) ---');
  const viewports = [
    { name: 'mobile', width: 390, height: 844 },
    { name: 'desktop', width: 1280, height: 800 }
  ];

  const chaptersToAudit = ['workshop', 'shadows', 'weather', 'clock', 'finale', 'epilogue'];

  for (const vp of viewports) {
    const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
    for (const ch of chaptersToAudit) {
      await page.addInitScript((chName) => {
        const completedMap = {
          workshop: [],
          shadows: ['workshop'],
          weather: ['workshop', 'shadows'],
          clock: ['workshop', 'shadows', 'weather'],
          finale: ['workshop', 'shadows', 'weather', 'clock'],
          epilogue: ['workshop', 'shadows', 'weather', 'clock', 'finale']
        };
        localStorage.setItem('morrow-v2', JSON.stringify({
          completed: completedMap[chName] || [],
          active: chName,
          muted: true,
          easter: false,
          started: true
        }));
      }, ch);

      await page.goto('http://127.0.0.1:4173');
      await page.waitForTimeout(500);

      const filename = `audit_${vp.name}_${ch}.png`;
      await page.screenshot({ path: path.join(outDir, filename), fullPage: true });
      console.log(`Captured ${filename}`);
    }
    await page.close();
  }

  await browser.close();
  console.log('\n=== ALL SPRINT 01 FOUNDATION TESTS & AUDIT CAPTURES COMPLETED! ===');
})();
