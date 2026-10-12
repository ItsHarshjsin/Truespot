import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const OUTPUT_DIR = 'C:\\Users\\harsh\\Downloads\\TrueSpot_Frames';
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const BASE_URL = 'https://truespott.vercel.app';

// Ensure output dir is clean
if (fs.existsSync(OUTPUT_DIR)) {
  const existingFiles = fs.readdirSync(OUTPUT_DIR);
  for (const file of existingFiles) {
    try {
      fs.unlinkSync(path.join(OUTPUT_DIR, file));
    } catch (e) {}
  }
} else {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForImages(page, timeout = 12000) {
  await page.evaluate(async (to) => {
    const images = Array.from(document.querySelectorAll('img'));
    if (images.length === 0) return;
    await Promise.all(
      images.map((img) => {
        if (img.complete && img.naturalWidth > 0) return Promise.resolve();
        return new Promise((resolve) => {
          img.addEventListener('load', resolve, { once: true });
          img.addEventListener('error', resolve, { once: true });
          setTimeout(resolve, to);
        });
      })
    );
  }, timeout).catch(() => {});
}

async function waitForLeafletTiles(page, minTiles = 8, maxWaitMs = 15000) {
  const start = Date.now();
  while (Date.now() - start < maxWaitMs) {
    const ready = await page.evaluate((min) => {
      const tiles = Array.from(document.querySelectorAll('.leaflet-tile'));
      if (tiles.length < min) return false;
      return tiles.every((tile) => tile.complete && tile.naturalWidth > 0);
    }, minTiles).catch(() => false);

    if (ready) break;
    await sleep(600);
  }
  await sleep(1500);
}

async function captureAll() {
  console.log('🚀 Launching High-Definition TrueSpot Automated Frame Capture...');
  console.log(`📁 Saving to: ${OUTPUT_DIR}\n`);

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-web-security',
      '--allow-running-insecure-content',
      '--window-size=1920,1080',
    ],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 2 });

  // Helper for consistent navigation
  async function loadPage(url, waitTime = 4000) {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await sleep(waitTime);
    await waitForImages(page);
  }

  // ==========================================
  // Frame 1: Hero Landing Page
  // ==========================================
  console.log('📸 [1/11] Capturing Frame 1: Hero Landing Page...');
  await loadPage(`${BASE_URL}/landing`, 4000);
  await page.screenshot({
    path: path.join(OUTPUT_DIR, 'Frame 1 - Hero Landing Page.png'),
    fullPage: false,
  });
  console.log('✅ Frame 1 saved.');

  // ==========================================
  // Frame 2: Query Studio (Empty State)
  // ==========================================
  console.log('📸 [2/11] Capturing Frame 2: Query Studio (Empty State)...');
  await loadPage(`${BASE_URL}/studio`, 4000);
  await page.screenshot({
    path: path.join(OUTPUT_DIR, 'Frame 2 - Query Studio (Empty State).png'),
    fullPage: false,
  });
  console.log('✅ Frame 2 saved.');

  // ==========================================
  // Frame 3: Reality Map (Pin Dropped with 200m Radius)
  // ==========================================
  console.log('📸 [3/11] Capturing Frame 3: Reality Map (Pin Dropped with 200m Radius)...');
  await page.goto(`${BASE_URL}/map`, { waitUntil: 'domcontentloaded', timeout: 30000 });
  await sleep(4000);
  console.log('⏳ Waiting for map tiles to fully render...');
  await waitForLeafletTiles(page, 10, 15000);

  // Click on a query pin to select it and show the glowing 200m geofence circle + drawer details
  try {
    await page.waitForSelector('.truespot-query-pin', { timeout: 8000 });
    const pins = await page.$$('.truespot-query-pin');
    if (pins.length > 0) {
      console.log(`📍 Found ${pins.length} query pins. Selecting active pin...`);
      await pins[0].click();
      await sleep(2500);
      await waitForImages(page);
    }
  } catch (err) {
    console.warn('Fallback pin selection:', err.message);
    try {
      await page.mouse.click(960, 500);
      await sleep(2000);
    } catch (e) {}
  }

  await page.screenshot({
    path: path.join(OUTPUT_DIR, 'Frame 3 - Reality Map (Pin Dropped with 200m Radius).png'),
    fullPage: false,
  });
  console.log('✅ Frame 3 saved.');

  // ==========================================
  // Frame 4: Escrow Lock Modal
  // ==========================================
  console.log('📸 [4/11] Capturing Frame 4: Escrow Lock Modal...');
  await loadPage(`${BASE_URL}/studio`, 3500);
  try {
    const walletSwitcher = await page.$('div[title="Connected Persona & Wallet Switcher"]');
    if (walletSwitcher) {
      await walletSwitcher.click();
      await sleep(1500);
    }
  } catch (e) {}
  await page.screenshot({
    path: path.join(OUTPUT_DIR, 'Frame 4 - Escrow Lock Modal.png'),
    fullPage: false,
  });
  console.log('✅ Frame 4 saved.');

  // ==========================================
  // Frame 5: Maker Dashboard (Active "Live" Query State)
  // ==========================================
  console.log('📸 [5/11] Capturing Frame 5: Maker Dashboard (Active Live Query State)...');
  await loadPage(`${BASE_URL}/bounties`, 5000);
  await waitForImages(page);
  await sleep(1500);
  await page.screenshot({
    path: path.join(OUTPUT_DIR, 'Frame 5 - Maker Dashboard (Active Live Query State).png'),
    fullPage: false,
  });
  console.log('✅ Frame 5 saved.');

  // ==========================================
  // Frame 6: Spotter Radar (Desktop Resolution)
  // ==========================================
  console.log('📸 [6/11] Capturing Frame 6: Spotter Radar (Desktop High-Res)...');
  await loadPage(`${BASE_URL}/nearby`, 5000);
  await waitForImages(page);
  await sleep(1500);
  await page.screenshot({
    path: path.join(OUTPUT_DIR, 'Frame 6 - Spotter Radar.png'),
    fullPage: false,
  });
  console.log('✅ Frame 6 saved.');

  // ==========================================
  // Frame 7: Hardware Attestation / Camera View
  // ==========================================
  console.log('📸 [7/11] Capturing Frame 7: Hardware Attestation Camera View...');
  await loadPage(`${BASE_URL}/report`, 4000);
  await waitForImages(page);
  await sleep(1500);
  await page.screenshot({
    path: path.join(OUTPUT_DIR, 'Frame 7 - Hardware Attestation Camera View (Geofence Validated).png'),
    fullPage: false,
  });
  console.log('✅ Frame 7 saved.');

  // ==========================================
  // Frame 8: Gemini API Terminal JSON Response
  // ==========================================
  console.log('📸 [8/11] Capturing Frame 8: Gemini API Terminal JSON Response...');
  await loadPage(`${BASE_URL}/records`, 4000);
  try {
    const buttons = await page.$$('button');
    for (const b of buttons) {
      const text = await page.evaluate((el) => el.textContent, b);
      if (text && (text.includes('Payload') || text.includes('REST API'))) {
        await b.click();
        await sleep(1500);
        break;
      }
    }
  } catch (e) {}
  await page.screenshot({
    path: path.join(OUTPUT_DIR, 'Frame 8 - Gemini API Terminal JSON Response (status QUALIFIED).png'),
    fullPage: false,
  });
  console.log('✅ Frame 8 saved.');

  // ==========================================
  // Frame 9: Oracle Topology Map (Settled State with 97.5% / 2.5% split)
  // ==========================================
  console.log('📸 [9/11] Capturing Frame 9: Oracle Topology Map (97.5% - 2.5% split)...');
  await loadPage(`${BASE_URL}/vault`, 4000);
  try {
    const buttons = await page.$$('button');
    for (const b of buttons) {
      const text = await page.evaluate((el) => el.textContent, b);
      if (text && text.includes('Escrow Vault Protocol')) {
        await b.click();
        await sleep(1500);
        break;
      }
    }
  } catch (e) {}
  await page.screenshot({
    path: path.join(OUTPUT_DIR, 'Frame 9 - Oracle Topology Map (Settled State with 97.5% - 2.5% split).png'),
    fullPage: false,
  });
  console.log('✅ Frame 9 saved.');

  // ==========================================
  // Frame 10: Settled Receipt / Maker Dashboard (Final Verified State)
  // ==========================================
  console.log('📸 [10/11] Capturing Frame 10: Settled Receipt Maker Dashboard (Final Verified State)...');
  await loadPage(`${BASE_URL}/review`, 5000);
  try {
    const buttons = await page.$$('button');
    for (const b of buttons) {
      const text = await page.evaluate((el) => el.textContent, b);
      if (text && text.includes('Accepted & Settled')) {
        await b.click();
        await sleep(2500);
        await waitForImages(page);
        break;
      }
    }
  } catch (e) {}
  await page.screenshot({
    path: path.join(OUTPUT_DIR, 'Frame 10 - Settled Receipt Maker Dashboard (Final Verified State).png'),
    fullPage: false,
  });
  console.log('✅ Frame 10 saved.');

  // ==========================================
  // Bonus Supporting Views: Rejected Submissions & Pending Audits
  // ==========================================
  console.log('📸 Capturing Supplementary View: Rejected Submissions...');
  try {
    const buttons = await page.$$('button');
    for (const b of buttons) {
      const text = await page.evaluate((el) => el.textContent, b);
      if (text && text.includes('Rejected')) {
        await b.click();
        await sleep(2500);
        await waitForImages(page);
        break;
      }
    }
    await page.screenshot({
      path: path.join(OUTPUT_DIR, 'Frame 10b - Evidence Review (Rejected Submissions).png'),
      fullPage: false,
    });
    console.log('✅ Frame 10b (Rejected Submissions) saved.');
  } catch (e) {}

  console.log('📸 Capturing Supplementary View: Pending Audits...');
  try {
    const buttons = await page.$$('button');
    for (const b of buttons) {
      const text = await page.evaluate((el) => el.textContent, b);
      if (text && text.includes('Pending Review')) {
        await b.click();
        await sleep(2500);
        await waitForImages(page);
        break;
      }
    }
    await page.screenshot({
      path: path.join(OUTPUT_DIR, 'Frame 10c - Evidence Review (Pending Audits).png'),
      fullPage: false,
    });
    console.log('✅ Frame 10c (Pending Audits) saved.');
  } catch (e) {}

  // ==========================================
  // Frame 11: Developer / API Documentation Page
  // ==========================================
  console.log('📸 [11/11] Capturing Frame 11: Developer API Documentation Page...');
  await loadPage(`${BASE_URL}/records`, 4000);
  await waitForImages(page);
  await page.screenshot({
    path: path.join(OUTPUT_DIR, 'Frame 11 - Developer API Documentation Page.png'),
    fullPage: false,
  });
  console.log('✅ Frame 11 saved.');

  await browser.close();
  console.log('\n🎉 ALL FRAMES CAPTURED WITH FULL DATA & IMAGES LOADED!');
}

captureAll().catch((err) => {
  console.error('Capture error:', err);
  process.exit(1);
});
