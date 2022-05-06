---
title: Marketplace Product Option + Checkout feature integration
last_updated: Jul 28, 2021
Description: This document describes the process how to integrate the Marketplace Product Option feature into a Spryker project.
template: feature-integration-guide-template
---

This document describes how to integrate the Marketplace Product Option + Checkout feature into a Spryker project.


## Install feature core

Follow the steps below to install the Marketplace Product Option + Checkout feature core.

### Prerequisites

To start feature integration, integrate the required features:

| NAME | VERSION | INTEGRATION GUIDE |
| --------------- | ------- | ---------- |
| Marketplace Product Option | {{page.version}}      | [Marketplace Product Option Feature Integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/marketplace-product-option-feature-integration.html) |
| Checkout | {{page.version}} | [Checkout feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/checkout-feature-integration.html) |

### 1) Set up behavior

Enable the following behaviors by registering the plugins:

| PLUGIN | DESCRIPTION | PREREQUISITES | NAMESPACE |
|-|-|-|-|
| MerchantProductOptionCheckoutPreConditionPlugin | Checks the approval status for merchant product option groups. | None | Spryker\Zed\MerchantProductOption\Communication\Plugin\Checkout |


**src/Pyz/Zed/Checkout/CheckoutDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Checkout;

use Spryker\Zed\MerchantProductOption\Communication\Plugin\Checkout\MerchantProductOptionCheckoutPreConditionPlugin;
use Spryker\Zed\Checkout\CheckoutDependencyProvider as SprykerCheckoutDependencyProvider;

class CheckoutDependencyProvider extends SprykerCheckoutDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\CheckoutExtension\Dependency\Plugin\CheckoutPreConditionPluginInterface[]
     */
    protected function getCheckoutPreConditions(Container $container)
    {
        return [
            new MerchantProductOptionCheckoutPreConditionPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that validation works correctly for merchants product options with not approved status and checkout process does not go to next step.

{% endinfo_block %}
