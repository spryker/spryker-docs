---
title: "Decoupled Glue infrastructure: Integrate the API Key Authorization"
description: Integration of the API Key authorization mechanism into a Spryker project.
last_updated: October 10, 2023
template: feature-integration-guide-template
redirect_from:
---

This document describes how to integrate API Key authorization to Backend API applications in a Spryker project.

## Install feature core

Follow the steps below to install the API Key authorization feature core.

### Prerequisites

Install the required features:

| NAME           | VERSION           | INTEGRATION GUIDE |
| -------------- | ----------------- | ----------------- |
| Glue Backend API Application | {{page.version}} | [Glue Storefront and Backend API applications integration](/docs/scos/dev/migration-concepts/migrate-to-decoupled-glue-infrastructure/decoupled-glue-infrastructure-integrate-storefront-and-backend-glue-api-applications.html) |

### 1) Install the required modules using Composer

Install the required modules:

```bash
commposer require spryker/api-key:"^2.0.0" \
spryker/api-key-gui:"^2.0.0" \
spryker/authorization:"^1.4.0" \
spryker/api-key-authorization-connector:"^1.0.0" \
spryker/spryker/glue-backend-api-application-authorization-connector:"^1.4.0"
```

{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| MODULE                       | EXPECTED DIRECTORY                             |
|------------------------------|------------------------------------------------|
| ApiKey                       | vendor/spryker/api-key                         |
| ApiKeyGui                    | vendor/spryker/api-key-gui                     |
| Authorization                | vendor/spryker/authorization                   |
| ApiKeyAuthorizationCOnnector | vendor/spryker/api-key-authorization-connector |
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

### 3) Set up behavior

1. Activate the following plugins:

| PLUGIN | SPECIFICATION                                | NAMESPACE |
| --- |----------------------------------------------| --- |
| ApiKeyAuthorizationRequestExpanderPlugin | Expands the request by the API Key provided. | Spryker\Glue\ApiKeyAuthorizationConnector\Plugin\GlueBackendApiApplicationAuthorizationConnector\ApiKeyAuthorizationRequestExpanderPlugin |
| ApiKeyAuthorizationStrategyPlugin | Executes the API Key verification process.         | Spryker\Zed\ApiKeyAuthorizationConnector\Communication\Plugin\Authorization\ApiKeyAuthorizationStrategyPlugin |

<details open>
<summary markdown='span'>src/Pyz/Glue/GlueBackendApiApplicationAuthorizationConnector/GlueBackendApiApplicationAuthorizationConnectorDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Glue\GlueBackendApiApplicationAuthorizationConnector;

use Spryker\Glue\ApiKeyAuthorizationConnector\Plugin\GlueBackendApiApplicationAuthorizationConnector\ApiKeyAuthorizationRequestExpanderPlugin;
use Spryker\Glue\GlueBackendApiApplicationAuthorizationConnector\GlueBackendApiApplicationAuthorizationConnectorDependencyProvider as SprykerGlueBackendApiApplicationAuthorizationConnectorDependencyProvider;

class GlueBackendApiApplicationAuthorizationConnectorDependencyProvider extends SprykerGlueBackendApiApplicationAuthorizationConnectorDependencyProvider
{
    protected function getAuthorizationRequestExpanderPlugins(): array
    {
        return [
            new ApiKeyAuthorizationRequestExpanderPlugin(),
        ];
    }
}

```
</details>

<details open>
<summary markdown='span'>src/Pyz/Zed/Authorization/AuthorizationDependencyProvider.php</summary>

```php  
<?php

namespace Pyz\Zed\Authorization;

use Spryker\Zed\ApiKeyAuthorizationConnector\Communication\Plugin\Authorization\ApiKeyAuthorizationStrategyPlugin;
use Spryker\Zed\Authorization\AuthorizationDependencyProvider as SprykerAuthorizationDependencyProvider;

class AuthorizationDependencyProvider extends SprykerAuthorizationDependencyProvider
{
    protected function getAuthorizationStrategyPlugins(): array
    {
        return [
            new ApiKeyAuthorizationStrategyPlugin(),
        ];
    }
}

```
</details>

2. Add the following configuration:

<details open>
<summary markdown='span'>src/Pyz/Zed/Authorization/AuthorizationConfig.php</summary>

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

