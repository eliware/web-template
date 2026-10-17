import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { readAsset } from "./reader.mjs";

export function readRouteAsset(route, { publicRoot, buildRoot, read = readFile }) {
  const roots = { public: publicRoot, build: buildRoot };
  return readAsset(resolve(roots[route.root], route.file), read);
}
