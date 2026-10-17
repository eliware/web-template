export function writeTextResponse(response, status, content) {
  response.writeHead(status, { "content-type": "text/plain" });
  response.end(content);
}

export function writeAssetResponse(response, content, contentType) {
  response.writeHead(200, { "content-type": contentType });
  response.end(content);
}
