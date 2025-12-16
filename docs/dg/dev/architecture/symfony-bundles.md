---
title: Symfony Bundles in Spryker
description: This document describes how to use Symfony Bundles in your Spryker project.
last_updated: Nov 5, 2025
template: concept-topic-template
related:
  - title: How to upgrade to Symfony Dependency Injection
    link: docs/dg/dev/upgrade-and-migrate/upgrade-to-symfony-dependency-injection.html
  - title: Dependency injection
    link: docs/dg/dev/architecture/dependency-injection.html
---

{% info_block warningBox "On your own risk" %}

This feature is experimental, and we do not recommend using it on production.

{% endinfo_block %}


This document describes how to use [Symfony Bundles](https://symfony.com/doc/current/bundles.html) in your Spryker project.

## Registering a bundle

To use a bundle, you need to register it in `config/{APPLICATION}/bundles.php`. For example in `config/Zed/bundles.php` 

For example, to use the `FrameworkBundle`, which is required to use the Dependency Injection component, add the following to your `config/Zed/bundles.php` file:

```php
<?php

use Symfony\Bundle\FrameworkBundle\FrameworkBundle;

return [
    FrameworkBundle::class => ['all' => true],
];
```

## Configuring bundles and services

You can configure bundles in the same way as provided by Symfony by adding `config/Zed/packages/*.php` files to the `config/` folder. For more information, see [Configuring Bundles](https://symfony.com/doc/current/bundles/configuration.html).

Example of the FrameworkBundle in `config/Zed/packages/framework.php`:

```php
<?php

declare(strict_types = 1);

use Symfony\Config\FrameworkConfig;

return static function (FrameworkConfig $framework): void {
    $framework->secret('spryker-zed-secret');

    $framework->assets([
            'base_path' => '/assets',
        ]);

    $framework->test('%kernel.environment%' === 'dockerdev');
};

```

## Next steps

- [How to upgrade to Symfony Dependency Injection](/docs/dg/dev/upgrade-and-migrate/upgrade-to-symfony-dependency-injection.html)
- [Dependency injection](/docs/dg/dev/architecture/dependency-injection.html)
