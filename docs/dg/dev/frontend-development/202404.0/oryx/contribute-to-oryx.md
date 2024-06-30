---
title: Contribute to Oryx
description: Learn how you can contribute to the development of Oryx
template: howto-guide-template
---

This document describes how you can contribute to the development of the Oryx frontend framework. It provides details on setting up a development environment, understanding our contribution process, and guidelines for submitting your contributions.

## Prerequisites

- [Node.js](https://nodejs.org/) or a compatible Javascript runtime
- npm package manager

## Semantic versioning

Oryx follows semantic versioning. We release patch versions for critical bug fixes, minor versions for new features or non-essential changes, and major versions for any breaking changes. When we make breaking changes, we also introduce deprecation warnings in a minor version so that our users learn about the upcoming changes and migrate their code in advance. For more details, see [Oryx versioning](/docs/scos/dev/front-end-development/{{page.version}}/oryx/getting-started/oryx-versioning.html).

## Branch organization

Submit all changes directly to the `development` branch. We do our best to keep `development` in a good shape, with all tests passing.

Code that gets merged into master must be compatible with the latest minor release. It may contain additional features, but no breaking changes.

## Submit pull requests

1. Fork the [Oryx repository](https://github.com/oryx-frontend/oryx).
2. Create a brunch based on the master.
3. Run `npm install` in the repository root.  
4. Add your changes. For more details, see [Development workflow](#development-workflow)
5. If you’ve added code that should be tested, add tests.
6. Create a PR. Provide a clear and concise description of your changes in the PR's description.
7. If the required checks are failing, look into fixing them.

We'll review the PR and get back to you as soon as possible.

## Development workflow

After cloning the repository, run `npm install` in the repository root. This installs all dependencies for all packages.
Now you can run `npm run start` to start the development server for the Storefront. The server will automatically reload if you change any of the source files.

Useful commands:
- Prettier:
  - Check the code: `npm run format:check`
  - Fix the code: `npm run format:write`
- Linters:
  - Typescript: `npx nx run-many --target=lint --all --parallel=2`
  - Styles: `npx nx run-many --target=stylelint --all --parallel=2`
- Unit tests:
  - Run all tests: `npx nx run-many --target=test --all --parallel=2`
  - Run tests for a specific package: `npx nx run <package-name>:test`  
- e2e tests:
  - Run all tests in production mode: `npm run sf:e2e:headless:ci`
  - Open Cypress test runner: `npm run sf:e2e:open`  

## Next steps

[Oryx packages structure](/docs/dg/dev/frontend-development/{{page.version}}/oryx/getting-started/oryx-packages.html).
