# npm-ts-template

[![CI](https://github.com/pyyupsk/npm-ts-template/actions/workflows/ci.yml/badge.svg)](https://github.com/pyyupsk/npm-ts-template/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=pyyupsk_npm-ts-template&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=pyyupsk_npm-ts-template)

A zero-config TypeScript library template with modern tooling. Start building your npm package in seconds.

## Quick Start

1. Click **[Use this template](https://github.com/pyyupsk/npm-ts-template/generate)** to create your repository
2. Clone and install:

   ```bash
   git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
   cd YOUR_REPO
   bun install
   ```

3. Update `package.json` with your package name and details
4. Start coding in `src/index.ts`

## Features

- **TypeScript 5.x** with strict mode
- **Dual ESM/CJS** output via tsdown
- **Biome** for linting and formatting
- **ESLint** with JSDoc and SonarJS for documentation and code quality
- **Vitest** for testing with coverage
- **Lefthook** for git hooks
- **Changesets** for versioning and publishing
- **GitHub Actions** for CI/CD

## Documentation

For detailed guides on configuration, testing, and publishing:

**[View Documentation](https://pyyupsk.github.io/npm-ts-template/)**

## Scripts

| Script              | Description            |
| ------------------- | ---------------------- |
| `bun run build`     | Build ESM/CJS bundles  |
| `bun run dev`       | Build in watch mode    |
| `bun run test`      | Run tests              |
| `bun run lint`      | Check code quality     |
| `bun run typecheck` | Check TypeScript types |
| `bun run changeset` | Create a changeset     |

## License

[MIT](LICENSE)
