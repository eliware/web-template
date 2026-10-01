# [![eliware.org](https://eliware.org/logos/brand.png)](https://discord.gg/M6aTR9eTwN)

## @eliware/web-template [![license](https://img.shields.io/github/license/eliware/web-template.svg)](LICENSE) [![CI](https://github.com/eliware/web-template/actions/workflows/ci.yml/badge.svg)](https://github.com/eliware/web-template/actions/workflows/ci.yml)

## Table of Contents

- [Features](#features)
- [Requirements](#requirements)
- [Setup](#setup)
- [Usage](#usage)
- [Development](#development)
- [Testing](#testing)
- [Troubleshooting](#troubleshooting)
- [Security](#security)
- [Configuration](#configuration)
- [Operations](#operations)
- [Routes](#routes)
- [Assets](#assets)
- [Development server](#development-server)
- [Build](#build)
- [Deployment](#deployment)
- [Support](#support)
- [License](#license)
- [Links](#links)

## Features

Purpose: provide a reusable Node.js web application baseline for Eliware projects.

Package description: A Node.js web application template with explicit assets, routes, build, and deployment boundaries. Author: Eli Sterling, eliware.org <eli@eliware.org>. License: MIT.

The starter serves a simple page and compiled browser entrypoint. Replace the template identity, user interface, and routes when creating a derived application.

## Requirements

Use Node.js 26 and npm. Docker is required to build and run the container image. CI currently tests Ubuntu; Windows and macOS are intended but unverified.

## Setup

Clone or create a repository from this template, then run `npm ci`. Copy `.env.example` to an untracked `.env` only when changing the local port or log level. Run `npm run build` before starting the server.

## Usage

Run `node web-template.mjs` to serve the page at `http://localhost:3000`. The port can be changed with `PORT`. `package.json.version` identifies releases, which use matching `vMAJOR.MINOR.PATCH` Git tags. Do not treat the GHCR image name as proof that an unreleased image is available.

## Development

Read [AGENTS.md](AGENTS.md), this README, [specs/README.md](specs/README.md), and [RELEASE_NOTES.md](RELEASE_NOTES.md) before changing the template. `src/main.mjs` owns application startup, `src/http.mjs` owns HTTP routing, `src/client.mjs` owns page updates, and `src/client-entry.mjs` bootstraps the browser code; each source module has one mirrored test.

## Testing

Run `npm test` for Jest with 100% statement, branch, function, and line coverage, lint, format-check, aggregate web build, and applicable profile checks through `eliware-test`. Run `npm run format:check` for read-only formatting validation. CI runs `npm ci` followed by `npm test`. Lighthouse and Puppeteer checks require a running local server and are run separately.

## Troubleshooting

If the server does not start, check that Node.js 26 is installed, dependencies are installed with `npm ci`, and `PORT` is an integer from 1 through 65535. If the browser client is missing, run `npm run build`. Run `npm test` to validate the checkout.

## Security

The starter serves only its static page and compiled browser client. Keep `.env`, credentials, tokens, private keys, and machine-specific values out of version control and container images. Do not place generated assets or secrets in `public/`.

## Configuration

`PORT` is optional and defaults to `3000`; it accepts integers from `1` through `65535`. `LOG_LEVEL` is optional and defaults to `info`; supported values are `error`, `warn`, `info`, `http`, `verbose`, `debug`, and `silly`. `.env.example` documents both values. Application operational boundaries exclude outbound connections and persistent changes. `package.json` and `.knit/deploy.yaml` are metadata, not runtime configuration.

## Operations

Run `npm run build`, then `node web-template.mjs`; the server listens on the configured port. Shutdown: send a process signal to close the server. Its externally observable workflow is serving the page and browser client routes described below. These are the application's operational boundaries: it opens no outbound connections and makes no persistent changes. To run browser validation, first execute `npm run puppeteer`, start the app, then run `npm run lighthouse`; output is written to ignored `artifacts/`. Build the container from the repository root with `docker build -t web-template .`. After GHCR publication, pull an exact version with `docker pull ghcr.io/eliware/web-template:<release-tag>`, where the tag is `vMAJOR.MINOR.PATCH`. Publication does not deploy the image; deployment requires a separate authorized GitOps handoff.

## Routes

| Method        | Path         | Result                             |
| ------------- | ------------ | ---------------------------------- |
| `GET`         | `/`          | Serves `public/index.html`.        |
| `GET`         | `/client.js` | Serves generated `dist/client.js`. |
| Other methods | Any path     | Returns HTTP 405.                  |
| `GET`         | Other paths  | Returns HTTP 404.                  |

## Assets

`public/` is the public source-asset root. `dist/client.js` is generated by webpack and served at `/client.js`; generated output does not belong in `public/`. The Docker image includes the generated client and public page.

## Development server

Build with `npm run build`, then run `node web-template.mjs`. Ports: the default port is 3000; set `PORT` to an integer from 1 through 65535 to choose another port. Install Chrome for Puppeteer with `npm run puppeteer`, then run `npm run lighthouse` while the server is available at `http://127.0.0.1:3000`. Lighthouse output goes to ignored `artifacts/lighthouse.json`. These browser checks are not part of automated Jest or CI validation.

## Build

`npm run build` uses the direct webpack dependency to bundle `src/client-entry.mjs` into `dist/client.js`. Aggregate `npm test` runs this build. `dist/` is generated output and is excluded from source control and public assets.

## Deployment

The repository owns the application, Dockerfile, and publication configuration. GHCR publication creates a versioned image; it does not deploy or start it. Deployment and rollback belong to an authorized GitOps handoff. The image name is `ghcr.io/eliware/web-template`; release tags use `vMAJOR.MINOR.PATCH`.

## Support

For help or discussion, join the Eliware community:

[![Discord](https://eliware.org/logos/discord_96.png)](https://discord.gg/M6aTR9eTwN)

**[eliware.org on Discord](https://discord.gg/M6aTR9eTwN)**

## License

[license](LICENSE)

## Links

- Documentation: [docs](docs/README.md) · [specifications](specs/README.md)
- [Canonical repository profile specifications](https://github.com/eliware/test/blob/main/specs/conventions/README.md)
- [Home Page](https://eliware.org)
- [GitHub Repo](https://github.com/eliware/web-template) (`git+https://github.com/eliware/web-template.git`)
- [GitHub Org](https://github.com/eliware)
- [Eli Sterling on GitHub](https://github.com/eli-sterling)
- [Discord](https://discord.gg/M6aTR9eTwN)
- [Release Notes](RELEASE_NOTES.md)
