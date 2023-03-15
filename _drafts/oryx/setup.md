# Setup

This guide explains how to set up your environment for Oryx framework development.

## Prerequisites

To use the Oryx framework, you should be familiar with the following:

- Javascript
- CSS
- HTML

To install Oryx on your local system, you need the following:

- active LTS or maintenance LTS version of [Node.js](https://nodejs.org/) or compatible Javascript runtime
- npm package manager

Also you need to have [Spryker Glue API](https://docs.spryker.com/docs/scos/dev/glue-api-guides/202204.0/glue-rest-api.html) up and running.

## Installation

To start working with Oryx you can use the [boilerplate project](https://github.com/spryker/composable-frontend) that we've prepared for you. In this repository you'll will find the minimum dependencies and configuration to install a standard Oryx application.

There is a list of commands to clone repository, install dependencies and run the application:

```
git clone https://github.com/spryker/composable-frontend
cd composable-frontend
npm i
npm run dev
```

Application will be available on `localhost:3000` by default.

Follow boilerplate guide for more information - see Boilerplate article.

## Builders/bundlers

The best choice to start with Oryx framework is Vite, but Oryx is also compatible with every modern frontend builder/bundler, such as rollup, parcel, webpack, etc.
The build tool must support [exports](https://nodejs.org/api/packages.html#package-entry-points) entry point in package.json as long as Oryx is using it in every package to split logical part of package into sub-packages.

## Packages

All Oryx framework packages provides their code as [ES Modules](https://nodejs.org/dist/latest-v13.x/docs/api/esm.html#esm_ecmascript_modules).
