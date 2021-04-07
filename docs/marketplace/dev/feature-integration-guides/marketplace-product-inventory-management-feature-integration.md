---
title: Marketplace Product + Inventory Management feature integration
last_updated: Dec 07, 2020
summary: This document describes the process how to integrate the Marketplace Product + Inventory Management feature into a Spryker project.
---

## Install Feature Core
### Prerequisites
To start feature integration, overview and install the necessary features:

| Name | Version | Link |
|-|-|-|
| Spryker Core | master | [[PUBLISHED] Glue API: Spryker Core feature integration - ongoing](https://spryker.atlassian.net/l/c/KXkyvNgf)  |
| Marketplace Merchant | master | [[WIP] Marketplace Merchant Feature Integration - ongoing](https://spryker.atlassian.net/l/c/nLJp1kNH)   |
| Product Management | master | [Inventory Management Feature Integration - ongoing](https://spryker.atlassian.net/l/c/xvoax8TT)  |

### 1) Setup Behavior
Enable the following behaviors by registering the plugins:

| Plugin | Description | Prerequisites | Namespace |
|-|-|-|-|
| MerchantProductAvailabilityAbstractTableQueryCriteriaExpanderPlugin |  Expands QueryCriteriaTransfer with QueryJoinTransfer for filtering by idMerchant. | None | Spryker\Zed\MerchantProductGui\Communication\Plugin\AvailabilityGui |
| MerchantProductAvailabilityViewActionViewDataExpanderPlugin | Expands view data for product availability with merchant data. | None | Spryker\Zed\MerchantProductGui\Communication\Plugin\AvailabilityGui |

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

Make sure that you can filter product availabilities by merchant at http://zed.de.demo-spryker.com/product-management.
