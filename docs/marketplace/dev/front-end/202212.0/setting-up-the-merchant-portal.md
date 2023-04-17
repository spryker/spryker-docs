---
title: Setting up the Merchant Portal
description: This document provides details about setting up Spryker Marketplace project.
template: howto-guide-template
related:
  - title: Building the project
    link: docs/marketplace/dev/front-end/page.version/building-the-project.html
---

This document provides details about how to set up the Spryker Merchant Portal.

## Prerequisites

To start using Merchant Portal, install Spryker Demo Shop:

1. For the Marketplace project installation, use [this repository](https://github.com/spryker-shop/suite).  
2. [Install the project](/docs/scos/dev/setup/installing-spryker-with-docker/installing-spryker-with-docker.html).


## Requirements

To build Merchant Portal, install or update the following tools:
- [Node.js](https://nodejs.org/en/download/)—minimum version is v16.
- [NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm/)—minimum version is v8.

## Overview

The main environmental differences between the existing frontends (Yves, Zed) and Merchant Portal are the following:  
- Minimum NodeJS version is v16.
- Minimum NPM version is v8.

Using a *unified* approach, all frontend dependencies must be installed in one step.

The entire project is now an *NPM Workspace*, meaning each submodule declares its dependencies. During the installation stage, NPM installs all of those dependencies and stores them into the root of the project.

## Install dependencies and build Merchant Portal

```bash
npm install
```

```bash
npm run mp:build
```

All available commands are listed in the `package.json` file in the root folder.

Once everything has been installed, you can access the UI of Merchant Portal by going to `$[local_domain]/security-merchant-portal-gui/login`.

All Merchant Portal modules are located in the `/vendor/spryker/spryker` directory.
