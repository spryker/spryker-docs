---
title: Is currently used PHP Version >=8.0?
description: This document allows you to assess if a project uses PHP Version >=8.0.
template: howto-guide-template
---

# Is currently used PHP Version >=8.0?

{% info_block infoBox %}

## Resources for assessment Backend

{% endinfo_block %}

## Description

In this assessment part, you need to verify whether the project code is compatible with PHP 8.0.

There are two options **PHPCompatibility** and **Rector** it’s up to the developer which one to choose.

### PHPCompatibility

PHPCompatibility checks for only incompatible code which definitely won’t work with PHP 8.0.

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

### Rector

Rector highlights the violations that are still compatible with PHP 8.0 but are supposed to be done in a different way. We recommend using Rector for auto-upgrading from earlier version of PHP to 8.0.

1. Require `rector` package:
```bash
composer require rector/rector --dev --ignore-platform-reqs
```

2. Init `rector`:

```bash
vendor/bin/rector init
```

3. In `rector.php`, specify the PHP version to upgrade to:
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

4. To see the list of incompatible parts of the application, run `rector` in the dry-run mode :

```bash
vendor/bin/rector process src --dry-run
```

## Formula for calculating the migration effort

Approximately 30m per incompatibility issue.
