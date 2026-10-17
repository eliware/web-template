import { parseTcpEndpoint } from "./port.mjs";

export function loadApplicationConfig({ environment }) {
  return {
    tcpEndpoint: parseTcpEndpoint(environment.PORT),
    logLevel: environment.LOG_LEVEL ?? "info",
  };
}
