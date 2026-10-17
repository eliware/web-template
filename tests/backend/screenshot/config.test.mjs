import { expect, test } from "@jest/globals";
import { resolveScreenshotConfig } from "../../../src/backend/screenshot/config.mjs";

test.each([
  [
    "environment values",
    { WEB_URL: "http://localhost:4000/", SCREENSHOT_PATH: "output/page.png" },
    "http://localhost:4000/",
    "output/page.png",
  ],
  ["built-in values", {}, "http://127.0.0.1:3000/", "artifacts/home.png"],
])("resolves %s for screenshot options", (_name, environment, url, output) => {
  expect(resolveScreenshotConfig({ environment })).toEqual({ url, output });
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
