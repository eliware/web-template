import { readFile } from "node:fs/promises";
import { isAbsolute, relative, resolve, sep } from "node:path";
import { readAsset } from "./reader.mjs";

export function readRouteAsset(route, { publicRoot, buildRoot, read = readFile }) {
  if (route === null) return Promise.resolve(null);

  const roots = { public: publicRoot, build: buildRoot };
  const root = roots[route?.root];
  if (typeof root !== "string" || typeof route.file !== "string")
    throw new TypeError("asset route must include a configured root and file");

  const assetRoot = resolve(root);
  const assetPath = resolve(assetRoot, route.file);
  const relativePath = relative(assetRoot, assetPath);
  if (
    relativePath === "" ||
    relativePath === ".." ||
    relativePath.startsWith(`..${sep}`) ||
    isAbsolute(relativePath)
  ) {
    throw new RangeError("asset path must stay within its configured root");
  }

  return readAsset(assetPath, read);
}
