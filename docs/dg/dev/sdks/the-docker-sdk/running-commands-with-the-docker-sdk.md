---
title: Running commands with the Docker SDK
description: Learn how to use Docker SDK command line interface to run commands for your Spryker based project.
last_updated: Jan 16, 2024
template: howto-guide-template
---

This document describes how to run console commands in a local Spryker environment with the Docker SDK.

## Enter the CLI

To enter the command line interface of a local Spryker instance, run one of the following commands:

Non-debug mode:

```bash
docker/sdk cli
```

Debug mode:

```bash
docker/sdk cli -x
```

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



































