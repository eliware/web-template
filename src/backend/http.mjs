import { createAssetHandler } from "./asset-handler.mjs";

export function registerWebRoutes(server, options) {
  const handleAssetRequest = createAssetHandler(options);

  server.all("/", handleAssetRequest);
  server.all("/client.js", handleAssetRequest);
  server.setNotFoundHandler((_request, reply) =>
    reply.code(404).type("text/plain").send("Not found"),
  );
}
