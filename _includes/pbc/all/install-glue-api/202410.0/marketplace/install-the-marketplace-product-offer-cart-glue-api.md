This document describes how to integrate the Marketplace Product Offer + Cart Glue API feature into a Spryker project.

## Install feature core

Follow the steps below to install the Marketplace Product Offer + Cart Glue API feature core.

### Prerequisites

Install the required features:

| NAME                  | VERSION | INSTALLATION GUIDE |
| --------------------- | ------- | ------------------|
| Cart API                         | {{page.version}}  | [Install the Cart Glue API](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/install-and-upgrade/install-glue-api/install-the-cart-glue-api.html) |
| Marketplace Product Offer API    | {{page.version}}  | [Install the Marketplace Product Offer Glue API](/docs/pbc/all/offer-management/{{page.version}}/marketplace/install-and-upgrade/install-glue-api/install-the-marketplace-product-offer-glue-api.html) |
| Marketplace Inventory Management | {{page.version}}  | [Install the Marketplace Inventory Management feature](/docs/pbc/all/warehouse-management-system/{{page.version}}/marketplace/install-features/install-the-marketplace-inventory-management-feature.html) |

### 1) Set up behavior

Enable the following behaviors by registering the plugins:

| PLUGIN   | SPECIFICATION | NAMESPACE |
| - | - | - |
| MerchantProductOfferCartItemMapperPlugin | Maps the merchant product offer reference and merchant reference, coming from the Glue add to cart request, to persistent cart-specific transfer. |  Spryker\Zed\MerchantProductOffersRestApi\Communication\Plugin\CartsRestApi |
| MerchantProductOfferCartItemExpanderPlugin | Expands the merchant product offer information with a merchant reference. | Spryker\Glue\MerchantProductOffersRestApi\Plugin\CartsRestApi |
| MerchantProductOfferRestCartItemsAttributesMapperPlugin | Maps merchant product offer reference and merchant reference to items attributes. | Spryker\Glue\MerchantProductOffersRestApi\Plugin\CartsRestApi |

**src/Pyz/Glue/CartsRestApi/CartsRestApiDependencyProvider.php**

```php
<?php

namespace Pyz\Glue\CartsRestApi;

use Spryker\Glue\CartsRestApi\CartsRestApiDependencyProvider as SprykerCartsRestApiDependencyProvider;
use Spryker\Glue\MerchantProductOffersRestApi\Plugin\CartsRestApi\MerchantProductOfferCartItemExpanderPlugin;
use Spryker\Glue\MerchantProductOffersRestApi\Plugin\CartsRestApi\MerchantProductOfferRestCartItemsAttributesMapperPlugin;

class CartsRestApiDependencyProvider extends SprykerCartsRestApiDependencyProvider
{
    /**
     * @return array<\Spryker\Glue\CartsRestApiExtension\Dependency\Plugin\RestCartItemsAttributesMapperPluginInterface>
     */
    protected function getRestCartItemsAttributesMapperPlugins(): array
    {
        return [
            new MerchantProductOfferRestCartItemsAttributesMapperPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Glue\CartsRestApiExtension\Dependency\Plugin\CartItemExpanderPluginInterface>
     */
    protected function getCartItemExpanderPlugins(): array
    {
        return [
            new MerchantProductOfferCartItemExpanderPlugin(),
        ];
    }
}
```

**src/Pyz/Zed/CartsRestApi/CartsRestApiDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\CartsRestApi;

use Spryker\Zed\CartsRestApi\CartsRestApiDependencyProvider as SprykerCartsRestApiDependencyProvider;
use Spryker\Zed\MerchantProductOffersRestApi\Communication\Plugin\CartsRestApi\MerchantProductOfferCartItemMapperPlugin;

class CartsRestApiDependencyProvider extends SprykerCartsRestApiDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\CartsRestApiExtension\Dependency\Plugin\CartItemMapperPluginInterface>
     */
    protected function getCartItemMapperPlugins(): array
    {
        return [
            new MerchantProductOfferCartItemMapperPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that `MerchantProductOfferCartItemExpanderPlugin` and `MerchantProductOfferCartItemMapperPlugin` are set up by sending the request `POST https://glue.mysprykershop.com/carts/{% raw %}{{cartUuid}}{% endraw %}/items` with the following body and make sure the product has been added to the cart with the offer:

```json
{
    "data": {
        "type": "items",
        "attributes": {
            "sku": "091_25873091",
            "quantity": "1",
            "productOfferReference": "offer3"
        }
    }
}
```

Make sure that `MerchantProductOfferRestCartItemsAttributesMapperPlugin` is set up by sending the request `GET https://glue.mysprykershop.com/carts/{% raw %}{{cartUuid}}{% endraw %}?include=items` to the cart that has an item with a product offer. You should be able to see `productOfferReference` and `merchantReference` attributes among the attributes of the items resource.

{% endinfo_block %}
