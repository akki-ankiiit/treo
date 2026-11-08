/** Compare settled scroll frames with the reference. Usage: node scripts/audit-layout.mjs <output-directory> [desktop|mobile] [path] */
import { chromium } from 'playwright';
import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const output = resolve(process.argv[2] || 'test-results/visual-audit');
const mode = process.argv[3] || 'desktop';
const pathname = process.argv[4] || '/';
const slug = pathname.replaceAll('/', '-') || 'home';
const mobile = mode === 'mobile';
const viewport = mobile ? { width: 390, height: 844 } : { width: 1440, height: 1000 };
await mkdir(output, { recursive: true });
const browser = await chromium.launch();
const context = await browser.newContext({ viewport, isMobile: mobile, hasTouch: mobile, deviceScaleFactor: 1 });
await context.addInitScript(() => {
  sessionStorage.setItem('hasVisited', 'true');
  localStorage.setItem('cookies', 'accepted');
});
const pages = await Promise.all([context.newPage(), context.newPage()]);
const urls = ['https://www.example.com', process.env.AUDIT_LOCAL_URL || 'http://localhost:5175'];
const errors = [[], []];
const report = { viewport, pathname, frames: [], errors };
try {
  await Promise.all(pages.map(async (page, index) => {
    page.on('pageerror', error => errors[index].push(error.message));
    await page.goto(urls[index] + pathname, { waitUntil: 'domcontentloaded', timeout: 90000 });
    await page.waitForFunction(() => {
      const loader = document.querySelector('[data-preloader]');
      return loader && getComputedStyle(loader).display === 'none';
    }, undefined, { timeout: 45000 });
    await page.waitForTimeout(1600);
  }));
  report.layout = await Promise.all(pages.map(page => page.evaluate(() => ({
    width: document.documentElement.scrollWidth,
    height: document.documentElement.scrollHeight,
    sections: [...document.querySelector('main').children].filter(el => el.matches('section,.amen-scroll-area')).map(el => {
      const rect = el.getBoundingClientRect();
      return { heading: el.querySelector('h1,h2,h3,h4')?.textContent, top: rect.top + scrollY, height: rect.height, width: rect.width };
    }),
  }))));
  const maxScroll = Math.max(...report.layout.map(layout => layout.height)) - viewport.height;
  const positions = Array.from({ length: Math.ceil(maxScroll / (viewport.height * 0.85)) + 1 }, (_, i) => Math.min(Math.round(i * viewport.height * 0.85), maxScroll));
  const sheet = await browser.newPage({ viewport: { width: mobile ? 600 : 1000, height: 1000 }, deviceScaleFactor: 1 });
  let tiles = [];
  let batch = 0;
  for (const [index, y] of positions.entries()) {
    const frames = await Promise.all(pages.map(async page => {
      await page.evaluate(y => window.scrollTo(0, y), y);
      await page.waitForTimeout(1600);
      return { scroll: await page.evaluate(() => scrollY), image: (await page.screenshot()).toString('base64') };
    }));
    report.frames.push({ index, requestedY: y, scroll: frames.map(frame => frame.scroll) });
    tiles.push(...frames.map((frame, side) => `<figure><figcaption>${side ? 'REACT' : 'REFERENCE'} · frame ${index} · y=${Math.round(frame.scroll)}</figcaption><img src="data:image/png;base64,${frame.image}"></figure>`));
    if (tiles.length === 8 || index === positions.length - 1) {
      await sheet.setContent(`<style>*{box-sizing:border-box}body{margin:0;background:#ddd;font:12px Arial}main{display:grid;grid-template-columns:1fr 1fr;gap:6px;padding:6px}figure{margin:0}figcaption{padding:6px;background:#17233b;color:white}img{width:100%;display:block}</style><main>${tiles.join('')}</main>`);
      await sheet.screenshot({ path: `${output}/${mode}${slug}-sheet-${batch++}.png`, fullPage: true });
      tiles = [];
    }
  }
  report.media = await Promise.all(pages.map(page => page.evaluate(() => ({
    brokenImages: [...document.images].filter(image => image.complete && !image.naturalWidth).map(image => image.src),
    videos: [...document.querySelectorAll('video')].map(video => ({ src: video.currentSrc, error: video.error?.message })),
  }))));
  await writeFile(`${output}/${mode}${slug}-report.json`, JSON.stringify(report, null, 2));
  console.log(JSON.stringify({ mode, pathname, frames: report.frames.length, sheets: batch, layout: report.layout, errors }, null, 2));
} finally {
  await browser.close();
}
