import { expect, test } from "@jest/globals";
import { resolveRoute } from "../../src/backend/route-resolver.mjs";

test.each([
  ["/", { root: "public", file: "index.html", contentType: "text/html" }],
  ["/client.js", { root: "build", file: "client.js", contentType: "text/javascript" }],
  ["/styles.css", { root: "public", file: "styles.css", contentType: "text/css" }],
  [
    "/manifest.webmanifest",
    { root: "public", file: "manifest.webmanifest", contentType: "application/manifest+json" },
  ],
  [
    "/service-worker.js",
    { root: "build", file: "service-worker.js", contentType: "text/javascript" },
  ],
  [
    "/icons/template.svg",
    { root: "public", file: "icons/template.svg", contentType: "image/svg+xml" },
  ],
  [
    "/icons/template-maskable.svg",
    { root: "public", file: "icons/template-maskable.svg", contentType: "image/svg+xml" },
  ],
  [
    "/icons/template-192.png",
    { root: "public", file: "icons/template-192.png", contentType: "image/png" },
  ],
  [
    "/icons/template-512.png",
    { root: "public", file: "icons/template-512.png", contentType: "image/png" },
  ],
  [
    "/icons/template-maskable-512.png",
    { root: "public", file: "icons/template-maskable-512.png", contentType: "image/png" },
  ],
  [
    "/screenshots/web-template-desktop.png",
    { root: "public", file: "screenshots/web-template-desktop.png", contentType: "image/png" },
  ],
  [
    "/screenshots/web-template-mobile.png",
    { root: "public", file: "screenshots/web-template-mobile.png", contentType: "image/png" },
  ],
])("resolves the %s route to relative asset metadata", (path, expected) => {
  expect(resolveRoute(path)).toEqual(expected);
});

test("returns no route for an unknown path", () => {
  expect(resolveRoute("/private")).toBeNull();
});
