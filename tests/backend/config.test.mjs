import { expect, jest, test } from "@jest/globals";
import { loadApplicationConfig } from "../../src/backend/config.mjs";

test("loads the environment and returns the configured endpoint and log level", () => {
  const loadEnvironment = jest.fn();
  const environment = { PORT: "8080", LOG_LEVEL: "debug" };

  expect(loadApplicationConfig({ loadEnvironment, environment })).toEqual({
    tcpEndpoint: 8080,
    logLevel: "debug",
  });
  expect(loadEnvironment).toHaveBeenCalledWith({ quiet: true });
});

test("uses the default endpoint and log level", () => {
  const loadEnvironment = jest.fn();

  expect(loadApplicationConfig({ loadEnvironment, environment: {} })).toEqual({
    tcpEndpoint: 3000,
    logLevel: "info",
  });
  expect(loadEnvironment).toHaveBeenCalledWith({ quiet: true });
});
