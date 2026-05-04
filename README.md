# @getresponse/oxlint-config

[![npm version](https://badge.fury.io/js/@getresponse%2Foxlint-config.svg)](https://badge.fury.io/js/@getresponse%2Foxlint-config)
[![Build Status](https://github.com/GetResponse/oxlint-config/actions/workflows/main.yml/badge.svg)](https://github.com/GetResponse/oxlint-config/actions)
![Dependencies](https://img.shields.io/librariesio/github/GetResponse/oxlint-config.svg)
[![License](http://img.shields.io/:license-mit-blue.svg)](http://badges.mit-license.org)

---

An opinionated [Oxlint](https://oxc.rs/docs/guide/usage/linter) ruleset targeting TypeScript + React web apps.

## Requirements

- Oxlint `^1.62.0`
- Node `>=22.18` (or `^20.19`) — required by Oxlint's TypeScript config support

## Installation

```bash
npm i -D oxlint @getresponse/oxlint-config
```

For type-aware TypeScript rules (recommended for TS projects), also install `oxlint-tsgolint`:

```bash
npm i -D oxlint-tsgolint
```

## Usage

Create `oxlint.config.ts` in your project root:

```ts
import { defineConfig } from 'oxlint';
import config from '@getresponse/oxlint-config';

export default defineConfig({
    extends: [config],
});
```

With local overrides:

```ts
import { defineConfig } from 'oxlint';
import config from '@getresponse/oxlint-config';

export default defineConfig({
    extends: [config],
    overrides: [
        {
            files: ['src/legacy/**/*.ts'],
            rules: {
                'typescript/no-explicit-any': 'off',
            },
        },
    ],
});
```

Then run:

```bash
npx oxlint
```

## TypeScript

Oxlint walks up from each linted file to find the nearest `tsconfig.json` automatically. Type-aware rules require the `oxlint-tsgolint` package; this config enables them automatically when TypeScript is detected in your project's dependencies.

For most projects, no extra configuration is needed.

### When you might want a dedicated `tsconfig.oxlint.json`

The package does not look for or use a separate lint-time tsconfig (this differs from the old ESLint package which auto-detected `tsconfig.eslint.json`). If you need a different TS configuration for linting than for building, point oxlint at it via CLI:

```json
{
  "scripts": {
    "lint": "oxlint --tsconfig ./tsconfig.oxlint.json"
  }
}
```

Reasonable use cases:
- Your `tsconfig.json` excludes test files (`exclude: ["**/*.test.ts"]`) but you want type-aware rules to still work in tests
- Monorepo with several `tsconfig.json`s and you need oxlint to use a specific root
- Path mappings (`paths` / `baseUrl`) that exist only in a separate config

If none of these apply, skip it.

## Dynamic rules

Plugin rulesets are enabled automatically when the corresponding package is detected in your `package.json` dependencies:

| Detected dependency           | Preset enabled |
|-------------------------------|----------------|
| `typescript`                  | TypeScript rules (with type-aware analysis) |
| `react`                       | React + React Hooks rules |
| `jest`                        | Jest rules |
| `@playwright/test` / `playwright` | Playwright rules (scoped to test files via `playwright.config.*`) |

Files ignored by `.gitignore` are skipped automatically.

## Stylistic rules

Stylistic rules (`@stylistic/*`) are loaded via Oxlint's [JS Plugins](https://oxc.rs/docs/guide/usage/linter/js-plugins.html) bridge using `@stylistic/eslint-plugin` — Oxlint itself doesn't implement most stylistic rules natively. This trades raw speed for compatibility; if you switch to a dedicated formatter (e.g., `oxfmt`, Prettier), you can override these rules off in your local config.

## Mixins

Additional opt-in rulesets:

```ts
import { defineConfig } from 'oxlint';
import config from '@getresponse/oxlint-config';
import a11y from '@getresponse/oxlint-config/a11y';

export default defineConfig({
    extends: [config, a11y],
});
```

| Mixin                              | Description |
|------------------------------------|---|
| `@getresponse/oxlint-config/a11y`  | Accessibility rules from Oxlint's native `jsx-a11y` plugin, with extras bridged via `eslint-plugin-jsx-a11y` |

## Rules list

The web version of the rules list is available on [GitHub Pages](https://getresponse.github.io/oxlint-config/).
