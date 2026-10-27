# Release Notes

## 15.0.1 — 2026-10-26

### Added

- Add a Fastify API example with request, path, query, and response schemas.
- Add `/health` and `/ready` status routes.
- Add an installable web app manifest, template icons, offline support, and desktop and mobile screenshots.
- Add browser screenshot and Lighthouse commands for performance, best practices, SEO, accessibility, and PWA checks.
- Add a Docker Compose setup with health and readiness checks.
- Add documentation for API schemas, routes, assets, builds, browser checks, and deployment.
- Add CI validation with full Git history and a version-tagged GHCR publication workflow.

### Changed

- Set the package version to 15.0.1 and update Eliware Common and Eliware Test to 15.0.1.
- Organize server, browser, and shared code under `src/backend/`, `src/frontend/`, and `src/shared/`.
- Build the browser bundle with webpack in `dist/` and use TCP endpoint 1020 by default.
- Align workflows, repository guidance, and user documentation with Eliware Test v15 conventions.
- Document GHCR version tags and keep image publication separate from deployment.
- Run environment loading before reading runtime settings from `process.env`.
- Wait for cache cleanup before the offline worker claims control of pages.

### Fixed

- Keep asset reads inside configured roots and preserve file system errors.
- Return 404 for unknown asset paths and 405 for unsupported methods.
- Retry server shutdown after close failures.
- Correct the documented scope of `npm test` and separate build validation.

## 12.0.0 — 2026-10-12

### Changed

- Align package metadata, documentation, and validation with v12 conventions.
- Update shared packages and container validation workflows.
- Document routes, assets, builds, browser checks, and image deployment.
- Keep image publication separate from deployment.

## 11.0.0 — 2026-10-03

### Changed

- Align repository metadata, documentation, specifications, and workflows with the v11 conventions.
