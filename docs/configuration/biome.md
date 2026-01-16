# Biome Configuration

[Biome](https://biomejs.dev/) handles linting and formatting with a single, fast tool.

## Configuration File

The `biome.json` configures both linting and formatting:

::: tip Why local `$schema`?
We use `./node_modules/...` instead of remote URLs for the `$schema`. This ensures the schema matches your installed package version, works offline, and provides accurate autocomplete in your editor.
:::

```json
{
  "$schema": "./node_modules/@biomejs/biome/configuration_schema.json",
  "vcs": {
    "enabled": true,
    "clientKind": "git",
    "useIgnoreFile": true
  },
  "files": {
    "ignoreUnknown": false,
    "includes": ["**", "!docs/.vitepress/cache", "!docs/.vitepress/dist"]
  },
  "formatter": {
    "enabled": true,
    "indentStyle": "space",
    "indentWidth": 2
  },
  "linter": {
    "enabled": true,
    "rules": {
      "recommended": true
    }
  },
  "javascript": {
    "formatter": {
      "quoteStyle": "double"
    }
  },
  "assist": {
    "enabled": true,
    "actions": {
      "source": {
        "organizeImports": "on"
      }
    }
  }
}
```

## Features

### Linting

Biome includes rules for:

- Correctness - Catch bugs and errors
- Suspicious - Identify potentially problematic patterns
- Style - Enforce consistent code style
- Complexity - Avoid overly complex code

### Formatting

Consistent code formatting with:

- 2-space indentation
- Automatic import organization
- Consistent quotes and semicolons

### Import Organization

Imports are automatically sorted and grouped.

## Commands

```bash
# Check for issues
bun run lint

# Fix auto-fixable issues
bun run lint:fix

# Format code
bun run format
```

## Customization

### Ignoring Files

```json
{
  "files": {
    "includes": ["**", "!dist", "!node_modules", "!coverage"]
  }
}
```

### Adjusting Rules

```json
{
  "linter": {
    "rules": {
      "style": {
        "noNonNullAssertion": "off"
      }
    }
  }
}
```

### Changing Formatting

```json
{
  "formatter": {
    "indentStyle": "tab",
    "lineWidth": 100
  }
}
```

## Integration

Biome runs automatically:

- On pre-commit via Lefthook
- In CI via GitHub Actions
- In your editor with the Biome extension
