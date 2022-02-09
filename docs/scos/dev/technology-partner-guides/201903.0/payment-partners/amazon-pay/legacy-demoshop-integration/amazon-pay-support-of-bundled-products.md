---
title: Amazon Pay - Support of Bundled Products
description: Amazon Pay supports the bundled products and can be configured in the Spryker shop.
last_updated: Jan 27, 2020
template: concept-topic-template
originalLink: https://documentation.spryker.com/v2/docs/amazon-pay-support-bundled-products-demoshop
originalArticleId: 3e153bf2-6bde-4c03-b187-a5544521902d
redirect_from:
  - /v2/docs/amazon-pay-support-bundled-products-demoshop
  - /v2/docs/en/amazon-pay-support-bundled-products-demoshop
related:
  - title: Obtaining an Amazon Order Reference and information about shipping addresses
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/amazon-pay/obtaining-an-amazon-order-reference-and-information-about-shipping-addresses.html
  - title: Amazon Pay - Refund
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/amazon-pay/legacy-demoshop-integration/amazon-pay-refund.html
  - title: Handling orders with Amazon Pay API
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/amazon-pay/handling-orders-with-amazon-pay-api.html
  - title: Configuring Amazon Pay
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/amazon-pay/configuring-amazon-pay.html
  - title: Amazon Pay - Sandbox Simulations
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/amazon-pay/legacy-demoshop-integration/amazon-pay-sandbox-simulations.html
  - title: Amazon Pay - Rendering a “Pay with Amazon” Button on the Cart Page
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/amazon-pay/legacy-demoshop-integration/amazon-pay-rendering-a-pay-with-amazon-button-on-the-cart-page.html
  - title: Amazon Pay - Sandbox Simulations
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/amazon-pay/amazon-pay-sandbox-simulations.html
  - title: Handling orders with Amazon Pay API
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/amazon-pay/legacy-demoshop-integration/legacy-demoshop-handling-orders-with-amazon-pay-api.html
  - title: Amazon Pay - Email Notifications
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/amazon-pay/legacy-demoshop-integration/amazon-pay-email-notifications.html
  - title: Amazon Pay - Order Reference and Information about Shipping Addresses
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/amazon-pay/legacy-demoshop-integration/amazon-pay-order-reference-and-information-about-shipping-addresses.html
---

Bundled products are optional in the shop, thus support of those should be configured.

First, you have to extend `AmazonPayFactory`:

```php
<?php

namespace Pyz\Yves\AmazonPay;

use Spryker\Yves\ProductBundle\Grouper\ProductBundleGrouper;
use SprykerEco\Yves\AmazonPay\AmazonPayFactory as EcoAmazonPayFactory;

class AmazonPayFactory extends EcoAmazonPayFactory
{
 /**
 * @return \Spryker\Yves\ProductBundle\Grouper\ProductBundleGrouperInterface
 */
 public function createProductBundleGrouper()
 {
 return new ProductBundleGrouper();
 }
}
```

Second, you have to extend `AmazonPay\PaymentController`:

```php
<?php

namespace Pyz\Yves\AmazonPay\Controller;

use Generated\Shared\Transfer\QuoteTransfer;
use SprykerEco\Yves\AmazonPay\Controller\PaymentController as EcoPaymentController;

/**
 * @method \Pyz\Yves\AmazonPay\AmazonPayFactory getFactory()
 */
class PaymentController extends EcoPaymentController
{
 /**
 * @param \Generated\Shared\Transfer\QuoteTransfer $quoteTransfer
 *
 * @return \ArrayObject|\Generated\Shared\Transfer\ItemTransfer[]
 */
 protected function getCartItems(QuoteTransfer $quoteTransfer)
 {
 return $this->getFactory()->createProductBundleGrouper()->getGroupedBundleItems(
 $quoteTransfer->getItems(),
 $quoteTransfer->getBundleItems()
 );
 }
}
```
