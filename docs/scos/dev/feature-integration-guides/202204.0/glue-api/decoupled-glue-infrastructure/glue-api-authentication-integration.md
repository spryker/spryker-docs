---
title: Glue API - Authentication integration
description: Create an authentication token for the Storefront and Backend API applications in a Spryker project.
last_updated: September 30, 2022
template: feature-integration-guide-template
---

This document describes how to create an authentication token for the Storefront and Backend API applications in a Spryker project.

## Install feature core

Follow the steps below to install the Authentication feature API.

### Prerequisites

Install the required features:

| NAME           | VERSION           | INTEGRATION GUIDE |
| -------------- | ----------------- | ----------------- |
| Glue Backend API Application | {{page.version}} | [Glue Storefront and Backend API applications integration](/docs/scos/dev/migration-concepts/migrate-to-decoupled-glue-infrastructure/decoupled-glue-infrastructure-integrate-storefront-and-backend-glue-api-applications.html) |
| Glue Storefront API Application | {{page.version}} | [Glue Storefront and Backend API applications integration](/docs/scos/dev/migration-concepts/migrate-to-decoupled-glue-infrastructure/decoupled-glue-infrastructure-integrate-storefront-and-backend-glue-api-applications.html) |

### 1) Install the required modules using Composer

Install the required modules:

```bash
composer require spryker/oauth-api:"^1.0.0" \
spryker/oauth-backend-api:"^1.0.0" \
spryker/authentication-oauth:"^1.0.0" \
spryker/oauth-customer-connector:"^1.8.0" \
spryker/oauth-user-connector:"^1.0.0" \
--update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| MODULE | EXPECTED DIRECTORY |
| --- | --- |
| Authentication | vendor/spryker/authentication |
| AuthenticationExtension | vendor/spryker/authentication-extension |
| AuthenticationOauth | vendor/spryker/authentication-oauth |
| Oauth | vendor/spryker/oauth |
| OauthApi | vendor/spryker/oauth-api |
| OauthExtension | vendor/spryker/oauth-extension |
| OauthCustomerConnector | vendor/spryker/oauth-customer-connector |
| OauthUserConnector | vendor/spryker/oauth-user-connector |

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
| --- | --- | --- |
| spy\_oauth\_access\_token | table | created |
| spy\_oauth\_client | table | created |
| spy\_oauth\_scope | table | created |

Ensure that the following changes have occurred in transfer objects:

| TRANSFER | TYPE | EVENT | PATH |
| --- | --- | --- | --- |
| ApiTokenAttributes | class | created | src/Generated/Shared/Transfer/ApiTokenAttributesTransfer.php |
| ApiTokenResponseAttributes | class | created | src/Generated/Shared/Transfer/ApiTokenResponseAttributesTransfer.php |
| GlueAuthenticationRequest | class | created | src/Generated/Shared/Transfer/GlueAuthenticationRequestTransfer.php |
| GlueAuthenticationRequestContext | class | created | src/Generated/Shared/Transfer/GlueAuthenticationRequestContextTransfer.php |
| GlueAuthenticationResponse | class | created | src/Generated/Shared/Transfer/GlueAuthenticationResponseTransfer.php |
| GlueRequestCustomer | class | created | src/Generated/Shared/Transfer/GlueRequestCustomerTransfer.php |
| GlueRequestUser | class | created | src/Generated/Shared/Transfer/GlueRequestUserTransfer.php |
| OauthAccessTokenData | class | created | src/Generated/Shared/Transfer/OauthAccessTokenDataTransfer.php |
| OauthAccessTokenValidationRequest | class | created | src/Generated/Shared/Transfer/OauthAccessTokenValidationRequestTransfer.php |
| OauthAccessTokenValidationResponse | class | created | src/Generated/Shared/Transfer/OauthAccessTokenValidationResponseTransfer.php |
| OauthError | class | created | src/Generated/Shared/Transfer/OauthErrorTransfer.php |
| OauthRequest | class | created | src/Generated/Shared/Transfer/OauthRequestTransfer.php |
| OauthResponse | class | created | src/Generated/Shared/Transfer/OauthResponseTransfer.php |

{% endinfo_block %}

### 3) Set up behavior

1. Activate the following plugins:

| PLUGIN | SPECIFICATION | NAMESPACE |
| --- | --- | --- |
| OauthClientInstallerPlugin | Populates database with Oauth client data. | Spryker\\Zed\\Oauth\\Communication\\Plugin\\Installer |

**Storefront API plugins:**

| PLUGIN | SPECIFICATION | NAMESPACE |
| --- | --- | --- |
| AccessTokenValidatorPlugin | Validates access token passed via authorisation header. | Spryker\\Glue\\OauthApi\\Plugin |
| CustomerRequestBuilderPlugin | Sets `GlueRequestTransfer.requestCustomer` if the customer credentials are valid. | Spryker\\Glue\\OauthApi\\Plugin |
| OauthAuthenticationServerPlugin | Makes request to process access token and builds `GlueAuthenticationResponseTransfer.oauthResponse`. | Spryker\\Client\\AuthenticationOauth\\Plugin |
| OauthCustomerScopeInstallerPlugin | Installs Oauth customer scope data. | Spryker\\Zed\\OauthCustomerConnector\\Communication\\Plugin\\Installer |
| OauthTokenResource | Registers the `token` resource. | Spryker\\Glue\\OauthApi\\Plugin\\GlueApplication |
| CustomerOauthUserProviderPlugin | Gets the customer based on authorisation client. | Spryker\\Zed\\OauthCustomerConnector\\Communication\\Plugin |
| CustomerOauthScopeProviderPlugin | Gets a list of customer scopes. | Spryker\\Zed\\OauthCustomerConnector\\Communication\\Plugin |
| CustomerPasswordOauthRequestGrantTypeConfigurationProviderPlugin | Builds `OauthGrantTypeConfigurationTransfer` from configuration of Password GrantType data. | Spryker\\Zed\\Oauth\\Communication\\Plugin\\Oauth |

**Backend API plugins:**

| PLUGIN | SPECIFICATION | NAMESPACE |
| --- | --- | --- |
| AccessTokenValidatorPlugin | Validates access token passed via authorisation header. | Spryker\\Glue\\OauthBackendApi\\Plugin |
| CustomerRequestBuilderPlugin | Sets `GlueRequestTransfer.requestCustomer` if the customer credentials are valid. | Spryker\\Glue\\OauthBackendApi\\Plugin |
| OauthAuthenticationServerPlugin | Makes request to process access token and builds `GlueAuthenticationResponseTransfer.oauthResponse`. | Spryker\\Zed\\AuthenticationOauth\\Communication\\Plugin |
| OauthBackendTokenResource | Registers the `token` resource. | Spryker\\Glue\\OauthBackendApi\\Plugin\\GlueApplication |
| OauthUserScopeInstallerPlugin | Installs Oauth user scope data. | Spryker\\Zed\\OauthUserConnector\\Communication\\Plugin\\Installer |
| UserOauthScopeProviderPlugin | Gets a list of customer scopes. | Spryker\\Zed\\OauthUserConnector\\Communication\\Plugin\\Oauth |
| UserOauthUserProviderPlugin | Gets the user based on authorisation client. | Spryker\\Zed\\OauthUserConnector\\Communication\\Plugin\\Oauth |
| UserPasswordOauthRequestGrantTypeConfigurationProviderPlugin | Builds `OauthGrantTypeConfigurationTransfer` from configuration of Password GrantType data. | Spryker\\Zed\\Oauth\\Communication\\Plugin\\Oauth |
| UserRequestValidatorPlugin | Validates if `GlueRequestTransfer.requestUser` is set in case if request has Authorisation header. | Spryker\\Glue\\OauthBackendApi\\Plugin\\GlueApplication |

**src/Pyz/Client/Authentication/AuthenticationDependencyProvider.php**

```php
<?php

namespace Pyz\Client\Authentication;

use Spryker\Client\Authentication\AuthenticationDependencyProvider as SprykerAuthenticationDependencyProvider;
use Spryker\Client\AuthenticationOauth\Plugin\OauthAuthenticationServerPlugin;

class AuthenticationDependencyProvider extends SprykerAuthenticationDependencyProvider
{
    /**
     * @return array<\Spryker\Shared\AuthenticationExtension\Dependency\Plugin\AuthenticationServerPluginInterface>
     */
    protected function getAuthenticationServerPlugins(): array
    {
        return [
            new OauthAuthenticationServerPlugin(),
        ];
    }
}
```

<details open>
<summary markdown='span'>src/Pyz/Glue/GlueBackendApiApplication/GlueBackendApiApplicationDependencyProvider.****php</summary>

```php
<?php

namespace Pyz\Glue\GlueBackendApiApplication;

use Spryker\Glue\GlueBackendApiApplication\GlueBackendApiApplicationDependencyProvider as SprykerGlueBackendApiApplicationDependencyProvider;
use Spryker\Glue\OauthBackendApi\Plugin\AccessTokenValidatorPlugin;
use Spryker\Glue\OauthBackendApi\Plugin\GlueApplication\OauthBackendTokenResource;
use Spryker\Glue\OauthBackendApi\Plugin\GlueApplication\UserRequestValidatorPlugin;
use Spryker\Glue\OauthBackendApi\Plugin\UserRequestBuilderPlugin;

class GlueBackendApiApplicationDependencyProvider extends SprykerGlueBackendApiApplicationDependencyProvider
{
    /**
     * @return array<\Spryker\Glue\GlueBackendApiApplicationExtension\Dependency\Plugin\RequestBuilderPluginInterface>
     */
    protected function getRequestBuilderPlugins(): array
    {
        return [
            new UserRequestBuilderPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Glue\GlueBackendApiApplicationExtension\Dependency\Plugin\RequestValidatorPluginInterface>
     */
    protected function getRequestValidatorPlugins(): array
    {
        return [
            new AccessTokenValidatorPlugin(),
            new UserRequestValidatorPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceInterface>
     */
    protected function getResourcePlugins(): array
    {
        return [
            new OauthBackendTokenResource(),
        ];
    }
}
```
</details>

<details open>
<summary markdown='span'>src/Pyz/Glue/GlueStorefrontApiApplication/GlueStorefrontApiApplicationDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Glue\GlueStorefrontApiApplication;

use Spryker\Glue\GlueStorefrontApiApplication\GlueStorefrontApiApplicationDependencyProvider as SprykerGlueStorefrontApiApplicationDependencyProvider;
use Spryker\Glue\OauthApi\Plugin\AccessTokenValidatorPlugin;
use Spryker\Glue\OauthApi\Plugin\CustomerRequestBuilderPlugin;
use Spryker\Glue\OauthApi\Plugin\GlueApplication\OauthTokenResource

class GlueStorefrontApiApplicationDependencyProvider extends SprykerGlueStorefrontApiApplicationDependencyProvider
{
    /**
     * @return array<\Spryker\Glue\GlueStorefrontApiApplicationExtension\Dependency\Plugin\RequestBuilderPluginInterface>
     */
    protected function getRequestBuilderPlugins(): array
    {
        return [
            new CustomerRequestBuilderPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Glue\GlueStorefrontApiApplicationExtension\Dependency\Plugin\RequestValidatorPluginInterface>
     */
    protected function getRequestValidatorPlugins(): array
    {
        return [
            new AccessTokenValidatorPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceInterface>
     */
    protected function getResourcePlugins(): array
    {
        return [
            new OauthTokenResource(),
        ];
    }
}
```
</details>

__src/Pyz/Zed/Installer/InstallerDependencyProvider.****php__

```php
<?php

namespace Pyz\Zed\Installer;

use Spryker\Zed\Installer\InstallerDependencyProvider as SprykerInstallerDependencyProvider;
use Spryker\Zed\Oauth\Communication\Plugin\Installer\OauthClientInstallerPlugin;
use Spryker\Zed\OauthCustomerConnector\Communication\Plugin\Installer\OauthCustomerScopeInstallerPlugin;
use Spryker\Zed\OauthUserConnector\Communication\Plugin\Installer\OauthUserScopeInstallerPlugin;

class InstallerDependencyProvider extends SprykerInstallerDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\Installer\Dependency\Plugin\InstallerPluginInterface>
     */
    protected function getInstallerPlugins(): array
    {
        return [
            new OauthClientInstallerPlugin(),
            new OauthCustomerScopeInstallerPlugin(),
            new OauthUserScopeInstallerPlugin(),
        ];
    }
}
```

**src/Pyz/Zed/Authentication/AuthenticationDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Authentication;

use Spryker\Zed\Authentication\AuthenticationDependencyProvider as SprykerAuthenticationDependencyProvider;
use Spryker\Zed\AuthenticationOauth\Communication\Plugin\OauthAuthenticationServerPlugin;

class AuthenticationDependencyProvider extends SprykerAuthenticationDependencyProvider
{
    /**
     * @return array<\Spryker\Shared\AuthenticationExtension\Dependency\Plugin\AuthenticationServerPluginInterface>
     */
    protected function getAuthenticationServerPlugins(): array
    {
        return [
            new OauthAuthenticationServerPlugin(),
        ];
    }
}
```

<details open>
<summary markdown='span'>src/Pyz/Zed/Oauth/OauthDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Zed\Oauth;

use Spryker\Zed\Oauth\Communication\Plugin\Oauth\CustomerPasswordOauthRequestGrantTypeConfigurationProviderPlugin;
use Spryker\Zed\Oauth\Communication\Plugin\Oauth\UserPasswordOauthRequestGrantTypeConfigurationProviderPlugin;
use Spryker\Zed\Oauth\OauthDependencyProvider as SprykerOauthDependencyProvider;
use Spryker\Zed\OauthCustomerConnector\Communication\Plugin\Oauth\CustomerOauthScopeProviderPlugin;
use Spryker\Zed\OauthCustomerConnector\Communication\Plugin\Oauth\CustomerOauthUserProviderPlugin;
use Spryker\Zed\OauthUserConnector\Communication\Plugin\Oauth\UserOauthScopeProviderPlugin;
use Spryker\Zed\OauthUserConnector\Communication\Plugin\Oauth\UserOauthUserProviderPlugin;

class OauthDependencyProvider extends SprykerOauthDependencyProvider
{
    /**
     * @return \Spryker\Zed\OauthExtension\Dependency\Plugin\OauthUserProviderPluginInterface[]
     */
    protected function getUserProviderPlugins(): array
    {
        return [
            new CustomerOauthUserProviderPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\OauthExtension\Dependency\Plugin\OauthUserProviderPluginInterface>
     */
    protected function getOauthUserProviderPlugins(): array
    {
        return [
            new UserOauthUserProviderPlugin(),
        ];
    }

    /**
     * @return \Spryker\Zed\OauthExtension\Dependency\Plugin\OauthScopeProviderPluginInterface[]
     */
    protected function getScopeProviderPlugins(): array
    {
        return [
            new CustomerOauthScopeProviderPlugin(),
            new UserOauthScopeProviderPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\OauthExtension\Dependency\Plugin\OauthRequestGrantTypeConfigurationProviderPluginInterface>
     */
    protected function getOauthRequestGrantTypeConfigurationProviderPlugins(): array
    {
        return [
            new UserPasswordOauthRequestGrantTypeConfigurationProviderPlugin(),
            new CustomerPasswordOauthRequestGrantTypeConfigurationProviderPlugin(),
        ];
    }
}
```
</details>

2. Set up the Oauth client:

```bash
vendor/bin/console setup:init-db
```

{% info_block warningBox "Verification" %}

* Ensure that the Oauth client has been added to the `spy_oauth_client` table:

  1. Run the SQL query:
    ```sql
    SELECT * FROM spy_oauth_client WHERE identifier = 'some-client-identifier';
    ```

  2. Check that the output contains one record.


* Ensure that you can authenticate as a customer:
  1. Send the request:
    ```
    POST /token/ HTTP/1.1
    Host: glue-storefront.mysprykershop.com
    Content-Type: application/x-www-form-urlencoded
    Accept: application/json
    Content-Length: 66

    grant_type=password&username={customer_username}&password={customer_password}
    ```

  2. Check that the output contains the 201 response with a valid token.

* Ensure that you can authenticate as a user:

  1. Send the request:
    ```
    POST /token/ HTTP/1.1
    Host: glue-backend.mysprykershop.com
    Content-Type: application/x-www-form-urlencoded
    Accept: application/json
    Content-Length: 66

    grant_type=password&username={user_username}&password={user_password}
    ```

  2. Check that the output contains the 201 response with a valid token.

{% endinfo_block %}
