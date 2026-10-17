# AGENTS.md

## Project

This repository is `eliware/web-template`.

It starts Node.js web applications.

## Scope and boundaries

Use README.md for repository purpose, scope, and ownership.

## Layout

Use README.md and specs/README.md to find repository files.

## Development

Keep each source and test module focused on one responsibility.

## Validation

Use Node.js 26 or later and npm 12 or later.
Use native ESM for maintained JavaScript modules.
Run `npm test` for aggregate validation.
Run `npm run lint` for lint checks.
Run `npm run audit` for dependency checks.

Run `npm run format` to format files.
Run `npm run format:check` to check formatting.

## Security

Keep credentials, secret values, private data, and runtime state out of Git.

## Changes

Keep changes in this repository.
Use Eliware Operations for approval before external changes.

## Application

Document entrypoints, workflows, settings, startup, and shutdown in README.md.

Run focused tests first during development.
Run one test file with `npm test -- tests/path/to/example.test.mjs`.
Run multiple test files with `npm test -- tests/path/to/first.test.mjs tests/path/to/second.test.mjs`.
Prevent repeated full-suite runs during development.
Run the full `npm test` suite for final validation before a commit, milestone, or release.

## Web

Document routes, assets, build output, and browser checks in README.md.

## GHCR publication

Image: ghcr.io/eliware/web-template

Pull command: docker pull ghcr.io/eliware/web-template:v13.0.0

Supported tags: vMAJOR.MINOR.PATCH

Deployment boundary: Publication does not deploy. Use an immutable version tag and record its SHA-256 digest.

Document image purpose, access, and deployment use in README.md.
