---
title: Click and Collect feature Service Point Cart subdomain walkthrough
last_updated: Nov 02, 2023
description: |
  Explore the Service Point Cart subdomain in the Click and Collect feature, focusing on the validation of service points and the replacement of line items in a shopping cart. Learn how to install the essential modules and leverage the extension point for implementing custom item replacement strategies during the checkout process.

template: concept-topic-template
---

# Service Point Cart

The Service Point Cart subdomain enables you to validate service points and replace line items within a shopping cart.

[Install the Service Points Cart feature](/docs/pbc/all/install-features/{{page.version}}/install-the-service-points-cart-feature.html)

## 1. Modules

| MODULE                      | EXPECTED DIRECTORY                             |
|-----------------------------|------------------------------------------------|
| ServicePointCart            | vendor/spryker/service-point-cart              |
| ServicePointCartExtension   | vendor/spryker/service-point-cart-extension    |
| ServicePointCartsRestApi    | vendor/spryker/service-point-carts-rest-api    |

## 2. Extension point that allows for the implementation of item replacement strategies in the cart during the checkout process

Utilize the extension point to implement custom strategies for replacing items in the cart during the checkout process.

**\Spryker\Zed\ServicePointCartExtension\Dependency\Plugin\ServicePointQuoteItemReplaceStrategyPluginInterface**

Example Implementation:

**\Spryker\Zed\ClickAndCollectExample\Communication\Plugin\ServicePointCart\ClickAndCollectExampleServicePointQuoteItemReplaceStrategyPlugin**

This example replacement strategy substitutes a product offer with another based on updated information about the Service Point and Shipment Type in the shopping cart.

At the project level, extend this capability to support more intricate scenarios, such as:

1. Receiving information from external systems about the offer intended for replacement.
2. Implementing diverse algorithms for cart item replacement based on information obtained from customers.

## 2.1 How to merge cart line items with different product offers but same SKU and Merchant.

The demo replacement strategy can guarantee work only if a product in the cart with same SKU and Merchant represented as a single cart line item.
To enable the following behavior, you need to follow the steps below:

1. Disable plugin **\Spryker\Zed\ProductOffer\Communication\Plugin\Cart\ProductOfferGroupKeyItemExpanderPlugin** from the **\Pyz\Zed\Cart\CartDependencyProvider::getExpanderPlugins()**, this plugin groups cart items with the same product offer.
2. Create a new ProductOfferGroupKeyItemExpanderPlugin plugin that implements **\Spryker\Zed\CartExtension\Dependency\Plugin\ItemExpanderPluginInterface** and register it in **\Pyz\Zed\Cart\CartDependencyProvider::getExpanderPlugins()**.
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

1. Prepare several product offers for the merchant's product.
2. Log in to the store as a customer.
3. Add a product to the cart with a quantity of 1 for SKU SKU123 and Merchant MER123 and Offer [Offer1].
4. Select a different offer, for example, Offer2, for the same product with the same Merchant and add it to the cart.
5. The cart line item with a quantity of 1, SKU SKU123 and Merchant MER123 and Offer [Offer1] will be updated to a quantity of 2.
