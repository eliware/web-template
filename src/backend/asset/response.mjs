export function sendAssetMethodResponse(method, reply) {
  if (method === "GET") return null;
  return reply.code(405).type("text/plain").send("Method not allowed");
}

export function sendAssetResponse(reply, route, content) {
  if (content === null) return reply.code(404).type("text/plain").send("Not found");
  return reply.type(route.contentType).send(content);
}
