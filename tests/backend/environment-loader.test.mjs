import { expect, jest, test } from "@jest/globals";

const config = jest.fn();
jest.unstable_mockModule("dotenv", () => ({ config }));
const { loadEnvironment } = await import("../../src/backend/environment-loader.mjs");

test("loads environment values without dotenv output", () => {
  loadEnvironment();

  expect(config).toHaveBeenCalledWith({ quiet: true });
});
