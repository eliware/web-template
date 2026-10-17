import { readFile } from "node:fs/promises";
import { readAsset } from "./asset-reader.mjs";
import { writeAssetResponse, writeTextResponse } from "./response-writers.mjs";

export function createRequestHandler({ publicRoot, buildRoot, read = readFile }) {
  return async function handleRequest(request, response) {
    if (request.method !== "GET") {
      writeTextResponse(response, 405, "Method not allowed");
      return;
    }

    const path = new URL(request.url, "http://localhost").pathname;
    const file =
      path === "/"
        ? `${publicRoot}/index.html`
        : path === "/client.js"
          ? `${buildRoot}/client.js`
          : null;
    if (!file) {
      writeTextResponse(response, 404, "Not found");
      return;
    }

    const content = await readAsset(file, read);
    if (content === null) {
      writeTextResponse(response, 404, "Not found");
      return;
    }

    const type = path === "/" ? "text/html" : "text/javascript";
    writeAssetResponse(response, content, type);
  };
}
