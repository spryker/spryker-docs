This document describes how to integrate the Spryker Core Back Office + Warehouse User Management Feature into a Spryker project.

## Install feature core

Follow the steps below to install the Picking App feature API.

## Prerequisites

To start feature integration, integrate the required features and Glue APIs:

| NAME                      | VERSION          |
|---------------------------|------------------|
| Spryker Core API          | {{site.version}} |
| Spryker Core Back Office  | {{site.version}} |
| Warehouse User Management | {{site.version}} |

## 1) Install the required modules using Composer

Install the required modules:

```bash
composer install spryker/user-backend-api:"^0.1.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| MODULE                  | EXPECTED DIRECTORY                        |
|-------------------------|-------------------------------------------|
| UserBackendApi          | vendor/spryker/user-backend-api           |

{% endinfo_block %}

## 2) Set up transfer objects

Generate transfers:
```bash
vendor/bin/console transfer:generate
```

{% info_block warningBox "Verification" %}

Ensure that the following changes have occurred in transfer objects:

| TRANSFER                               | TYPE  | EVENT   | PATH                                              |
|----------------------------------------|-------|---------|---------------------------------------------------|
| UsersRestAttributes                    | class | created | src/Generated/Shared/Transfer/UsersRestAttributes |

{% endinfo_block %}

## 3) Set up behavior

Enable the following behaviors by registering the plugins:

| PLUGIN                                                  | SPECIFICATION                                                                             | PREREQUISITES | NAMESPACE                                                   |
|---------------------------------------------------------|-------------------------------------------------------------------------------------------|---------------|-------------------------------------------------------------|
| UserByWarehouseUserAssignmentResourceRelationshipPlugin | Adds the `users` resource as a relationship to the `warehouse-user-assignments` resource. |               | Spryker\Glue\UserBackendApi\Plugin\GlueJsonApiConvention    |


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

Make sure that when the `users` resource is included as a query string, the `warehouse-user-assignments` resource returns it as a relationship: `https://glue-backend.mysprykershop.com/warehouse-user-assignments?include=users`.

{% endinfo_block %}
