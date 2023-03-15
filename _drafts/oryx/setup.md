# Setup

This guide explains how to set up your environment for Oryx framework development.

## Prerequisites

To use the Oryx framework, you should be familiar with the following:

- Javascript
- CSS
- HTML

Knowledge of Typescript will be a plus but it's not required.

To install Oryx on your local system, you need the following:

- active LTS or maintenance LTS version of [Node.js](https://nodejs.org/)
- npm package manager
- [Git](https://git-scm.com/) version control system

Also you need to have [Spryker backend](https://docs.spryker.com/docs/scos/dev/setup/setup.html) up and running.

## Installation

To start working with Oryx you will need a tiny boilerplate project. In this project you will find all the necessary configuration, dependencies and code to start working with Oryx.

Clone bootstrap repository:

`git clone https://github.com/spryker/composable-frontend`

To install application you just need to install npm dependencies:

```npm i```

## Run application

To run application:

```npm run dev```

Application will be available on `localhost:3000` by default.

Follow boilerplate guide for more information - see Boilerplate article.

## Builders/bundlers

Oryx framework is compatible with every modern frontend builder/bundler, such as rollup, vite, webpack, etc.
The only limitation it should support [exports](https://nodejs.org/api/packages.html#package-entry-points) entry point in package.json.

## Packages

All Oryx framework packages provides their code as ES Modules which is a standard in frontend web development nowadays.
