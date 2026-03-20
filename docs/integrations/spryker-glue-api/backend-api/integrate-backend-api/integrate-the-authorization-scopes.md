---
title: Integrate the authorization scopes
description: This document describes how to use scopes in Authorization for Backend API application into a Spryker project.
last_updated: September 30, 2022
template: feature-integration-guide-template
redirect_from:
  - /docs/scos/dev/feature-integration-guides/202204.0/glue-api/glue-backend-api/authorization-scopes-integration.html
  - /docs/scos/dev/feature-integration-guides/202212.0/glue-api/decoupled-glue-infrastructure/glue-api-authorization-scopes-integration.html
  - /docs/scos/dev/migration-concepts/migrate-to-decoupled-glue-infrastructure/decoupled-glue-infrastructure-integrate-the-authorization-scopes.html
  - /docs/dg/dev/upgrade-and-migrate/migrate-to-decoupled-glue-infrastructure/decoupled-glue-infrastructure-integrate-the-authorization-scopes.html
---

This document describes how to use scopes in Authorization for Backend API application into a Spryker project.

## Install feature core

Follow the steps below to install the Authorization feature API.

### Prerequisites

To start feature integration, overview and install the necessary feature:

| NAME           | VERSION           | INSTALLATION GUIDE                                                                                                                                                                 |
| -------------- | ----------------- |------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Backend API Authentication | {{page.version}} | [Backend API Authentication itegration](/docs/integrations/spryker-glue-api/backend-api/integrate-backend-api/integrate-the-authentication.html) |

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

**Backend API plugins**

| PLUGIN | SPECIFICATION | NAMESPACE |
| --- | --- | --- |
| ScopeRequestAfterRoutingValidatorPlugin | Validates the resource's scopes against the scopes in the token. | Spryker\\Glue\\GlueBackendApiApplication\\Plugin\\GlueApplication |
| BackendScopeCollectorPlugin | Provides the set of OAuth scopes for Backend API application. | Spryker\\Glue\\GlueBackendApiApplication\\Plugin\\Oauth |
| BackendScopeFinderPlugin | Gets the scope based on specified identifier. | Spryker\\Glue\\GlueBackendApiApplication\\Plugin\\Oauth |

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

class OauthDependencyProvider extends SprykerOauthDependencyProvider
{
    protected function getScopeCollectorPlugins(): array
    {
        return [
            new BackendScopeCollectorPlugin(),
        ];
    }

    protected function getScopeFinderPlugins(): array
    {
        return [
            new BackendScopeFinderPlugin(),
        ];
    }
}
```

To verify that everything is set up correctly and provide the protected endpoints, see [How to use Backend API authorization scopes](/docs/integrations/spryker-glue-api/authenticating-and-authorization/backend-api/use-backend-api-authorization-scopes.html).
