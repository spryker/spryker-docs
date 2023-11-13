---
title: Set up Fulfillment App
description: Learn how to set up Fulfillment App using a boilerplate project
last_updated: Now 13, 2023
template: howto-guide-template
---

{% info_block warningBox %}

Fulfillment App is currently running under an Early Access Release. Early Access Releases are subject to specific legal terms, they are unsupported and do not provide production-ready SLAs. They can also be deprecated without a General Availability Release. Nevertheless, we welcome feedback from early adopters on these cutting-edge, exploratory features.

{% endinfo_block %}

This document describes how to set up local environment for Fulfillment App. We provide a [boilerplate project](https://github.com/spryker/composable-frontend) that helps you quickstart the development. It contains minimum dependencies and configuration to install Fulfillment App.
Fulfillment App is build with Oryx, to learn more about Oryx, see [Oryx documentation](https://documentation.spryker.com/docs/oryx).

## Prerequisites

- [Node.js](https://nodejs.org/) or a compatible Javascript runtime
- npm package manager

## Install Fulfillment App with the boilerplate project

1. Download the boilerplate project and install dependencies:

```shell
git clone https://github.com/spryker/composable-frontend && \
cd composable-frontend && \
git checkout fulfillment && \
npm i
```

2. Run the application:

```shell
npm run dev
```

The application gets available at `localhost:4200`.

## Builders and bundlers for Fulfillment App

The recommended build tool for Fulfillment App is [Vite](https://vitejs.dev/). However, Fulfillment App is compatible with a wide variety of build tools, like rollup, parcel or webpack.
