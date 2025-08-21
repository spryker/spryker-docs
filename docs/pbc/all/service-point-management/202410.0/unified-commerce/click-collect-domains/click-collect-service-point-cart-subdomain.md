---
title: "Click & Collect: Service Point Cart subdomain"
last_updated: Nov 02, 2023
description: The Service Point Cart subdomain focuses on the validation of service points and the replacement of line items in shopping carts.
template: concept-topic-template
redirect_from:
---

The Service Point Cart subdomain enables you to validate service points and replace line items within a shopping cart.

## Installation

[Install the Service Points Cart feature](/docs/pbc/all/service-point-management/{{page.version}}/unified-commerce/install-features/install-the-service-points-cart-feature.html)

## Modules

| MODULE                      | EXPECTED DIRECTORY                             |
|-----------------------------|------------------------------------------------|
| ServicePointCart            | vendor/spryker/service-point-cart              |
| ServicePointCartExtension   | vendor/spryker/service-point-cart-extension    |
| ServicePointCartsRestApi    | vendor/spryker/service-point-carts-rest-api    |

## Extension point that allows for the implementation of item replacement strategies in the cart during checkout

The following extension point is used to implement custom strategies for replacing items in the cart during checkout: `\Spryker\Zed\ServicePointCartExtension\Dependency\Plugin\ServicePointQuoteItemReplaceStrategyPluginInterface`.

Implementation example: `\Spryker\Zed\ClickAndCollectExample\Communication\Plugin\ServicePointCart\ClickAndCollectExampleServicePointQuoteItemReplaceStrategyPlugin`.

This example replacement strategy substitutes a product offer with another one based on updated information about the service point and shipment type in the shopping cart.

At the project level, extend this capability to support more intricate scenarios, such as the following:

1. Receiving information from external systems about the offer intended for replacement.
2. Implementing diverse algorithms for cart item replacement based on information obtained from customers.

### Merge cart line items with different product offers but the same SKU and merchant

The demo replacement strategy works only if a product in cart with same SKU and merchant is represented as a single cart line item.
To enable this behavior, follow the steps:

1. From `\Pyz\Zed\Cart\CartDependencyProvider::getExpanderPlugins()`, disable the `\Spryker\Zed\ProductOffer\Communication\Plugin\Cart\ProductOfferGroupKeyItemExpanderPlugin` plugin.
  This plugin groups cart items with the same product offer.
2. Create a new `ProductOfferGroupKeyItemExpanderPlugin` plugin that implements `\Spryker\Zed\CartExtension\Dependency\Plugin\ItemExpanderPluginInterface` and register it in `\Pyz\Zed\Cart\CartDependencyProvider::getExpanderPlugins()`.
3. Add the following code to the example plugin:

```php
namespace Pyz\Zed\ProductOffer\Communication\Plugin\Cart;

use Generated\Shared\Transfer\CartChangeTransfer;
use Generated\Shared\Transfer\ItemTransfer;
use Spryker\Zed\CartExtension\Dependency\Plugin\ItemExpanderPluginInterface
use Spryker\Zed\Kernel\Communication\AbstractPlugin;

class ProductOfferMerchantGroupKeyItemExpanderPlugin extends AbstractPlugin implements ItemExpanderPluginInterface
{
    protected const GROUP_KEY_DELIMITER = '_';

    /**
     * {@inheritDoc}
     * - Expands `CartChangeTransfer.items` group key with the merchant reference.
     * - Returns expanded `CartChangeTransfer`.
     * - Returns `CartChangeTransfer` without changes if item's merchant reference is empty.
     *
     * @api
     *
     * @param \Generated\Shared\Transfer\CartChangeTransfer $cartChangeTransfer
     *
     * @return \Generated\Shared\Transfer\CartChangeTransfer
     */
    public function expandItems(CartChangeTransfer $cartChangeTransfer): CartChangeTransfer
    {
        $items = $cartChangeTransfer->getItems();

        foreach ($items as $itemTransfer) {
            if (!$itemTransfer->getMerchantReference()) {
                continue;
            }

            $itemTransfer->setGroupKey($this->buildGroupKey($itemTransfer));
        }

        return $cartChangeTransfer;
    }

    /**
     * @param \Generated\Shared\Transfer\ItemTransfer $itemTransfer
     *
     * @return string
     */
    protected function buildGroupKey(ItemTransfer $itemTransfer): string
    {
        $itemGroupKey = $itemTransfer->getGroupKey();
        $merchantReference = $itemTransfer->getMerchantReference();

        return $itemGroupKey . static::GROUP_KEY_DELIMITER . $merchantReference;
    }
}
```


{% info_block warningBox "Verification" %}


1. Prepare several product offers for a merchant's product.
    For these steps, assume you are creating offer1 and offer2 for product SKU123 and merchant MER123.
2. On the Storefront, log in as a customer.
3. Add a product to cart with the following configuration:
- Quantity: 1
- SKU: SKU123
- Merchant: MER123
- Offer: offer1

4. Add the following product to cart:
- Quantity: 1
- SKU: SKU123
- Merchant: MER123
- Offer: offer2

Make sure the cart item you've added in step 3 is updated to quantity 2. The number of items in cart remains 1.

{% endinfo_block %}
