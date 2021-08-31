---
title: Installation
description: This article describes how to get started with the B2C Demo Marketplace.
template: concept-topic-template
---


This article describes how to get started with the B2C Demo Marketplace.

For detailed installation instructions, see [Installing Spryker with Docker](https://documentation.spryker.com/docs/installing-spryker-with-docker) or [Installing with Development Virtual Machine](https://documentation.spryker.com/docs/dev-getting-started#installing-spryker-with-development-virtual-machine).

## Prerequisites

For full installation prerequisites, see one of the following:

- [Installing Docker prerequisites on MacOS](https://documentation.spryker.com/docs/installing-docker-prerequisites-on-macos)
- [Installing Docker prerequisites on Linux](https://documentation.spryker.com/docs/installing-docker-prerequisites-on-linux)
- [Installing Docker prerequisites on Windows](https://documentation.spryker.com/docs/installing-docker-prerequisites-on-windows)

## Requirements

For recommended system requirements, see the following:

- [System requirements](/docs/marketplace/dev/setup/system-requirements.html)

## Installing the B2C Demo Marketplace

To install the B2C Demo Marketplace:

1. Create a project folder and clone the B2C Demo Marketplace and the Docker SDK:
```bash
mkdir spryker-b2c-marketplace && cd spryker-b2c-marketplace

git clone https://github.com/spryker-shop/b2c-demo-marketplace.git ./

git clone git@github.com:spryker/docker-sdk.git docker
```

2. Set up a desired environment:

- [Setting up a development environment](#setting-up-a-development-environment)
- [Setting up a production-like environment](#setting-up-a-production-like-environment)

### Setting up a development environment<a name="setting-up-a-development-environment"></a>

To set up a development environment:

1. Bootstrap the docker setup:

```bash
docker/sdk boot deploy.dev.yml
```

2. If the command you've run in the previous step returned instructions, follow them.

3. Build and start the instance:

```bash
docker/sdk up
```

You've set up your Spryker B2C Demo Marketplace and can access your applications.

### Setting up a production-like environment<a name="setting-up-a-production-like-environment"></a>

To set up a production-like environment:

1. Bootstrap the docker setup:

```bash
docker/sdk boot -s
```

2. If the command you've run in the previous step returned instructions, follow them.

3. Build and start the instance:

```bash
docker/sdk up
```

You've set up your Spryker B2C Demo Marketplace and can access your applications.

## Next steps

- For a troubleshooting, see [Troubleshooting Spryker in Docker issues](https://documentation.spryker.com/docs/troubleshooting-spryker-in-docker-issues) or [Troubleshooting Spryker in Vagrant installation issues](https://documentation.spryker.com/docs/troubleshooting-spryker-in-vagrant-installation-issues).
- Configuring debugging in [Docker](https://documentation.spryker.com/docs/configuring-debugging-in-docker) and in [Vagrant](https://documentation.spryker.com/docs/configuring-debugging-in-vagrant).
- See Glue API reference at [REST API reference](https://documentation.spryker.com/docs/rest-api-reference).
