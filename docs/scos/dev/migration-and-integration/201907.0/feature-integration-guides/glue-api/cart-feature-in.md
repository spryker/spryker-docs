---
title: Glue- Cart Feature Integration
originalLink: https://documentation.spryker.com/v3/docs/cart-feature-integration
redirect_from:
  - /v3/docs/cart-feature-integration
  - /v3/docs/en/cart-feature-integration
---

## Install Feature API

### Prerequisites

To start feature integration, overview and install the necessary features:

| Name | Version | Required sub-feature |
| --- | --- | --- |
| Spryker Core | 201907.0 | [Glue Application Feature Integration](/docs/scos/dev/migration-and-integration/201907.0/feature-integration-guides/glue-api/glue-applicatio) |
| Product | 201907.0 | [Glue: Product Feature Integration](/docs/scos/dev/migration-and-integration/201907.0/feature-integration-guides/glue-api/products-featur) |
| Cart | 201907.0 | [Cart Feature Integration](/docs/scos/dev/migration-and-integration/201907.0/feature-integration-guides/glue-api/cart-feature-in) |
| Login | 201907.0 | Login API Feature Integration |

### 1) Install the Required Modules Using Composer

Run the following command to install the required module:

```bash
composer require spryker/carts-rest-api:"^4.2.1" --update-with-dependencies
```
<section contenteditable="false" class="warningBox"><div class="content">

**Verification**
    
Make sure that the following modules are installed:

| Module | Expected Directory |
| --- | --- |
| `CartsRestApi` | `vendor/spryker/carts-rest-api` |
| `CartsRestApiExtension` | `vendor/spryker/carts-rest-api-extension` |
</div></section>

### 2) Set up Database Schema and Transfer Objects

Run the following commands to generate transfer changes:

```bash
console transfer:generate
console propel:install
console transfer:generate
```
<section contenteditable="false" class="warningBox"><div class="content">

**Verification**
    
Make sure that the following changes have occurred in the database:

| Database entity | Type | Event |
| --- | --- | --- |
| `spy_quote.uuid` | column | added |

Make sure that the following changes have occurred in transfer objects:

| Transfer | Type | Event | Path |
| --- | --- | --- | --- |
| `RestCartsAttributesTransfer` | class | created | `src/Generated/Shared/Transfer/RestCartsAttributesTransfer` |
| `RestCartItemsAttributesTransfer` | class | created | `src/Generated/Shared/Transfer/RestCartItemsAttributesTransfer` |
| `RestItemsAttributesTransfer` | class | created | `src/Generated/Shared/Transfer/RestItemsAttributesTransfer` |
| `RestCartVouchersAttributesTransfer` | class | created | `src/Generated/Shared/Transfer/RestCartVouchersAttributesTransfer` |
| `RestCartsDiscountsTransfer` | class | created | `src/Generated/Shared/Transfer/RestCartsDiscountsTransfer` |
| `RestCartsTotalsTransfer` | class | created | `src/Generated/Shared/Transfer/RestCartsTotalsTransfer` |
| `RestCartItemCalculationsTransfer` | class | created | `src/Generated/Shared/Transfer/RestCartItemCalculationsTransfer` |
| `CartItemRequestTransfer` | class | created | `src/Generated/Shared/Transfer/CartItemRequestTransfer` |
| `AssignGuestQuoteRequestTransfer` | class | created | `src/Generated/Shared/Transfer/AssignGuestQuoteRequestTransfer` |
| `CustomerTransfer.companyUserTransfer` | property | added | `src/Generated/Shared/Transfer/CustomerTransfer` |
| `CustomerTransfer.customerReference` | property | added | `src/Generated/Shared/Transfer/CustomerTransfer` |
| `QuoteTransfer.uuid` | property | added | `src/Generated/Shared/Transfer/QuoteTransfer` |
| `QuoteTransfer.companyUserId` | property | added | `src/Generated/Shared/Transfer/QuoteTransfer` |
| `QuoteTransfer.uuid` | property | added | `src/Generated/Shared/Transfer/QuoteTransfer` |
| `QuoteUpdateRequestAttributesTransfer.customerReference` | property | added | `src/Generated/Shared/Transfer/QuoteUpdateRequestAttributesTransfer` |
| `RestUserTransfer.idCompanyUser` | property | added | `src/Generated/Shared/Transfer/RestUserTransfer` |
| `RestUserTransfer.surrogateIdentifier` | property | added | `src/Generated/Shared/Transfer/RestUserTransfer` |
| `QuoteCriteriaFilterTransfer.idCompanyUser` | property | added | `src/Generated/Shared/Transfer/QuoteCriteriaFilterTransfer` |
| `QuoteErrorTransfer` | class | created | `src/Generated/Shared/Transfer/QuoteErrorTransfer` |
| `QuoteResponseTransfer.errors` | property | added | `src/Generated/Shared/Transfer/QuoteResponseTransfer` |
</div></section>

### 3) Set up Behavior

#### Generate UUIDs for the database entries that do not have a UUID

Run the following command:

```bash
console uuid:generate Quote spy_quote
```
<section contenteditable="false" class="warningBox"><div class="content">

**Verification**
    
Make sure that the `uuid` field is populated for all records in the `spy_quote` table. To do so, run the following SQL query and make sure that the result is <b>0</b> records.

```sql
SELECT COUNT(*) FROM spy_quote WHERE uuid IS NULL;
```
</div></section>

#### Enable validation

Activate the following plugin:

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `AnonymousCustomerUniqueIdValidatorPlugin` | Validates Rest requests before procession. Executed immediately after formatting an HTTP resource request. | None | `Spryker\Glue\CartsRestApi\Plugin\Validator` |

<details open>
<summary>src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Glue\GlueApplication;

use Spryker\Glue\CartsRestApi\Plugin\Validator\AnonymousCustomerUniqueIdValidatorPlugin;
use Spryker\Glue\GlueApplication\GlueApplicationDependencyProvider as SprykerGlueApplicationDependencyProvider;

class GlueApplicationDependencyProvider extends SprykerGlueApplicationDependencyProvider
{
	/**
	* @return \Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ValidateRestRequestPluginInterface[]
	*/
	protected function getValidateRestRequestPlugins(): array
	{
		return [
			new AnonymousCustomerUniqueIdValidatorPlugin(),
		];
	}
}
```

</br>
</details>

<section contenteditable="false" class="warningBox"><div class="content">

**Verification**
    
To make sure that `AnonymousCustomerUniqueIdValidatorPlugin` is set up correctly, send a request to an endpoint configured to require an anonymous customer ID (for example, `http://glue.mysprykershop.com/guest-carts`) without any ID and check whether the following error is returned:

```json
{
	"errors": [
		{
			"status": 400,
			"code": "109",
			"detail": "Anonymous customer unique id is empty."
		}
	]
}
```
</div></section>

#### Enable resources and relationships

Activate the following plugins:

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `CartsResourceRoutePlugin` | Registers the `carts` resource. | None | `Spryker\Glue\CartsRestApi\Plugin\ResourceRoute` |
| `CartItemsResourceRoutePlugin` | Registers the `cart-items` resource. | None | `Spryker\Glue\CartsRestApi\Plugin\ResourceRoute` |
| `GuestCartsResourceRoutePlugin` | Registers the `guest-carts` resource. | None | `Spryker\Glue\CartsRestApi\Plugin\ResourceRoute` |
| `GuestCartItemsResourceRoutePlugin` | Registers the `guest-cart-items` resource. | None | `Spryker\Glue\CartsRestApi\Plugin\ResourceRoute` |
| `SetAnonymousCustomerIdControllerBeforeActionPlugin` | Sets a customer reference based on the value of the `X-Anonymous-Customer-Unique-Id` header. | None | `Spryker\Glue\CartsRestApi\Plugin\ControllerBeforeAction` |
| `UpdateCartCreateCustomerReferencePlugin` | After customer registration updates a guest cart with a customer reference. | None | `Spryker\Glue\CartsRestApi\Plugin\CustomersRestApi` |
| `ConcreteProductBySkuResourceRelationshipPlugin` | Adds the `concrete-products` resource as a relationship referenced by an SKU. | None | `Spryker\Glue\ProductsRestApi\Plugin\GlueApplication` |
| `QuoteCreatorPlugin` | Creates a single quote for a customer. | None | `Spryker\Zed\CartsRestApi\Communication\Plugin\CartsRestApi` |

<details open>
<summary>src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php</summary>

```PHP
<?php

namespace Pyz\Glue\GlueApplication;

use Spryker\Glue\CartsRestApi\CartsRestApiConfig;
use Spryker\Glue\CartsRestApi\Plugin\ControllerBeforeAction\SetAnonymousCustomerIdControllerBeforeActionPlugin;
use Spryker\Glue\CartsRestApi\Plugin\ResourceRoute\CartItemsResourceRoutePlugin;
use Spryker\Glue\CartsRestApi\Plugin\ResourceRoute\CartsResourceRoutePlugin;
use Spryker\Glue\CartsRestApi\Plugin\ResourceRoute\GuestCartItemsResourceRoutePlugin;
use Spryker\Glue\CartsRestApi\Plugin\ResourceRoute\GuestCartsResourceRoutePlugin;
use Spryker\Glue\GlueApplication\GlueApplicationDependencyProvider as SprykerGlueApplicationDependencyProvider;
use Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRelationshipCollectionInterface;
use Spryker\Glue\ProductsRestApi\Plugin\GlueApplication\ConcreteProductBySkuResourceRelationshipPlugin;

class GlueApplicationDependencyProvider extends SprykerGlueApplicationDependencyProvider
{
	/**
	* @return \Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRoutePluginInterface[]
	*/
	protected function getResourceRoutePlugins(): array
	{
		return [
			new CartsResourceRoutePlugin(),
			new CartItemsResourceRoutePlugin(),
			new GuestCartsResourceRoutePlugin(),
			new GuestCartItemsResourceRoutePlugin(),
		];
	}

	/**
	* @return \Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ControllerBeforeActionPluginInterface[]
	*/
	protected function getControllerBeforeActionPlugins(): array
	{
		return [
			new SetAnonymousCustomerIdControllerBeforeActionPlugin(),
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
			CartsRestApiConfig::RESOURCE_CART_ITEMS,
			new ConcreteProductBySkuResourceRelationshipPlugin()
		);
		$resourceRelationshipCollection->addRelationship(
			CartsRestApiConfig::RESOURCE_GUEST_CARTS_ITEMS,
			new ConcreteProductBySkuResourceRelationshipPlugin()
		);

		return $resourceRelationshipCollection;
	}
}
```

<br />
</details>

<section contenteditable="false" class="warningBox"><div class="content">

**Verification**
    
To verify the plugin integration:

1. Make sure that the following endpoints are available:
    - `http://glue.mysprykershop.com/carts`
    - `http://glue.mysprykershop.com/guest-carts`
2. Make a request to `http://glue.mysprykershop.com/carts/{% raw %}{{{% endraw %}cart_uuid{% raw %}}}{% endraw %}/?include=items`. The cart with the given ID should have at least one item in it.
3. Make sure that the response includes relationships to the corresponding cart items resources.
4. Make a request to `http://glue.mysprykershop.com/guest-carts/{% raw %}{{{% endraw %}guest_cart_uuid{% raw %}}}{% endraw %}/?include=items`. The guest cart with the given ID should have at least one item in it.
5. Make sure that the response includes relationships to the corresponding guest cart items resources.
</div></section>

<details open>
<summary>src/Pyz/Glue/CustomersRestApi/CustomersRestApiDependencyProvider.php</summary>

```PHP
<?php

namespace Pyz\Glue\CustomersRestApi;

use Spryker\Glue\CartsRestApi\Plugin\CustomersRestApi\UpdateCartCreateCustomerReferencePlugin;
use Spryker\Glue\CustomersRestApi\CustomersRestApiDependencyProvider as SprykerCustomersRestApiDependencyProvider;

class CustomersRestApiDependencyProvider extends SprykerCustomersRestApiDependencyProvider
{
	/**
	* @return \Spryker\Glue\CustomersRestApiExtension\Dependency\Plugin\CustomerPostCreatePluginInterface[]
	*/
	protected function getCustomerPostCreatePlugins(): array
	{
		return array_merge(parent::getCustomerPostCreatePlugins(), [
			new UpdateCartCreateCustomerReferencePlugin(),
		]);
	}
}
```

<br />
</details>

<section contenteditable="false" class="warningBox"><div class="content">

**Verification**
    
To verify that `UpdateCartCreateCustomerReferencePlugin` is installed correctly, check whether a guest cart is converted into a regular cart after new customer registration.
</div></section>

<details open>
<summary>src/Pyz/Zed/CartsRestApi/CartsRestApiDependencyProvider.php</summary>

```PHP
<?php

namespace Pyz\Zed\CartsRestApi;

use Spryker\Zed\CartsRestApi\CartsRestApiDependencyProvider as SprykerCartsRestApiDependencyProvider;
use Spryker\Zed\CartsRestApi\Communication\Plugin\CartsRestApi\QuoteCreatorPlugin;
use Spryker\Zed\CartsRestApiExtension\Dependency\Plugin\QuoteCreatorPluginInterface;

class CartsRestApiDependencyProvider extends SprykerCartsRestApiDependencyProvider
{
	/**
	* @return \Spryker\Zed\CartsRestApiExtension\Dependency\Plugin\QuoteCreatorPluginInterface
	*/
	protected function getQuoteCreatorPlugin(): QuoteCreatorPluginInterface
	{
		return new QuoteCreatorPlugin();
	}
}
```
</details>

<section contenteditable="false" class="warningBox"><div class="content">

**Verification**
    
To verify that `QuoteCreatorPlugin` is installed correctly, send a <i>POST</i> request to `http://glue.mysprykershop.com/carts/` with a valid body and make sure that you are unable to create more than one cart for the same customer. When attempting to create the second cart, you should receive the following error response:

```json
{
	"errors": [
		{
			"status": 422,
			"code": "110",
			"detail": "Customer already has a cart."
		}
	]
}
```
</div></section>

<!-- Last review date: November 11, 2019 by Tihran Voitov, Volodymyr Volkov and Yuliia Boiko -->

