import { expect, jest, test } from "@jest/globals";

const scope = {};
const installOfflineShell = jest.fn();
globalThis.self = scope;
jest.unstable_mockModule("../../../src/frontend/service/worker.mjs", () => ({
  installOfflineShell,
}));
await import("../../../src/frontend/service/worker-entry.mjs");
delete globalThis.self;

test("installs the offline shell in the worker scope", () => {
  expect(installOfflineShell).toHaveBeenCalledWith(scope);
});
