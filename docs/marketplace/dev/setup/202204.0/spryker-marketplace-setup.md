---
title: Spryker Marketplace Setup
description: This document describes how to get started with the B2C Demo Marketplace.
template: concept-topic-template
redirect_from:
  - /docs/marketplace/dev/setup/spryker-marketplace-setup.html
---

This document describes how to get started with the Demo Marketplace. 

{% info_block infoBox "Info" %}

The Marketplace installation process described in this document is based on the [Spryker in Docker installation](/docs/scos/dev/setup/installing-spryker-with-docker/installing-spryker-with-docker.html).

{% endinfo_block %}

## Prerequisites

Depending on the OS you use, check out the following installation prerequisites:

- [Installing Docker prerequisites on MacOS](/docs/scos/dev/setup/installing-spryker-with-docker/docker-installation-prerequisites/installing-docker-prerequisites-on-macos.html)
- [Installing Docker prerequisites on Linux](/docs/scos/dev/setup/installing-spryker-with-docker/docker-installation-prerequisites/installing-docker-prerequisites-on-linux.html)
- [Installing Docker prerequisites on Windows](/docs/scos/dev/setup/installing-spryker-with-docker/docker-installation-prerequisites/installing-docker-prerequisites-on-windows-with-wsl2.html)

## Clone the Marketplace Demo Shop repository

Depending on the desired Marketplace Demo Shop, clone one of the following repositories:

- B2C Demo Marketplace:

```bash
mkdir spryker-b2c-marketplace && cd spryker-b2c-marketplace

git clone https://github.com/spryker-shop/b2c-demo-marketplace.git ./

git clone https://github.com/spryker/docker-sdk.git docker
```

- B2B Demo Marketplace:
  
```bash
mkdir spryker-b2b-marketplace && cd spryker-b2b-marketplace

git clone https://github.com/spryker-shop/b2b-demo-marketplace.git ./

git clone https://github.com/spryker/docker-sdk.git docker
```

1. Set up the environment you need:

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

- For troubleshooting, see [Troubleshooting Spryker in Docker issues](/docs/scos/dev/troubleshooting/troubleshooting-spryker-in-docker-issues/troubleshooting-spryker-in-docker-issues.html).
- Configuring debugging in [Docker](/docs/scos/dev/the-docker-sdk/{{page.version}}/configuring-debugging-in-docker.html).
- See Glue API reference at [REST API reference](/docs/scos/dev/glue-api-guides/{{page.version}}/rest-api-reference.html).
