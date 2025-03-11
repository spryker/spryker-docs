---
title: Code Generator
description: The code Generator module can generate Yves, Zed, Client Service and shared application code for your Spryker based project.
last_updated: Nov 18, 2020
template: concept-topic-template
originalLink: https://documentation.spryker.com/v1/docs/code-generator
originalArticleId: 67355fa9-f508-4c41-90a3-3e4d982b2923
redirect_from:
  - /docs/scos/dev/sdk/201811.0/code-generator.html
  - /docs/scos/dev/sdk/201903.0/code-generator.html
  - /docs/scos/dev/sdk/201907.0/code-generator.html
  - /docs/scos/dev/sdk/202001.0/code-generator.html
  - /docs/scos/dev/sdk/202005.0/code-generator.html
  - /docs/scos/dev/sdk/202009.0/code-generator.html
  - /docs/scos/dev/sdk/202108.0/code-generator.html
  - /docs/scos/dev/code-generator.html
related:
  - title: Cronjob scheduling
    link: docs/dg/dev/backend-development/cronjobs/cronjobs.html
  - title: Development virtual machine, docker containers & console
    link: docs/dg/dev/sdks/the-docker-sdk/docker-environment-infrastructure.html
  - title: Twig and TwigExtension
    link: docs/dg/dev/integrate-and-configure/twig-and-twigextension.html
---

The CodeGenerator module can generate your project code.

Out of the box it provides generators for Yves, Zed, Client, Service and Shared application layers.

{% info_block errorBox %}

Check out our new code generation tool [Spryk](/docs/dg/dev/sdks/sdk/spryks/spryks.html).

{% endinfo_block %}


## Installation

Install it as

```bash
composer require --dev spryker/code-generator
```

You need to run `vendor/bin/console transfer:generate` now.

Then make sure you enable the console commands in your `getConsoleCommands()` method in `ConsoleDependencyProvider`:

```php
<?php
    if (Environment::isDevelopment()) {
        ....
        $commands[] = new BundleCodeGeneratorConsole();
        $commands[] = new BundleYvesCodeGeneratorConsole();
        $commands[] = new BundleZedCodeGeneratorConsole();
        $commands[] = new BundleClientCodeGeneratorConsole();
        $commands[] = new BundleSharedCodeGeneratorConsole();
    }
```

## How to use it

You can now use the commands–for example, generate the application layers for `FooBar` module as follows:

```bash
console code:generate:module:all FooBar
console code:generate:module:yves FooBar
console code:generate:module:zed FooBar
console code:generate:module:client FooBar
console code:generate:module:shared FooBar
```
