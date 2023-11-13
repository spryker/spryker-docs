


This document describes how to install the Warehouse picking + [Product](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/feature-overviews/product-feature-overview/product-feature-overview.html) feature.

## Prerequisites

Install the required features:

| NAME              | VERSION          | INSTALLATION GUIDE                                                                                                                                                 |
|-------------------|------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Warehouse Picking | {{page.version}} | [Install the Warehouse Picking feature](/docs/pbc/all/install-features/{{page.version}}/install-the-warehouse-picking-feature.html)                    |
| Product           | {{page.version}} | [Install the Product feature](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-product-feature.html) |

## 1) Set up behavior

Enable the following plugins.

| PLUGIN                                                              | SPECIFICATION                                                                           | PREREQUISITES | NAMESPACE                                                                                      |
|---------------------------------------------------------------------|-----------------------------------------------------------------------------------------|---------------|------------------------------------------------------------------------------------------------|
| ConcreteProductsByPickingListItemsBackendResourceRelationshipPlugin | Adds the `concrete-products` resource as a relationship to the `picking-list-items` resource. |               | Spryker\Glue\ProductsBackendApi\Plugin\GlueBackendApiApplicationGlueJsonApiConventionConnector |


**src/Pyz/Glue/GlueBackendApiApplicationGlueJsonApiConventionConnector/GlueBackendApiApplicationGlueJsonApiConventionConnectorDependencyProvider.php**

```php
<?php

namespace Pyz\Glue\GlueBackendApiApplicationGlueJsonApiConventionConnector;

use Spryker\Glue\GlueBackendApiApplicationGlueJsonApiConventionConnector\GlueBackendApiApplicationGlueJsonApiConventionConnectorDependencyProvider as SprykerGlueBackendApiApplicationGlueJsonApiConventionConnectorDependencyProvider;
use Spryker\Glue\GlueJsonApiConventionExtension\Dependency\Plugin\ResourceRelationshipCollectionInterface;
use Spryker\Glue\PickingListsBackendApi\PickingListsBackendApiConfig;
use Spryker\Glue\ProductsBackendApi\Plugin\GlueBackendApiApplicationGlueJsonApiConventionConnector\ConcreteProductsByPickingListItemsBackendResourceRelationshipPlugin;

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
            new ConcreteProductsByPickingListItemsBackendResourceRelationshipPlugin(),
        );

        return $resourceRelationshipCollection;
    }
}


```

{% info_block warningBox "Verification" %}

Send the request: `GET https://glue-backend.mysprykershop.com/picking-lists/{% raw %}{{{% endraw %}picking-list-uuid{% raw %}}{{% endraw %}?include=picking-list-items,concrete-products`.

Make sure the `concrete-products` resource is returned as a relationship to the `picking-list-items` resource.

<details>
  <summary markdown='span'>Response sample</summary>
```json
{
    "data": {
        "id": "14baa0f3-e6e7-5aa8-bc6c-c02ec39ca77b",
        "type": "picking-lists",
        "attributes": {
            "status": "ready-for-picking",
            "createdAt": "2023-03-23 15:47:07.000000",
            "updatedAt": "2023-03-23 15:49:57.000000"
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
            "self": "https://glue-backend.mysprykershop.com/picking-lists/14baa0f3-e6e7-5aa8-bc6c-c02ec39ca77b?include=picking-list-items,concrete-products"
        }
    },
    "included": [
        {
            "id": "141_29380410",
            "type": "concrete-products",
            "attributes": {
                "sku": "141_29380410",
                "name": "Asus Zenbook US303UB"
            },
            "links": {
                "self": "https://glue-backend.mysprykershop.com/concrete-products/141_29380410?include=picking-list-items,concrete-products"
            }
        },
        {
            "id": "65bb3aec-0a45-5ec6-9b12-bbca6551d87f",
            "type": "picking-list-items",
            "attributes": {
                "quantity": 1,
                "numberOfPicked": 0,
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
                "concrete-products": {
                    "data": [
                        {
                            "id": "141_29380410",
                            "type": "concrete-products"
                        }
                    ]
                }
            },
            "links": {
                "self": "https://glue-backend.mysprykershop.com/picking-list-items/65bb3aec-0a45-5ec6-9b12-bbca6551d87f?include=picking-list-items,concrete-products"
            }
        }
    ]
}
```
</details>

{% endinfo_block %}
