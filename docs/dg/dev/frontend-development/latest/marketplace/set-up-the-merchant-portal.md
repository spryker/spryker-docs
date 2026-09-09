---
title: Set up the Merchant Portal
last_updated: Sep 9, 2026
description: This document provides details about setting up Spryker Marketplace project.
template: howto-guide-template
redirect_from:
  - /docs/marketplace/dev/front-end/202304.0/setting-up-the-merchant-portal.html
  - /docs/scos/dev/front-end-development/202204.0/marketplace/set-up-the-merchant-portal.html
  - /docs/scos/dev/front-end-development/202404.0/marketplace/set-up-the-merchant-portal.html

related:
  - title: Building the project
    link: docs/dg/dev/frontend-development/latest/marketplace/set-up-the-merchant-portal.html
  - title: Frontend builder for the Merchant Portal v2
    link: docs/dg/dev/frontend-development/latest/marketplace/frontend-builder-for-merchant-portal-v2.html
---

This document provides details about how to set up the Spryker Merchant Portal.

## Prerequisites

To start using Merchant Portal, install Spryker Demo Shop:

1. For the Marketplace project installation, use [this repository](https://github.com/spryker-shop/suite).  
2. [Install the project](/docs/dg/dev/set-up-spryker-locally/set-up-spryker-locally.html).


## Requirements

To build Merchant Portal, install or update the following tools:
- [Node.js](https://nodejs.org/en/download/package-manager) — minimum version is v24.15.0. Node.js 25 is not supported by Angular 22.
- [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm/) — minimum version is v10.

## Overview

The main environmental differences between the existing frontends (Yves, Zed) and Merchant Portal are the following:  
- Minimum Node.js version is v24.15.0.
- Minimum npm version is v10.

Using a *unified* approach, all frontend dependencies must be installed in one step.

The entire project is an *npm workspace*. The vendor packages are declared as workspaces in the project `package.json`, and the Merchant Portal dependency set is declared by the ZedUi module rather than by each Merchant Portal module. During the installation stage, npm installs all of those dependencies and stores them into the root of the project.

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
