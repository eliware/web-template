import { expect, test } from "@jest/globals";
import { resolveRoute } from "../src/route-resolver.mjs";

const roots = { publicRoot: "public", buildRoot: "dist" };

test.each([
  ["/", { file: "public/index.html", contentType: "text/html" }],
  ["/client.js", { file: "dist/client.js", contentType: "text/javascript" }],
])("resolves the %s route", (path, expected) => {
  expect(resolveRoute(path, roots)).toEqual(expected);
});

test("returns no route for an unknown path", () => {
  expect(resolveRoute("/private", roots)).toBeNull();
});
