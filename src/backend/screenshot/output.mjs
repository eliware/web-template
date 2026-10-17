import { mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";

export async function prepareScreenshotOutput(output, makeDirectory = mkdir) {
  const target = resolve(output);
  await makeDirectory(dirname(target), { recursive: true });
  return target;
}
