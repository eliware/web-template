import { expect, jest, test } from "@jest/globals";
import { writeAssetResponse, writeTextResponse } from "../src/response-writers.mjs";

function response() {
  return { writeHead: jest.fn(), end: jest.fn() };
}

test("writes a text response", () => {
  const result = response();

  writeTextResponse(result, 404, "Not found");

  expect(result.writeHead).toHaveBeenCalledWith(404, { "content-type": "text/plain" });
  expect(result.end).toHaveBeenCalledWith("Not found");
});

test("writes an asset response with its content type", () => {
  const result = response();

  writeAssetResponse(result, "asset", "text/javascript");

  expect(result.writeHead).toHaveBeenCalledWith(200, { "content-type": "text/javascript" });
  expect(result.end).toHaveBeenCalledWith("asset");
});
