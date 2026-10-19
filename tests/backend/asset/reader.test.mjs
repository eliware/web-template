import { expect, jest, test } from "@jest/globals";
import { readAsset } from "../../../src/backend/asset/reader.mjs";

test("returns asset content after a successful read", async () => {
  const read = jest.fn().mockResolvedValue("asset");

  await expect(readAsset("/public/index.html", read)).resolves.toBe("asset");
  expect(read).toHaveBeenCalledWith("/public/index.html");
});

test("returns a missing result when the file does not exist", async () => {
  const error = Object.assign(new Error("missing"), { code: "ENOENT" });
  const read = jest.fn().mockRejectedValue(error);

  await expect(readAsset("/public/index.html", read)).resolves.toBeNull();
});

test("propagates filesystem errors other than missing files", async () => {
  const error = Object.assign(new Error("permission denied"), { code: "EACCES" });
  const read = jest.fn().mockRejectedValue(error);

  await expect(readAsset("/public/index.html", read)).rejects.toBe(error);
});
