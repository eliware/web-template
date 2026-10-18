import { expect, jest, test } from "@jest/globals";

const documentMock = {};
const serviceWorkerMock = { register: jest.fn().mockResolvedValue(undefined) };
const renderHome = jest.fn();
globalThis.document = documentMock;
globalThis.navigator = { serviceWorker: serviceWorkerMock };
jest.unstable_mockModule("../../src/frontend/client.mjs", () => ({ renderHome }));
await import("../../src/frontend/client-entry.mjs");
delete globalThis.document;
delete globalThis.navigator;

test("passes the page document to the browser client", () => {
  expect(renderHome).toHaveBeenCalledWith(documentMock);
});

test("registers the app service worker", () => {
  expect(serviceWorkerMock.register).toHaveBeenCalledWith("/service-worker.js");
});
