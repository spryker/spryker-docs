

Follow the steps below to integrate the Glue API: Product Bundle + Cart feature.

## Prerequisites

To start the feature integration, overview and install the necessary features:


| NAME | VERSION | INSTALLATION GUIDE |
| --- | --- | --- |
| Spryker Core | 202507.0 | [Install the Spryker Core Glue API](/docs/pbc/all/miscellaneous/latest/install-and-upgrade/install-glue-api/install-the-spryker-core-glue-api.html) |
| Product Bundles | 202507.0 | [Install the Product Bundles feature](/docs/pbc/all/product-information-management/latest/base-shop/install-and-upgrade/install-features/install-the-product-bundles-feature.html)|
| Cart | 202507.0 | [Install the Cart Glue API](/docs/pbc/all/cart-and-checkout/latest/base-shop/install-and-upgrade/install-glue-api/install-the-cart-glue-api.html)|

## 1) Install the required modules

Install the required modules using Composer:

```bash
composer require spryker/product-bundle-carts-rest-api:"^1.0.0" --update-with-dependencies
```


{% info_block warningBox "Verification" %}

Ensure that the following module has been installed:

| Module | Expected Directory |
| --- | --- |
| ProductBundleCartsRestApi | vendor/spryker/product-bundle-carts-rest-api |

{% endinfo_block %}

## 2) Set up transfer objects

```bash
console transfer:generate
```

{% info_block warningBox "Verification" %}

Ensure that the following changes have been applied in the transfer objects:

| Transfer | Type | Event | Path |
| --- | --- | --- | --- |
| RestErrorMessageTransfer | class | created | src/Generated/Shared/Transfer/RestErrorMessageTransfer |
| ItemTransfer| class |created| src/Generated/Shared/Transfer/ItemTransfer|
| RestCalculatedDiscountTransfer |class| created |src/Generated/Shared/Transfer/RestCalculatedDiscountTransfer|
| ProductBundleStorageCriteriaTransfer |class |created |src/Generated/Shared/Transfer/ProductBundleStorageCriteriaTransfer|
| RestItemsAttributesTransfer| class| created |src/Generated/Shared/Transfer/RestItemsAttributesTransfer|
| RestCartItemCalculationsTransfer |class| created |src/Generated/Shared/Transfer/RestCartItemCalculationsTransfer|
| QuoteTransfer |class |created |src/Generated/Shared/Transfer/QuoteTransfer|
| CartItemRequestTransfer| class| created |src/Generated/Shared/Transfer/CartItemRequestTransfer|

{% endinfo_block %}

## 3) Set up behavior

Activate the following plugins:

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| ProductBundleCartItemFilterPlugin | Filters bundle items off the list of simple cart items. | None | Spryker\Glue\ProductBundleCartsRestApi\Plugin\CartsRestApi |
| BundleItemByQuoteResourceRelationshipPlugin |Adds the `bundle-items` resource as a relationship by `QuoteTransfer` provided as a payload. |None |Spryker\Glue\ProductBundleCartsRestApi\Plugin\GlueApplication|
| BundledItemByQuoteResourceRelationshipPlugin| Adds the `bundled-items` resource as a relationship to the `bundle-items` resource. Uses the`QuoteTransfer` payload of the `bundle-items` resource. |None |Spryker\Glue\ProductBundleCartsRestApi\Plugin\GlueApplication|
| GuestBundleItemByQuoteResourceRelationshipPlugin |Adds the `bundle-items` resource as a relationship if `QuoteTransfer` is provided as a payload. It should be used for the `guest-carts` parent resource. |None |Spryker\Glue\ProductBundleCartsRestApi\Plugin\GlueApplication|
| BundleItemQuoteItemReadValidatorPlugin |Checks if `CartItemRequestTransfer` is a bundle item in `QuoteTransfer` before performing update or delete operations on it. |None |Spryker\Zed\ProductBundleCartsRestApi\Communication\Plugin|


<details><summary>src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Glue\GlueApplication;

use Spryker\Glue\CartsRestApi\CartsRestApiConfig;
use Spryker\Glue\CartsRestApi\Plugin\GlueApplication\GuestCartItemsByQuoteResourceRelationshipPlugin;
use Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRelationshipCollectionInterface;
use Spryker\Glue\ProductBundleCartsRestApi\Plugin\GlueApplication\BundleItemByQuoteResourceRelationshipPlugin;
use Spryker\Glue\ProductBundleCartsRestApi\Plugin\GlueApplication\BundledItemByQuoteResourceRelationshipPlugin;
use Spryker\Glue\ProductBundleCartsRestApi\Plugin\GlueApplication\GuestBundleItemByQuoteResourceRelationshipPlugin;
use Spryker\Glue\ProductBundleCartsRestApi\ProductBundleCartsRestApiConfig;
use Spryker\Glue\GlueApplication\GlueApplicationDependencyProvider as SprykerGlueApplicationDependencyProvider;
use Spryker\Glue\ProductsRestApi\Plugin\GlueApplication\ConcreteProductBySkuResourceRelationshipPlugin;

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
            CartsRestApiConfig::RESOURCE_CARTS,
            new BundleItemByQuoteResourceRelationshipPlugin()
        );
        $resourceRelationshipCollection->addRelationship(
            CartsRestApiConfig::RESOURCE_GUEST_CARTS,
            new GuestBundleItemByQuoteResourceRelationshipPlugin()
        );
        $resourceRelationshipCollection->addRelationship(
            ProductBundleCartsRestApiConfig::RESOURCE_BUNDLE_ITEMS,
            new BundledItemByQuoteResourceRelationshipPlugin()
        );
        $resourceRelationshipCollection->addRelationship(
            ProductBundleCartsRestApiConfig::RESOURCE_BUNDLE_ITEMS,
            new ConcreteProductBySkuResourceRelationshipPlugin()
        );
        $resourceRelationshipCollection->addRelationship(
            ProductBundleCartsRestApiConfig::RESOURCE_BUNDLED_ITEMS,
            new ConcreteProductBySkuResourceRelationshipPlugin()
        );
        $resourceRelationshipCollection->addRelationship(
            CartsRestApiConfig::RESOURCE_GUEST_CARTS,
            new GuestCartItemsByQuoteResourceRelationshipPlugin()
        );

        return $resourceRelationshipCollection;
    }
}
```

</details>


{% info_block warningBox "Verification" %}

Ensure that you have activated the plugins:

| REQUEST | TEST |
| --- | --- |
| `GET https://glue.mysprykershop.com/carts/{% raw %}{{{% endraw %}uuid{% raw %}}}{% endraw %}?include=bundle-items`<br> `GET https://glue.mysprykershop.com/guest-carts/{% raw %}{{{% endraw %}uuid{% raw %}}}{% endraw %}?include=bundle-items` | The `bundle-items` resource is returned as a relationship. |
| `GET https://glue.mysprykershop.com/carts/{% raw %}{{{% endraw %}uuid{% raw %}}}{% endraw %}?include=bundle-items,bundled-items` <br> `GET https://glue.mysprykershop.com/guest-carts/{% raw %}{{{% endraw %}uuid{% raw %}}}{% endraw %}?include=bundle-items,bundled-items`| The `bundle-items` resource has a relationship of the `bundled-items` resource.|
| `GET https://glue.mysprykershop.com/carts/{% raw %}{{{% endraw %}uuid{% raw %}}}{% endraw %}?include=bundle-items,bundled-items,concrete-products`<br> `GET https://glue.mysprykershop.com/guest-carts/{% raw %}{{{% endraw %}uuid{% raw %}}}{% endraw %}?include=bundle-items,bundled-items,concrete-products` |Concrete products are returned as relationships for bundle items and bundled items.|

{% endinfo_block %}

**src/Pyz/Glue/CartsRestApi/CartsRestApiDependencyProvider.php**

```php
<?php

namespace Pyz\Glue\CartsRestApi;

use Spryker\Glue\CartsRestApi\CartsRestApiDependencyProvider as SprykerCartsRestApiDependencyProvider;
use Spryker\Glue\ProductBundleCartsRestApi\Plugin\CartsRestApi\ProductBundleCartItemFilterPlugin;

class CartsRestApiDependencyProvider extends SprykerCartsRestApiDependencyProvider
{
    /**
     * @return \Spryker\Glue\CartsRestApiExtension\Dependency\Plugin\CartItemFilterPluginInterface[]
     */
    protected function getCartItemFilterPlugins(): array
    {
        return [
            new ProductBundleCartItemFilterPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Ensure that you have activated the plugins:

1. Add one or more bundle items to cart.

2. Send the request: `GET https://glue.mysprykershop.com/carts/:uuid?include=items`.

3. Check that the items of the bundle are *not* displayed as an `items` relationship.

{% endinfo_block %}

**src/Pyz/Zed/CartsRestApi/CartsRestApiDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\CartsRestApi;

use Spryker\Zed\CartsRestApi\CartsRestApiDependencyProvider as SprykerCartsRestApiDependencyProvider;
use Spryker\Glue\ProductBundleCartsRestApi\Plugin\CartsRestApi\ProductBundleCartItemFilterPlugin;

class CartsRestApiDependencyProvider extends SprykerCartsRestApiDependencyProvider
{
    /**
     * @return \Spryker\Zed\CartsRestApiExtension\Dependency\Plugin\QuoteItemReadValidatorPluginInterface[]
     */
    protected function getQuoteItemReadValidatorPlugins(): array
    {
        return [
            new BundleItemQuoteItemReadValidatorPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Ensure that you can:

- Edit bundle item quantity: `PATCH https://glue.mysprykershop.com/carts/{% raw %}{{{% endraw %}uuid{% raw %}}}{% endraw %}/items/{% raw %}{{{% endraw %}bundleItemGroupKey{% raw %}}}{% endraw %}`.
- Delete a bundle from cart: `DELETE https://glue.mysprykershop.com/carts/{% raw %}{{{% endraw %}uuid{% raw %}}}{% endraw %}/items/{% raw %}{{{% endraw %}bundleItemGroupKey{% raw %}}}{% endraw %}`.

{% endinfo_block %}

## Install related features

Integrate the following related features:

| FEATURE | REQUIRED FOR THE CURRENT FEATURE | INSTALLATION GUIDE |
| --- | --- | --- |
| Products | ✓ | [Install the Product Glue API](/docs/pbc/all/product-information-management/latest/base-shop/install-and-upgrade/install-glue-api/install-the-product-glue-api.html) |
| Product Bundles |✓ |[Install the Product Bundles Glue API](/docs/pbc/all/product-information-management/latest/base-shop/install-and-upgrade/install-glue-api/install-the-product-bundles-glue-api.html)|
