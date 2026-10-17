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

test("returns no asset when the routed file cannot be read", async () => {
  const read = jest.fn().mockRejectedValue(new Error("missing"));

  await expect(
    readRouteAsset(
      { root: "public", file: "index.html" },
      { publicRoot: "public", buildRoot: "dist", read },
    ),
  ).resolves.toBeNull();
});

test("uses the file system reader by default", async () => {
  await expect(
    readRouteAsset(
      { root: "public", file: "missing-file.html" },
      { publicRoot: "missing-root", buildRoot: "dist" },
    ),
  ).resolves.toBeNull();
});
