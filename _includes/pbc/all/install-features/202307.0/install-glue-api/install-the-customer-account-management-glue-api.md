


{% info_block errorBox %}

This feature integration guide expects the basic feature to be in place. It only adds the following functionalities:

- Oauth
- Auth Rest API
- Customers Rest API

{% endinfo_block %}


## Prerequisites

Install the required features:

| FEATURE  | VERSION    | INSTALLATION GUIDE   |
| ------------- | ---------- | ------------- |
| Glue API: Spryker Core                | {{page.version}} | [Install the Spryker Core Glue API](/docs/pbc/all/miscellaneous/{{page.version}}/install-and-upgrade/install-glue-api/install-the-spryker-core-glue-api.html) |
| Glue API: Glue Application            | {{page.version}} | [Install the Glue Application Glue API](/docs/pbc/all/miscellaneous/{{page.version}}/install-and-upgrade/install-glue-api/install-the-spryker-core-glue-api.html) |
| Glue API: Shipment              | {{page.version}} | [Install the Shipment Glue API](/docs/pbc/all/carrier-management/{{page.version}}/base-shop/install-and-upgrade/install-the-shipment-glue-api.html) |
| Glue API: Checkout              | {{page.version}} | [Install the Checkout Glue API](/docs/pbc/all/order-management-system/{{page.version}}/base-shop/install-and-upgrade/install-glue-api/install-the-checkout-glue-api.html) |
| Customer Account Management | {{page.version}} | [Install the Customer Account Management feature](/docs/pbc/all/customer-relationship-management/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-customer-account-management-feature.html) |


## 1) Install the required modules

Install the required modules using Composer:

```bash
composer require "spryker/customers-rest-api":"^1.13.0" "spryker/auth-rest-api":"^2.12.0" "spryker/oauth":"^1.6.0" "spryker/oauth-revoke":"^1.0.0" "spryker/oauth-customer-connector:"^1.4.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure the following modules have been installed:

| MODULE                 | EXPECTED DIRECTORY                      |
| ---------------------- | --------------------------------------- |
| Oauth                  | vendor/spryker/oauth                    |
| OauthRevoke            | vendor/spryker/oauth-revoke             |
| OauthCustomerConnector | vendor/spryker/oauth-customer-connector |
| AuthRestApi            | vendor/spryker/auth-rest-api            |
| CustomersRestApi       | vendor/spryker/customers-rest-api       |

{% endinfo_block %}

## 2) Set up configuration

Set the required OAuth config:

**config/Shared/config_default.php**

```php
$config[OauthConstants::PRIVATE_KEY_PATH] = 'file://path/to/private.key';
$config[OauthConstants::PUBLIC_KEY_PATH] = 'file://path/to/public.key';
$config[OauthConstants::ENCRYPTION_KEY] = 'generated-encryption-key';
$config[OauthConstants::OAUTH_CLIENT_IDENTIFIER] = 'client-identifier';
$config[OauthConstants::OAUTH_CLIENT_SECRET] = 'client-secret';
```

See [OAuth 2.0 Server Installation](https://oauth2.thephpleague.com/installation/) for more details on key generation.

### Configure the cleanup of expired refresh OAuth tokens

To override the default interval of storing refresh tokens in the system after they expire, extend `Spryker\Shared\Oauth\OauthConfig` on the project level. The format of the value should be acceptable by the `DateInterval` object.

**src/Pyz/Zed/Shared/OauthConfig.php**

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

### Configure password validation rules

Configure password validation rules for `CustomerRestApi` endpoints:

**src/Pyz/Glue/CustomersRestApi/Validation/customers.validation.yml**

```yaml
customers:
    post:
        password:
            - NotBlank
            - Length:
                  min: 8
                  max: 64
        confirmPassword:
            - NotBlank
            - Length:
                  min: 8
                  max: 64

customer-password:
    patch:
        password:
            - NotBlank
        newPassword:
            - NotBlank
            - Length:
                  min: 8
                  max: 64
        confirmPassword:
            - NotBlank
            - Length:
                  min: 8
                  max: 64

customer-restore-password:
    patch:
        password:
            - NotBlank
            - Length:
                  min: 8
                  max: 64
        confirmPassword:
            - NotBlank
            - Length:
                  min: 8
                  max: 64
```


## 3) Set up database schema and transfer objects

Apply database changes and generate entity and transfer changes:

```bash
console propel:install
console transfer:generate
```

{% info_block warningBox "Verification" %}

Ensure that the following changes have occurred in the database:

| DATABASE ENTITY                                       | TYPE   | EVENT   |
| ----------------------------------------------------- | ------ | ------- |
| spy_customer_address.uuid                             | column | created |
| spy_customer_address.spy_customer_address-unique-uuid | index  | created |
| spy_oauth_access_token                                | table  | created |
| spy_oauth_client                                      | table  | created |
| spy_oauth_scope                                       | table  | created |
| spy_oauth_refresh_token                               | table  | created |

{% endinfo_block %}


{% info_block warningBox "Verification" %}

Ensure that the following changes have occurred in transfer objects:

| TRANSFER     | TYPE   | EVENT   | PATH   |
| ---------------- | ------ | ------- | ------------------ |
| AddressTransfer.uuid                            | column | created | src/Generated/Shared/Transfer/AddressTransfer.php            |
| RestCustomersAttributesTransfer                 | class  | created | src/Generated/Shared/Transfer/RestCustomersAttributesTransfer.php |
| RestCustomersResponseAttributesTransfer         | class  | created | src/Generated/Shared/Transfer/RestCustomersResponseAttributesTransfer.php |
| RestCustomersRegisterAttributesTransfer         | class  | created | src/Generated/Shared/Transfer/RestCustomersRegisterAttributesTransfer.php |
| RestAddressAttributesTransfer                   | class  | created | src/Generated/Shared/Transfer/RestAddressAttributesTransfer.php |
| RestCustomerPasswordAttributesTransfer          | class  | created | src/Generated/Shared/Transfer/RestCustomerPasswordAttributesTransfer.php |
| RestCustomerForgottenPasswordAttributesTransfer | class  | created | src/Generated/Shared/Transfer/RestCustomerForgottenPasswordAttributesTransfer.php |
| RestCustomerRestorePasswordAttributesTransfer   | class  | created | src/Generated/Shared/Transfer/RestCustomerRestorePasswordAttributesTransfer.php |
| RestAccessTokensAttributesTransfer              | class  | created | src/Generated/Shared/Transfer/RestAccessTokensAttributesTransfer.php |
| RestRefreshTokensAttributesTransfer             | class  | created | src/Generated/Shared/Transfer/RestRefreshTokensAttributesTransfer.php |
| RestTokenResponseAttributesTransfer             | class  | created | src/Generated/Shared/Transfer/RestTokenResponseAttributesTransfer.php |
| CustomerIdentifierTransfer                      | class  | created | src/Generated/Shared/Transfer/CustomerIdentifierTransfer.php |
| OauthRequestTransfer                            | class  | created | src/Generated/Shared/Transfer/OauthRequestTransfer.php       |
| OauthResponseTransfer                           | class  | created | src/Generated/Shared/Transfer/OauthResponseTransfer.php      |
| OauthAccessTokenValidationResponseTransfer      | class  | created | src/Generated/Shared/Transfer/OauthAccessTokenValidationResponseTransfer.php |
| OauthErrorTransfer                              | class  | created | src/Generated/Shared/Transfer/OauthErrorTransfer.php         |
| OauthAccessTokenValidationRequestTransfer       | class  | created | src/Generated/Shared/Transfer/OauthAccessTokenValidationRequestTransfer.php |
| OauthUserTransfer                               | class  | created | src/Generated/Shared/Transfer/OauthUserTransfer.php          |
| OauthScopeRequestTransfer                       | class  | created | src/Generated/Shared/Transfer/OauthScopeRequestTransfer.php  |
| OauthScopeTransfer                              | class  | created | src/Generated/Shared/Transfer/OauthScopeTransfer.php         |
| OauthClientTransfer                             | class  | created | src/Generated/Shared/Transfer/OauthClientTransfer.php        |
| OauthGrantTypeConfigurationTransfer             | class  | created | src/Generated/Shared/Transfer/OauthGrantTypeConfigurationTransfer.php |
| OauthAccessTokenDataTransfer                    | class  | created | src/Generated/Shared/Transfer/OauthAccessTokenDataTransfer.php |
| JwtTokenTransfer                                | class  | created | src/Generated/Shared/Transfer/JwtTokenTransfer.php           |
| OauthRefreshTokenTransfer                       | class  | created | src/Generated/Shared/Transfer/OauthRefreshTokenTransfer.php  |
| OauthRefreshTokenCollectionTransfer             | class  | created | src/Generated/Shared/Transfer/OauthRefreshTokenCollectionTransfer.php |
| RevokeRefreshTokenRequestTransfer               | class  | created | src/Generated/Shared/Transfer/RevokeRefreshTokenRequestTransfer.php |
| RevokeRefreshTokenResponseTransfer              | class  | created | src/Generated/Shared/Transfer/RevokeRefreshTokenResponseTransfer.php |
| OauthTokenCriteriaFilterTransfer                | class  | created | src/Generated/Shared/Transfer/OauthTokenCriteriaFilterTransfer.php |
| RestCheckoutDataTransfer                        | class  | created | src/Generated/Shared/Transfer/RestCheckoutDataTransfer.php   |
| CheckoutErrorTransfer                           | class  | created | src/Generated/Shared/Transfer/CheckoutErrorTransfer.php      |
| CheckoutResponseTransfer                        | class  | created | src/Generated/Shared/Transfer/CheckoutResponseTransfer.php   |
| CheckoutDataTransfer                            | class  | created | src/Generated/Shared/Transfer/CheckoutDataTransfer.php       |
| RestShipmentsTransfer                           | class  | created | src/Generated/Shared/Transfer/RestShipmentsTransfer.php      |

{% endinfo_block %}

## 4) Add translations

1. Append glossary according to your configuration:

```csv
checkout.validation.customer_address.not_found,Customer address with ID %id% not found.,en_US
checkout.validation.customer_address.not_found, Kundenaddresse mit ID %id% wurde nicht gefunden.,de_DE
checkout.validation.customer_address.not_applicable,Customer addresses are applicable only for customers.,en_US
checkout.validation.customer_address.not_applicable, Kundenaddressen sind nur für die Kunden anzuwenden.,de_DE
```

2. Import data:

```bash
console data:import glossary
```

{% info_block warningBox "Verification" %}

Make sure that, in the database, the configured data has been added to the `spy_glossary` table.

{% endinfo_block %}

## 5) Set up behavior

Set up the following behaviors.

### Migrate data to the database

Generate UUIDs for the existing entities in the `spy_customer_address` database table:

```sql
console uuid:generate Customer spy_customer_address
```


{% info_block warningBox "Verification" %}

Ensure that, in the `spy_customer_address` table, the `UUID` field has been populated for all the records:

1. Run the SQL query:

   ```sql
   SELECT COUNT(*) FROM spy_customer_address WHERE uuid IS NULL;
   ```

2. Check that the result is 0 records.

{% endinfo_block %}

### Enable Jenkins to find and delete expired refresh tokens

Set up the following configuration:

**config/Zed/cronjobs/jenkins.php**

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

### Enable resources and relationships

{% info_block infoBox %}

For information on how to protect resources, see [Security and authentication](/docs/dg/dev/glue-api/{{page.version}}/security-and-authentication.html).

{% endinfo_block %}

Enable resources and relationships as follows:

1. Activate the following plugins:

| PLUGIN | SPECIFICATION  | PREREQUISITES  | NAMESPACE   |
| ----------------- | --------------- | --------------- | --------------------- |
| SetCustomerBeforeActionPlugin                   | Adds customer data to the session.                           | Expects the user field to be set in REST requests. | Spryker\Glue\CustomersRestApi\Plugin                         |
| CustomersResourceRoutePlugin                    | Registers the `customers` resource.                            | None                                               | Spryker\Glue\CustomersRestApi\Plugin                         |
| AddressesResourceRoutePlugin                    | Registers the `addresses` resource.                            | None                                               | Spryker\Glue\CustomersRestApi\Plugin                         |
| CustomerForgottenPasswordResourceRoutePlugin    | Registers the `customer-forgotten-password` resource.          | None                                               | Spryker\Glue\CustomersRestApi\Plugin                         |
| CustomerRestorePasswordResourceRoutePlugin      | Registers the `customer-restore-password` resource.            | None                                               | Spryker\Glue\CustomersRestApi\Plugin                         |
| CustomerPasswordResourceRoutePlugin             | Registers the `customer-password` resource.                    | None                                               | Spryker\Glue\CustomersRestApi\Plugin                         |
| CustomersToAddressesRelationshipPlugin          | Adds the `addresses` resource as a relationship to the customers resource. | None                                               | Spryker\Glue\CustomersRestApi\Plugin                         |
| AccessTokensResourceRoutePlugin                 | Registers the `access-token` resource.                         | None                                               | Spryker\Glue\AuthRestApi\Plugin                              |
| RefreshTokensResourceRoutePlugin                | Registers the `refresh-tokens` resource.                       | None                                               | Spryker\Glue\AuthRestApi\Plugin                              |
| TokenResourceRoutePlugin                        | Registers the `token` resource.                                | None                                               | Spryker\Glue\AuthRestApi\Plugin\GlueApplication              |
| CustomerConfirmationResourceRoutePlugin         | Registers the `customer-confirmation` resource.                | None                                               | Spryker\Glue\CustomersRestApi\Plugin\GlueApplication         |
| AccessTokenRestRequestValidatorPlugin           | Validates authentication tokens in the requests to protected resources. | None                                               | Spryker\Glue\AuthRestApi\Plugin                              |
| FormatAuthenticationErrorResponseHeadersPlugin  | Adds an authentication error to the header of requests with an invalid authentication token. | None                                               | Spryker\Glue\AuthRestApi\Plugin                              |
| RestUserFinderByAccessTokenPlugin               | Finds a REST user based on the provided REST request data.   | None                                               | Spryker\Glue\AuthRestApi\Plugin                              |
| OauthClientInstallerPlugin                      | Populates the database with OAuth client data.               | None                                               | Spryker\Zed\Oauth\Communication\Plugin\Installer             |
| OauthCustomerScopeInstallerPlugin               | Installs OAuth customer scope data.                          | None                                               | Spryker\Zed\OauthCustomerConnector\Communication\Plugin\Installer |
| CustomerOauthUserProviderPlugin                 | Provides a customer OAuth user.                              | None                                               | Spryker\Zed\OauthCustomerConnector\Communication\Plugin      |
| CustomerOauthScopeProviderPlugin                | Provides a list of customer scopes.                          | None                                               | Spryker\Zed\OauthCustomerConnector\Communication\Plugin      |
| OauthExpiredRefreshTokenRemoverPlugin           | Removes expired refresh tokens based on the provided criteria transfer. | None                                               | Spryker\Zed\OauthRevoke\Communication\Plugin\Oauth           |
| OauthRefreshTokenCheckerPlugin                  | Checks if a refresh token is revoked.                        | None                                               | Spryker\Zed\OauthRevoke\Communication\Plugin\Oauth           |
| OauthRefreshTokenReaderPlugin                   | Finds a refresh token by the provided criteria transfer.     | None                                               | Spryker\Zed\OauthRevoke\Communication\Plugin\Oauth           |
| OauthRefreshTokenRevokerPlugin                  | Revokes a refresh token.                                     | None                                               | Spryker\Zed\OauthRevoke\Communication\Plugin\Oauth           |
| OauthRefreshTokenPersistencePlugin              | Saves a refresh token.                                       | None                                               | Spryker\Zed\OauthRevoke\Communication\Plugin\Oauth           |
| OauthRefreshTokensReaderPlugin                  | Gets refresh tokens by the provided criteria.                | None                                               | Spryker\Zed\OauthRevoke\Communication\Plugin\Oauth           |
| OauthRefreshTokensRevokerPlugin                 | Revokes all refresh tokens.                                  | None                                               | Spryker\Zed\OauthRevoke\Communication\Plugin\Oauth           |
| AddressByCheckoutDataResourceRelationshipPlugin | Adds the `addresses` resource as a relationship.               | None                                               | Spryker\Glue\CustomersRestApi\Plugin\GlueApplication         |
| CustomerAddressSourceCheckerPlugin              | Checks if a customer address ID is provided in the address attributes. | None                                               | Spryker\Glue\CustomersRestApi\Plugin\ShipmentsRestApi        |
| CustomerAddressCheckoutDataValidatorPlugin      | Collects shipping address UUIDs from `checkoutDataTransfer.shipments`. If the authenticated customer does not own the provided customer address,  returns `CheckoutResponseTransfer` with an error. | None                                               | Spryker\Zed\CustomersRestApi\Communication\Plugin\CheckoutRestApi |
| CustomerAddressProviderStrategyPlugin           | Finds a customer address based on the UUID provided in `RestAddressTransfer.id`. If the address was found, returns it. | None                                               | Spryker\Zed\CustomersRestApi\Communication\Plugin\ShipmentsRestApi |

<details open>
<summary markdown='span'>src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Glue\GlueApplication;

use Spryker\Glue\AuthRestApi\Plugin\AccessTokensResourceRoutePlugin;
use Spryker\Glue\AuthRestApi\Plugin\FormatAuthenticationErrorResponseHeadersPlugin;
use Spryker\Glue\AuthRestApi\Plugin\GlueApplication\AccessTokenRestRequestValidatorPlugin;
use Spryker\Glue\AuthRestApi\Plugin\GlueApplication\TokenResourceRoutePlugin;
use Spryker\Glue\AuthRestApi\Plugin\RefreshTokensResourceRoutePlugin;
use Spryker\Glue\AuthRestApi\Plugin\RestUserFinderByAccessTokenPlugin;
use Spryker\Glue\CustomersRestApi\CustomersRestApiConfig;
use Spryker\Glue\CustomersRestApi\Plugin\AddressesResourceRoutePlugin;
use Spryker\Glue\CustomersRestApi\Plugin\CustomerForgottenPasswordResourceRoutePlugin;
use Spryker\Glue\CustomersRestApi\Plugin\CustomerPasswordResourceRoutePlugin;
use Spryker\Glue\CustomersRestApi\Plugin\CustomerRestorePasswordResourceRoutePlugin;
use Spryker\Glue\CustomersRestApi\Plugin\CustomersResourceRoutePlugin;
use Spryker\Glue\CustomersRestApi\Plugin\CustomersToAddressesRelationshipPlugin;
use Spryker\Glue\CustomersRestApi\Plugin\GlueApplication\CustomerConfirmationResourceRoutePlugin;
use Spryker\Glue\CustomersRestApi\Plugin\SetCustomerBeforeActionPlugin;
use Spryker\Glue\GlueApplication\GlueApplicationDependencyProvider as SprykerGlueApplicationDependencyProvider;
use Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRelationshipCollectionInterface;
use Spryker\Glue\CompanyBusinessUnitAddressesRestApi\Plugin\GlueApplication\CompanyBusinessUnitAddressByCheckoutDataResourceRelationshipPlugin;
use Spryker\Glue\CustomersRestApi\Plugin\GlueApplication\AddressByCheckoutDataResourceRelationshipPlugin;

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
            new TokenResourceRoutePlugin(),
            new CustomerConfirmationResourceRoutePlugin(),
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
        $resourceRelationshipCollection->addRelationship(
            CheckoutRestApiConfig::RESOURCE_CHECKOUT_DATA,
            new AddressByCheckoutDataResourceRelationshipPlugin()
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
use Spryker\Zed\OauthRevoke\Communication\Plugin\Oauth\OauthRefreshTokenPersistencePlugin;
use Spryker\Zed\OauthRevoke\Communication\Plugin\Oauth\OauthRefreshTokenReaderPlugin;
use Spryker\Zed\OauthRevoke\Communication\Plugin\Oauth\OauthRefreshTokenRevokerPlugin;
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
            new OauthRefreshTokenPersistencePlugin(),
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
</details>


**src/Pyz/Zed/Installer/InstallerDependencyProvider.php**

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

**src/Pyz/Glue/ShipmentsRestApi/ShipmentsRestApiDependencyProvider.php**

```php
<?php

namespace Pyz\Glue\ShipmentsRestApi;

use Spryker\Glue\CustomersRestApi\Plugin\ShipmentsRestApi\CustomerAddressSourceCheckerPlugin;
use Spryker\Glue\ShipmentsRestApi\ShipmentsRestApiDependencyProvider as SprykerShipmentsRestApiDependencyProvider;

class ShipmentsRestApiDependencyProvider extends SprykerShipmentsRestApiDependencyProvider
{
    /**
     * @return \Spryker\Glue\ShipmentsRestApiExtension\Dependency\Plugin\AddressSourceCheckerPluginInterface[]
     */
    protected function getAddressSourceCheckerPlugins(): array
    {
        return [
            new CustomerAddressSourceCheckerPlugin(),
        ];
    }
}
```

**src/Pyz/Zed/CheckoutRestApi/CheckoutRestApiDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\CheckoutRestApi;

use Spryker\Zed\CheckoutRestApi\CheckoutRestApiDependencyProvider as SprykerCheckoutRestApiDependencyProvider;
use Spryker\Zed\CustomersRestApi\Communication\Plugin\CheckoutRestApi\CustomerAddressCheckoutDataValidatorPlugin;

class CheckoutRestApiDependencyProvider extends SprykerCheckoutRestApiDependencyProvider
{
    /**
     * @return \Spryker\Zed\CheckoutRestApiExtension\Dependency\Plugin\CheckoutDataValidatorPluginInterface[]
     */
    protected function getCheckoutDataValidatorPlugins(): array
    {
        return [
            new CustomerAddressCheckoutDataValidatorPlugin(),
        ];
    }
}
```

**src/Pyz/Zed/ShipmentsRestApi/ShipmentsRestApiDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\ShipmentsRestApi;

use Spryker\Zed\CustomersRestApi\Communication\Plugin\ShipmentsRestApi\CustomerAddressProviderStrategyPlugin;
use Spryker\Zed\ShipmentsRestApi\ShipmentsRestApiDependencyProvider as SprykerShipmentsRestApiDependencyProvider;

/**
 * @method \Spryker\Zed\ShipmentsRestApi\ShipmentsRestApiConfig getConfig()
 */
class ShipmentsRestApiDependencyProvider extends SprykerShipmentsRestApiDependencyProvider
{
    /**
     * @return \Spryker\Zed\ShipmentsRestApiExtension\Dependency\Plugin\AddressProviderStrategyPluginInterface[]
     */
    protected function getAddressProviderStrategyPlugins(): array
    {
        return [
            new CustomerAddressProviderStrategyPlugin(),
        ];
    }
}
```

**src/Pyz/Zed/CheckoutRestApi/CheckoutRestApiDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\CheckoutRestApi;

use Spryker\Zed\CheckoutRestApi\CheckoutRestApiDependencyProvider as SprykerCheckoutRestApiDependencyProvider;
use Spryker\Zed\CustomersRestApi\Communication\Plugin\CheckoutRestApi\AddressQuoteMapperPlugin;
use Spryker\Zed\CustomersRestApi\Communication\Plugin\CheckoutRestApi\CustomerAddressCheckoutDataValidatorPlugin;
use Spryker\Zed\CustomersRestApi\Communication\Plugin\CheckoutRestApi\CustomerQuoteMapperPlugin;

class CheckoutRestApiDependencyProvider extends SprykerCheckoutRestApiDependencyProvider
{
    /**
     * @return \Spryker\Zed\CheckoutRestApiExtension\Dependency\Plugin\QuoteMapperPluginInterface[]
     */
    protected function getQuoteMapperPlugins(): array
    {
        return [
            new CustomerQuoteMapperPlugin(),
            new AddressQuoteMapperPlugin(),
        ];
    }

    /**
     * @return \Spryker\Zed\CheckoutRestApiExtension\Dependency\Plugin\CheckoutDataValidatorPluginInterface[]
     */
    protected function getCheckoutDataValidatorPlugins(): array
    {
        return [
            new CustomerAddressCheckoutDataValidatorPlugin(),
        ];
    }
}
```


1. Set up the OAuth client:

```bash
console setup:init-db
```

{% info_block warningBox "Verification" %}

Ensure that the OAuth client has been added to the `spy_oauth_client table`:

1. Run the SQL query:

   ```sql
   SELECT * FROM spy_oauth_client WHERE identifier = 'some-client-identifier';
   ```

2. Check that the output contains one record.

{% endinfo_block %}


{% info_block warningBox "Verification" %}

Ensure that the following endpoints are available:

- `https://glue.mysprykershop.com/customers`
- `https://glue.mysprykershop.com/addresses`
- `https://glue.mysprykershop.com/customer-password`
- `https://glue.mysprykershop.com/customer-forgotten-password`
- `https://glue.mysprykershop.com/customer-restore-password`
- `https://glue.mysprykershop.com/access-tokens`
- `https://glue.mysprykershop.com/refresh-tokens`
- `https://glue.mysprykershop.com/token`
- `https://glue.mysprykershop.com/customer-confirmation`

{% endinfo_block %}


{% info_block warningBox "Verification" %}

Ensure that the addresses resource relationship is registered correctly:

1. [Add a customer address](/docs/pbc/all/customer-relationship-management/{{page.version}}/base-shop/manage-using-glue-api/customers/glue-api-manage-customer-addresses.html#add-an-address).

2. Send the request: `GET https://glue.mysprykershop.com/customers/{% raw %}{{{% endraw %}customer_id{% raw %}}}{% endraw %}?include=addresses`.

3. Check that the response contains the relationships to the `addresses` resource.

{% endinfo_block %}


{% info_block warningBox "Verification" %}

Ensure that you’ve set up `AccessTokenRestRequestValidatorPlugin`:

1. Send the `POST https://glue.mysprykershop.com/refresh-tokens` request without the `Authorization` header or with an outdated or incorrect authentication token.

2. Check that one of the following errors is returned:

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

{% endinfo_block %}


{% info_block warningBox "Verification" %}

Ensure that you’ve set up `FormatAuthenticationErrorResponseHeadersPlugin`:

1. Retrieve an authentication token for a user.

2. Check that you can access an endpoint that requires this token only when you add it to the request.

{% endinfo_block %}


{% info_block warningBox "Verification" %}

Ensure that you’ve set up `RestUserFinderByAccessTokenPlugin`:

1. Retrieve an authentication token for a user.

2. Send a request to an endpoint that requires the data of the current customer, like `/carts` or `/customer/{% raw %}{{{% endraw %}customerReference{% raw %}}}{% endraw %}`.

3. Check that the system detects the current customer correctly: you should be able to retrieve all the data you can see on the Storefront, like cart items or prices.

{% endinfo_block %}


{% info_block warningBox "Verification" %}

Ensure that you’ve set up `OauthRefreshTokenSaverPlugin`:

1. Send the request: `POST https://glue.mysprykershop.com/access-tokens`.

2. Check that:

- The response contains `access-token` and `refresh-token` sections.

- A new record is added to the `spy_oauth_refresh_token` table. To check it, run the SQL query:

  ```sql
  SELECT * FROM spy_oauth_refresh_token WHERE customer_reference = 'authenticated-customer-reference';
  ```

{% endinfo_block %}


{% info_block warningBox "Verification" %}

Ensure that you’ve set up `OauthRefreshTokenReaderPlugin` and `OauthRefreshTokenRevokerPlugin`:

1. Send the request: `DELETE https://glue.mysprykershop.com/refresh-tokens/{% raw %}{{{% endraw %}refresh_token}`[.](#)
2. Check that the refresh token has been revoked: run the following SQL query and check that the `spy_oauth_refresh_token::revoked_at` database field is not empty.

{% endinfo_block %}


{% info_block warningBox "Verification" %}

Ensure that you’ve set up `OauthRefreshTokensReaderPlugin` and `OauthRefreshTokensRevokerPlugin`:

1. Prepare several refresh tokens.

2. Send the request: `DELETE https://glue.mysprykershop.com/refresh-tokens/mine`.

3. Run the following SQL query:

   ```sql
   SELECT * FROM spy_oauth_refresh_token WHERE customer_reference = 'authenticated-customer-reference';
   ```

Check that the `spy_oauth_refresh_token::revoked_at` values of all the records related to the authenticated customer are not empty.

{% endinfo_block %}


{% info_block warningBox "Verification" %}

Ensure that you’ve set up `OauthRefreshTokenCheckerPlugin`:

1. Send the following request with a revoked refresh token:
   `POST https://glue.mysprykershop.com/refresh-tokens`

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

2. Check that you get the following response:

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

{% endinfo_block %}


{% info_block warningBox "Verification" %}

Ensure that you’ve set up `OauthRefreshTokenRemoverPlugin`:

1. Delete expired refresh tokens:

   ```shell
   console oauth:refresh-token:remove-expired
   ```

2. Check that all the expired refresh tokens older than defined by the removal interval you’ve configured in `Spryker\Shared\Oauth\OauthConfig::getRefreshTokenRetentionInterval()` were deleted.

{% endinfo_block %}


{% info_block warningBox "Verification" %}

To make sure that you’ve activated `AddressByCheckoutDataResourceRelationshipPlugin`, send the `POST https://glue.mysprykershop.com/checkout-data?include=addresses` request and check that the response contains the information from the addresses resource.

{% endinfo_block %}
