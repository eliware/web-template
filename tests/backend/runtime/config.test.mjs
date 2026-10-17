import { expect, jest, test } from "@jest/globals";
import { loadRuntimeConfig } from "../../../src/backend/runtime/config.mjs";

test("loads environment values before assembling application configuration", () => {
  const loadEnvironment = jest.fn();

  expect(
    loadRuntimeConfig({
      environment: { PORT: "8080", LOG_LEVEL: "debug" },
      loadEnvironment,
    }),
  ).toEqual({ tcpEndpoint: 8080, logLevel: "debug" });
  expect(loadEnvironment).toHaveBeenCalledTimes(1);
});
