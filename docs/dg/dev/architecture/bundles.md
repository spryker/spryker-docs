---
title: Bundles
description: This document describes how to use Symfony Bundles in your Spryker project.
last_updated: Nov 5, 2025
template: concept-topic-template
related:
  - title: How to upgrade to Symfony Dependency Injection
    link: docs/dg/dev/upgrade-and-migrate/upgrade-to-symfony-dependency-injection.html
  - title: Dependency injection
    link: docs/dg/dev/architecture/dependency-injection.html
---

To configure bundles, do the following:

1. Create a new configuration file in `config/bundles.php`.
2. In the new file, add the Symfony Framework bundle:

```php
<?php

use Symfony\Bundle\FrameworkBundle\FrameworkBundle;

return [
    FrameworkBundle::class => ['all' => true],
];
```

