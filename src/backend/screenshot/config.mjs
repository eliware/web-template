export function resolveScreenshotConfig({ url, output, environment }) {
  return {
    url: url ?? environment.WEB_URL ?? "http://127.0.0.1:3000/",
    output: output ?? environment.SCREENSHOT_PATH ?? "artifacts/home.png",
  };
}
