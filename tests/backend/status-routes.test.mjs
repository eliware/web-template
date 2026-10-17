import Fastify from "fastify";
import { afterEach, expect, test } from "@jest/globals";
import { registerStatusRoutes } from "../../src/backend/status-routes.mjs";

let server;

afterEach(async () => {
  if (server) await server.close();
  server = undefined;
});

test.each([
  ["/health", { status: "ok" }],
  ["/ready", { status: "ready" }],
])("returns a successful status from %s", async (url, expected) => {
  server = Fastify({ logger: false });
  registerStatusRoutes(server);

  const result = await server.inject({ method: "GET", url });
  expect(result.statusCode).toBe(200);
  expect(result.json()).toEqual(expected);
});
