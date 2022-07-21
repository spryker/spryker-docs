---
title: Setting up the Merchant Portal
description: This document provides details about setting up Spryker Marketplace project.
template: howto-guide-template
related:
  - title: Building the project
    link: docs/marketplace/dev/front-end/building-the-project.html
---

This document provides details about how to set up the Spryker Merchant Portal.

## Prerequisites

To start using Merchant Portal, install Spryker demo-shop:

1. Use [this repository](https://github.com/spryker-shop/suite) for the Marketplace project installation.  
2. Install the project using one of the following guides:

* [Installing Spryker with Docker](/docs/scos/dev/setup/installing-spryker-with-docker/installing-spryker-with-docker.html)
* [Installing Spryker with Development Virtual Machine](/docs/scos/dev/setup/installing-spryker-with-development-virtual-machine/installing-spryker-with-development-virtual-machine.html)
* [Installing Spryker without Development Virtual Machine or Docker](/docs/scos/dev/setup/installing-spryker-without-development-virtual-machine-or-docker.html)


## Requirements

To build Merchant Portal, install or update the following tools:

- [Node.js](https://nodejs.org/en/download/) - minimum version is v16.
- [NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm/) - minimum version is v8.

## Overview

The main environmental differences between the existing frontends (Yves, Zed) and Merchant Portal are:  

- Minimum NodeJS version is v16.
- Minimum NPM version is v8.

Using a "unified" approach, all frontend dependencies must be installed in one step

- The entire project is now a "NPM Workspace", meaning each submodule declares its dependencies. During the installation stage, NPM installs all of those dependencies and hoists them up into the root of the project.

## Install dependencies and build Merchant Portal

```bash
npm install
```

```bash
npm run mp:build
```

All possible commands are listed in the `package.json` file in the root folder.

Once everything has been installed, you can access the UI of Merchant Portal by going to `$[local_domain]/security-merchant-portal-gui/login`.

All Merchant Portal modules are located in the `/vendor/spryker/spryker` directory.
