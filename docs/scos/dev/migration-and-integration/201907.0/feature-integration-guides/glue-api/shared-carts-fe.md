---
title: Shared Carts Feature Integration
originalLink: https://documentation.spryker.com/v3/docs/shared-carts-feature-integration-glue-201907
redirect_from:
  - /v3/docs/shared-carts-feature-integration-glue-201907
  - /v3/docs/en/shared-carts-feature-integration-glue-201907
---

## Install Feature API
### Prerequisites
To start feature integration, overview and install the necessary features:

| Name | Version | Required sub-feature |
| --- | --- | --- |
| Spryker Core | 201907.0 | Glue Application Feature Integration |
| Cart | 201907.0 | Cart Feature Integration |
| Uuid generation console | 201907.0 | Uuid Generation Console Feature Integration |

### 1) Install the Required Modules Using Composer
Run the following command(s) to install the required modules:

```bash
composer require spryker/shared-carts-rest-api:"^1.2.0" spryker/cart-permission-groups-rest-api:"^1.2.0" --update-with-dependencies	
```

{% info_block warningBox %}
Make sure that the following modules were installed:
{% endinfo_block %}

| Module | Expected Directory |
| --- | --- |
| `SharedCartsRestApi` | `vendor/spryker/shared-carts-rest-api` |
| `CartPermissionGroupsRestApi` | `vendor/spryker/cart-permission-groups-rest-api` |

### 2) Set up Database Schema and Transfer Objects
Run the following commands to generate transfer changes:

```bash
console transfer:generate
console propel:install
console transfer:generate
```

{% info_block warningBox %}
Make sure that the following changes have been applied in transfer objects:
{% endinfo_block %}

| Transfer | Type | Event | Path |
| --- | --- | --- | --- |
| `ShareDetailCriteriaFilterTransfer` | class | added | `src/Generated/Shared/Transfer/ShareDetailCriteriaFilterTransfer.php` |
| `QuoteCompanyUserTransfer` | class | added | `src/Generated/Shared/Transfer/QuoteCompanyUserTransfer.php` |
| `QuotePermissionGroupResponseTransfer` | class | added | `src/Generated/Shared/Transfer/QuotePermissionGroupResponseTransfer.php` |
| `ShareCartResponseTransfer` | class | added | `src/Generated/Shared/Transfer/ShareCartResponseTransfer.php` |
| `RestCartPermissionGroupsAttributesTransfer` | class | added | `src/Generated/Shared/Transfer/RestCartPermissionGroupsAttributesTransfer.php` |
| `RestSharedCartsAttributesTransfer` | class | added | `src/Generated/Shared/Transfer/RestSharedCartsAttributesTransfer.php` |
| `ShareDetailTransfer.uuid` | property | added | `src/Generated/Shared/Transfer/ShareDetailTransfer.php` |
| `ShareCartRequestTransfer.quoteUuid` | property | added | `src/Generated/Shared/Transfer/ShareCartRequestTransfer.php` |
| `ShareCartRequestTransfer.customerReference` | property | added | `src/Generated/Shared/Transfer/ShareCartRequestTransfer.php` |
| `QuoteTransfer.quotePermissionGroup` | property | added | `src/Generated/Shared/Transfer/QuoteTransfer.php` |

{% info_block warningBox %}
Make sure that the following changes have been applied by checking your database:
{% endinfo_block %}

| Database entity | Type | Event |
| --- | --- | --- |
| `spy_quote_company_user.uuid` | column | added |

### 3) Set up Behavior
#### Generate UUIDs for the existing company records without UUID:
Run the following command:

```bash
console uuid:generate SharedCart spy_quote_company_user
```

{% info_block warningBox %}
Make sure that the `uuid` field is populated for all records in the `spy_quote_company_user` table. You can run the following SQL query for it and make sure that the result is 0 records.
{% endinfo_block %}

```sql
select count(*) from spy_quote_company_user where uuid is NULL;
```

#### Enable resources and relationships

{% info_block infoBox %}
`SharedCartsResourceRoutePlugin` POST, PATCH, DELETE, `CartPermissionGroupsResourceRoutePlugin` GET verbs are protected resources. Refer to the *configure* section of the Configure documentation <!-- link to https://documentation.spryker.com/glue_rest_api/glue_api_developer_guides/glue-infrastructure.htm?Highlight=glue#resource-routing --> .
{% endinfo_block %}

Activate the following plugins:

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `SharedCartsResourceRoutePlugin` | Registers a `/shared-carts` resource route. | None | `Spryker\Glue\SharedCartsRestApi\Plugin\GlueApplication\SharedCartsResourceRoutePlugin` |
| `CartPermissionGroupsResourceRoutePlugin` | Registers a `/cart-permission-groups` resource route. | None | `Spryker\Glue\CartPermissionGroupsRestApi\Plugin\GlueApplication\CartPermissionGroupsResourceRoutePlugin` |
| `CartPermissionGroupByQuoteResourceRelationshipPlugin` | Adds a `cart-permission-group` resource as a relationship to cart resource. | None | `Spryker\Glue\CartPermissionGroupsRestApi\Plugin\GlueApplication\CartPermissionGroupByQuoteResourceRelationshipPlugin` |
| `SharedCartByCartIdResourceRelationshipPlugin` | Adds a `shared-cart-resource` as a relationship to a cart resource. | None | `Spryker\Glue\SharedCartsRestApi\Plugin\GlueApplication\SharedCartByCartIdResourceRelationshipPlugin` |
| `CartPermissionGroupByShareDetailResourceRelationshipPlugin` | Adds a `cart-permission-group` resource as a  relationship to a shared cart resource.  | None | `Spryker\Glue\CartPermissionGroupsRestApi\Plugin\GlueApplication\CartPermissionGroupByShareDetailResourceRelationshipPlugin` |
| `CompanyUserByShareDetailResourceRelationshipPlugin` | Adds a company user resource as a relationship to a shared cart resource. | None | `Spryker\Glue\CompanyUsersRestApi\Plugin\GlueApplication\CompanyUserByShareDetailResourceRelationshipPlugin` |
| `SharedCartQuoteCollectionExpanderPlugin`| Expands quote collection with the carts shared with a user.| None | `Spryker\Zed\SharedCart\Communication\Plugin\CartsRestApi\SharedCartQuoteCollectionExpanderPlugin`|
| `CompanyUserStorageProviderPlugin` | Retrieves information about a company user from the key-value storage. | None | `Spryker\Glue\CompanyUserStorage\Communication\Plugin\SharedCartsRestApi\CompanyUserStorageProviderPlugin` |
| `CompanyUserCustomerExpanderPlugin` | Expands the customer transfer with the company user transfer. | None | `Spryker\Glue\CompanyUsersRestApi\Plugin\CartsRestApi\CompanyUserCustomerExpanderPlugin` |
| `QuotePermissionGroupQuoteExpanderPlugin` | Expands the quote transfer with a quote permission group. | None | `Spryker\Zed\SharedCartsRestApi\Communication\Plugin\CartsRestApi\QuotePermissionGroupQuoteExpanderPlugin` |

<details open>
<summary>src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php</summary>
    
```php
<?php
 
namespace Pyz\Glue\GlueApplication;
 
use Spryker\Glue\CartPermissionGroupsRestApi\Plugin\GlueApplication\CartPermissionGroupByQuoteResourceRelationshipPlugin;
use Spryker\Glue\CartPermissionGroupsRestApi\Plugin\GlueApplication\CartPermissionGroupByShareDetailResourceRelationshipPlugin;
use Spryker\Glue\CartPermissionGroupsRestApi\Plugin\GlueApplication\CartPermissionGroupsResourceRoutePlugin;
use Spryker\Glue\CartsRestApi\CartsRestApiConfig;
use Spryker\Glue\CompanyUsersRestApi\Plugin\GlueApplication\CompanyUserByShareDetailResourceRelationshipPlugin;
use Spryker\Glue\GlueApplication\GlueApplicationDependencyProvider as SprykerGlueApplicationDependencyProvider;
use Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRelationshipCollectionInterface;
use Spryker\Glue\SharedCartsRestApi\Plugin\GlueApplication\SharedCartByCartIdResourceRelationshipPlugin;
use Spryker\Glue\SharedCartsRestApi\Plugin\GlueApplication\SharedCartsResourceRoutePlugin;
use Spryker\Glue\SharedCartsRestApi\SharedCartsRestApiConfig;
 
class GlueApplicationDependencyProvider extends SprykerGlueApplicationDependencyProvider
{
	/**
	* @return \Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRoutePluginInterface[]
	*/
	protected function getResourceRoutePlugins(): array
	{
		return [
			new CartPermissionGroupsResourceRoutePlugin(),
			new SharedCartsResourceRoutePlugin(),
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
			CartsRestApiConfig::RESOURCE_CARTS,
			new CartPermissionGroupByQuoteResourceRelationshipPlugin()
		);
		$resourceRelationshipCollection->addRelationship(
			CartsRestApiConfig::RESOURCE_CARTS,
			new SharedCartByCartIdResourceRelationshipPlugin()
		);
		$resourceRelationshipCollection->addRelationship(
			SharedCartsRestApiConfig::RESOURCE_SHARED_CARTS,
			new CartPermissionGroupByShareDetailResourceRelationshipPlugin()
		);
		$resourceRelationshipCollection->addRelationship(
			SharedCartsRestApiConfig::RESOURCE_SHARED_CARTS,
			new CompanyUserByShareDetailResourceRelationshipPlugin()
		);
 
		return $resourceRelationshipCollection;
	}
}
```

</br>
</details>

<details open>
<summary>src/Pyz/Zed/CartsRestApi/CartsRestApiDependencyProvider.php</summary>

```php
<?php
 
namespace Pyz\Zed\CartsRestApi;
 
use Spryker\Zed\CartsRestApi\CartsRestApiDependencyProvider as SprykerCartsRestApiDependencyProvider;
use Spryker\Zed\SharedCart\Communication\Plugin\CartsRestApi\SharedCartQuoteCollectionExpanderPlugin;
use Spryker\Zed\SharedCartsRestApi\Communication\Plugin\CartsRestApi\QuotePermissionGroupQuoteExpanderPlugin;
 
class CartsRestApiDependencyProvider extends SprykerCartsRestApiDependencyProvider
{
	/**
	* @return \Spryker\Zed\CartsRestApiExtension\Dependency\Plugin\QuoteCollectionExpanderPluginInterface[]
	*/
	protected function getQuoteCollectionExpanderPlugins(): array
	{
		return [
			new SharedCartQuoteCollectionExpanderPlugin(),
		];
	}
 
	/**
	* @return \Spryker\Zed\CartsRestApiExtension\Dependency\Plugin\QuoteExpanderPluginInterface[]
	*/
	protected function getQuoteExpanderPlugins(): array
	{
		return [
			new QuotePermissionGroupQuoteExpanderPlugin(),
		];
	}
}
```

</br>
</details>

<details open>
<summary>src/Pyz/Glue/SharedCartsRestApi/SharedCartsRestApiDependencyProvider.php</summary>

```php
<?php
 
namespace Pyz\Glue\SharedCartsRestApi;
 
use Spryker\Glue\CompanyUserStorage\Communication\Plugin\SharedCartsRestApi\CompanyUserStorageProviderPlugin;
use Spryker\Glue\SharedCartsRestApi\SharedCartsRestApiDependencyProvider as SprykerSharedCartsRestApiDependencyProvider;
use Spryker\Glue\SharedCartsRestApiExtension\Dependency\Plugin\CompanyUserProviderPluginInterface;
 
class SharedCartsRestApiDependencyProvider extends SprykerSharedCartsRestApiDependencyProvider
{
	/**
	* @return \Spryker\Glue\SharedCartsRestApiExtension\Dependency\Plugin\CompanyUserProviderPluginInterface
	*/
	protected function getCompanyUserProviderPlugin(): CompanyUserProviderPluginInterface
	{
		return new CompanyUserStorageProviderPlugin();
	}
}
```

</br>
</details>

<details open>
<summary>src/Pyz/Glue/CartsRestApi/CartsRestApiDependencyProvider.php</summary>

```php
<?php
 
namespace Pyz\Glue\CartsRestApi;
 
use Spryker\Glue\CartsRestApi\CartsRestApiDependencyProvider as SprykerCartsRestApiDependencyProvider;
use Spryker\Glue\CompanyUsersRestApi\Plugin\CartsRestApi\CompanyUserCustomerExpanderPlugin;
 
class CartsRestApiDependencyProvider extends SprykerCartsRestApiDependencyProvider
{
	/**
	* @return \Spryker\Glue\CartsRestApiExtension\Dependency\Plugin\CustomerExpanderPluginInterface[]
	*/
	protected function getCustomerExpanderPlugins(): array
	{
		return [
			new CompanyUserCustomerExpanderPlugin(),
		];
	}
}
```

</br>
</details>

{% info_block warningBox %}
Make sure that the following endpoints return carts shared with the customer by other users (you can compare the YVES carts and carts GLUE returns
{% endinfo_block %}:<ul><li>http://glue.mysprykershop.com/carts</li></ul>)

{% info_block warningBox %}
Make a request to *http://glue.mysprykershop.com/carts/?include=cart-permission-groups* and make sure that shared carts resources will get a relationship to the correct cart-permission-groups resource.</br>Make a request to *http://glue.mysprykershop.com/carts/{% raw %}{{{% endraw %}cart_uuid{% raw %}}}{% endraw %}/?include=cart-permission-groups*. Make sure that a single cart item (no matter owned by customers or shared with them
{% endinfo_block %} is returned.)

{% info_block warningBox %}
Make sure that the following endpoints return carts shared with the customer by other users (you can compare the YVES carts and carts GLUE returns
{% endinfo_block %}:<ul><li>*http://glue.mysprykershop.com/carts*</li></ul>)

{% info_block warningBox %}
Make a request to *http://glue.mysprykershop.com/carts/?include=shared-carts,cart-permission-groups,company-users* and make sure that the carts shared with the other users will get the shared-cart resource as a relationship. Each shared carts resource, in turn, will get a relationship to the cart permission group associated with the relationship and company user with whom the cart is shared.</br>Make a request to *http://glue.mysprykershop.com/carts/{% raw %}{{{% endraw %}cart_uuid{% raw %}}}{% endraw %}/?include=shared-carts,cart-permission-groups,company-users*. Make sure that a single cart is returned with those relationships too.
{% endinfo_block %}

{% info_block warningBox %}
To make sure that `CartPermissionGroupsResourceRoutePlugin` is installed correctly, make a call to the *http://glue.mysprykershop.com/cart-permission-groups* resource it provides. </br>The request to *http://glue.mysprykershop.com/cart-permission-groups/:uuid* should return a single `cart-permission-groups` resource.
{% endinfo_block %}

{% info_block warningBox %}
To make sure that `SharedCartsResourceRoutePlugin` is installed correctly, make several calls to the /shared-carts resource it provides. It should be possible to make a POST call to *http://glue.mysprykershop.com/carts/{% raw %}{{{% endraw %}cart_uuid{% raw %}}}{% endraw %}/shared-carts* with the following body:
{% endinfo_block %}

<details open>
<summary>POST http://glue.mysprykershop.com/carts/{% raw %}{{{% endraw %}cart_uuid{% raw %}}}{% endraw %}/shared-carts</summary>

```json
{
	"data": {
		"type": "shared-carts",
		"attributes": {
			"idCompanyUser": "88ac19e3-ca9c-539e-b1f1-9c3b7fd48718",
			"idCartPermissionGroup": 1
		}
	}
}
```

</br>
</details>

{% info_block warningBox %}
The same plugin, `SharedCartsResourceRoutePlugin`, allows accepting a PATCH request to *http://glue.mysprykershop.com/shared-carts/{% raw %}{{{% endraw %}sharedcartuuid{% raw %}}}{% endraw %}*:
{% endinfo_block %}

<details open>
<summary>PATCH http://glue.mysprykershop.com/shared-carts/{% raw %}{{{% endraw %}shared_cart_uuid{% raw %}}}{% endraw %}</summary>

```json
{
	"data": {
		"type": "shared-carts",
		"attributes": {
			"idCartPermissionGroup": 2
		}
	}
}
```

</br>
</details>

{% info_block warningBox %}
To delete cart sharing, send a DELETE request to *http://glue.mysprykershop.com/shared-carts/{% raw %}{{{% endraw %}sharedcartuuid{% raw %}}}{% endraw %}*. 204 status will mean that the action was successful.
{% endinfo_block %}

<!-- Last review date: Aug 05, 2019 Eugenia Poidenko, Yuliia Boiko-->
