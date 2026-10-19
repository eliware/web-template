# Release Notes

## 13.0.0 — 2026-10-19

### Added

- Add full-page browser screenshots with configurable URL and output file.
- Add a Fastify API example with request and response schemas.
- Add PWA metadata, custom template icons, offline page support, and desktop and mobile screenshots.
- Add a Docker Compose setup that publishes port 1020 and checks the health and readiness routes.
- Add browser screenshot and Lighthouse audit scripts.
- Organize server and browser code under `src/backend/` and `src/frontend/`.

### Changed

- Align repository guidance, package metadata, dependencies, and workflows with v13 conventions.
- Document routes, configuration, image access, browser checks, and deployment steps.
- Match the GHCR workflow with the shared specification and update the Knit command sequence.
- Text responses use the default character set.
- Set the default server port to 1020 and expose the same port through the container.
- Resolve asset paths from configured roots and preserve filesystem errors.
- Return 404 for unknown asset paths and 405 for unsupported methods.
- Wait for the offline worker shell before activation and retry shutdown after close failures.
- Split route handling, server setup, configuration, screenshots, and API contracts into focused modules.
- Upgrade Fastify, Lighthouse, Puppeteer, webpack, and Eliware Test dependencies.
- Add template replacement notes to the documentation.

## 12.0.0 — 2026-10-12

### Changed

- Align package metadata, documentation, and validation with v12 conventions.
- Update shared packages and container validation workflows.
- Document routes, assets, builds, browser checks, and image deployment.
- Keep image publication separate from deployment.

## 11.0.0 — 2026-10-03

### Changed

- Align repository metadata, documentation, specifications, and workflows with the v11 conventions.
