# Web application guide

Use this guide to build and run a web application from this template.

> After you create a repository from this template, replace this document with end-user documentation for your repository.

## Install and build

Install Node.js 26 or later and npm 12 or later. Run `npm ci` from the repository root.

Run `npm run build` to create `dist/client.js`. The build entry loads `src/frontend/client-entry.mjs`. The server serves the page from `public/` and the bundle from `dist/`.

## Configure and start

Set `PORT` to an integer from 1 through 65535. The default is `1020`. Set `LOG_LEVEL` only when needed. Its default is `info`.

Run `node bin/web-template.mjs` to start the server. Open `http://localhost:1020/` or the configured TCP endpoint.

## Routes and assets

`GET /` serves `public/index.html`. `GET /client.js` serves the browser bundle.
`GET /styles.css` serves the page styles. `GET /manifest.webmanifest` serves app metadata.
`GET /service-worker.js` serves the offline shell worker. The server also serves the app icons and preview images from `public/`.

`GET /health` returns `{"status":"ok"}`. `GET /ready` returns `{"status":"ready"}`.
Other retrieval paths return 404. Other methods on the page and asset routes return 405.

## Offline app setup

A PWA is a web app that a browser can install and use offline.
This app can load saved page files when the network is offline.
The manifest sets the app name, launch path, layout, colors, icons, and desktop and mobile preview images.

The SVG icons contain custom template artwork. The PNG icons use browser-rendered copies for install screens.
The offline worker saves page files after the first visit. It does not save API, health, or readiness replies.
Change the cache name when you change the saved page files.

Update `public/manifest.webmanifest` after you scaffold an application. Set its names, description, colors, start path, and screenshots.
Replace the files in `public/icons/` with artwork for the new application. Keep one general icon and one maskable icon.
Replace `public/screenshots/web-template-desktop.png` and `public/screenshots/web-template-mobile.png` with screenshots of the new application.
Update the route allowlist in `src/backend/route-resolver.mjs` and add each new route in `src/backend/http.mjs`.

To check offline behavior, open the page in a browser. Wait for the offline worker to control the page, then reload it.
Use the browser developer tools to set the network mode to offline. Reload the page.
The page shell must load. API calls must fail because the worker does not save them.

## API schema example

`POST /api/examples/:exampleId` validates path parameters, query fields, and a JSON request body.
The route also declares a response schema. Fastify rejects invalid requests with HTTP 400.
The validator rejects fields outside each schema.
The example route does not save data. Replace it with an application route and its contract.

Send this request to the running server:

```sh
curl -X POST 'http://localhost:1020/api/examples/example-123?source=template' \
  -H 'content-type: application/json' \
  -d '{"name":"Example item","description":"A sample API contract."}'
```

The response is `{"id":"example-123","name":"Example item","description":"A sample API contract.","source":"template"}`.

Keep source assets in `public/`. Keep generated files in `dist/`. Do not put secrets or generated files in `public/`.

## Check the browser

Run `npm run puppeteer` to install Chrome. Start the server, then run `npm run screenshots` and `npm run lighthouse`. The files go to the ignored `artifacts/` directory. Set `WEB_URL` or `SCREENSHOT_PATH` to change the screenshot target or file.

Lighthouse checks performance, best practices, SEO, and accessibility. The script also checks the manifest, install icons, preview images, worker control, and offline page load.
Lighthouse 13 does not include a built-in PWA category. Puppeteer runs those app checks after Lighthouse finishes.
Pass when Accessibility scores at least 95 out of 100. Repair reported issues and run Lighthouse again when the score is lower.

These browser checks run outside `npm test` and CI. Stop the server after the checks.

## Container and deployment

Run `docker compose up --build -d` to build and start the container. Compose publishes TCP endpoint `1020` on host address `0.0.0.0`.
Open `http://localhost:1020/` to view the app. Run `docker compose down` to stop the container.

> **Template setup — update these values after you create a web application repository.**
>
> This template has no published image. Set the image visibility, pull access, and supported architectures. The workflow builds `linux/amd64`. Name the owner for build inputs and architecture decisions. Update the README and publication workflow before you publish an image.

Use a released version tag and its recorded SHA-256 digest for deployment. Publication does not deploy the site.

## Validate

Run `npm test` before handoff. It checks tests, lint, formatting, audit, and the web build.
