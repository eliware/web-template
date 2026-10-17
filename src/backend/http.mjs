import { createAssetRequestHandler } from "./asset/request-handler.mjs";
import { sendAssetMethodResponse } from "./asset/response.mjs";

export function registerWebRoutes(server, options) {
  const handleAssetRequest = createAssetRequestHandler(options);
  const handleAssetRoute = (request, reply) => {
    const methodResponse = sendAssetMethodResponse(request.method, reply);
    if (methodResponse) return methodResponse;
    return handleAssetRequest(request, reply);
  };

  server.all("/", handleAssetRoute);
  server.all("/client.js", handleAssetRoute);
  server.setNotFoundHandler((_request, reply) =>
    reply.code(404).type("text/plain").send("Not found"),
  );
}
