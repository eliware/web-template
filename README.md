# [![eliware.org](https://eliware.org/logos/brand.png)](https://discord.gg/M6aTR9eTwN)

## @eliware/web-template [![License](https://img.shields.io/github/license/eliware/web-template)](https://github.com/eliware/web-template/blob/main/LICENSE) [![CI](https://github.com/eliware/web-template/actions/workflows/ci.yaml/badge.svg)](https://github.com/eliware/web-template/actions/workflows/ci.yaml)

A Node.js web application template with explicit assets, routes, build, and deployment boundaries.

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
- [Links](#links)
- [License](#license)

## Features

This template provides a reusable starting point. Each derived repository owns its product behavior and operating decisions.

## Requirements

Use Node.js 26 or later and npm 12 or later for repository validation.

## Setup

Create a repository from this template. Replace the template name, description, URLs, keywords, and sample content.
Run `npm ci` from the repository root.

## Usage

Follow this README and the [user guide](docs/README.md). Read [release notes](RELEASE_NOTES.md) for release history.

## Development

Read [AGENTS.md](AGENTS.md) and [the specifications index](specs/README.md) before you change files.
Keep documents and records in the repository that owns them.

## Testing

Run `npm test` before handoff. It runs the repository checks through `eliware-test`.

## Troubleshooting

Install the required Node.js and npm versions. Run `npm ci` after dependency changes.
Review the file and rule in any validation error.

## Security

Keep credentials, secrets, private data, and runtime state out of Git.
Use only approved secret stores for secret values.

## Configuration

`PORT` defaults to `3000` and accepts integers from `1` through `65535`. `LOG_LEVEL` defaults to `info`.
Set `LOG_LEVEL` to `error`, `warn`, `info`, `http`, `verbose`, `debug`, or `silly`.

## Operations

Run `npm run build`, then run `node bin/web-template.mjs`. The server listens on port `3000` by default.
Build the image with `docker build -t web-template .`. Deploy a released version tag with its recorded SHA-256 digest.
Image publication does not deploy the site.

## Routes

| Method        | Path         | Result                      |
| ------------- | ------------ | --------------------------- |
| `GET`         | `/`          | Serves `public/index.html`. |
| `GET`         | `/client.js` | Serves `dist/client.js`.    |
| Other methods | Any path     | Returns HTTP 405.           |
| `GET`         | Other paths  | Returns HTTP 404.           |

## Assets

Keep source assets in `public/`. The build creates `dist/client.js`.
Keep generated files out of `public/`. The image includes the page and browser bundle.

## Development server

Run `npm run build`, then run `node bin/web-template.mjs`.
Run `npm run puppeteer` to install Chrome. Start the server, then run `npm run lighthouse`. The report goes to ignored `artifacts/`.

## Build

Run `npm run build` to bundle `src/client-entry.mjs` as `dist/client.js`.
The aggregate `npm test` command runs the build. The build output is generated and does not belong in source control.

## Deployment

The repository owns the application, image, and publication configuration.
Publication does not deploy or start the site. Use an approved GitOps handoff for deployment and rollback.

## Support

For help, questions, or to chat with the author and community, visit:

[![Discord](https://eliware.org/logos/discord_96.png)](https://discord.gg/M6aTR9eTwN)[![eliware.org](https://eliware.org/logos/eliware_96.png)](https://discord.gg/M6aTR9eTwN)

**[eliware.org on Discord](https://discord.gg/M6aTR9eTwN)**

## Links

- [Home Page](https://eliware.org)
- [GitHub Org](https://github.com/eliware)
- [GitHub Repo](https://github.com/eliware/web-template)
- [Bug Reports](https://github.com/eliware/web-template/issues)
- [Discord](https://discord.gg/M6aTR9eTwN)

## License

[MIT © Eliware](LICENSE)
