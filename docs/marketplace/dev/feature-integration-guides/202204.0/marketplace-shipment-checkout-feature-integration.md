---
title: Marketplace Shipment + Checkout feature integration
description: This document describes the process how to integrate Marketplace Shipment + Checkout feature into your project
last_updated: Jul 05, 2021
template: feature-integration-guide-template
---

This document describes how to integrate the Marketplace Shipment + Checkout feature into a Spryker project.

## Install feature core

Follow the steps below to install the Marketplace Shipment + Checkout feature core.

### Prerequisites

To start feature integration, integrate the required features:

| NAME | VERSION | INTEGRATION GUIDE |
| --------- | ------ | -----------|
| Marketplace Shipment | {{page.version}} | [Marketplace Shipment feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/marketplace-shipment-feature-integration.html) |
| Checkout | {{page.version}} | [Checkout feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/checkout-feature-integration.html) |

### 1) Set up behavior

Enable the following behaviors by registering the plugins:

| PLUGIN  | SPECIFICATION | PREREQUISITES | NAMESPACE |
| ------------ | ----------- | ----- | ------------ |
| MerchantShipmentCheckoutPageStepEnginePreRenderPlugin | Copies all item merchant references to their attached shipment merchant reference before rendering checkout steps. |  |   Spryker\Yves\MerchantShipment\Plugin\CheckoutPage |

<details>
<summary markdown='span'>src/Pyz/Yves/CheckoutPage/CheckoutPageDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Yves\CartPage;

use SprykerShop\Yves\CheckoutPage\CheckoutPageDependencyProvider as SprykerShopCheckoutPageDependencyProvider;
use Spryker\Yves\MerchantShipment\Plugin\CheckoutPage\MerchantShipmentCheckoutPageStepEnginePreRenderPlugin;

class CheckoutPageDependencyProvider extends SprykerShopCheckoutPageDependencyProvider
{
    /**
     * @return \SprykerShop\Yves\CheckoutPageExtension\Dependency\Plugin\StepEngine\CheckoutPageStepEnginePreRenderPluginInterface[]
     */
    protected function getCheckoutPageStepEnginePreRenderPlugins(): array
    {
        return [
            new MerchantShipmentCheckoutPageStepEnginePreRenderPlugin(),
        ];
    }
}
```

</details>

{% info_block warningBox "Verification" %}

Make sure that during the checkout steps, items and their shipments have the same merchant reference attached to them.

{% endinfo_block %}
