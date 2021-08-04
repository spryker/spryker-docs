---
title: Migration Guide - ProductLabelGUI
originalLink: https://documentation.spryker.com/2021080/docs/mg-product-label-gui
redirect_from:
  - /2021080/docs/mg-product-label-gui
  - /2021080/docs/en/mg-product-label-gui
---

## Upgrading from version 2.* to version 3.*
Version 3.* of the ProductLabelGui module adds the possibility to assign stores to the product labels in the Back Office.

 To upgrade to the new version of the module, do the following:

1. Upgrade the ProductLabelStorage module to the new version:
```Bash
composer require spryker/product-label-gui:"^3.0.0" --update-with-dependencies
```
2. Regenerate data transfer object: 
```Bash
console transfer:generate
```
3. Add the `StoreRelationToggleFormTypePlugin` to`\Pyz\Zed\ProductLabelGui\ProductLabelGuiDependencyProvider`:
```PHP
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
In version 2 we have added multi-currency support. First of all make sure you [migrated the Price module](/docs/scos/dev/migration-and-integration/202001.0/module-migration-guides/mg-price). We have changed ZED tables to use `PriceProductFacade` instead of the database join to get price, because that requires additional business logic processing before deciding which price to display. If you changed `AbstractRelatedProductTable` or `RelatedProductTableQueryBuilder`, check core implementation and update accordingly.

<!--Last review date: Nov 23, 2017 by Aurimas Ličkus  -->
