---
title: Wishlist API Feature Integration
originalLink: https://documentation.spryker.com/v1/docs/wishlist-api-feature-integration
redirect_from:
  - /v1/docs/wishlist-api-feature-integration
  - /v1/docs/en/wishlist-api-feature-integration
---

## Install Feature API
### Prerequisites
To start feature integration, overview and install the necessary features:

| Name | Version |
| --- | --- |
|  Spryker Core| 2018.12.0 |
| Product Management |  2018.12.0|
| Wishlist | 2018.12.0 |
|ProductsRestApi  |2.2.3  |

### 1) Install the Required Modules Using Composer
Run the following commands to install the required modules:

```bash
composer require spryker/wishlists-rest-api:"^1.3.0" --update-with-dependencies
composer require spryker/wishlist-items-products-resource-relationship:"^1.0.0" --update-with-dependencies
```

{% info_block infoBox "Verification" %}
Make sure that the following modules are installed:
{% endinfo_block %}

| Module | Expected directory |
| --- | --- |
|`WishlistsRestApi`  | `vendor/spryker/wishlists-rest-api` |
| `WishlistItemsProductsResourceRelationship` |`vendor/spryker/wishlist-items-products-resource-relationship`  |

### 2) Set up Database Schema and Transfer objects
Run the following commands to apply database changes, and also generate entity and transfer changes:

```bash
console transfer:generate
console propel:install
console transfer:generate
```

**Verification**
{% info_block infoBox %}
Make sure that the following changes have occurred in the database:
{% endinfo_block %}

| Database entity | Type | Event |
| --- | --- | --- |
| `spy_wishlist.uuid` | column |added |

{% info_block infoBox %}
Make sure that the following changes have occurred in transfer objects:
{% endinfo_block %}

| Transfer | Type | Event | Path |
| --- | --- | --- | --- |
| `RestWishlistItemsAttributesTransfer` |  class| created |`src/Generated/Shared/Transfer/RestWishlistItemsAttributesTransfer`  |
| `RestWishlistsAttributesTransfer` | class | created |`src/Generated/Shared/Transfer/RestWishlistsAttributesTransfer`  |
| `WishlistTransfer.uuid` | property |added  | `src/Generated/Shared/Transfer/WishlistTransfer` |

### 3) Set up behavior
#### Generate UUIDs for existing whishlist records that have no UUID
Run the following command:

```bash
console wishlists:uuid:update
```

{% info_block infoBox "Verification" %}
Make sure that the `uuid` field is populated for all the records in the spy_wishlist table. You can run the following SQL query and make sure that the result is 0 records. <br> ```select count(*
{% endinfo_block %} from spy_wishlist where uuid is NULL;```)

#### Enable resources and relationships
Activate the following plugins:

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `WishlistsResourceRoutePlugin` | Registers the `wishlists` resource.	 | None
 |`Spryker\Glue\WishlistsRestApi\Plugin`  |
| `WishlistItemsResourceRoutePlugin` | Registers the `wishlist-items` resource.	 | None | `Spryker\Glue\WishlistsRestApi\Plugin` |
| `WishlistItemsConcreteProductsResourceRelationshipPlugin` | Adds the `concrete-products` resource as a relationship to the `wishlist-items` resource.	 | None | `Spryker\Glue\WishlistItemsProductsResourceRelationship\Plugin` |
| `WishlistRelationshipByResourceIdPlugin` | Adds the `wishlists` resource as a relationship to the `customers` resource. | None | `Spryker\Glue\WishlistsRestApi\Plugin` |

<details open>
    <summary>src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php</summary>
    
```php
<?php
 
namespace Pyz\Glue\GlueApplication;
 
use Spryker\Glue\GlueApplication\GlueApplicationDependencyProvider as SprykerGlueApplicationDependencyProvider;
use Spryker\Glue\WishlistItemsProductsResourceRelationship\Plugin\WishlistItemsConcreteProductsResourceRelationshipPlugin;
use Spryker\Glue\WishlistsRestApi\Plugin\WishlistItemsResourceRoutePlugin;
use Spryker\Glue\WishlistsRestApi\Plugin\WishlistRelationshipByResourceIdPlugin;
use Spryker\Glue\WishlistsRestApi\Plugin\WishlistsResourceRoutePlugin;
use Spryker\Glue\WishlistsRestApi\WishlistsRestApiConfig;
 
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
        $resourceRelationshipCollection-&gt;addRelationship(
            WishlistsRestApiConfig::RESOURCE_WISHLIST_ITEMS,
            new WishlistItemsConcreteProductsResourceRelationshipPlugin()
        );
        $resourceRelationshipCollection-&gt;addRelationship(
            CustomersRestApiConfig::RESOURCE_CUSTOMERS,
            new WishlistRelationshipByResourceIdPlugin()
        );
 
        return $resourceRelationshipCollection;
    }
}
```

</br>
</details>

**Verification**
{% info_block infoBox %}
Make sure that the following endpoints are available:
{% endinfo_block %}

* `http:///glue.mysprykershop.com/wishlists`
* `http:///glue.mysprykershop.com/wishlists/{% raw %}{{{% endraw %}wishlist_id{% raw %}}}{% endraw %}/wishlists-items`

{% info_block infoBox %}
Make a request to `http://glue.mysprykershop.com/wishlists/{% raw %}{{{% endraw %}wishlist_id{% raw %}}}{% endraw %}/wishlists-items?include=concrete-products` and make sure that the given wishlist has at least one product added. Make sure that the response includes relationships to the `concrete-products` resources.		
{% endinfo_block %}

{% info_block infoBox %}
Make a request to `http://glue.mysprykershop.com/customers/{% raw %}{{{% endraw %}customer_id{% raw %}}}{% endraw %}?include=wishlists` and make sure that the given customer has at least one wishlist. Make sure that the response includes relationships to the `wishlists` resources.
{% endinfo_block %}

**See also:**

[Managing Wishlists](/docs/scos/dev/glue-api/201811.0/glue-api-storefront-guides/managing-wishli)

_Last review date: Apr 11, 2019_ 

[//]: # (by Karoly Gerner and Volodymyr Volkov)
