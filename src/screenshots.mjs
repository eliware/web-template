import { mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import puppeteer from "puppeteer";

export async function captureScreenshot({
  url = process.env.WEB_URL ?? "http://127.0.0.1:3000/",
  output = process.env.SCREENSHOT_PATH ?? "artifacts/home.png",
  makeDirectory = mkdir,
}) {
  const target = resolve(output);
  const browser = await puppeteer.launch({ headless: true });

  try {
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle0" });
    await makeDirectory(dirname(target), { recursive: true });
    await page.screenshot({ path: target, fullPage: true });
    return target;
  } finally {
    await browser.close();
  }
}
