---
title: Amazon Pay - Support of Bundled Products
description: Amazon Pay supports the bundled products and can be configured in the Spryker shop.
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/amazon-pay-support-bundled-products-demoshop
originalArticleId: 221d1350-93eb-4ec7-9b40-f707aebb7acb
redirect_from:
  - /2021080/docs/amazon-pay-support-bundled-products-demoshop
  - /2021080/docs/en/amazon-pay-support-bundled-products-demoshop
  - /docs/amazon-pay-support-bundled-products-demoshop
  - /docs/en/amazon-pay-support-bundled-products-demoshop
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
