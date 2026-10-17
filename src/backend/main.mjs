import { parseTcpEndpoint } from "./port.mjs";

export async function startWebApplication(dependencies) {
  dependencies.loadEnvironment({ quiet: true });
  const tcpEndpoint = parseTcpEndpoint(process.env.PORT);

  const log = dependencies.createLogger({ level: process.env.LOG_LEVEL ?? "info" });
  dependencies.registerHandlers({ log });
  const server = dependencies.createServer({
    logger: false,
    ajv: { customOptions: { removeAdditional: false } },
  });
  dependencies.registerWebRoutes(server, {
    publicRoot: dependencies.resolve("public"),
    buildRoot: dependencies.resolve("dist"),
  });
  dependencies.registerApiExampleRoutes(server);
  dependencies.registerStatusRoutes(server);
  const shutdownHook = dependencies.createShutdownHook({ server, log });
  dependencies.registerSignals({ log, shutdownHook });
  await server.listen({ port: tcpEndpoint, host: "0.0.0.0" });
  log.info(`Web application accepts connections on TCP endpoint ${tcpEndpoint}`);
  return server;
}
