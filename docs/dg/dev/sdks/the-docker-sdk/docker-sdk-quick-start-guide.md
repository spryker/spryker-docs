---
title: Docker SDK quick start guide
description: Get up and running quickly with this Quick start guide for Docker SDK for your Spryker projects.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/docker-sdk-quick-start-guide
originalArticleId: fc087f0f-e526-4519-a015-01022ac5d1f7
redirect_from:
- /docs/scos/dev/the-docker-sdk/202311.0/docker-sdk-quick-start-guide.html
- /docs/scos/dev/the-docker-sdk/202204.0/docker-sdk-quick-start-guide.html
- /docs/scos/dev/the-docker-sdk/202307.0/docker-sdk-quick-start-guide.html
- /docs/scos/dev/the-docker-sdk/202212.0/docker-sdk-quick-start-guide.html

related:
  - title: The Docker SDK
    link: docs/dg/dev/sdks/the-docker-sdk/the-docker-sdk.html
  - title: Docker environment infrastructure
    link: docs/dg/dev/sdks/the-docker-sdk/docker-environment-infrastructure.html
  - title: Configuring services
    link: docs/dg/dev/integrate-and-configure/configure-services.html
  - title: Docker SDK configuration reference
    link: docs/dg/dev/sdks/the-docker-sdk/docker-sdk-configuration-reference.html
  - title: Choosing a Docker SDK version
    link: docs/dg/dev/sdks/the-docker-sdk/choosing-a-docker-sdk-version.html
  - title: Choosing a mount mode
    link: docs/dg/dev/sdks/the-docker-sdk/choosing-a-mount-mode.html
  - title: Configuring a mount mode
    link: docs/dg/dev/sdks/the-docker-sdk/configure-a-mount-mode.html
  - title: Configuring access to private repositories
    link: docs/dg/dev/sdks/the-docker-sdk/configure-access-to-private-repositories.html
  - title: Configuring debugging in Docker
    link: docs/dg/dev/set-up-spryker-locally/configure-after-installing/configure-debugging/configure-debugging.html

---

This document describes how you can quickly set up a local environment with the Docker SDK.

## Running the Docker SDK in a local environment

To run the Docker SDK in a local environment, follow the instructions below.

### Installing Docker

For Docker installation instructions, see one of the following:
* [Install Docker prerequisites on MacOS](/docs/dg/dev/set-up-spryker-locally/install-spryker/install-docker-prerequisites/install-docker-prerequisites-on-macos.html)
* [Install Docker prerequisites on Linux](/docs/dg/dev/set-up-spryker-locally/install-spryker/install-docker-prerequisites/install-docker-prerequisites-on-linux.html)
* [Install Docker prerequisites on Windows with WSL1](/docs/dg/dev/set-up-spryker-locally/install-spryker/install-docker-prerequisites/install-docker-prerequisites-on-windows-with-wsl1.html).
* [Installing Docker prerequisites on Windowswith WSL2](/docs/dg/dev/set-up-spryker-locally/install-spryker/install-docker-prerequisites/install-docker-prerequisites-on-windows-with-wsl2.html).

### Setting up a project with the Docker SDK

To set up a local project with the Docker SDK:

1. Create the project directory and clone the source:

```bash
mkdir {project-name} && cd {project-name}
git clone https://github.com/{project-url} ./
```

2. Clone the latest version of the Docker SDK:

```bash
git clone git@github.com:spryker/docker-sdk.git docker
```


## Setting up a developer environment

To set up a developer environment:

1. Bootstrap docker setup, build and start the instance:

```bash
docker/sdk boot deploy.dev.yml
docker/sdk up
```

2. Switch to your project branch, re-build the application with assets and demo data from the new branch:

```bash
git checkout {your_branch}
docker/sdk boot deploy.dev.yml
docker/sdk up --build --assets --data
```

Depending on your requirements, you can select any combination of the following `up` command attributes. To fetch all the changes from the branch you switch to, we recommend running the command with all of them:

* `--build` - update composer, generate transfer objects, etc.
* `--assets` - build assets
* `--data` - fetch new demo data


## Setting up a production-like environment

To set up a production-like environment:

1. Bootstrap docker setup, build and start the instance:

```bash
docker/sdk boot deploy.*.yml
docker/sdk up
```

2. Switch to your project branch, re-build the application with assets and demo data from the new branch:

```bash
git checkout {your_branch_name}
docker/sdk boot
docker/sdk up --build --assets --data
```

Depending on your requirements, you can select any combination of the following `up` command attributes. To fetch all the changes from the branch you switch to, we recommend running the command with all of them:

* `--build` - update composer, generate transfer objects, etc.
* `--assets` - build assets
* `--data` - get new demo data


## Troubleshooting

For solutions to common issues, see [Spryker in Docker troubleshooting](/docs/dg/dev/set-up-spryker-locally/troubleshooting-installation/docker-daemon-is-not-running.html).


## Next steps

Documents to help you start developing your project:

* [Deploy file reference](/docs/dg/dev/sdks/the-docker-sdk/deploy-file/deploy-file-reference.html)
* [Docker SDK configuration reference](/docs/dg/dev/sdks/the-docker-sdk/docker-sdk-configuration-reference.html)
* [Configuring services](/docs/dg/dev/integrate-and-configure/configure-services.html)
