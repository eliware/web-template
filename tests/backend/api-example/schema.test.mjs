import { expect, test } from "@jest/globals";
import { apiExampleSchema } from "../../../src/backend/api-example/schema.mjs";

test("defines the example request and response contract", () => {
  expect(apiExampleSchema.params.required).toContain("exampleId");
  expect(apiExampleSchema.querystring.properties.source.type).toBe("string");
  expect(apiExampleSchema.body.required).toContain("name");
  expect(apiExampleSchema.response[200].required).toEqual(["id", "name"]);
});
