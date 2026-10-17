import Fastify from "fastify";

export function createWebServer() {
  return Fastify({
    logger: false,
    ajv: { customOptions: { removeAdditional: false } },
  });
}
