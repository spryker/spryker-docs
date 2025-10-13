---
title: Integrate the authentication
description: Create an authentication token for the Backend API application in a Spryker project.
last_updated: Jan 10, 2024
template: feature-integration-guide-template
redirect_from:
  - /docs/scos/dev/feature-integration-guides/202204.0/glue-api/decoupled-glue-infrastructure/glue-api-authentication-integration.html
  - /docs/scos/dev/feature-integration-guides/202212.0/glue-api/decoupled-glue-infrastructure/glue-api-authentication-integration.html
  - /docs/scos/dev/migration-concepts/migrate-to-decoupled-glue-infrastructure/decoupled-glue-infrastructure-integrate-the-authentication.html
  - /docs/dg/dev/upgrade-and-migrate/migrate-to-decoupled-glue-infrastructure/decoupled-glue-infrastructure-integrate-the-authentication.html
---

This document describes how to create an authentication token for the Backend API application.

## Prerequisites

Install the required features:

| NAME           | VERSION           | INSTALLATION GUIDE |
| -------------- | ----------------- | ----------------- |
| Backend API Application | {{page.version}} | [Integrate Backend API](/docs/integrations/spryker-glue-api/backend-api/integrate-backend-api/integrate-backend-api.html) |

## 1) Install the required modules

Install the required modules using Composer:

```bash
composer require spryker/oauth-backend-api:"^1.7.0" \
spryker/authentication-oauth:"^1.3.0" \
spryker/oauth-user-connector:"^1.4.0" \
--update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| MODULE                  | EXPECTED DIRECTORY                      |
|-------------------------|-----------------------------------------|
| Authentication          | vendor/spryker/authentication           |
| AuthenticationExtension | vendor/spryker/authentication-extension |
| AuthenticationOauth     | vendor/spryker/authentication-oauth     |
| Oauth                   | vendor/spryker/oauth                    |
| OauthBackendApi         | vendor/spryker/oauth-backend-api        |
| OauthExtension          | vendor/spryker/oauth-extension          |
| OauthUserConnector      | vendor/spryker/oauth-user-connector     |

{% endinfo_block %}

## 2) Set up database schema and transfer objects

Apply database changes and generate entity and transfer changes:

```bash
vendor/bin/console transfer:generate
vendor/bin/console propel:install
vendor/bin/console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure the following changes have occurred in the database:

| DATABASE ENTITY           | TYPE  | EVENT   |
|---------------------------|-------|---------|
| spy\_oauth\_access\_token | table | created |
| spy\_oauth\_client        | table | created |
| spy\_oauth\_scope         | table | created |

Make sure the following changes have occurred in transfer objects:

| TRANSFER                           | TYPE  | EVENT   | PATH                                                                         |
|------------------------------------|-------|---------|------------------------------------------------------------------------------|
| ApiTokenAttributes                 | class | created | src/Generated/Shared/Transfer/ApiTokenAttributesTransfer.php                 |
| ApiTokenResponseAttributes         | class | created | src/Generated/Shared/Transfer/ApiTokenResponseAttributesTransfer.php         |
| GlueAuthenticationRequest          | class | created | src/Generated/Shared/Transfer/GlueAuthenticationRequestTransfer.php          |
| GlueAuthenticationRequestContext   | class | created | src/Generated/Shared/Transfer/GlueAuthenticationRequestContextTransfer.php   |
| GlueAuthenticationResponse         | class | created | src/Generated/Shared/Transfer/GlueAuthenticationResponseTransfer.php         |
| GlueRequestUser                    | class | created | src/Generated/Shared/Transfer/GlueRequestUserTransfer.php                    |
| OauthAccessTokenData               | class | created | src/Generated/Shared/Transfer/OauthAccessTokenDataTransfer.php               |
| OauthAccessTokenValidationRequest  | class | created | src/Generated/Shared/Transfer/OauthAccessTokenValidationRequestTransfer.php  |
| OauthAccessTokenValidationResponse | class | created | src/Generated/Shared/Transfer/OauthAccessTokenValidationResponseTransfer.php |
| OauthError                         | class | created | src/Generated/Shared/Transfer/OauthErrorTransfer.php                         |
| OauthRequest                       | class | created | src/Generated/Shared/Transfer/OauthRequestTransfer.php                       |
| OauthScopeRequest                  | class | created | src/Generated/Shared/Transfer/OauthScopeRequestTransfer.php                  |
| OauthResponse                      | class | created | src/Generated/Shared/Transfer/OauthResponseTransfer.php                      |
| AuthorizationRequest               | class | created | src/Generated/Shared/Transfer/AuthorizationRequestTransfer.php               |
| AuthorizationEntity                | class | created | src/Generated/Shared/Transfer/AuthorizationEntityTransfer.php                |
| RouteAuthorizationConfig           | class | created | src/Generated/Shared/Transfer/RouteAuthorizationConfigTransfer.php           |

{% endinfo_block %}

## 3) Set up behavior

1. Activate the following plugins:

| PLUGIN                     | SPECIFICATION                              | NAMESPACE                                             |
|----------------------------|--------------------------------------------|-------------------------------------------------------|
| OauthClientInstallerPlugin | Populates database with Oauth client data. | Spryker\\Zed\\Oauth\\Communication\\Plugin\\Installer |

**Backend API plugins:**

| PLUGIN                                                        | SPECIFICATION                                                                                        | NAMESPACE                                                                              |
|---------------------------------------------------------------|------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------|
| BackendApiAccessTokenValidatorPlugin                          | Validates the access token passed via the authorization header.                                              | Spryker\\Glue\\OauthBackendApi\\Plugin\\GlueApplication                                |
| CustomerRequestBuilderPlugin                                  | Sets `GlueRequestTransfer.requestCustomer` if the customer credentials are valid.                    | Spryker\\Glue\\OauthBackendApi\\Plugin                                                 |
| OauthAuthenticationServerPlugin                               | Makes a request to process the access token and builds `GlueAuthenticationResponseTransfer.oauthResponse`. | Spryker\\Zed\\AuthenticationOauth\\Communication\\Plugin                               |
| OauthBackendTokenResource                                     | Registers the `token` resource.                                                                      | Spryker\\Glue\\OauthBackendApi\\Plugin\\GlueApplication                                |
| OauthUserScopeInstallerPlugin                                 | Installs the Oauth user scope data.                                                                      | Spryker\\Zed\\OauthUserConnector\\Communication\\Plugin\\Installer                     |
| UserOauthScopeProviderPlugin                                  | Gets a list of customer scopes.                                                                      | Spryker\\Zed\\OauthUserConnector\\Communication\\Plugin\\Oauth                         |
| UserOauthUserProviderPlugin                                   | Gets the user based on the authorization client.                                                         | Spryker\\Zed\\OauthUserConnector\\Communication\\Plugin\\Oauth                         |
| UserPasswordOauthRequestGrantTypeConfigurationProviderPlugin  | Builds `OauthGrantTypeConfigurationTransfer` from the configuration of Password GrantType data.          | Spryker\\Zed\\Oauth\\Communication\\Plugin\\Oauth                                      |
| UserRequestValidatorPlugin                                    | Validates if `GlueRequestTransfer.requestUser` is set if the request has the Authorisation header.   | Spryker\\Glue\\OauthBackendApi\\Plugin\\GlueApplication                                |
| BackofficeUserOauthScopeAuthorizationCheckerPlugin            | Executes the authorization check based on the Back Office user OAuth scope.                                  | Spryker\Zed\OauthUserConnector\Communication\Plugin\OauthUserConnector                 |
| OauthUserScopeProtectedRouteAuthorizationConfigProviderPlugin | Provides the configuration of Oauth user authorization strategy.                                            | Spryker\Glue\OauthUserConnector\Plugin\GlueBackendApiApplicationAuthorizationConnector |
| OauthUserScopeAuthorizationStrategyPlugin                     | Processes the authorization requests of Oauth users.                                                         | Spryker\Zed\OauthUserConnector\Communication\Plugin\Authorization                      |

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

<details>
<summary>src/Pyz/Glue/GlueBackendApiApplication/GlueBackendApiApplicationDependencyProvider.****php</summary>

```php
<?php

namespace Pyz\Glue\GlueBackendApiApplication;

use Spryker\Glue\GlueBackendApiApplication\GlueBackendApiApplicationDependencyProvider as SprykerGlueBackendApiApplicationDependencyProvider;
use Spryker\Glue\OauthBackendApi\Plugin\GlueApplication\BackendApiAccessTokenValidatorPlugin;
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
            new BackendApiAccessTokenValidatorPlugin(),
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

**src/Pyz/Zed/Installer/InstallerDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Installer;

use Spryker\Zed\Installer\InstallerDependencyProvider as SprykerInstallerDependencyProvider;
use Spryker\Zed\Oauth\Communication\Plugin\Installer\OauthClientInstallerPlugin;
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

<details>
<summary>src/Pyz/Zed/Oauth/OauthDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Zed\Oauth;

use Spryker\Zed\Oauth\Communication\Plugin\Oauth\UserPasswordOauthRequestGrantTypeConfigurationProviderPlugin;
use Spryker\Zed\Oauth\OauthDependencyProvider as SprykerOauthDependencyProvider;
use Spryker\Zed\OauthUserConnector\Communication\Plugin\Oauth\UserOauthScopeProviderPlugin;
use Spryker\Zed\OauthUserConnector\Communication\Plugin\Oauth\UserOauthUserProviderPlugin;

class OauthDependencyProvider extends SprykerOauthDependencyProvider
{
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
        ];
    }
}
```

</details>

**src/Pyz/Zed/OauthUserConnector/OauthUserConnectorDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\OauthUserConnector;

use Spryker\Zed\OauthUserConnector\Communication\Plugin\OauthUserConnector\BackofficeUserOauthScopeAuthorizationCheckerPlugin;
use Spryker\Zed\OauthUserConnector\OauthUserConnectorDependencyProvider as SprykerOauthUserConnectorDependencyProvider;

class OauthUserConnectorDependencyProvider extends SprykerOauthUserConnectorDependencyProvider
{
    /**
     * @return list<\Spryker\Zed\OauthUserConnectorExtension\Dependency\Plugin\UserTypeOauthScopeAuthorizationCheckerPluginInterface>
     */
    protected function getUserTypeOauthScopeAuthorizationCheckerPlugins(): array
    {
        return [
            new BackofficeUserOauthScopeAuthorizationCheckerPlugin(),
        ];
    }
}
```

{% info_block warningBox "Prerequisites required" %}

Apply the following changes only if [Integrate the API Key authorization](/docs/integrations/spryker-glue-api/backend-api/integrate-backend-api/integrate-api-key-authorization.html) is integrated.

{% endinfo_block %}

**src/Pyz/Glue/GlueBackendApiApplicationAuthorizationConnector/GlueBackendApiApplicationAuthorizationConnectorDependencyProvider.php**

```php
<?php

namespace Pyz\Glue\GlueBackendApiApplicationAuthorizationConnector;

use Spryker\Glue\GlueBackendApiApplicationAuthorizationConnector\GlueBackendApiApplicationAuthorizationConnectorDependencyProvider as SprykerGlueBackendApiApplicationAuthorizationConnectorDependencyProvider;
use Spryker\Glue\OauthUserConnector\Plugin\GlueBackendApiApplicationAuthorizationConnector\OauthUserScopeProtectedRouteAuthorizationConfigProviderPlugin;

/**
 * @method \Spryker\Glue\GlueBackendApiApplicationAuthorizationConnector\GlueBackendApiApplicationAuthorizationConnectorConfig getConfig()
 */
class GlueBackendApiApplicationAuthorizationConnectorDependencyProvider extends SprykerGlueBackendApiApplicationAuthorizationConnectorDependencyProvider
{
    /**
     * @return list<\Spryker\Glue\GlueBackendApiApplicationAuthorizationConnectorExtension\Dependency\Plugin\ProtectedRouteAuthorizationConfigProviderPluginInterface>
     */
    protected function getProtectedRouteAuthorizationConfigProviderPlugins(): array
    {
        return [
            new OauthUserScopeProtectedRouteAuthorizationConfigProviderPlugin(),
        ];
    }
}
```

**src/Pyz/Zed/Authorization/AuthorizationDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Authorization;

use Spryker\Zed\Authorization\AuthorizationDependencyProvider as SprykerAuthorizationDependencyProvider;
use Spryker\Zed\OauthUserConnector\Communication\Plugin\Authorization\OauthUserScopeAuthorizationStrategyPlugin;

class AuthorizationDependencyProvider extends SprykerAuthorizationDependencyProvider
{
    /**
     * @return array<\Spryker\Shared\AuthorizationExtension\Dependency\Plugin\AuthorizationStrategyPluginInterface>
     */
    protected function getAuthorizationStrategyPlugins(): array
    {
        return [
            new OauthUserScopeAuthorizationStrategyPlugin(),
        ];
    }
}
```

2. Set up the Oauth client:

```bash
vendor/bin/console setup:init-db
```

{% info_block warningBox "Verification" %}

To verify that the Oauth client has been added to the `spy_oauth_client` table, run the SQL query:

```sql
SELECT * FROM spy_oauth_client WHERE identifier = 'some-client-identifier';
```

Make sure the output contains one record.


- To verify that you can authenticate as a user, send the request:

```http
POST /token/ HTTP/1.1
Host: glue-backend.mysprykershop.com
Content-Type: application/x-www-form-urlencoded
Accept: application/json
Content-Length: 66

grant_type=password&username={user_username}&password={user_password}
```

Make sure the output contains the 201 response with a valid token and the user can assess protected resources.


{% endinfo_block %}
