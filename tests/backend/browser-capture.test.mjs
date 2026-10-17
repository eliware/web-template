import { beforeEach, expect, jest, test } from "@jest/globals";

const launch = jest.fn();
jest.unstable_mockModule("puppeteer", () => ({ default: { launch } }));
const { capturePageScreenshot } = await import("../../src/backend/browser-capture.mjs");

beforeEach(() => launch.mockReset());

test("captures a full page screenshot and closes the browser", async () => {
  const page = { goto: jest.fn(), screenshot: jest.fn() };
  const browser = { newPage: jest.fn().mockResolvedValue(page), close: jest.fn() };
  const prepareTarget = jest.fn().mockResolvedValue("artifacts/home.png");
  launch.mockResolvedValue(browser);

  await expect(
    capturePageScreenshot({ url: "http://localhost:3000/", prepareTarget }),
  ).resolves.toBe("artifacts/home.png");

  expect(launch).toHaveBeenCalledWith({ headless: true });
  expect(page.goto).toHaveBeenCalledWith("http://localhost:3000/", {
    waitUntil: "networkidle0",
  });
  expect(prepareTarget).toHaveBeenCalledTimes(1);
  expect(page.screenshot).toHaveBeenCalledWith({ path: "artifacts/home.png", fullPage: true });
  expect(browser.close).toHaveBeenCalledTimes(1);
});

test("closes the browser when page navigation fails", async () => {
  const browser = {
    newPage: jest
      .fn()
      .mockResolvedValue({ goto: jest.fn().mockRejectedValue(new Error("offline")) }),
    close: jest.fn(),
  };
  launch.mockResolvedValue(browser);
  const prepareTarget = jest.fn();

  await expect(
    capturePageScreenshot({ url: "http://localhost:3000/", prepareTarget }),
  ).rejects.toThrow("offline");
  expect(prepareTarget).not.toHaveBeenCalled();
  expect(browser.close).toHaveBeenCalledTimes(1);
});
