import { expect, test } from "@jest/globals";
import { createLogger, registerHandlers, registerSignals } from "@eliware/common";
import { registerApiExampleRoutes } from "../../src/backend/api-example/routes.mjs";
import { registerWebRoutes } from "../../src/backend/http.mjs";
import { runtimeDependencies } from "../../src/backend/runtime-wiring.mjs";
import { createWebServer } from "../../src/backend/server.mjs";
import { createShutdownHook } from "../../src/backend/shutdown.mjs";
import { registerStatusRoutes } from "../../src/backend/status-routes.mjs";

test("assembles the production application dependencies", () => {
  expect(runtimeDependencies).toEqual({
    loadConfig: expect.any(Function),
    createLogger,
    registerHandlers,
    registerSignals,
    createServer: createWebServer,
    registerWebRoutes,
    registerApiExampleRoutes,
    createShutdownHook,
    registerStatusRoutes,
    resolve: expect.any(Function),
  });
});

test("loads application configuration through the production dependency", () => {
  const originalPort = process.env.PORT;
  const originalLogLevel = process.env.LOG_LEVEL;
  process.env.PORT = "8080";
  process.env.LOG_LEVEL = "debug";

  try {
    expect(runtimeDependencies.loadConfig()).toEqual({ tcpEndpoint: 8080, logLevel: "debug" });
  } finally {
    if (originalPort === undefined) delete process.env.PORT;
    else process.env.PORT = originalPort;
    if (originalLogLevel === undefined) delete process.env.LOG_LEVEL;
    else process.env.LOG_LEVEL = originalLogLevel;
  }
});
