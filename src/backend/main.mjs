import Fastify from "fastify";
import { resolve } from "node:path";
import { createLogger, registerHandlers, registerSignals } from "@eliware/common";
import { config } from "dotenv";
import { registerApiExampleRoutes } from "./api-example.mjs";
import { registerWebRoutes } from "./http.mjs";
import { parseTcpEndpoint } from "./port.mjs";
import { createShutdownHook } from "./shutdown.mjs";
import { registerStatusRoutes } from "./status-routes.mjs";

export const runtimeDependencies = {
  loadEnvironment: config,
  createLogger,
  registerHandlers,
  registerSignals,
  createServer: Fastify,
  registerWebRoutes,
  registerApiExampleRoutes,
  createShutdownHook,
  registerStatusRoutes,
  resolve,
};

export async function startWebApplication(dependencies) {
  dependencies.loadEnvironment({ quiet: true });
  const tcpEndpoint = parseTcpEndpoint(process.env.PORT);

  const log = dependencies.createLogger({ level: process.env.LOG_LEVEL ?? "info" });
  dependencies.registerHandlers({ log });
  const server = dependencies.createServer({
    logger: false,
    ajv: { customOptions: { removeAdditional: false } },
  });
  dependencies.registerWebRoutes(server, {
    publicRoot: dependencies.resolve("public"),
    buildRoot: dependencies.resolve("dist"),
  });
  dependencies.registerApiExampleRoutes(server);
  dependencies.registerStatusRoutes(server);
  const shutdownHook = dependencies.createShutdownHook({ server, log });
  dependencies.registerSignals({ log, shutdownHook });
  await server.listen({ port: tcpEndpoint, host: "0.0.0.0" });
  log.info(`Web application accepts connections on TCP endpoint ${tcpEndpoint}`);
  return server;
}
