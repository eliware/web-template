import { readFile } from "node:fs/promises";
import { readAsset } from "./asset-reader.mjs";
import { writeAssetResponse, writeTextResponse } from "./response-writers.mjs";
import { resolveRoute } from "./route-resolver.mjs";

export function createRequestHandler({ publicRoot, buildRoot, read = readFile }) {
  return async function handleRequest(request, response) {
    if (request.method !== "GET") {
      writeTextResponse(response, 405, "Method not allowed");
      return;
    }

    const path = new URL(request.url, "http://localhost").pathname;
    const route = resolveRoute(path, { publicRoot, buildRoot });
    if (!route) {
      writeTextResponse(response, 404, "Not found");
      return;
    }

    const content = await readAsset(route.file, read);
    if (content === null) {
      writeTextResponse(response, 404, "Not found");
      return;
    }

    writeAssetResponse(response, content, route.contentType);
  };
}
