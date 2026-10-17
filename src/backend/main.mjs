import Fastify from "fastify";
import { resolve } from "node:path";
import { createLogger, registerHandlers, registerSignals } from "@eliware/common";
import { config } from "dotenv";
import { registerApiExampleRoutes } from "./api-example.mjs";
import { registerWebRoutes } from "./http.mjs";
import { parseTcpEndpoint } from "./port.mjs";

export const runtimeDependencies = {
  loadEnvironment: config,
  createLogger,
  registerHandlers,
  registerSignals,
  createServer: Fastify,
  registerWebRoutes,
  registerApiExampleRoutes,
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
  let stopped = false;
  const shutdown = async () => {
    if (stopped) return;
    stopped = true;
    await server.close();
    log.info("Web application stopped");
  };
  dependencies.registerSignals({ log, shutdownHook: shutdown });
  await server.listen({ port: tcpEndpoint, host: "0.0.0.0" });
  log.info(`Web application accepts connections on TCP endpoint ${tcpEndpoint}`);
  return server;
}
