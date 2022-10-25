---
title: Glue API - Authorization Protected endpoints integration
description: This document describes how to use a Protected endpoints authorization strategy for Storefront API application and Backend API application into a Spryker project.
last_updated: October 21, 2022
template: feature-integration-guide-template
---

This document describes how to use a Protected endpoints authorization strategy for Storefront API application and Backend API application into a Spryker project.

## Install feature core

Follow the steps below to install the Authorization feature API.

### Prerequisites

To start feature integration, overview and install the necessary feature:

| NAME           | VERSION           | INTEGRATION GUIDE |
| -------------- | ----------------- | ----------------- |
| Glue Authentication | {{page.version}} | [Glue Authentication itegration](/docs/scos/dev/feature-integration-guides/{{page.version}}/glue-api/glue-backend-api/glue-api-authentication-integration.html) |

### 1) Install the required modules using Composer

Install the required modules:

```bash
composer require spryker/glue-storefront-api-application-authorization-connector:"^1.0.0" \
spryker/glue-backend-api-application-authorization-connector:"^1.0.0" \
--update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| MODULE | EXPECTED DIRECTORY |
| --- | --- |
| GlueStorefrontApiApplicationAuthorizationConnector | vendor/spryker/glue-storefront-api-application-authorization-connector|
| GlueBackendApiApplicationAuthorizationConnector | vendor/spryker/glue-storefront-api-application-authorization-connector|

{% endinfo_block %}

### 2) Set up transfer objects

Generate transfers:

```bash
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure that the following changes have been applied in transfer objects:

| TRANSFER | TYPE | EVENT | PATH |
| --- | --- | --- | --- |
| AuthorizationRequest | class | created | src/Generated/Shared/Transfer/AuthorizationRequestTransfer.php |
| AuthorizationResponse | class | created | src/Generated/Shared/Transfer/AuthorizationResponseTransfer.php |
| RouteAuthorizationConfig | class | created | src/Generated/Shared/Transfer/RouteAuthorizationConfigTransfer.php |
| GlueResourceMethodConfiguration | class | created | src/Generated/Shared/Transfer/GlueResourceMethodConfigurationTransfer.php |
| GlueResourceMethodCollection | class | created | src/Generated/Shared/Transfer/GlueResourceMethodCollectionTransfer.php |
| ResourceContext | class | created | src/Generated/Shared/Transfer/ResourceContextTransfer.php |
| CustomRoutesContext | class | created | src/Generated/Shared/Transfer/CustomRoutesContextTransfer.php |
| PathMethodComponentData | class | created | src/Generated/Shared/Transfer/PathMethodComponentDataTransfer.php |
| AuthorizationEntity | class | created | src/Generated/Shared/Transfer/AuthorizationEntityTransfer.php |
| GlueRequest | class | created | src/Generated/Shared/Transfer/GlueRequestTransfer.php |
| Route | class | created | src/Generated/Shared/Transfer/RouteTransfer.php |
| ApiApplicationSchemaContext | class | created | src/Generated/Shared/Transfer/ApiApplicationSchemaContextTransfer.php |

{% endinfo_block %}

### 2) Set up behavior

Activate the following plugins:

**Storefront API plugins**

| PLUGIN | SPECIFICATION                                                                        | NAMESPACE                                                                                            |
| --- |--------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------|
| IsProtectedTableColumnExpanderPlugin | Provides capability to extends route description table.                              | Spryker\\Glue\\GlueStorefrontApiApplicationAuthorizationConnector\\Plugin\\GlueApplication           |
| AuthorizationContextExpanderPlugin | Adds the information about protected paths to the documentation generation context.  | Spryker\\Glue\\GlueStorefrontApiApplicationAuthorizationConnector\\Plugin\\DocumentationGeneratorApi |
| ProtectedPathAuthorizationStrategyPlugin | Authorization rule for the route that uses the current strategy.                     | Spryker\\Client\\GlueStorefrontApiApplicationAuthorizationConnector\\Plugin\\Authorization                                         |

**Backend API plugins**

| PLUGIN | SPECIFICATION | NAMESPACE                                                                                         |
| --- | --- |---------------------------------------------------------------------------------------------------|
| IsProtectedTableColumnExpanderPlugin | Provides capability to extends route description table. | Spryker\\Glue\\GlueBackendApiApplicationAuthorizationConnector\\Plugin\\GlueApplication           |
| AuthorizationContextExpanderPlugin | Adds the information about protected paths to the documentation generation context. | Spryker\\Glue\\GlueBackendApiApplicationAuthorizationConnector\\Plugin\\DocumentationGeneratorApi |
| ProtectedPathAuthorizationStrategyPlugin | Authorization rule for the route that uses the current strategy. | Spryker\\Zed\\GlueBackendApiApplicationAuthorizationConnector\\Communication\\Plugin\\Authorization                                            |

**src/Pyz/Client/Authorization/****AuthorizationDependencyProvider****.php**

```php
<?php

namespace Pyz\Client\Authorization;

use Spryker\Client\Authorization\AuthorizationDependencyProvider as SprykerAuthorizationDependencyProvider;
use Spryker\Client\GlueStorefrontApiApplicationAuthorizationConnector\Plugin\Authorization\ProtectedPathAuthorizationStrategyPlugin;

class AuthorizationDependencyProvider extends SprykerAuthorizationDependencyProvider
{
    /**
     * @return array<\Spryker\Shared\AuthorizationExtension\Dependency\Plugin\AuthorizationStrategyPluginInterface>
     */
    protected function getAuthorizationStrategyPlugins(): array
    {
        return [
            new ProtectedPathAuthorizationStrategyPlugin(),
        ];
    }
}
```

**src/Pyz/Zed/Authorization/****AuthorizationDependencyProvider****.php**

```php
<?php

namespace Pyz\Zed\Authorization;

use Spryker\Zed\Authorization\AuthorizationDependencyProvider as SprykerAuthorizationDependencyProvider;
use Spryker\Zed\GlueBackendApiApplicationAuthorizationConnector\Communication\Plugin\Authorization\ProtectedPathAuthorizationStrategyPlugin;

class AuthorizationDependencyProvider extends SprykerAuthorizationDependencyProvider
{
    /**
     * @return array<\Spryker\Shared\AuthorizationExtension\Dependency\Plugin\AuthorizationStrategyPluginInterface>
     */
    protected function getAuthorizationStrategyPlugins(): array
    {
        return [
            new ProtectedPathAuthorizationStrategyPlugin(),
        ];
    }
}
```

**src/Pyz/Glue/DocumentationGeneratorApi/****DocumentationGeneratorApiDependencyProvider****.php**

```php
<?php

namespace Pyz\Glue\DocumentationGeneratorApi;

use Spryker\Glue\DocumentationGeneratorApi\DocumentationGeneratorApiDependencyProvider as SprykerDocumentationGeneratorApiDependencyProvider;
use Spryker\Glue\DocumentationGeneratorApi\Expander\ContextExpanderCollectionInterface;
use Spryker\Glue\GlueBackendApiApplicationAuthorizationConnector\Plugin\DocumentationGeneratorApi\AuthorizationContextExpanderPlugin as BackendAuthorizationContextExpanderPlugin;
use Spryker\Glue\GlueStorefrontApiApplicationAuthorizationConnector\Plugin\DocumentationGeneratorApi\AuthorizationContextExpanderPlugin as StorefrontAuthorizationContextExpanderPlugin;

class DocumentationGeneratorApiDependencyProvider extends SprykerDocumentationGeneratorApiDependencyProvider
{
    /**
     * @var string
     */
    protected const GLUE_BACKEND_API_APPLICATION_NAME = 'backend';

    /**
     * @var string
     */
    protected const GLUE_STOREFRONT_API_APPLICATION_NAME = 'storefront';
    
    /**
     * @param \Spryker\Glue\DocumentationGeneratorApi\Expander\ContextExpanderCollectionInterface $contextExpanderCollection
     *
     * @return \Spryker\Glue\DocumentationGeneratorApi\Expander\ContextExpanderCollectionInterface
     */
    protected function getContextExpanderPlugins(ContextExpanderCollectionInterface $contextExpanderCollection): ContextExpanderCollectionInterface
    {
        $apiApplications = [];
        foreach ($this->getApiApplicationProviderPlugins() as $apiApplicationProviderPlugin) {
            $apiApplications[] = $apiApplicationProviderPlugin->getName();
        }
        $contextExpanderCollection->addApplications($apiApplications);
        
        $contextExpanderCollection->addExpander(new StorefrontAuthorizationContextExpanderPlugin(), [static::GLUE_STOREFRONT_API_APPLICATION_NAME]);
        $contextExpanderCollection->addExpander(new BackendAuthorizationContextExpanderPlugin(), [static::GLUE_BACKEND_API_APPLICATION_NAME]);
    }
}
```

**src/Pyz/Glue/GlueApplication/****GlueApplicationDependencyProvider****.php**

```php
<?php

namespace Pyz\Glue\GlueApplication;

use Spryker\Glue\GlueApplication\GlueApplicationDependencyProvider as SprykerGlueApplicationDependencyProvider;
use Spryker\Glue\GlueBackendApiApplicationAuthorizationConnector\Plugin\GlueApplication\IsProtectedTableColumnExpanderPlugin as BackendIsProtectedTableColumnExpanderPlugin;
use Spryker\Glue\GlueStorefrontApiApplicationAuthorizationConnector\Plugin\GlueApplication\IsProtectedTableColumnExpanderPlugin as StorefrontIsProtectedTableColumnExpanderPlugin;

class GlueApplicationDependencyProvider extends SprykerGlueApplicationDependencyProvider
{
    /**
     * @return array<\Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\TableColumnExpanderPluginInterface>
     */
    protected function getTableColumnExpanderPlugins(): array
    {
        return [
            new BackendIsProtectedTableColumnExpanderPlugin(),
            new StorefrontIsProtectedTableColumnExpanderPlugin(),
        ];
    }
}
```

To verify that everything is set up correctly and the route is protected, see [How to create protected endpoints](/docs/scos/dev/glue-api-guides/{{page.version}}/glue-backend-api/how-to-guides/how-to-create-protected-endpoints.html).
