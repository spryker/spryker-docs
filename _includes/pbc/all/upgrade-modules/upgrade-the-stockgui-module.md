

## Upgrading from version 1.* to version 2.0.0

In this new version of the `StockGui` module, we have added support of the warehouse per store. You can find more details about the changes on the [StockGui module](https://github.com/spryker/stock-gui/releases) release page.

*Estimated migration time: 5 min*

To upgrade to the new version of the module, do the following:

1. Follow the steps in the individual migration guide for the **Stock** module. For more information, see [Upgrade the Stock module](/docs/pbc/all/product-information-management/{{site.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-stock-module.html#upgrading-from-version-7-to-version-800).

2. Upgrade the `StockGui` module to the new version:

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
