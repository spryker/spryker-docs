---
title: Migration Guide - Console
description: Use the guide to update versions to the newer ones of the Console module.
last_updated: Nov 22, 2019
template: module-migration-guide-template
originalLink: https://documentation.spryker.com/v4/docs/mg-console
originalArticleId: cba6d51d-6398-4444-bed9-a82851ebd3d6
redirect_from:
  - /v4/docs/mg-console
  - /v4/docs/en/mg-console
related:
  - title: Migration Guide - Collector
    link: docs/scos/dev/module-migration-guides/page.version/migration-guide-collector.html
---

## Upgrading from Version 3.* to Version 4.*

Console version 4 has been prepared for a standalone usage. Now, you are able to use `Console` module even without a DB configuration.
Find or create `ConsoleDependencyProvider` in your project. 

{% info_block warningBox %}
Make sure it extends `\Spryker\Zed\Console\ConsoleDependencyProvider`.
{% endinfo_block %}

Find `getServiceProviders method` and add `\Spryker\Zed\Propel\Communication\Plugin\ServiceProvider\PropelServiceProvider` to the service stack.
        
The method could look like this:

```php
/**
* @param \Spryker\Zed\Kernel\Container $container
*
* @return \Silex\ServiceProviderInterface[]
*/
public function getServiceProviders(Container $container)
{
    $serviceProviders = parent::getServiceProviders($container);
    $serviceProviders[] = new PropelServiceProvider();

    return $serviceProviders;
}
```

<!-- Last review date: Nov 23, 2017 by Denis Turkov -->
