---
title: Marketplace Product + Inventory Management feature integration
last_updated: Dec 07, 2020
description: This document describes the process how to integrate the Marketplace Product + Inventory Management feature into a Spryker project.
template: feature-integration-guide-template
---

This document describes how to integrate the Marketplace Product + Inventory Management feature into a Spryker project.

## Install feature core

Follow the steps below to install the Marketplace Product + Inventory Management feature core.

### Prerequisites

To start feature integration, integrate the required features:

| NAME | VERSION | INTEGRATION GUIDE |
|-|-|-|
| Spryker Core | {{page.version}} | [Glue API: Spryker Core feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/glue-api/glue-api-spryker-core-feature-integration.html)  |
| Marketplace Merchant | {{page.version}} | [Marketplace Merchant feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/marketplace-merchant-feature-integration.html)   |
| Inventory Management | {{page.version}} | [Inventory Management feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/inventory-management-feature-integration.html))  |

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
     * @return \Spryker\Zed\AvailabilityGuiExtension\Dependency\Plugin\AvailabilityViewActionViewDataExpanderPluginInterface[]
     */
    protected function getAvailabilityViewActionViewDataExpanderPlugins(): array
    {
        return [
            new MerchantProductAvailabilityViewActionViewDataExpanderPlugin(),
        ];
    }

    /**
     * @return \Spryker\Zed\AvailabilityGuiExtension\Dependency\Plugin\AvailabilityAbstractTableQueryCriteriaExpanderPluginInterface[]
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
