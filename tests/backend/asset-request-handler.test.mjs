import { expect, jest, test } from "@jest/globals";
import { createAssetRequestHandler } from "../../src/backend/asset-request-handler.mjs";

function createReply() {
  return {
    code: jest.fn().mockReturnThis(),
    type: jest.fn().mockReturnThis(),
    send: jest.fn().mockReturnThis(),
  };
}

test("rejects unsupported request methods", async () => {
  const handle = createAssetRequestHandler({ publicRoot: "public", buildRoot: "dist" });
  const reply = createReply();

  await handle({ method: "POST", url: "/" }, reply);

  expect(reply.code).toHaveBeenCalledWith(405);
  expect(reply.type).toHaveBeenCalledWith("text/plain");
  expect(reply.send).toHaveBeenCalledWith("Method not allowed");
});

test("uses the default reader when a routed asset is unavailable", async () => {
  const handle = createAssetRequestHandler({
    publicRoot: "missing-handler-root",
    buildRoot: "missing-handler-build",
  });
  const reply = createReply();

  await handle({ method: "GET", url: "/" }, reply);

  expect(reply.code).toHaveBeenCalledWith(404);
  expect(reply.type).toHaveBeenCalledWith("text/plain");
  expect(reply.send).toHaveBeenCalledWith("Not found");
});
