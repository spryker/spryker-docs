This document describes how to install the Marketplace Shipment + Checkout feature.

## Install feature core

Follow the steps below to install the Marketplace Shipment + Checkout feature core.

### Prerequisites

Install the required features:

| NAME | VERSION | INSTALLATION GUIDE |
| --------- | ------ | -----------|
| Marketplace Shipment | 202507.0 | [Install the Marketplace Shipment feature](/docs/pbc/all/carrier-management/latest/marketplace/install-features/install-marketplace-shipment-feature.html) |
| Checkout | 202507.0 | [Install the Checkout feature](/docs/pbc/all/cart-and-checkout/latest/base-shop/install-and-upgrade/install-features/install-the-checkout-feature.html) |

### 1) Set up behavior

Enable the following behaviors by registering the plugins:

| PLUGIN  | SPECIFICATION | PREREQUISITES | NAMESPACE |
| ------------ | ----------- | ----- | ------------ |
| MerchantShipmentCheckoutPageStepEnginePreRenderPlugin | Copies all item merchant references to their attached shipment merchant reference before rendering checkout steps. |  |   Spryker\Yves\MerchantShipment\Plugin\CheckoutPage |

<details>
<summary>src/Pyz/Yves/CheckoutPage/CheckoutPageDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Yves\CartPage;

use SprykerShop\Yves\CheckoutPage\CheckoutPageDependencyProvider as SprykerShopCheckoutPageDependencyProvider;
use Spryker\Yves\MerchantShipment\Plugin\CheckoutPage\MerchantShipmentCheckoutPageStepEnginePreRenderPlugin;

class CheckoutPageDependencyProvider extends SprykerShopCheckoutPageDependencyProvider
{
    /**
     * @return array<\SprykerShop\Yves\CheckoutPageExtension\Dependency\Plugin\StepEngine\CheckoutPageStepEnginePreRenderPluginInterface>
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
