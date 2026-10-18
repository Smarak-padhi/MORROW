// Visual regression gate for comic panels. Run with dev server already running:
// npm install --no-save playwright && node scripts/comic-visual-qa.mjs
import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const base = process.env.MORROW_URL || 'http://localhost:5173';
const problems = [];
try {
  for (const width of [320, 375, 390, 430, 768]) {
    const page = await browser.newPage({ viewport: { width, height: 844 }, reducedMotion: 'reduce', deviceScaleFactor: 1 });
    await page.goto(base, { waitUntil: 'domcontentloaded' });
    await page.evaluate(() => localStorage.removeItem('morrow-v2'));
    await page.reload();
    await page.getByRole('button', { name: /open the story/i }).click();
    await page.getByRole('button', { name: /ring the bell/i }).click();
    for (let i = 0; i < 7; i++) await page.getByRole('button', { name: /turn the page/i }).click();
    const measurements = await page.evaluate(() => {
      const box = (el) => { const r = el.getBoundingClientRect(); return { left: r.left, top: r.top, right: r.right, bottom: r.bottom }; };
      const intersects = (a,b) => a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;
      return {
        count: document.querySelectorAll('.comic-panel').length,
        overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
        panels: [...document.querySelectorAll('.comic-panel')].map(panel => {
          const balloon = panel.querySelector('.comic-balloon');
          const art = panel.querySelector('.comic-character-frame');
          return { shot: panel.className, artBalloonCollision: !!(art && balloon && intersects(box(art),box(balloon))) };
        }),
      };
    });
    if (measurements.count !== 9) problems.push(`${width}px: only ${measurements.count}/9 panels`);
    if (measurements.overflow) problems.push(`${width}px: horizontal overflow`);
    for (const panel of measurements.panels) if (panel.artBalloonCollision) problems.push(`${width}px: balloon overlaps Morrow in ${panel.shot}`);
    await page.close();
  }
} finally { await browser.close(); }
if (problems.length) { console.error('COMIC VISUAL QA FAILED\n' + problems.join('\n')); process.exitCode = 1; }
else console.log('COMIC VISUAL QA PASSED: panel count, overflow, and balloon/image geometry at 320–768px.');
// Note: geometric checks do not verify character identity, narrative continuity,
// transparency, sleeping pose, visual quality, or physical Safari rendering.
