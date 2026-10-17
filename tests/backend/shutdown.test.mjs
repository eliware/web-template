import { expect, jest, test } from "@jest/globals";
import { createShutdownHook } from "../../src/backend/shutdown.mjs";

test("closes the server and logs once when shutdown repeats", async () => {
  const server = { close: jest.fn().mockResolvedValue(undefined) };
  const log = { info: jest.fn() };
  const shutdown = createShutdownHook({ server, log });

  await shutdown();
  await shutdown();

  expect(server.close).toHaveBeenCalledTimes(1);
  expect(log.info).toHaveBeenCalledTimes(1);
  expect(log.info).toHaveBeenCalledWith("Web application stopped");
});
