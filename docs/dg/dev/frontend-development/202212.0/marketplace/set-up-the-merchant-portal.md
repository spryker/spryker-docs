---
title: Set up the Merchant Portal
description: This document provides details about setting up Spryker Marketplace project.
template: howto-guide-template
last_updated: May 26, 2023
redirect_from:
  - /docs/marketplace/dev/front-end/202212.0/setting-up-the-merchant-portal.html
  - /docs/scos/dev/front-end-development/202212.0/marketplace/set-up-the-merchant-portal.html

related:
  - title: Building the project
    link: docs/dg/dev/frontend-development/page.version/marketplace/building-the-merchant-portal-frontend.html
---

This document provides details about how to set up the Spryker Merchant Portal.

## Prerequisites

To start using Merchant Portal, install Spryker Demo Shop:

* To install a Marketplace project, use [Spryker `suite` repository](https://github.com/spryker-shop/suite).  
* [Install the Spryker project](/docs/dg/dev/set-up-spryker-locally/set-up-spryker-locally.html).


## Requirements

To build Merchant Portal, install or update the following tools:
- [Node.js](https://nodejs.org/en/download/): minimum required version is 16.
- [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm/): minimum required version is 8.

## Overview

The main environmental differences between the existing frontends (Yves, Zed) and Merchant Portal are the following:  
- Minimum Node.js version is 16.
- Minimum npm version is 8.

Using a *unified* approach, all frontend dependencies must be installed in one step.

The entire project is now an *npm Workspace*, meaning each submodule declares its dependencies. During the installation stage, npm installs all of those dependencies and stores them into the root of the project.

## Install dependencies

```bash
npm install
```

## Build Merchant Portal

```bash
npm run mp:build
```

All available commands are listed in the `package.json` file in the root folder.

Once everything has been installed, you can access the UI of Merchant Portal by going to `$[local_domain]/security-merchant-portal-gui/login`.

All Merchant Portal modules are located in the `/vendor/spryker/spryker` directory.
