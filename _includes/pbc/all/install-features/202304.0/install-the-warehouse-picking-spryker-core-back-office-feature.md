


This document describes how to integrate the Warehouse picking + [Spryker Core Back Office](/docs/scos/user/features/{{site.version}}/spryker-core-back-office-feature-overview/spryker-core-back-office-feature-overview.html) feature into a Spryker project.

## Install feature core

Follow the steps below to install the Warehouse Picking + Spryker Core Back Office feature.
To start feature integration, integrate the required features:

### Prerequisites

To start feature integration, integrate the required features:

| NAME                     | VERSION          | INTEGRATION GUIDE                                                                                                                                            |
|--------------------------|------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Warehouse Picking        | {{site.version}} | [Warehouse Picking feature integration](/docs/scos/dev/feature-integration-guides/{{site.version}}/install-the-warehouse-picking-feature.html)               |
| Spryker Core Back Office | {{site.version}} | [Spryker Core Back Office feature integration](/docs/scos/dev/feature-integration-guides/{{site.version}}/spryker-core-back-office-feature-integration.html) |

## 1) Install the required modules using Composer

Install the required modules:

```bash
composer require spryker/picking-lists-users-backend-resource-relationship:"^0.1.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following module has been installed:

| MODULE                                       | EXPECTED DIRECTORY                                               |
|----------------------------------------------|------------------------------------------------------------------|
| PickingListsUsersBackendResourceRelationship | vendor/spryker/picking-lists-users-backend-resource-relationship |

{% endinfo_block %}

### 2) Set up behavior

Enable the following plugins.

| PLUGIN                                               | SPECIFICATION                                                          | PREREQUISITES | NAMESPACE                                                                                                                |
|------------------------------------------------------|------------------------------------------------------------------------|---------------|--------------------------------------------------------------------------------------------------------------------------|
| UsersByPickingListsBackendResourceRelationshipPlugin | Adds `users` resources as a relationship to `picking-lists` resources. |               | Spryker\Glue\PickingListsUsersBackendResourceRelationship\Plugin\GlueBackendApiApplicationGlueJsonApiConventionConnector |


**src/Pyz/Glue/GlueBackendApiApplicationGlueJsonApiConventionConnector/GlueBackendApiApplicationGlueJsonApiConventionConnectorDependencyProvider.php**

```php
<?php

namespace Pyz\Glue\GlueBackendApiApplicationGlueJsonApiConventionConnector;

use Spryker\Glue\GlueBackendApiApplicationGlueJsonApiConventionConnector\GlueBackendApiApplicationGlueJsonApiConventionConnectorDependencyProvider as SprykerGlueBackendApiApplicationGlueJsonApiConventionConnectorDependencyProvider;
use Spryker\Glue\GlueJsonApiConventionExtension\Dependency\Plugin\ResourceRelationshipCollectionInterface;
use Spryker\Glue\PickingListsBackendApi\PickingListsBackendApiConfig;
use Spryker\Glue\PickingListsUsersBackendResourceRelationship\Plugin\GlueBackendApiApplicationGlueJsonApiConventionConnector\UsersByPickingListsBackendResourceRelationshipPlugin;

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
            new UsersByPickingListsBackendResourceRelationshipPlugin(),
        );

        return $resourceRelationshipCollection;
    }
}


```

{% info_block warningBox "Verification" %}

Make sure you have a `users` resource as a relationship to `picking-lists` when you do a request.

`GET https://glue-backend.mysprykershop.com/picking-lists/{% raw %}{{{% endraw %}picking-list-uuid{% raw %}}{{% endraw %}?include=users`
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
            "users": {
                "data": [
                    {
                        "id": "84b8f847-d755-5763-b128-8e138e6571fc",
                        "type": "users"
                    }
                ]
            }
        },
        "links": {
            "self": "https://glue-backend.mysprykershop.com/picking-lists/14baa0f3-e6e7-5aa8-bc6c-c02ec39ca77b?include=users"
        }
    },
    "included": [
        {
            "id": "84b8f847-d755-5763-b128-8e138e6571fc",
            "type": "users",
            "attributes": {
                "username": "richard@spryker.com",
                "firstName": "Richard",
                "lastName": "Gere"
            },
            "links": {
                "self": "https://glue-backend.mysprykershop.com/users/84b8f847-d755-5763-b128-8e138e6571fc?include=users"
            }
        }
    ]
}
```
</details>

{% endinfo_block %}
