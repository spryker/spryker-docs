---
title: Glue API- Wishlist feature integration
originalLink: https://documentation.spryker.com/v6/docs/glue-api-wishlist-feature-integration
redirect_from:
  - /v6/docs/glue-api-wishlist-feature-integration
  - /v6/docs/en/glue-api-wishlist-feature-integration
---

Follow the steps below to install Wishlist feature API.

### Prerequisites
To start feature integration, overview and install the necessary features:
|Name|Version|Required sub-feature|
|---|---|---|
Spryker Core|201907.0|[Glue Application Feature Integration](/docs/scos/dev/migration-and-integration/201907.0/feature-integration-guides/glue-api/glue-applicatio)|
|Product|201907.0|[Product API Feature Integration](https://documentation.spryker.com/v3/docs/product-api-feature-integration-201907)|
|Wishlist| 201907.0 |

### 1) Install the Required Modules Using Composer
Run the following command to install the required modules:

```bash
composer require spryker/wishlists-rest-api:"^1.0.0" --update-with-dependencies
```
<section contenteditable="false" class="warningBox"><div class="content">
    Make sure that the following module has been installed:
    
|Module|Expected directory|
|---|---|
|`WishlistsRestApi`|`vendor/spryker/wishlists-rest-apiWishlistItems`|

</div></section>
    
### 2) Set Up Database Schema and Transfer Objects
Run the following commands to apply database changes, and generate entity and transfer changes:

```bash
console transfer:generate
console propel:install
console transfer:generate
```

<section contenteditable="false" class="warningBox"><div class="content">
    Make sure that the following changes have occurred in the database:

|Database entity|Type|Event|
|---|---|---|
|`spy_wishlist.uuid`|column|added|
</div></section>

<section contenteditable="false" class="warningBox"><div class="content">
Make sure that the following changes have occurred in transfer objects:

|Transfer|Type|Event|Path|
|---|---|---|---|
|`RestWishlistItemsAttributesTransfer`|class|created|`src/Generated/Shared/Transfer/RestWishlistItemsAttributesTransfer`|
|`RestWishlistsAttributesTransfer`|class|created|`src/Generated/Shared/Transfer/RestWishlistsAttributesTransfer`|
|`WishlistTransfer.uuid`|property|added|`src/Generated/Shared/Transfer/WishlistTransfer`|
</div></section>

### 3) Set Up Behavior
#### Migrate data in the database

{% info_block infoBox %}
The following steps generate UUIDs for existing entities in the `spy_wishlist` table.
{% endinfo_block %}

Run the following command:

```bash
console uuid:update Wishlist spy_wishlist
```

{% info_block warningBox "(Make sure that the `uuid` field is populated for all records in the `spy_wishlist` table.</br>For this purpose, run the following SQL query and make sure that the result is 0 records:</br>`SELECT COUNT(*) FROM spy_wishlist WHERE uuid IS NULL;`)

#### Enable resources and relationships

Activate the following plugins:

|Plugin|Specification|Prerequisites|Namespace|
|---|---|---|---|
|WishlistsResourceRoutePlugin|Registers the `wishlists` resource.|None|Spryker\Glue\WishlistsRestApi\Plugin|
|WishlistItemsResourceRoutePlugin|Registers the `wishlist-items` resource.|None|Spryker\Glue\WishlistsRestApi\Plugin|
|WishlistRelationshipByResourceIdPlugin|Adds the `wishlists` resource as a relationship to the customers resource.|None|Spryker\Glue\WishlistsRestApi\Plugin|
| ConcreteProductBySkuResourceRelationshipPlugin | Adds the `concrete-products` resource as a relationship to the `wishlist-items` resource. | None | Spryker\Glue\ProductsRestApi\Plugin\GlueApplication |



<details open>
<summary>src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php</summary>

```php
<?php
 
namespace Pyz\Glue\GlueApplication;
 
use Spryker\Glue\CustomersRestApi\CustomersRestApiConfig;
use Spryker\Glue\GlueApplication\GlueApplicationDependencyProvider as SprykerGlueApplicationDependencyProvider;
use Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRelationshipCollectionInterface;
use Spryker\Glue\WishlistsRestApi\Plugin\WishlistItemsResourceRoutePlugin;
use Spryker\Glue\WishlistsRestApi\Plugin\WishlistRelationshipByResourceIdPlugin;
use Spryker\Glue\WishlistsRestApi\Plugin\WishlistsResourceRoutePlugin
 
class GlueApplicationDependencyProvider extends SprykerGlueApplicationDependencyProvider
{
    /**
     * @return \Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRoutePluginInterface[]
     */
    protected function getResourceRoutePlugins(): array
    {
        return [
            new WishlistsResourceRoutePlugin(),
            new WishlistItemsResourceRoutePlugin(),
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
            new WishlistRelationshipByResourceIdPlugin()
        );
 
        return $resourceRelationshipCollection;
    }
}
```

</br>
</details>

@(Warning" %}

{% endinfo_block %}(Make sure that the following endpoints are available:<ul><li>`http:///glue.mysprykershop.com/wishlists`</li><li>`http:///glue.mysprykershop.com/wishlists/{% raw %}{{{% endraw %}wishlist_id{% raw %}}}{% endraw %}/wishlists-items`</li></ul>Send a request to `http://glue.mysprykershop.com/customers/{% raw %}{{{% endraw %}customer_id{% raw %}}}{% endraw %}?include=wishlists` and make sure that the given customer has at least one wishlist. Make sure that the response includes relationships to the `wishlists` resources.)

**See also:**

* [Managing Wishlists](/docs/scos/dev/glue-api/202001.0/glue-api-storefront-guides/managing-wishli)

*Last review date: Aug 02, 2019* <!-- by  Tihran Voitov, Yuliia Boiko-->
