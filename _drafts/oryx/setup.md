# Set up Oryx

This document describes how to set up an environment for developing in the Oryx framework. We provide a [boilerplate project](https://github.com/spryker/composable-frontend) that helps you quickstart the development. It contains minimum dependencies and configuration to install a standard Oryx application.

## Prerequisites

* [Node.js](https://nodejs.org/) or a compatible Javascript runtime.
* npm package manager.
* A [Spryker Storefront API](/docs/scos/dev/glue-api-guides/{{site.version}}/glue-rest-api.html). A public API is provided with the   (a public API is provided by default to get you up and running quick)

## Install Oryx


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

The application should now be available at `localhost:3000`.

To better understand how the minimal boilerplate works, you can find more details in the [boilerplate guide](./boilerplate.md).

## Builders/bundlers

The recommended build tool for Oryx is [Vite](https://vitejs.dev/). However, Oryx is compatible with a wide variety of build tools, such as rollup, parcel, webpack, etc.
The build tool must [support exporting entry points](https://nodejs.org/api/packages.html#package-entry-points) in package.json (since Oryx uses exports in every package to split logical parts to sub-packages).

## Packages

Oryx is distributed on [npmjs.com](https://www.npmjs.com/org/spryker-oryx).  
