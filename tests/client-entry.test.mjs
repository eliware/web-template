import { expect, jest, test } from "@jest/globals";

const documentMock = {};
const renderHome = jest.fn();
globalThis.document = documentMock;
jest.unstable_mockModule("../src/client.mjs", () => ({ renderHome }));
await import("../src/client-entry.mjs");
delete globalThis.document;

test("passes the page document to the browser client", () => {
  expect(renderHome).toHaveBeenCalledWith(documentMock);
});
