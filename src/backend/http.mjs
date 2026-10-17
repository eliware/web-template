import { createAssetRequestHandler } from "./asset/request-handler.mjs";

export function registerWebRoutes(server, options) {
  const handleAssetRequest = createAssetRequestHandler(options);
  server.all("/", handleAssetRequest);
  server.all("/client.js", handleAssetRequest);
  server.setNotFoundHandler((_request, reply) =>
    reply.code(404).type("text/plain").send("Not found"),
  );
}
