import { expect, jest, test } from "@jest/globals";
import { resolve } from "node:path";

const launch = jest.fn();
jest.unstable_mockModule("puppeteer", () => ({ default: { launch } }));
const { captureScreenshot } = await import("../src/screenshots.mjs");

test("captures a full page screenshot and closes the browser", async () => {
  const page = { goto: jest.fn(), screenshot: jest.fn() };
  const browser = { newPage: jest.fn().mockResolvedValue(page), close: jest.fn() };
  launch.mockResolvedValue(browser);
  const makeDirectory = jest.fn();

  const target = await captureScreenshot({
    url: "http://localhost:3000/",
    output: "artifacts/home.png",
    makeDirectory,
  });

  expect(launch).toHaveBeenCalledWith({ headless: true });
  expect(page.goto).toHaveBeenCalledWith("http://localhost:3000/", {
    waitUntil: "networkidle0",
  });
  expect(target).toBe(resolve("artifacts/home.png"));
  expect(page.screenshot).toHaveBeenCalledWith({
    path: resolve("artifacts/home.png"),
    fullPage: true,
  });
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

  await expect(captureScreenshot({})).rejects.toThrow("offline");
  expect(browser.close).toHaveBeenCalledTimes(1);
});
