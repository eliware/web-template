import { expect, jest, test } from "@jest/globals";

const createServer = jest.fn();
jest.unstable_mockModule("fastify", () => ({ default: createServer }));
const { createWebServer } = await import("../../src/backend/server.mjs");

test("creates Fastify with the application server options", () => {
  createWebServer();

  expect(createServer).toHaveBeenCalledWith({
    logger: false,
    ajv: { customOptions: { removeAdditional: false } },
  });
});
