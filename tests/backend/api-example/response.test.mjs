import { expect, test } from "@jest/globals";
import { createApiExampleResponse } from "../../../src/backend/api-example/response.mjs";

test("maps validated request fields to the example response", () => {
  expect(
    createApiExampleResponse({
      params: { exampleId: "example-123" },
      body: { name: "Example item", description: "A sample API contract." },
      query: { source: "template" },
    }),
  ).toEqual({
    id: "example-123",
    name: "Example item",
    description: "A sample API contract.",
    source: "template",
  });
});
