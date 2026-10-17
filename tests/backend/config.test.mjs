import { expect, test } from "@jest/globals";
import { loadApplicationConfig } from "../../src/backend/config.mjs";

test("maps environment values to the application configuration", () => {
  const environment = { PORT: "8080", LOG_LEVEL: "debug" };

  expect(loadApplicationConfig({ environment })).toEqual({
    tcpEndpoint: 8080,
    logLevel: "debug",
  });
});

test("uses the default endpoint and log level", () => {
  expect(loadApplicationConfig({ environment: {} })).toEqual({
    tcpEndpoint: 3000,
    logLevel: "info",
  });
});
