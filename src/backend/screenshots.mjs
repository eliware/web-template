import { capturePageScreenshot } from "./browser-capture.mjs";
import { prepareScreenshotOutput } from "./screenshot-output.mjs";

export async function captureScreenshot({
  url = process.env.WEB_URL ?? "http://127.0.0.1:3000/",
  output = process.env.SCREENSHOT_PATH ?? "artifacts/home.png",
  makeDirectory,
}) {
  return capturePageScreenshot({
    url,
    prepareTarget: () => prepareScreenshotOutput(output, makeDirectory),
  });
}
