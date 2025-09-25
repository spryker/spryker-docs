---
title: "Decoupled Glue infrastructure: Integrate the authorization scopes"
description: This document describes how to use scopes in Authorization for Storefront API application and Backend API application into a Spryker project.
last_updated: September 30, 2022
template: feature-integration-guide-template
redirect_from:
  - /docs/scos/dev/feature-integration-guides/202204.0/glue-api/glue-backend-api/authorization-scopes-integration.html
  - /docs/scos/dev/feature-integration-guides/202212.0/glue-api/decoupled-glue-infrastructure/glue-api-authorization-scopes-integration.html
  - /docs/scos/dev/migration-concepts/migrate-to-decoupled-glue-infrastructure/decoupled-glue-infrastructure-integrate-the-authorization-scopes.html
---

This document describes how to use scopes in Authorization for Storefront API application and Backend API application into a Spryker project.

## Install feature core

Follow the steps below to install the Authorization feature API.

### Prerequisites

To start feature integration, overview and install the necessary feature:

| NAME           | VERSION           | INSTALLATION GUIDE |
| -------------- | ----------------- | ----------------- |
| Glue Authentication | {{page.version}} | [Glue Authentication itegration](/docs/dg/dev/upgrade-and-migrate/migrate-to-decoupled-glue-infrastructure/decoupled-glue-infrastructure-integrate-the-authentication.html) |

### 1) Set up transfer objects

Generate transfers:

```bash
vendor/bin/console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure the following changes have been applied in transfer objects:

| TRANSFER | TYPE | EVENT | PATH |
| --- | --- | --- | --- |
| GlueRequest | class | created | src/Generated/Shared/Transfer/GlueRequestTransfer.php |
| GlueResource | class | created | src/Generated/Shared/Transfer/GlueResourceTransfer.php |
| OauthScopeFind | class | created | src/Generated/Shared/Transfer/OauthScopeFindTransfer.php |
| OauthScopeRequest | class | created | src/Generated/Shared/Transfer/OauthScopeRequestTransfer.php |
| ApiTokenAttributes | class | created | src/Generated/Shared/Transfer/ApiTokenAttributesTransfer.php |
| ApiTokenResponseAttributes | class | created | src/Generated/Shared/Transfer/ApiTokenResponseAttributesTransfer.php |
| OauthScopeFindRequest | class | created | src/Generated/Shared/Transfer/OauthScopeFindRequestTransfer.php |
| OauthScopeFind | class | created | src/Generated/Shared/Transfer/OauthScopeFindTransfer.php |

{% endinfo_block %}

### 2) Set up behavior

Activate the following plugins:

**Storefront API plugins**

| PLUGIN | SPECIFICATION | NAMESPACE |
| --- | --- | --- |
| ScopeRequestAfterRoutingValidatorPlugin | Validates the resource's scopes against the scopes in the token. | Spryker\\Glue\\GlueStorefrontApiApplication\\Plugin\\GlueStorefrontApiApplication |
| StorefrontScopeCollectorPlugin | Provides the set of OAuth scopes for Storefront API application. | Spryker\\Glue\\GlueStorefrontApiApplication\\Plugin\\Oauth |
| StorefrontScopeFinderPlugin | Gets the scope based on specified identifier. | Spryker\\Glue\\GlueStorefrontApiApplication\\Plugin\\Oauth |

**Backend API plugins**

| PLUGIN | SPECIFICATION | NAMESPACE |
| --- | --- | --- |
| ScopeRequestAfterRoutingValidatorPlugin | Validates the resource's scopes against the scopes in the token. | Spryker\\Glue\\GlueBackendApiApplication\\Plugin\\GlueApplication |
| BackendScopeCollectorPlugin | Provides the set of OAuth scopes for Backend API application. | Spryker\\Glue\\GlueBackendApiApplication\\Plugin\\Oauth |
| BackendScopeFinderPlugin | Gets the scope based on specified identifier. | Spryker\\Glue\\GlueBackendApiApplication\\Plugin\\Oauth |

**src/Pyz/Glue/GlueStorefrontApiApplication/****GlueStorefrontApiApplicationDependencyProvider****.php**

```php
<?php

namespace Pyz\Glue\GlueStorefrontApiApplication;

use Spryker\Glue\GlueStorefrontApiApplication\GlueStorefrontApiApplicationDependencyProvider as SprykerGlueStorefrontApiApplicationDependencyProvider;
use Spryker\Glue\GlueStorefrontApiApplication\Plugin\GlueStorefrontApiApplication\ScopeRequestAfterRoutingValidatorPlugin;
use Spryker\Glue\GlueStorefrontApiApplication\Plugin\GlueApplication\RequestCorsValidatorPlugin;
use Spryker\Glue\GlueStorefrontApiApplicationAuthorizationConnector\Plugin\GlueStorefrontApiApplicationAuthorizationConnector\AuthorizationRequestAfterRoutingValidatorPlugin;

class GlueStorefrontApiApplicationDependencyProvider extends SprykerGlueStorefrontApiApplicationDependencyProvider
{
    protected function getRequestAfterRoutingValidatorPlugins(): array
    {
        return [
            new RequestCorsValidatorPlugin(),
            new ScopeRequestAfterRoutingValidatorPlugin(),
            new AuthorizationRequestAfterRoutingValidatorPlugin(),
        ];
    }
}
```

**src/Pyz/Glue/GlueBackendApiApplication/****GlueBackendApiApplicationDependencyProvider****.php**

```php
<?php

namespace Pyz\Glue\GlueBackendApiApplication;

use Spryker\Glue\GlueBackendApiApplication\GlueBackendApiApplicationDependencyProvider as SprykerGlueBackendApiApplicationDependencyProvider;
use Spryker\Glue\GlueBackendApiApplication\Plugin\GlueBackendApiApplication\ScopeRequestAfterRoutingValidatorPlugin;
use Spryker\Glue\GlueBackendApiApplication\Plugin\GlueApplication\RequestCorsValidatorPlugin;
use Spryker\Glue\GlueBackendApiApplicationAuthorizationConnector\Plugin\GlueBackendApiApplication\AuthorizationRequestAfterRoutingValidatorPlugin;

class GlueBackendApiApplicationDependencyProvider extends SprykerGlueBackendApiApplicationDependencyProvider
{
    protected function getRequestAfterRoutingValidatorPlugins(): array
    {
        return [
            new RequestCorsValidatorPlugin(),
            new ScopeRequestAfterRoutingValidatorPlugin(),
            new AuthorizationRequestAfterRoutingValidatorPlugin(),
        ];
    }
}
```

**src/Pyz/Zed/Oauth/****OauthDependencyProvider****.php**

```php
<?php

namespace Pyz\Zed\Oauth;

use Spryker\Zed\Oauth\OauthDependencyProvider as SprykerOauthDependencyProvider;
use Spryker\Glue\GlueBackendApiApplication\Plugin\Oauth\BackendScopeCollectorPlugin;
use Spryker\Glue\GlueBackendApiApplication\Plugin\Oauth\BackendScopeFinderPlugin;
use Spryker\Glue\GlueStorefrontApiApplication\Plugin\Oauth\StorefrontScopeCollectorPlugin;
use Spryker\Glue\GlueStorefrontApiApplication\Plugin\Oauth\StorefrontScopeFinderPlugin;

class OauthDependencyProvider extends SprykerOauthDependencyProvider
{
    protected function getScopeCollectorPlugins(): array
    {
        return [
            new StorefrontScopeCollectorPlugin(),
            new BackendScopeCollectorPlugin(),
        ];
    }

    protected function getScopeFinderPlugins(): array
    {
        return [
            new BackendScopeFinderPlugin(),
            new StorefrontScopeFinderPlugin(),
        ];
    }
}
```

To verify that everything is set up correctly and provide the protected endpoints, see [How to use Backend API authorization scopes](/docs/integrations/spryker-glue-api/authenticating-and-authorization/backend-api/use-backend-api-authorization-scopes.html).
