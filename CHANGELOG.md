# Changelog

All notable changes to this project will be documented in this file.

## [0.1.2] - 2026-01-16

### 🚀 Features

- *(ci)* Switch to git-cliff for changelog generation

### 🐛 Bug Fixes

- *(ci)* Integrate changelogithub into release workflow
- *(ci)* Avoid expanding secrets in run block
- *(ci)* Use setup-node for secure npm authentication
- *(ci)* Use GH_PAT for checkout to bypass branch ruleset

### 🚜 Refactor

- *(ci)* Replace changesets with manual release workflow

## [0.1.1] - 2026-01-07

### 🐛 Bug Fixes

- *(ci)* Configure npm auth for publishing
- *(ci)* Pass npm token via env variable, push tags after publish
- *(ci)* Resolve release workflow issues ([#3](https://github.com/pyyupsk/npm-ts-template/issues/3))
- *(deps)* Override esbuild to fix security vulnerability
- *(ci)* Wrap version command in bash for shell operators
- *(ci)* Use single quotes for bash command
- *(ci)* Add changeset:version script to avoid shell quoting issues

### 🚜 Refactor

- *(ts)* Extend `@tsconfig/strictest` for multi-target flexibility
- *(ci)* Use changesets/action for release workflow

### ⚙️ Miscellaneous Tasks

- Add changeset for v0.1.1

## [0.1.0] - 2026-01-05

### 🚀 Features

- Add ESLint with JSDoc linting
- Add SonarJS ESLint plugin for code quality analysis

### 🐛 Bug Fixes

- *(ci)* Use dynamic version in release commit message
- *(ci)* Add GITHUB_TOKEN for changelog-github plugin

### 📚 Documentation

- Add VitePress documentation site
- Add favicon for documentation site
- Add documentation guide and update CI/CD guide
- Add repository settings documentation to CI/CD guide

### ⚙️ Miscellaneous Tasks

- Add GitHub Actions workflow for docs deployment
- Move permissions to job level in docs workflow
- Add changeset for v0.1.0 and configure changelog-github

## [0.0.0] - 2026-01-05

### 🚀 Features

- Add project tooling, source, and tests
- Add GitHub workflows and project configuration
- Add changelog workflow for release notes generation

### ⚙️ Miscellaneous Tasks

- Initial project setup
- Scope package under @pyyupsk namespace
