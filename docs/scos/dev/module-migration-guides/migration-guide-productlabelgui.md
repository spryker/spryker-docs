---
title: Migration guide - ProductLabelGUI
description: Use the guide to learn how to update the ProductLabelGui module to a newer version.
last_updated: Jun 16, 2021
template: module-migration-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/mg-product-label-gui
originalArticleId: aa0f3904-286a-4b8c-a895-4cf1cdefd457
redirect_from:
  - /2021080/docs/mg-product-label-gui
  - /2021080/docs/en/mg-product-label-gui
  - /docs/mg-product-label-gui
  - /docs/en/mg-product-label-gui
  - /v1/docs/mg-product-label-gui
  - /v1/docs/en/mg-product-label-gui
  - /v2/docs/mg-product-label-gui
  - /v2/docs/en/mg-product-label-gui
  - /v3/docs/mg-product-label-gui
  - /v3/docs/en/mg-product-label-gui
  - /v4/docs/mg-product-label-gui
  - /v4/docs/en/mg-product-label-gui
  - /v5/docs/mg-product-label-gui
  - /v5/docs/en/mg-product-label-gui
  - /v6/docs/mg-product-label-gui
  - /v6/docs/en/mg-product-label-gui
  - /docs/scos/dev/module-migration-guides/201811.0/migration-guide-productlabelgui.html
  - /docs/scos/dev/module-migration-guides/201903.0/migration-guide-productlabelgui.html
  - /docs/scos/dev/module-migration-guides/201907.0/migration-guide-productlabelgui.html
  - /docs/scos/dev/module-migration-guides/202001.0/migration-guide-productlabelgui.html
  - /docs/scos/dev/module-migration-guides/202005.0/migration-guide-productlabelgui.html
  - /docs/scos/dev/module-migration-guides/202009.0/migration-guide-productlabelgui.html
  - /docs/scos/dev/module-migration-guides/202108.0/migration-guide-productlabelgui.html
related:
  - title: Migration guide - Product
    link: docs/scos/dev/module-migration-guides/migration-guide-product.html
  - title: Migration guide - Product Label
    link: docs/scos/dev/module-migration-guides/migration-guide-productlabel.html
---

## Upgrading from version 2.* to version 3.*

Version 3.* of the ProductLabelGui module adds the possibility to assign stores to the product labels in the Back Office.

 To upgrade to the new version of the module, do the following:

1. Upgrade the ProductLabelStorage module to the new version:
```bash
composer require spryker/product-label-gui:"^3.0.0" --update-with-dependencies
```
2. Regenerate data transfer object:
```bash
console transfer:generate
```
3. Add the `StoreRelationToggleFormTypePlugin` to`\Pyz\Zed\ProductLabelGui\ProductLabelGuiDependencyProvider`:
```php
<?php

namespace Pyz\Zed\ProductLabelGui;

use Spryker\Zed\Kernel\Communication\Form\FormTypeInterface;
use Spryker\Zed\ProductLabelGui\ProductLabelGuiDependencyProvider as SprykerProductLabelGuiDependencyProvider;
use Spryker\Zed\Store\Communication\Plugin\Form\StoreRelationToggleFormTypePlugin;

class ProductLabelGuiDependencyProvider extends SprykerProductLabelGuiDependencyProvider
{
    /**
     * @return \Spryker\Zed\Kernel\Communication\Form\FormTypeInterface
     */
    protected function getStoreRelationFormTypePlugin(): FormTypeInterface
    {
        return new StoreRelationToggleFormTypePlugin();
    }
}
```

## Upgrading from version 1.* to version 2.*

In version 2 we have added multi-currency support. First of all make sure you [migrated the Price module](/docs/scos/dev/module-migration-guides/migration-guide-price.html). We have changed ZED tables to use `PriceProductFacade` instead of the database join to get price, because that requires additional business logic processing before deciding which price to display. If you changed `AbstractRelatedProductTable` or `RelatedProductTableQueryBuilder`, check core implementation and update accordingly.

<!--Last review date: Nov 23, 2017 by Aurimas Ličkus  -->
