---
title: How to contribute to the Oryx
description: The guide describes how to contribute to the Oryx framework
template: howto-guide-template
---

# Contributing to Oryx

Welcome to the Oryx Framework Contribution Guide! We appreciate your interest in contributing to Oryx and becoming part of our community. 

This guide provides essential information to help you get started with contributing to the development of the Oryx frontend framework. Whether you're a seasoned developer or just getting started, your contributions are valuable to us. In this guide, you'll find details on setting up your development environment, understanding our contribution process, and guidelines for submitting your contributions. 

## Prerequisites

- [Node.js](https://nodejs.org/) or a compatible Javascript runtime
- npm package manager

## Semantic Versioning

Oryx follows semantic versioning. We release patch versions for critical bugfixes, minor versions for new features or non-essential changes, and major versions for any breaking changes. When we make breaking changes, we also introduce deprecation warnings in a minor version so that our users learn about the upcoming changes and migrate their code in advance. Learn more about it - [Oryx versioning](/docs/scos/dev/front-end-development/{{page.version}}/oryx/getting-started/oryx-versioning.html)

## Branch Organization

Submit all changes directly to the `development` branch. We do our best to keep `development` in a good shape, with all tests passing.
Code that lands in main must be compatible with the latest minor release. It may contain additional features, but no breaking changes. 

## Sending a Pull Request

Oryx team is monitoring open pull requests. We will review your pull request and either merge it, request changes to it or close it with an explanation. We’ll do our best to provide updates and feedback throughout the process.

How to send a pull request:

- Fork [Oryx repository](https://github.com/spryker/oryx) and create your branch from main.
- Run `npm install` in the repository root.  
- If you’ve added code that should be tested, add tests.
- Ensure all GitHub actions required checks are passed.
- Provide a clear and concise description of your changes in the pull request description.

## Development Workflow

After cloning the repository, run `npm install` in the repository root. This will install all dependencies for all packages.
Now you can run `npm run start` to start the development server for the Storefront. The server will automatically reload if you change any of the source files.

Useful commands:
- Prettier: 
  - Check the code - `npm run format:check`
  - Fix the code - `npm run format:write`
- Linters: 
  - Typescript - `npx nx run-many --target=lint --all --parallel=2` 
  - Styles - `npx nx run-many --target=stylelint --all --parallel=2`
- Unit tests: 
  - Run all tests - `npx nx run-many --target=test --all --parallel=2`
  - Run tests for a specific package - `npx nx run <package-name>:test`  
- e2e tests: 
  - Run all tests in production mode - `npm run sf:e2e:headless:ci`
  - Open Cypress test runner - `npm run sf:e2e:open`  

What's next - read about [Oryx packages structure](/docs/scos/dev/front-end-development/{{page.version}}/oryx/getting-started/oryx-packages.html).
