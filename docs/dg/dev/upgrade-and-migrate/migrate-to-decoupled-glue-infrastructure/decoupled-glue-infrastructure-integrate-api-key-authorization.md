---
title: "Decoupled Glue infrastructure: Integrate the API Key authorization"
description: Learn about Integration of the API Key authorization mechanism into a Spryker based project.
last_updated: October 10, 2023
template: feature-integration-guide-template
redirect_from:
  - /docs/scos/dev/migration-concepts/migrate-to-decoupled-glue-infrastructure/decoupled-glue-infrastructure-integrate-api-key-authorization.html
---

This document describes how to integrate the API Key authorization to Backend API applications in a Spryker project.

## Install feature core

Follow the steps below to install the API Key authorization feature core.

### Prerequisites

Install the required features:

| NAME                         | VERSION           | INSTALLATION GUIDE                                                                                                                                                                                                                |
|------------------------------| ----------------- |----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Spryker Core                 | {{site.version}} | [Install the Spryker Core feature](/docs/pbc/all/miscellaneous/{{site.version}}/install-and-upgrade/install-features/install-the-spryker-core-feature.html)                                                                                                                                                                |
| Glue Backend API Application | {{page.version}} | [Integrate Storefront and Backend Glue API applications](/docs/dg/dev/upgrade-and-migrate/migrate-to-decoupled-glue-infrastructure/decoupled-glue-infrastructure-integrate-storefront-and-backend-glue-api-applications.html) |

### 1) Install the required modules

Install the required modules using Composer:

```bash
commposer require spryker/api-key-authorization-connector:"^1.0.0" \
spryker/spryker/glue-backend-api-application-authorization-connector:"^1.4.0"
```

{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| MODULE                       | EXPECTED DIRECTORY                             |
|------------------------------|------------------------------------------------|
| ApiKey                       | vendor/spryker/api-key                         |
| ApiKeyGui                    | vendor/spryker/api-key-gui                     |
| Authorization                | vendor/spryker/authorization                   |
| ApiKeyAuthorizationConnector | vendor/spryker/api-key-authorization-connector |
| GlueBackendApiApplicationAuthorizationConnector                | vendor/spryker/glue-backend-api-application-authorization-connector                   |

{% endinfo_block %}

### 2) Set up database schema and transfer objects

Apply database changes and generate entity and transfer changes:

```bash
vendor/bin/console transfer:generate
vendor/bin/console propel:install
vendor/bin/console transfer:generate
```

{% info_block warningBox "Verification" %}

Ensure that the following changes have occurred in the database:

| DATABASE ENTITY | TYPE | EVENT |
|-----------------| --- | --- |
| spy\_api\_key   | table | created |

Ensure that the following changes have occurred in transfer objects:

| TRANSFER                       | TYPE | EVENT | PATH |
|--------------------------------| --- | --- | --- |
| ApiKey                         | class | created | src/Generated/Shared/Transfer/ApiKeyTransfer |
| ApiKeyCollectionRequest        | class | created | src/Generated/Shared/Transfer/ApiKeyCollectionRequestTransfer |
| ApiKeyCollectionReqsponse      | class | created | src/Generated/Shared/Transfer/ApiKeyCollectionReqsponseTransfer |
| ApiKeyCollectionDeleteCriteria | class | created | src/Generated/Shared/Transfer/ApiKeyCollectionDeleteCriteriaTransfer |
| ApiKeyCollection               | class | created | src/Generated/Shared/Transfer/ApiKeyCollectionTransfer |
| ApiKeyCriteria                 | class | created | src/Generated/Shared/Transfer/ApiKeyCriteriaTransfer |
| ApiKeyConditions                  | class | created | src/Generated/Shared/Transfer/ApiKeyConditionsTransfer |
| CriteriaRangeFilter                  | class | created | src/Generated/Shared/Transfer/CriteriaRangeFilterTransfer |
| GlueRequest                 | class | created | src/Generated/Shared/Transfer/GlueRequestTransfer |
| AuthorizationIdentity  | class | created | src/Generated/Shared/Transfer/AuthorizationIdentityTransfer |
| AuthorizationEntity  | class | created | src/Generated/Shared/Transfer/AuthorizationEntityTransfer |
| AuthorizationRequest  | class | created | src/Generated/Shared/Transfer/AuthorizationRequestTransfer |
| AuthorizationResponse  | class | created | src/Generated/Shared/Transfer/AuthorizationResponseTransfer |

{% endinfo_block %}

## 3) Set up configuration

Add the configuration to your project:

| CONFIGURATION                                              | SPECIFICATION                                                    | NAMESPACE |
|------------------------------------------------------------|------------------------------------------------------------------| --- |
| AuthorizationConfig::isMultistrategyAuthorizationAllowed() | Returns true if the multiple strategies authorization is allowed. | Pyz\Zed\Authorization\AuthorizationConfig |

<details>
<summary>src/Pyz/Zed/Authorization/AuthorizationConfig.php</summary>

```php
<?php

namespace Pyz\Zed\Authorization;

 use Spryker\Zed\Authorization\AuthorizationConfig as SprykerAuthorizationConfig;

 class AuthorizationConfig extends SprykerAuthorizationConfig
 {
     /**
      * {@inheritDoc}
      *
      * @return bool
      */
     public function isMultistrategyAuthorizationAllowed(): bool
     {
         return true;
     }
 }
```

</details>

### 4) Set up behavior

1. Activate the following plugins:

| PLUGIN | SPECIFICATION                                | NAMESPACE |
| --- |----------------------------------------------| --- |
| ApiKeyAuthorizationRequestExpanderPlugin | Expands the request by the API Key provided. | Spryker\Glue\ApiKeyAuthorizationConnector\Plugin\GlueBackendApiApplicationAuthorizationConnector |
| ApiKeyAuthorizationStrategyPlugin | Executes the API Key verification process.         | Spryker\Zed\ApiKeyAuthorizationConnector\Communication\Plugin\Authorization |

<details>
<summary>src/Pyz/Glue/GlueBackendApiApplicationAuthorizationConnector/GlueBackendApiApplicationAuthorizationConnectorDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Glue\GlueBackendApiApplicationAuthorizationConnector;

use Spryker\Glue\ApiKeyAuthorizationConnector\Plugin\GlueBackendApiApplicationAuthorizationConnector\ApiKeyAuthorizationRequestExpanderPlugin;
use Spryker\Glue\GlueBackendApiApplicationAuthorizationConnector\GlueBackendApiApplicationAuthorizationConnectorDependencyProvider as SprykerGlueBackendApiApplicationAuthorizationConnectorDependencyProvider;

class GlueBackendApiApplicationAuthorizationConnectorDependencyProvider extends SprykerGlueBackendApiApplicationAuthorizationConnectorDependencyProvider
{
    /**
     * @return array<\Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\AuthorizationRequestExpanderPluginInterface>
     */
    protected function getAuthorizationRequestExpanderPlugins(): array
    {
        return [
            new ApiKeyAuthorizationRequestExpanderPlugin(),
        ];
    }
}

```

</details>

<details>
<summary>src/Pyz/Zed/Authorization/AuthorizationDependencyProvider.php</summary>

```php  
<?php

namespace Pyz\Zed\Authorization;

use Spryker\Zed\ApiKeyAuthorizationConnector\Communication\Plugin\Authorization\ApiKeyAuthorizationStrategyPlugin;
use Spryker\Zed\Authorization\AuthorizationDependencyProvider as SprykerAuthorizationDependencyProvider;

class AuthorizationDependencyProvider extends SprykerAuthorizationDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\AuthorizationExtension\Dependency\Plugin\AuthorizationStrategyPluginInterface>
     */
    protected function getAuthorizationStrategyPlugins(): array
    {
        return [
            new ApiKeyAuthorizationStrategyPlugin(),
        ];
    }
}

```

</details>

{% info_block warningBox "Verification" %}

Follow the instructions from [Use API Key authorization](/docs/integrations/spryker-glue-api/authenticating-and-authorization/backend-api/use-api-key-authorization.html) to check that the API Key authorization has been integrated properly.

{% endinfo_block %}
