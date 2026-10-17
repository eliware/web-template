export function resolveRoute(path) {
  if (path === "/") return { root: "public", file: "index.html", contentType: "text/html" };
  if (path === "/client.js")
    return { root: "build", file: "client.js", contentType: "text/javascript" };
  return null;
}
