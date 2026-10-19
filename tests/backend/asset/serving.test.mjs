import { expect, jest, test } from "@jest/globals";
import { resolve } from "node:path";
import { readRouteAsset } from "../../../src/backend/asset/serving.mjs";

test.each([
  ["public", { root: "public", file: "index.html" }, "public", "index.html"],
  ["build", { root: "build", file: "client.js" }, "dist", "client.js"],
])("reads a route asset from the %s root", async (_name, route, rootName, file) => {
  const read = jest.fn().mockResolvedValue("asset");

  await expect(
    readRouteAsset(route, { publicRoot: "public", buildRoot: "dist", read }),
  ).resolves.toBe("asset");
  expect(read).toHaveBeenCalledWith(resolve(rootName, file));
});

test("uses the file system reader by default", async () => {
  await expect(
    readRouteAsset(
      { root: "public", file: "missing-file.html" },
      { publicRoot: "missing-root", buildRoot: "dist" },
    ),
  ).resolves.toBeNull();
});

test("rejects route files outside their configured asset root", async () => {
  const read = jest.fn();

  expect(() =>
    readRouteAsset(
      { root: "public", file: "../../private/secret.txt" },
      { publicRoot: "public", buildRoot: "dist", read },
    ),
  ).toThrow("asset path must stay within its configured root");
  expect(read).not.toHaveBeenCalled();
});

test.each([[{ root: "unknown", file: "asset.txt" }], [{ root: "public" }]])(
  "rejects incomplete asset route metadata: %p",
  (route) => {
    expect(() =>
      readRouteAsset(route, { publicRoot: "public", buildRoot: "dist", read: jest.fn() }),
    ).toThrow("asset route must include a configured root and file");
  },
);
