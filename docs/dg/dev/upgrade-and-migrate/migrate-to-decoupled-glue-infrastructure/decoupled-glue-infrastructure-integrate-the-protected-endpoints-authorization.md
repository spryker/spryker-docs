---
title: "Decoupled Glue infrastructure: Integrate the protected endpoints authorization"
description: This document describes how to use the protected endpoints authorization strategy for storefront API and backend API applications in a Spryker project.
last_updated: October 21, 2022
template: feature-integration-guide-template
redirect_from:
  - /docs/scos/dev/feature-integration-guides/202212.0/glue-api/decoupled-glue-infrastructure/glue-api-authorization-protected-endpoints-integration.html
  - /docs/scos/dev/feature-integration-guides/202204.0/glue-api/decoupled-glue-infrastructure/glue-api-authorization-scopes-integration.html
  - /docs/scos/dev/migration-concepts/migrate-to-decoupled-glue-infrastructure/decoupled-glue-infrastructure-integrate-the-protected-endpoints-authorization.html
---

This document describes how to use a protected endpoints authorization strategy for storefront API and backend API applications in a Spryker project.

## Install feature core

Follow the steps below to install the Authorization feature API.

### Prerequisites

To start feature integration, overview and install the necessary feature:

| NAME           | VERSION           | INSTALLATION GUIDE |
| -------------- | ----------------- | ----------------- |
| Glue Authentication | {{site.version}} | [Glue Authentication itegration](/docs/dg/dev/upgrade-and-migrate/migrate-to-decoupled-glue-infrastructure/decoupled-glue-infrastructure-integrate-the-authentication.html) |

### 1) Install the required modules

Install the required modules using Composer:

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
vendor/bin/console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure the following changes have been applied in transfer objects:

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

### 3) Set up behavior

Activate the following plugins:

**Storefront API plugins**

| PLUGIN | SPECIFICATION                                                                        | NAMESPACE                                                                                            |
| --- |--------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------|
| IsProtectedTableColumnExpanderPlugin | Extends route description table with protected path-specific data.                              | Spryker\\Glue\\GlueStorefrontApiApplicationAuthorizationConnector\\Plugin\\GlueApplication           |
| ProtectedPathAuthorizationStrategyPlugin | Authorization rule for the route using `ProtectedPath` strategy.                     | Spryker\\Client\\GlueStorefrontApiApplicationAuthorizationConnector\\Plugin\\Authorization                                         |

**Backend API plugins**

| PLUGIN | SPECIFICATION | NAMESPACE                                                                                         |
| --- | --- |---------------------------------------------------------------------------------------------------|
| IsProtectedTableColumnExpanderPlugin | Extends route description table with protected path-specific data. | Spryker\\Glue\\GlueBackendApiApplicationAuthorizationConnector\\Plugin\\GlueApplication           |
| ProtectedPathAuthorizationStrategyPlugin | Authorization rule for the route using `ProtectedPath` strategy.  | Spryker\\Zed\\GlueBackendApiApplicationAuthorizationConnector\\Communication\\Plugin\\Authorization                                            |

**src/Pyz/Client/Authorization/AuthorizationDependencyProvider.php**

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

**src/Pyz/Zed/Authorization/AuthorizationDependencyProvider.php**

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

**src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php**

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

To verify that everything is set up correctly and the route is protected, see [Create protected Backend API endpoints](/docs/integrations/spryker-glue-api/authenticating-and-authorization/backend-api/create-protected-backend-api-endpoints.html).
