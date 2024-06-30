---
title: Docker SDK command line interface guide
description: How to use Docker SDK command line interface.
last_updated: Jan 16, 2024
template: howto-guide-template
related:
  - title: The Docker SDK
    link: docs/scos/dev/the-docker-sdk/page.version/the-docker-sdk.html
  - title: Docker environment infrastructure
    link: docs/scos/dev/the-docker-sdk/page.version/docker-environment-infrastructure.html
  - title: Configuring services
    link: docs/scos/dev/the-docker-sdk/page.version/configure-services.html
  - title: Docker SDK configuration reference
    link: docs/scos/dev/the-docker-sdk/page.version/docker-sdk-configuration-reference.html
  - title: Choosing a Docker SDK version
    link: docs/scos/dev/the-docker-sdk/page.version/choosing-a-docker-sdk-version.html
  - title: Choosing a mount mode
    link: docs/scos/dev/the-docker-sdk/page.version/choosing-a-mount-mode.html
  - title: Configuring a mount mode
    link: docs/scos/dev/the-docker-sdk/page.version/configuring-a-mount-mode.html
  - title: Configuring access to private repositories
    link: docs/scos/dev/the-docker-sdk/page.version/configuring-access-to-private-repositories.html
  - title: Configuring debugging in Docker
    link: docs/scos/dev/the-docker-sdk/page.version/configuring-debugging-in-docker.html
  - title: Running tests with the Docker SDK
    link: docs/scos/dev/the-docker-sdk/page.version/choosing-a-docker-sdk-version.html
---

This document describes how you can run console commands on your local environment with the Docker SDK.

## Running commands only in a local Spryker environment

To enter the command line interface of a local instance, run one of the following commands:

Non-debug mode:
```bash
docker/sdk cli
```
![img](https://i.ibb.co/Fm0wjYq/docker-cli-1.png)

Debug mode:
```bash
docker/sdk cli -x
```
![img](https://i.ibb.co/bBcgpLJ/docker-cli-2.png)

From here, you can run any commands related to your project, like composer, console, glue, or yves.

## Running a single command once in a local Spryker environment

Sometimes you don't want to enter into the CLI mode of your project.
In this case, you may run the following command:
```bach
docker/sdk cli composer install
```
Execution of the **composer install** will happen inside a CLI container, but after completion, you will stay in your regular CLI.

{% info_block infoBox "Complex commands" %}
When running a complex command that requires quotes, make sure to use double quotes for the whole command and any allowed quotes inside it.
```bash
docker/sdk cli "composer require 'spryker/kernel:master as 1.1.1-dev'"
```
{% endinfo_block %}

## Running a set of commands once on your local Spryker environment

Similar to the previous case, but you want to run several commands.
Do the following:
```bash
docker/sdk cli "composer install && console transfer:generate && console propel:install"



































```
