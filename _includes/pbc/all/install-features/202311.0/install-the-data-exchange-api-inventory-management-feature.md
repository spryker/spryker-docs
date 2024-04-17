This document describes how to install the Data Exchange API + Inventory Management feature.

## Install feature core

Follow the steps below to install the Data Exchange API + Inventory Management feature core.

### Prerequisites

Install the required features:

| NAME              | VERSION          | INSTALLATION GUIDE |
|-------------------|------------------|------------------|
| Data Exchange API | {{page.version}} | [Install the Data Exchange API](/docs/pbc/all/data-exchange/{{page.version}}/install-and-upgrade/install-the-data-exchange-api.html) |
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

Let's say you want to have a new endpoint `/dynamic-data/stock-products` to operate with data in `spy_stock_product` table in the database.

Based on the provided information, the SQL transaction for interacting with the `spy_stock_product` table through the API request via `dynamic-entity/stock-products` would be as follows:

```sql
BEGIN;
INSERT INTO `spy_dynamic_entity_configuration` VALUES (1,'stock-products','spy_stock_product',1,'{"identifier":"id_stock_product","fields":[{"fieldName":"id_stock_product","fieldVisibleName":"id_stock_product","isCreatable":false,"isEditable":false,"validation":{"isRequired": false},"type":"integer"},{"fieldName":"fk_product","fieldVisibleName":"fk_product","isCreatable":true,"isEditable":true,"type":"integer","validation":{"isRequired": true}},{"fieldName":"fk_stock","fieldVisibleName":"fk_stock","isCreatable":true,"isEditable":true,"type":"integer","validation":{"isRequired": true}},{"fieldName":"is_never_out_of_stock","fieldVisibleName":"is_never_out_of_stock","isCreatable":true,"isEditable":true,"type":"boolean","validation":{"isRequired": false}},{"fieldName":"quantity","fieldVisibleName":"quantity","isCreatable":true,"isEditable":true,"type":"integer","validation":{"isRequired": true}}]}', '2023-07-29 12:15:13.0', '2023-07-29 12:15:15.0');
COMMIT;
```

Do the following:

1. Obtain an access token. Follow [How to send a request in Data Exchange API](/docs/pbc/all/data-exchange/{{page.version}}/tutorials-and-howtos/how-to-send-request-in-data-exchange-api.html) for details on how to do that.

2. Send a `PATCH` request. This request needs to include the necessary headers, such as Content-Type, Accept, and Authorization, with the access token provided:

```bash
PATCH /dynamic-entity/stock-products HTTP/1.1
Host: glue-backend.mysprykershop.com
Content-Type: application/json
Accept: application/json
Authorization: Bearer {your_token}
Content-Length: 174
{
    "data": [
        {
            "idStockProduct": 1,
            "quantity": 10
        }
    ]
}
```

3. Make sure that after updating the stock data, the product availability is updated as well:
```sql
SELECT * from spy_availability WHERE sku='PRODUCT_SKU';
```

{% endinfo_block %}
