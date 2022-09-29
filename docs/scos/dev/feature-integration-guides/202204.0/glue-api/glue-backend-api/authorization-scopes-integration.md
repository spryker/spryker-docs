This page will demonstrate how to use scopes in Authorization for Storefront API application and Backend API application into a Spryker project.

* * *

## Install feature core

Follow the steps below to install the Authorization core.

### Prerequisites

To start feature integration, overview and install the necessary feature:

Glue Authentication integration

### 1) Set up transfer objects

Generate transfers:

```
console transfer:generate
```

Ensure that the following changes have occurred in transfer objects:

|     |     |     |     |
| --- | --- | --- | --- |
| TRANSFER | TYPE | EVENT | PATH |
| GlueRequest | class | created | src/Generated/Shared/Transfer/GlueRequestTransfer.php |
| GlueResource | class | created | src/Generated/Shared/Transfer/GlueResourceTransfer.php |
| OauthScopeFind | class | created | src/Generated/Shared/Transfer/OauthScopeFindTransfer.php |
| OauthScopeRequest | class | created | src/Generated/Shared/Transfer/OauthScopeRequestTransfer.php |
| ApiTokenAttributes | class | created | src/Generated/Shared/Transfer/ApiTokenAttributesTransfer.php |
| ApiTokenResponseAttributes | class | created | src/Generated/Shared/Transfer/ApiTokenResponseAttributesTransfer.php |
| OauthScopeFindRequest | class | created | src/Generated/Shared/Transfer/OauthScopeFindRequestTransfer.php |
| OauthScopeFind | class | created | src/Generated/Shared/Transfer/OauthScopeFindTransfer.php |

### 2) Set up behavior

1.  Activate the following plugins:
    

|     |     |     |
| --- | --- | --- |
| PLUGIN | SPECIFICATION | NAMESPACE |
| STOREFRONT API |     |     |
| ScopeRequestAfterRoutingValidatorPlugin | Validates the resource's scopes against the scopes in the token. | Spryker\\Glue\\GlueStorefrontApiApplication\\Plugin\\GlueStorefrontApiApplication |
| StorefrontScopeCollectorPlugin | Provides the set of OAuth scopes for Storefront API application. | Spryker\\Glue\\GlueStorefrontApiApplication\\Plugin\\Oauth |
| StorefrontScopeFinderPlugin | Gets the scope based on specified identifier. | Spryker\\Glue\\GlueStorefrontApiApplication\\Plugin\\Oauth |
| BACKEND API |     |     |
| ScopeRequestAfterRoutingValidatorPlugin | Validates the resource's scopes against the scopes in the token. | Spryker\\Glue\\GlueBackendApiApplication\\Plugin\\GlueApplication |
| BackendScopeCollectorPlugin | Provides the set of OAuth scopes for Backend API application. | Spryker\\Glue\\GlueBackendApiApplication\\Plugin\\Oauth |
| BackendScopeFinderPlugin | Gets the scope based on specified identifier. | Spryker\\Glue\\GlueBackendApiApplication\\Plugin\\Oauth |

**src/Pyz/Glue/GlueStorefrontApiApplication/****GlueStorefrontApiApplicationDependencyProvider****.php**

```
<?php

namespace Pyz\Glue\GlueStorefrontApiApplication;

use Spryker\Glue\GlueStorefrontApiApplication\GlueStorefrontApiApplicationDependencyProvider as SprykerGlueStorefrontApiApplicationDependencyProvider;
use Spryker\Glue\GlueStorefrontApiApplication\Plugin\GlueStorefrontApiApplication\ScopeRequestAfterRoutingValidatorPlugin;

class GlueStorefrontApiApplicationDependencyProvider extends SprykerGlueStorefrontApiApplicationDependencyProvider
{
    protected function getRequestAfterRoutingValidatorPlugins(): array
    {
        return [
            new ScopeRequestAfterRoutingValidatorPlugin(),
        ];
    }
}
```

**src/Pyz/Glue/GlueBackendApiApplication/****GlueBackendApiApplicationDependencyProvider****.php**

```
<?php

namespace Pyz\Glue\GlueBackendApiApplication;

use Spryker\Glue\GlueBackendApiApplication\GlueBackendApiApplicationDependencyProvider as SprykerGlueBackendApiApplicationDependencyProvider;
use Spryker\Glue\GlueBackendApiApplication\Plugin\GlueBackendApiApplication\ScopeRequestAfterRoutingValidatorPlugin;

class GlueBackendApiApplicationDependencyProvider extends SprykerGlueBackendApiApplicationDependencyProvider
{
    protected function getRequestAfterRoutingValidatorPlugins(): array
    {
        return [
            new ScopeRequestAfterRoutingValidatorPlugin(),
        ];
    }
}
```

**src/Pyz/Zed/Oauth/****OauthDependencyProvider****.php**

```
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


In order to verify that everything is set up correctly and provide the protected endpoints follow [\[WIP\] Authorization - Managing scopes](https://spryker.atlassian.net/wiki/spaces/CORE/pages/3532587478)
