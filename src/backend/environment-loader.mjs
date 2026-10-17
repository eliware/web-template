import { config } from "dotenv";

export function loadEnvironment() {
  config({ quiet: true });
}
