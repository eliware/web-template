import { loadApplicationConfig } from "../config.mjs";
import { loadEnvironment as loadEnvironmentFile } from "../environment-loader.mjs";

export function loadRuntimeConfig({
  environment = process.env,
  loadEnvironment = loadEnvironmentFile,
} = {}) {
  loadEnvironment();
  return loadApplicationConfig({ environment });
}
