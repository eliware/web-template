import { resolve } from "node:path";
import { createLogger, registerHandlers, registerSignals } from "@eliware/common";
import { registerApiExampleRoutes } from "../api-example/routes.mjs";
import { registerWebRoutes } from "../http.mjs";
import { loadRuntimeConfig } from "./config.mjs";
import { createWebServer } from "../server.mjs";
import { createShutdownHook } from "../shutdown.mjs";
import { registerStatusRoutes } from "../status-routes.mjs";

export const runtimeDependencies = {
  loadConfig: loadRuntimeConfig,
  createLogger,
  registerHandlers,
  registerSignals,
  createServer: createWebServer,
  registerWebRoutes,
  registerApiExampleRoutes,
  createShutdownHook,
  registerStatusRoutes,
  resolve,
};
