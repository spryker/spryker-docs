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

To use a bundle, you need to register it in `config/bundles.php`.

For example, to use the `FrameworkBundle`, which is required to use the Dependency Injection component, add the following to your `config/bundles.php` file:

```php
<?php

use Symfony\Bundle\FrameworkBundle\FrameworkBundle;

return [
    FrameworkBundle::class => ['all' => true],
];
```

## Configuring bundles and services

You can configure a bundle in your `config/services.php` or `config/services.yml` file. For details, see the documentation of the bundle you are using.

Additionally, you can configure bundles in the same way as provided by Symfony by adding `packages/*.yml` files to the `config/` folder. For more information, see [Configuring Bundles](https://symfony.com/doc/current/bundles/configuration.html).

## Next steps

- [How to upgrade to Symfony Dependency Injection](/docs/dg/dev/upgrade-and-migrate/upgrade-to-symfony-dependency-injection.html)
- [Dependency injection](/docs/dg/dev/architecture/dependency-injection.html)
