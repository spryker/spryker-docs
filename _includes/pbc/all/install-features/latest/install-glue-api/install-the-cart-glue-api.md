


This document describes how to install the [Cart](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/feature-overviews/cart-feature-overview/cart-feature-overview.html) feature API.

## Prerequisites

To start feature integration, integrate the required features and Glue APIs:

| NAME                   | VERSION          | INSTALLATION GUIDE                                                                                                                                                |
|------------------------|------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Glue API: Spryker Core | {{page.version}} | [Install the Spryker Core Glue API](/docs/pbc/all/miscellaneous/{{page.version}}/install-and-upgrade/install-glue-api/install-the-spryker-core-glue-api.html) |
| Glue API: Product      | {{page.version}} | [Install the Product Glue API](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/install-glue-api/install-the-product-glue-api.html)          |
| Cart                   | {{page.version}} | [Install the Cart feature](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-cart-feature.html)                                             |


### 1) Install the required modules

Install the required module:

```bash
composer require spryker/carts-rest-api:"^5.22.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure the following modules have been installed:

| MODULE                | EXPECTED DIRECTORY                      |
|-----------------------|-----------------------------------------|
| CartsRestApi          | vendor/spryker/carts-rest-api           |
| CartsRestApiExtension | vendor/spryker/carts-rest-api-extension |

{% endinfo_block %}


### 2) Set up database schema and transfer objects

Apply database changes and generate entity and transfer changes:

```bash
console transfer:generate
console propel:install
console transfer:generate
```

{% info_block warningBox "Verification" %}

Ensure that the following changes have occurred in the database:

| DATABASE ENTITY | TYPE   | EVENT |
|-----------------|--------|-------|
| spy_quote.uuid  | column | added |

Ensure that the following changes have occurred in transfer objects:

| TRANSFER                                               | TYPE     | EVENT   | PATH                                                               |
|--------------------------------------------------------|----------|---------|--------------------------------------------------------------------|
| RestCartsAttributesTransfer                            | class    | created | src/Generated/Shared/Transfer/RestCartsAttributesTransfer          |
| RestCartItemsAttributesTransfer                        | class    | created | src/Generated/Shared/Transfer/RestCartItemsAttributesTransfer      |
| RestItemsAttributesTransfer                            | class    | created | src/Generated/Shared/Transfer/RestItemsAttributesTransfer          |
| RestCartVouchersAttributesTransfer                     | class    | created | src/Generated/Shared/Transfer/RestCartVouchersAttributesTransfer   |
| RestCartsDiscountsTransfer                             | class    | created | src/Generated/Shared/Transfer/RestCartsDiscountsTransfer           |
| RestCartsTotalsTransfer                                | class    | created | src/Generated/Shared/Transfer/RestCartsTotalsTransfer              |
| RestCartItemCalculationsTransfer                       | class    | created | src/Generated/Shared/Transfer/RestCartItemCalculationsTransfer     |
| CartItemRequestTransfer                                | class    | created | src/Generated/Shared/Transfer/CartItemRequestTransfer              |
| AssignGuestQuoteRequestTransfer                        | class    | created | src/Generated/Shared/Transfer/AssignGuestQuoteRequestTransfer      |
| CustomerTransfer.companyUserTransfer                   | property | added   | src/Generated/Shared/Transfer/CustomerTransfer                     |
| CustomerTransfer.customerReference                     | property | added   | src/Generated/Shared/Transfer/CustomerTransfer                     |
| QuoteTransfer.uuid                                     | property | added   | src/Generated/Shared/Transfer/QuoteTransfer                        |
| QuoteTransfer.companyUserId                            | property | added   | src/Generated/Shared/Transfer/QuoteTransfer                        |
| QuoteTransfer.uuid                                     | property | added   | src/Generated/Shared/Transfer/QuoteTransfer                        |
| QuoteUpdateRequestAttributesTransfer.customerReference | property | added   | src/Generated/Shared/Transfer/QuoteUpdateRequestAttributesTransfer |
| RestUserTransfer.idCompanyUser                         | property | added   | src/Generated/Shared/Transfer/RestUserTransfer                     |
| RestUserTransfer.surrogateIdentifier                   | property | added   | src/Generated/Shared/Transfer/RestUserTransfer                     |
| QuoteCriteriaFilterTransfer.idCompanyUser              | property | added   | src/Generated/Shared/Transfer/QuoteCriteriaFilterTransfer          |
| QuoteErrorTransfer                                     | class    | created | src/Generated/Shared/Transfer/QuoteErrorTransfer                   |
| QuoteResponseTransfer.errors                           | property | added   | src/Generated/Shared/Transfer/QuoteResponseTransfer                |
| OauthResponse                                          | class    | added   | src/Generated/Shared/Transfer/OauthResponseTransfer                |

{% endinfo_block %}

### 3) Set up behavior

Enable the following behaviors.

#### Generate UUIDs for the existing quote records without them

Generate UUIDs for the Existing Quote Records Without UUID:

```bash
console uuid:generate Quote spy_quote
```

{% info_block warningBox "Verification" %}

Ensure that, in the `spy_quote` table, the `uuid` field is populated for all the records:

```sql
SELECT COUNT(*) FROM spy_quote WHERE uuid IS NULL;
```

The result is `0 records`.

{% endinfo_block %}

#### Enable validation

Activate the following plugin:

| PLUGIN                                   | SPECIFICATION                                                                                                                                            | PREREQUISITES | NAMESPACE                                  |
|------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|--------------------------------------------|
| AnonymousCustomerUniqueIdValidatorPlugin | Validates a REST resource request before processing it. Checks if `X-Anonymous-Customer-Unique-Id` header is set and can be used for requested resource. |               | Spryker\Glue\CartsRestApi\Plugin\Validator |


**src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php**

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

{% info_block warningBox "Verification" %}

To ensure that `AnonymousCustomerUniqueIdValidatorPlugin` is set up correctly, send a request without an anonymous customer ID to an endpoint that requires it. For example, send the `GET https://glue.mysprykershop.com/guest-carts` request and check that the following error is returned:

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

{% endinfo_block %}

#### Disable the cart item eager relationship

To use `CartItemsByQuoteResourceRelationshipPlugin` and `GuestCartItemsByQuoteResourceRelationshipPlugin`, disable the `items` and `guest-cart-items` resources to be returned when retrieving carts:

**src/Pyz/Glue/CartsRestApi/CartsRestApiConfig.php**

```php
<?php

namespace Pyz\Glue\CartsRestApi;

use Spryker\Glue\CartsRestApi\CartsRestApiConfig as SprykerCartsRestApiConfig;

class CartsRestApiConfig extends SprykerCartsRestApiConfig
{
    protected const ALLOWED_CART_ITEM_EAGER_RELATIONSHIP = false;
	protected const ALLOWED_GUEST_CART_ITEM_EAGER_RELATIONSHIP = false;
}
```

#### Configure quote creation

You can enable the creation of a cart for a newly authenticated customer while merging the guest cart with the customer cart by adjusting the configuration constant:

**src/Pyz/Zed/CartsRestApi/CartsRestApiConfig.php**

```php
<?php

namespace Pyz\Zed\CartsRestApi;

use Spryker\Zed\CartsRestApi\CartsRestApiConfig as SprykerCartsRestApiConfig;

class CartsRestApiConfig extends SprykerCartsRestApiConfig
{
    protected const IS_QUOTE_CREATION_WHILE_QUOTE_MERGING_ENABLED = true;
}
```

### Enable resources and relationships

Activate the following plugins:

| PLUGIN                                                | SPECIFICATION                                                                                                          | PREREQUISITES | NAMESPACE                                                    |
|-------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------|---------------|--------------------------------------------------------------|
| CartsResourceRoutePlugin                              | Registers the `carts` resource.                                                                                        |               | Spryker\Glue\CartsRestApi\Plugin\ResourceRoute               |
| CartItemsResourceRoutePlugin                          | Registers the `cart-items` resource.                                                                                   |               | Spryker\Glue\CartsRestApi\Plugin\ResourceRoute               |
| GuestCartsResourceRoutePlugin                         | Registers the `guest-carts` resource.                                                                                  |               | Spryker\Glue\CartsRestApi\Plugin\ResourceRoute               |
| GuestCartItemsResourceRoutePlugin                     | Registers the `guest-cart-items` resource.                                                                             |               | Spryker\Glue\CartsRestApi\Plugin\ResourceRoute               |
| SetAnonymousCustomerIdControllerBeforeActionPlugin    | Sets the customer reference value from the `X-Anonymous-Customer-Unique-Id` header.                                    |               | Spryker\Glue\CartsRestApi\Plugin\ControllerBeforeAction      |
| UpdateCartCreateCustomerReferencePlugin               | After registration, updates the cart of a guest customer with a customer reference.                                    |               | Spryker\Glue\CartsRestApi\Plugin\CustomersRestApi            |
| ConcreteProductBySkuResourceRelationshipPlugin        | Adds the `concrete-products` resource as a relationship to the `items` and `guest-cart-items` resources.               |               | Spryker\Glue\ProductsRestApi\Plugin\GlueApplication          |
| QuoteCreatorPlugin                                    | Creates a single quote for a customer.                                                                                 |               | Spryker\Zed\CartsRestApi\Communication\Plugin\CartsRestApi   |
| QuoteCreatorPlugin                                    | Creates one or more quotes for a customer, one quote per request.                                                      |               | Spryker\Zed\PersistentCart\Communication\Plugin\CartsRestApi |
| UpdateGuestQuoteToCustomerQuotePostAuthPlugin         | Updates a non-empty guest quote with a new customer quote.                                                             |               | Spryker\Zed\CartsRestApi\Communication\Plugin\AuthRestApi    |
| AddGuestQuoteItemsToCustomerQuotePostAuthPlugin       | Adds items from a guest quote to a customer quote.                                                                     |               | Spryker\Zed\CartsRestApi\Communication\Plugin\AuthRestApi    |
| CartItemsByQuoteResourceRelationshipPlugin            | Adds the `items` resource as a relationship to the `carts` resource.                                                   |               | Spryker\Glue\CartsRestApi\Plugin\GlueApplication             |
| GuestCartItemsByQuoteResourceRelationshipPlugin       | Adds the `guest-cart-items` resource as a relationship to the `guest-carts` resource.                                  |               | Spryker\Glue\CartsRestApi\Plugin\GlueApplication             |
| CustomerCartsResourceRoutePlugin                      | Configuration for resource routing, how HTTP methods map to controller actions, and if actions are protected.          |               | Spryker\Glue\CartsRestApi\Plugin\ResourceRoute               |

{% info_block infoBox %}

There are two cart behavior strategies: single cart and multicart. Unlike the single cart behavior, the multicart one lets you create more than one cart for a customer. Depending on the selected strategy, from the plugin pairs in the following table, wire only one plugin into the respective provider.

{% endinfo_block %}

| PROVIDER                             | SINGLE-CART BEHAVIOR                                                          | MULTICART BEHAVIOR                                                              |
|--------------------------------------|-------------------------------------------------------------------------------|---------------------------------------------------------------------------------|
| CartsRestApiDependencyProvider (Zed) | Spryker\Zed\CartsRestApi\Communication\Plugin\CartsRestApi\QuoteCreatorPlugin | Spryker\Zed\PersistentCart\Communication\Plugin\CartsRestApi\QuoteCreatorPlugin |
| AuthRestApiDependencyProvider        | AddGuestQuoteItemsToCustomerQuotePostAuthPlugin                               | UpdateGuestQuoteToCustomerQuotePostAuthPlugin                                   |


<details>
<summary>src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Glue\GlueApplication;

use Spryker\Glue\CartsRestApi\CartsRestApiConfig;
use Spryker\Glue\CartsRestApi\Plugin\ControllerBeforeAction\SetAnonymousCustomerIdControllerBeforeActionPlugin;
use Spryker\Glue\CartsRestApi\Plugin\ResourceRoute\CartItemsResourceRoutePlugin;
use Spryker\Glue\CartsRestApi\Plugin\ResourceRoute\CartsResourceRoutePlugin;
use Spryker\Glue\CartsRestApi\Plugin\ResourceRoute\CustomerCartsResourceRoutePlugin;
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
            new CustomerCartsResourceRoutePlugin(),
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

</details>

{% info_block warningBox "Verification" %}

Ensure that the `https://glue.mysprykershop.com/carts` endpoint is available:

1. [Create one or more carts](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/manage-using-glue-api/manage-carts-of-registered-users/glue-api-manage-carts-of-registered-users.html#create-a-cart).
2. Send the request: `GET https://glue.mysprykershop.com/carts/`.
3. Check that the response contains the list of carts of the customer you are [authenticated](/docs/pbc/all/identity-access-management/{{page.version}}/manage-using-glue-api/glue-api-authenticate-as-a-customer.html) with.

Ensure that the `https://glue.mysprykershop.com/guest-carts` endpoint is available:

1. [Create a guest cart](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/manage-using-glue-api/manage-guest-carts/glue-api-manage-guest-carts.html#create-a-guest-cart).
2. Send the request: `GET https://glue.mysprykershop.com/carts/`.
3. Check that the response contains the cart you have created.

Ensure that the `items` resource relationships are registered as a relationship of the `carts` resource:

1. [Add one or more items to the cart](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/manage-using-glue-api/manage-carts-of-registered-users/glue-api-manage-items-in-carts-of-registered-users.html#add-an-item-to-a-registered-users-cart).
2. Send the request: `GET https://glue.mysprykershop.com/carts/{% raw %}{{{% endraw %}cart_uuid{% raw %}}}{% endraw %}/?include=items`.
3. Check that the response contains the relationships to the `items` resource.

Ensure that the `guest-cart-items` resource relationship is registered as a relationship of the `guest-carts` resource:

1. [Add one or more items to the cart](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/manage-using-glue-api/manage-guest-carts/glue-api-manage-guest-cart-items.html#add-items-to-a-guest-cart).
2 Send the request: `GET https://glue.mysprykershop.com/guest-carts/{% raw %}{{{% endraw %}guest_cart_uuid{% raw %}}}{% endraw %}/?include=guest-cart-items`.
1. Check that the response contains the relationships to the `guest-cart-items` resource.

Make sure that the `https://glue.mysprykershop.com/customers/{% raw %}{{{% endraw %}customerId{% raw %}}}{% endraw %}/carts` endpoint is available.

**src/Pz/Glue/CustomersRestApi/CustomersRestApiDependencyProvider.php**

```php
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

To ensure that you've installed `UpdateCartCreateCustomerReferencePlugin`, check if, after a guest user with a cart registers, their guest cart is converted into a regular cart.

**src/Pyz/Zed/AuthRestApi/AuthRestApiDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\AuthRestApi;

use Spryker\Zed\AuthRestApi\AuthRestApiDependencyProvider as SprykerAuthRestApiDependencyProvider;
use Spryker\Zed\CartsRestApi\Communication\Plugin\AuthRestApi\UpdateGuestQuoteToCustomerQuotePostAuthPlugin;

class AuthRestApiDependencyProvider extends SprykerAuthRestApiDependencyProvider
{
    /**
     * @return \Spryker\Zed\AuthRestApiExtension\Dependency\Plugin\PostAuthPluginInterface[]
     */
    protected function getPostAuthPlugins(): array
    {
        return [
            new UpdateGuestQuoteToCustomerQuotePostAuthPlugin(),
        ];
    }
}
```

Ensure that `UpdateGuestQuoteToCustomerQuotePostAuthPlugin` is installed correctly:
1. Create a guest cart with one or more items.
2. Authenticate as a customer.
3. Check if the guest cart has been converted into a new cart of the registered customer.

**src/Pyz/Zed/CartsRestApi/CartsRestApiDependencyProvider.php**

```php
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

To verify that `Spryker\Zed\CartsRestApi\Communication\Plugin\CartsRestApi\QuoteCreatorPlugin` is installed correctly, send the `POST https://glue.mysprykershop.com/carts/` request with a valid body. Ensure that you cannot create more than one cart for the same customer. If you try to create more than one cart, you receive the following error code as a response:

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

{% endinfo_block %}
