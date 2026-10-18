import { expect, jest, test } from "@jest/globals";
import { startWebApplication } from "../../src/backend/main.mjs";

function dependencies(configuration = { tcpEndpoint: 1020, logLevel: "info" }) {
  const server = {
    listen: jest.fn().mockResolvedValue(undefined),
    close: jest.fn().mockResolvedValue(undefined),
  };
  const log = { info: jest.fn() };
  const signals = {};
  const shutdown = jest.fn();
  return {
    server,
    log,
    signals,
    shutdown,
    values: {
      loadConfig: jest.fn(() => configuration),
      createLogger: jest.fn(() => log),
      registerHandlers: jest.fn(),
      registerSignals: jest.fn((value) => Object.assign(signals, value)),
      createServer: jest.fn(() => server),
      registerWebRoutes: jest.fn(),
      registerApiExampleRoutes: jest.fn(),
      registerStatusRoutes: jest.fn(),
      createShutdownHook: jest.fn(() => shutdown),
      resolve: jest.fn((path) => `/app/${path}`),
    },
  };
}

test.each([
  [undefined, 1020],
  ["8080", 8080],
])("starts on configured TCP endpoint %s", async (configured, tcpEndpoint) => {
  const deps = dependencies({ tcpEndpoint, logLevel: "info" });
  await expect(startWebApplication(deps.values)).resolves.toBe(deps.server);
  expect(deps.values.loadConfig).toHaveBeenCalledTimes(1);
  expect(deps.values.createServer).toHaveBeenCalledTimes(1);
  expect(deps.values.createServer.mock.calls[0]).toEqual([]);
  expect(deps.values.registerWebRoutes).toHaveBeenCalledWith(deps.server, {
    publicRoot: "/app/public",
    buildRoot: "/app/dist",
  });
  expect(deps.values.registerApiExampleRoutes).toHaveBeenCalledWith(deps.server);
  expect(deps.values.registerStatusRoutes).toHaveBeenCalledWith(deps.server);
  expect(deps.values.createShutdownHook).toHaveBeenCalledWith({
    server: deps.server,
    log: deps.log,
  });
  expect(deps.server.listen).toHaveBeenCalledWith({ port: tcpEndpoint, host: "0.0.0.0" });
  expect(typeof deps.signals.shutdownHook).toBe("function");
  expect(deps.signals.shutdownHook).toBe(deps.shutdown);
});

test("uses the configured log level", async () => {
  const deps = dependencies({ tcpEndpoint: 8081, logLevel: "debug" });
  await startWebApplication(deps.values);
  expect(deps.values.createLogger).toHaveBeenCalledWith({ level: "debug" });
});
