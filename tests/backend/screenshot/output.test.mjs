import { expect, jest, test } from "@jest/globals";
import { dirname, resolve } from "node:path";

const makeDirectory = jest.fn();
jest.unstable_mockModule("node:fs/promises", () => ({ mkdir: makeDirectory }));
const { prepareScreenshotOutput } = await import("../../../src/backend/screenshot/output.mjs");

test("resolves screenshot output and creates its parent directory", async () => {
  const makeDirectory = jest.fn();
  const output = await prepareScreenshotOutput("artifacts/home.png", makeDirectory);

  expect(output).toBe(resolve("artifacts/home.png"));
  expect(makeDirectory).toHaveBeenCalledWith(dirname(output), { recursive: true });
});

test("uses the file system directory creator by default", async () => {
  const output = "artifacts/home.png";

  await expect(prepareScreenshotOutput(output)).resolves.toBe(resolve(output));
  expect(makeDirectory).toHaveBeenCalledWith(dirname(resolve(output)), { recursive: true });
});
