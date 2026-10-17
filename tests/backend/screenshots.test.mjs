import { beforeEach, expect, jest, test } from "@jest/globals";
import { resolve } from "node:path";

const prepareScreenshotOutput = jest.fn();
const capturePageScreenshot = jest.fn();
jest.unstable_mockModule("../../src/backend/screenshot-output.mjs", () => ({
  prepareScreenshotOutput,
}));
jest.unstable_mockModule("../../src/backend/browser-capture.mjs", () => ({
  capturePageScreenshot,
}));
const { captureScreenshot } = await import("../../src/backend/screenshots.mjs");

beforeEach(() => {
  prepareScreenshotOutput.mockReset();
  capturePageScreenshot
    .mockReset()
    .mockImplementation(async ({ prepareTarget }) => prepareTarget());
});

test("prepares output and coordinates screenshot capture", async () => {
  prepareScreenshotOutput.mockResolvedValue(resolve("artifacts/home.png"));
  const makeDirectory = jest.fn();

  await expect(
    captureScreenshot({
      url: "http://localhost:3000/",
      output: "artifacts/home.png",
      makeDirectory,
    }),
  ).resolves.toBe(resolve("artifacts/home.png"));

  expect(capturePageScreenshot).toHaveBeenCalledWith({
    url: "http://localhost:3000/",
    prepareTarget: expect.any(Function),
  });
  await expect(capturePageScreenshot.mock.calls[0][0].prepareTarget()).resolves.toBe(
    resolve("artifacts/home.png"),
  );
  expect(prepareScreenshotOutput).toHaveBeenCalledWith("artifacts/home.png", makeDirectory);
});

test("uses the default screenshot URL and output path", async () => {
  prepareScreenshotOutput.mockResolvedValue(resolve("artifacts/home.png"));

  await captureScreenshot({});

  expect(prepareScreenshotOutput).toHaveBeenCalledWith("artifacts/home.png", undefined);
  expect(capturePageScreenshot).toHaveBeenCalledWith({
    url: "http://127.0.0.1:3000/",
    prepareTarget: expect.any(Function),
  });
});
