---
title: Set up Oryx
description: Learn how to set up Oryx using a boilerplate project
last_updated: Apr 3, 2023
template: howto-guide-template
---

{% info_block warningBox %}

Oryx is currently running under an Early Access Release. Early Access Releases are subject to specific legal terms, they are unsupported and do not provide production-ready SLAs. They can also be deprecated without a General Availability Release. Nevertheless, we welcome feedback from early adopters on these cutting-edge, exploratory features.

{% endinfo_block %}

This document describes how to set up an environment for developing in the Oryx framework. We provide a [boilerplate project](https://github.com/spryker/composable-frontend) that helps you quickstart the development. It contains minimum dependencies and configuration to install a standard Oryx application.

## Prerequisites

- [Node.js](https://nodejs.org/) or a compatible Javascript runtime
- npm package manager

## Install Oryx with the boilerplate project

1. Download the boilerplate project and install dependencies:

```shell
git clone https://github.com/spryker/composable-frontend && \
cd composable-frontend && \
npm i
```

2. Run the application:

```shell
npm run dev
```

The application gets available at `localhost:3000`.

For more information about the boilerplate project, see the [boilerplate guide](/docs/scos/dev/front-end-development/{{page.version}}/oryx/oryx-boilerplate.html).

## Builders and bundlers for Oryx

The recommended build tool for Oryx is [Vite](https://vitejs.dev/). However, Oryx is compatible with a wide variety of build tools, like rollup, parcel or webpack. Since Oryx uses exports in every package to split logical parts to sub-packages, the build tool you choose must support [exporting entry points](https://nodejs.org/api/packages.html#package-entry-points) in `package.json`.

## Packages

Oryx [packages](/docs/scos/dev/front-end-development/{{page.version}}/oryx/oryx-packages.html) are distributed on [npmjs.com](https://www.npmjs.com/org/spryker-oryx).
