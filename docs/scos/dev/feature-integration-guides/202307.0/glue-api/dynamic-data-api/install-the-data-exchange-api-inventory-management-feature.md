---
title: Install the Data Exchange API + Inventory Management feature
description: Install the Data Exchange API + Inventory Management features in your project.
last_updated: Sep 06, 2023
template: feature-integration-guide-template
---

This document describes how to integrate the Data Exchange API + Inventory Management feature into a Spryker project.

## Install feature core

Follow the steps below to install the Data Exchange API + Inventory Management feature core.

### Prerequisites

Install the required features:

| NAME              | VERSION          | INTEGRATION GUIDE |
|-------------------|------------------|------------------|
| Data Exchange API | {{page.version}} | [Data Exchange API integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/glue-api/dynamic-data-api/data-exchange-api-integration.html) |
| Inventory Management  | {{page.version}} | [Install the Inventory Management feature](/docs/pbc/all/warehouse-management-system/{{page.version}}/unified-commerce/install-and-upgrade/install-the-inventory-management-feature.html) |

### 1) Set up behavior

Register the following plugins:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
|---|---|---|---|
| AvailabilityDynamicEntityPostUpdatePlugin | Checks if `spy_stock_product` is updated and updates availability. | None | Spryker\Zed\Availability\Communication\Plugin\DynamicEntity |
| AvailabilityDynamicEntityPostCreatePlugin | Checks if `spy_stock_product` is updated and updates availability. | None | Spryker\Zed\Availability\Communication\Plugin\DynamicEntity |

**src/Pyz/Zed/DynamicEntity/DynamicEntityDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\DynamicEntity;

use Spryker\Zed\Availability\Communication\Plugin\DynamicEntity\AvailabilityDynamicEntityPostCreatePlugin;
use Spryker\Zed\Availability\Communication\Plugin\DynamicEntity\AvailabilityDynamicEntityPostUpdatePlugin;
use Spryker\Zed\DynamicEntity\DynamicEntityDependencyProvider as SprykerDynamicEntityDependencyProvider;

class DynamicEntityDependencyProvider extends SprykerDynamicEntityDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\DynamicEntityExtension\Dependency\Plugin\DynamicEntityPostUpdatePluginInterface>
     */
    protected function getDynamicEntityPostUpdatePlugins(): array
    {
        return [
            new AvailabilityDynamicEntityPostUpdatePlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\DynamicEntityExtension\Dependency\Plugin\DynamicEntityPostCreatePluginInterface>
     */
    protected function getDynamicEntityPostCreatePlugins(): array
    {
        return [
            new AvailabilityDynamicEntityPostCreatePlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that after updating stock data - product availability is updated as well.

{% endinfo_block %}
