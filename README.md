# Stata Paper Script Generator

This scaffold provides a shared React and Electron project structure for a web app and a Windows EXE desktop app.

## Available scripts

- `npm run dev:web`
- `npm run build:web`
- `npm run build:electron`
- `npm run dev:desktop`
- `npm run build:desktop`

## Current scope

- Shared method definitions for descriptive, baseline, panel, DID, and IV.
- ini import and schema-based mapping.
- Built-in and user-defined Stata template management.
- Recent configuration persistence.
- Web UI scaffold and Electron desktop shell.

## ini format

The first release expects a versioned ini file with these sections:

- `[meta]`
- `[research]`
- `[variables]`
- `[output]`
- `[template]`
- `[advanced]`

See [import-guide.md](docs/import-guide.md) and [sample-config.ini](fixtures/sample-config.ini) for the exact structure.

## Notes

Dependencies are declared in `package.json` but may need to be installed before the project can run.
