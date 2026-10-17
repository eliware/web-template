import { expect, test } from "@jest/globals";
import { createAssetHandler } from "../../src/backend/asset-handler.mjs";

function reply() {
  return {
    code(status) {
      this.status = status;
      return this;
    },
    type(contentType) {
      this.contentType = contentType;
      return this;
    },
    send(body) {
      this.body = body;
      return this;
    },
  };
}

test("uses the default filesystem reader", async () => {
  const handle = createAssetHandler({ publicRoot: "missing-assets", buildRoot: "missing-build" });
  const response = reply();

  await handle({ method: "GET", url: "/" }, response);

  expect(response.status).toBe(404);
});
