---
title: Glue API- Cart feature integration
originalLink: https://documentation.spryker.com/v6/docs/glue-api-cart-feature-integration
redirect_from:
  - /v6/docs/glue-api-cart-feature-integration
  - /v6/docs/en/glue-api-cart-feature-integration
---

Follow the steps below to install Cart feature API.

### Prerequisites

To start feature integration, overview and install the necessary features:

| Name | Version | Required sub-feature |
| --- | --- | --- |
| Spryker Core | master | [Glue Application Feature Integration](https://documentation.spryker.com/docs/en/glue-api-glue-application-feature-integration) |
| Product | master | [Products Feature Integration](https://documentation.spryker.com/docs/glue-api-products-feature-integration) |
| Cart | master| [Cart Feature Integration](https://documentation.spryker.com/docs/cart-feature-integration) |
| Login | master | Login API Feature Integration |

### 1) Install the Required Modules Using Composer

Run the following command to install the required module:

```bash
composer require spryker/carts-rest-api:"^5.4.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}
Make sure that the following modules have been installed:<table><thead><tr><th>Module</th><th>Expected Directory </th></tr></thead><tbody><tr><td>`CartsRestApi`</td><td>`vendor/spryker/carts-rest-api`</td></tr><tr><td>`CartsRestApiExtension`</td><td>`vendor/spryker/carts-rest-api-extension`</td></tr></tbody></table>
{% endinfo_block %}

## 2) Set up Database Schema and Transfer Objects
Run the following commands to apply database changes and generate entity and transfer changes:

```bash
console transfer:generate
console propel:install
console transfer:generate
```

{% info_block warningBox "Verification" %}
Make sure that the following changes have occurred by checking your database:<table><thead><tr><th>Database entity</th><th>Type</th><th>Event</th></tr></thead><tbody><tr><td>`spy_quote.uuid`</td><td>column	</td><td>added</td></tr></tbody></table>
{% endinfo_block %}

{% info_block warningBox "Verification" %}
Make sure that the following changes have occurred in transfer objects:<table><thead><tr><th>Transfer</th><th>Type</th><th>Event</th><th>Path</th></tr></thead><tbody><tr><td>`RestCartsAttributesTransfer`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/RestCartsAttributesTransfer`</td></tr><tr><td>`RestCartItemsAttributesTransfer`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/RestCartItemsAttributesTransfer`</td></tr><tr><td>`RestItemsAttributesTransfer`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/RestItemsAttributesTransfer`</td></tr><tr><td>`RestCartVouchersAttributesTransfer`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/RestCartVouchersAttributesTransfer`</td></tr><tr><td>`RestCartsDiscountsTransfer`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/RestCartsDiscountsTransfer`</td></tr><tr><td>`RestCartsTotalsTransfer`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/RestCartsTotalsTransfer`</td></tr><tr><td>`RestCartItemCalculationsTransfer`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/RestCartItemCalculationsTransfer`</td></tr><tr><td>`CartItemRequestTransfer`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/CartItemRequestTransfer`</td></tr><tr><td>`AssignGuestQuoteRequestTransfer`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/AssignGuestQuoteRequestTransfer`</td></tr><tr><td>`CustomerTransfer.companyUserTransfer`</td><td>property</td><td>added</td><td>`src/Generated/Shared/Transfer/CustomerTransfer`</td></tr><tr><td>`CustomerTransfer.customerReference`</td><td>property</td><td>added</td><td>`src/Generated/Shared/Transfer/CustomerTransfer`</td></tr><tr><td>`QuoteTransfer.uuid`</td><td>property</td><td>added</td><td>`src/Generated/Shared/Transfer/QuoteTransfer`</td></tr><tr><td>`QuoteTransfer.companyUserId`</td><td>property</td><td>added</td><td>`src/Generated/Shared/Transfer/QuoteTransfer`</td></tr><tr><td>`QuoteTransfer.uuid`</td><td>property</td><td>added</td><td>`src/Generated/Shared/Transfer/QuoteTransfer`</td></tr><tr><td>`QuoteUpdateRequestAttributesTransfer.customerReference`</td><td>property</td><td>added</td><td>`src/Generated/Shared/Transfer/QuoteUpdateRequestAttributesTransfer`</td></tr><tr><td>`RestUserTransfer.idCompanyUser`</td><td>property</td><td>added</td><td>`src/Generated/Shared/Transfer/RestUserTransfer`</td></tr><tr><td>`RestUserTransfer.surrogateIdentifier`</td><td>property</td><td>added</td><td>`src/Generated/Shared/Transfer/RestUserTransfer`</td></tr><tr><td>`QuoteCriteriaFilterTransfer.idCompanyUser`</td><td>property</td><td>added</td><td>`src/Generated/Shared/Transfer/QuoteCriteriaFilterTransfer`</td></tr><tr><td>`QuoteErrorTransfer`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/QuoteErrorTransfer`</td></tr><tr><td>`QuoteResponseTransfer.errors`</td><td>property</td><td>added</td><td>`src/Generated/Shared/Transfer/QuoteResponseTransfer`</td></tr><tr><td>`OauthResponse`</td><td>class</td><td>added</td><td>`src/Generated/Shared/Transfer/OauthResponseTransfer`</td></tr></tbody></table>
{% endinfo_block %}

### 3) Set up Behavior

Enable the following behaviors.

#### Generate UUIDs for the Existing Quote Records Without UUID

Generate UUIDs for the Existing Quote Records Without UUID:


```bash
console uuid:generate Quote spy_quote
```
Run the following command:

{% info_block warningBox "Verification" %}

Make sure that the `uuid` field is populated for all records in the `spy_quote` table:

1. Run the following SQL query:

```sql
SELECT COUNT(*) FROM spy_quote WHERE uuid IS NULL;
```

2. Make sure that the result is *0 records*. 

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
To verify that `AnonymousCustomerUniqueIdValidatorPlugin` is set up correctly, send a request to the endpoint configured to require an anonymous customer id (for example, `http://glue.mysprykershop.com/guest-carts`
{% endinfo_block %} without a header and check if the following error is returned:)

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

#### Disable Cart Item Eager Relationship

Disable cart item eager relationship as follows in `src/Pyz/Glue/CartsRestApi/CartsRestApiConfig.php`: 

```php
<?php
 
namespace Pyz\Glue\CartsRestApi;
 
use Spryker\Glue\CartsRestApi\CartsRestApiConfig as SprykerCartsRestApiConfig;
 
class CartsRestApiConfig extends SprykerCartsRestApiConfig
{
    public const ALLOWED_CART_ITEM_EAGER_RELATIONSHIP = false;
}
```



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
| `ConcreteProductBySkuResourceRelationshipPlugin` | Adds the `concrete-products` resource as a relationship to the `items` and `guest-cart-items` resources. | None | `Spryker\Glue\ProductsRestApi\Plugin\GlueApplication` |
| `QuoteCreatorPlugin` | Creates a single quote for a customer. | None | `Spryker\Zed\CartsRestApi\Communication\Plugin\CartsRestApi` |
| `QuoteCreatorPlugin` | Creates a quote for a customer. | None | `Spryker\Zed\PersistentCart\Communication\Plugin\CartsRestApi` |
| `UpdateGuestQuoteToCustomerQuotePostAuthPlugin` | Updates a non-empty guest quote to a new customer quote. | None | `Spryker\Zed\CartsRestApi\Communication\Plugin\AuthRestApi` |
| `AddGuestQuoteItemsToCustomerQuotePostAuthPlugin` | Adds items from a guest quote to a customer quote. | None | `Spryker\Zed\CartsRestApi\Communication\Plugin\AuthRestApi` |

{% info_block infoBox "Info" %}
Wiring `AddGuestQuoteItemsToCustomerQuotePostAuthPlugin` or `UpdateGuestQuoteToCustomerQuotePostAuthPlugin` depends on the cart behavior strategy (they cannot be wired at the same time
{% endinfo_block %}.</br>There are two strategies for the behavior of carts: single cart behavior and multiple cart behavior. The difference is that in multiple cart behavior it is allowed to create more than one cart for a customer, unlike the single cart behavior.</br>To apply one of those strategies, wire one of the `QuoteCreatorPlugin` plugins in `CartsRestApiDependencyProvider` (Zed). </br>There are two `QuoteCreatorPlugins` placed in different modules:<ul><li>`Spryker\Zed\CartsRestApi\Communication\Plugin\CartsRestApi\QuoteCreatorPlugin` that doesn't allow creating more than one cart.</li><li>`Spryker\Zed\PersistentCart\Communication\Plugin\CartsRestApi\QuoteCreatorPlugin` that allows creating more than one cart.</li></ul>In case when a **single cart** strategy is applied, the `AddGuestQuoteItemsToCustomerQuotePostAuthPlugin` plugin should be wired in `AuthRestApiDependencyProvider`. </br>In case when a **multiple cart** strategy is applied, the `UpdateGuestQuoteToCustomerQuotePostAuthPlugin` plugin should be wired in `AuthRestApiDependencyProvider`. </br>Wiring plugins is illustrated in the code blocks below. )

src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php
    
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
Make sure that the following endpoints are available:<ul><li>http://glue.mysprykershop.com/carts</li><li>http://glue.mysprykershop.com/guest-carts</li></ul>Send a request to "http://glue.mysprykershop.com/carts/{% raw %}{{{% endraw %}cart_uuid{% raw %}}}{% endraw %}/?include=items". The cart with the given id should have at least one added item. Make sure that the response includes relationships to the items resources.</br>Send a request to "http://glue.mysprykershop.com/guest-carts/{% raw %}{{{% endraw %}guest_cart_uuid{% raw %}}}{% endraw %}/?include=items". The guest cart with the given id should have at least one added item. Make sure that the response includes relationships to the items resources.
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
{% endinfo_block %}

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
