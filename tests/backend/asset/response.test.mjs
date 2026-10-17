import { expect, jest, test } from "@jest/globals";
import {
  createAssetMethodHandler,
  sendAssetResponse,
} from "../../../src/backend/asset/response.mjs";

function createReply() {
  return {
    code: jest.fn().mockReturnThis(),
    type: jest.fn().mockReturnThis(),
    send: jest.fn().mockReturnThis(),
  };
}

test.each([
  ["GET", true],
  ["POST", false],
])("handles %s requests according to the asset method policy", (method, allowed) => {
  const handler = jest.fn().mockReturnValue("asset response");
  const handle = createAssetMethodHandler(handler);
  const reply = createReply();

  expect(handle({ method, url: "/" }, reply)).toBe(allowed ? "asset response" : reply);
  expect(handler).toHaveBeenCalledTimes(allowed ? 1 : 0);
  if (!allowed) {
    expect(reply.code).toHaveBeenCalledWith(405);
    expect(reply.type).toHaveBeenCalledWith("text/plain");
    expect(reply.send).toHaveBeenCalledWith("Method not allowed");
  }
});

test("sends a not found response when an asset is unavailable", () => {
  const reply = createReply();

  sendAssetResponse(reply, { contentType: "text/html" }, null);

  expect(reply.code).toHaveBeenCalledWith(404);
  expect(reply.type).toHaveBeenCalledWith("text/plain");
  expect(reply.send).toHaveBeenCalledWith("Not found");
});

test("sends asset content with its route content type", () => {
  const reply = createReply();

  sendAssetResponse(reply, { contentType: "text/html" }, "page");

  expect(reply.type).toHaveBeenCalledWith("text/html");
  expect(reply.send).toHaveBeenCalledWith("page");
});
