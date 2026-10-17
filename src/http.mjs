import { readFile } from "node:fs/promises";

export function createRequestHandler({ publicRoot, buildRoot, read = readFile }) {
  return async function handleRequest(request, response) {
    if (request.method !== "GET") {
      response.writeHead(405, { "content-type": "text/plain" });
      response.end("Method not allowed");
      return;
    }

    const path = new URL(request.url, "http://localhost").pathname;
    const file =
      path === "/"
        ? `${publicRoot}/index.html`
        : path === "/client.js"
          ? `${buildRoot}/client.js`
          : null;
    if (!file) {
      response.writeHead(404, { "content-type": "text/plain" });
      response.end("Not found");
      return;
    }

    try {
      const content = await read(file);
      const type = path === "/" ? "text/html" : "text/javascript";
      response.writeHead(200, { "content-type": type });
      response.end(content);
    } catch {
      response.writeHead(404, { "content-type": "text/plain" });
      response.end("Not found");
    }
  };
}
