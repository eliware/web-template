import Fastify from "fastify";
import { resolve } from "node:path";
import { afterEach, expect, jest, test } from "@jest/globals";
import { registerWebRoutes } from "../../src/backend/http.mjs";

let server;

afterEach(async () => {
  if (server) await server.close();
  server = undefined;
});

function createServer(options = {}) {
  server = Fastify({
    logger: false,
    ajv: { customOptions: { removeAdditional: false } },
  });
  registerWebRoutes(server, {
    publicRoot: "public",
    buildRoot: "dist",
    ...options,
  });
  return server;
}

test("serves the public page and built client asset", async () => {
  const read = jest.fn().mockResolvedValue("asset");
  const app = createServer({ read });

  const page = await app.inject({ method: "GET", url: "/?source=test" });
  expect(read).toHaveBeenCalledWith(resolve("public", "index.html"));
  expect(page.statusCode).toBe(200);
  expect(page.headers["content-type"]).toContain("text/html");
  expect(page.body).toBe("asset");

  const client = await app.inject({ method: "GET", url: "/client.js" });
  expect(read).toHaveBeenLastCalledWith(resolve("dist", "client.js"));
  expect(client.statusCode).toBe(200);
  expect(client.headers["content-type"]).toContain("text/javascript");
  expect(client.body).toBe("asset");
});

test("rejects unsupported methods", async () => {
  const app = createServer();
  const result = await app.inject({ method: "POST", url: "/" });
  expect(result.statusCode).toBe(405);
  expect(result.headers["content-type"]).toContain("text/plain");
  expect(result.body).toBe("Method not allowed");
});

test.each([
  ["/health", { status: "ok" }],
  ["/ready", { status: "ready" }],
])("returns a successful status from %s", async (url, expected) => {
  const app = createServer();
  const result = await app.inject({ method: "GET", url });
  expect(result.statusCode).toBe(200);
  expect(result.json()).toEqual(expected);
});

test.each([
  ["unknown route", "/private"],
  ["unavailable asset", "/"],
])("returns not found for an %s", async (_case, url) => {
  const app = createServer({
    read: () => Promise.reject(new Error("missing")),
  });
  const result = await app.inject({ method: "GET", url });
  expect(result.statusCode).toBe(404);
  expect(result.headers["content-type"]).toContain("text/plain");
  expect(result.body).toBe("Not found");
});
