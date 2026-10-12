# Web application guide

Use this guide to build and run a web application from this template.

## Install and build

Install Node.js 26 or later and npm 12 or later. Run `npm ci` from the repository root.

Run `npm run build` to create `dist/client.js`. The build bundles `src/client-entry.mjs`. The server serves the page from `public/` and the bundle from `dist/`.

## Configure and start

Set `PORT` to an integer from 1 through 65535. The default is `3000`. Set `LOG_LEVEL` only when needed. Its default is `info`.

Run `node bin/web-template.mjs` to start the server. Open `http://localhost:3000/` or the configured port.

## Routes and assets

`GET /` serves `public/index.html`. `GET /client.js` serves the browser bundle. Other GET paths return 404. Other methods return 405.

Keep source assets in `public/`. Keep generated files in `dist/`. Do not put secrets or generated files in `public/`.

## Check the browser

Run `npm run puppeteer` to install Chrome. Start the server, then run `npm run lighthouse`. The report goes to the ignored `artifacts/` directory.
Pass when the report gives Accessibility a score of at least 95 out of 100. If the score is lower, fix the reported issues and run Lighthouse again.

These browser checks run outside `npm test` and CI. Stop the server after the checks.

## Container and deployment

Build the image with `docker build -t web-template .`. The image is `ghcr.io/eliware/web-template`.

Use a released version tag and its recorded SHA-256 digest for deployment. Publication does not deploy the site.

## Validate

Run `npm test` before handoff. It checks tests, lint, formatting, audit, and the web build.
