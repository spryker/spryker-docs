---
title: Is currently used PHP Version >=8.0?
description: This document allows you to assess if a project uses PHP Version >=8.0.
template: howto-guide-template
---

# Is currently used PHP Version >=8.0?

{% info_block infoBox %}

Resources: Backend

{% endinfo_block %}

## Description

In this assessment part, we need to verify whether the project code is compatible with PHP 8.0.

There are two options **PHPCompatibility** and **Rector** it’s up to the developer which one to choose.

### PHPCompatibility

PHPCompatibility checks for only incompatible code which definitely won’t work with PHP 8.0.

1. Verify if the default phpcs sniffer is still present otherwise install it.
2. Install `php-compatibility` package:
    ```bash
    composer require --dev phpcompatibility/php-compatibility --ignore-platform-reqs
    ```
3. Tune phpcs settings in order to allow `php-compatibility` rules:
    ```bash
    vendor/bin/phpcs --config-set installed_paths vendor/phpcompatibility/php-compatibility
    ```
4. Execute `php-compatibility` sniffer:
    ```bash
    vendor/bin/phpcs -p src/ --standard=PHPCompatibility  --runtime-set testVersion 8.0
    ```

### Rector

Rector highlights violations that are still compatible with PHP 8.0 but are supposed to be done already in a different way. Rector is better to use for the auto upgrade from the earlier version to 8.0 in the migration phase.

1. Require `rector` package:
    ```bash
    composer require rector/rector --dev --ignore-platform-reqs
    ```
2. Init `rector`:
    ```bash
    vendor/bin/rector init
    ```
3. Adjust the `rector.php` config file in order to specify which version of PHP you want to upgrade to:
    ```php
   <?php

    declare(strict_types=1);
    
    use Rector\CodeQuality\Rector\Class_\InlineConstructorDefaultToPropertyRector;
    use Rector\Config\RectorConfig;
    use Rector\Set\ValueObject\LevelSetList;
    
    return static function (RectorConfig $rectorConfig): void {
        ...
        // define sets of rules
        $rectorConfig->sets([
            LevelSetList::UP_TO_PHP_80
        ]);
    };
   ```
4. Run `rector` in dry run mode to see the list of incompatible parts of the application:
    ```bash
    vendor/bin/rector process src --dry-run
    ```

## Formula

Approximately 30m per incompatibility issue.
