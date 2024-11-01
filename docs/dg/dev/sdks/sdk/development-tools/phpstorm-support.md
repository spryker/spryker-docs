---
title: Enable development tools in PHPStorm
description: Enable Spryker tools in PHPStorm to enhance your development experience
last_updated: Oct 20, 2024
template: concept-topic-template
redirect_from:
  - /docs/scos/dev/sdk/development-tools/development-tools.html
related:
  - title: Code sniffer
    link: docs/scos/dev/sdk/development-tools/code-sniffer.html
  - title: PHPStan
    link: docs/dg/dev/sdks/sdk/development-tools/phpstan.html

---


We provide support for tools that perform code style fixes, static analysis, and architecture checks, each accessible within PHPStorm’s External Tools panel. These tools are available at both module and project levels and can be executed directly by right-clicking within the project directory tree.

The following tools are included and can be used only for module folders:
- `console code:sniff:style -f`: Applies coding style fixes.
- `console code:phpstan`: Runs static analysis.
- `console code:sniff:architecture`: Detects architecture rule violations.

## Installation
The installed commands within PHPStorm can be registered to run either as local machine commands or Spryker Docker SDK commands, depending on your configuration choice during installation. So, make sure the appropriate environment is available: Spryker Docker SDK running for `docker` platform commands or required tools installed locally for `local` platform commands.

The installation script currently supports MacOS.

## Prerequisites
Ensure that `awk` is installed on your local machine, as it is required to run the commands directly from PHPStorm.


## Install PHPStorm tools

To install the Spryker development tools configuration in PHPStorm:
1. Install the [spryker/development@^3.39.0](https://github.com/spryker/development) module.
2. In terminal, go to the root project directory.
3. Depending on your project configuration, configure PHPStorm tools by running one of the following commands:

* Configure tools to run with the Spryker Docker SDK:
```bash
vendor/bin/phpstorm-command-line-tools.sh
```

* Configure tools for a local machine usage:
```bash
vendor/bin/phpstorm-command-line-tools.sh --platform=local
```

5. To apply the changes, restart PhpStorm.

This command adds or updates an XML configuration file in PHPStorm’s settings directory, dedicated exclusively to Spryker-related configurations, without changing any other settings.

After updating the `spryker/development` module, we recommend rerunning the installation command to make sure the latest configurations and updates are applied.
