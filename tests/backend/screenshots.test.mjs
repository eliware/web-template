import { beforeEach, expect, jest, test } from "@jest/globals";
import { resolve } from "node:path";

const prepareScreenshotOutput = jest.fn();
const capturePageScreenshot = jest.fn();
const resolveScreenshotConfig = jest.fn();
jest.unstable_mockModule("../../src/backend/screenshot/output.mjs", () => ({
  prepareScreenshotOutput,
}));
jest.unstable_mockModule("../../src/backend/browser-capture.mjs", () => ({
  capturePageScreenshot,
}));
jest.unstable_mockModule("../../src/backend/screenshot/config.mjs", () => ({
  resolveScreenshotConfig,
}));
const { captureScreenshot } = await import("../../src/backend/screenshots.mjs");

beforeEach(() => {
  prepareScreenshotOutput.mockReset();
  resolveScreenshotConfig.mockReset();
  capturePageScreenshot
    .mockReset()
    .mockImplementation(async ({ prepareTarget }) => prepareTarget());
});

test.each([
  [
    "explicit options",
    {
      url: "http://localhost:3000/",
      output: "artifacts/home.png",
      makeDirectory: jest.fn(),
    },
    { url: "http://localhost:3000/", output: "artifacts/home.png" },
  ],
  ["default options", {}, { url: "http://127.0.0.1:3000/", output: "artifacts/home.png" }],
])("coordinates capture with %s", async (_name, input, options) => {
  resolveScreenshotConfig.mockReturnValue(options);
  prepareScreenshotOutput.mockResolvedValue(resolve(options.output));

  await expect(captureScreenshot(input)).resolves.toBe(resolve(options.output));

  expect(resolveScreenshotConfig).toHaveBeenCalledWith({
    url: input.url,
    output: input.output,
    environment: process.env,
  });
  expect(capturePageScreenshot).toHaveBeenCalledWith({
    url: options.url,
    prepareTarget: expect.any(Function),
  });
  await expect(capturePageScreenshot.mock.calls[0][0].prepareTarget()).resolves.toBe(
    resolve(options.output),
  );
  expect(prepareScreenshotOutput).toHaveBeenCalledWith(options.output, input.makeDirectory);
});
