

This document describes how to install the Marketplace Product Offer + Checkout feature.

## Install feature core

Follow the steps below to install the Marketplace Product Offer + Checkout feature core.

### Prerequisites

Install the required features:

| NAME | VERSION | INSTALLATION GUIDE |
|-|-|-|
| Spryker Core | 202507.0 | [Install the Spryker Core feature](/docs/pbc/all/miscellaneous/latest/install-and-upgrade/install-features/install-the-spryker-core-feature.html)  |
| Marketplace Product Offer | 202507.0 | [Install the Marketplace Product Offer feature](/docs/pbc/all/offer-management/latest/marketplace/install-and-upgrade/install-features/install-the-marketplace-product-offer-feature.html) |
| Checkout | 202507.0 | [Install the Checkout feature](/docs/pbc/all/cart-and-checkout/latest/base-shop/install-and-upgrade/install-features/install-the-checkout-feature.html) |


### 1) Install the required modules

Install the required modules using Composer:

```bash
composer require spryker/product-offer: "^0.6.1" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure the following modules have been installed:

| MODULE | EXPECTED DIRECTORY |
|-|-|
| CheckoutExtension | spryker/checkout-extension |
| ProductOffer | spryker/product-offer |

{% endinfo_block %}

### 2) Set up transfer objects

Generate the transfer changes:

```bash
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure the following changes have been applied in transfer objects:

| TRANSFER | TYPE | EVENT | PATH |
|-|-|-|-|
| CheckoutErrorTransfer | class | Created | src/Generated/Shared/Transfer/CheckoutErrorTransfer |
| CheckoutResponseTransfer | class | Created | src/Generated/Shared/Transfer/CheckoutResponseTransfer |
| ItemTransfer.merchantReference | property | Created | src/Generated/Shared/Transfer/ItemTransfer |

{% endinfo_block %}

### 3) Configure checkout pre-condition plugins

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
|-|-|-|-|
| ProductOfferCheckoutPreConditionPlugin | Blocks checkout if at least one quote item transfer has items with inactive or not approved ProductOffer. |   | Spryker/Zed/ProductOffer/Communication/Plugin/Checkout/ProductOfferCheckoutPreConditionPlugin.php |

**src/Pyz/Zed/Checkout/CheckoutDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Checkout;

use Spryker\Zed\Checkout\CheckoutDependencyProvider as SprykerCheckoutDependencyProvider;
use Spryker\Zed\Kernel\Container;
use Spryker\Zed\ProductOffer\Communication\Plugin\Checkout\ProductOfferCheckoutPreConditionPlugin;

class CheckoutDependencyProvider extends SprykerCheckoutDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return array<\Spryker\Zed\CheckoutExtension\Dependency\Plugin\CheckoutPreConditionPluginInterface>
     */
    protected function getCheckoutPreConditions(Container $container)
    {
        return [
            new ProductOfferCheckoutPreConditionPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that when refreshing the checkout summary page, after changing the `active` or `approved` status of a product offer, the status is reflected accordingly. The checkout button is disabled, and the message is shown at the bottom of the checkout summary page: "Product offer inactive for the product with SKU <`SKU`>".

You can toggle the offer's `active` status in the Merchant Portal (`Offer visibility`). There's no UI to unset the approval status for an offer yet (only via data-importer: edit `data/import/common/common/marketplace/merchant_product_offer.csv` and execute the `console data:import merchant-product-offer` command).

{% endinfo_block %}
