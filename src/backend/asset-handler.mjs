import { readFile } from "node:fs/promises";
import { readRouteAsset } from "./asset/serving.mjs";
import { resolveRoute } from "./route-resolver.mjs";

export function createAssetHandler({ publicRoot, buildRoot, read = readFile }) {
  return async function handleAssetRequest(request, reply) {
    if (request.method !== "GET") {
      return reply.code(405).type("text/plain").send("Method not allowed");
    }

    const path = new URL(request.url, "http://localhost").pathname;
    const route = resolveRoute(path);
    const content = await readRouteAsset(route, { publicRoot, buildRoot, read });
    if (content === null) return reply.code(404).type("text/plain").send("Not found");

    return reply.type(route.contentType).send(content);
  };
}
