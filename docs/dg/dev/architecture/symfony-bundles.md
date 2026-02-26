---
title: Symfony Bundles in Spryker
description: This document describes how to use Symfony Bundles in your Spryker project.
last_updated: Feb 26, 2026
template: concept-topic-template
related:
  - title: How to upgrade to Symfony Dependency Injection
    link: docs/dg/dev/upgrade-and-migrate/upgrade-to-symfony-dependency-injection.html
  - title: Dependency injection
    link: docs/dg/dev/architecture/dependency-injection.html
  - title: How to integrate API Platform Security
    link: docs/dg/dev/upgrade-and-migrate/integrate-api-platform-security.html
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

### SecurityBundle

The Symfony [SecurityBundle](https://symfony.com/doc/current/security.html) provides authentication and authorization for Spryker's API Platform integration. It enables Bearer token (JWT) authentication and security expressions on API resources.

To register the SecurityBundle for a Glue application, add it to `config/{APPLICATION}/bundles.php`:

```php
<?php

use Symfony\Bundle\FrameworkBundle\FrameworkBundle;
use Symfony\Bundle\SecurityBundle\SecurityBundle;

return [
    FrameworkBundle::class => ['all' => true],
    SecurityBundle::class => ['all' => true],
    // ... other bundles
];
```

For the complete setup including firewall configuration and security expressions, see [How to integrate API Platform Security](/docs/dg/dev/upgrade-and-migrate/integrate-api-platform-security.html).

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
