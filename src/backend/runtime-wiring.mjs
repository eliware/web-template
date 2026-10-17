import Fastify from "fastify";
import { resolve } from "node:path";
import { createLogger, registerHandlers, registerSignals } from "@eliware/common";
import { registerApiExampleRoutes } from "./api-example/routes.mjs";
import { loadApplicationConfig } from "./config.mjs";
import { loadEnvironment } from "./environment-loader.mjs";
import { registerWebRoutes } from "./http.mjs";
import { createShutdownHook } from "./shutdown.mjs";
import { registerStatusRoutes } from "./status-routes.mjs";

export const runtimeDependencies = {
  loadConfig: () => {
    loadEnvironment();
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
