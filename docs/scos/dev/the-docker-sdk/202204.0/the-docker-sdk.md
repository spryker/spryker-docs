---
title: The Docker SDK
description: Spryker Docker SDK is a tool that builds a production-like Docker infrustructure for Spryker.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/docker-sdk
originalArticleId: f609f764-f3f8-472a-b4ad-331c115947c9
redirect_from:
  - /2021080/docs/docker-sdk
  - /2021080/docs/en/docker-sdk
  - /docs/docker-sdk
  - /docs/en/docker-sdk
related:
  - title: Deploy File Reference - 1.0
    link: docs/scos/dev/the-docker-sdk/page.version/deploy-file/deploy-file-reference-1.0.html
---

Spryker Docker SDK is a tool designed to help you set up docker environment for your Spryker project.

The tool builds a production-like Docker infrastructure for Spryker based on the provided [Deploy file](/docs/scos/dev/the-docker-sdk/{{page.version}}/deploy-file/deploy-file-reference-1.0.html).

Spryker Docker SDK is used for the following purposes:

1. Building production-like Docker images.
2. Serving as part of development environment based on Docker.
3. Simplifying the process of setting up a local demo of Spryker project.

This document provides details on the Docker SDK configuration, commands, and the repository structure.

## docker-sdk repository structure

The [docker-sdk repository](https://github.com/spryker/docker-sdk) contains the following folders:

* [bin](https://github.com/spryker/docker-sdk/tree/master/bin): structured sh commands that are copied and used in the containers.
* [ci](https://github.com/spryker/docker-sdk/tree/master/ci): Travis deployment pipeline, basic tests.
* [context](https://github.com/spryker/docker-sdk/tree/master/context): service configurations, such as php, mysql, nginx, etc.
* [deployment](https://github.com/spryker/docker-sdk/tree/master/deployment): generated Docker images, configs, and assets to build containers.
* [docs](https://github.com/spryker/docker-sdk/tree/master/docs): documentation
* [generator](https://github.com/spryker/docker-sdk/tree/master/generator): generator of the `deployment` folder.
* [images](https://github.com/spryker/docker-sdk/tree/master/images): Docker files for services, applications, etc.
  
## Docdker/sdk boot command details

The `boot` command of the Docker SDK runs the [generator](https://github.com/spryker/docker-sdk/tree/master/generator) application. The generator is deployed as a Docker container. The generator
takes twig templates and project's deploy.yml file with context (middle) and generates the content of the [deployment](https://github.com/spryker/docker-sdk/tree/master/deployment) folder.

The `boot` command does the following:
1. Prepares the `env` files for `glue`,`zed`, `yves`
2. Prepares endpoints and store-specific configs.
3. Prepare the nginx configuration: frontend, gateway.
4. Prepare the PHP and debug configuration.
5. Transforms the `env` files.
6. Prepareі Dashboard.
7. Prepares the Docker image files and `docker-compose.yml` for local development.
8. Generates bash scripts in `deploy.sh`.
9. Shows the list of commands that are necessary to complete installation.

## Docdker/sdk up command details

The `up` command of the Docker SDK does the following:

1. Prepares data in `deployment/default/deploy.sh`:
   1. Mounts Mutagen: 
      1. Removes the sync volume
      2. Terminates Mutagen
      3. Creates the volume
   2. Builds app images in CLI with the `docker build` command.
   3. Tags application images with the `docker tag` command.
   4. Mounts codebase with the following commands:
      - `install composer`
      - `install -s build`
      - `build-{mode}`
   5. Mounts assets with the following commands:
      - `install -s build-static`
      - `build-static-{mode}`
   6. Builds frontend and gateway containers from an nginx image.

2. Runs containers:
   1. Runs before stack
   2. Runs containers
   3. Runs after stack
3. Loads data for each region:
   1. Skips if DB is not empty: if `data`, then `force`
   2. Installs and configures Rabbit on broker container with the `rabbitmqctl add_vhost …` command
   3. Suspends Scheduler and waits for job termination.
   4. Initiates storages for each store with the `install -s init_storages_per_store` command. 
   5. If the database does not exist, creates it on MySQL or PostreSQL container.
4. Starts a scheduler for each region and store with the command `install -s scheduler-setup`





