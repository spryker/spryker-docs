---
title: PHPStan
description: Use the article to learn how to install and use PHPStan
last_updated: Jun 16, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/phpstan
originalArticleId: 91b7f7ec-2097-422c-9a63-4cc7076216e5
redirect_from:
  - /2021080/docs/phpstan
  - /2021080/docs/en/phpstan
  - /docs/phpstan
  - /docs/en/phpstan
  - /v6/docs/phpstan
  - /v6/docs/en/phpstan
  - /v5/docs/phpstan
  - /v5/docs/en/phpstan
  - /v4/docs/phpstan
  - /v4/docs/en/phpstan
  - /v3/docs/phpstan
  - /v3/docs/en/phpstan
  - /v2/docs/phpstan
  - /v2/docs/en/phpstan
  - /docs/scos/dev/sdk/201811.0/development-tools/phpstan.html
  - /docs/scos/dev/sdk/201903.0/development-tools/phpstan.html
  - /docs/scos/dev/sdk/201907.0/development-tools/phpstan.html
  - /docs/scos/dev/sdk/202001.0/development-tools/phpstan.html
  - /docs/scos/dev/sdk/202005.0/development-tools/phpstan.html
  - /docs/scos/dev/sdk/202009.0/development-tools/phpstan.html
  - /docs/scos/dev/sdk/202108.0/development-tools/phpstan.html
related:
  - title: Architecture Sniffer
    link: docs/scos/dev/sdk/development-tools/architecture-sniffer.html
  - title: Code Sniffer
    link: docs/scos/dev/sdk/development-tools/phpstan.html
---

[PHPStan](https://github.com/phpstan/phpstan) is a static code analyzer that introspects the code without running it and catches various classes of bugs prior to unit testing.

## Installation
To install PHPStan, run the following command:

```bash
composer require --dev phpstan/phpstan
```

## Usage

1. Run the following command to generate autocompletion and prevent any error messages that might occur due to the incomplete classes:
`vendor/bin/console dev:ide:generate-auto-completion`
2. Run this command to start analyzing:
`php -d memory_limit=2048M vendor/bin/phpstan analyze -c vendor/spryker/spryker/phpstan.neon vendor/<spryker | spryker-eco | spryker-middleware>/<MODULE>/ -l 2`

{% info_block errorBox %}

Note that running this command with the level 2 key (**-l 2**) and having no errors is obligatory, and having no errors with level 5 (**-l 5**) is highly recommended.

{% endinfo_block %}

## Additional Functionality
**Main Configuration File Inheritance**

To avoid duplicated code while specifying a different configuration in the _parameters_ section of the `phpstat.neon` file, it is possible to extend this file and determine only the changes needed for a particular configuration of a module.

### ./[ROOT]/phpstan.neon:
```
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

### ./[Module]/phpstan.neon:
```
parameters:
    ignoreErrors:
    - '#.+ has invalid typehint type Symfony\\Component\\OptionsResolver\\OptionsResolverInterface.#'
    - '#Argument of an invalid type .+RolesTransfer supplied for foreach, only iterables are supported.#'
```
