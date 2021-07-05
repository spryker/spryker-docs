---
title: Setting up the project
description: This article provides details about the setting up Spryker Marketplace project.
template: concept-topic-template
---


This article provides details about the setting up Spryker Marketplace project.

## Prerequisites
To start using Merchant Portal need to install Spryker demo-shop.  
Repository - https://github.com/spryker-shop/suite.  

Use one of the following guides to install the project:  
Via Docker - https://documentation.spryker.com/docs/installing-spryker-with-docker.  
Via Vagrant:  
- https://documentation.spryker.com/docs/b2b-b2c-demo-shop-installation-mac-os-or-linux-with-devvm.
- https://documentation.spryker.com/docs/b2b-b2c-demo-shop-installation-without-development-virtual-machine.
- https://documentation.spryker.com/docs/b2b-b2c-demo-shop-installation-windows-with-development-virtual-machine.  

## Requirements
To build Merchant Portal need to install/update next tools:  
- Node.js (minimum version is v12) - https://nodejs.org/en/download/.  
- Yarn (minimum version is v2) - https://classic.yarnpkg.com/en/docs/install/.

## Overview
The main environmental differences between existing Frontends (Yves, Zed) and Merchant Portal:  
- Minimum NodeJS version is v12.
- NPM is replaced by Yarn v2 with Workspaces.

The new “unified” approach of installing all Frontend dependencies via single step:  
- The whole project is now a “Yarn Workspace” which means that every submodule has it’s own declaration of dependencies and during install step Yarn aggregates all of those dependencies, installs them and hoists them up in the root folder of the project.

List of the required commands to install dependencies and build Merchant Portal: 
- `yarn install`
- `yarn mp:build`

List of all possible commands are listed in the `package.json` file in the root folder.

After everything is installed, UI of Merchant Portal is available via `${local_domain}/security-merchant-portal-gui/login` address. 
All Merchant Portal modules are located in the `/vendor/spryker/spryker` folder.
