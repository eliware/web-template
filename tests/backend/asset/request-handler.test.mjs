import { expect, jest, test } from "@jest/globals";
import { resolve } from "node:path";
import { createAssetRequestHandler } from "../../../src/backend/asset/request-handler.mjs";

function createReply() {
  return {
    code: jest.fn().mockReturnThis(),
    type: jest.fn().mockReturnThis(),
    send: jest.fn().mockReturnThis(),
  };
}

test("resolves an asset request path without its query string", async () => {
  const read = jest.fn().mockResolvedValue("client asset");
  const handle = createAssetRequestHandler({
    publicRoot: "public",
    buildRoot: "dist",
    read,
  });
  const reply = createReply();

  await handle({ method: "GET", url: "/client.js?cache=1" }, reply);

  expect(read).toHaveBeenCalledWith(resolve("dist", "client.js"));
  expect(reply.type).toHaveBeenCalledWith("text/javascript");
  expect(reply.send).toHaveBeenCalledWith("client asset");
});
