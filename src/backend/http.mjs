import { createAssetRequestHandler } from "./asset/request-handler.mjs";
import { createAssetMethodHandler } from "./asset/response.mjs";

export function registerWebRoutes(server, options) {
  const handleAssetRoute = createAssetMethodHandler(createAssetRequestHandler(options));

  server.all("/", handleAssetRoute);
  server.all("/client.js", handleAssetRoute);
  server.all("/styles.css", handleAssetRoute);
  server.all("/manifest.webmanifest", handleAssetRoute);
  server.all("/service-worker.js", handleAssetRoute);
  server.all("/icons/template.svg", handleAssetRoute);
  server.all("/icons/template-maskable.svg", handleAssetRoute);
  server.all("/icons/template-192.png", handleAssetRoute);
  server.all("/icons/template-512.png", handleAssetRoute);
  server.all("/icons/template-maskable-512.png", handleAssetRoute);
  server.all("/screenshots/web-template-desktop.png", handleAssetRoute);
  server.all("/screenshots/web-template-mobile.png", handleAssetRoute);
  server.setNotFoundHandler((_request, reply) =>
    reply.code(404).type("text/plain").send("Not found"),
  );
}
