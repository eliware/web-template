import { expect, jest, test } from "@jest/globals";
import { renderHome } from "../src/client.mjs";

test("updates the page status when its element exists", () => {
  const status = {};
  renderHome({ querySelector: () => status });
  expect(status.textContent).toBe("Web template client assets loaded.");
});

test("does nothing when the page has no status element", () => {
  const querySelector = jest.fn(() => null);

  renderHome({ querySelector });

  expect(querySelector).toHaveBeenCalledTimes(1);
  expect(querySelector).toHaveBeenCalledWith("[data-status]");
});
