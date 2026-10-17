import { afterEach, expect, jest, test } from "@jest/globals";
import { startWebApplication } from "../../src/backend/main.mjs";

afterEach(() => {
  delete process.env.PORT;
  delete process.env.LOG_LEVEL;
});

function dependencies() {
  const server = {
    listen: jest.fn().mockResolvedValue(undefined),
    close: jest.fn().mockResolvedValue(undefined),
  };
  const log = { info: jest.fn() };
  const signals = {};
  return {
    server,
    log,
    signals,
    values: {
      loadEnvironment: jest.fn(),
      createLogger: jest.fn(() => log),
      registerHandlers: jest.fn(),
      registerSignals: jest.fn((value) => Object.assign(signals, value)),
      createServer: jest.fn(() => server),
      registerWebRoutes: jest.fn(),
      registerApiExampleRoutes: jest.fn(),
      resolve: jest.fn((path) => `/app/${path}`),
    },
  };
}

test.each([
  [undefined, 3000],
  ["8080", 8080],
])("starts on configured TCP endpoint %s", async (configured, tcpEndpoint) => {
  if (configured !== undefined) process.env.PORT = configured;
  const deps = dependencies();
  await expect(startWebApplication(deps.values)).resolves.toBe(deps.server);
  expect(deps.values.createServer).toHaveBeenCalledWith({
    logger: false,
    ajv: { customOptions: { removeAdditional: false } },
  });
  expect(deps.values.registerWebRoutes).toHaveBeenCalledWith(deps.server, {
    publicRoot: "/app/public",
    buildRoot: "/app/dist",
  });
  expect(deps.values.registerApiExampleRoutes).toHaveBeenCalledWith(deps.server);
  expect(deps.server.listen).toHaveBeenCalledWith({ port: tcpEndpoint, host: "0.0.0.0" });
  expect(deps.signals.shutdownHook).toBeInstanceOf(Function);
  await deps.signals.shutdownHook();
  await deps.signals.shutdownHook();
  expect(deps.server.close).toHaveBeenCalledTimes(1);
});

test("uses the configured log level", async () => {
  process.env.PORT = "8081";
  process.env.LOG_LEVEL = "debug";
  const deps = dependencies();
  await startWebApplication(deps.values);
  expect(deps.values.createLogger).toHaveBeenCalledWith({ level: "debug" });
});
