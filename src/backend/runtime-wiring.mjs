import Fastify from "fastify";
import { resolve } from "node:path";
import { createLogger, registerHandlers, registerSignals } from "@eliware/common";
import { config } from "dotenv";
import { registerApiExampleRoutes } from "./api-example.mjs";
import { registerWebRoutes } from "./http.mjs";
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
