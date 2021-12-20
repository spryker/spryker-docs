---
title: Glue API - Customer account management feature integration
last_updated: May 14, 2021
template: feature-integration-guide-template
originalLink: https://documentation.spryker.com/v6/docs/glue-api-customer-account-management-feature-integration
originalArticleId: 7d17c08f-805b-4a88-8a83-b0a9ddfce794
redirect_from:
  - /v6/docs/glue-api-customer-account-management-feature-integration
  - /v6/docs/en/glue-api-customer-account-management-feature-integration
related:
  - title: Authentication and Authorization
    link: docs/scos/dev/glue-api-guides/page.version/managing-customers/authenticating-as-a-customer.html
---

{% info_block errorBox %}
The following feature integration guide expects the basic feature to be in place.<br>The current feature integration guide only adds the Oauth, Auth Rest API and Customers Rest API functionality.
{% endinfo_block %}

Follow the steps below to install Customer Account Management feature API.

## Prerequisites
To start feature integration, overview and install the necessary features:

| Name | Version | Integration guide |
| --- | --- | --- |
| Spryker Core | master | [Glue Application feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/glue-api/glue-api-glue-application-feature-integration.html) |
| Customer Account Management |master |  |

## 1)Install the required modules using Composer
Run the following command to install the required modules:

```bash
composer require "spryker/customers-rest-api":"^1.12.3" "spryker/auth-rest-api":"^2.9.0" "spryker/oauth":"^1.6.0" "spryker/oauth-revoke":"^1.0.0" "spryker/oauth-customer-connector:"^1.4.0" --update-with-dependencies
```

{% info_block warningBox “Verification” %}

Make sure that the following modules are installed:
{% endinfo_block %}

| Module | Expected Directory |
| --- | --- |
| `Oauth` | `vendor/spryker/oauth` |
| `OauthRevoke` | `vendor/spryker/oauth-revoke` |
|`OauthCustomerConnector` | `vendor/spryker/oauth-customer-connector` |
| `AuthRestApi` | `vendor/spryker/auth-rest-api` |
| `CustomersRestApi	` | `vendor/spryker/customers-rest-api` |


## 2) Set up Configuration
Set the required OAuth config (see the [Installation documentation](https://oauth2.thephpleague.com/installation/) for more information about keys generation):

<details open>
<summary markdown='span'>config/Shared/config_default.php</summary>

```php
$config[OauthConstants::PRIVATE_KEY_PATH] = 'file://path/to/private.key';
$config[OauthConstants::PUBLIC_KEY_PATH] = 'file://path/to/public.key';
$config[OauthConstants::ENCRYPTION_KEY] = 'generated-encryption-key';
$config[OauthConstants::OAUTH_CLIENT_IDENTIFIER] = 'some-client-identifier';
$config[OauthConstants::OAUTH_CLIENT_SECRET] = 'some-client-secret';
```

<br>
</details>

### Configure expired refresh oauth tokens cleanup
To override the default interval which defines for how long the refresh tokens will be stored in the system after they expire, extend the `Spryker\Shared\Oauth\OauthConfig` on the project level. The value has to be provided in the format acceptable by `DateInterval` object.

<details open>
<summary markdown='span'>src/Pyz/Zed/Shared/OauthConfig.php</summary>

```php
<?php

namespace Pyz\Shared\Oauth;

use Spryker\Shared\Oauth\OauthConfig as SprykerOauthConfig;

class OauthConfig extends SprykerOauthConfig
{
    /**
     * @return string
     */
    public function getRefreshTokenRetentionInterval(): string
    {
        return '{% raw %}{{{% endraw %}interval{% raw %}}}{% endraw %}';
    }
}
```
 <br>
</details>

## 3) Set Up Database Schema and Transfer Objects
Run the following commands to apply database changes, and also generate entity and transfer changes:

```bash
console transfer:generate
console propel:install
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure that the following changes have occurred in the database:

| Transfer | Type | Event |
| --- | --- | --- |
| `spy_customer_address.uuid` | column | created |
| `spy_customer_address.spy_customer_address-unique-uuid` | index | created |
| `spy_oauth_access_token` | table | created |
| `spy_oauth_client` | table | created |
| `spy_oauth_scope` | table | created |
| `spy_oauth_refresh_token` | table | created |

{% endinfo_block %}

{% info_block warningBox "Verification" %}

Make sure that the following changes have occurred in transfer objects:

| Transfer | Type | Event | Path |
| --- | --- | --- | --- |
| `AddressTransfer.uuid` | column | created | `src/Generated/Shared/Transfer/AddressTransfer.php` |
| `RestCustomersAttributesTransfer` | class | created | `src/Generated/Shared/Transfer/RestCustomersAttributesTransfer.php` |
| `RestCustomersResponseAttributesTransfer` | class | created | `src/Generated/Shared/Transfer/RestCustomersResponseAttributesTransfer.php` |
| `RestCustomersRegisterAttributesTransfer` | class | created | `src/Generated/Shared/Transfer/RestCustomersRegisterAttributesTransfer.php` |
| `RestAddressAttributesTransfer` | class | created | `src/Generated/Shared/Transfer/RestAddressAttributesTransfer.php` |
| `RestCustomerPasswordAttributesTransfer` | class | created | `src/Generated/Shared/Transfer/RestCustomerPasswordAttributesTransfer.php` |
| `RestCustomerForgottenPasswordAttributesTransfer` | class | created | `src/Generated/Shared/Transfer/RestCustomerForgottenPasswordAttributesTransfer.php` |
| `RestCustomerRestorePasswordAttributesTransfer` | class | created | `src/Generated/Shared/Transfer/RestCustomerRestorePasswordAttributesTransfer.php` |
| `RestAccessTokensAttributesTransfer` | class | created | `src/Generated/Shared/Transfer/RestAccessTokensAttributesTransfer.php` |
| `RestRefreshTokensAttributesTransfer` | class | created | `src/Generated/Shared/Transfer/RestRefreshTokensAttributesTransfer.php` |
| `RestTokenResponseAttributesTransfer` | class | created | `src/Generated/Shared/Transfer/RestTokenResponseAttributesTransfer.php` |
| `CustomerIdentifierTransfer` | class | created | `src/Generated/Shared/Transfer/CustomerIdentifierTransfer.php` |
| `OauthRequestTransfer` | class | created | `src/Generated/Shared/Transfer/OauthRequestTransfer.php` |
| `OauthResponseTransfer` | class | created | `src/Generated/Shared/Transfer/OauthResponseTransfer.php` |
| `OauthAccessTokenValidationResponseTransfer` | class | created | `src/Generated/Shared/Transfer/OauthAccessTokenValidationResponseTransfer.php` |
| `OauthErrorTransfer` | class | created | `src/Generated/Shared/Transfer/OauthErrorTransfer.php` |
| `OauthAccessTokenValidationRequestTransfer` | class | created | `src/Generated/Shared/Transfer/OauthAccessTokenValidationRequestTransfer.php` |
| `OauthUserTransfer` | class | created | `src/Generated/Shared/Transfer/OauthUserTransfer.php` |
| `OauthScopeRequestTransfer` | class | created | `src/Generated/Shared/Transfer/OauthScopeRequestTransfer.php` |
| `OauthScopeTransfer` | cell | created | `src/Generated/Shared/Transfer/OauthScopeTransfer.php` |
| `OauthClientTransfer` | cell | created | `src/Generated/Shared/Transfer/OauthClientTransfer.php` |
| `OauthGrantTypeConfigurationTransfer` | class | created | `src/Generated/Shared/Transfer/OauthGrantTypeConfigurationTransfer.php` |
| `OauthAccessTokenDataTransfer` | class | created | `src/Generated/Shared/Transfer/OauthAccessTokenDataTransfer.php` |
| `JwtTokenTransfer` | class | created | `src/Generated/Shared/Transfer/JwtTokenTransfer.php` |
| `OauthRefreshTokenTransfer` | class | created | `src/Generated/Shared/Transfer/OauthRefreshTokenTransfer.php` |
| `OauthRefreshTokenCollectionTransfer` | class | created | `src/Generated/Shared/Transfer/OauthRefreshTokenCollectionTransfer.php` |
| `RevokeRefreshTokenRequestTransfer` | class | created | `src/Generated/Shared/Transfer/RevokeRefreshTokenRequestTransfer.php` |
| `RevokeRefreshTokenResponseTransfer` | class | created | `	src/Generated/Shared/Transfer/RevokeRefreshTokenResponseTransfer.php
` |
| `OauthTokenCriteriaFilterTransfer` | class | created | `src/Generated/Shared/Transfer/OauthTokenCriteriaFilterTransfer.php` |

{% endinfo_block %}

## 4) Set Up Behavior
### Migrate data in the database

{% info_block infoBox "Info" %}

The following steps generate UUIDs for existing entities in the `spy_customer_address` table.

{% endinfo_block %}

Run the following command:

```bash
console uuid:generate Customer spy_customer_address
```

{% info_block warningBox "Verification" %}

Make sure that the `UUID` field is populated for all records in the `spy_customer_address` table. For this purpose, run the following SQL query and make sure that the result is **0** records:

```sql
SELECT COUNT(*) FROM spy_customer_address WHERE uuid IS NULL;
```

{% endinfo_block %}

### Enable Jenkins check for finding and deleting the expired refresh token

<details open>
<summary markdown='span'>src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php</summary>

```php
<?php

/**
 * Notes:
 *
 * - jobs[]['name'] must not contains spaces or any other characters, that have to be urlencode()'d
 * - jobs[]['role'] default value is 'admin'
 */
$stores = require(APPLICATION_ROOT_DIR . '/config/Shared/stores.php');
$allStores = array_keys($stores);

...


/* Oauth */
$jobs[] = [
    'name' => 'remove-expired-refresh-tokens',
    'command' => '$PHP_BIN vendor/bin/console oauth:refresh-token:remove-expired',
    'schedule' => '*/5 * * * *',
    'enable' => true,
    'stores' => $allStores,
];


```
 <br>
</details>


### Enable resources and relationships

{% info_block infoBox "Note" %}

For information on how to protect resources, refer to [Security and Authentication](/docs/scos/dev/glue-api-guides/{{page.version}}/security-and-authentication.html).

{% endinfo_block %}

Activate the following plugins:

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `SetCustomerBeforeActionPlugin.uuid` | Sets customer data to the session. | It is expected that the `user` field will be set in the REST requests. | `Spryker\Glue\CustomersRestApi\Plugin` |
| `CustomersResourceRoutePlugin` | Registers the `customers` resource. | None | `Spryker\Glue\CustomersRestApi\Plugin` |
| `AddressesResourceRoutePlugin` | Registers the `addresses` resource. | None | `Spryker\Glue\CustomersRestApi\Plugin` |
| `CustomerForgottenPasswordResourceRoutePlugin` | Registers the `customer-forgotten-password` resource. | None | `Spryker\Glue\CustomersRestApi\Plugin` |
| `CustomerRestorePasswordResourceRoutePlugin` | Registers the `customer-restore-password` resource. | None | `Spryker\Glue\CustomersRestApi\Plugin` |
| `CustomerPasswordResourceRoutePlugin` | Registers the `customer-password` resource. | None | `Spryker\Glue\CustomersRestApi\Plugin` |
| `CustomersToAddressesRelationshipPlugin` | Adds the `addresses` resource as a relationship to the `customers` resource. | None | `Spryker\Glue\CustomersRestApi\Plugin`|
| `AccessTokensResourceRoutePlugin` | Registers the `access token` resource. | None | `Spryker\Glue\AuthRestApi\Plugin` |
| `RefreshTokensResourceRoutePlugin`| Registers the `refresh access token` resource.| None | `Spryker\Glue\AuthRestApi\Plugin` |
| `AccessTokenRestRequestValidatorPlugin` | Validates an authentication token in every request to the protected resource. | None | `Spryker\Glue\AuthRestApi\Plugin` |
| `FormatAuthenticationErrorResponseHeadersPlugin` | Adds an authentication error to the header in case when the invalid token is passed.| None | `Spryker\Glue\AuthRestApi\Plugin` |
| `RestUserFinderByAccessTokenPlugin`| Finds the rest user based on rest request data. | None | `Spryker\Glue\AuthRestApi\Plugin` |
| `OauthClientInstallerPlugin` | Populates database with OAuth client data. | None | `Spryker\Zed\Oauth\Communication\Plugin\Installer` |
| `OauthCustomerScopeInstallerPlugin` | Installs OAuth customer scope data. | None | `Spryker\Zed\OauthCustomerConnector\Communication\Plugin\Installer` |
|`CustomerOauthUserProviderPlugin`| Provides a customer OAuth user. | None | `Spryker\Zed\OauthCustomerConnector\Communication\Plugin` |
| `CustomerOauthScopeProviderPlugin` | Provides a list of customer scopes. | None | `Spryker\Zed\OauthCustomerConnector\Communication\Plugin` |
| `OauthExpiredRefreshTokenRemoverPlugin` | Removes expired refresh tokens by the provided criteria transfer. | None | `Spryker\Zed\OauthRevoke\Communication\Plugin\Oauth` |
| `OauthRefreshTokenCheckerPlugin` | Checks if the refresh token has been revoked. | None | `Spryker\Zed\OauthRevoke\Communication\Plugin\Oauth` |
| `OauthRefreshTokenReaderPlugin` |Finds the refresh token by the provided criteria transfer. | None | `Spryker\Zed\OauthRevoke\Communication\Plugin\Oauth` |
| `OauthRefreshTokenRevokerPlugin` | Revokes the refresh token. | None | `Spryker\Zed\OauthRevoke\Communication\Plugin\Oauth` |
| `OauthRefreshTokenSaverPlugin` | Saves the refresh token. | None | `Spryker\Zed\OauthRevoke\Communication\Plugin\Oauth` |
| `OauthRefreshTokensReaderPlugin` | Gets the refresh tokens by the provided criteria. | None | `Spryker\Zed\OauthRevoke\Communication\Plugin\Oauth` |
| `OauthRefreshTokensRevokerPlugin` | Revokes all the refresh tokens. | None | `Spryker\Zed\OauthRevoke\Communication\Plugin\Oauth` |

<details open>
<summary markdown='span'>src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Glue\GlueApplication;

use Spryker\Glue\CustomersRestApi\CustomersRestApiConfig;
use Spryker\Glue\CustomersRestApi\Plugin\AddressesResourceRoutePlugin;
use Spryker\Glue\CustomersRestApi\Plugin\CustomerForgottenPasswordResourceRoutePlugin;
use Spryker\Glue\CustomersRestApi\Plugin\CustomerPasswordResourceRoutePlugin;
use Spryker\Glue\CustomersRestApi\Plugin\CustomerRestorePasswordResourceRoutePlugin;
use Spryker\Glue\CustomersRestApi\Plugin\CustomersResourceRoutePlugin;
use Spryker\Glue\CustomersRestApi\Plugin\CustomersToAddressesRelationshipPlugin;
use Spryker\Glue\CustomersRestApi\Plugin\SetCustomerBeforeActionPlugin;
use Spryker\Glue\GlueApplication\GlueApplicationDependencyProvider as SprykerGlueApplicationDependencyProvider;
use Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRelationshipCollectionInterface;


class GlueApplicationDependencyProvider extends SprykerGlueApplicationDependencyProvider
{
    /**
     * @return array
     */
    protected function getResourceRoutePlugins(): array
    {
        return [
            new CustomersResourceRoutePlugin(),
            new CustomerForgottenPasswordResourceRoutePlugin(),
            new CustomerRestorePasswordResourceRoutePlugin(),
            new CustomerPasswordResourceRoutePlugin(),
            new AddressesResourceRoutePlugin(),
            new AccessTokensResourceRoutePlugin(),
            new RefreshTokensResourceRoutePlugin(),
        ];
    }

    /**
     * @return \Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ValidateRestRequestPluginInterface[]
     */
    protected function getValidateRestRequestPlugins(): array
    {
        return [
            new AccessTokenRestRequestValidatorPlugin(),
        ];
    }

    /**
     * @return \Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\FormatResponseHeadersPluginInterface[]
     */
    protected function getFormatResponseHeadersPlugins(): array
    {
        return [
            new FormatAuthenticationErrorResponseHeadersPlugin(),
        ];
    }

    /**
     * @return array
     */
    protected function getControllerBeforeActionPlugins(): array
    {
        return [
            new SetCustomerBeforeActionPlugin(),
        ];
    }

    /**
     * @param \Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRelationshipCollectionInterface $resourceRelationshipCollection
     *
     * @return \Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRelationshipCollectionInterface
     */
    protected function getResourceRelationshipPlugins(
        ResourceRelationshipCollectionInterface $resourceRelationshipCollection
    ): ResourceRelationshipCollectionInterface {
        $resourceRelationshipCollection->addRelationship(
            CustomersRestApiConfig::RESOURCE_CUSTOMERS,
            new CustomersToAddressesRelationshipPlugin()
        );

        return $resourceRelationshipCollection;
    }

    /**
     * @return \Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\RestUserFinderPluginInterface[]
     */
    protected function getRestUserFinderPlugins(): array
    {
        return [
            new RestUserFinderByAccessTokenPlugin(),
        ];
    }
}
```

<br>
</details>

<details open>
<summary markdown='span'>src/Pyz/Zed/Oauth/OauthDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Zed\Oauth;

use Spryker\Zed\Oauth\OauthDependencyProvider as SprykerOauthDependencyProvider;
use Spryker\Zed\OauthCustomerConnector\Communication\Plugin\Oauth\CustomerOauthScopeProviderPlugin;
use Spryker\Zed\OauthCustomerConnector\Communication\Plugin\Oauth\CustomerOauthUserProviderPlugin;
use Spryker\Zed\OauthRevoke\Communication\Plugin\Oauth\OauthExpiredRefreshTokenRemoverPlugin;
use Spryker\Zed\OauthRevoke\Communication\Plugin\Oauth\OauthRefreshTokenCheckerPlugin;
use Spryker\Zed\OauthRevoke\Communication\Plugin\Oauth\OauthRefreshTokenReaderPlugin;
use Spryker\Zed\OauthRevoke\Communication\Plugin\Oauth\OauthRefreshTokenRevokerPlugin;
use Spryker\Zed\OauthRevoke\Communication\Plugin\Oauth\OauthRefreshTokenSaverPlugin;
use Spryker\Zed\OauthRevoke\Communication\Plugin\Oauth\OauthRefreshTokensReaderPlugin;
use Spryker\Zed\OauthRevoke\Communication\Plugin\Oauth\OauthRefreshTokensRevokerPlugin;

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
     * @return \Spryker\Zed\OauthExtension\Dependency\Plugin\OauthScopeProviderPluginInterface[]
     */
    protected function getScopeProviderPlugins(): array
    {
        return [
            new CustomerOauthScopeProviderPlugin(),
        ];
    }

    /**
     * @return \Spryker\Zed\OauthExtension\Dependency\Plugin\OauthRefreshTokenRevokerPluginInterface[]
     */
    protected function getOauthRefreshTokenRevokerPlugins(): array
    {
        return [
            new OauthRefreshTokenRevokerPlugin(),
        ];
    }

    /**
     * @return \Spryker\Zed\OauthExtension\Dependency\Plugin\OauthRefreshTokensRevokerPluginInterface[]
     */
    protected function getOauthRefreshTokensRevokerPlugins(): array
    {
        return [
            new OauthRefreshTokensRevokerPlugin(),
        ];
    }

    /**
     * @return \Spryker\Zed\OauthExtension\Dependency\Plugin\OauthRefreshTokenSaverPluginInterface[]
     */
    protected function getOauthRefreshTokenSaverPlugins(): array
    {
        return [
            new OauthRefreshTokenSaverPlugin(),
        ];
    }

    /**
     * @return \Spryker\Zed\OauthExtension\Dependency\Plugin\OauthRefreshTokenCheckerPluginInterface[]
     */
    protected function getOauthRefreshTokenCheckerPlugins(): array
    {
        return [
            new OauthRefreshTokenCheckerPlugin(),
        ];
    }

    /**
     * @return \Spryker\Zed\OauthExtension\Dependency\Plugin\OauthExpiredRefreshTokenRemoverPluginInterface[]
     */
    protected function getOauthExpiredRefreshTokenRemoverPlugins(): array
    {
        return [
            new OauthExpiredRefreshTokenRemoverPlugin(),
        ];
    }

    /**
     * @return \Spryker\Zed\OauthExtension\Dependency\Plugin\OauthRefreshTokenReaderPluginInterface[]
     */
    protected function getOauthRefreshTokenReaderPlugins(): array
    {
        return [
            new OauthRefreshTokenReaderPlugin(),
        ];
    }

    /**
     * @return \Spryker\Zed\OauthExtension\Dependency\Plugin\OauthRefreshTokensReaderPluginInterface[]
     */
    protected function getOauthRefreshTokensReaderPlugins(): array
    {
        return [
            new OauthRefreshTokensReaderPlugin(),
        ];
    }
}
```

<br>
</details>

<details open>
<summary markdown='span'>src/Pyz/Zed/Installer/InstallerDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Zed\Installer;

use Spryker\Zed\Installer\InstallerDependencyProvider as SprykerInstallerDependencyProvider;
use Spryker\Zed\Oauth\Communication\Plugin\Installer\OauthClientInstallerPlugin;
use Spryker\Zed\OauthCustomerConnector\Communication\Plugin\Installer\OauthCustomerScopeInstallerPlugin;

class InstallerDependencyProvider extends SprykerInstallerDependencyProvider
{
    /**
     * @return \Spryker\Zed\Installer\Dependency\Plugin\InstallerPluginInterface[]
     */
    public function getInstallerPlugins()
    {
        return [
            new OauthClientInstallerPlugin(),
            new OauthCustomerScopeInstallerPlugin(),
        ];
    }
}
```

<br>
</details>

Run the following command to set up OAuth client:

```bash
console setup:init-db
```

{% info_block warningBox "Verification" %}

Make sure that the OAuth client is added to the `spy_oauth_client` table. You can run the following SQL-query for it and make sure that the result is 1 record.

```sql
SELECT * FROM spy_oauth_client WHERE identifier = 'some-client-identifier';
```

{% endinfo_block %}

{% info_block warningBox "Verificaiton" %}

Make sure that the following endpoints are available:

* http://glue.mysprykershop.com/customers
* http://glue.mysprykershop.com/addresses
* http://glue.mysprykershop.com/customer-password
* http://glue.mysprykershop.com/customer-forgotten-password
* http://glue.mysprykershop.com/customer-restore-password
* http://glue.mysprykershop.com/access-tokens
* http://glue.mysprykershop.com/refresh-tokens


{% endinfo_block %}

{% info_block warningBox "Verificaiton" %}

Send a request to `http://mysprykershop.com/customers/{% raw %}{{{% endraw %}customer_id{% raw %}}}{% endraw %}?include=addresses`. Make sure that the response includes relationships to the addresses resources.<br>*The Customer with the given ID should have at least one address*.

{% endinfo_block %}

{% info_block warningBox "Verificaiton" %}

To verify `AccessTokenRestRequestValidatorPlugin` is set up correctly, send a request to `/refresh-tokens` *without Authorization: Bearer {token}* (or with the outdated or wrong token). If you get one of the following errors, the plugin is installed:

<details open>
<summary markdown='span'>Auth error</summary>

```json
{
	"errors": [
		{
			"detail": "Invalid access token.",
			"status": 401,
			"code": "001"
		}
	]
}
```

<br>
</details>

<details open>
<summary markdown='span'>Auth error</summary>

```json
{
	"errors": [
		{
			"detail": "Missing access token.",
			"status": 403,
			"code": "002"
		}
	]
}
```

<br>
</details>


{% endinfo_block %}


{% info_block warningBox "Verification" %}

To make sure that `FormatAuthenticationErrorResponseHeadersPlugin` has been set up correctly, get an access token for any user, and then check that the endpoints that require validation are accessible when accessed with this token.

{% endinfo_block %}

{% info_block warningBox "Verification" %}

To make sure that `RestUserFinderByAccessTokenPlugin` has been set up correctly, get an access token for any user, and then check that the endpoints that require data of the current customer (e.g. `/carts`, `/customer/:customerReference`) are accessible and make sure that the system detects the current customer correctly (data endpoints return is the same the customer can see in Yves).

{% endinfo_block %}

{% info_block warningBox "Verification" %}

To verify that `OauthRefreshTokenSaverPlugin` is set up correctly, send a *POST* request to `http://glue.mysprykershop.com/access-tokens` and make sure that you get the response that includes a section with `access-token` and `refresh-token` and a new record in the `spy_oauth_refresh_token` table. You can run the following SQL-query for this purpose:

```sql
SELECT * FROM spy_oauth_refresh_token WHERE customer_reference = 'authenticated-customer-reference';
```

{% endinfo_block %}

{% info_block warningBox "Verification" %}

To verify that `OauthRefreshTokenReaderPlugin` and `OauthRefreshTokenRevokerPlugin` are set up correctly, send a *DELETE* request to `http://glue.mysprykershop.com/refresh-tokens/{% raw %}{{{% endraw %}refresh_token{% raw %}}}{% endraw %}` and  make sure that the record has not empty `spy_oauth_refresh_token::revoked_at` value. You can run the following SQL-query for this purpose:

```sql
SELECT * FROM spy_oauth_refresh_token WHERE customer_reference = 'authenticated-customer-reference';
```

{% endinfo_block %}

{% info_block warningBox "Verification" %}

To verify that `OauthRefreshTokensReaderPlugin` and `OauthRefreshTokensRevokerPlugin` are set up correctly, prepare several refresh tokens and send a *DELETE* request to `http://glue.mysprykershop.com/refresh-tokens/mine` and make sure that all records related to the authenticated customer have not empty `spy_oauth_refresh_token::revoked_at` value. You can run the following SQL-query for this purpose:

```sql
SELECT * FROM spy_oauth_refresh_token WHERE customer_reference = 'authenticated-customer-reference';
```

{% endinfo_block %}

{% info_block warningBox "Verification" %}

To verify that `OauthRefreshTokenCheckerPlugin` is set up correctly, send a *POST* request to `http://glue.mysprykershop.com/refresh-tokens` and specify the revoked refresh token. If you get the following errors, the plugin is installed:

<details open>
<summary markdown='span'>POST request example</summary>

```json
{
    "data": {
        "type": "refresh-tokens",
        "attributes": {
            "refreshToken": "{% raw %}{{{% endraw %}revoked_refresh_token{% raw %}}}{% endraw %}"
        }
    }
}
```
 <br>
</details>

<details open>
<summary markdown='span'>Response example</summary>

```json
{
    "errors": [
        {
            "code": "004",
            "status": 401,
            "detail": "Failed to refresh token."
        }
    ]
}
```
 <br>
</details>


{% endinfo_block %}

{% info_block warningBox "Verification" %}

To verify that `OauthRefreshTokenRemoverPlugin` is set up correctly, run the following console command and make sure that all expired refresh tokens older than defined by the removal interval you configured (`Spryker\Shared\Oauth\OauthConfig::getRefreshTokenRetentionInterval()`) were deleted:

```bash
console oauth:refresh-token:remove-expired
```

{% endinfo_block %}
