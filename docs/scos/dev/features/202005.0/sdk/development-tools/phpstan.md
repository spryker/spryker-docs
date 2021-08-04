---
title: PHPStan
originalLink: https://documentation.spryker.com/v5/docs/phpstan
redirect_from:
  - /v5/docs/phpstan
  - /v5/docs/en/phpstan
---

[PHPStan](https://github.com/phpstan/phpstan) is a static code analyzer that introspects the code without running it and catches various classes of bugs prior to unit testing.

## Installation
To install PHPStan, run the following command:

```bash
composer require --dev phpstan/phpstan`
```

## Usage
1. Run the following command to generate autocompletion and prevent any error messages that might occur due to the incomplete classes:
`vendor/bin/console dev:ide:generate-auto-completion`
2. Run this command to start analyzing:
`php -d memory_limit=2048M vendor/bin/phpstan analyze -c vendor/spryker/spryker/phpstan.neon vendor/<spryker | spryker-eco | spryker-middleware>/<MODULE>/ -l 2`

{% info_block errorBox %}
Note that running this command with the level 2 key (**-l 2**
{% endinfo_block %} and having no errors is obligatory, and having no errors with level 5 (**-l 5**) is highly recommended.)

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

<!-- Last review date: Jan 11, 2019 by Dmitriy Mikhailov and Dmitry Beirak -->
