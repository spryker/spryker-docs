---
title: Marketplace Shipment + Checkout feature integration
description: Integrate Marketplace Shipment + Checkout feature into your project
tags:
---

This document describes how to integrate the Marketplace Shipment + Checkout feature into a Spryker project.

## Install feature core

Follow the steps below to install the Marketplace Shipment + Checkout feature core.

### Prerequisites
| NAME | VERSION |
| --------- | ------ |
| Marketplace Shipment | dev-master | 
| Checkout | 202001.0 | 

### 1) Set up behavior
Enable the following behaviors by registering the plugins:

| PLUGIN  | SPECIFICATION | PREREQUISITES | NAMESPACE |
| ------------ | ----------- | ----- | ------------ |
| MerchantShipmentCheckoutPageStepEnginePreRenderPlugin | Copies all item merchant references to their attached shipment merchant reference before rendering checkout steps. | None |   Spryker\Yves\MerchantShipment\Plugin\CheckoutPage |

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

---
**Verification**

Make sure that during the checkout steps, items and their shipments have the same merchant reference attached to them.

---