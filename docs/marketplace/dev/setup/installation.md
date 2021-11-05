---
title: Installation
description: This article describes how to get started with the B2C Demo Marketplace.
template: concept-topic-template
---

This article describes how to get started with the B2C Demo Marketplace.

For the detailed installation instructions, see [Installing Spryker with Docker](/docs/scos/dev/setup/installing-spryker-with-docker/installing-spryker-with-docker.html) or [Installing Spryker with the Development Virtual Machine](/docs/scos/dev/developer-getting-started-guide.html).

## Prerequisites

For the entire installation prerequisites, see one of the following:

- [Installing Docker prerequisites on MacOS](/docs/scos/dev/setup/installing-spryker-with-docker/docker-installation-prerequisites/installing-docker-prerequisites-on-macos.html)
- [Installing Docker prerequisites on Linux](/docs/scos/dev/setup/installing-spryker-with-docker/docker-installation-prerequisites/installing-docker-prerequisites-on-linux.html)
- [Installing Docker prerequisites on Windows](/docs/scos/dev/setup/installing-spryker-with-docker/docker-installation-prerequisites/installing-docker-prerequisites-on-windows-with-wsl2.html)

## Requirements

For the recommended system requirements, see [System requirements](/docs/marketplace/dev/setup/system-requirements.html).

## Installing the B2C Demo Marketplace

To install the B2C Demo Marketplace:

1. Create a project folder and clone the B2C Demo Marketplace and the Docker SDK:

```bash
mkdir spryker-b2c-marketplace && cd spryker-b2c-marketplace

git clone https://github.com/spryker-shop/b2c-demo-marketplace.git ./

git clone git@github.com:spryker/docker-sdk.git docker
```

2. Set up a desired environment:

- [Development environment](#setting-up-a-development-environment)
- [Production-like environment](#setting-up-a-production-like-environment)

### Setting up a development environment<a name="setting-up-a-development-environment"></a>

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

- For troubleshooting, see [Troubleshooting Spryker in Docker issues](/docs/scos/dev/troubleshooting/troubleshooting-spryker-in-docker-issues/troubleshooting-spryker-in-docker-issues.html) or [Troubleshooting Spryker in Vagrant installation issues](/docs/scos/dev/troubleshooting/troubleshooting-spryker-in-vagrant-issues/troubleshooting-spryker-in-vagrant-installation-issues.html).
- Configuring debugging in [Docker](/docs/scos/dev/the-docker-sdk/{{site.version}}/configuring-debugging-in-docker.html) and in [Vagrant](/docs/scos/dev/setup/installing-spryker-with-vagrant/debugger-configuration/configuring-debugging-in-vagrant.html).
- See Glue API reference at [REST API reference](/docs/scos/dev/glue-api-guides/{{site.version}}/rest-api-reference.html).
