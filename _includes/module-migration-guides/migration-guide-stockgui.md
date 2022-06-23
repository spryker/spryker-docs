---
title: Migration guide - StockGui
description: Use the guide to learn how to update the StockGui module to a newer version.
last_updated: Jun 16, 2021
template: module-migration-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/mg-stockgui
originalArticleId: 93d3a88f-8414-4eb6-9f88-2dbfd46a3dd0
redirect_from:
  - /2021080/docs/mg-stockgui
  - /2021080/docs/en/mg-stockgui
  - /docs/mg-stockgui
  - /docs/en/mg-stockgui
  - /v4/docs/mg-stockgui
  - /v4/docs/en/mg-stockgui
  - /v5/docs/mg-stockgui
  - /v5/docs/en/mg-stockgui
  - /v6/docs/mg-stockgui
  - /v6/docs/en/mg-stockgui
  - /docs/scos/dev/module-migration-guides/202001.0/migration-guide-stockgui.html
  - /docs/scos/dev/module-migration-guides/202005.0/migration-guide-stockgui.html
  - /docs/scos/dev/module-migration-guides/202009.0/migration-guide-stockgui.html
  - /docs/scos/dev/module-migration-guides/202108.0/migration-guide-stockgui.html
---

## Upgrading from version 1.* to version 2.0.0

In this new version of the **StockGui** module, we have added support of the warehouse per store. You can find more details about the changes on the [StockGui module](https://github.com/spryker/stock-gui/releases) release page.

**To upgrade to the new version of the module, do the following:**

1. Follow the steps in the individual migration guide for the **Stock** module. For more information, see [Migration Guide - Stock](/docs/scos/dev/module-migration-guides/migration-guide-stock.html#upgrading-from-version-7-to-version-800).
2. Upgrade the **StockGui** module to the new version:

```bash
composer require spryker/stock-gui:"^2.0.0" --update-with-dependencies
```

3. Generate the transfer objects:

```bash
console transfer:generate
```

4. Register the following form plugins:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| `StoreRelationToggleFormTypePlugin` | Represents a store relation toggle form based on stores registered in the system. | None | `Spryker\Zed\Store\Communication\Plugin\Form` |

**src/Pyz/Zed/StockGui/StockGuiDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\StockGui;

use Spryker\Zed\Kernel\Communication\Form\FormTypeInterface;
use Spryker\Zed\StockGui\StockGuiDependencyProvider as SprykerStockGuiDependencyProvider;
use Spryker\Zed\Store\Communication\Plugin\Form\StoreRelationToggleFormTypePlugin;

class StockGuiDependencyProvider extends SprykerStockGuiDependencyProvider
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

*Estimated migration time: 5 min*
