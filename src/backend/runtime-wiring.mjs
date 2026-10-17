import Fastify from "fastify";
import { resolve } from "node:path";
import { createLogger, registerHandlers, registerSignals } from "@eliware/common";
import { config as loadEnvironment } from "dotenv";
import { registerApiExampleRoutes } from "./api-example/routes.mjs";
import { loadApplicationConfig } from "./config.mjs";
import { registerWebRoutes } from "./http.mjs";
import { createShutdownHook } from "./shutdown.mjs";
import { registerStatusRoutes } from "./status-routes.mjs";

export const runtimeDependencies = {
  loadConfig: () => {
    loadEnvironment({ quiet: true });
    return loadApplicationConfig({ environment: process.env });
  },
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
