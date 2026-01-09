This document describes how to install the Marketplace Product + Inventory Management feature.

## Install feature core

Follow the steps below to install the Marketplace Product + Inventory Management feature core.

### Prerequisites

Install the required features:

| NAME | VERSION | INSTALLATION GUIDE |
|-|-|-|
| Spryker Core | 202507.0 | [Install the Spryker Core Glue API](/docs/pbc/all/miscellaneous/latest/install-and-upgrade/install-glue-api/install-the-spryker-core-glue-api.html)  |
| Marketplace Merchant | 202507.0 | [Install the Marketplace Merchant feature](/docs/pbc/all/merchant-management/latest/marketplace/install-and-upgrade/install-features/install-the-marketplace-merchant-feature.html)   |
| Inventory Management | 202507.0 | [Install the Inventory Management feature](/docs/pbc/all/warehouse-management-system/latest/base-shop/install-and-upgrade/install-features/install-the-inventory-management-feature.html)  |

### Set up behavior

Enable the following behaviors by registering the plugins:

| PLUGIN | DESCRIPTION | PREREQUISITES | NAMESPACE |
|-|-|-|-|
| MerchantProductAvailabilityAbstractTableQueryCriteriaExpanderPlugin |  Expands QueryCriteriaTransfer with QueryJoinTransfer for filtering by idMerchant. |  | Spryker\Zed\MerchantProductGui\Communication\Plugin\AvailabilityGui |
| MerchantProductAvailabilityViewActionViewDataExpanderPlugin | Expands view data for product availability with merchant data. |  | Spryker\Zed\MerchantProductGui\Communication\Plugin\AvailabilityGui |

**src/Pyz/Zed/AvailabilityGui/AvailabilityGuiDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\AvailabilityGui;

use Spryker\Zed\AvailabilityGui\AvailabilityGuiDependencyProvider as SprykerAvailabilityGuiDependencyProvider;
use Spryker\Zed\MerchantProductGui\Communication\Plugin\AvailabilityGui\MerchantProductAvailabilityAbstractTableQueryCriteriaExpanderPlugin;
use Spryker\Zed\MerchantProductGui\Communication\Plugin\AvailabilityGui\MerchantProductAvailabilityViewActionViewDataExpanderPlugin;

class AvailabilityGuiDependencyProvider extends SprykerAvailabilityGuiDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\AvailabilityGuiExtension\Dependency\Plugin\AvailabilityViewActionViewDataExpanderPluginInterface>
     */
    protected function getAvailabilityViewActionViewDataExpanderPlugins(): array
    {
        return [
            new MerchantProductAvailabilityViewActionViewDataExpanderPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\AvailabilityGuiExtension\Dependency\Plugin\AvailabilityAbstractTableQueryCriteriaExpanderPluginInterface>
     */
    protected function getAvailabilityAbstractTableQueryCriteriaExpanderPlugins(): array
    {
        return [
            new MerchantProductAvailabilityAbstractTableQueryCriteriaExpanderPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that you can filter product availabilities by merchant at `http://zed.de.demo-spryker.com/product-management`.

{% endinfo_block %}
