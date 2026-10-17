import { expect, test } from "@jest/globals";
import { resolveScreenshotConfig } from "../../../src/backend/screenshot/config.mjs";

test("uses configured environment defaults for screenshot options", () => {
  expect(
    resolveScreenshotConfig({
      environment: { WEB_URL: "http://localhost:4000/", SCREENSHOT_PATH: "output/page.png" },
    }),
  ).toEqual({ url: "http://localhost:4000/", output: "output/page.png" });
});

test("uses built-in defaults when no values are configured", () => {
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
