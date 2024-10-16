---
title: Code Generator
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
    link: docs/scos/dev/sdk/cronjob-scheduling.html
  - title: Data import
    link: docs/dg/dev/data-import/page.version/data-import.html
  - title: Development virtual machine, docker containers & console
    link: docs/scos/dev/sdk/development-virtual-machine-docker-containers-and-console.html
  - title: Twig and TwigExtension
    link: docs/scos/dev/sdk/twig-and-twigextension.html
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

You can now use the commands, to e.g. generate the application layers for `FooBar` module as follows:

```bash
console code:generate:module:all FooBar
console code:generate:module:yves FooBar
console code:generate:module:zed FooBar
console code:generate:module:client FooBar
console code:generate:module:shared FooBar
```
