import { expect, jest, test } from "@jest/globals";
import { createAssetHandler } from "../../src/backend/asset-handler.mjs";

function reply() {
  return {
    code: jest.fn().mockReturnThis(),
    type: jest.fn().mockReturnThis(),
    send: jest.fn(),
  };
}

test("serves a resolved asset with its content type", async () => {
  const read = jest.fn().mockResolvedValue("asset");
  const handle = createAssetHandler({ publicRoot: "public", buildRoot: "dist", read });
  const response = reply();

  await handle({ method: "GET", url: "/?source=test" }, response);

  expect(response.type).toHaveBeenCalledWith("text/html");
  expect(response.send).toHaveBeenCalledWith("asset");
});

test("returns method not allowed for unsupported methods", async () => {
  const handle = createAssetHandler({ publicRoot: "public", buildRoot: "dist" });
  const response = reply();

  await handle({ method: "POST", url: "/" }, response);

  expect(response.code).toHaveBeenCalledWith(405);
  expect(response.type).toHaveBeenCalledWith("text/plain");
  expect(response.send).toHaveBeenCalledWith("Method not allowed");
});

test("returns not found when the asset read fails", async () => {
  const read = jest.fn().mockRejectedValue(new Error("missing"));
  const handle = createAssetHandler({ publicRoot: "public", buildRoot: "dist", read });
  const response = reply();

  await handle({ method: "GET", url: "/" }, response);

  expect(response.code).toHaveBeenCalledWith(404);
  expect(response.type).toHaveBeenCalledWith("text/plain");
  expect(response.send).toHaveBeenCalledWith("Not found");
});
