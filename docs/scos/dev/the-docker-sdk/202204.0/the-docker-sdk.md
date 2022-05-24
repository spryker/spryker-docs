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

The `boot` command does the follwing:
1. Prepares the `env` files for `glue`,`zed`, `yves`
2. Prepares endpoints and store-specific configs.
3. Prepare the nginx configuration: frontend, gateway.
4. Prepare the PHP and debug configuration.
5. Transforms the `env` files.
6. 


