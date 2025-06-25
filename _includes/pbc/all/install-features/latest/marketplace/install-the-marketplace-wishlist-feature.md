This document describes how to install the Marketplace Wishlist feature.


## Install feature core

Follow the steps below to install the Marketplace Wishlist feature core.

### Prerequisites

Install the required features:

| NAME | VERSION | INSTALLATION GUIDE |
| --------------- | ------- | ---------- |
| Spryker Core         | {{page.version}}      | [Install the Spryker Core feature](/docs/pbc/all/miscellaneous/latest/install-and-upgrade/install-features/install-the-spryker-core-feature.html) |
| Marketplace Merchant | {{page.version}}      | [Install the Marketplace Merchant feature](/docs/pbc/all/merchant-management/latest/marketplace/install-and-upgrade/install-features/install-the-marketplace-merchant-feature.html) |
| Marketplace Product + Marketplace Product Offer | {{page.version}} | [Install the Marketplace Product + Marketplace Product Offer feature](/docs/pbc/all/product-information-management/latest/marketplace/install-and-upgrade/install-features/install-the-marketplace-product-marketplace-product-offer-feature.html) |


### 1) Install the required modules

Install the required modules using Composer:

```bash
composer require spryker-feature/marketplace-wishlist:"{{page.version}}" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure the following modules have been installed:

| MODULE | EXPECTED DIRECTORY |
|-|-|
| MerchantProductOfferWishlist | vendor/spryker/merchant-product-offer-wishlist |
| MerchantProductWishlist | vendor/spryker/merchant-product-wishlist |

{% endinfo_block %}


### 2) Set up database schema and transfer objects

Generate transfer changes:

```bash
console transfer:generate
console propel:install
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure that the following changes have been applied by checking your database:

| DATABASE ENTITY |	TYPE |	EVENT |
|-|-|-|
| spy_wishlist_item.merchant_reference | column |	created |
| spy_wishlist_item.product_offer_reference | column |	created |

Make sure  the following changes have been applied in transfer objects:

| TRANSFER | TYPE | EVENT | PATH |
|-|-|-|-|
| WishlistItem.productOfferReference | property | Created | src/Generated/Shared/Transfer/WishlistItemTransfer |
| WishlistItem.merchantReference | property | Created | src/Generated/Shared/Transfer/WishlistItemTransfer |
| WishlistMoveToCartRequest.productOfferReference | property | Created | src/Generated/Shared/Transfer/WishlistMoveToCartRequestTransfer |
| WishlistMoveToCartRequest.merchantReference | property | Created | src/Generated/Shared/Transfer/WishlistMoveToCartRequestTransfer |
| WishlistItemCriteria.productOfferReference | property | Created | src/Generated/Shared/Transfer/WishlistItemCriteriaTransfer |
| WishlistItemCriteria.merchantReference | property | Created | src/Generated/Shared/Transfer/WishlistItemCriteriaTransfer |

{% endinfo_block %}


### 3) Set up behavior

Enable the following behaviors by registering the plugins:

| PLUGIN | DESCRIPTION | PREREQUISITES | NAMESPACE |
|---|---|---|---|
| WishlistProductOfferPostMoveToCartCollectionExpanderPlugin | Expands `WishlistMoveToCartRequestCollection` transfer object with not valid product offers as request items. | None | Spryker\Client\WishlistExtension\Dependency\Plugin |
| WishlistMerchantProductPostMoveToCartCollectionExpanderPlugin | Expands `WishlistMoveToCartRequestCollection` transfer object with not valid marketplace products as request items. | None | Spryker\Client\WishlistExtension\Dependency\Plugin |
| WishlistProductOfferCollectionToRemoveExpanderPlugin | Expands `WishlistItemCollectionTransfer` transfer object with product offer reference. | None | Spryker\Client\WishlistExtension\Dependency\Plugin |
| WishlistMerchantProductCollectionToRemoveExpanderPlugin | Expands `WishlistItemCollection` transfer object with merchant product wishlist items from the `WishlistMoveToCartRequestCollection` transfer object. | None | Spryker\Client\WishlistExtension\Dependency\Plugin |
| MerchantProductWishlistItemRequestExpanderPlugin | Expands `WishlistItem` transfer by provided merchant_reference in params. | None | SprykerShop\Yves\MerchantProductWidget\Plugin\WishlistPage |
| MerchantProductOfferWishlistItemRequestExpanderPlugin | Expands `WishlistItem` transfer by provided `product_offer_reference` in params. | None | SprykerShop\Yves\MerchantProductOfferWidget\Plugin\WishlistPage |
| MerchantProductWishlistItemMetaFormExpanderPlugin | Expands `WishlistItemMetaFormType` with hidden field for 'merchant_reference'. | None | SprykerShop\Yves\MerchantProductWidget\Plugin\WishlistPage |
| MerchantProductOfferWishlistItemMetaFormExpanderPlugin | Expands `WishlistItemMetaFormType` with hidden fields for `merchant_reference` and `product_offer_reference`. | None | SprykerShop\Yves\MerchantProductOfferWidget\Plugin\WishlistPage |
| WishlistMerchantProductPreAddItemPlugin | Expands `WishlistItemMetaFormType` with hidden fields for `merchant_reference` and `product_offer_reference`. | None | Spryker\Zed\MerchantProductWishlist\Communication\Plugin\Wishlist |
| WishlistProductOfferPreAddItemPlugin | Expands `WishlistItemMetaFormType` with hidden fields for `merchant_reference` and `product_offer_reference`. | None | Spryker\Zed\MerchantProductOfferWishlist\Communication\Plugin\Wishlist |


**src/Pyz/Client/Wishlist/WishlistDependencyProvider.php**

```php
<?php

namespace Pyz\Client\Wishlist;

use Spryker\Client\MerchantProductOfferWishlist\Plugin\Wishlist\WishlistProductOfferCollectionToRemoveExpanderPlugin;
use Spryker\Client\MerchantProductOfferWishlist\Plugin\Wishlist\WishlistProductOfferPostMoveToCartCollectionExpanderPlugin;
use Spryker\Client\MerchantProductWishlist\Plugin\Wishlist\WishlistMerchantProductCollectionToRemoveExpanderPlugin;
use Spryker\Client\MerchantProductWishlist\Plugin\Wishlist\WishlistMerchantProductPostMoveToCartCollectionExpanderPlugin;
use Spryker\Client\Wishlist\WishlistDependencyProvider as SprykerWishlistDependencyProvider;

class WishlistDependencyProvider extends SprykerWishlistDependencyProvider
{
    /**
     * @return array<\Spryker\Client\WishlistExtension\Dependency\Plugin\WishlistPostMoveToCartCollectionExpanderPluginInterface>
     */
    protected function getWishlistPostMoveToCartCollectionExpanderPlugins(): array
    {
        return [
            new WishlistProductOfferPostMoveToCartCollectionExpanderPlugin(),
            new WishlistMerchantProductPostMoveToCartCollectionExpanderPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Client\WishlistExtension\Dependency\Plugin\WishlistCollectionToRemoveExpanderPluginInterface>
     */
    protected function getWishlistCollectionToRemoveExpanderPlugins(): array
    {
        return [
            new WishlistProductOfferCollectionToRemoveExpanderPlugin(),
            new WishlistMerchantProductCollectionToRemoveExpanderPlugin(),
        ];
    }
}
```

**src/Pyz/Yves/WishlistPage/WishlistPageDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\WishlistPage;

use SprykerShop\Yves\MerchantProductOfferWidget\Plugin\WishlistPage\MerchantProductOfferWishlistItemMetaFormExpanderPlugin;
use SprykerShop\Yves\MerchantProductOfferWidget\Plugin\WishlistPage\MerchantProductOfferWishlistItemRequestExpanderPlugin;
use SprykerShop\Yves\MerchantProductWidget\Plugin\WishlistPage\MerchantProductWishlistItemMetaFormExpanderPlugin;
use SprykerShop\Yves\MerchantProductWidget\Plugin\WishlistPage\MerchantProductWishlistItemRequestExpanderPlugin;
use SprykerShop\Yves\WishlistPage\WishlistPageDependencyProvider as SprykerWishlistPageDependencyProvider;

class WishlistPageDependencyProvider extends SprykerWishlistPageDependencyProvider
{
    /**
     * @return array<\SprykerShop\Yves\WishlistPageExtension\Dependency\Plugin\WishlistItemRequestExpanderPluginInterface>
     */
    protected function getWishlistItemRequestExpanderPlugins(): array
    {
        return [
            new MerchantProductWishlistItemRequestExpanderPlugin(),
            new MerchantProductOfferWishlistItemRequestExpanderPlugin(),
        ];
    }

    /**
     * @return array<\SprykerShop\Yves\WishlistPageExtension\Dependency\Plugin\WishlistItemMetaFormExpanderPluginInterface>
     */
    protected function getWishlistItemMetaFormExpanderPlugins(): array
    {
        return [
            new MerchantProductWishlistItemMetaFormExpanderPlugin(),
            new MerchantProductOfferWishlistItemMetaFormExpanderPlugin(),
        ];
    }
}
```

**src/Pyz/Zed/Wishlist/WishlistDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Wishlist;

use Spryker\Zed\MerchantProductOfferWishlist\Communication\Plugin\Wishlist\WishlistProductOfferPreAddItemPlugin;
use Spryker\Zed\MerchantProductWishlist\Communication\Plugin\Wishlist\WishlistMerchantProductPreAddItemPlugin;
use Spryker\Zed\Wishlist\WishlistDependencyProvider as SprykerWishlistDependencyProvider;

class WishlistDependencyProvider extends SprykerWishlistDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\WishlistExtension\Dependency\Plugin\WishlistPreAddItemPluginInterface>
     */
    protected function getWishlistPreAddItemPlugins(): array
    {
        return [
            new WishlistMerchantProductPreAddItemPlugin(),
            new WishlistProductOfferPreAddItemPlugin(),
        ];
    }
}
```


{% info_block warningBox "Verification" %}

- Make sure that you can add a product offer to a wishlist and see the product offer data in there.
- Make sure that you can see the merchant information when the merchant product is added to the wishlist.
- Make sure that you can move the wishlist with the product offers to a shopping cart and vice versa.

{% endinfo_block %}
