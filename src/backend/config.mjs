import { parseTcpEndpoint } from "./port.mjs";

export function loadApplicationConfig({ loadEnvironment, environment }) {
  loadEnvironment({ quiet: true });
  return {
    tcpEndpoint: parseTcpEndpoint(environment.PORT),
    logLevel: environment.LOG_LEVEL ?? "info",
  };
}
