---
title: Multi-store products feature integration
description: The guide describes the process of installing the Multi-Store Products into your project.
last_updated: Jun 16, 2021
template: feature-integration-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/product-store-relation-feature-integration
originalArticleId: 625314d9-d6db-4e00-aa39-9dfc8b820332
redirect_from:
  - /2021080/docs/product-store-relation-feature-integration
  - /2021080/docs/en/product-store-relation-feature-integration
  - /docs/product-store-relation-feature-integration
  - /docs/en/product-store-relation-feature-integration
related:
  - title: Migration Guide - Collector
    link: docs/scos/dev/module-migration-guides/migration-guide-collector.html
  - title: Migration Guide - Touch
    link: docs/scos/dev/module-migration-guides/migration-guide-touch.html
  - title: Migration Guide - Product
    link: docs/scos/dev/module-migration-guides/migration-guide-product.html
  - title: Migration Guide - ProductManagement
    link: docs/scos/dev/module-migration-guides/migration-guide-productmanagement.html
---

By default abstract products are available in all stores. This feature provides additional configuration when:

* you have multiple stores
* you want to manage the appearance of abstract products per store.

## Prerequisites
To prepare your project to work with multi-store abstract products:

1. Update/install `spryker/collector` to at least 6.0.0 version. You can find additional help for feature migration in [Migration Guide - Collector](/docs/scos/dev/module-migration-guides/migration-guide-collector.html).
2. Update/install `spryker/touch` to at least 4.0.0 version. You can find additional help for feature migration in [_Migration Guide - Touch_](/docs/scos/dev/module-migration-guides/migration-guide-touch.html).
3. Update/install `spryker/store` to at least 1.3.0 version.
4. Update/install `spryker/product` to at least 6.0.0 version. You can find additional help for feature migration in [Migration Guide - Product](/docs/scos/dev/module-migration-guides/migration-guide-product.html).
5. If you want to have Zed Admin UI support for the multi-store abstract product management:
* Update/install `spryker/productmanagement` to at least 0.10.0 version. You can find additional help for feature migration in [Migration Guide - ProductManagement](/docs/scos/dev/module-migration-guides/migration-guide-productmanagement.html).
* Override `Spryker\Zed\Store\StoreConfig::isMultiStorePerZedEnabled()` in your project to return `true`. This will enable the store management inside the Product Information Management (PIM) Zed Admin UI.

**Example override**

```php
<?php
namespace Pyz\Zed\Store;

use Spryker\Zed\Store\StoreConfig as SprykerStoreConfig;

class StoreConfig extends SprykerStoreConfig
{
    /**
     * @return bool
     */
    public function isMultiStorePerZedEnabled()
    {
        return true;
    }
}
```

* You should now be able to use the Product Information Management (PIM) Zed Admin UI to manage abstract product store relation.

Check out our [Legacy Demoshop implementation](https://github.com/spryker/demoshop) for implementation example and idea.
 
