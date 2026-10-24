# Release Notes

## 15.0.0 — 2026-10-24

### Added

- Add a Fastify API example with request, path, query, and response schemas.
- Add `/health` and `/ready` status routes.
- Add a web app manifest, custom template icons, offline page support, and desktop and mobile screenshots.
- Add browser screenshot and Lighthouse audit commands for performance, best practices, SEO, accessibility, and PWA behavior.
- Add a Docker Compose setup that publishes port 1020 and checks the health and readiness routes.
- Add documentation for API schemas, routes, assets, browser checks, builds, and deployment.

### Changed

- Set the package and specification versions to 15.0.0 and 15.0.
- Refresh Node.js dependencies: Eliware Common, Eliware Test, dotenv, Puppeteer, and webpack.
- Organize server, browser, and shared code under `src/backend/`, `src/frontend/`, and `src/shared/`.
- Build the browser bundle with webpack for `dist/`.
- Set the default server port and container port to 1020.
- Match the GHCR workflow with the canonical Eliware Test v15 workflow.
- Align repository guidance and user documentation with Eliware Test v15 conventions.

### Fixed

- Keep asset reads inside configured roots and preserve file system errors.
- Return 404 for unknown asset paths and 405 for unsupported methods.
- Wait for the offline worker shell before activation.
- Retry server shutdown after close failures.

## 12.0.0 — 2026-10-12

### Changed

- Align package metadata, documentation, and validation with v12 conventions.
- Update shared packages and container validation workflows.
- Document routes, assets, builds, browser checks, and image deployment.
- Keep image publication separate from deployment.

## 11.0.0 — 2026-10-03

### Changed

- Align repository metadata, documentation, specifications, and workflows with the v11 conventions.
