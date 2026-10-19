import { expect, jest, test } from "@jest/globals";
import { installOfflineShell } from "../../../src/frontend/service/worker.mjs";

function createScope() {
  const listeners = new Map();
  return {
    addEventListener: (name, callback) => listeners.set(name, callback),
    listeners,
    caches: {
      open: jest.fn().mockResolvedValue({
        addAll: jest.fn().mockResolvedValue(undefined),
        put: jest.fn(),
      }),
      keys: jest.fn().mockResolvedValue(["old-cache", "web-template-shell-v1"]),
      delete: jest.fn().mockResolvedValue(true),
      match: jest.fn().mockResolvedValue(undefined),
    },
    clients: { claim: jest.fn() },
    fetch: jest.fn().mockResolvedValue({ ok: true, clone: () => "copy" }),
    location: { origin: "http://localhost" },
    skipWaiting: jest.fn(),
  };
}

function createEvent(request) {
  return {
    request,
    waitUntil: jest.fn(),
    respondWith: jest.fn(),
  };
}

test("installs and activates the cached app shell", async () => {
  const scope = createScope();
  installOfflineShell(scope);
  const installEvent = createEvent();
  scope.listeners.get("install")(installEvent);
  await installEvent.waitUntil.mock.calls[0][0];
  expect(scope.caches.open.mock.results[0].value).resolves.toBeDefined();
  expect(scope.skipWaiting).toHaveBeenCalled();

  const activateEvent = createEvent();
  scope.listeners.get("activate")(activateEvent);
  await activateEvent.waitUntil.mock.calls[0][0];
  expect(scope.caches.delete).toHaveBeenCalledWith("old-cache");
  expect(scope.clients.claim).toHaveBeenCalled();
});

test("does not activate when app shell caching fails", async () => {
  const scope = createScope();
  const error = new Error("cache failed");
  scope.caches.open.mockResolvedValue({ addAll: jest.fn().mockRejectedValue(error) });
  installOfflineShell(scope);
  const installEvent = createEvent();
  scope.listeners.get("install")(installEvent);

  await expect(installEvent.waitUntil.mock.calls[0][0]).rejects.toBe(error);

  expect(scope.skipWaiting).not.toHaveBeenCalled();
});

test.each([
  ["POST", "http://localhost/page"],
  ["GET", "https://example.com/page"],
  ["GET", "http://localhost/api/example"],
  ["GET", "http://localhost/health"],
  ["GET", "http://localhost/ready"],
])("does not intercept %s %s", (method, url) => {
  const scope = createScope();
  installOfflineShell(scope);
  const event = createEvent({ method, url });
  scope.listeners.get("fetch")(event);
  expect(event.respondWith).not.toHaveBeenCalled();
});

test("serves a cached app asset", async () => {
  const scope = createScope();
  scope.caches.match.mockResolvedValue("cached page");
  installOfflineShell(scope);
  const event = createEvent({ method: "GET", url: "http://localhost/" });
  scope.listeners.get("fetch")(event);
  await expect(event.respondWith.mock.calls[0][0]).resolves.toBe("cached page");
  expect(scope.fetch).not.toHaveBeenCalled();
});

test("fetches an uncached asset and stores screenshot responses", async () => {
  const scope = createScope();
  installOfflineShell(scope);
  const event = createEvent({ method: "GET", url: "http://localhost/screenshots/preview.png" });
  scope.listeners.get("fetch")(event);
  await expect(event.respondWith.mock.calls[0][0]).resolves.toEqual({
    ok: true,
    clone: expect.any(Function),
  });
  expect(scope.fetch).toHaveBeenCalledWith(event.request);
});

test("fetches a failed response without caching it", async () => {
  const scope = createScope();
  scope.fetch.mockResolvedValue({ ok: false });
  installOfflineShell(scope);
  const event = createEvent({ method: "GET", url: "http://localhost/styles.css" });
  scope.listeners.get("fetch")(event);
  await expect(event.respondWith.mock.calls[0][0]).resolves.toEqual({ ok: false });
  expect(scope.caches.open).not.toHaveBeenCalled();
});
