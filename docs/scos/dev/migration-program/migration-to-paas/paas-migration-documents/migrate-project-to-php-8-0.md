---
title: Migrate project to PHP >=8.0
description: This document describes how to migrate project to PHP >=8.0.
template: howto-guide-template
---


## Resources for migration

 Backend


To make the project's code compatible with PHP 8.0, follow the steps:

1. Require the `rector` package:

```bash
composer require rector/rector --dev --ignore-platform-reqs
```

2. Init `rector`:

```bash
vendor/bin/rector init
```

3. To specify the version of PHP to upgrade to, adjust the `rector.php` config file:

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

4. To see the list of incompatible parts of the application, run rector in dry run mode:

```bash
vendor/bin/rector process src --dry-run
```

rector's PHP 8.0 rules show outdated but still compatible approaches of writing code, so it doesn’t necessarily mean that all violations are incompatible with PHP 8.0.


5. To auto-fix incompatibilities, run rector in regular mode:

```bash
vendor/bin/rector process src
```
