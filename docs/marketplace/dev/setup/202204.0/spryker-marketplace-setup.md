---
title: Spryker Marketplace Setup
description: This document describes how to get started with the B2C Demo Marketplace.
template: concept-topic-template
redirect_from:
  - /docs/marketplace/dev/setup/spryker-marketplace-setup.html
---

This document describes how to get started with the B2C Demo Marketplace.

{% info_block infoBox "Info" %}

The B2C Demo Marketplace installation process described in this document is based on the [Spryker in Docker installation](/docs/scos/dev/set-up-spryker-locally/set-up-spryker-locally.html). You can also install the B2C Demo Marketplace based on Vagrant. To do so, use [Installing Spryker with the Development Virtual Machine](/docs/scos/dev/developer-getting-started-guide.html) for reference and adapt this installation guide to installation in Vagrant.

{% endinfo_block %}

## Prerequisites

Depending on the OS you use, check out the following installation prerequisites:

- [Install Docker prerequisites on MacOS](/docs/scos/dev/set-up-spryker-locally/install-spryker/install-docker-prerequisites/install-docker-prerequisites-on-macos.html)
- [Install Docker prerequisites on Linux](/docs/scos/dev/set-up-spryker-locally/install-spryker/install-docker-prerequisites/install-docker-prerequisites-on-linux.html)
- [Installing Docker prerequisites on Windows](/docs/scos/dev/set-up-spryker-locally/install-spryker/install-docker-prerequisites/install-docker-prerequisites-on-windows-with-wsl2.html)

## Installing the B2C Demo Marketplace

To install the B2C Demo Marketplace:

1. Create a project folder and clone the B2C Demo Marketplace and the Docker SDK:

```bash
mkdir spryker-b2c-marketplace && cd spryker-b2c-marketplace

git clone https://github.com/spryker-shop/b2c-demo-marketplace.git ./

git clone https://github.com/spryker/docker-sdk.git docker
```

2. Set up the environment you need:

- [Prerequisites](#prerequisites)
- [Installing the B2C Demo Marketplace](#installing-the-b2c-demo-marketplace)
  - [Setting up a development environment](#setting-up-a-development-environment)
  - [Setting up a production-like environment](#setting-up-a-production-like-environment)
- [Next steps](#next-steps)

### Setting up a development environment

To set up a development environment:

1. Bootstrap the docker setup:

```bash
docker/sdk boot deploy.dev.yml
```

2. If the command you've run in the previous step returned instructions, follow them.

3. Build and start an instance:

```bash
docker/sdk up
```

That's it. You've set up your Spryker B2C Demo Marketplace and can access your applications.

### Setting up a production-like environment

To set up a production-like environment:

1. Bootstrap the Docker setup:

```bash
docker/sdk boot -s
```

2. If the command you've run in the previous step returned instructions, follow them.

3. Build and start the instance:

```bash
docker/sdk up
```

That's it. You've set up your Spryker B2C Demo Marketplace and can access your applications.

## Next steps

- For troubleshooting, see [Troubleshooting Spryker in Docker issues](/docs/scos/dev/set-up-spryker-locally/troubleshooting-installation/troubleshooting-installation.html).
- Configuring debugging in [Docker](/docs/scos/dev/the-docker-sdk/{{page.version}}/configuring-debugging-in-docker.html).
- See Glue API reference at [REST API reference](/docs/scos/dev/glue-api-guides/{{page.version}}/rest-api-b2b-reference.html).
