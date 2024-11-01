---
title: Enable development tools in PHPStorm
description: Enable Spryker tools in PHPStorm to enhance your development experience
last_updated: Oct 20, 2024
template: howto-guide-template
related:
  - title: Code sniffer
    link: docs/scos/dev/sdk/development-tools/code-sniffer.html
  - title: PHPStan
    link: docs/dg/dev/sdks/sdk/development-tools/phpstan.html

---


This document describes how to enable and use development tools, like PHPStan or Code sniffer, directly in PHPStorm’s External Tools panel. These tools are available at both module and project levels and can be executed by right-clicking within the project directory tree.

The following tools are supported and can be used for module folders:
- `console code:sniff:style -f`: applies coding style fixes.
- `console code:phpstan`: runs static analysis.
- `console code:sniff:architecture`: detects architecture rule violations.


![spryker-tools-in-phpstorm](https://spryker.s3.eu-central-1.amazonaws.com/docs/dg/dev/sdks/development-tools/enable-development-tools-in-phpstorm.md/spryker-tools-in-phpstorm.png)

## Prerequisites

To be able to run commands in PHPStorm, install `awk`.

The installation script supports only MacOS.

## Intall the Development module and add PHPStorm configuration

1. Install the [spryker/development@^3.39.0](https://github.com/spryker/development) module.
2. In terminal, go to the root project directory.
3. Depending on your project configuration, configure development tools by running one of the following commands:

* Configure tools to run in Docker SDK containers:
```bash
vendor/bin/phpstorm-command-line-tools.sh
```

* Configure tools tools to run on your local machine:
```bash
vendor/bin/phpstorm-command-line-tools.sh --platform=local
```

5. To apply the changes, restart PhpStorm.

This adds or updates the XML configuration of PHPStorm related to Spryker, without changing any other settings.

After updating the `spryker/development` module, we recommend rerunning the installation command to make sure the latest configurations and updates are applied.
