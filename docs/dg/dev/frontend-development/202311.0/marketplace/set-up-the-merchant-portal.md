---
title: Set up the Merchant Portal
last_updated: May 15, 2023
description: This document provides details about setting up Spryker Marketplace project.
template: howto-guide-template
redirect_from:
  - /docs/marketplace/dev/front-end/202304.0/setting-up-the-merchant-portal.html
  - /docs/scos/dev/front-end-development/202204.0/marketplace/set-up-the-merchant-portal.html
  - /docs/scos/dev/front-end-development/202311.0/marketplace/set-up-the-merchant-portal.html

related:
  - title: Building the project
    link: docs/dg/dev/frontend-development/page.version/marketplace/set-up-the-merchant-portal.html
---

This document provides details about how to set up the Spryker Merchant Portal.

## Prerequisites

To start using Merchant Portal, install Spryker Demo Shop:

1. For the Marketplace project installation, use [this repository](https://github.com/spryker-shop/suite).  
2. [Install the project](/docs/dg/dev/set-up-spryker-locally/set-up-spryker-locally.html).


## Requirements

To build Merchant Portal, install or update the following tools:
- [Node.js](https://nodejs.org/en/download/)—minimum version is v18.
- [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm/)—minimum version is v9.

## Overview

The main environmental differences between the existing frontends (Yves, Zed) and Merchant Portal are the following:  
- Minimum Node.js version is v18.
- Minimum npm version is v9.

Using a *unified* approach, all frontend dependencies must be installed in one step.

The entire project is now an *npm workspace*, meaning each submodule declares its dependencies. During the installation stage, npm installs all of those dependencies and stores them into the root of the project.

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
