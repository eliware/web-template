import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { readAsset } from "./asset-reader.mjs";
import { resolveRoute } from "./route-resolver.mjs";

export function registerWebRoutes(server, { publicRoot, buildRoot, read = readFile }) {
  const handleRoute = async (request, reply) => {
    if (request.method !== "GET") {
      return reply.code(405).type("text/plain").send("Method not allowed");
    }

    const path = new URL(request.url, "http://localhost").pathname;
    const route = resolveRoute(path);
    const root = route.root === "public" ? publicRoot : buildRoot;
    const content = await readAsset(resolve(root, route.file), read);
    if (content === null) return reply.code(404).type("text/plain").send("Not found");

    return reply.type(route.contentType).send(content);
  };

  server.all("/", handleRoute);
  server.all("/client.js", handleRoute);
  server.get("/health", async (_request, reply) => reply.send({ status: "ok" }));
  server.get("/ready", async (_request, reply) => reply.send({ status: "ready" }));
  server.setNotFoundHandler((_request, reply) =>
    reply.code(404).type("text/plain").send("Not found"),
  );
}
