


This document describes how to integrate the Warehouse picking + [Shipment](/docs/scos/user/features/{{site.version}}/shipment/shipment-feature-overview.html) feature into a Spryker project.

## Install feature core

Follow the steps below to install the Warehouse Picking + Shipment feature.
To start feature integration, integrate the required features:

### Prerequisites

To start feature integration, integrate the required features:

| NAME              | VERSION          | INTEGRATION GUIDE                                                                                                                              |
|-------------------|------------------|------------------------------------------------------------------------------------------------------------------------------------------------|
| Warehouse Picking | {{page.version}} | [Warehouse Picking feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/install-the-warehouse-picking-feature.html) |
| Shipment          | {{page.version}} | [Shipment feature integration](/docs/pbc/all/carrier-management/{{page.version}}/base-shop/install-and-upgrade/install-the-shipment-feature.html)        |

## 1) Install the required modules using Composer

```bash
composer require spryker/picking-lists-shipments-backend-resource-relationship:"^0.1.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following module has been installed:

| MODULE                                           | EXPECTED DIRECTORY                                                    |
|--------------------------------------------------|-----------------------------------------------------------------------|
| PickingListsShipmentsBackendResourceRelationship | vendor/spryker/picking-lists-shipments-backend-resource-relationship  |

{% endinfo_block %}

### 2) Set up behavior

Enable the following plugins.

| PLUGIN                                                        | SPECIFICATION                                                                         | PREREQUISITES | NAMESPACE                                                                                                                    |
|---------------------------------------------------------------|---------------------------------------------------------------------------------------|---------------|------------------------------------------------------------------------------------------------------------------------------|
| SalesShipmentsByPickingListsBackendResourceRelationshipPlugin | Adds `sales-shipments` resources as a relationship to `picking-list-items` resources. |               | Spryker\Glue\PickingListsShipmentsBackendResourceRelationship\Plugin\GlueBackendApiApplicationGlueJsonApiConventionConnector |


**src/Pyz/Glue/GlueBackendApiApplicationGlueJsonApiConventionConnector/GlueBackendApiApplicationGlueJsonApiConventionConnectorDependencyProvider.php**

```php
<?php

namespace Pyz\Glue\GlueBackendApiApplicationGlueJsonApiConventionConnector;

use Spryker\Glue\GlueBackendApiApplicationGlueJsonApiConventionConnector\GlueBackendApiApplicationGlueJsonApiConventionConnectorDependencyProvider as SprykerGlueBackendApiApplicationGlueJsonApiConventionConnectorDependencyProvider;
use Spryker\Glue\GlueJsonApiConventionExtension\Dependency\Plugin\ResourceRelationshipCollectionInterface;
use Spryker\Glue\PickingListsBackendApi\PickingListsBackendApiConfig;
use Spryker\Glue\PickingListsShipmentsBackendResourceRelationship\Plugin\GlueBackendApiApplicationGlueJsonApiConventionConnector\SalesShipmentsByPickingListsBackendResourceRelationshipPlugin;

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
            new SalesShipmentsByPickingListsBackendResourceRelationshipPlugin(),
        );

        return $resourceRelationshipCollection;
    }
}


```

{% info_block warningBox "Verification" %}

Make sure you have a `sales-shipments` resource as a relationship to `picking-list-items` when you do a request.

`GET https://glue-backend.mysprykershop.com/picking-lists/{% raw %}{{{% endraw %}picking-list-uuid{% raw %}}{{% endraw %}?include=picking-list-items,sales-shipments`
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
            "self": "https://glue-backend.mysprykershop.com/picking-lists/14baa0f3-e6e7-5aa8-bc6c-c02ec39ca77b?include=picking-list-items,sales-shipments"
        }
    },
    "included": [
        {
            "id": "84935e86-ef86-507f-9c23-54942486d8cb",
            "type": "sales-shipments",
            "attributes": {
                "requestedDeliveryDate": "2023-04-20"
            },
            "links": {
                "self": "https://glue-backend.mysprykershop.com/sales-shipments/84935e86-ef86-507f-9c23-54942486d8cb?include=picking-list-items,sales-shipments"
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
                "sales-shipments": {
                    "data": [
                        {
                            "id": "84935e86-ef86-507f-9c23-54942486d8cb",
                            "type": "sales-shipments"
                        }
                    ]
                }
            },
            "links": {
                "self": "https://glue-backend.mysprykershop.com/picking-list-items/65bb3aec-0a45-5ec6-9b12-bbca6551d87f?include=picking-list-items,sales-shipments"
            }
        }
    ]
}
```
</details>

{% endinfo_block %}
