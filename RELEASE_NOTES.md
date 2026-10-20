# Release Notes

## 14.0.0 — 2026-10-20

### Added

- Add full-page browser screenshots with configurable URLs and output files.
- Add a Fastify API example with request and response schemas.
- Add PWA metadata, custom template icons, offline page support, and desktop and mobile screenshots.
- Add Docker Compose health checks for the health and readiness routes.
- Add browser screenshot and Lighthouse audit scripts.
- Organize server, browser, and shared code under `src/backend/`, `src/frontend/`, and `src/shared/`.

### Changed

- Set the package version to 14.0.0 and align the specification, documentation, and image guidance with v14 conventions.
- Update `@eliware/common` and Puppeteer to their latest available versions.
- Match the GHCR workflow byte for byte with the canonical workflow and update Knit deployment commands.
- Document routes, configuration, image access, browser checks, and deployment steps.
- Text responses use the default character set.
- Set the default server port to 1020 and publish the same port through the container.
- Resolve asset paths from configured roots and preserve file system errors.
- Return 404 for unknown asset paths and 405 for unsupported methods.
- Wait for the offline worker shell before activation and retry shutdown after close failures.
- Split route handling, server setup, configuration, screenshots, and API contracts into focused modules.
- Upgrade Fastify, Lighthouse, Puppeteer, webpack, and Eliware Test dependencies.
- Add template replacement and troubleshooting guidance to the README and user guide.

## 12.0.0 — 2026-10-12

### Changed

- Align package metadata, documentation, and validation with v12 conventions.
- Update shared packages and container validation workflows.
- Document routes, assets, builds, browser checks, and image deployment.
- Keep image publication separate from deployment.

## 11.0.0 — 2026-10-03

### Changed

- Align repository metadata, documentation, specifications, and workflows with the v11 conventions.
