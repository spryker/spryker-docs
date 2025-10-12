

This document describes how to integrate the Marketplace Product + Cart Glue API feature into a Spryker project.

## Install feature core

Follow the steps below to install the Marketplace Product Offer + Cart Glue API feature core.

### Prerequisites

Install the required features:

| NAME        | VERSION | INSTALLATION GUIDE |
| ----------- | ------- | ------------------|
| Cart API | 202507.0 | [Install the Cart Glue API](/docs/pbc/all/cart-and-checkout/latest/base-shop/install-and-upgrade/install-glue-api/install-the-cart-glue-api.html) |
| Marketplace Product API | 202507.0 | [Install the Marketplace Product Glue API](/docs/pbc/all/product-information-management/latest/marketplace/install-and-upgrade/install-glue-api/install-the-marketplace-product-glue-api.html) |


### 1) Set up behavior

Enable the following behaviors by registering the plugins:

| PLUGIN | DESCRIPTION | PREREQUISITES | NAMESPACE |
|-|-|-|-|
| MerchantProductCartItemExpanderPlugin | Expands view data for abstract product with merchant data. |  | Spryker\Glue\MerchantProductsRestApi\Plugin\CartsRestApi |

**src/Pyz/Glue/CartsRestApi/CartsRestApiDependencyProvider.php**

```php
<?php

namespace Pyz\Glue\CartsRestApi;

use Spryker\Glue\CartsRestApi\CartsRestApiDependencyProvider as SprykerCartsRestApiDependencyProvider;
use Spryker\Glue\MerchantProductsRestApi\Plugin\CartsRestApi\MerchantProductCartItemExpanderPlugin;

class CartsRestApiDependencyProvider extends SprykerCartsRestApiDependencyProvider
{
    /**
     * @return array<\Spryker\Glue\CartsRestApiExtension\Dependency\Plugin\CartItemExpanderPluginInterface>
     */
    protected function getCartItemExpanderPlugins(): array
    {
        return [
            new MerchantProductCartItemExpanderPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that you can add a merchant product to the cart using a `POST` request to `http://glue.de.demo-spryker.com/guest-cart-items or http://glue.de.demo-spryker.com/carts/{% raw %}{{idCart}}{% endraw %}/items`.

Make sure that when you do a `GET` request for the carts with marketplace products, their merchants are returned as well. `http://glue.de.demo-spryker.com/guest-carts/{idCart}?include=guest-cart-items,merchants` or `http://glue.de.demo-spryker.com/carts/{% raw %}{{idCart}}{% endraw %}?include=items,merchants`.

{% endinfo_block %}
