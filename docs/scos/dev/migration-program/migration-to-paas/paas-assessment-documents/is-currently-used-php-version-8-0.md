---
title: Check if the PHP version used is 8.0 or higher
description: This document allows you to assess if a project uses PHP Version >=8.0.
template: howto-guide-template
---



## Resources for assessment 

Backend

## Description

In this assessment step, you need to check if the project is compatible with PHP 8.0.

You can check it using PHPCompatibility or Rector. PHPCompatibility identifies the code that's incompatible with PHP 8.0. Rector highlights the violations that are still compatible with PHP 8.0 but are supposed to be done in a different way. We recommend using Rector for auto-upgrading from earlier versions of PHP to 8.0.


## Check PHP 8.0 compatibility using PHPCompatibility

1. If phpcs sniffer is not installed, install it.

2. Require the `php-compatibility` package:

```bash
composer require --dev phpcompatibility/php-compatibility --ignore-platform-reqs
```

3. Tune phpcs settings to allow `php-compatibility` rules:
```bash
vendor/bin/phpcs --config-set installed_paths vendor/phpcompatibility/php-compatibility
```

4. Execute the `php-compatibility` sniffer:

```bash
vendor/bin/phpcs -p src/ --standard=PHPCompatibility  --runtime-set testVersion 8.0
```
    This returns the code that's not compatible with PHP 8.0.

## Check PHP 8.0 compatibility using Rector


1. Require the `rector` package:
```bash
composer require rector/rector --dev --ignore-platform-reqs
```

2. Init `rector`:

```bash
vendor/bin/rector init
```

3. In `rector.php`, specify the PHP version you want to upgrade the project to. The version is 8.0 in this example:
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

4. To see the incompatible parts of the application, run `rector` in the dry-run mode:

```bash
vendor/bin/rector process src --dry-run
```

## Formula for calculating the migration effort

Approximately 30m per incompatibility issue.
