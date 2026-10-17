export async function startWebApplication(dependencies) {
  const { tcpEndpoint, logLevel } = dependencies.loadConfig();
  const log = dependencies.createLogger({ level: logLevel });
  dependencies.registerHandlers({ log });
  const server = dependencies.createServer();
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
