export function createAssetMethodHandler(handler) {
  return function handleAssetMethod(request, reply) {
    if (request.method !== "GET") {
      return reply.code(405).type("text/plain").send("Method not allowed");
    }
    return handler(request, reply);
  };
}

export function sendAssetResponse(reply, route, content) {
  if (content === null) return reply.code(404).type("text/plain").send("Not found");
  return reply.type(route.contentType).send(content);
}
