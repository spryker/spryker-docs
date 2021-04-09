---
title: Glue - Marketplace Product Offer + Cart feature integration
last_updated: Dec 17, 2020
summary: This integration guide provides steps on how to integrate the Glue Product Offer + Cart Glue API feature into a Spryker project.
---

## Install feature core
Follow the steps below to install the Merchant Portal - Product Offer feature core.

### Prerequisites

To start feature integration, overview and install the necessary features:

| Name                     | Version |
| ----------------------------- | -------- |
| Cart API                         | dev-master  |
| Marketplace Product Offer API    | dev-master  |
| Marketplace Inventory Management | dev-master  |

## 1) Set up behavior

### Enable adding Merchant Product Offer to cart

Activate the following plugins:

| Plugin   | Specification | Prerequisites |Namespace   |
| -------------------- | ------------------- | --------------- | ------------------ |
| MerchantProductOfferCartItemMapperPlugin                | Maps merchant product offer reference and merchant reference, coming from Glue add to cart request, to persistent cart-specific transfer. | None              | Spryker\Zed\MerchantProductOffersRestApi\Communication\Plugin\CartsRestApi |
| MerchantProductOfferCartItemExpanderPlugin              | Expands the merchant product offer information with a merchant reference. | None              | Spryker\Glue\MerchantProductOffersRestApi\Plugin\CartsRestApi |
| MerchantProductOfferRestCartItemsAttributesMapperPlugin | Maps merchant product offer reference and merchant reference to items attributes. | None              | Spryker\Glue\MerchantProductOffersRestApi\Plugin\CartsRestApi |

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
     * @return \Spryker\Glue\CartsRestApiExtension\Dependency\Plugin\RestCartItemsAttributesMapperPluginInterface[]
     */
    protected function getRestCartItemsAttributesMapperPlugins(): array
    {
        return [
            new MerchantProductOfferRestCartItemsAttributesMapperPlugin(),
        ];
    }

    /**
     * @return \Spryker\Glue\CartsRestApiExtension\Dependency\Plugin\CartItemExpanderPluginInterface[]
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
     * @return \Spryker\Zed\CartsRestApiExtension\Dependency\Plugin\CartItemMapperPluginInterface[]
     */
    protected function getCartItemMapperPlugins(): array
    {
        return [
            new MerchantProductOfferCartItemMapperPlugin(),
        ];
    }
}
```

---
**Verification**

Make sure that the `MerchantProductOfferCartItemExpanderPlugin` and `MerchantProductOfferCartItemMapperPlugin` plugins are set up by sending the request `POST https://glue.mysprykershop.com/carts/{{cartUuid}}/items` with the following body and make sure the product has been added to the cart with the offer.

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

Make sure that the `MerchantProductOfferRestCartItemsAttributesMapperPlugin` plugin is set up by sending the request `GET https://glue.mysprykershop.com/carts/{{cartUuid}}?include=items` to the cart that has an item with product offer. You should be able to see attributes `productOfferReference` and `merchantReference` among the attributes of the items resource.

---
