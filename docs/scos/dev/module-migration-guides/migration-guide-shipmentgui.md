---
title: Migration guide - ShipmentGui
description: Use the guide to migrate to a new version of the ShipmentGui module.
last_updated: Jun 16, 2021
template: module-migration-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/mg-shipment-gui
originalArticleId: 2225c9ac-ef76-456b-b6f3-a425521eb4ea
redirect_from:
  - /2021080/docs/mg-shipment-gui
  - /2021080/docs/en/mg-shipment-gui
  - /docs/mg-shipment-gui
  - /docs/en/mg-shipment-gui
  - /v4/docs/mg-shipment-gui
  - /v4/docs/en/mg-shipment-gui
  - /v5/docs/mg-shipment-gui
  - /v5/docs/en/mg-shipment-gui
  - /v6/docs/mg-shipment-gui
  - /v6/docs/en/mg-shipment-gui
  - /docs/scos/dev/module-migration-guides/202001.0/migration-guide-shipmentgui.html
  - /docs/scos/dev/module-migration-guides/202005.0/migration-guide-shipmentgui.html
  - /docs/scos/dev/module-migration-guides/202009.0/migration-guide-shipmentgui.html
  - /docs/scos/dev/module-migration-guides/202108.0/migration-guide-shipmentgui.html
---

## Upgrading from Version 1.* to Version 2.0.0

In the version 2.0.0 of the **ShipmentGui** module, we have added the ability to assign a delivery method to a store in the Back Office. You can find more details about the changes on the [ShipmentGui module](https://github.com/spryker/shipment-gui/releases) release page.

**To upgrade to the new version of the module, do the following:**

1. Upgrade the **ShipmentGui** module to the new version:

```bash
composer require spryker/shipment-gui:"^2.0.0" --update-with-dependencies
```
2. Generate the transfer objects:

```bash
console transfer:generate
```
3. Register the following form plugins:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| `MoneyCollectionFormTypePlugin` | Represents the money collection fields based on stores, currencies, and price types defined in the system. | None | `Spryker\Zed\Money\Communication\Plugin\Form` |
| `StoreRelationToggleFormTypePlugin` | Represents a store relation toggle form based on stores registered in the system. | None | `Spryker\Zed\Store\Communication\Plugin\Form` |

src/Pyz/Zed/ShipmentGui/ShipmentGuiDependencyProvider.php

```php
<?php

namespace Pyz\Zed\ShipmentGui;

use Spryker\Zed\Kernel\Communication\Form\FormTypeInterface;
use Spryker\Zed\Kernel\Container;
use Spryker\Zed\Money\Communication\Plugin\Form\MoneyCollectionFormTypePlugin;
use Spryker\Zed\ShipmentGui\ShipmentGuiDependencyProvider as SprykerShipmentGuiDependencyProvider;
use Spryker\Zed\Store\Communication\Plugin\Form\StoreRelationToggleFormTypePlugin;

class ShipmentGuiDependencyProvider extends SprykerShipmentGuiDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Communication\Form\FormTypeInterface
     */
    protected function getMoneyCollectionFormTypePlugin(Container $container): FormTypeInterface
    {
        return new MoneyCollectionFormTypePlugin();
    }

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
