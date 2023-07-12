This document describes how to integrate the Warehouse picking + [Inventory Management](/docs/pbc/all/warehouse-management-system/{{site.version}}/inventory-management-feature-overview.html) feature into a Spryker project.

## Install feature core

Follow the steps below to install the Warehouse Picking + Inventory Management feature.

### Prerequisites

To start feature integration, integrate the required features:

| NAME                 | VERSION          | INTEGRATION GUIDE                                                                                                                                 |
|----------------------|------------------|---------------------------------------------------------------------------------------------------------------------------------------------------|
| Warehouse Picking    | {{site.version}} | [Warehouse Picking feature integration](/docs/scos/dev/feature-integration-guides/{{site.version}}/install-the-warehouse-picking-feature.html)    |
| Inventory Management | {{site.version}} | [Inventory Management feature integration](docs/scos/dev/feature-integration-guides/{{site.version}}/install-the-inventory-management-feature.md) |

## 1) Install the required modules using Composer

```bash
composer require spryker/picking-lists-warehouses-backend-resource-relationship:"^0.1.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following module has been installed:

| MODULE                                            | EXPECTED DIRECTORY                                                    |
|---------------------------------------------------|-----------------------------------------------------------------------|
| PickingListsWarehousesBackendResourceRelationship | vendor/spryker/picking-lists-warehouses-backend-resource-relationship |

{% endinfo_block %}

### 2) Set up behavior

Enable the following plugins.

| PLUGIN                                                    | SPECIFICATION                                                                | PREREQUISITES | NAMESPACE                                                                                                                     |
|-----------------------------------------------------------|------------------------------------------------------------------------------|---------------|-------------------------------------------------------------------------------------------------------------------------------|
| WarehousesByPickingListsBackendResourceRelationshipPlugin | Adds `warehouses` resources as a relationships to `picking-lists` resources. |               | Spryker\Glue\PickingListsWarehousesBackendResourceRelationship\Plugin\GlueBackendApiApplicationGlueJsonApiConventionConnector |


**src/Pyz/Glue/GlueBackendApiApplicationGlueJsonApiConventionConnector/GlueBackendApiApplicationGlueJsonApiConventionConnectorDependencyProvider.php**

```php
<?php

namespace Pyz\Glue\GlueBackendApiApplicationGlueJsonApiConventionConnector;

use Spryker\Glue\GlueBackendApiApplicationGlueJsonApiConventionConnector\GlueBackendApiApplicationGlueJsonApiConventionConnectorDependencyProvider as SprykerGlueBackendApiApplicationGlueJsonApiConventionConnectorDependencyProvider;
use Spryker\Glue\GlueJsonApiConventionExtension\Dependency\Plugin\ResourceRelationshipCollectionInterface;
use Spryker\Glue\PickingListsBackendApi\PickingListsBackendApiConfig;
use Spryker\Glue\PickingListsWarehousesBackendResourceRelationship\Plugin\GlueBackendApiApplicationGlueJsonApiConventionConnector\WarehousesByPickingListsBackendResourceRelationshipPlugin;

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
            PickingListsBackendApiConfig::RESOURCE_PICKING_LISTS,
            new WarehousesByPickingListsBackendResourceRelationshipPlugin(),
        );

        return $resourceRelationshipCollection;
    }
}
```

{% info_block warningBox "Verification" %}

Make sure you have a `warehouses` resource as a relationship to `picking-lists` when you do a request.

`GET https://glue-backend.mysprykershop.com/picking-lists/{% raw %}{{{% endraw %}picking-list-uuid{% raw %}}{{% endraw %}?include=warehouses`
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
            "warehouses": {
                "data": [
                    {
                        "id": "834b3731-02d4-5d6f-9a61-d63ae5e70517",
                        "type": "warehouses"
                    }
                ]
            }
        },
        "links": {
            "self": "https://glue-backend.mysprykershop.com/picking-lists/14baa0f3-e6e7-5aa8-bc6c-c02ec39ca77b?include=warehouses"
        }
    },
    "included": [
        {
            "id": "834b3731-02d4-5d6f-9a61-d63ae5e70517",
            "type": "warehouses",
            "attributes": {
                "name": "Warehouse1"
            },
            "links": {
                "self": "https://glue-backend.mysprykershop.com/warehouses/834b3731-02d4-5d6f-9a61-d63ae5e70517?include=warehouses"
            }
        }
    ]
}
```
</details>

{% endinfo_block %}
