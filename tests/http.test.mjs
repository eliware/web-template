import { expect, jest, test } from "@jest/globals";
import { createRequestHandler } from "../src/http.mjs";

function response() {
  return { writeHead: jest.fn(), end: jest.fn() };
}

test("serves the public page and built client asset", async () => {
  const read = jest.fn().mockResolvedValue("asset");
  const handle = createRequestHandler({ publicRoot: "public", buildRoot: "dist", read });
  const page = response();
  await handle({ method: "GET", url: "/?source=test" }, page);
  expect(read).toHaveBeenCalledWith("public/index.html");
  expect(page.writeHead).toHaveBeenCalledWith(200, { "content-type": "text/html" });
  expect(page.end).toHaveBeenCalledWith("asset");

  const client = response();
  await handle({ method: "GET", url: "/client.js" }, client);
  expect(read).toHaveBeenLastCalledWith("dist/client.js");
  expect(client.writeHead).toHaveBeenCalledWith(200, {
    "content-type": "text/javascript",
  });
});

test("rejects unsupported methods", async () => {
  const handle = createRequestHandler({ publicRoot: "public", buildRoot: "dist" });
  const result = response();
  await handle({ method: "POST", url: "/" }, result);
  expect(result.writeHead).toHaveBeenCalledWith(405, {
    "content-type": "text/plain",
  });
  expect(result.end).toHaveBeenCalledWith("Method not allowed");
});

test.each([
  ["unknown route", "/private"],
  ["unavailable asset", "/"],
])("returns not found for an %s", async (_case, url) => {
  const handle = createRequestHandler({
    publicRoot: "public",
    buildRoot: "dist",
    read: () => Promise.reject(new Error("missing")),
  });
  const result = response();
  await handle({ method: "GET", url }, result);
  expect(result.writeHead).toHaveBeenCalledWith(404, {
    "content-type": "text/plain",
  });
  expect(result.end).toHaveBeenCalledWith("Not found");
});
