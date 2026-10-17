import { readFile } from "node:fs/promises";
import { sendAssetResponse } from "./response.mjs";
import { readRouteAsset } from "./serving.mjs";
import { resolveRoute } from "../route-resolver.mjs";

export function createAssetRequestHandler({ publicRoot, buildRoot, read = readFile }) {
  return async function handleAssetRequest(request, reply) {
    const path = new URL(request.url, "http://localhost").pathname;
    const route = resolveRoute(path);
    const content = await readRouteAsset(route, { publicRoot, buildRoot, read });
    return sendAssetResponse(reply, route, content);
  };
}
