import { expect, test } from "@jest/globals";
import { loadApplicationConfig } from "../../src/backend/config.mjs";

test.each([
  ["configured values", { PORT: "8080", LOG_LEVEL: "debug" }, 8080, "debug"],
  ["default values", {}, 1020, "info"],
])("maps %s to the application configuration", (_name, environment, tcpEndpoint, logLevel) => {
  expect(loadApplicationConfig({ environment })).toEqual({ tcpEndpoint, logLevel });
});
