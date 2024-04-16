---
title: Integrate Authorization Enabler
description: Learn how to enable the Authorization Enabler
last_updated: Sep 2, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/authorization-enabler-integration
originalArticleId: 809afa43-2beb-47d6-acaa-ae58efa62470
redirect_from:
  - /docs/scos/dev/technical-enhancement-integration-guides/integrating-authorization-enabler.html
  - /docs/authorization-enabler-integration
  - /docs/en/authorization-enabler-integration
  - /docs/scos/dev/technical-enhancements/authorization-enabler-integration.html
---

This document describes how to integrate the Authorization Enabler into a Spryker project.

## Prerequisites

To start the integration, review and install the necessary features:

| NAME         | VERSION |
| ----------- | ------ |
| Spryker Core | {{page.version}}  |

## 1) Install the required modules

1. Install the required modules using Composer:

```bash
composer require spryker/authorization spryker/glue-application-authorization-connector --update-with-dependencies
```

2. Optional: Install or update modules with endpoint authorization:

```bash
composer require spryker/orders-rest-api:"^4.10.0" spryker/availability-notifications-rest-api:"^1.1.0" spryker/carts-rest-api:"^5.16.0" spryker/customers-rest-api:"^1.19.0" --update-with-dependencies
```

{% info_block warningBox "Verificaiton" %}

Ensure that the following modules have been installed in `vendor/spryker`:

| MODULE    | EXPECTED DIRECTORY   |
| -------------- | -------------------------- |
| Authorization   | vendor/spryker/authorization    |
| GlueApplicationAuthorizationConnector | vendor/spryker/glue-application-authorization-connector  |
| AuthorizationExtension   | vendor/spryker/authorization-extension  |
| GlueApplicationExtension   | vendor/spryker/glue-application-extension  |
| GlueApplicationAuthorizationConnectorExtension | vendor/spryker/glue-application-authorization-connector-extension |

{% endinfo_block %}

## 2) Set up transfer objects

Generate transfer changes:

```bash
console transfer:generate
```

{% info_block warningBox "Verificaiton" %}

Make sure the following changes have been applied in transfer objects:

| TRANSFER   | TYPE  | EVENT   | PATH   |
| ------------------ | ---- | ------ | ------------------- |
| AuthorizationRequestTransfer     | class | created | src/Generated/Shared/Transfer/AuthorizationRequestTransfer.php |
| AuthorizationResponseTransfer    | class | created | src/Generated/Shared/Transfer/AuthorizationResponseTransfer.php |
| AuthorizationIdentityTransfer    | class | created | src/Generated/Shared/Transfer/AuthorizationIdentityTransfer.php |
| AuthorizationEntityTransfer      | class | created | src/Generated/Shared/Transfer/AuthorizationEntityTransfer.php |
| RouteAuthorizationConfigTransfer | class | created | src/Generated/Shared/Transfer/RouteAuthorizationConfigTransfer.php |
| RestErrorMessageTransfer         | class | created | src/Generated/Shared/Transfer/RestErrorMessageTransfer.php   |

{% endinfo_block %}

## 3) Set up behavior

Set up the following behaviors.

### Enable authorization plugins

Activate the following plugins:

| PLUGIN   | SPECIFICATION  | NAMESPACE  |
| ---------------- | ------------------- | ---------------------- |
| CustomerReferenceMatchingEntityIdAuthorizationStrategyPlugin | Authorization rule for the route that uses the current strategy. | Spryker\Client\Customer\Plugin                               |
| AuthorizationRestUserValidatorPlugin                         | Validates a request if the route implements the authorization interface. | Spryker\Glue\GlueApplicationAuthorizationConnector\Plugin\GlueApplication |
| AuthorizationRouterParameterExpanderPlugin                   | Expands a route with additional parameters.                  | Spryker\Glue\GlueApplicationAuthorizationConnector\Plugin\GlueApplication |

<details>
<summary markdown='span'>src/Pyz/Client/Authorization/AuthorizationDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Client\Authorization;

use Spryker\Client\Authorization\AuthorizationDependencyProvider as SprykerAuthorizationDependencyProvider;
use Spryker\Client\Customer\Plugin\Authorization\CustomerReferenceMatchingEntityIdAuthorizationStrategyPlugin;

class AuthorizationDependencyProvider extends SprykerAuthorizationDependencyProvider
{
    /**
     * @return \Spryker\Client\AuthorizationExtension\Dependency\Plugin\AuthorizationStrategyPluginInterface[]
     */
    protected function getAuthorizationStrategyPlugins(): array
    {
        return [
            new CustomerReferenceMatchingEntityIdAuthorizationStrategyPlugin(),
        ];
    }
}
```
</details>

<details>
<summary markdown='span'>src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Glue\GlueApplication;

....
use Spryker\Glue\GlueApplicationAuthorizationConnector\Plugin\GlueApplication\AuthorizationRestUserValidatorPlugin;
use Spryker\Glue\GlueApplicationAuthorizationConnector\Plugin\GlueApplication\AuthorizationRouterParameterExpanderPlugin;
....

class GlueApplicationDependencyProvider extends SprykerAuthorizationDependencyProvider
{
    /**
     * @return \Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\RestUserValidatorPluginInterface[]
     */
    protected function getRestUserValidatorPlugins(): array
    {
        return [
            new AuthorizationRestUserValidatorPlugin(),
        ];
    }

    /**
     * @return \Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\RouterParameterExpanderPluginInterface[]
     */
    protected function getRouterParameterExpanderPlugins(): array
    {
        return [
            new AuthorizationRouterParameterExpanderPlugin(),
        ];
    }
}
```
</details>

{% info_block warningBox "Verification" %}

To make sure that the plugins are activated, send a request with incorrect authentication details to a protected resource and check that it returns an authorization error.

{% endinfo_block %}
