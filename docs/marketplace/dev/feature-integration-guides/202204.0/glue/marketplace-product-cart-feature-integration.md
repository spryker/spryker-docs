---
title: "Glue API: Marketplace Product + Cart feature integration"
description: This integration guide provides steps on how to integrate the Marketplace Product + Cart Glue API feature into a Spryker project.
template: feature-integration-guide-template
---

This document describes how to integrate the Marketplace Product + Cart Glue API feature into a Spryker project.

## Install feature core

Follow the steps below to install the Marketplace Product Offer + Cart Glue API feature core.

### Prerequisites

To start feature integration, integrate the required features:

| NAME        | VERSION | INTEGRATION GUIDE |
| ----------- | ------- | ------------------|
| Cart API | {{page.version}} | [Glue API: Cart feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/glue-api/glue-api-cart-feature-integration.html) |
| Marketplace Product API | {{page.version}} | [Glue API: Marketplace Product feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/glue/marketplace-product-feature-integration.html) |


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
     * @return \Spryker\Glue\CartsRestApiExtension\Dependency\Plugin\CartItemExpanderPluginInterface[]
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
