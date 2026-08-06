---
title: ESLint and Prettier in the Cypress boilerplate
description: Learn how the Cypress boilerplate project uses ESLint and Prettier to enforce code quality and formatting.
last_updated: Aug 4, 2026
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

Both tools are already integrated into the boilerplate.

## ESLint

### Configuration

ESLint is configured through the `.eslintrc` file:

```json
{
  "root": true,
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint"],
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:cypress/recommended",
    "plugin:prettier/recommended"
  ],
  "parserOptions": {
    "ecmaVersion": 2018,
    "sourceType": "module",
    "project": "./tsconfig.json"
  },
  "rules": {
    "@typescript-eslint/no-inferrable-types": "error",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-explicit-any": "off"
  }
}
```

- `root`: indicates that this is the root configuration file.
- `parser`: specifies `@typescript-eslint/parser` as the parser for TypeScript.
- `plugins`: specifies the ESLint plugins to use.
- `extends`: extends the configuration with recommended rule sets:
  - `eslint:recommended`: recommended rules from ESLint.
  - `plugin:@typescript-eslint/eslint-recommended`: disables ESLint rules already covered by TypeScript.
  - `plugin:@typescript-eslint/recommended`: recommended rules from `@typescript-eslint`.
  - `plugin:cypress/recommended`: recommended rules from the Cypress plugin.
  - `plugin:prettier/recommended`: integrates Prettier with ESLint.
- `parserOptions`: specifies the parser options, including the ECMAScript version, the source type, and the path to the TypeScript configuration file.
- `rules`: specifies custom rules, for example, disabling `@typescript-eslint/explicit-function-return-type` and `@typescript-eslint/no-explicit-any`.

Use a `.eslintignore` file to exclude files and directories from ESLint analysis, for example:

```text
node_modules
```

### Running ESLint

```bash
eslint .
```

This checks your code for linting errors and displays them in the terminal.

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

Use a `.prettierignore` file to exclude files and directories from Prettier formatting, for example:

```text
node_modules
```

### Running Prettier

```bash
prettier . --check
```

This checks your code for style errors and displays them in the terminal.

### Automatically fixing Prettier errors

```bash
prettier . --write
```

This formats your code according to the rules in `.prettierrc.json`.

## Resources

- [ESLint configuration options](https://eslint.org/docs/latest/use/configure/)
- [Prettier configuration options](https://prettier.io/docs/en/options.html)
