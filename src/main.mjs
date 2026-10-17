import { createServer } from "node:http";
import { resolve } from "node:path";
import { createLogger, registerHandlers, registerSignals } from "@eliware/common";
import { config } from "dotenv";
import { createRequestHandler } from "./http.mjs";

export const runtimeDependencies = {
  loadEnvironment: config,
  createLogger,
  registerHandlers,
  registerSignals,
  createServer,
  createRequestHandler,
  resolve,
};

export function startWebApplication(dependencies) {
  dependencies.loadEnvironment({ quiet: true });
  const tcpEndpoint = Number(process.env.PORT ?? 3000);
  if (!Number.isInteger(tcpEndpoint) || tcpEndpoint < 1 || tcpEndpoint > 65535) {
    throw new Error("Set the TCP endpoint value to an integer from 1 through 65535");
  }

  const log = dependencies.createLogger({ level: process.env.LOG_LEVEL ?? "info" });
  dependencies.registerHandlers({ log });
  const handler = dependencies.createRequestHandler({
    publicRoot: dependencies.resolve("public"),
    buildRoot: dependencies.resolve("dist"),
  });
  const server = dependencies.createServer(handler);
  let stopped = false;
  const shutdown = () => {
    if (stopped) return;
    stopped = true;
    server.close();
    log.info("Web application stopped");
  };
  dependencies.registerSignals({ log, shutdownHook: shutdown });
  server.listen(tcpEndpoint);
  log.info(`Web application accepts connections on TCP endpoint ${tcpEndpoint}`);
  return server;
}
