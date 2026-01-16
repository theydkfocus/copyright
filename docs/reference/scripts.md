# Scripts Reference

All available npm scripts and their purposes.

## Build Scripts

| Script  | Command          | Description                    |
| ------- | ---------------- | ------------------------------ |
| `build` | `tsdown`         | Build ESM/CJS bundles to dist/ |
| `dev`   | `tsdown --watch` | Build in watch mode            |

### Build Output

After running `bun run build`:

```
dist/
├── index.mjs       # ESM bundle
├── index.cjs       # CommonJS bundle
├── index.d.mts     # ESM type declarations
└── index.d.cts     # CJS type declarations
```

## Test Scripts

| Script          | Command                 | Description             |
| --------------- | ----------------------- | ----------------------- |
| `test`          | `vitest run`            | Run tests once          |
| `test:watch`    | `vitest`                | Run tests in watch mode |
| `test:coverage` | `vitest run --coverage` | Run tests with coverage |

### Coverage Output

After `bun run test:coverage`:

```
coverage/
├── html/           # Interactive HTML report
├── coverage-final.json  # JSON data for CI
└── text output     # Terminal summary
```

## Lint Scripts

| Script      | Command                                 | Description             |
| ----------- | --------------------------------------- | ----------------------- |
| `lint`      | `biome check . && eslint`               | Check code quality      |
| `lint:fix`  | `biome check --write . && eslint --fix` | Fix auto-fixable issues |
| `lint:docs` | `eslint`                                | Check JSDoc only        |
| `format`    | `biome format --write .`                | Format code             |
| `typecheck` | `tsc --noEmit`                          | Check TypeScript types  |

## Quality Scripts

| Script | Command | Description           |
| ------ | ------- | --------------------- |
| `knip` | `knip`  | Find unused code/deps |

### Knip Output

Shows unused:

- Exports
- Dependencies
- Files
- Types

## Release Scripts

| Script      | Command             | Description              |
| ----------- | ------------------- | ------------------------ |
| `changeset` | `changeset`         | Create a changeset       |
| `release`   | `changeset publish` | Publish to npm (CI only) |

## Documentation Scripts

| Script         | Command                  | Description               |
| -------------- | ------------------------ | ------------------------- |
| `docs:dev`     | `vitepress dev docs`     | Start docs dev server     |
| `docs:build`   | `vitepress build docs`   | Build docs for production |
| `docs:preview` | `vitepress preview docs` | Preview built docs        |

## Setup Scripts

| Script    | Command            | Description       |
| --------- | ------------------ | ----------------- |
| `prepare` | `lefthook install` | Install git hooks |

Runs automatically after `bun install`.

## Common Workflows

### Development

```bash
# Start development
bun run dev          # Watch mode build
bun run test:watch   # Watch mode tests
```

### Before Committing

```bash
# Manual checks (also run automatically by Lefthook)
bun run lint
bun run typecheck
bun run test
```

### Before Releasing

```bash
# Full validation
bun run build
bun run lint
bun run typecheck
bun run test:coverage
bun run knip

# Create changeset
bun run changeset
```

### Documentation

```bash
# Local development
bun run docs:dev

# Build and preview
bun run docs:build
bun run docs:preview
```

## Exit Codes

All scripts return:

- `0` - Success
- `1` - Failure (errors found)

Failed scripts block git commits (via Lefthook) and CI builds.
