export function registerStatusRoutes(server) {
  server.get("/health", async (_request, reply) => reply.send({ status: "ok" }));
  server.get("/ready", async (_request, reply) => reply.send({ status: "ready" }));
}
