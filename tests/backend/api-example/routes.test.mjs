import Fastify from "fastify";
import { afterEach, expect, test } from "@jest/globals";
import { registerApiExampleRoutes } from "../../../src/backend/api-example/routes.mjs";

let server;

afterEach(async () => {
  if (server) await server.close();
  server = undefined;
});

function createServer() {
  server = Fastify({
    logger: false,
    ajv: { customOptions: { removeAdditional: false } },
  });
  registerApiExampleRoutes(server);
  return server;
}

test("validates the request and returns the declared response shape", async () => {
  const app = createServer();
  const result = await app.inject({
    method: "POST",
    url: "/api/examples/example-123?source=template",
    payload: { name: "Example item", description: "A sample API contract." },
  });

  expect(result.statusCode).toBe(200);
  expect(result.json()).toEqual({
    id: "example-123",
    name: "Example item",
    description: "A sample API contract.",
    source: "template",
  });
});

test("omits optional response fields when the request omits them", async () => {
  const app = createServer();
  const result = await app.inject({
    method: "POST",
    url: "/api/examples/example-123",
    payload: { name: "Example item" },
  });

  expect(result.statusCode).toBe(200);
  expect(result.json()).toEqual({ id: "example-123", name: "Example item" });
});

test("rejects invalid body, path, and query fields", async () => {
  const app = createServer();
  const invalidRequests = [
    ["missing body field", "/api/examples/example-123", {}],
    ["invalid path parameter", "/api/examples/Example_123", { name: "Example" }],
    ["unknown query field", "/api/examples/example-123?unexpected=value", { name: "Example" }],
    ["unknown body field", "/api/examples/example-123", { name: "Example", extra: true }],
  ];

  for (const [label, url, payload] of invalidRequests) {
    const result = await app.inject({ method: "POST", url, payload });
    if (result.statusCode !== 400) {
      throw new Error(`${label} returned HTTP ${result.statusCode} instead of HTTP 400`);
    }
  }
});
