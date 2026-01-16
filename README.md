# @pyyupsk/copyright

[![CI](https://github.com/pyyupsk/copyright/actions/workflows/ci.yml/badge.svg)](https://github.com/pyyupsk/copyright/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![npm](https://img.shields.io/npm/v/@pyyupsk/copyright)](https://www.npmjs.com/package/@pyyupsk/copyright)

A framework-agnostic TypeScript library for displaying copyright notices with auto year calculation, preset formats, custom templates, and React support.

## Features

- Auto year calculation with year ranges
- 4 preset formats (minimal, standard, full, legal)
- Custom template support with variable substitution
- HTML output with styling (className, style, tag)
- React component with declarative props API
- Direct DOM rendering via selector or Element reference
- Zero runtime dependencies for core library
- Dual ESM/CJS output
- Full TypeScript support

## Installation

```bash
npm install @pyyupsk/copyright
# or
bun add @pyyupsk/copyright
```

## Quick Start

### Basic Usage

```typescript
import { Copyright } from "@pyyupsk/copyright";

const copyright = new Copyright({ owner: "ACME Corp" });
console.log(copyright.getText()); // © 2026 ACME Corp
```

### Year Range

```typescript
const copyright = new Copyright({
  owner: "ACME Corp",
  startYear: 2020,
});
console.log(copyright.getText()); // © 2020-2026 ACME Corp
```

### Preset Formats

```typescript
const copyright = new Copyright({
  owner: "ACME Corp",
  format: "standard",
});
console.log(copyright.getText()); // Copyright © 2026 ACME Corp

// Available formats: minimal, standard, full, legal
```

### Custom Template

```typescript
const copyright = new Copyright({
  owner: "ACME Corp",
  template: "Made by {owner} in {year}",
});
console.log(copyright.getText()); // Made by ACME Corp in 2026

// Available variables: {symbol}, {year}, {owner}, {startYear}, {endYear}
```

### HTML Output

```typescript
const copyright = new Copyright({ owner: "ACME Corp" });

// Default span
console.log(copyright.toHTML());
// <span>© 2026 ACME Corp</span>

// With options
console.log(
  copyright.toHTML({
    tag: "footer",
    className: "copyright-text",
    style: { color: "gray" },
  }),
);
// <footer class="copyright-text" style="color: gray">© 2026 ACME Corp</footer>
```

### DOM Rendering

```typescript
const copyright = new Copyright({ owner: "ACME Corp" });

// Render to selector
copyright.render("#footer");

// Render to Element
const container = document.getElementById("footer");
copyright.render(container, { tag: "small", className: "text-muted" });
```

### React Component

```tsx
import { Copyright } from "@pyyupsk/copyright/react";

function Footer() {
  return (
    <Copyright
      owner="ACME Corp"
      startYear={2020}
      format="standard"
      as="footer"
      className="text-gray-500"
    />
  );
}
```

## API Reference

### `Copyright` Class

#### Constructor

```typescript
new Copyright(options: CopyrightOptions);
```

#### Options

| Option      | Type                                           | Default     | Description                 |
| ----------- | ---------------------------------------------- | ----------- | --------------------------- |
| `owner`     | `string`                                       | (required)  | Copyright owner name        |
| `startYear` | `number`                                       | current     | Start year for range        |
| `endYear`   | `number \| "auto"`                             | `"auto"`    | End year (auto = current)   |
| `format`    | `"minimal" \| "standard" \| "full" \| "legal"` | `"minimal"` | Preset format               |
| `template`  | `string`                                       | -           | Custom template (overrides) |

#### Methods

- `getText()` - Returns plain text copyright string
- `toHTML(options?)` - Returns HTML string with optional tag, className, style
- `render(target, options?)` - Renders to DOM element (selector or Element)
- `setOptions(options)` - Updates options (chainable)
- `static create(options)` - Factory method

### React `<Copyright />` Component

All `CopyrightOptions` plus:

| Prop        | Type     | Default  | Description    |
| ----------- | -------- | -------- | -------------- |
| `as`        | `string` | `"span"` | Element type   |
| `tag`       | `string` | `"span"` | Alias for `as` |
| `className` | `string` | -        | CSS class      |
| `style`     | `object` | -        | Inline styles  |

## License

[MIT](LICENSE)
