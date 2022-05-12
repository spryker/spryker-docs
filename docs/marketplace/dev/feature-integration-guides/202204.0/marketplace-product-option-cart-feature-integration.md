---
title: Marketplace Product Option + Cart feature integration
last_updated: Jul 28, 2021
Description: This document describes the process how to integrate the Marketplace Product Option feature into a Spryker project.
template: feature-integration-guide-template
---

This document describes how to integrate the Marketplace Product Option + Cart feature into a Spryker project.


## Install feature core

Follow the steps below to install the Marketplace Product Option + Cart feature core.

### Prerequisites

To start feature integration, integrate the required features:

| NAME | VERSION | INTEGRATION GUIDE |
| --------------- | ------- | ---------- |
| Marketplace Product Option | {{page.version}}      | [Marketplace Product Option Feature Integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/marketplace-product-option-feature-integration.html) |
| Cart | {{page.version}}   | [Cart feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/cart-feature-integration.html)

### 1) Set up behavior

Enable the following behaviors by registering the plugins:

| PLUGIN | DESCRIPTION | PREREQUISITES | NAMESPACE |
|-|-|-|-|
| MerchantProductOptionCartPreCheckPlugin | Checks the approval status for the merchant product options. | None | Spryker\Zed\MerchantProductOption\Communication\Plugin\Cart |


**src/Pyz/Zed/Cart/CartDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Cart;

use Spryker\Zed\MerchantProductOption\Communication\Plugin\Cart\MerchantProductOptionCartPreCheckPlugin;
use Spryker\Zed\Cart\CartDependencyProvider as SprykerCartDependencyProvider;

class CartDependencyProvider extends SprykerCartDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\CartExtension\Dependency\Plugin\CartPreCheckPluginInterface[]
     */
    protected function getCartPreCheckPlugins(Container $container): array
    {
        return [
            new MerchantProductOptionCartPreCheckPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that validation works correctly with merchants product options in the cart and displays an error in case if any is not approved.

{% endinfo_block %}
