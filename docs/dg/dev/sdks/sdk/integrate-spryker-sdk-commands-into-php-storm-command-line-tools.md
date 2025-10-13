---
title: Integrate Spryker SDK commands into PhpStorm command line tools
description: Learn how to integrate Spryker SDK commands in to PHPStorm command line tools for your Spryker based projects.
template: task-topic-template
last_updated: Nov 22, 2022
redirect_from:
    - /docs/sdk/dev/integrating-sdk-commands-to-php-storm-command-line-tools.html
    - /docs/sdk/dev/integrate-sdk-commands-to-php-storm-command-line-tools.html

---

To make all the Spryker SDK commands available to PhpStorm, do the following:

1. Within your project, run `spryker-sdk sdk:php:create-phpstorm-config`.
   This generates a custom configuration file for PhpStorm command line tools: `.idea/commandlinetools/Custom_Spryker_Sdk.xml`.
2. To enable the Spryker SDK integration, restart PhpStorm.

All SDK commands are now available in the PhpStorm command line.
