import { createAssetRequestHandler } from "./asset/request-handler.mjs";
import { createAssetMethodHandler } from "./asset/response.mjs";

export function registerWebRoutes(server, options) {
  const handleAssetRoute = createAssetMethodHandler(createAssetRequestHandler(options));

  server.all("/", handleAssetRoute);
  server.all("/client.js", handleAssetRoute);
  server.setNotFoundHandler((_request, reply) =>
    reply.code(404).type("text/plain").send("Not found"),
  );
}
