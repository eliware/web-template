import puppeteer from "puppeteer";
import { prepareScreenshotOutput } from "./screenshot-output.mjs";

export async function captureScreenshot({
  url = process.env.WEB_URL ?? "http://127.0.0.1:3000/",
  output = process.env.SCREENSHOT_PATH ?? "artifacts/home.png",
  makeDirectory,
}) {
  const browser = await puppeteer.launch({ headless: true });

  try {
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle0" });
    const target = await prepareScreenshotOutput(output, makeDirectory);
    await page.screenshot({ path: target, fullPage: true });
    return target;
  } finally {
    await browser.close();
  }
}
