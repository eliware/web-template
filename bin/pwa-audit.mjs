#!/usr/bin/env node
import puppeteer from "puppeteer";

const baseUrl = new URL("/", process.env.WEB_URL ?? "http://127.0.0.1:1020/");
const checks = [];
const browser = await puppeteer.launch({ headless: true });

function record(name, passed, detail = "") {
  checks.push({ name, passed, detail });
}

try {
  const page = await browser.newPage();
  const response = await page.goto(baseUrl.href, { waitUntil: "networkidle0" });
  record("App page loads", response?.ok() === true);

  const manifest = await page.evaluate(async () => {
    const link = document.querySelector('link[rel="manifest"]');
    if (!link) return null;
    const response = await fetch(link.href);
    return response.ok ? response.json() : null;
  });
  record("Manifest loads", Boolean(manifest));
  record(
    "Manifest has an install layout",
    manifest?.display === "standalone" && Boolean(manifest.name) && Boolean(manifest.start_url),
  );

  const manifestAssets = await page.evaluate(async (appManifest) => {
    if (!appManifest) return [];
    const assets = [...appManifest.icons, ...appManifest.screenshots];
    return Promise.all(
      assets.map(async (asset) => {
        const response = await fetch(asset.src);
        if (!response.ok) return { ...asset, loads: false };
        if (!asset.sizes || asset.sizes === "any") return { ...asset, loads: true };
        const image = await createImageBitmap(await response.blob());
        return { ...asset, loads: true, width: image.width, height: image.height };
      }),
    );
  }, manifest);
  record(
    "Manifest images load",
    manifestAssets.length > 0 && manifestAssets.every((asset) => asset.loads),
  );
  record(
    "Manifest has install icons",
    manifestAssets.some(
      (asset) => asset.sizes === "192x192" && asset.width === 192 && asset.height === 192,
    ) &&
      manifestAssets.some(
        (asset) => asset.sizes === "512x512" && asset.width === 512 && asset.height === 512,
      ),
  );
  record(
    "Manifest has a maskable icon",
    manifestAssets.some((asset) => asset.purpose?.includes("maskable") && asset.width === 512),
  );
  record(
    "Manifest has desktop and mobile previews",
    manifestAssets.some((asset) => asset.form_factor === "wide") &&
      manifestAssets.some((asset) => asset.form_factor === "narrow"),
  );

  await page.evaluate(() => navigator.serviceWorker.ready);
  await page.reload({ waitUntil: "networkidle0" });
  const controlled = await page.evaluate(() => Boolean(navigator.serviceWorker.controller));
  record("Offline worker controls the app", controlled);
  await page.setOfflineMode(true);
  const offlineResponse = await page.reload({ waitUntil: "domcontentloaded" });
  record(
    "App shell loads offline",
    offlineResponse?.ok() === true && (await page.title()).length > 0,
  );
} catch (error) {
  record("PWA audit run", false, error.message);
} finally {
  await browser.close();
}

for (const check of checks) {
  process.stdout.write(
    `${check.passed ? "PASS" : "FAIL"} ${check.name}${check.detail ? `: ${check.detail}` : ""}\n`,
  );
}
if (checks.some((check) => !check.passed)) process.exitCode = 1;
