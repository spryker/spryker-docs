# Setup

This guide explains how to set up your environment for Oryx framework development.

## Prerequisites

To install Oryx on your local system, you need the following:

- [Node.js](https://nodejs.org/) or compatible Javascript runtime
- npm package manager
- A [Spryker storefront API](https://docs.spryker.com/docs/scos/dev/glue-api-guides/202204.0/glue-rest-api.html) (a public API is provided by default to get you up and running quick)

## Installation

To install Oryx you can use the [boilerplate project](https://github.com/spryker/composable-frontend) that we've prepared for you. In this repository you'll find the minimum dependencies and configuration to install a standard Oryx application.

The installation can be done with the following steps. This will install the dependencies and run the application.

```
git clone https://github.com/spryker/composable-frontend
cd composable-frontend
npm i
npm run dev
```

Application will be available on `localhost:3000` by default.

To better understand how the minimal boilerplate works, you can find more details in the [boilerplate guide](./boilerplate.md).

## Builders/bundlers

The recommended build tool for Oryx is [Vite](https://vitejs.dev/). However, Oryx is compatible with a wide variety of build tools, such as rollup, parcel, webpack, etc.
The build tool must [support exporting entry points](https://nodejs.org/api/packages.html#package-entry-points) in package.json (since Oryx uses exports in every package to split logical parts to sub-packages).

## Packages

Oryx is distributed on [npmjs.com](https://www.npmjs.com/org/spryker-oryx).  
