---
title: ESLint and Prettier in the Cypress boilerplate
description: Learn how the Cypress boilerplate project uses ESLint and Prettier to enforce code quality and formatting.
last_updated: Aug 6, 2026
template: concept-topic-template
related:
  - title: E2E Testing with Cypress
    link: docs/dg/dev/guidelines/testing-guidelines/cypress-testing.html
  - title: Plugins and libraries
    link: docs/dg/dev/guidelines/testing-guidelines/cypress-testing/plugins-and-libraries.html
  - title: Integrating Cypress tests into CI
    link: docs/dg/dev/guidelines/testing-guidelines/cypress-testing/integrating-cypress-tests-into-ci.html
---

ESLint and Prettier help maintain code quality and consistency in the cypress-boilerplate by enforcing coding standards and formatting rules.

- **ESLint** is a static code analysis tool that identifies and fixes problems in code. It enforces coding standards and helps catch syntax errors, potential bugs, and other problematic patterns.
- **Prettier** is an opinionated code formatter that ensures a consistent code style by automatically formatting your code. It supports multiple languages and integrates well with various editors and tools.

Both tools are already integrated into the boilerplate. The boilerplate keeps its own `package.json`, so ESLint, Prettier, and their plugins are installed inside the boilerplate directory and are independent of any linting the surrounding project performs.

## ESLint

### Configuration

ESLint uses the flat configuration format and is configured through `eslint.config.js`. There is no `.eslintrc` file, and ignore patterns live in the configuration itself rather than in an `.eslintignore` file.

```js
module.exports = [
  {
    ignores: ['node_modules', 'dist', '.envs'],
  },

  // TypeScript parser and plugin for .ts files
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: require('@typescript-eslint/parser'),
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
        ecmaVersion: 2023,
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': require('@typescript-eslint/eslint-plugin'),
    },
    rules: {},
  },

  // Cypress plugin for the test files
  {
    files: ['cypress/**/*.{js,ts}'],
    plugins: {
      cypress: require('eslint-plugin-cypress'),
    },
    rules: {},
  },

  // Basic JS handling
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2023,
      sourceType: 'module',
    },
    rules: {},
  },
]
```

The configuration is an array of blocks. Each block applies to the files matched by its `files` pattern:

- `ignores`: paths ESLint never looks at.
- `files`: the glob the block applies to.
- `languageOptions.parser`: `@typescript-eslint/parser`, so TypeScript can be parsed.
- `languageOptions.parserOptions.project`: points at `tsconfig.json`, which enables type-aware linting. A file that is not covered by `tsconfig.json` produces a parsing error rather than being skipped.
- `plugins`: makes a plugin's rules available under a namespace, for example, `@typescript-eslint` or `cypress`.
- `rules`: the rules that are actually enforced.

### Enabling rules

Flat configuration has no implicit `extends`: registering a plugin makes its rules available under a namespace, but does not turn any of them on. Rules are enforced only where they are listed in a `rules` block or brought in from a shared configuration.

To enforce a recommended set, spread it into the exported array and add your own rules after it:

```js
const tseslint = require('typescript-eslint')
const pluginCypress = require('eslint-plugin-cypress/flat')
const eslintConfigPrettier = require('eslint-config-prettier')

module.exports = [
  ...tseslint.configs.recommended,
  pluginCypress.configs.recommended,
  eslintConfigPrettier,
  {
    rules: {
      '@typescript-eslint/no-inferrable-types': 'error',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
]
```

Order matters: later entries override earlier ones, so put `eslint-config-prettier` last to switch off formatting rules that would otherwise conflict with Prettier.

### Running ESLint

Run from the boilerplate directory:

```bash
npm run lint:check
```

This runs `eslint .`, checks your code for linting errors, and displays them in the terminal.

### Automatically fixing ESLint errors

```bash
eslint . --fix
```

## Prettier

### Configuration

Prettier is configured through the `.prettierrc.json` file:

```json
{
  "semi": false,
  "tabWidth": 2,
  "useTabs": false,
  "singleQuote": true,
  "trailingComma": "es5",
  "bracketSpacing": true,
  "arrowParens": "always",
  "endOfLine": "auto"
}
```

- `semi`: `false` disables semicolons, except in a few scenarios.
- `tabWidth`: `2` sets two spaces per indentation level.
- `useTabs`: `false` uses spaces instead of tabs.
- `singleQuote`: `true` uses single quotes instead of double quotes.
- `trailingComma`: `es5` prints trailing commas wherever possible in ES5, such as in objects and arrays.
- `bracketSpacing`: `true` prints spaces between brackets in object literals.
- `arrowParens`: `always` always includes parentheses around arrow function parameters.
- `endOfLine`: `auto` maintains existing line endings.

Prettier resolves the nearest configuration file for each file it formats. Because this configuration sits inside the boilerplate directory, these rules apply to the boilerplate even when Prettier is invoked from a parent project that has its own, different configuration.

The `.prettierignore` file excludes paths from formatting:

```text
node_modules
workflows
```

### Running Prettier

```bash
npm run prettier:check
```

This runs `prettier . --check`, checks your code for style errors, and displays them in the terminal.

### Automatically fixing Prettier errors

```bash
prettier . --write
```

This formats your code according to the rules in `.prettierrc.json`.

## Running both checks

```bash
npm run code:check   # report ESLint and Prettier issues
npm run code:fix     # fix both
```

{% info_block warningBox "Do not use code:check as a pass/fail gate" %}

`code:check` is defined as `eslint . ; prettier . --check`. The `;` means the script exits with `Prettier's` status, so a failing ESLint run is reported as success. Use it to view all issues at once, but gate on the two commands separately:

```bash
npm run lint:check && npm run prettier:check
```

This is why CI runs them as two separate steps.

{% endinfo_block %}

## Resources

- [ESLint flat configuration](https://eslint.org/docs/latest/use/configure/configuration-files)
- [Prettier configuration options](https://prettier.io/docs/en/options.html)
