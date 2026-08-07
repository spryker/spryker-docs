---
title: Upgrade the ProductLabelGui module
description: Use the guide to learn how to update the ProductLabelGui module to a newer version.
last_updated: Aug 6, 2026
template: module-migration-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/mg-product-label-gui
originalArticleId: aa0f3904-286a-4b8c-a895-4cf1cdefd457
redirect_from:
  - /docs/scos/dev/module-migration-guides/201811.0/migration-guide-productlabelgui.html
  - /docs/scos/dev/module-migration-guides/201903.0/migration-guide-productlabelgui.html
  - /docs/scos/dev/module-migration-guides/201907.0/migration-guide-productlabelgui.html
  - /docs/scos/dev/module-migration-guides/202001.0/migration-guide-productlabelgui.html
  - /docs/scos/dev/module-migration-guides/202005.0/migration-guide-productlabelgui.html
  - /docs/scos/dev/module-migration-guides/202009.0/migration-guide-productlabelgui.html
  - /docs/scos/dev/module-migration-guides/202108.0/migration-guide-productlabelgui.html
  - /docs/scos/dev/module-migration-guides/migration-guide-productlabelgui.html
  - /docs/pbc/all/product-information-management/202204.0/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-productlabelgui-module.html
related:
  - title: Upgrade the Product module
    link: docs/pbc/all/product-information-management/latest/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-product-module.html
  - title: Upgrade the ProductLabel module
    link: docs/pbc/all/product-information-management/latest/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-productlabel-module.html
---

## Upgrading from version 2.* to version 3.*

Version 3.* of the `ProductLabelGui` module adds the possibility to assign stores to the product labels in the Back Office.

To upgrade to the new version of the module, do the following:

1. Upgrade the `ProductLabelStorage` module to the new version:

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

In version 2 we have added multi-currency support. First of all make sure you [migrated the Price module](/docs/pbc/all/price-management/{{site.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-price-module.html). We have changed ZED tables to use `PriceProductFacade` instead of the database join to get price, because that requires additional business logic processing before deciding which price to display. If you changed `AbstractRelatedProductTable` or `RelatedProductTableQueryBuilder`, check core implementation and update accordingly.
