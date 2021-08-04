---
title: Docker SDK quick start guide
originalLink: https://documentation.spryker.com/2021080/docs/docker-sdk-quick-start-guide
redirect_from:
  - /2021080/docs/docker-sdk-quick-start-guide
  - /2021080/docs/en/docker-sdk-quick-start-guide
---

This document describes how you can quickly set up a local environment with the Docker SDK.

## Running the Docker SDK in a local environment

To run the Docker SDK in a local environment, follow the instructions below.

### Installing Docker

For Docker installation instructions, see one of the following:
* [Installing Docker prerequisites on MacOS](https://documentation.spryker.com/docs/installing-docker-prerequisites-on-macos)
* [Installing Docker prerequisites on Linux](https://documentation.spryker.com/docs/installing-docker-prerequisites-on-linux)
* [Installing Docker prerequisites on Windows](https://documentation.spryker.com/docs/installing-docker-prerequisites-on-windows)

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

For solutions to common issues, see [Spryker in Docker troubleshooting](https://documentation.spryker.com/docs/spryker-in-docker-troubleshooting).


## What documents should I use to start developing and configuring my project?

* [Deploy file reference - 1.0](https://documentation.spryker.com/docs/deploy-file-reference-10)
* [Docker SDK configuration reference](https://documentation.spryker.com/docs/docker-sdk-configuration-reference)
* [Configuring services](https://documentation.spryker.com/docs/configuring-services)

