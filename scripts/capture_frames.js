import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const OUTPUT_DIR = 'C:\\Users\\harsh\\Downloads\\TrueSpot_Frames';
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const BASE_URL = 'https://truespott.vercel.app';

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function captureAll() {
  console.log('🚀 Starting Automated Frame Capture for TrueSpot (Fast Mode)...');
  console.log(`📁 Saving frames to: ${OUTPUT_DIR}\n`);

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-web-security',
      '--allow-running-insecure-content',
    ],
  });

  const page = await browser.newPage();

  async function setDesktop() {
    await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 2 });
  }

  async function setMobile() {
    await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  }

  // ==========================================
  // Frame 1: Hero Landing Page
  // ==========================================
  console.log('📸 Capturing Frame 1: Hero Landing Page...');
  await setDesktop();
  await page.goto(`${BASE_URL}/landing`, { waitUntil: 'domcontentloaded', timeout: 15000 });
  await sleep(1500);
  await page.screenshot({
    path: path.join(OUTPUT_DIR, 'Frame 1 - Hero Landing Page.png'),
    fullPage: false,
  });
  console.log('✅ Frame 1 saved.');

  // ==========================================
  // Frame 2: Query Studio (Empty State)
  // ==========================================
  console.log('📸 Capturing Frame 2: Query Studio (Empty State)...');
  await setDesktop();
  await page.goto(`${BASE_URL}/studio`, { waitUntil: 'domcontentloaded', timeout: 15000 });
  await sleep(1500);
  await page.screenshot({
    path: path.join(OUTPUT_DIR, 'Frame 2 - Query Studio (Empty State).png'),
    fullPage: false,
  });
  console.log('✅ Frame 2 saved.');

  // ==========================================
  // Frame 3: Reality Map (Pin Dropped with 200m Radius)
  // ==========================================
  console.log('📸 Capturing Frame 3: Reality Map (Pin Dropped with 200m Radius)...');
  await setDesktop();
  await page.goto(`${BASE_URL}/map`, { waitUntil: 'domcontentloaded', timeout: 15000 });
  await sleep(2500);
  try {
    await page.mouse.click(960, 500);
    await sleep(1000);
  } catch (e) {}
  await page.screenshot({
    path: path.join(OUTPUT_DIR, 'Frame 3 - Reality Map (Pin Dropped with 200m Radius).png'),
    fullPage: false,
  });
  console.log('✅ Frame 3 saved.');

  // ==========================================
  // Frame 4: Escrow Lock Modal
  // ==========================================
  console.log('📸 Capturing Frame 4: Escrow Lock Modal...');
  await setDesktop();
  await page.goto(`${BASE_URL}/studio`, { waitUntil: 'domcontentloaded', timeout: 15000 });
  await sleep(1500);
  try {
    const walletPill = await page.$('div[title="Connected Persona & Wallet Switcher"]');
    if (walletPill) {
      await walletPill.click();
      await sleep(1000);
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
  console.log('📸 Capturing Frame 5: Maker Dashboard (Active Live Query State)...');
  await setDesktop();
  await page.goto(`${BASE_URL}/bounties`, { waitUntil: 'domcontentloaded', timeout: 15000 });
  await sleep(2000);
  await page.screenshot({
    path: path.join(OUTPUT_DIR, 'Frame 5 - Maker Dashboard (Active Live Query State).png'),
    fullPage: false,
  });
  console.log('✅ Frame 5 saved.');

  // ==========================================
  // Frame 6: Spotter Radar (Mobile Aspect Ratio)
  // ==========================================
  console.log('📸 Capturing Frame 6: Spotter Radar (Mobile Aspect Ratio)...');
  await setMobile();
  await page.goto(`${BASE_URL}/nearby`, { waitUntil: 'domcontentloaded', timeout: 15000 });
  await sleep(2500);
  await page.screenshot({
    path: path.join(OUTPUT_DIR, 'Frame 6 - Spotter Radar (Mobile Aspect Ratio).png'),
    fullPage: false,
  });
  console.log('✅ Frame 6 saved.');

  // ==========================================
  // Frame 7: Hardware Attestation / Camera View (showing "Geofence Validated")
  // ==========================================
  console.log('📸 Capturing Frame 7: Hardware Attestation / Camera View (showing Geofence Validated)...');
  await setDesktop();
  await page.goto(`${BASE_URL}/report`, { waitUntil: 'domcontentloaded', timeout: 15000 });
  await sleep(2000);
  await page.screenshot({
    path: path.join(OUTPUT_DIR, 'Frame 7 - Hardware Attestation Camera View (Geofence Validated).png'),
    fullPage: false,
  });
  console.log('✅ Frame 7 saved.');

  // ==========================================
  // Frame 8: Gemini API Terminal JSON Response (showing "status: QUALIFIED")
  // ==========================================
  console.log('📸 Capturing Frame 8: Gemini API Terminal JSON Response (showing status: QUALIFIED)...');
  await setDesktop();
  await page.goto(`${BASE_URL}/records`, { waitUntil: 'domcontentloaded', timeout: 15000 });
  await sleep(2000);
  try {
    const buttons = await page.$$('button');
    for (const b of buttons) {
      const text = await page.evaluate((el) => el.textContent, b);
      if (text && (text.includes('Payload') || text.includes('REST'))) {
        await b.click();
        await sleep(800);
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
  console.log('📸 Capturing Frame 9: Oracle Topology Map (Settled State with 97.5% - 2.5% split)...');
  await setDesktop();
  await page.goto(`${BASE_URL}/wallets`, { waitUntil: 'domcontentloaded', timeout: 15000 });
  await sleep(2000);
  try {
    const roleButtons = await page.$$('button');
    for (const b of roleButtons) {
      const text = await page.evaluate((el) => el.textContent, b);
      if (text && text.includes('Escrow Vault Protocol')) {
        await b.click();
        await sleep(800);
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
  console.log('📸 Capturing Frame 10: Settled Receipt / Maker Dashboard (Final Verified State)...');
  await setDesktop();
  await page.goto(`${BASE_URL}/review`, { waitUntil: 'domcontentloaded', timeout: 15000 });
  await sleep(2000);
  try {
    const tabs = await page.$$('button');
    for (const t of tabs) {
      const text = await page.evaluate((el) => el.textContent, t);
      if (text && text.includes('Accepted & Settled')) {
        await t.click();
        await sleep(1000);
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
  // Frame 11: Developer / API Documentation Page
  // ==========================================
  console.log('📸 Capturing Frame 11: Developer / API Documentation Page...');
  await setDesktop();
  await page.goto(`${BASE_URL}/records`, { waitUntil: 'domcontentloaded', timeout: 15000 });
  await sleep(2000);
  await page.screenshot({
    path: path.join(OUTPUT_DIR, 'Frame 11 - Developer API Documentation Page.png'),
    fullPage: false,
  });
  console.log('✅ Frame 11 saved.');

  await browser.close();
  console.log('\n🎉 ALL 11 FRAMES SUCCESSFULLY CAPTURED AND SAVED TO DOWNLOADS!');
}

captureAll().catch((err) => {
  console.error('Error during capture:', err);
  process.exit(1);
});
