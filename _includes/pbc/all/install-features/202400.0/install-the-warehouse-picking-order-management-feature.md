

This document describes how to integrate the Warehouse picking + [Order Management](/docs/scos/user/features/{{page.version}}/order-management-feature-overview/order-management-feature-overview.html) feature into a Spryker project.

## Install feature core

Follow the steps below to install the Warehouse Picking + Order Management feature core.

### Prerequisites

Install the required features:

| NAME              | VERSION          | INTEGRATION GUIDE                                                                                                                              |
|-------------------|------------------|------------------------------------------------------------------------------------------------------------------------------------------------|
| Warehouse Picking | {{page.version}} | [Warehouse Picking feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/install-the-warehouse-picking-feature.html) |
| Order Management  | {{page.version}} | [Order Management feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/order-management-feature-integration.html)   |

## 1) Install the required modules using Composer

```bash
composer require spryker/picking-lists-sales-orders-backend-resource-relationship:"^0.1.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following module has been installed:

| MODULE                                             | EXPECTED DIRECTORY                                                      |
|----------------------------------------------------|-------------------------------------------------------------------------|
| PickingListsSalesOrdersBackendResourceRelationship | vendor/spryker/picking-lists-sales-orders-backend-resource-relationship |

{% endinfo_block %}

### 2) Set up behavior

Enable the following plugins.

| PLUGIN                                                         | SPECIFICATION                                                                      | PREREQUISITES | NAMESPACE                                                                                                                      |
|----------------------------------------------------------------|------------------------------------------------------------------------------------|---------------|--------------------------------------------------------------------------------------------------------------------------------|
| SalesOrdersByPickingListItemsBackendResourceRelationshipPlugin | Adds `sales-orders` resources as a relationship to `picking-list-items` resources. |               | Spryker\Glue\PickingListsSalesOrdersBackendResourceRelationship\Plugin\GlueBackendApiApplicationGlueJsonApiConventionConnector |


**src/Pyz/Glue/GlueBackendApiApplicationGlueJsonApiConventionConnector/GlueBackendApiApplicationGlueJsonApiConventionConnectorDependencyProvider.php**

```php
<?php

namespace Pyz\Glue\GlueBackendApiApplicationGlueJsonApiConventionConnector;

use Spryker\Glue\GlueBackendApiApplicationGlueJsonApiConventionConnector\GlueBackendApiApplicationGlueJsonApiConventionConnectorDependencyProvider as SprykerGlueBackendApiApplicationGlueJsonApiConventionConnectorDependencyProvider;
use Spryker\Glue\GlueJsonApiConventionExtension\Dependency\Plugin\ResourceRelationshipCollectionInterface;
use Spryker\Glue\PickingListsBackendApi\PickingListsBackendApiConfig;
use Spryker\Glue\PickingListsSalesOrdersBackendResourceRelationship\Plugin\GlueBackendApiApplicationGlueJsonApiConventionConnector\SalesOrdersByPickingListItemsBackendResourceRelationshipPlugin;

class GlueBackendApiApplicationGlueJsonApiConventionConnectorDependencyProvider extends SprykerGlueBackendApiApplicationGlueJsonApiConventionConnectorDependencyProvider
{
    /**
     * @param \Spryker\Glue\GlueJsonApiConventionExtension\Dependency\Plugin\ResourceRelationshipCollectionInterface $resourceRelationshipCollection
     *
     * @return \Spryker\Glue\GlueJsonApiConventionExtension\Dependency\Plugin\ResourceRelationshipCollectionInterface
     */
    protected function getResourceRelationshipPlugins(
        ResourceRelationshipCollectionInterface $resourceRelationshipCollection,
    ): ResourceRelationshipCollectionInterface {
        $resourceRelationshipCollection->addRelationship(
            PickingListsBackendApiConfig::RESOURCE_PICKING_LIST_ITEMS,
            new SalesOrdersByPickingListItemsBackendResourceRelationshipPlugin(),
        );

        return $resourceRelationshipCollection;
    }
}
```

{% info_block warningBox "Verification" %}

Make sure you have the `sales-orders` resource as a relationship to `picking-list-items` when you do a request.

`GET https://glue-backend.mysprykershop.com/picking-lists/{% raw %}{{{% endraw %}picking-list-uuid{% raw %}}{{% endraw %}?include=picking-list-items,sales-orders`
<details>
  <summary markdown='span'>Response body example</summary>
```json
{
    "data": {
        "id": "14baa0f3-e6e7-5aa8-bc6c-c02ec39ca77b",
        "type": "picking-lists",
        "attributes": {
            "status": "picking-finished",
            "createdAt": "2023-03-23 15:47:07.000000",
            "updatedAt": "2023-03-30 12:47:45.000000"
        },
        "relationships": {
            "picking-list-items": {
                "data": [
                    {
                        "id": "65bb3aec-0a45-5ec6-9b12-bbca6551d87f",
                        "type": "picking-list-items"
                    }
                ]
            }
        },
        "links": {
            "self": "https://glue-backend.mysprykershop.com/picking-lists/14baa0f3-e6e7-5aa8-bc6c-c02ec39ca77b?include=picking-list-items,sales-orders"
        }
    },
    "included": [
        {
            "id": "DE--1",
            "type": "sales-orders",
            "attributes": {
                "cartNote": null,
                "orderReference": "DE--1"
            },
            "links": {
                "self": "https://glue-backend.mysprykershop.com/sales-orders/DE--1?include=picking-list-items,sales-orders"
            }
        },
        {
            "id": "65bb3aec-0a45-5ec6-9b12-bbca6551d87f",
            "type": "picking-list-items",
            "attributes": {
                "quantity": 1,
                "numberOfPicked": 1,
                "numberOfNotPicked": 0,
                "orderItem": {
                    "uuid": "31e21001-e544-5533-9754-51331c8c9ac5",
                    "sku": "141_29380410",
                    "quantity": 1,
                    "name": "Asus Zenbook US303UB",
                    "amountSalesUnit": null
                }
            },
            "relationships": {
                "sales-orders": {
                    "data": [
                        {
                            "id": "DE--1",
                            "type": "sales-orders"
                        }
                    ]
                }
            },
            "links": {
                "self": "https://glue-backend.mysprykershop.com/picking-list-items/65bb3aec-0a45-5ec6-9b12-bbca6551d87f?include=picking-list-items,sales-orders"
            }
        }
    ]
}
```
</details>

{% endinfo_block %}
