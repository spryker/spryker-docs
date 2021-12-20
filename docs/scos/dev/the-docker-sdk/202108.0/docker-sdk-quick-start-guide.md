---
title: Docker SDK quick start guide
description: Get started with Spryker Docker SDK.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/docker-sdk-quick-start-guide
originalArticleId: fc087f0f-e526-4519-a015-01022ac5d1f7
redirect_from:
  - /2021080/docs/docker-sdk-quick-start-guide
  - /2021080/docs/en/docker-sdk-quick-start-guide
  - /docs/docker-sdk-quick-start-guide
  - /docs/en/docker-sdk-quick-start-guide
---

This document describes how you can quickly set up a local environment with the Docker SDK.

## Running the Docker SDK in a local environment

To run the Docker SDK in a local environment, follow the instructions below.

### Installing Docker

For Docker installation instructions, see one of the following:
* [Installing Docker prerequisites on MacOS](/docs/scos/dev/setup/installing-spryker-with-docker/docker-installation-prerequisites/installing-docker-prerequisites-on-macos.html)
* [Installing Docker prerequisites on Linux](/docs/scos/dev/setup/installing-spryker-with-docker/docker-installation-prerequisites/installing-docker-prerequisites-on-linux.html)
* [Installing Docker prerequisites on Windows with WSL1](/docs/scos/dev/setup/installing-spryker-with-docker/docker-installation-prerequisites/installing-docker-prerequisites-on-windows-with-wsl1.html).
* [Installing Docker prerequisites on Windowswith WSL2](/docs/scos/dev/setup/installing-spryker-with-docker/docker-installation-prerequisites/installing-docker-prerequisites-on-windows-with-wsl2.html).

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


## Setting up a developer environemnt

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
- `--build` - update composer, generate transfer objects, etc.
- `--assets` - build assets
- `--data` - fetch new demo data


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
- `--build` - update composer, generate transfer objects, etc.
- `--assets` - build assets
- `--data` - get new demo data


## Troubleshooting

For solutions to common issues, see [Spryker in Docker troubleshooting](/docs/scos/dev/troubleshooting/troubleshooting-spryker-in-docker-issues/troubleshooting-docker-installation/docker-daemon-is-not-running.html).


## What documents should I use to start developing and configuring my project?

* [Deploy file reference - 1.0](/docs/scos/dev/the-docker-sdk/{{page.version}}/deploy-file/deploy-file-reference-1.0.html)
* [Docker SDK configuration reference](/docs/scos/dev/the-docker-sdk/{{page.version}}/docker-sdk-configuration-reference.html)
* [Configuring services](/docs/scos/dev/the-docker-sdk/{{page.version}}/configuring-services.html)
