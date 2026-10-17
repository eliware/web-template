export function registerApiExampleRoutes(server) {
  server.post(
    "/api/examples/:exampleId",
    {
      schema: {
        params: {
          type: "object",
          properties: {
            exampleId: { type: "string", pattern: "^[a-z0-9-]{1,40}$" },
          },
          required: ["exampleId"],
          additionalProperties: false,
        },
        querystring: {
          type: "object",
          properties: {
            source: { type: "string", minLength: 1, maxLength: 40 },
          },
          additionalProperties: false,
        },
        body: {
          type: "object",
          properties: {
            name: { type: "string", minLength: 1, maxLength: 80 },
            description: { type: "string", maxLength: 280 },
          },
          required: ["name"],
          additionalProperties: false,
        },
        response: {
          200: {
            type: "object",
            properties: {
              id: { type: "string" },
              name: { type: "string" },
              description: { type: "string" },
              source: { type: "string" },
            },
            required: ["id", "name"],
            additionalProperties: false,
          },
        },
      },
    },
    async (request, reply) =>
      reply.send({
        id: request.params.exampleId,
        name: request.body.name,
        description: request.body.description,
        source: request.query.source,
      }),
  );
}
