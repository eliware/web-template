import { expect, test } from "@jest/globals";
import Fastify from "fastify";
import { createLogger, registerHandlers, registerSignals } from "@eliware/common";
import { config } from "dotenv";
import { registerApiExampleRoutes } from "../../src/backend/api-example.mjs";
import { registerWebRoutes } from "../../src/backend/http.mjs";
import { runtimeDependencies } from "../../src/backend/runtime-wiring.mjs";
import { createShutdownHook } from "../../src/backend/shutdown.mjs";
import { registerStatusRoutes } from "../../src/backend/status-routes.mjs";

test("assembles the production application dependencies", () => {
  expect(runtimeDependencies).toEqual({
    loadEnvironment: config,
    createLogger,
    registerHandlers,
    registerSignals,
    createServer: Fastify,
    registerWebRoutes,
    registerApiExampleRoutes,
    createShutdownHook,
    registerStatusRoutes,
    resolve: expect.any(Function),
  });
});
