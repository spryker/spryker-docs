---
title: Customer Account Management Feature Integration
originalLink: https://documentation.spryker.com/v3/docs/customer-account-management-feature-integration-glue-201907
redirect_from:
  - /v3/docs/customer-account-management-feature-integration-glue-201907
  - /v3/docs/en/customer-account-management-feature-integration-glue-201907
---

{% info_block errorBox %}
The following Feature Integration guide expects the basic feature to be in place.</br>The current Feature Integration guide only adds the Oauth, Auth Rest API and Customers Rest API functionality.
{% endinfo_block %}

## Install Feature API
### Prerequisites
To start feature integration, overview and install the necessary features:

| Name | Version | Required sub-feature |
| --- | --- | --- |
| Spryker Core | 201907.0 | [Glue Application Feature Integration](/docs/scos/dev/migration-and-integration/201907.0/feature-integration-guides/glue-api/glue-applicatio) |
| Customer Account Management | 201907.0 |  |

### 1)Install the Required Modules Using Composer
Run the following command to install the required modules:

```bash
composer require spryker/customers-rest-api:"^1.10.1" "spryker/auth-rest-api":"^2.2.2" "spryker/oauth":"^1.5.1" "spryker/oauth-customer-connector:"^1.4.0" --update-with-dependencies
```

{% info_block warningBox %}
Make sure that the following modules are installed:
{% endinfo_block %}

| Module | Expected Directory |
| --- | --- |
| `Oauth` | `vendor/spryker/oauth` |
|`OauthCustomerConnector` | `vendor/spryker/oauth-customer-connector` |
| `AuthRestApi` | `vendor/spryker/auth-rest-api` |
| `CustomersRestApiExtensions` | `vendor/spryker/customers-rest-api-extension` |
| `CustomersRestApi	` | `vendor/spryker/customers-rest-api` |

### 2) Set up Configuration
Set required OAuth config (see the [Installation documentation](https://oauth2.thephpleague.com/installation/) for more information about keys generation):

<details open>
<summary>config/Shared/config_default.php</summary>
    
```php
$config[OauthConstants::PRIVATE_KEY_PATH] = 'file://path/to/private.key';
$config[OauthConstants::PUBLIC_KEY_PATH] = 'file://path/to/public.key';
$config[OauthConstants::ENCRYPTION_KEY] = 'generated-encryption-key';
$config[OauthConstants::OAUTH_CLIENT_IDENTIFIER] = 'some-client-identifier';
$config[OauthConstants::OAUTH_CLIENT_SECRET] = 'some-client-secret';
```
    
</br>
</details>

### 3) Set Up Database Schema and Transfer Objects
Run the following commands to apply database changes, and also generate entity and transfer changes:

```bash
console transfer:generate
console propel:install
console transfer:generate
```

{% info_block warningBox %}
Make sure that the following changes have occurred in the database:
{% endinfo_block %}

| Transfer | Type | Event |
| --- | --- | --- |
| `spy_customer_address.uuid` | column | created |
| `spy_customer_address.spy_customer_address-unique-uuid` | index | created |

{% info_block warningBox %}
Make sure that the following changes have occurred in transfer objects:
{% endinfo_block %}

| Transfer | Type | Event | Path |
| --- | --- | --- | --- |
| `Address.uuid` | column | created | `src/Generated/Shared/Transfer/Address` |
| `RestCustomersAttributes` | class | created | `src/Generated/Shared/Transfer/RestCustomersAttributes` |
| `RestCustomersResponseAttributes` | class | created | `src/Generated/Shared/Transfer/RestCustomersResponseAttributes` |
| `RestCustomersRegisterAttributes` | class | created | `src/Generated/Shared/Transfer/RestCustomersRegisterAttributes` |
| `RestAddressAttributes` | class | created | `src/Generated/Shared/Transfer/RestAddressAttributes` |
| `RestCustomerPasswordAttributes` | class | created | `src/Generated/Shared/Transfer/RestCustomerPasswordAttributes` |
| `RestCustomerForgottenPasswordAttributes` | class | created | `src/Generated/Shared/Transfer/RestCustomerForgottenPasswordAttributes` |
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

### 4) Set Up Behavior
#### Migrate data in the database

{% info_block infoBox %}
The following steps generate UUIDs for existing entities in the `spy_customer_address` table.
{% endinfo_block %}

Run the following command:

```bash
console uuid:generate Customer spy_customer_address
```

{% info_block warningBox %}
Make sure that the `UUID` field is populated for all records in the `spy_customer_address` table. For this purpose, run the following SQL query and make sure that the result is 0 records: 
{% endinfo_block %}

```sql
SELECT COUNT(*) FROM spy_customer_address WHERE uuid IS NULL;
```

#### Enable resources and relationships

{% info_block infoBox %}
`CustomersResourceRoutePlugin` GET, PATCH, DELETE verbs, `AddressesResourceRoutePlugin` GET, POST, PATCH and DELETE, `CustomerPasswordResourceRoutePlugin` PATCH are protected resources. Please refer to the configure section of [Configure documentation](https://documentation.spryker.com/glue_rest_api/glue_api_developer_guides/glue-infrastructure.htm?Highlight=glue#resource-routing
{% endinfo_block %}.)

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

<details open>
<summary>src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php</summary>
    
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
		$resourceRelationshipCollection-&gt;addRelationship(
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

</br>
</details>

<details open>
<summary>src/Pyz/Zed/Oauth/OauthDependencyProvider.php</summary>

```php
<?php
  
namespace Pyz\Zed\Oauth;
  
use Spryker\Zed\Oauth\OauthDependencyProvider as SprykerOauthDependencyProvider;
use Spryker\Zed\OauthCustomerConnector\Communication\Plugin\Oauth\CustomerOauthScopeProviderPlugin;
use Spryker\Zed\OauthCustomerConnector\Communication\Plugin\Oauth\CustomerOauthUserProviderPlugin;
  
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
}
```

</br>
</details>

<details open>
<summary>src/Pyz/Zed/Installer/InstallerDependencyProvider.php</summary>

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

</br>
</details>

Run the following command to set up OAuth client:

```bash
console setup:init-db
```

{% info_block warningBox %}
Make sure that the OAuth client is added to the spy_oauth_client table. You can run the following SQL-query for it and make sure that the result is 1 record. 
{% endinfo_block %}

```sql
SELECT * FROM spy_oauth_client WHERE identifier = 'some-client-identifier';
```

{% info_block warningBox %}
Make sure that the following endpoints are available:<ul><li>http://mysprykershop.com/customers</li><li>http://mysprykershop.com/addresses</li><li>http://mysprykershop.com/customer-password</li><li>http://mysprykershop.com/customer-forgotten-password</li><li>http://mysprykershop.com/customer-restore-password</li><li>http://glue.mysprykershop.com/refresh-tokens</li><li>http://glue.mysprykershop.com/access-tokens</li></ul>
{% endinfo_block %}

{% info_block warningBox %}
Send a request to *http://mysprykershop.com/customers/{% raw %}{{{% endraw %}customer_id{% raw %}}}{% endraw %}?include=addresses*. Make sure that the response includes relationships to the addresses resources.</br>The Customer with the given ID should have at least one address. 
{% endinfo_block %}

{% info_block warningBox %}
To verify `AccessTokenRestRequestValidatorPlugin` is set up correctly, you'll need to send a request to `/refresh-tokens` without "Authorization: Bearer {token}" (or with the outdated or wrong token
{% endinfo_block %}. If you get one of the following errors, the plugin is installed:)

<details open>
<summary>Auth error</summary>

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

</br>
</details>

<details open>
<summary>Auth error</summary>

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

</br>
</details>

{% info_block warningBox %}
To make sure that `FormatAuthenticationErrorResponseHeadersPlugin` has been set up correctly, get an access token for any user, and then check that the endpoints that require validation are accessible when accessed with this token.
{% endinfo_block %}

{% info_block warningBox %}
To make sure that `RestUserFinderByAccessTokenPlugin` has been set up correctly, get an access token for any user, and then check that the endpoints that require data of the current customer (e.g. `/carts`, `/customer/:customerReference`
{% endinfo_block %} are accessible and make sure that the system detects the current customer correctly (data endpoints return is the same the customer can see in Yves).)


