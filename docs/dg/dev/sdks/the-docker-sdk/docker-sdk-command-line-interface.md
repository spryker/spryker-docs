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

This document describes how to run console commands in a local Spryker environment with the Docker SDK.

## Enter the CLI

To enter the command line interface of a local Spryker instance, run one of the following commands:

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

## Running a command without entering the CLI

You might sometimes want to run just one command, which is faster to do without entering the CLI. Example:
```bach
docker/sdk cli composer install
```

The execution of the command happens inside the Spryker CLI container, but your sessions stays in the regular CLI.

{% info_block infoBox "Complex commands" %}
When running a complex command that requires quotes, wrap the command into double quotes and use single quotes inside it.
```bash
docker/sdk cli "composer require 'spryker/kernel:master as 1.1.1-dev'"
```
{% endinfo_block %}

### Running multiple commands without entering the CLI

Running several commands without entering the CLI is also possible. Example:

```bash
docker/sdk cli "composer install && console transfer:generate && console propel:install"
```


































```
