This document describes how to integrate the Spryker Core Back Office + Warehouse User Management Feature into a Spryker project.

## Install feature core

Follow the steps below to install the Picking App feature API.

## Prerequisites

To start feature integration, integrate the required features and Glue APIs:

| NAME  | VERSION | INTEGRATION GUIDE |
| --- | --- | --- |
| Spryker Core Back Office  | {{site.version}} | [Install the Spryker Core Back Office feature](/docs/scos/dev/feature-integration-guides/{{site.version}}/spryker-core-back-office-feature-integration.html) |
| Warehouse User Management | {{site.version}} | [Install the Warehouse User Management feature](/docs/scos/dev/feature-integration-guides/{{site.version}}/install-the-warehouse-user-management-feature.html)|

## 1) Set up behavior

Enable the following behaviors by registering the plugins:

| PLUGIN  | SPECIFICATION | PREREQUISITES | NAMESPACE  |
|---|---|---|---|
| UserByWarehouseUserAssignmentResourceRelationshipPlugin | Adds the `users` resource as a relationship to the `warehouse-user-assignments` resource. |  | Spryker\Glue\UserBackendApi\Plugin\GlueJsonApiConvention |


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
