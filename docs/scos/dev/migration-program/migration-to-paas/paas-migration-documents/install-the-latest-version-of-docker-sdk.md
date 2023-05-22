---
title: Install the latest version of Docker SDK
description: This document describes how to install the latest version of Docker SDK.
template: howto-guide-template
---

# Install the latest version of Docker SDK

{% info_block infoBox %}

## Resources Backend

{% endinfo_block %}

## If Docker SDK is not installed

1. Follow the [installation guide](/docs/scos/dev/setup/installing-spryker-with-docker/docker-installation-prerequisites/installing-docker-prerequisites-on-macos.html#system-requirements-for-installing-spryker-with-docker).
2. Run the following command from the root of the project `git clone git@github.com:spryker/docker-sdk.git docker`.
3. Commit and push changes.

## If Docker SDK is outdated

1. Follow the [installation guide](/docs/scos/dev/setup/installing-spryker-with-docker/docker-installation-prerequisites/installing-docker-prerequisites-on-macos.html#system-requirements-for-installing-spryker-with-docker).
2. Run the following command to update Docker SDK `git submodule update --init --force docker`.
3. Commit and push changes.
