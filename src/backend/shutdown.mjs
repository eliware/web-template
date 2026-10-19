export function createShutdownHook({ server, log }) {
  let stopped = false;
  let shutdownPromise;

  return function shutdown() {
    if (stopped) return Promise.resolve();
    if (shutdownPromise) return shutdownPromise;

    shutdownPromise = Promise.resolve()
      .then(() => server.close())
      .catch((error) => {
        shutdownPromise = undefined;
        throw error;
      })
      .then(() => {
        stopped = true;
        log.info("Web application stopped");
      });

    return shutdownPromise;
  };
}
