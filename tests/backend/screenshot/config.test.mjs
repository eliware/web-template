import { expect, test } from "@jest/globals";
import { resolveScreenshotConfig } from "../../../src/backend/screenshot/config.mjs";

test("resolves environment values and built-in defaults", () => {
  expect(
    resolveScreenshotConfig({
      environment: { WEB_URL: "http://localhost:4000/", SCREENSHOT_PATH: "output/page.png" },
    }),
  ).toEqual({ url: "http://localhost:4000/", output: "output/page.png" });
  expect(resolveScreenshotConfig({ environment: {} })).toEqual({
    url: "http://127.0.0.1:3000/",
    output: "artifacts/home.png",
  });
});

test("uses explicit values before environment defaults", () => {
  expect(
    resolveScreenshotConfig({
      url: "http://localhost:5000/",
      output: "custom/page.png",
      environment: { WEB_URL: "http://localhost:4000/", SCREENSHOT_PATH: "output/page.png" },
    }),
  ).toEqual({ url: "http://localhost:5000/", output: "custom/page.png" });
});

test("uses process environment values by default", () => {
  const originalUrl = process.env.WEB_URL;
  const originalOutput = process.env.SCREENSHOT_PATH;
  process.env.WEB_URL = "http://localhost:6000/";
  process.env.SCREENSHOT_PATH = "runtime/page.png";

  try {
    expect(resolveScreenshotConfig({})).toEqual({
      url: "http://localhost:6000/",
      output: "runtime/page.png",
    });
  } finally {
    if (originalUrl === undefined) delete process.env.WEB_URL;
    else process.env.WEB_URL = originalUrl;
    if (originalOutput === undefined) delete process.env.SCREENSHOT_PATH;
    else process.env.SCREENSHOT_PATH = originalOutput;
  }
});
