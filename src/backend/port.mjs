export function parseTcpEndpoint(value) {
  const tcpEndpoint = Number(value ?? 1020);
  if (!Number.isInteger(tcpEndpoint) || tcpEndpoint < 1 || tcpEndpoint > 65535) {
    throw new Error("Set the TCP endpoint value to an integer from 1 through 65535");
  }
  return tcpEndpoint;
}
