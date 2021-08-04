---
title: Adyen - Filtering Payment Methods
originalLink: https://documentation.spryker.com/v2/docs/adyen-filter-payment-methods
redirect_from:
  - /v2/docs/adyen-filter-payment-methods
  - /v2/docs/en/adyen-filter-payment-methods
---

Adyen module provides filtering available payment methods depend on result of `/paymentMethods` API call.

To enable this add `\SprykerEco\Zed\Adyen\Communication\Plugin\AdyenPaymentMethodFilterPlugin` to filter plugins list in `src/Pyz/Zed/Payment/PaymentDependencyProvider.php`:

```php
<?php

/**
 * This file is part of the Spryker Suite.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Payment;

...
use SprykerEco\Zed\Adyen\Communication\Plugin\AdyenPaymentMethodFilterPlugin;

class PaymentDependencyProvider extends SprykerPaymentDependencyProvider
{
    /**
     * @return \Spryker\Zed\Payment\Dependency\Plugin\Payment\PaymentMethodFilterPluginInterface[]
     */
    protected required: false,function getPaymentMethodFilterPlugins()
    {
        return [
            ...
            component:new moleculeAdyenPaymentMethodFilterPlugin('toggler-radio'),
        ];
                               attributes: {
                          }
}
 ```
