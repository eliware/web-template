# Web application guide

Use this guide to build and run a web application from this template.

## Install and build

Install Node.js 26 or later and npm 12 or later. Run `npm ci` from the repository root.

Run `npm run build` to create `dist/client.js`. The build entry loads `src/frontend/client-entry.mjs`. The server serves the page from `public/` and the bundle from `dist/`.

## Configure and start

Set `PORT` to an integer from 1 through 65535. The default is `3000`. Set `LOG_LEVEL` only when needed. Its default is `info`.

Run `node bin/web-template.mjs` to start the server. Open `http://localhost:3000/` or the configured TCP endpoint.

## Routes and assets

`GET /` serves `public/index.html`. `GET /client.js` serves the browser bundle.
`GET /health` returns `{"status":"ok"}`. `GET /ready` returns `{"status":"ready"}`.
Other retrieval paths return 404. Other methods on the page and asset routes return 405.

## API schema example

`POST /api/examples/:exampleId` validates path parameters, query fields, and a JSON request body.
The route also declares a response schema. Fastify rejects invalid requests with HTTP 400.
The validator rejects fields outside each schema.
The example route does not save data. Replace it with an application route and its contract.

Send this request to the running server:

```sh
curl -X POST 'http://localhost:3000/api/examples/example-123?source=template' \
  -H 'content-type: application/json' \
  -d '{"name":"Example item","description":"A sample API contract."}'
```

The response is `{"id":"example-123","name":"Example item","description":"A sample API contract.","source":"template"}`.

Keep source assets in `public/`. Keep generated files in `dist/`. Do not put secrets or generated files in `public/`.

## Check the browser

Run `npm run puppeteer` to install Chrome. Start the server, then run `npm run screenshots` and `npm run lighthouse`. The files go to the ignored `artifacts/` directory. Set `WEB_URL` or `SCREENSHOT_PATH` to change the screenshot target or file.
Pass when the report gives Accessibility a score of at least 95 out of 100. If the score is lower, repair the reported issues and run Lighthouse again.

These browser checks run outside `npm test` and CI. Stop the server after the checks.

## Container and deployment

Build a local image with `docker build -t web-template .`.

> **Template setup — update these values after you create a web application repository.**
>
> This template has no published image. Set the image visibility, pull access, and supported architectures. The workflow builds `linux/amd64`. Name the owner for build inputs and architecture decisions. Update the README and publication workflow before you publish an image.

Use a released version tag and its recorded SHA-256 digest for deployment. Publication does not deploy the site.

## Validate

Run `npm test` before handoff. It checks tests, lint, formatting, audit, and the web build.
