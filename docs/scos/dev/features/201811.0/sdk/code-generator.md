---
title: Code Generator
originalLink: https://documentation.spryker.com/v1/docs/code-generator
redirect_from:
  - /v1/docs/code-generator
  - /v1/docs/en/code-generator
---

The CodeGenerator module can generate your project code.

Out of the box it provides generators for Yves, Zed, Client, Service and Shared application layers.

{% info_block errorBox %}
Check out our new code generation tool [Spryk](/docs/scos/dev/features/201903.0/sdk/spryk
{% endinfo_block %}.)


## Installation
Install it as

`composer require --dev spryker/code-generator`

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

```
console code:generate:module:all FooBar
console code:generate:module:yves FooBar
console code:generate:module:zed FooBar
console code:generate:module:client FooBar
console code:generate:module:shared FooBar
```
