# Stata Paper Script Generator

This project provides a shared React and Electron scaffold for a web app and a Windows desktop EXE that generates editable Stata paper scripts from structured form input.

## Current scope

- Shared method definitions for descriptive, baseline, panel, DID, and IV.
- ini import, export, and schema-based field mapping.
- Built-in and user-defined Stata template management.
- Recent configuration persistence.
- Shared web UI and Electron desktop shell.
- Chinese-first UI copy and prompts.

## Scripts

- `npm run dev:web`: start the Vite web dev server.
- `npm run dev:desktop`: build the web/Electron entrypoints and launch Electron.
- `npm run build:web`: build the web assets.
- `npm run build:electron`: compile the Electron main process.
- `npm run build`: build web and Electron artifacts.
- `npm run clean:desktop`: stop the running desktop app and clean previous desktop artifacts.
- `npm run build:desktop`: produce the Windows portable EXE build.

## Desktop output

`npm run build:desktop` writes artifacts to `release/`.

Common outputs:

- `release/Stata Script Generator 0.1.0.exe`: portable desktop EXE.
- `release/win-unpacked/`: unpacked app directory.
- `release/win-unpacked/Stata Script Generator.exe`: unpacked executable.

## ini format

The first release expects a versioned ini file with these sections:

- `[meta]`
- `[research]`
- `[variables]`
- `[output]`
- `[template]`
- `[advanced]`

See [docs/import-guide.md](docs/import-guide.md) and [fixtures/sample-config.ini](fixtures/sample-config.ini) for the exact structure.

## Notes

- `npm run build` does not create the desktop EXE. Use `npm run build:desktop`.
- The current desktop target is a portable EXE rather than an installer.
- The first desktop build may still need to download Electron Builder Windows resources.
