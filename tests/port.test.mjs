import { expect, test } from "@jest/globals";
import { parseTcpEndpoint } from "../src/port.mjs";

test.each(["NaN", "0", "65536", "1.5"])("rejects invalid TCP endpoint value %s", (value) => {
  expect(() => parseTcpEndpoint(value)).toThrow(
    "Set the TCP endpoint value to an integer from 1 through 65535",
  );
});
