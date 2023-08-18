---
title: Install the latest version of Docker SDK
description: This document describes how to install the latest version of Docker SDK.
template: howto-guide-template
---


## Resources for migration

 Backend


## The Docker SDK is not installed

1. Follow the [installation guide](/docs/scos/dev/set-up-spryker-locally/install-spryker/install-docker-prerequisites/install-docker-prerequisites-on-macos.html).
2. Run the following command from the root of the project `git clone git@github.com:spryker/docker-sdk.git docker`.
3. Commit and push the changes.

## The Docker SDK is installed but outdated

1. Follow the [installation guide](/docs/scos/dev/set-up-spryker-locally/install-spryker/install-docker-prerequisites/install-docker-prerequisites-on-macos.html).
2. To update the Docker SDK, run the following command  `git submodule update --init --force docker`.
3. Commit and push the changes.
