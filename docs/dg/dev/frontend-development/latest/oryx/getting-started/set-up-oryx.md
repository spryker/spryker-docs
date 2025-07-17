---
title: Set up Oryx
description: Learn how to set up Oryx using a boilerplate project
last_updated: Apr 3, 2023
template: howto-guide-template
redirect_from:
  - /docs/scos/dev/front-end-development/202404.0/oryx/set-up-oryx.html
  - /docs/scos/dev/front-end-development/202404.0/oryx/getting-started/set-up-oryx.html

---

This document describes how to set up an environment for developing in the Oryx framework. We provide a [boilerplate project](https://github.com/spryker/composable-frontend) that helps you quickstart the development. It contains minimum dependencies and configuration to install a standard Oryx application.

## Prerequisites

- [Node.js](https://nodejs.org/) or a compatible Javascript runtime
- npm package manager

## Install Oryx with the boilerplate project

1. Clone the boilerplate project and install dependencies.  

```shell
git clone https://github.com/spryker/composable-frontend && \
cd composable-frontend && \
npm i
```


2. Optional: To install [Fulfillment App](/docs/pbc/all/warehouse-management-system/latest/unified-commerce/fulfillment-app-overview.html) instead of Composable Storefront, checkout the `fulfillment` branch from the boilerplate:

```shell
git checkout fulfillment
```

{% info_block infoBox "Fulfillment App" %}

Fulfillment App is a PWA that comes with an additional build process for the service worker to support offline mode and background sync.

{% endinfo_block %}


3. Run the application:

```shell
npm run dev
```

The application gets available at `localhost:3000`.

For more information about the boilerplate project, see the [boilerplate guide](/docs/dg/dev/frontend-development/latest/oryx/getting-started/oryx-boilerplate.html).

## Builders and bundlers for Oryx

The recommended build tool for Oryx is [Vite](https://vitejs.dev/). However, Oryx is compatible with a wide variety of build tools, like rollup, parcel or webpack. Since Oryx uses exports in every package to split logical parts to sub-packages, the build tool you choose must support [exporting entry points](https://nodejs.org/api/packages.html#package-entry-points) in `package.json`.

## Packages

Oryx [packages](/docs/dg/dev/frontend-development/latest/oryx/getting-started/oryx-packages.html) are distributed on [npmjs.com](https://www.npmjs.com/org/spryker-oryx).
