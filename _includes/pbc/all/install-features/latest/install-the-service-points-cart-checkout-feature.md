

This document describes how to install the Service Points Cart + Checkout feature.

## Prerequisites

Install the required features:

| NAME                | VERSION           | INSTALLATION GUIDE                                                                                                                                                          |
|---------------------|-------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Service Points Cart | {{page.version}}  | [Install the Service Points Cart feature](/docs/pbc/all/service-point-management/latest/unified-commerce/install-features/install-the-service-points-cart-feature.html) |
| Checkout            | {{page.version}}  | [Install the Checkout feature](/docs/pbc/all/cart-and-checkout/latest/base-shop/install-and-upgrade/install-features/install-the-checkout-feature.html)                                               |

## 1) Install the required modules

We offer an example of Click & Collect service point cart replacement strategies. To use them, install the following module:

```bash
composer require spryker/click-and-collect-example: "^0.3.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure the following module has been installed:

| MODULE                 | EXPECTED DIRECTORY                       |
|------------------------|------------------------------------------|
| ClickAndCollectExample | vendor/spryker/click-and-collect-example |

{% endinfo_block %}

## 2) Set up transfer objects

Generate transfer changes:

```bash
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure the following changes have been applied in transfer objects:

| TRANSFER                         | TYPE  | EVENT   | PATH                                                                   |
|----------------------------------|-------|---------|------------------------------------------------------------------------|
| QuoteError                       | class | created | src/Generated/Shared/Transfer/QuoteErrorTransfer                       |
| QuoteResponse                    | class | created | src/Generated/Shared/Transfer/QuoteResponseTransfer                    |
| Quote                            | class | created | src/Generated/Shared/Transfer/QuoteTransfer                            |
| Item                             | class | created | src/Generated/Shared/Transfer/ItemTransfer                             |
| Currency                         | class | created | src/Generated/Shared/Transfer/CurrencyTransfer                         |
| Store                            | class | created | src/Generated/Shared/Transfer/StoreTransfer                            |
| ServicePoint                     | class | created | src/Generated/Shared/Transfer/ServicePointTransfer                     |
| ShipmentType                     | class | created | src/Generated/Shared/Transfer/ShipmentTypeTransfer                     |
| Shipment                         | class | created | src/Generated/Shared/Transfer/ShipmentTransfer                         |
| ProductOffer                     | class | created | src/Generated/Shared/Transfer/ProductOfferTransfer                     |
| ProductOfferServicePoint         | class | created | src/Generated/Shared/Transfer/ProductOfferServicePointTransfer         |
| ProductOfferServicePointCriteria | class | created | src/Generated/Shared/Transfer/ProductOfferServicePointCriteriaTransfer |
| ProductOfferPrice                | class | created | src/Generated/Shared/Transfer/ProductOfferPriceTransfer                |
| ProductOfferStock                | class | created | src/Generated/Shared/Transfer/ProductOfferStockTransfer                |

{% endinfo_block %}

## 2) Set up behavior

1. Register the plugins:

| PLUGIN                                            | SPECIFICATION                                   | PREREQUISITES | NAMESPACE                                             |
|---------------------------------------------------|-------------------------------------------------|---------------|-------------------------------------------------------|
| ServicePointCheckoutAddressStepPostExecutePlugin  | Replaces quote items using an applicable strategy. |           | SprykerShop\Yves\ServicePointCartPage\Plugin\CartPage |

**src/Pyz/Yves/CheckoutPage/CheckoutPageDependencyProvider.php**

```php
<?php

/**
 * This file is part of the Spryker Suite.
 * For full license information,  view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Yves\CheckoutPage;

use SprykerShop\Yves\CheckoutPage\CheckoutPageDependencyProvider as SprykerShopCheckoutPageDependencyProvider;
use SprykerShop\Yves\ServicePointCartPage\Plugin\CartPage\ServicePointCheckoutAddressStepPostExecutePlugin;

class CheckoutPageDependencyProvider extends SprykerShopCheckoutPageDependencyProvider
{
    /**
     * @return list<\SprykerShop\Yves\CheckoutPageExtension\Dependency\Plugin\CheckoutAddressStepPostExecutePluginInterface>
     */
    protected function getCheckoutAddressStepPostExecutePlugins(): array
    {
        return [
            new ServicePointCheckoutAddressStepPostExecutePlugin(),
        ];
    }
}
```

2. Enable the demo Click & Collect replacement strategy plugins:

| PLUGIN                                                                   | SPECIFICATION                                                                                                        | PREREQUISITES | NAMESPACE                                                                |
|--------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------|---------------|--------------------------------------------------------------------------|
| ClickAndCollectExampleDeliveryServicePointQuoteItemReplaceStrategyPlugin | Replaces product offers in quote items that have the `delivery` shipment type with suitable product offer replacements. |               | Spryker\Zed\ClickAndCollectExample\Communication\Plugin\ServicePointCart |
| ClickAndCollectExamplePickupServicePointQuoteItemReplaceStrategyPlugin   | Replaces product offers in quote items that have the `pickup` shipment type with suitable product offer replacements.   |               | Spryker\Zed\ClickAndCollectExample\Communication\Plugin\ServicePointCart |

**src/Pyz/Zed/ServicePointCart/ServicePointCartDependencyProvider.php**

```php
<?php

/**
 * This file is part of the Spryker Suite.
 * For full license information,  view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\ServicePointCart;

use Spryker\Zed\ClickAndCollectExample\Communication\Plugin\ServicePointCart\ClickAndCollectExampleDeliveryServicePointQuoteItemReplaceStrategyPlugin;
use Spryker\Zed\ClickAndCollectExample\Communication\Plugin\ServicePointCart\ClickAndCollectExamplePickupServicePointQuoteItemReplaceStrategyPlugin;
use Spryker\Zed\ServicePointCart\ServicePointCartDependencyProvider as SprykerServicePointCartDependencyProvider;

class ServicePointCartDependencyProvider extends SprykerServicePointCartDependencyProvider
{
    /**
     * @return list<\Spryker\Zed\ServicePointCartExtension\Dependency\Plugin\ServicePointQuoteItemReplaceStrategyPluginInterface>
     */
    protected function getServicePointQuoteItemReplaceStrategyPlugins(): array
    {
        return [
            new ClickAndCollectExampleDeliveryServicePointQuoteItemReplaceStrategyPlugin(),
            new ClickAndCollectExamplePickupServicePointQuoteItemReplaceStrategyPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

1. Create two product offers with the `delivery` and `pickup` shipment types for the same product.
2. Add the product offer with `delivery` shipment type to cart.
3. Proceed to checkout.
4. Go to the Address step.
5. Choose the `pickup` shipment type.
6. Go to the next step.
7. Check that the product offer with the `delivery` type is replaced with the product offer with `pickup` type.

{% endinfo_block %}
