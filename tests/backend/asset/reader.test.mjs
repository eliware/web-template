import { expect, jest, test } from "@jest/globals";
import { readAsset } from "../../../src/backend/asset/reader.mjs";

test("returns asset content after a successful read", async () => {
  const read = jest.fn().mockResolvedValue("asset");

  await expect(readAsset("/public/index.html", read)).resolves.toBe("asset");
  expect(read).toHaveBeenCalledWith("/public/index.html");
});

test("returns a missing result when the read fails", async () => {
  const read = jest.fn().mockRejectedValue(new Error("missing"));

  await expect(readAsset("/public/index.html", read)).resolves.toBeNull();
});
