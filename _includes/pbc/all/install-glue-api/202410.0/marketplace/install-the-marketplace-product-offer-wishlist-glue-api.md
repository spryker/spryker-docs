This document describes how to integrate the Marketplace Product Offer + Wishlist Glue API feature into a Spryker project.

## Install feature core

Follow the steps below to install the Marketplace Product Offer + Wishlist Glue API feature core.

### Prerequisites

Install the required features:

| NAME | VERSION | INSTALLATION GUIDE |
|-|-|-|
| Marketplace Wishlist | {{page.version}} |[Install Wishlist feature](/docs/pbc/all/shopping-list-and-wishlist/{{page.version}}/marketplace/install-and-upgrade/install-features/install-the-marketplace-wishlist-feature.html) |
| Marketplace Product Offer API    | {{page.version}}  | [Install the Marketplace Product Offer Glue API](/docs/pbc/all/offer-management/{{page.version}}/marketplace/install-and-upgrade/install-glue-api/install-the-marketplace-product-offer-glue-api.html) |

### 1) Install the required modules

Install the required modules using Composer:

```bash
composer require spryker/merchant-product-offer-wishlist-rest-api:"^1.0.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| MODULE | EXPECTED DIRECTORY |
|-|-|
| MerchantProductOfferWishlistRestApi | spryker/merchant-product-offer-wishlist-rest-api |

{% endinfo_block %}

### 2) Set up transfer objects

Generate transfer changes:

```bash
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure the following changes have been applied in transfer objects:

| TRANSFER | TYPE | EVENT | PATH |
|-|-|-|-|
| WishlistItemRequest.productOfferReference  | property | Created | src/Generated/Shared/Transfer/WishlistItemRequestTransfer |
| RestWishlistItemsAttributes.productOfferReference  | property | Created | src/Generated/Shared/Transfer/RestWishlistItemsAttributesTransfer |
| RestWishlistItemsAttributes.merchantReference  | property | Created | src/Generated/Shared/Transfer/RestWishlistItemsAttributesTransfer |

{% endinfo_block %}

### 3) Set up behavior

Activate the following plugins:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
|---|---|---|---|
| MerchantProductOfferAddItemPreCheckPlugin | Returns `WishlistPreAddItemCheckResponse.isSuccess=false` if no product offers found by the `WishlistItem.productOfferReference` transfer property. |  | Spryker\Zed\MerchantProductOfferWishlist\Communication\Plugin\Wishlist |
| ProductOfferRestWishlistItemsAttributesMapperPlugin | Populates `RestWishlistItemsAttributes.id` with the following pattern: `{WishlistItem.sku}_{WishlistItemTransfer.productOfferReference}`. |  | Spryker\Glue\MerchantProductOfferWishlistRestApi\Plugin\Wishlist |
| ProductOfferRestWishlistItemsAttributesDeleteStrategyPlugin | Checks if requested the wishlist item exists in the wishlist item collection. |  | Spryker\Zed\MerchantProductOfferWishlistRestApi\Communication\Plugin |
| EmptyProductOfferRestWishlistItemsAttributesDeleteStrategyPlugin | Checks if the requested wishlist item exists in the wishlist item collection. |  | Spryker\Zed\MerchantProductOfferWishlistRestApi\Communication\Plugin |
| MerchantByMerchantReferenceResourceRelationshipPlugin | Adds `merchants` resources as relationship by merchant references in the attributes. |  | Spryker\Glue\MerchantsRestApi\Plugin\GlueApplication |

<details><summary>src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Glue\GlueApplication;

use Spryker\Glue\GlueApplication\GlueApplicationDependencyProvider as SprykerGlueApplicationDependencyProvider;
use Spryker\Glue\MerchantsRestApi\Plugin\GlueApplication\MerchantByMerchantReferenceResourceRelationshipPlugin;
use Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRelationshipCollectionInterface;
use Spryker\Glue\WishlistsRestApi\WishlistsRestApiConfig;

class GlueApplicationDependencyProvider extends SprykerGlueApplicationDependencyProvider
{
    /**
     * @param \Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRelationshipCollectionInterface $resourceRelationshipCollection
     *
     * @return \Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRelationshipCollectionInterface
     */
    protected function getResourceRelationshipPlugins(
        ResourceRelationshipCollectionInterface $resourceRelationshipCollection
    ): ResourceRelationshipCollectionInterface {
        $resourceRelationshipCollection->addRelationship(
            WishlistsRestApiConfig::RESOURCE_WISHLIST_ITEMS,
            new MerchantByMerchantReferenceResourceRelationshipPlugin()
        );

        return $resourceRelationshipCollection;
    }
}
```

</details>

<details><summary>src/Pyz/Zed/Wishlist/WishlistDependencyProvider.php</summary>

```php
<?php
namespace Pyz\Zed\Wishlist;

use Spryker\Zed\MerchantProductOfferWishlist\Communication\Plugin\Wishlist\MerchantProductOfferAddItemPreCheckPlugin;
use Spryker\Zed\Wishlist\WishlistDependencyProvider as SprykerWishlistDependencyProvider;

class WishlistDependencyProvider extends SprykerWishlistDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\WishlistExtension\Dependency\Plugin\AddItemPreCheckPluginInterface>
     */
    protected function getAddItemPreCheckPlugins(): array
    {
        return [
            new MerchantProductOfferAddItemPreCheckPlugin(),
        ];
    }

}
```

</details>

<details><summary>src/Pyz/Glue/WishlistsRestApi/WishlistsRestApiDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Glue\WishlistsRestApi;

use Spryker\Glue\MerchantProductOfferWishlistRestApi\Plugin\Wishlist\ProductOfferRestWishlistItemsAttributesMapperPlugin;
use Spryker\Glue\WishlistsRestApi\WishlistsRestApiDependencyProvider as SprykerWishlistsRestApiDependencyProvider;

class WishlistsRestApiDependencyProvider extends SprykerWishlistsRestApiDependencyProvider
{
    /**
     * @return array<\Spryker\Glue\WishlistsRestApiExtension\Dependency\Plugin\RestWishlistItemsAttributesMapperPluginInterface>
     */
    protected function getRestWishlistItemsAttributesMapperPlugins(): array
    {
        return [
            new ProductOfferRestWishlistItemsAttributesMapperPlugin(),
        ];
    }
}
```

</details>

<details><summary>src/Pyz/Zed/WishlistsRestApi/WishlistsRestApiDependencyProvider.php</summary>

```php
<?php
namespace Pyz\Zed\WishlistsRestApi;

use Spryker\Zed\MerchantProductOfferWishlistRestApi\Communication\Plugin\EmptyProductOfferRestWishlistItemsAttributesDeleteStrategyPlugin;
use Spryker\Zed\MerchantProductOfferWishlistRestApi\Communication\Plugin\ProductOfferRestWishlistItemsAttributesDeleteStrategyPlugin;
use Spryker\Zed\WishlistsRestApi\WishlistsRestApiDependencyProvider as SprykerWishlistsRestApiDependencyProvider;

class WishlistsRestApiDependencyProvider extends SprykerWishlistsRestApiDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\WishlistsRestApiExtension\Dependency\Plugin\RestWishlistItemsAttributesDeleteStrategyPluginInterface>
     */
    protected function getRestWishlistItemsAttributesDeleteStrategyPlugins(): array
    {
        return [
            new ProductOfferRestWishlistItemsAttributesDeleteStrategyPlugin(),
            new EmptyProductOfferRestWishlistItemsAttributesDeleteStrategyPlugin(),
        ];
    }
}
```

</details>

{% info_block warningBox "Verification" %}

Make sure that `ProductOfferRestWishlistItemsAttributesMapperPlugin` is set up by sending the request `GET https://glue.mysprykershop.com/wishlists/{% raw %}{{wishlistId}}{% endraw %}?include=wishlist-items`. You should get `attributes` in the response.

Make sure that `MerchantProductOfferAddItemPreCheckPlugin` is set up by sending the request `POST https://glue.mysprykershop.com/wishlists/{% raw %}{{wishlistId}}{% endraw %}/wishlist-items`. You should have the wishlist item added only when the product has the specified offer reference.

Make sure that `ProductOfferRestWishlistItemsAttributesDeleteStrategyPlugin` and `EmptyProductOfferRestWishlistItemsAttributesDeleteStrategyPlugin` are set up by sending the request `DELETE https://glue.mysprykershop.com/wishlists/{% raw %}{{wishlistId}}{% endraw %}/wishlist-items/{% raw %}{{wishlistItemId}}{% endraw %}`. You should get the product offer wishlist item deleted.

{% endinfo_block %}
