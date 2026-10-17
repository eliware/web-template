import { createApiExampleResponse } from "./response.mjs";
import { apiExampleSchema } from "./schema.mjs";

export function registerApiExampleRoutes(server) {
  server.post("/api/examples/:exampleId", { schema: apiExampleSchema }, (request, reply) =>
    reply.send(createApiExampleResponse(request)),
  );
}
