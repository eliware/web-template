import { expect, test } from "@jest/globals";
import { resolveRoute } from "../../src/backend/route-resolver.mjs";

test.each([
  ["/", { root: "public", file: "index.html", contentType: "text/html" }],
  ["/client.js", { root: "build", file: "client.js", contentType: "text/javascript" }],
])("resolves the %s route to relative asset metadata", (path, expected) => {
  expect(resolveRoute(path)).toEqual(expected);
});

test("returns no route for an unknown path", () => {
  expect(resolveRoute("/private")).toBeNull();
});
