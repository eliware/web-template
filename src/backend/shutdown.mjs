export function createShutdownHook({ server, log }) {
  let stopped = false;

  return async function shutdown() {
    if (stopped) return;
    stopped = true;
    await server.close();
    log.info("Web application stopped");
  };
}
