import { readFile } from "node:fs/promises";
import { readRouteAsset } from "./asset/serving.mjs";
import { resolveRoute } from "./route-resolver.mjs";

export function registerWebRoutes(server, { publicRoot, buildRoot, read = readFile }) {
  const handleAssetRequest = async (request, reply) => {
    if (request.method !== "GET") {
      return reply.code(405).type("text/plain").send("Method not allowed");
    }

    const path = new URL(request.url, "http://localhost").pathname;
    const route = resolveRoute(path);
    const content = await readRouteAsset(route, { publicRoot, buildRoot, read });
    if (content === null) return reply.code(404).type("text/plain").send("Not found");

    return reply.type(route.contentType).send(content);
  };

  server.all("/", handleAssetRequest);
  server.all("/client.js", handleAssetRequest);
  server.setNotFoundHandler((_request, reply) =>
    reply.code(404).type("text/plain").send("Not found"),
  );
}
