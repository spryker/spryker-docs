


This document describes how to integrate the Picking App feature API into a Spryker project.

## Install feature core

Follow the steps below to install the Picking App feature API.

## Prerequisites

To start feature integration, integrate the required features and Glue APIs:

| NAME             | VERSION          | INTEGRATION GUIDE                                                                                                                                                |
|------------------|------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Spryker Core API | {{site.version}} | [Glue API: Spryker Core feature integration](/docs/scos/dev/feature-integration-guides/{{site.version}}/glue-api/glue-api-spryker-core-feature-integration.html) |
| Picking App      | {{site.version}} | [Picking App feature integration](/docs/scos/dev/feature-integration-guides/{{site.version}}/picking-app-feature-integration-guide.md)                           |

## 1) Install the required modules using Composer

Install the required modules:

```bash
composer install spryker/user-backend-api:"^0.1.0" spryker/warehouse-user-backend-api:"^0.1.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| MODULE                  | EXPECTED DIRECTORY                        |
|-------------------------|-------------------------------------------|
| UserBackendApi          | vendor/spryker/user-backend-api           |
| WarehouseUserBackendApi | vendor/spryker/warehouse-user-backend-api |

{% endinfo_block %}

## 2) Set up configuration

Adjust the protected paths configuration if you want to make `warehouse-user-assignments` resource protected:

**src/Pyz/Shared/GlueBackendApiApplicationAuthorizationConnector/GlueBackendApiApplicationAuthorizationConnectorConfig.php**

```php
<?php

namespace Pyz\Shared\GlueBackendApiApplicationAuthorizationConnector;

use Spryker\Shared\GlueBackendApiApplicationAuthorizationConnector\GlueBackendApiApplicationAuthorizationConnectorConfig as SprykerGlueBackendApiApplicationAuthorizationConnectorConfig;

class GlueBackendApiApplicationAuthorizationConnectorConfig extends SprykerGlueBackendApiApplicationAuthorizationConnectorConfig
{
    /**
     * @return array<string, mixed>
     */
    public function getProtectedPaths(): array
    {
        return [
            '/\/warehouse-user-assignments(?:\/[^\/]+)?\/?$/' => [
                'isRegularExpression' => true,
            ],
        ];
    }
}

```

## 3) Set up transfer objects

Generate transfers:
```bash
vendor/bin/console transfer:generate
```

{% info_block warningBox "Verification" %}

Ensure that the following changes have occurred in transfer objects:

| TRANSFER                               | TYPE  | EVENT   | PATH                                                                 |
|----------------------------------------|-------|---------|----------------------------------------------------------------------|
| WarehouseUserAssignmentsRestAttributes | class | created | src/Generated/Shared/Transfer/WarehouseUserAssignmentsRestAttributes |
| WarehousesRestAttributes               | class | created | src/Generated/Shared/Transfer/WarehousesRestAttributes               |

{% endinfo_block %}

## 4) Set up behavior

Set up the following behaviors.

Activate the following plugin:

| PLUGIN                                                  | SPECIFICATION                                                                             | PREREQUISITES | NAMESPACE                                                   |
|---------------------------------------------------------|-------------------------------------------------------------------------------------------|---------------|-------------------------------------------------------------|
| WarehouseUserAssignmentsResourcePlugin                  | Registers the `warehouse-user-assignments` resource.                                      |               | Spryker\Glue\WarehouseUserBackendApi\Plugin\GlueApplication |
| UserByWarehouseUserAssignmentResourceRelationshipPlugin | Adds the `users` resource as a relationship to the `warehouse-user-assignments` resource. |               | Spryker\Glue\UserBackendApi\Plugin\GlueJsonApiConvention    |


**src/Pyz/Glue/GlueBackendApiApplication/GlueBackendApiApplicationDependencyProvider.php**

```php
<?php

namespace Pyz\Glue\GlueBackendApiApplication;

use Spryker\Glue\GlueBackendApiApplication\GlueBackendApiApplicationDependencyProvider as SprykerGlueBackendApiApplicationDependencyProvider;
use Spryker\Glue\WarehouseUserBackendApi\Plugin\GlueApplication\WarehouseUserAssignmentsResourcePlugin;

class GlueBackendApiApplicationDependencyProvider extends SprykerGlueBackendApiApplicationDependencyProvider
{
    /**
     * @return array<\Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceInterface>
     */
    protected function getResourcePlugins(): array
    {
        return [
            new WarehouseUserAssignmentsResourcePlugin(),
        ];
    }
}

```

**src/Pyz/Glue/GlueBackendApiApplicationGlueJsonApiConventionConnector/GlueBackendApiApplicationGlueJsonApiConventionConnectorDependencyProvider.php**

```php
<?php

namespace Pyz\Glue\GlueBackendApiApplicationGlueJsonApiConventionConnector;

use Spryker\Glue\GlueBackendApiApplicationGlueJsonApiConventionConnector\GlueBackendApiApplicationGlueJsonApiConventionConnectorDependencyProvider as SprykerGlueBackendApiApplicationGlueJsonApiConventionConnectorDependencyProvider;
use Spryker\Glue\GlueJsonApiConventionExtension\Dependency\Plugin\ResourceRelationshipCollectionInterface;
use Spryker\Glue\UserBackendApi\Plugin\GlueJsonApiConvention\UserByWarehouseUserAssignmentResourceRelationshipPlugin;
use Spryker\Glue\WarehouseUserBackendApi\WarehouseUserBackendApiConfig;

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
            WarehouseUserBackendApiConfig::RESOURCE_TYPE_WAREHOUSE_USER_ASSIGNMENTS,
            new UserByWarehouseUserAssignmentResourceRelationshipPlugin(),
        );

        return $resourceRelationshipCollection;
    }
}

```

{% info_block warningBox "Verification" %}

1. Make sure that you can send the following requests:

* `GET https://glue-backend.mysprykershop.com/warehouse-user-assignments`
* `GET https://glue-backend.mysprykershop.com/warehouse-user-assignments/{% raw %}{{{% endraw %}warehouse-user-assignments-uuid{% raw %}}{{% endraw %}`
* `POST https://glue-backend.mysprykershop.com/warehouse-user-assignments`

```json
{
    "data": {
        "type": "warehouse-user-assignments",
        "attributes": {
            "userUuid": {% raw %}{{{% endraw %}}user-uuid{% raw %}}}{% endraw %},
            "warehouse": {
                "uuid": {% raw %}{{{% endraw %}}warehouse-uuid{% raw %}}}{% endraw %}
            },
            "isActive": true
        }
    }
}
```

* `PATCH https://glue-backend.mysprykershop.com/warehouse-user-assignments/{% raw %}{{{% endraw %}warehouse-user-assignments-uuid{% raw %}}{{% endraw %}`

```json
{
    "data" : {
        "type" : "warehouse-user-assignments",
        "attributes" : {
          "isActive": true
        }
    }
}
```

* `DELETE https://glue-backend.mysprykershop.com/warehouse-user-assignments/{% raw %}{{{% endraw %}warehouse-user-assignments-uuid{% raw %}}{{% endraw %}`.


2. Make sure that when the `users` resource is included as a query string, the `warehouse-user-assignments` resource returns it as a relationship: `https://glue-backend.mysprykershop.com/warehouse-user-assignments?include=users`.

{% endinfo_block %}
