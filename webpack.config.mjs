import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const repositoryRoot = dirname(fileURLToPath(import.meta.url));

export default {
  context: repositoryRoot,
  mode: "production",
  target: "web",
  entry: {
    client: "./src/frontend/client-entry.mjs",
    "service-worker": "./src/frontend/service/worker-entry.mjs",
  },
  output: {
    path: resolve(repositoryRoot, "dist"),
    filename: "[name].js",
    clean: true,
  },
};
