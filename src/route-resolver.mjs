export function resolveRoute(path, { publicRoot, buildRoot }) {
  if (path === "/") return { file: `${publicRoot}/index.html`, contentType: "text/html" };
  if (path === "/client.js")
    return { file: `${buildRoot}/client.js`, contentType: "text/javascript" };
  return null;
}
