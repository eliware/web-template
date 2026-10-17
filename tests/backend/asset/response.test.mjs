import { expect, jest, test } from "@jest/globals";
import { sendAssetResponse } from "../../../src/backend/asset/response.mjs";

function createReply() {
  return {
    code: jest.fn().mockReturnThis(),
    type: jest.fn().mockReturnThis(),
    send: jest.fn().mockReturnThis(),
  };
}

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
