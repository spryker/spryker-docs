---
title: Setting up the project
description: This article provides details about setting up Spryker Marketplace project.
template: howto-guide-templat
---


This article provides details on how to set up the Spryker Marketplace project.

## Prerequisites
To start using Merchant Portal, install Spryker demo-shop:
1. Use [this repository](https://github.com/spryker-shop/suite) for the Marketplace project installation.  
2. Install the project using one of the following guides: 
    - [Spryker installation using Docker](https://documentation.spryker.com/docs/installing-spryker-with-docker)
    - Spryker installation using Vagrant: 
        - [DevVM on Linux / Mac OS](https://documentation.spryker.com/docs/b2b-b2c-demo-shop-installation-mac-os-or-linux-with-devvm)
        - [DevVM on Windows](https://documentation.spryker.com/docs/b2b-b2c-demo-shop-installation-windows-with-development-virtual-machine)
        - [Without DevVM](https://documentation.spryker.com/docs/b2b-b2c-demo-shop-installation-without-development-virtual-machine)
 

## Requirements
To build Merchant Portal, install or update the following tools:  
- [Node.js](https://nodejs.org/en/download/) - minimum version is v12.
- [Yarn](https://classic.yarnpkg.com/en/docs/install/) - minimum version is v2.

## Overview
The main environmental differences between the existing front-ends (Yves, Zed) and Merchant Portal are:  
- Minimum NodeJS version is v12.
- NPM is replaced by Yarn v2 with Workspaces.

Using a "unified" approach, all front-end dependencies must be installed in one step:
- The entire project is now a "Yarn Workspace," meaning each submodule declares its dependencies. During the installation stage, Yarn installs all of those dependencies and hoists them up into the root of the project.

## Install dependencies and build Merchant Portal

```yarn
yarn install
```

```yarn
yarn mp:build
```

All possible commands are listed in the `package.json` file in the root folder.

Once everything has been installed, you can access the UI of Merchant Portal by going to `$[local_domain]/security-merchant-portal-gui/login`.

All Merchant Portal modules are located in the `/vendor/spryker/spryker` directory.
