---
title: Glue API - Cart feature integration
description: Install the Cart API feature in your project.
last_updated: Aug 13, 2020
template: feature-integration-guide-template
originalLink: https://documentation.spryker.com/v4/docs/cart-feature-integration
originalArticleId: 61c4ca5a-12f2-42e3-ae96-272338b60e4e
redirect_from:
  - /v4/docs/cart-feature-integration
  - /v4/docs/en/cart-feature-integration
related:
  - title: Managing Guest Carts
    link: docs/scos/dev/glue-api-guides/page.version/managing-carts/guest-carts/managing-guest-carts.html
---

## Install Feature API

### Prerequisites

To start feature integration, overview and install the necessary features:

| Name | Version | Integration guide |
| --- | --- | --- |
| Spryker Core | {{page.version}} | [Glue Application feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/glue-api/glue-api-spryker-core-feature-integration.html) |
| Product | {{page.version}} | [Products feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/glue-api/glue-api-product-feature-integration.html) |
| Glue API: Cart |{{page.version}} | [Glue API: Cart feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/glue-api/glue-api-cart-feature-integration.html) |
| Glue API: Login | {{page.version}} | Login API feature integration |

### 1) Install the required modules using Composer

Run the following command to install the required module:

```bash
composer require spryker/carts-rest-api:"^5.4.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

|Module|Expected Directory|
|--- |--- |
|`CartsRestApi`|`vendor/spryker/carts-rest-api`|
|`CartsRestApiExtension`|`vendor/spryker/carts-rest-api-extension`|

{% endinfo_block %}

## 2) Set up Database Schema and Transfer Objects

Run the following commands to apply database changes and generate entity and transfer changes:

```bash
console transfer:generate
console propel:install
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure that the following changes have occurred by checking your database:

|Database entity|Type|Event|
|--- |--- |--- |
|`spy_quote.uuid`|column|added|

{% endinfo_block %}

{% info_block warningBox "Verification" %}

Make sure that the following changes have occurred in transfer objects:

|Transfer|Type|Event|Path|
|--- |--- |--- |--- |
|`RestCartsAttributesTransfer`|class|created|`src/Generated/Shared/Transfer/RestCartsAttributesTransfer`|
|`RestCartItemsAttributesTransfer`|class|created|`src/Generated/Shared/Transfer/RestCartItemsAttributesTransfer`|
|`RestItemsAttributesTransfer`|class|created|`src/Generated/Shared/Transfer/RestItemsAttributesTransfer`|
|`RestCartVouchersAttributesTransfer`|class|created|`src/Generated/Shared/Transfer/RestCartVouchersAttributesTransfer`|
|`RestCartsDiscountsTransfer`|class|created|`src/Generated/Shared/Transfer/RestCartsDiscountsTransfer`|
|`RestCartsTotalsTransfer`|class|created|`src/Generated/Shared/Transfer/RestCartsTotalsTransfer`|
|`RestCartItemCalculationsTransfer`|class|created|`src/Generated/Shared/Transfer/RestCartItemCalculationsTransfer`|
|`CartItemRequestTransfer`|class|created|`src/Generated/Shared/Transfer/CartItemRequestTransfer`|
|`AssignGuestQuoteRequestTransfer`|class|created|`src/Generated/Shared/Transfer/AssignGuestQuoteRequestTransfer`|
|`CustomerTransfer.companyUserTransfer`|property|added|`src/Generated/Shared/Transfer/CustomerTransfer`|
|`CustomerTransfer.customerReference`|property|added|`src/Generated/Shared/Transfer/CustomerTransfer`|
|`QuoteTransfer.uuid`|property|added|`src/Generated/Shared/Transfer/QuoteTransfer`|
|`QuoteTransfer.companyUserId`|property|added|`src/Generated/Shared/Transfer/QuoteTransfer`|
|`QuoteTransfer.uuid`|property|added|`src/Generated/Shared/Transfer/QuoteTransfer`|
|`QuoteUpdateRequestAttributesTransfer.customerReference`|property|added|`src/Generated/Shared/Transfer/QuoteUpdateRequestAttributesTransfer`|
|`RestUserTransfer.idCompanyUser`|property|added|`src/Generated/Shared/Transfer/RestUserTransfer`|
|`RestUserTransfer.surrogateIdentifier`|property|added|`src/Generated/Shared/Transfer/RestUserTransfer`|
|`QuoteCriteriaFilterTransfer.idCompanyUser`|property|added|`src/Generated/Shared/Transfer/QuoteCriteriaFilterTransfer`|
|`QuoteErrorTransfer`|class|created|`src/Generated/Shared/Transfer/QuoteErrorTransfer`|
|`QuoteResponseTransfer.errors`|property|added|`src/Generated/Shared/Transfer/QuoteResponseTransfer`|
|`OauthResponse`|class|added|`src/Generated/Shared/Transfer/OauthResponseTransfer`|

{% endinfo_block %}

### 3) Set up Behavior

#### Generate UUIDs for the existing quote records without UUID:

```bash
console uuid:generate Quote spy_quote
```

Run the following command:

{% info_block warningBox "Verification" %}

Make sure that the uuid field is populated for all records in the spy_quote table. To do so, run the following SQL query for it and make sure that the result is 0 records. 

```
SELECT COUNT(* FROM spy_quote WHERE uuid IS NULL;
```

{% endinfo_block %} 

#### Enable Validation

Activate the following plugin:

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `AnonymousCustomerUniqueIdValidatorPlugin` | Validates a Rest resource request before further processing.  Executed after formatting an HTTP request to the resource. | None | `Spryker\Glue\CartsRestApi\Plugin\Validator` |

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

To verify that `AnonymousCustomerUniqueIdValidatorPlugin` is set up correctly, send a request to the endpoint configured to require an anonymous customer id (for example, `http://glue.mysprykershop.com/guest-carts` without a header and check if the following error is returned:

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

#### Enable resources and relationships

Activate the following plugins:

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `CartsResourceRoutePlugin` | Registers the carts resource. | None | `Spryker\Glue\CartsRestApi\Plugin\ResourceRoute` |
| `CartItemsResourceRoutePlugin` | Registers the cart items resource. | None | `Spryker\Glue\CartsRestApi\Plugin\ResourceRoute` |
| `GuestCartsResourceRoutePlugin` | Registers the guest-carts resource. | None | `Spryker\Glue\CartsRestApi\Plugin\ResourceRoute` |
| `GuestCartItemsResourceRoutePlugin` | Registers the guest-cart-items resource. | None | `Spryker\Glue\CartsRestApi\Plugin\ResourceRoute` |
| `SetAnonymousCustomerIdControllerBeforeActionPlugin` | Sets the customer reference value from X-Anonymous-Customer-Unique-Id header. | None | `Spryker\Glue\CartsRestApi\Plugin\ControllerBeforeAction` |
| `UpdateCartCreateCustomerReferencePlugin` | Updates the cart of a guest customer with a customer reference after registration. | None | `Spryker\Glue\CartsRestApi\Plugin\CustomersRestApi` |
| `ConcreteProductBySkuResourceRelationshipPlugin` | Adds the concrete-products resource as a relationship by SKU. | None | `Spryker\Glue\ProductsRestApi\Plugin\GlueApplication` |
| `QuoteCreatorPlugin` | Creates a single quote for a customer. | None | `Spryker\Zed\CartsRestApi\Communication\Plugin\CartsRestApi` |
| `QuoteCreatorPlugin` | Creates a quote for a customer. | None | `Spryker\Zed\PersistentCart\Communication\Plugin\CartsRestApi` |
| `UpdateGuestQuoteToCustomerQuotePostAuthPlugin` | Updates a non-empty guest quote to a new customer quote. | None | `Spryker\Zed\CartsRestApi\Communication\Plugin\AuthRestApi` |
| `AddGuestQuoteItemsToCustomerQuotePostAuthPlugin` | Adds items from a guest quote to a customer quote. | None | `Spryker\Zed\CartsRestApi\Communication\Plugin\AuthRestApi` |

{% info_block infoBox "Info" %}

Wiring `AddGuestQuoteItemsToCustomerQuotePostAuthPlugin` or `UpdateGuestQuoteToCustomerQuotePostAuthPlugin` depends on the cart behavior strategy (they cannot be wired at the same time).

There are two strategies for the behavior of carts: single cart behavior and multiple cart behavior. The difference is that in multiple cart behavior it is allowed to create more than one cart for a customer, unlike the single cart behavior.

To apply one of those strategies, wire one of the `QuoteCreatorPlugin` plugins in `CartsRestApiDependencyProvider` (Zed).

There are two `QuoteCreatorPlugins` placed in different modules:
- `Spryker\Zed\CartsRestApi\Communication\Plugin\CartsRestApi\QuoteCreatorPlugin` that doesn't allow creating more than one cart.
- `Spryker\Zed\PersistentCart\Communication\Plugin\CartsRestApi\QuoteCreatorPlugin` that allows creating more than one cart.
  
 
In case when a **single cart** strategy is applied, the `AddGuestQuoteItemsToCustomerQuotePostAuthPlugin` plugin should be wired in `AuthRestApiDependencyProvider`. 
In case when a **multiple cart** strategy is applied, the `UpdateGuestQuoteToCustomerQuotePostAuthPlugin` plugin should be wired in `AuthRestApiDependencyProvider`. 
Wiring plugins is illustrated in the code blocks below.

{% endinfo_block %}

**src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php**

```php
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

{% info_block warningBox "Verification" %}

Make sure that the following endpoints are available:
- http://glue.mysprykershop.com/carts
- http://glue.mysprykershop.com/guest-carts
  
Send a request to "http://glue.mysprykershop.com/carts/{% raw %}{{{% endraw %}cart_uuid{% raw %}}}{% endraw %}/?include=items". The cart with the given id should have at least one added item. Make sure that the response includes relationships to the items resources.
Send a request to "http://glue.mysprykershop.com/guest-carts/{% raw %}{{{% endraw %}guest_cart_uuid{% raw %}}}{% endraw %}/?include=items". The guest cart with the given id should have at least one added item. Make sure that the response includes relationships to the items resources.

{% endinfo_block %}

**src/Pyz/Glue/CustomersRestApi/CustomersRestApiDependencyProvider.php**

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

{% info_block warningBox "Verification" %}

To verify that `UpdateCartCreateCustomerReferencePlugin` is installed correctly, check whether the guest cart is converted into a regular cart after new customer registration.

{% endinfo_block %}

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

{% info_block warningBox "Verification" %}

To verify that `UpdateGuestQuoteToCustomerQuotePostAuthPlugin` is installed correctly, check whether a non-empty guest cart is converted into the new customer cart after the customer has been authenticated.

{% endinfo_block %}

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

{% info_block warningBox "Verification" %}

To verify that `QuoteCreatorPlugin` is installed correctly, send a POST request to "http://glue.mysprykershop.com/carts/" with a valid body. Make sure that you are unable to create more than one cart for the same customer. Otherwise, you receive the following error response:

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