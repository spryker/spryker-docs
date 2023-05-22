---
title: Migrate project to PHP >=8.0
description: This document describes how to migrate project to PHP >=8.0.
template: howto-guide-template
---

# Migrate project to PHP >=8.0

{% info_block infoBox %}

## Resources Backend

{% endinfo_block %}

In this migration part we need to make project’s php code compatible with 8.0 version.

1. Require `rector` package:
    ```bash
    composer require rector/rector --dev --ignore-platform-reqs
    ```
2. Init `rector`:
    ```bash
    vendor/bin/rector init
    ```
3. Adjust the `rector.php` config file in order to specify which version of php you want to upgrade to:
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
4. Run rector in dry run mode to see the list of incompatible parts of the application
    (rector php 8.0 rules will show outdated but still compatible approaches of writing code, so it doesn’t necessarily
    means that all violations are incompatible with php 8.0):
    ```bash
    vendor/bin/rector process src --dry-run
    ```
5. Run rector in regular mode and see automatically fixed incompatibilities:
    ```bash
    vendor/bin/rector process src
    ```
