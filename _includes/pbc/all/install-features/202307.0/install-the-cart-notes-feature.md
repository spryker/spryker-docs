

{% info_block errorBox %}

This feature integration guide expects the basic feature to be in place.
The current feature integration guide adds the Cart Notes Backend API functionality.

{% endinfo_block %}

## Prerequisites

To start feature integration, integrate the required feature:

| NAME             | VERSION          | INSTALLATION GUIDE                                                                                                                              |
|------------------|------------------|----------------------------------------------------------------------------------------------------------------------------------------------|
| Order Management | {{page.version}} | [Install the Order Management feature](/docs/pbc/all/order-management-system/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-order-management-feature.html) |

## 1) Install the required modules

```bash
composer require spryker/cart-notes-backend-api:^0.1.0 --update-with-dependencies
```

Make sure the following modules have been installed:

| MODULE                | EXPECTED DIRECTORY                      |
|-----------------------|-----------------------------------------|
| CartNotesBackendApi   | vendor/spryker/cart-notes-backend-api   |

## 2) Set up transfer objects

Generate transfers:

```bash
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure that the following changes have been triggered in transfer objects:

| TRANSFER                     | TYPE     | EVENT   | PATH                                              |
|------------------------------|----------|---------|---------------------------------------------------|
| ApiOrdersAttributes.cartNote | property | created | src/Generated/Shared/Transfer/ApiOrdersAttributes |

{% endinfo_block %}

## 3) Set up behavior

1. Enable the following behaviors by registering the plugins:

| PLUGIN                                   | SPECIFICATION                                                          | PREREQUISITES | NAMESPACE                                                     |
|------------------------------------------|------------------------------------------------------------------------|---------------|---------------------------------------------------------------|
| CartNoteApiOrdersAttributesMapperPlugin  | Expands `ApiOrdersAttributes.cartNote` with `Order.cartNote` property. |               | Spryker\Glue\CartNotesBackendApi\Plugin\SalesOrdersBackendApi |

**src/Pyz/Glue/SalesOrdersBackendApi/SalesOrdersBackendApiDependencyProvider.php**

```php
<?php

namespace Pyz\Glue\SalesOrdersBackendApi;

use Spryker\Glue\CartNotesBackendApi\Plugin\SalesOrdersBackendApi\CartNoteApiOrdersAttributesMapperPlugin;
use Spryker\Glue\SalesOrdersBackendApi\SalesOrdersBackendApiDependencyProvider as SprykerSalesOrdersBackendApiDependencyProvider;

class SalesOrdersBackendApiDependencyProvider extends SprykerSalesOrdersBackendApiDependencyProvider
{
    /**
     * @return list<\Spryker\Glue\SalesOrdersBackendApiExtension\Dependency\Plugin\ApiOrdersAttributesMapperPluginInterface>
     */
    protected function getApiOrdersAttributesMapperPlugins(): array
    {
        return [
            new CartNoteApiOrdersAttributesMapperPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that `sales-orders` resources from `SalesOrdersBackendApiResource::getOrderResourceCollection()` results contain cart note data: `OrderResourceCollectionTransfer.orderResources.attributes.cartNote` are set for the orders that have cart notes.

{% endinfo_block %}