---
title: Docker SDK
originalLink: https://documentation.spryker.com/v3/docs/docker-sdk
redirect_from:
  - /v3/docs/docker-sdk
  - /v3/docs/en/docker-sdk
---

## Description

Spryker Docker SDK helps to set up docker environment for your Spryker project.

Spryker Docker SDK requires the [Deploy file](/docs/scos/dev/developer-guides/201907.0/installation/spryker-in-docker/docker-sdk/deploy-file-ref). The tool reads the specified Deploy file and builds a production-like Docker infrastructure for Spryker accordingly.

The purposes of the tool:

1. Building production-like Docker images.
2. Serving as a part of development environment based on Docker.
3. Simplifying the process of setting up a local demo of Spryker project.

{% info_block errorBox %}
All the commands below should be run from the root directory of Spryker project.
{% endinfo_block %}

## Installation

1. Fetch Docker SDK tools:
```shell
git clone https://github.com/spryker/docker-sdk.git ./docker
```
{% info_block warningBox %}
Make sure `docker 18.09.1+` and `docker-compose 1.23+` are installed in the local environment.
{% endinfo_block %}
2. Initialize docker setup:
 ```shell
docker/sdk bootstrap
```
3. Build and run Spryker applications:
```shell
docker/sdk up
```
{% info_block warningBox %}
Make sure all the domains from `deploy.yml` are defined as `127.0.0.1` in the `hosts` file in the local environment.
{% endinfo_block %}

## Getting Started

There are two ways to start working with Spryker in Docker:

* If you want to set up a new Spryker project in Docker, start with [Getting Started with Docker](/docs/scos/dev/developer-guides/201907.0/installation/spryker-in-docker/getting-started).
* If you already have a DevVM based project, proceed to [Integrating Docker into an Existing Project](/docs/scos/dev/developer-guides/201907.0/installation/spryker-in-docker/integrating-doc) to convert your project into a Docker based one.

<!-- Last review date: Aug 06, 2019by Mike Kalinin, Andrii Tserkovnyi -->
