---
title: PHPStan
description: Learn how to install and use PHPStan, a static code analyzer within your Spryker SDK projects.
last_updated: Jun 16, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/phpstan
originalArticleId: 91b7f7ec-2097-422c-9a63-4cc7076216e5
redirect_from:
  - /docs/sdk/dev/development-tools/phpstan.html
  - /docs/scos/dev/sdk/201811.0/development-tools/phpstan.html
  - /docs/scos/dev/sdk/201903.0/development-tools/phpstan.html
  - /docs/scos/dev/sdk/201907.0/development-tools/phpstan.html
  - /docs/scos/dev/sdk/202001.0/development-tools/phpstan.html
  - /docs/scos/dev/sdk/202005.0/development-tools/phpstan.html
  - /docs/scos/dev/sdk/202009.0/development-tools/phpstan.html
  - /docs/scos/dev/sdk/202108.0/development-tools/phpstan.html
  - /docs/scos/dev/sdk/development-tools/phpstan.html
related:
  - title: Architecture sniffer
    link: docs/dg/dev/sdks/sdk/development-tools/architecture-sniffer.html
  - title: Formatter
    link: docs/dg/dev/sdks/sdk/development-tools/formatter.html
  - title: Performance audit tool- Benchmark
    link: docs/dg/dev/sdks/sdk/development-tools/benchmark-performance-audit-tool.html
  - title: SCSS linter
    link: docs/dg/dev/sdks/sdk/development-tools/scss-linter.html
  - title: TS linter
    link: docs/dg/dev/sdks/sdk/development-tools/ts-linter.html
  - title: Spryk code generator
    link: docs/dg/dev/sdks/sdk/spryks/spryks.html
  - title: Static Security Checker
    link: docs/dg/dev/sdks/sdk/development-tools/static-security-checker.html
  - title: Tooling config file
    link: docs/dg/dev/sdks/sdk/development-tools/tooling-configuration-file.html
---

[PHPStan](https://github.com/phpstan/phpstan) is a static code analyzer that introspects the code without running it and catches various classes of bugs prior to unit testing.

## Install PHPStan

```bash
composer require --dev phpstan/phpstan
```

## Use PHPStan

1. Generate autocompletion and prevent any error messages that might occur because of incomplete classes:

```bash
vendor/bin/console dev:ide:generate-auto-completion
```

2. Start analyzing:

```bash
php -d memory_limit=2048M vendor/bin/phpstan analyze -l 6 -c phpstan.neon src/`
```


{% info_block errorBox %}

Demo shops are by default configured with PHPStan at level 6 in `phpstan.neon`. We highly recommend this configuration.

{% endinfo_block %}

## Baseline

If you need to raise the level, add new rules or extensions, you can generate a baseline and enable it for future changes.


For more information, see [PHPStan baseline](https://phpstan.org/user-guide/baseline).


## Main configuration file inheritance

You can extend `phpstat.neon` and define per-module configuration in the `parameters` section to reuse the matching configuration.


**./[ROOT]/phpstan.neon**
```php
parameters:
    excludes_analyse:
        - %rootDir%/../../../src/Generated/*
        - %rootDir%/../../../src/Orm/*

bootstrap: %rootDir%/../../../phpstan-bootstrap.php

services:
    -
        class: PhpStan\DynamicType\FacadeDynamicTypeExtension
        tags:
            - phpstan.broker.dynamicMethodReturnTypeExtension
...
```

**./[Module]/phpstan.neon**

```php
parameters:
    ignoreErrors:
    - '#.+ has invalid typehint type Symfony\\Component\\OptionsResolver\\OptionsResolverInterface.#'
    - '#Argument of an invalid type .+RolesTransfer supplied for foreach, only iterables are supported.#'
```
